import React from 'react'
import { IconContext } from 'react-icons'
import { FiMinusCircle } from 'react-icons/fi'

import { Order } from '../../common/api/store/Order'
import { Product } from '../../common/api/store/Product'
import AccountCard from '../../common/components/AccountCard'

class CheckoutPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      order: new Order()
    }
  }

  getCurrentOrder() {
    this.state.order.getCurrentOrder().then((o) => {
      console.log(o)
      this.setState({ order: o })
    })
  }

  componentDidMount() {
    this.getCurrentOrder()
  }

  render() {
    return (
      <main className="flex flex-col items-center justify-between">
        <div className="all-width py-24">
          <div className="flex border-b border-base-300 py-6">
            <div className="h-min">
              <h1 className="text-4xl">Checkout</h1>
            </div>
          </div>
          <div className="flex gap-x-8">
            <div className="grow pr-8 border-r border-base-300">
              <div className="w-full my-6">
                <ul className="steps w-full">
                  <li className="step step-primary">Account Log-In</li>
                  <li className="step">Payment</li>
                  <li className="step">All done!</li>
                </ul>
              </div>
              <AccountCard />
            </div>
            <div className="w-80">
              <h2 className="text-3xl my-6">Your Order</h2>
              {this.state.order.lines.products.map((l) => (
                <div className="flex-row flex mb-4 items-center" key={l.ID}>
                  <img
                    className="h-20 w-20 p-0 rounded-xl border-base-300 border"
                    src={l.featuredAsset.preview}
                  />
                  <div className="grow ml-6 cursor-default">
                    <h3 className="text-base leading-tight">{l.name}</h3>
                    <p className="text-sm opacity-75">{l.formatPrice()}</p>
                  </div>
                  <div
                    className="btn btn-ghost text-primary btn-circle color-primary btn-sm "
                    onClick={() => this.removeFromOrder(l.ID)}>
                    <IconContext.Provider value={{ size: '1.25rem' }}>
                      <FiMinusCircle></FiMinusCircle>
                    </IconContext.Provider>
                  </div>
                </div>
              ))}
              <div className="py-3 border-t border-base-300">
                <div className="opacity-75 text-right">Total (after VAT)</div>
                <div className="text-xl text-right font-bold">
                  {Product.formatPrice(this.state.order.totalWithTax)}
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="btn btn-ghost">Back</div>
                <div className="btn btn-primary grow">Continue</div>
              </div>
            </div>
          </div>
        </div>
      </main>
    )
  }
}

export default CheckoutPage
