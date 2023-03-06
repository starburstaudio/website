import React from 'react'
import { storeClient } from '../../common/api/store/storeClient'
import gql from 'graphql-tag'

class CheckoutPay extends React.Component {
  pay(method, metadata) {
    storeClient
      .mutate({
        mutation: gql`
          mutation AddPayment {
            addPaymentToOrder(input: {
              method: "${method}"
              metadata: ${JSON.stringify(metadata)}
            }) {
              ... on ErrorResult {
                errorCode
                message
              }
            }
          }
        `
      })
      .then((r) => {
        console.log(r)
      })
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
