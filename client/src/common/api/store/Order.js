import { storeClient } from './storeClient'
import gql from 'graphql-tag'

import { ProductList } from './ProductList'
import { Address } from './Address'

class Order {
  constructor() {
    this.lines = new ProductList()
    this.totalWithTax = 0
    this.totalQuantity = 0
    this.state = ''
    this.address = new Address()
  }

  getCurrentOrder() {
    return new Promise((resolve) => {
      storeClient
        .query({
          query: gql`
            query GetCurrentOrder {
              activeOrder {
                state
                shippingAddress {
                  fullName
                  company
                  streetLine1
                  streetLine2
                  city
                  province
                  postalCode
                  country
                  phoneNumber
                  customFields
                }
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
            this.activeOrder = false
          } else {
            const o = r.data.activeOrder
            this.state = o.state
            this.activeOrder = true
            this.lines.fromLines(o)
            this.totalWithTax = o.totalWithTax
            this.totalQuantity = o.totalQuantity

            this.address.fromOrderAddress(o.shippingAddress)

            resolve(this)
          }
        })
    })
  }
}

export { Order }
