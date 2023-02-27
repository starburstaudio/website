import { storeClient } from './storeClient'
import { Product } from './Product'

import gql from 'graphql-tag'

class ProductList {
  constructor() {
    this.products = []
    this.totalItems = 0
  }

  listAll() {
    return new Promise((resolve) => {
      storeClient
        .query({
          query: gql`
            query {
              products(options: { sort: { createdAt: DESC } }) {
                totalItems
                items {
                  id
                  name
                  slug
                  description
                  facetValues {
                    id
                  }
                  featuredAsset {
                    preview
                  }
                  variants {
                    id
                    priceWithTax
                  }
                }
              }
            }
          `
        })
        .then((result) => {
          const items = []

          result.data.products.items.forEach((r) => {
            const p = new Product().fromProductListing(r)
            items.push(p)
          })

          this.products = items
          this.totalItems = result.data.products.totalItems
          resolve(this)
        })
    })
  }

  search(section, onlyFree) {
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
                ${onlyFree ? 'facetValueIds: [4]' : ''}
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

  fromLines(o) {
    const lines = []
    o.lines.forEach((line) => {
      const p = new Product()
      p.fromOrderLine(line)
      lines.push(p)
    })
    this.products = lines
  }
}

export { ProductList }
