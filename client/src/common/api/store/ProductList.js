import { storeClient } from './storeClient'
import { Product } from './Product'

import gql from 'graphql-tag'

class ProductList {
  constructor() {
    this.products = []
    this.totalItems = 0
  }

  listAll(section, onlyFree) {
    return new Promise((resolve) => {
      storeClient
        .query({
          query: gql`
            query {
                search(input: {
                ${
                  section !== undefined
                    ? 'collectionSlug: "' + section + '" '
                    : ''
                }
                ${onlyFree ? 'facetValueIds: [41]' : ''}
                }) {
                totalItems
                items {
                    productId
                    productVariantId
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
          `
        })
        .then((result) => {
          const items = []

          result.data.search.items.forEach((r) => {
            const p = new Product().fromSearchResult(r)
            items.push(p)
          })

          this.products = items
          this.totalItems = result.data.search.totalItems
          resolve(this)
        })
    })
  }
}

export { ProductList }
