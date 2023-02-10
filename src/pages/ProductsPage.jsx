import React from "react";
import {useParams} from "react-router-dom";

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

        if(this.props.params.section != undefined) {
            storeClient.query({
                query: gql`
                    query GetCollectionInfo {
                        collection(slug: "${this.props.params.section}") {
                            name
                        }
                    }
                `,
            })
            .then((result) => {
              this.setState({ sectionTitle: result.data.collection.name })
            });
        }
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
                      ${(this.props.params.section != undefined ? `collectionSlug: "` + this.props.params.section + `" ` : "")}
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
                        <h3 className="text-xl">Category</h3>
                        <div className="w-full space-y-2">
                            <CheckOptions options={[
                                {
                                    jsx: <div className="flex-row flex gap-2 items-center">
                                            <TbWaveSine/><span>Samples</span>
                                        </div>,
                                    selected: false,
                                    value: "samples"
                                },
                                {
                                    jsx: <div className="flex-row flex gap-2 items-center">
                                            <FaRegFileAudio/><span>Presets</span>
                                        </div>,
                                    selected: false,
                                    value: "presets"
                                },
                                {
                                    jsx: <div className="flex-row flex gap-2 items-center">
                                            <FiSettings/><span>Plugins</span>
                                        </div>,
                                    selected: false,
                                    value: "plugins"
                                },
                            ]}/>
                        </div>
                        <div className="divider"/>
                        <h3 className="text-xl">Price</h3>
                        <div className="w-full">
                            <div className="form-control mb-2">
                                <label className="input-group input-group-sm">
                                    <span>Up to</span>
                                    <input type="text" placeholder="0.00 +" className="input input-sm input-bordered w-16 flex-grow" />
                                    <span>$</span>
                                </label>
                            </div>
                            <CheckSelect>
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