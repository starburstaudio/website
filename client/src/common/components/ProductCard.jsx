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

  addToOrder() {
    storeClient
      .mutate({
        mutation: gql`
        mutation {
          addItemToOrder(productVariantId: ${this.props.product.id}, quantity: 1) {
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
          <img src={this.props.product.featuredAsset?.source} />
        </figure>
        <div className="card-body p-6 flex-1">
          <h2 className="card-title h-min font-bold">
            {this.props.product.name}
            {this.props.product.badge()}
          </h2>
          <p className="font-bold text-base h-min grow-0">
            {this.props.product.formatPrice()}
          </p>
          <div
            dangerouslySetInnerHTML={{ __html: this.props.product.description }}
            className="pb-4 text-sm overflow-hidden opacity-75 h-0 grow"
            style={{
              maskImage:
                'linear-gradient(to top, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1) 50%)'
            }}
          />
          <div className="card-actions justify-end items-center">
            <Link
              className="btn btn-ghost text-md btn-sm"
              to={'/p/' + this.props.product.slug}>
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
  product: PropTypes.object
}

export default ProductCard
