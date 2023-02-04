import React from "react";

import { FiPlusCircle, FiSettings } from "react-icons/fi";
import { IconContext } from "react-icons";
import { FaRegFileAudio } from "react-icons/fa";
import { HiOutlineGift } from "react-icons/hi"

import gql from 'graphql-tag';

class PoductsPage extends React.Component {
    render() {
        return (
           <main className="flex flex-col items-center">
                <div className="all-width pt-24">
                    <h1 className="text-4xl my-6">Sample Packs</h1>
                    <p className="mb-8">Showing 23 out of 109 total products.</p>
                </div>
                <div className="all-width flex space-x-4 items-stretch">
                    <div className="w-48 space-y-2 mr-4 shrink-0"><IconContext.Provider value={{ size: "1.5em" }}>
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
                    </IconContext.Provider></div>
                    <div className="flex-row flex flex-wrap justify-between gap-8 pb-8"><IconContext.Provider value={{ size: "2em" }}>
                        <div className="card w-72 bg-base-100 card-bordered indicator">
                            <figure><img src="https://i.kym-cdn.com/photos/images/newsfeed/002/450/520/b00.jpg" /></figure>
                            <div className="card-body p-6">
                                <h2 className="card-title">
                                    Quieres Spiderr
                                    <div className="badge badge">FREE</div>
                                </h2>
                                <p className="pb-4 text-md">
                                    Baby, can't you see im messed uppp D-30 boys really next
                                    up in this life I'm a extra king nothyng
                                </p>
                                <div className="card-actions justify-end items-center">
                                    <div className="btn btn-ghost text-md btn-sm">More Info</div>
                                    <div className="btn btn-primary">
                                        <span className="mr-2 text-base">FREE</span>
                                        <FiPlusCircle/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card w-72 bg-base-100 card-bordered indicator">
                            <figure><img src="https://i.kym-cdn.com/photos/images/newsfeed/002/450/520/b00.jpg" /></figure>
                            <div className="card-body p-6">
                                <h2 className="card-title">
                                    Quieres Spiderr
                                    <div className="badge badge">FREE</div>
                                </h2>
                                <p className="pb-4 text-md">
                                    Baby, can't you see im messed uppp D-30 boys really next
                                    up in this life I'm a extra king nothyng
                                </p>
                                <div className="card-actions justify-end items-center">
                                    <div className="btn btn-ghost text-md btn-sm">More Info</div>
                                    <div className="btn btn-primary">
                                        <span className="mr-2 text-base">FREE</span>
                                        <FiPlusCircle/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card w-72 bg-base-100 card-bordered indicator">
                            <figure><img src="https://i.kym-cdn.com/photos/images/newsfeed/002/450/520/b00.jpg" /></figure>
                            <div className="card-body p-6">
                                <h2 className="card-title">
                                    Quieres Spiderr
                                    <div className="badge badge">FREE</div>
                                </h2>
                                <p className="pb-4 text-md">
                                    Baby, can't you see im messed uppp D-30 boys really next
                                    up in this life I'm a extra king nothyng
                                </p>
                                <div className="card-actions justify-end items-center">
                                    <div className="btn btn-ghost text-md btn-sm">More Info</div>
                                    <div className="btn btn-primary">
                                        <span className="mr-2 text-base">FREE</span>
                                        <FiPlusCircle/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card w-72 bg-base-100 card-bordered indicator">
                            <figure><img src="https://i.kym-cdn.com/photos/images/newsfeed/002/450/520/b00.jpg" /></figure>
                            <div className="card-body p-6">
                                <h2 className="card-title">
                                    Quieres Spiderr
                                    <div className="badge badge">FREE</div>
                                </h2>
                                <p className="pb-4 text-md">
                                    Baby, can't you see im messed uppp D-30 boys really next
                                    up in this life I'm a extra king nothyng
                                </p>
                                <div className="card-actions justify-end items-center">
                                    <div className="btn btn-ghost text-md btn-sm">More Info</div>
                                    <div className="btn btn-primary">
                                        <span className="mr-2 text-base">FREE</span>
                                        <FiPlusCircle/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </IconContext.Provider></div>
                </div>
           </main>
        );
    }
}

export default PoductsPage;