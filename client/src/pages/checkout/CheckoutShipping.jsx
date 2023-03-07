import React from 'react'

class CheckoutShipping extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      shippingAddress: null
    }
  }

  render() {
    return (
      <div className="checkout-shipping">
        <h1>Shipping</h1>
      </div>
    )
  }
}

export default CheckoutShipping
