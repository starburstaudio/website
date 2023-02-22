import React from 'react'
import PropTypes from 'prop-types'

import { Link } from 'react-router-dom'
import { FiPlusCircle } from 'react-icons/fi'

import { storeClient } from '../api/store/storeClient'
import { trigger } from '../../events'

import gql from 'graphql-tag'

class ProductCard extends React.Component {
  state = {
    loading: true,
    error: null
  }

  formatBadge(b) {
    switch (Number(b)) {
      case 41:
        return <div className="badge badge-secondary">FREE</div>
      case 42:
        return <div className="badge badge-accent">NEW</div>
      default:
    }
  }

  formatPrice(p) {
    let v = 0
    if (p.__typename === 'SinglePrice') v = p.value
    if (p.__typename === 'PriceRange') v = p.min

    if (p.value !== 0) {
      return parseFloat(v) / 100.0 + ' $'
    } else {
      return 'FREE'
    }
  }

  addToOrder() {
    storeClient
      .mutate({
        mutation: gql`
        mutation {
          addItemToOrder(productVariantId: ${this.props.id}, quantity: 1) {
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
      <div className="card w-auto card-bordered border-base-300 bg-base-200 indicator h-[36rem]">
        <figure className="aspect-square shrink-0">
          <img src={this.props.assetPreview} />
        </figure>
        <div className="card-body p-6 flex-1">
          <h2 className="card-title h-min font-bold">
            {this.props.productName}
            {this.formatBadge(this.props.badges[0])}
          </h2>
          <p className="font-bold text-base h-min grow-0">
            {this.formatPrice(this.props.priceWithTax)}
          </p>
          <div
            dangerouslySetInnerHTML={{ __html: this.props.description }}
            className="pb-4 text-sm overflow-hidden opacity-75 h-0 grow"
            style={{
              maskImage:
                'linear-gradient(to top, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1) 50%)'
            }}
          />
          <div className="card-actions justify-end items-center">
            <Link
              className="btn btn-ghost text-md btn-sm"
              to={'/p/' + this.props.slug}>
              More Info
            </Link>
            <div
              className="btn btn-primary btn-md"
              onClick={() => this.addToOrder()}>
              <span className="mr-2">Buy</span>
              <FiPlusCircle />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

ProductCard.propTypes = {
  id: PropTypes.number,
  productName: PropTypes.string,
  priceWithTax: PropTypes.number,
  description: PropTypes.string,
  slug: PropTypes.string,
  badges: PropTypes.array,
  assetPreview: PropTypes.string
}

export default ProductCard
