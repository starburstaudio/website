import React from 'react'
import { IconContext } from 'react-icons'
import { FiMinusCircle } from 'react-icons/fi'

import { Order } from '../../common/api/store/Order'
import { Product } from '../../common/api/store/Product'

import { Outlet } from 'react-router-dom'

class CheckoutPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      order: new Order(),
      progress: 0
    }
  }

  getCurrentOrder() {
    this.state.order.getCurrentOrder().then((o) => {
      this.setState({ order: o })
    })
  }

  updateProgress() {
    const sub = window.location.href.split('/').pop()

    switch (sub) {
      case 'login':
        this.setState({ progress: 1 })
        break
      case 'pay':
        this.setState({ progress: 2 })
        break
      case 'done':
        this.setState({ progress: 3 })
        break
    }
  }

  componentDidMount() {
    this.getCurrentOrder()
    this.updateProgress()
  }

  render() {
    return (
      <main className="flex flex-col items-center justify-between">
        <div className="all-width pt-24">
          <div className="flex border-b border-base-300 py-6">
            <div className="h-min">
              <h1 className="text-4xl">Checkout</h1>
            </div>
          </div>
          <div className="flex gap-x-8">
            <div className="grow pr-8 pb-8">
              <div className="w-full my-6">
                <ul className="steps w-full">
                  <li
                    className={
                      'step ' + (this.state.progress > 0 ? 'step-primary' : '')
                    }>
                    Account Log-In
                  </li>
                  {this.state.order.totalWithTax !== 0 && (
                    <li
                      className={
                        'step ' +
                        (this.state.progress > 1 ? 'step-primary' : '')
                      }>
                      Payment
                    </li>
                  )}
                  <li
                    className={
                      'step ' + (this.state.progress > 2 ? 'step-primary' : '')
                    }>
                    All done!
                  </li>
                </ul>
              </div>
              <div className="mt-8">
                <Outlet />
              </div>
            </div>
            <div className="w-96">
              <h2 className="text-2xl my-8">Your Order</h2>
              {this.state.order.lines.products.map((l) => (
                <div className="flex-row flex mb-8 items-center" key={l.ID}>
                  <div>
                    <img
                      className="h-24 w-24 p-0 rounded-lg saturate-150 brightness-150 opacity-glow-subtle blur-xl absolute"
                      src={l.featuredAsset.preview}
                    />
                    <img
                      className="h-24 w-24 p-0 rounded-lg relative"
                      src={l.featuredAsset.preview}
                    />
                  </div>
                  <div className="grow ml-6 cursor-default">
                    <h3 className="text-lg font-bold leading-tight mb-2">
                      {l.name}
                    </h3>
                    <p className="text-base opacity-75">{l.formatPrice()}</p>
                  </div>
                  <div
                    className="btn btn-ghost text-primary btn-circle color-primary btn-sm "
                    onClick={() => this.removeFromOrder(l.ID)}>
                    <IconContext.Provider value={{ size: '1.5rem' }}>
                      <FiMinusCircle></FiMinusCircle>
                    </IconContext.Provider>
                  </div>
                </div>
              ))}
              <div className="py-6 border-t border-base-300">
                <div className="opacity-75 text-right">Total (after VAT)</div>
                <div className="text-xl text-right font-bold">
                  {Product.formatPrice(this.state.order.totalWithTax)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    )
  }
}

export default CheckoutPage
