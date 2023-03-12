import React from 'react'
import PropTypes from 'prop-types'
import { Link, useParams } from 'react-router-dom'
import gql from 'graphql-tag'

import { IconContext } from 'react-icons'
import { FiCheck, FiFile, FiMusic, FiPlusCircle } from 'react-icons/fi'
import { storeClient } from '../common/api/store/storeClient'
import { Product } from '../common/api/store/Product'
import { trigger } from '../events'

import { AudioPlayer } from '../common/components/AudioPlayer'

function withParams(Component) {
  // eslint-disable-next-line react/display-name
  return (props) => <Component {...props} params={useParams()} />
}

class ProductPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      product: new Product()
    }
  }

  componentDidMount() {
    const product = this.props.params.product

    this.state.product.fromSlug(product).then((p) => {
      this.setState({ product: p })
    })
  }

  generateContents(contentText) {
    const out = []
    let nextIsHeading = true
    contentText.split('\n').forEach((l, i) => {
      if (nextIsHeading) {
        out.push(
          <h3 className="mt-4" key={i}>
            {l}
          </h3>
        )
        nextIsHeading = false
      } else if (l !== '')
        out.push(
          <li className="opacity-75 ml-4" key={i}>
            {l}
          </li>
        )
      else nextIsHeading = true
    })

    return out
  }

  addToOrder() {
    storeClient
      .mutate({
        mutation: gql`
        mutation {
          addItemToOrder(productVariantId: ${this.state.product.pvID}, quantity: 1) {
            __typename
            ... on Order {
              lines {
                id
                featuredAsset {
                  preview
                }
                productVariant {
                  name
                }
                proratedLinePrice
              }
              totalWithTax
              totalQuantity
            }
          }
        }
      `
      })
      .then((r) => {
        if (r.data.addItemToOrder.__typename === 'Order') {
          trigger('updateOrder', r.data.addItemToOrder)
        }
      })
  }

  render() {
    return (
      <main>
        <img
          alt=""
          src={this.state.product.featuredAsset?.source}
          className="w-full h-[48rem] saturate-150 opacity-glow-subtle blur-3xl absolute -z-10"
          style={{
            maskImage:
              'linear-gradient(to top, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 100%)'
          }}
        />
        <div className="flex flex-col items-center mb-8">
          <div className="all-width pt-24 gap-8 flex justify-between">
            <div className="content-width shrink-0">
              <h1 className="text-4xl my-6">{this.state.product.name}</h1>
              <div className="breadcrumbs m-0 mb-4 -mt-4 p-0 opacity-75">
                <ul>
                  <li>
                    <Link to="/products">All Products</Link>
                  </li>
                  <li>
                    <Link
                      to={`/products/${this.state.product.collections?.[0].slug}`}>
                      {this.state.product.collections?.[0].name}
                    </Link>
                  </li>
                  <li>{this.state.product.name}</li>
                </ul>
              </div>
              <h2 className="text-2xl">{this.state.product.formatPrice()}</h2>
              <p className="opacity-75 text-sm mb-4">Price includes VAT</p>
              <div
                dangerouslySetInnerHTML={{
                  __html: this.state.product.description
                }}
                className="mb-8 text-md space-y-2 opacity-75 leading-relaxed"
              />
              <div
                className="btn btn-primary backdrop-blur-3xl btn-lg rounded-full shadow-xl hover:shadow-primary hover:shadow-2xl mb-8"
                onClick={() => this.addToOrder()}>
                <IconContext.Provider value={{ size: '1.5em' }}>
                  <FiPlusCircle />
                  <span className="ml-4 text-lg">
                    {this.state.product.price === 0
                      ? 'Get for free'
                      : 'Buy now'}
                  </span>
                </IconContext.Provider>
              </div>
            </div>
            <div className="relative" style={{ width: '32rem' }}>
              {
                <img
                  alt=""
                  src={this.state.product.featuredAsset?.source}
                  className="w-full rounded-2xl saturate-150 brightness-150 opacity-glow blur-3xl absolute"
                />
              }
              {
                <img
                  alt="Cover"
                  src={this.state.product.featuredAsset?.source}
                  className="w-full rounded-2xl relative"
                />
              }
            </div>
          </div>
        </div>
        {this.state.product.collections?.filter(
          (c) => c.slug === 'sample-packs'
        ).length > 0 && (
          <div className="flex flex-col items-center mb-8 space-y-4">
            <div className="all-width">
              <h2 className="text-4xl mb-4 mt-8 text-center">
                What&apos;s inside?
              </h2>
            </div>
            {this.state.product.customFields.youtubeUrl !== undefined && (
              <iframe
                className="all-width aspect-video rounded-2xl border border-base-300 shadow"
                src={
                  'https://www.youtube-nocookie.com/embed/' +
                  this.state.product.customFields.youtubeUrl.split(
                    '/watch?v='
                  )[1]
                }
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            )}
            <IconContext.Provider value={{ size: '2em' }}>
              <div className="stats shadow bg-base-200 border-base-300 border">
                {this.state.product.customFields.totalSamples !== undefined && (
                  <div className="stat">
                    <div className="stat-figure text-primary">
                      <FiMusic />
                    </div>
                    <div className="stat-title">Total Samples:</div>
                    <div className="stat-value">
                      {this.state.product.customFields.totalSamples}
                    </div>
                    <div className="stat-desc">High Quality Samples</div>
                  </div>
                )}
                {this.state.product.customFields.fileSize !== undefined && (
                  <div className="stat">
                    <div className="stat-figure text-primary">
                      <FiFile />
                    </div>
                    <div className="stat-title">File Size:</div>
                    <div className="stat-value">
                      {this.state.product.customFields.fileSize}
                    </div>
                    <div className="stat-desc">Lossless Files</div>
                  </div>
                )}
                <div className="stat">
                  <div className="stat-figure text-primary">
                    <FiCheck />
                  </div>
                  <div className="stat-title">Everything:</div>
                  <div className="stat-value">100%</div>
                  <div className="stat-desc">Royalty Free</div>
                </div>
              </div>
            </IconContext.Provider>
            <div className="all-width flex gap-4">
              <div className="card shadow bg-base-200 grow border-base-300 border">
                <div className="card-body">
                  {this.state.product.assets.some((a) => {
                    return a.mimeType.split('/')[0] === 'audio'
                  }) && (
                    <>
                      <h2 className="text-2xl">Previews</h2>
                      <p className="opacity-75">
                        Here are just some of the{' '}
                        {this.state.product.customFields.totalSamples} samples
                        from this pack!
                      </p>
                    </>
                  )}
                  <div
                    className="grid gap-4 mt-4 "
                    style={{
                      gridTemplateColumns:
                        'repeat(auto-fill, minmax(20rem, 1fr))'
                    }}>
                    {this.state.product.assets.map((a) =>
                      a.mimeType.split('/')[0] === 'audio' ? (
                        <div
                          key={a.id}
                          className="bg-base-300 py-4 px-6 border border-opacity-20 border-gray-500 rounded-lg">
                          <AudioPlayer name={a.name} src={a.source} />
                        </div>
                      ) : null
                    )}
                  </div>
                </div>
              </div>
              {this.state.product.customFields.contents !== undefined && (
                <div className="card shadow bg-base-200 border-base-300 border">
                  <div className="card-body">
                    <h2 className="text-2xl">Content</h2>
                    <ul>
                      {this.generateContents(
                        this.state.product.customFields.contents
                      )}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    )
  }
}

ProductPage.propTypes = {
  params: PropTypes.object
}

export default withParams(ProductPage)
