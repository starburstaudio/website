import React from "react";

import { FiChevronRight, FiMoreHorizontal, FiPlusCircle } from "react-icons/fi";
import { IconContext } from "react-icons";

class HomePage extends React.Component {
    render() {
        return (
            <div>
                <main className='flex-col justify-center '>
                    <div className='w-full flex justify-center start-banner pt-16' style={{"background-image": "url(https://images.pexels.com/photos/7130555/pexels-photo-7130555.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"}}>
                    <div className='all-width py-24 flex items-center justify-between'>
                        <div className='h-min content-width'>
                        <h1 className='text-5xl z-5 pb-4 w-full'>The last Lo-Fi samples you'll ever need</h1>
                        <div className='content-width'>
                            <p className='pb-4 pt-4'>
                            With over 450 individual samples, this huge sample pack has
                            something for all flavors of lo-fi - From thumping, driven kick
                            drums to meticulously textured percussion and synth loops with
                            that signature vintage warmth. Embrace the past sound and get
                            your hands on this sample pack today!
                            </p>
                            <div>
                            <a className='btn shadow-xl btn-primary btn-lg text-lg mr-2' href='/'>
                                <span>Check it out!</span>
                                <IconContext.Provider value={{ size: "1.5em" }}>
                                <FiChevronRight className='ml-2'/>
                                </IconContext.Provider>
                            </a>
                            <a className='btn btn-ghost btn-lg' href='/'>All Sample Packs </a>
                            </div>
                        </div>
                        </div>
                        <div className="card w-[24rem] bg-base-100 shadow-xl image-full bannercover z-0">
                        <figure><img
                            src="https://cdn.shopify.com/s/files/1/0559/0941/7058/products/TY-ARCHIVEVOL.1.png?v=1662698174"
                            alt="Cover image of the Lofi Sample Pack"
                        /></figure>
                        </div>
                    </div>
                    </div>
                    <div className='w-full flex items-center flex-col'>
                        <div className='all-width mt-16'>
                            <h2 className='text-4xl mb-4'>Sample Packs</h2>
                            <p className='content-width mb-2 text-md'>
                                Sample Packs from Starburst Audio offer the perfect combination of sounds,
                                loops, and samples to take your music production to the next level. Across many
                                different genres, these sample packs are designed to provide you with the samples
                                you need to create awesome music quickly and easily.
                            </p>
                            <IconContext.Provider value={{ size: "2em" }}>
                            <div
                            className="carousel carousel-end p-8 -ml-8 space-x-8 rounded-box masked-overflow-y"
                            style={{ "width": "calc(100% + 8rem);"}}
                            >
                            <div class="carousel-item">
                                <div className="card w-72 bg-base-100 shadow-lg indicator">
                                <figure><img src="https://cdn.shopify.com/s/files/1/0559/0941/7058/products/TY-ARCHIVEVOL.1.png?v=1662698174" /></figure>
                                <div className="card-body p-6">
                                    <h2 className="card-title">
                                    Lo-Fi Memories
                                    <div className="badge badge-accent">NEW</div>
                                    </h2>
                                    <p className="pb-4 text-md">
                                    With over 450 individual samples, this huge sample pack has
                                    something for all flavors of lo-fi.
                                    </p>
                                    <div className="card-actions justify-end items-center">
                                    <div className="btn btn-ghost btn-sm">More Info</div>
                                    <div className="btn btn-primary">
                                        <span className="mr-2 text-base">7,99€</span>
                                        <FiPlusCircle/>
                                    </div>
                                    </div>
                                </div>
                                </div>
                            </div>
                                <div class="carousel-item">
                                <div className="card w-72 bg-base-100 shadow-lg indicator">
                                    <figure><img src="https://t2.genius.com/unsafe/903x0/https%3A%2F%2Fimages.genius.com%2F5085bb85a1459e2edde86cdc3da324b3.1000x1000x1.jpg" /></figure>
                                    <div className="card-body p-6">
                                    <h2 className="card-title">
                                        Icedancerr
                                        <div className="badge badge-secondary">50% OFF</div>
                                    </h2>
                                    <p className="pb-4 text-md">
                                        The cover was created by Bladee himself. It features
                                        castles, a common theme in DG art and euros because he's
                                        from Sweden.
                                    </p>
                                    <div className="card-actions justify-end items-center">
                                        <div className="btn btn-ghost text-md btn-sm">More Info</div>
                                        <div className="btn btn-primary">
                                        <span className="mr-2 text-base">3,99€</span>
                                        <FiPlusCircle/>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                                </div>
                                <div class="carousel-item">
                                <div className="card w-72 bg-base-100 shadow-lg indicator">
                                    <figure><img src="https://i.kym-cdn.com/photos/images/newsfeed/002/450/520/b00.jpg" /></figure>
                                    <div className="card-body p-6">
                                    <h2 className="card-title">
                                        Quieres Spiderr
                                        <div className="badge badge">FREE</div>
                                    </h2>
                                    <p className="pb-4 text-md">
                                        Girl, can't you see im messed uppp D-30 boys really next
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
                                </div>
                                <div class="carousel-item">
                                <div className="card w-72 bg-base-100 shadow-lg indicator">
                                    <figure><img src="https://t2.genius.com/unsafe/903x0/https%3A%2F%2Fimages.genius.com%2Fb81222e5d6dfc81874e7a120daefc163.1000x1000x1.jpg" /></figure>
                                    <div className="card-body p-6">
                                    <h2 className="card-title">
                                        Nike Just Do It
                                    </h2>
                                    <p className="pb-4 text-md">
                                        With over 450 individual samples, this huge sample pack has
                                        something for all flavors of lo-fi.
                                    </p>
                                    <div className="card-actions justify-end items-center">
                                        <div className="btn btn-ghost text-md btn-sm">More Info</div>
                                        <div className="btn btn-primary">
                                        <span className="mr-2 text-base">7,99€</span>
                                        <FiPlusCircle/>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                                </div>
                                <div class="carousel-item">
                                <div className="card w-72 bg-base-100 shadow-lg indicator">
                                    <div className="card-body flex flex-col justify-center">
                                    <div>
                                        <h2 className='text-4xl text-center pb-4'>
                                        Want more?
                                        </h2>
                                        <p className="pb-4 text-md">
                                        There's a lot more where that came from. We've got a
                                        ton of amazing paid sample packs and even some free
                                        ones!
                                        </p>
                                        <a class="btn btn-primary">Show all Sample Packs</a>
                                    </div>
                                    </div>
                                </div>
                                </div>
                            </div>
                            </IconContext.Provider>
                        </div>
                    </div>
                    <div className='w-full flex items-center flex-col'>
                        <div className='all-width mt-16'>
                            <h2 className='text-4xl mb-4'>Blog</h2>
                            <p className='content-width'>
                                Whether you're a beginner, or you're already experienced with music production,
                                you'll definitely get something out of our blog. It's where we share music
                                production, sound design, mixing and mastering tips.
                            </p>
                        </div>
                        <div className="all-width flex space-x-6 flex-row my-8">
                            <IconContext.Provider value={{ size: "2em" }}>
                            <div className="card bg-base-100 indicator grow flex-1 card-bordered">
                                <figure><img src="https://images.unsplash.com/photo-1675019674011-9141ec0df347?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDEzfGlVSXNuVnRqQjBZfHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60" /></figure>
                                <div className="card-body p-6">
                                    <h2 className="card-title">
                                        Should you put reverb on the bass?
                                    </h2>
                                    <p className="pb-4 text-md">
                                        As a rule of thumb, you shouldn't use reverb on bass tracks.
                                        However, there are some exceptions to this rule that you
                                        should always be aware of.
                                    </p>
                                    <div className="card-actions justify-end items-center">
                                    <div className="btn btn-primary">
                                        <span className="text-base">Read More</span>
                                    </div>
                                    </div>
                                </div>
                            </div>
                            </IconContext.Provider>
                            <IconContext.Provider value={{ size: "2em" }}>
                            <div className="card bg-base-100 indicator flex-1 card-bordered">
                                <figure><img src="https://images.unsplash.com/photo-1675019674011-9141ec0df347?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDEzfGlVSXNuVnRqQjBZfHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60" /></figure>
                                <div className="card-body p-6">
                                    <h2 className="card-title">
                                        How to make a synth sound "alive"
                                    </h2>
                                    <p className="pb-4 text-md">
                                        Software synths often sound very cold, because they are
                                        digital, and not analog. But with a few tricks, you can
                                        bring that analog sound to your synths.
                                    </p>
                                    <div className="card-actions justify-end items-center">
                                    <div className="btn btn-primary">
                                        <span className="text-base">Read More</span>
                                    </div>
                                    </div>
                                </div>
                            </div>
                            </IconContext.Provider>
                            <IconContext.Provider value={{ size: "2em" }}>
                            <div className="card bg-base-100 indicator flex-1 card-bordered">
                                <figure><img src="https://images.unsplash.com/photo-1675019674011-9141ec0df347?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDEzfGlVSXNuVnRqQjBZfHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60" /></figure>
                                <div className="card-body p-6">
                                    <h2 className="card-title">
                                        5 Ways to add texture to anything!
                                    </h2>
                                    <p className="pb-4 text-md">
                                        "Noisy" basses, abberated percussion, and some crunchy
                                        layers can give a lot of edge to your music. Here
                                        are five methods for making things sound coarse and texturized.
                                    </p>
                                    <div className="card-actions justify-end items-center">
                                    <div className="btn btn-primary">
                                        <span className="text-base">Read More</span>
                                    </div>
                                    </div>
                                </div>
                            </div>
                            </IconContext.Provider>
                        </div>
                    </div>
                </main>
            </div>
        );
    }
}

export default HomePage;