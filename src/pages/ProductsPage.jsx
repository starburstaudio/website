import React from "react";

import { FiPlusCircle, FiSettings } from "react-icons/fi";
import { IconContext } from "react-icons";
import { FaRegFileAudio } from "react-icons/fa";
import { HiOutlineGift } from "react-icons/hi";

import { storeClient } from "../storeClient";

import gql from 'graphql-tag';
import { Link } from "react-router-dom";


class PoductsPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            results: []
        };
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
                    search(input: {}) {
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
                    <h1 className="text-4xl my-6">Sample Packs</h1>
                    <p className="mb-8">Showing 23 out of 109 total products.</p>
                </div>
                <div className="all-width flex space-x-4 items-stretch">
                    <div className="w-48 space-y-2 mr-4 shrink-0">
                    <IconContext.Provider value={{ size: "1.5em" }}>
                        <h3 className="text-xl">Category</h3>
                        <div className="w-full">
                            <div className="form-control">
                                <label className="label cursor-pointer">
                                    <span className="label-text flex gap-2">
                                        <FaRegFileAudio/>
                                        Sample Packs
                                    </span> 
                                    <input type="checkbox" className="checkbox" />
                                </label>
                            </div>
                            <div className="form-control">
                                <label className="label cursor-pointer">
                                    <span className="label-text flex gap-2">
                                        <FiSettings/>
                                        Plugins
                                    </span> 
                                    <input type="checkbox" className="checkbox" />
                                </label>
                            </div>
                        </div>
                        <div className="divider"/>
                        <h3 className="text-xl">Price</h3>
                        <div className="w-full">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Price limit</span>
                                </label>
                                <label className="input-group input-group-sm">
                                    <span>Up to</span>
                                    <input type="text" placeholder="0.00 +" className="input input-sm input-bordered w-16 flex-grow" />
                                    <span>$</span>
                                </label>
                            </div>
                            <div className="form-control">
                                <label className="label cursor-pointer">
                                    <span className="label-text flex gap-2">
                                        <HiOutlineGift/>
                                        Show only free
                                    </span> 
                                    <input type="checkbox" className="checkbox" />
                                </label>
                            </div>
                        </div>
                    </IconContext.Provider>
                    </div>
                    <div className="flex-row flex flex-wrap justify-between gap-8 pb-8"><IconContext.Provider value={{ size: "2em" }}>
                        {this.state.results.map(r => (
                            <div key={r.productId} className="card w-80 bg-base-100 card-bordered indicator">
                                <figure><img src={r.productAsset.preview} /></figure>
                                <div className="card-body p-6">
                                    <h2 className="card-title">
                                        {r.productName}

                                        {this.formatBadge(r.facetValueIds[0])} 
                                    </h2>
                                    <div
                                      dangerouslySetInnerHTML={{__html: r.description}}
                                      className="pb-4 text-md max-h-36 overflow-hidden"
                                      style={{maskImage: "linear-gradient(to top, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1) 50%)"}}
                                    />
                                    <div className="card-actions justify-end items-center">
                                        <Link className="btn btn-ghost text-md btn-sm" to={"/p/" + r.slug}>More Info</Link>
                                        <div className="btn btn-primary">
                                            <span className="mr-2 text-base">{this.formatPrice(r.priceWithTax)}</span>
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

export default PoductsPage;