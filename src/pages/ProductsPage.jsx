import React from "react";
import { useParams, Navigate } from "react-router-dom";

import { IconContext } from "react-icons";
import { FiPlusCircle, FiSettings } from "react-icons/fi";
import { FaRegFileAudio, FaRegFileCode } from "react-icons/fa";
import { HiOutlineGift } from "react-icons/hi";
import { TbWaveSine } from "react-icons/tb"

import { storeClient } from "../storeClient";

import gql from 'graphql-tag';
import { Link } from "react-router-dom";
import CheckOptions from "../components/CheckOptions";
import CheckSelect from "../components/CheckSelect";

function withParams(Component) {
  return props => <Component {...props} params={useParams()} />;
}

class ProductsPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            results: [],
            allItemCount: 0,
            sectionTitle: "All Products",
            section: this.props.params.section == "all" ? undefined : this.props.params.section,
            onlyFree: this.props.params.free == "free",
        };
        
        storeClient.query({
            query: gql`
                query GetTotal {
                    search(input: {}) {
                        totalItems
                    }
                }
            `,
        })
        .then((r) => {
            this.setState({allItemCount: r.data.search.totalItems});
        });

        this.setTitle();
    }

    formatPrice(p) {
        let v = 0;
        if(p.__typename == "SinglePrice") v = p.value;
        if(p.__typename == "PriceRange") v = p.min;

        if(p.value != 0) {
            return (parseFloat(p.value) / 100.0) + " $";
        } else {
            return "FREE";
        }
    }

    formatBadge(b) {
        switch (Number(b)) {
            case 41:
                return <div className="badge badge-secondary">FREE</div>;
            case 42:
                return <div className="badge badge-accent">NEW</div>;
            default:
                return;
        }
    }

    performSearch() {
        storeClient.query({
            query: gql`
                query SearchProducts {
                    search(input: {
                        ${(this.state.section != undefined ? `collectionSlug: "` + this.state.section + `" ` : "")}
                        ${this.state.onlyFree ? "facetValueIds: [41]" : ""}
                    }) {
                        totalItems
                        items {
                            productId
                            productName
                            slug
                            description
                            currencyCode
                            facetValueIds
                            productAsset {
                                preview
                            }
                            priceWithTax {
                                __typename
                                ... on SinglePrice {
                                    value
                                }
                                ... on PriceRange {
                                    min
                                }
                            }
                        }
                    }
                }
            `,
        })
        .then((result) => {
            this.setState({results: result.data.search.items});
        });
    }

    componentDidMount() {
        this.performSearch();
    }

    filterRedirect(section, isFree) {
        let newURL = "/products";
        if(section !== null) {
            if(section != "") {
                storeClient.query({
                    query: gql`
                        query GetCollectionInfo {
                            collection(slug: "${section}") {
                                name
                            }
                        }
                    `,
                })
                .then((result) => {
                    this.setState({ sectionTitle: result.data.collection.name });
                });
            } else {
                this.setState({ sectionTitle: "All Products" });
            }
            newURL += "/" + section;
        } else {
            section = this.state.section;
            newURL += section == "" ? "/all" : "/" + section;
        }
        if(isFree !== null) {
            this.setState({onlyFree: isFree});
            if(isFree) newURL += "/free";
        } else {
            isFree = this.state.onlyFree;
            if(this.state.onlyFree) newURL += "/free";
        }

        this.setState({ section: section, onlyFree: isFree }, ()=>{
            this.performSearch();
        });
        window.history.replaceState(null, "", newURL);
    }

    setTitle() {
        if(this.state.section != undefined) {
            storeClient.query({
                query: gql`
                    query GetCollectionInfo {
                        collection(slug: "${this.state.section}") {
                            name
                        }
                    }
                `,
            })
            .then((result) => {
                this.setState({ sectionTitle: result.data.collection.name });
            });
        } else {
            this.setState({ sectionTitle: "All Products" })
        }
    }

    componentDidUpdate(prevProps) {
        let prevParams = JSON.stringify(prevProps.params);
        let currParams = JSON.stringify(this.props.params);
        if(prevParams != currParams) {
            this.setState({
                section: this.props.params.section == "all" ? undefined : this.props.params.section,
                onlyFree: this.props.params.free == "free",
            },()=>{
                this.setTitle();
                this.performSearch();
            });
        }
    }

    render() {
        return (
           <main className="flex flex-col items-center">
                <div className="all-width pt-24">
                    <h1 className="text-4xl my-6">{this.state.sectionTitle}</h1>
                    <p className="mb-8 opacity-75">Showing {[this.state.results.length]} out of {[this.state.allItemCount]} total products.</p>
                </div>
                <div className="all-width flex space-x-4 items-start">
                    <div className="w-64 space-y-2 mr-4 mb-8 p-4 shrink-0 rounded-3xl card-bordered">
                    <IconContext.Provider value={{ size: "1.5em" }}>
                        <h3 className="text-xl">Search</h3>
                        <input type="text" placeholder="Search..." className="input input-bordered w-full max-w-xs" />
                        <div className="divider"/>
                        <h3 className="text-xl">Category</h3>
                        <div className="w-full space-y-2">
                            <CheckOptions
                                value={this.state.section}
                                options={[
                                    {
                                        jsx: <div className="flex-row flex gap-2 items-center">
                                                <TbWaveSine/><span>Samples</span>
                                            </div>,
                                        value: "sample-packs"
                                    },
                                    {
                                        jsx: <div className="flex-row flex gap-2 items-center">
                                                <FaRegFileAudio/><span>Presets</span>
                                            </div>,
                                        value: "presets"
                                    },
                                    {
                                        jsx: <div className="flex-row flex gap-2 items-center">
                                                <FiSettings/><span>Plugins</span>
                                            </div>,
                                        value: "plugins"
                                    },
                                ]}
                                onSelect={(o) => {this.filterRedirect(o, null)}}
                            />
                        </div>
                        <div className="divider"/>
                        <h3 className="text-xl">Filter</h3>
                        <div className="w-full">
                            <CheckSelect
                                isChecked={this.state.onlyFree}
                                onChange={(s)=>{this.filterRedirect(null, s)}}
                            >
                                <span className="flex gap-2">
                                    <HiOutlineGift/>
                                    Show only free
                                </span> 
                            </CheckSelect>
                        </div>
                    </IconContext.Provider>
                    </div>
                    <div
                        className="gap-8 pb-8"
                        style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fill, minmax(16rem, 1fr))"
                        }}
                    ><IconContext.Provider value={{ size: "1.5em" }}>
                    {this.state.results.map(r => (
                        <div key={r.productId} className="card w-auto bg-base-100 card-bordered indicator">
                            <figure><img src={r.productAsset.preview} /></figure>
                            <div className="card-body p-6">
                                <h2 className="card-title">
                                    {r.productName}

                                    {this.formatBadge(r.facetValueIds[0])} 
                                </h2>
                                <p
                                  className="font-bold"
                                >{this.formatPrice(r.priceWithTax)}</p>
                                <div
                                  dangerouslySetInnerHTML={{__html: r.description}}
                                  className="pb-4 text-md max-h-36 overflow-hidden opacity-75"
                                  style={{maskImage: "linear-gradient(to top, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1) 50%)"}}
                                />
                                <div className="card-actions justify-end items-center">
                                    <Link className="btn btn-ghost text-md btn-sm" to={"/p/" + r.slug}>More Info</Link>
                                    <div className="btn btn-primary btn-md">
                                        <span className="mr-2">Buy</span>
                                        <FiPlusCircle/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                    </IconContext.Provider></div>
                </div>
           </main>
        );
    }
}

export default withParams(ProductsPage);