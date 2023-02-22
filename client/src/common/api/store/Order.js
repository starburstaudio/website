import { storeClient } from "./storeClient"
import gql from "graphql-tag"

class Order {
  constructor(
    totalWithTax = 0,
    totalQuantity = 0,
    lines = [],
  ) {
    this.totalWithTax = totalWithTax
    this.totalQuantity = totalQuantity
    this.lines = lines
  }

  static orderRequest = ```
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
  ```

  setFromOrderData(o) {
    const lines = []

    o.lines.forEach((line) => {
      const p = new Product()
      p.fromOrderLine(line)
      lines.push(p)
    })

    this.lines = lines
    this.totalQuantity = o.totalQuantity
    this.totalWithTax = o.totalWithTax
  }

  loadOrder() {
    storeClient
      .query({
        query: gql`
          query GetCurrentOrder {
            activeOrder {
              ${Order.orderRequest}
            }
          }
        `
      })
      .then((r) => {
        if (r.data.activeOrder != null)  {
          setFromOrderData(r.data.activeOrder)
        }
      })
  }

  removeAllFromOrder() {
    storeClient
      .mutate({
        mutation: gql`
          mutation {
            removeAllOrderLines {
              __typename
              ... on Order {
                ${Order.orderRequest}
              }
            }
          }
        `
      })
      .then((r) => {
        if (r.data.removeAllOrderLines.__typename === 'Order') {
          this.setFromOrderData(r.data.removeAllOrderLines)
        }
      })
  }

  addToOrder(productVariantId) {
    storeClient
      .mutate({
        mutation: gql`
        mutation {
          addItemToOrder(productVariantId: ${productVariantId}, quantity: 1) {
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
          this.setFromOrderData(r.data.addItemToOrder)
        }
      })
  }

  removeFromOrder(id) {
    storeClient
      .mutate({
        mutation: gql`
        mutation {
          removeOrderLine(orderLineId: ${id}) {
            __typename
            ... on Order {
              ${Order.orderRequest}
            }
          }
        }
      `
      })
      .then((r) => {
        if (r.data.removeOrderLine.__typename === 'Order') {
          this.setFromOrderData(r.data.removeOrderLine)
        }
      })
    }
}

export { Order }