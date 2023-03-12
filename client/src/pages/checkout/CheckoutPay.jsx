import React from 'react'
import { storeClient } from '../../common/api/store/storeClient'
import gql from 'graphql-tag'

// TODO: Shipping Step

class CheckoutPay extends React.Component {
  pay(method, metadata) {
    storeClient
      .mutate({
        mutation: gql`
          mutation {
            setOrderShippingMethod(shippingMethodId: "1") {
              __typename
              ... on OrderModificationError {
                message
              }
              ... on IneligibleShippingMethodError {
                message
              }
              ... on NoActiveOrderError {
                message
              }
            }
          }
        `
      })
      .then((r) => {
        if (r.data.setOrderShippingMethod.__typename === 'Order')
          return storeClient.mutate({
            mutation: gql`
              mutation {
                transitionOrderToState(state: "ArrangingPayment") {
                  __typename
                  ... on OrderStateTransitionError {
                    errorCode
                    message
                  }
                }
              }
            `
          })
      })
      .then((r) => {
        if (r.data.transitionOrderToState.__typename === 'Order') {
          return storeClient.mutate({
            mutation: gql`
              mutation {
                addPaymentToOrder(input: {
                  method: "${method}"
                  metadata: ${JSON.stringify(metadata)}
                }) {
                  ... on Order {
                    state
                  }
                  ... on ErrorResult {
                    errorCode
                    message
                  }
                }
              }
            `
          })
        }
      })
      .then((r) => {})
  }

  render() {
    return (
      <div>
        <h2 className="text-3xl">Choose your payment option</h2>
        <p></p>
        <div className="flex flex-col align-middle p-8 gap-8 items-center">
          <div
            className="btn btn-lg text-lg shadow-2xl w-auto"
            onClick={() => this.pay('steal', {})}>
            Steal
          </div>
        </div>
      </div>
    )
  }
}

export default CheckoutPay
