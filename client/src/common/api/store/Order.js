import { storeClient } from './storeClient'
import gql from 'graphql-tag'

import { ProductList } from './ProductList'

class Order {
  constructor() {
    this.lines = new ProductList()
    this.totalWithTax = 0
    this.totalQuantity = 0
  }

  getCurrentOrder() {
    return new Promise((resolve) => {
      storeClient
        .query({
          query: gql`
            query GetCurrentOrder {
              activeOrder {
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
          `
        })
        .then((r) => {
          if (r.data.activeOrder == null) {
            this.setState({ activeOrder: false })
          } else {
            const o = r.data.activeOrder

            this.activeOrder = true
            this.lines.fromLines(o)
            this.totalWithTax = o.totalWithTax
            this.totalQuantity = o.totalQuantity

            resolve(this)
          }
        })
    })
  }
}

export { Order }
