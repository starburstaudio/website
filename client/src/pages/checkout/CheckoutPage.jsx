import React from 'react'
import { IconContext } from 'react-icons'
import { FiMinusCircle } from 'react-icons/fi'

import { Order } from '../../common/api/store/Order'
import { Product } from '../../common/api/store/Product'

import AccountCard from '../../common/components/AccountCard'
import LoadingSpinner from '../../common/components/LoadingSpinner'
import CheckoutPay from './CheckoutPay'
import { Customer } from '../../common/api/store/Customer'

import { subscribe } from '../../events'

class CheckoutPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      order: new Order(),
      progress: 0,
      currentView: (
        <div className="p-8 h-96 m-auto">
          <LoadingSpinner />
        </div>
      )
    }

    subscribe('updateCustomer', () => {
      this.getCurrentOrder(true)
    })
  }

  getCurrentOrder(loggedIn) {
    this.state.order.getCurrentOrder().then((o) => {
      this.setState({ order: o })
      console.log(o)
      switch (o.state) {
        case 'AddingItems':
          new Customer().isLoggedIn().then((r) => {
            if (r) {
              console.log('Is Logged in')
              if (o.address == null) {
                console.log('No Address')
                this.setState({ progress: 2, currentView: <CheckoutPay /> })
              } else {
                console.log('Has Address')
                this.setState({ progress: 2, currentView: <CheckoutPay /> })
              }
            } else {
              console.log('Is not logged in')
              this.setState({
                progress: 0,
                currentView: <AccountCard onLogin={<div />} signUpMode />
              })
            }
          })
          break
        case 'done':
          this.setState({ progress: 3 })
          break
        default:
          this.setState({
            progress: 0,
            currentView: (
              <div className="p-8 h-96 m-auto">
                <LoadingSpinner />
              </div>
            )
          })
      }
    })
  }

  componentDidMount() {
    this.getCurrentOrder()
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
                    Log-In
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
              <div className="mt-8">{this.state.currentView}</div>
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
