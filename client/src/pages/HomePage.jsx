import React from 'react'
import { Link } from 'react-router-dom'

import { FiChevronRight } from 'react-icons/fi'
import { IconContext } from 'react-icons'

import { storeClient } from '../common/api/store/storeClient'
import gql from 'graphql-tag'
import ProductCard from '../common/components/ProductCard'

class HomePage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      latestSamplePacks: []
    }
  }

  componentDidMount() {
    storeClient
      .query({
        query: gql`
          query ListProducts {
            products(options: { sort: { createdAt: DESC } }) {
              items {
                id
                name
                slug
                description
                featuredAsset {
                  preview
                }
                variants {
                  priceWithTax
                }
              }
            }
          }
        `
      })
      .then((r) => {
        this.setState({ latestSamplePacks: r.data.products.items })
      })
  }

  render() {
    return (
      <main className="flex-col justify-center ">
        <div
          className="w-full flex justify-center start-banner pt-16"
          style={{
            backgroundImage:
              'url(https://images.pexels.com/photos/7130555/pexels-photo-7130555.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
          }}>
          <div
            className="all-width py-24 flex items-center justify-between bg-transparent"
            data-theme="light">
            <div className="h-min content-width">
              <h1 className="text-5xl z-5 w-full">
                The last Lo-Fi samples you&apos;ll ever need
              </h1>
              <div className="content-width">
                <p className="my-6 text-md">
                  With over 450 individual samples, this huge sample pack has
                  something for all flavors of lo-fi - From thumping, driven
                  kick drums to meticulously textured percussion and synth loops
                  with that signature vintage warmth. Embrace the past sound and
                  get your hands on this sample pack today!
                </p>
                <div>
                  <Link
                    className="btn shadow-2xl shadow-accent btn-accent btn-lg text-lg mr-2"
                    to="/p/lo-fi-memories">
                    <span>Check it out!</span>
                    <IconContext.Provider value={{ size: '1.5em' }}>
                      <FiChevronRight className="ml-2" />
                    </IconContext.Provider>
                  </Link>
                  <Link className="btn btn-ghost btn-lg" to="/products">
                    All Sample Packs{' '}
                  </Link>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="card w-[24rem] bg-base-100 shadow-xl image-full bannercover z-0 saturate-150 brightness-150 opacity-100 blur-3xl absolute">
                <figure>
                  <img
                    src="http://localhost:3001/assets/source/4b/cover.jpg"
                    alt="Cover image of the Lofi Sample Pack"
                  />
                </figure>
              </div>
              <div className="card w-[24rem] bg-base-100 shadow-xl image-full bannercover z-0">
                <figure>
                  <img
                    src="http://localhost:3001/assets/source/4b/cover.jpg"
                    alt="Cover image of the Lofi Sample Pack"
                  />
                </figure>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full flex items-center flex-col">
          <div className="all-width mt-16">
            <h2 className="text-4xl mb-4">Latest Products</h2>
            <p className="content-width mb-2 opacity-75">
              Sample Packs from Starburst Audio offer the perfect combination of
              sounds, loops, and samples to take your music production to the
              next level. Across many different genres, these sample packs are
              designed to provide you with the samples you need to create
              awesome music quickly and easily.
            </p>
            <IconContext.Provider value={{ size: '2em' }}>
              <div
                className="gap-8 my-8 grid-rows-none h-[42rem] overflow-hidden"
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(16rem, 1fr))',
                  maskImage:
                    'linear-gradient(to top, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1) 25%)'
                }}>
                {this.state.latestSamplePacks.map((p) => (
                  <ProductCard
                    key={p.productId}
                    assetPreview={p.featuredAsset.preview}
                    productName={p.name}
                    badges={[]}
                    priceWithTax={{
                      __typename: 'SinglePrice',
                      value: p.variants[0].priceWithTax
                    }}
                    description={p.description}
                    slug={p.slug}
                  />
                ))}
                <div className="card w-auto h-48 bg-base-200 card-bordered indicator" />
                <div className="card w-auto h-48 bg-base-200 card-bordered indicator" />
                <div className="card w-auto h-48 bg-base-200 card-bordered indicator" />
                <div className="card w-auto h-48 bg-base-200 card-bordered indicator" />
              </div>
            </IconContext.Provider>
            <div className="flex flex-col items-center -mt-16">
              <Link
                className="btn btn-accent btn-lg text-lg mr-2 z-10 shadow-2xl shadow-accent"
                to="/products">
                <span>Show all</span>
                <IconContext.Provider value={{ size: '1.5em' }}>
                  <FiChevronRight className="ml-2" />
                </IconContext.Provider>
              </Link>
            </div>
          </div>
        </div>
        <div className="w-full flex items-center flex-col mb-16">
          <div className="all-width mt-16">
            <h2 className="text-4xl mb-4">Blog</h2>
            <p className="content-width opacity-75">
              Whether you&apos;re a beginner, or you&apos;re already experienced
              with music production, you&apos;ll definitely get something out of
              our blog. It&apos;s where we share music production, sound design,
              mixing and mastering tips.
            </p>
          </div>
          <div className="all-width flex space-x-6 flex-row my-8">
            <IconContext.Provider value={{ size: '2em' }}>
              <div className="card bg-base-100 indicator grow flex-1 card-bordered">
                <figure>
                  <img src="https://images.unsplash.com/photo-1675019674011-9141ec0df347?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDEzfGlVSXNuVnRqQjBZfHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60" />
                </figure>
                <div className="card-body p-6">
                  <h2 className="card-title">
                    Should you put reverb on the bass?
                  </h2>
                  <p className="pb-4 text-md opacity-75">
                    As a rule of thumb, you shouldn&apos;t use reverb on bass
                    tracks. However, there are some exceptions to this rule that
                    you should always be aware of.
                  </p>
                  <div className="card-actions justify-end items-center">
                    <div className="btn btn-primary">
                      <span className="text-base">Read More</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card bg-base-100 indicator flex-1 card-bordered">
                <figure>
                  <img src="https://images.unsplash.com/photo-1675019674011-9141ec0df347?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDEzfGlVSXNuVnRqQjBZfHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60" />
                </figure>
                <div className="card-body p-6">
                  <h2 className="card-title">
                    How to make a synth sound &quot;alive&quot;
                  </h2>
                  <p className="pb-4 text-md opacity-75">
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
              <div className="card bg-base-100 indicator flex-1 card-bordered">
                <figure>
                  <img src="https://images.unsplash.com/photo-1675019674011-9141ec0df347?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDEzfGlVSXNuVnRqQjBZfHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60" />
                </figure>
                <div className="card-body p-6">
                  <h2 className="card-title">
                    5 Ways to add texture to anything!
                  </h2>
                  <p className="pb-4 text-md opacity-75">
                    &quot;Noisy&quot; basses, abberated percussion, and some
                    crunchy layers can give a lot of edge to your music. Here
                    are five methods for making things sound coarse and
                    texturized.
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
          <div className="fade-btm mb-8 all-width">
            <div className="w-full flex space-x-6 flex-row">
              <IconContext.Provider value={{ size: '2em' }}>
                <div className="card indicator h-48 grow flex-1 bg-base-200"></div>
                <div className="card indicator h-48 flex-1 bg-base-200"></div>
                <div className="card indicator h-48 flex-1 bg-base-200"></div>
              </IconContext.Provider>
            </div>
          </div>
          <div className="flex flex-col items-center -mt-16">
            <a
              className="btn btn-accent btn-lg text-lg mr-2 z-10 shadow-2xl shadow-accent"
              href="/">
              <span>Show all</span>
              <IconContext.Provider value={{ size: '1.5em' }}>
                <FiChevronRight className="ml-2" />
              </IconContext.Provider>
            </a>
          </div>
        </div>
      </main>
    )
  }
}

export default HomePage
