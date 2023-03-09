import React from 'react'
import { IconContext } from 'react-icons'
import {
  FiDownload,
  FiLogOut,
  FiMinusCircle,
  FiSettings,
  FiShoppingCart,
  FiUser
} from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { storeClient } from '../api/store/storeClient'

import { Product } from '../api/store/Product'
import { Customer } from '../api/store/Customer'

import gql from 'graphql-tag'
import { subscribe } from '../../events'

class HeaderView extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      activeOrder: false,
      order: {
        lines: [],
        totalWithTax: 0,
        totalQuantity: 0
      },
      customer: new Customer()
    }
    subscribe('updateOrder', (r) => {
      const lines = []
      const o = r.detail
      o.lines.forEach((line) => {
        const p = new Product()
        p.fromOrderLine(line)
        lines.push(p)
      })
      this.setState({
        activeOrder: true,
        order: {
          lines,
          totalWithTax: o.totalWithTax,
          totalQuantity: o.totalQuantity
        }
      })
    })

    subscribe('updateCustomer', (c) => {
      this.setState({ customer: c.detail })
      this.getCurrentOrder()
    })
  }

  componentDidMount() {
    this.state.customer.getCurrentCustomer()
    this.getCurrentOrder()
  }

  getCurrentOrder() {
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
          const lines = []
          const o = r.data.activeOrder
          o.lines.forEach((line) => {
            const p = new Product()
            p.fromOrderLine(line)
            lines.push(p)
          })
          this.setState({
            activeOrder: true,
            order: {
              lines,
              totalWithTax: o.totalWithTax,
              totalQuantity: o.totalQuantity
            }
          })
        }
      })
  }

  logout() {
    storeClient
      .mutate({
        mutation: gql`
          mutation {
            logout {
              success
            }
          }
        `
      })
      .then((r) => {
        if (r.data?.logout?.success === true) this.componentDidMount()
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
        if (r.data.removeAllOrderLines.__typename === 'Order') {
          const lines = []
          const o = r.data.removeAllOrderLines
          o.lines.forEach((line) => {
            const p = new Product()
            p.fromOrderLine(line)
            lines.push(p)
          })
          this.setState({
            activeOrder: true,
            order: {
              lines,
              totalWithTax: o.totalWithTax,
              totalQuantity: o.totalQuantity
            }
          })
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
        if (r.data.removeOrderLine.__typename === 'Order') {
          const lines = []
          const o = r.data.removeOrderLine
          o.lines.forEach((line) => {
            const p = new Product()
            p.fromOrderLine(line)
            lines.push(p)
          })
          this.setState({
            activeOrder: true,
            order: {
              lines,
              totalWithTax: o.totalWithTax,
              totalQuantity: o.totalQuantity
            }
          })
        }
      })
  }

  render() {
    return (
      <header className="flex justify-center fixed top-0 bg-base-200 header z-20 h-14">
        <div className="px-0 all-width py-0 flex flex-row gap-x-3 items-center">
          <div className="flex-1 flex flex-row h-full">
            <Link
              className="flex items-center text-lg font-bold h-full mr-8"
              to="/">
              Starburst Audio
            </Link>
            <div className="flex flex-row gap-x-8 h-full text-sm">
              <Link
                className="hover:text-primary items-center flex"
                to="/products/all/free">
                Free Stuff
              </Link>
              <Link
                className="hover:text-primary items-center flex"
                to="/products/all/free">
                Plugins
              </Link>
              <Link
                className="hover:text-primary items-center flex"
                to="/products/all/free">
                Sample Packs
              </Link>
              <Link
                className="hover:text-primary items-center flex"
                to="/products/all/free">
                Blog
              </Link>
            </div>
          </div>
          {this.state.activeOrder && (
            <div className="dropdown dropdown-end">
              <label tabIndex={0}>
                <div className="btn btn-ghost btn-circle btn-xs w-12 h-12 flex justify-center items-center">
                  <div className="indicator">
                    <span className="indicator-item badge badge-xs text-xs badge-primary">
                      {this.state.order.totalQuantity}
                    </span>
                    <IconContext.Provider value={{ size: '1.25rem' }}>
                      <FiShoppingCart className="-ml-1 mt-1" />
                    </IconContext.Provider>
                  </div>
                </div>
              </label>
              <ul
                tabIndex={0}
                className="dropdown-content menu menu-compact mt-3 shadow-lg rounded-box w-80 border-base-300 border">
                <h2 className="pt-6 text-xl mb-2 px-6">Shopping Cart</h2>
                <div className="opacity-75 mb-3 px-6">
                  {this.state.order.totalQuantity} items
                </div>
                <div className="border-b border-base-300 px-6">
                  {this.state.order.lines.map((l) => (
                    <div className="flex-row flex mb-4 items-center" key={l.ID}>
                      <img
                        className="h-16 w-16 p-0 rounded-lg border-base-300 border"
                        src={l.featuredAsset.preview}
                      />
                      <div className="grow ml-3 cursor-default">
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
                </div>
                <div className="py-3 px-6">
                  <div className="opacity-75">Total (after VAT)</div>
                  <div className="text-lg font-bold">
                    {Product.formatPrice(this.state.order.totalWithTax)}
                  </div>
                </div>
                <Link to="/checkout" className="w-full">
                  <div className="btn btn-lg btn-accent rounded-b-2xl rounded-t-none no-animation w-full">
                    Checkout Now
                    <IconContext.Provider value={{ size: '1.5rem' }}>
                      <FiShoppingCart className="ml-2"></FiShoppingCart>
                    </IconContext.Provider>
                  </div>
                </Link>
              </ul>
            </div>
          )}
          {!this.state.customer.loggedIn && (
            <div className="gap-x-3 flex">
              <Link
                className="btn btn-sm rounded-2xl text-sm btn-ghost normal-case"
                to="/u/login">
                <span>Log In</span>
              </Link>
              <Link
                className="btn btn-sm rounded-2xl text-sm btn-primary space-x-2 normal-case"
                to="/u/login">
                <IconContext.Provider value={{ size: '1rem' }}>
                  <FiUser />
                </IconContext.Provider>
                <span>Sign Up</span>
              </Link>
            </div>
          )}
          {this.state.customer.loggedIn && (
            <div className="dropdown h-12 dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img
                    alt="Your Account"
                    src="https://images.unsplash.com/photo-1619379180294-3e714910e031?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
                  />
                </div>
              </label>
              <IconContext.Provider value={{ size: '1rem' }}>
                <ul
                  tabIndex={0}
                  className="mt-3 p-2 menu menu-compact dropdown-content shadow-2xl bg-base-200 w-52 border-base-300 border rounded-box z-50">
                  <h2 className="p-3 text-xl">Account</h2>
                  <li>
                    <Link to="/u/products">
                      <div className="text-primary">
                        <FiDownload />
                      </div>
                      My Products
                    </Link>
                  </li>
                  <li>
                    <Link to="/u/settings">
                      <div className="text-primary">
                        <FiSettings />
                      </div>
                      Settings
                    </Link>
                  </li>
                  <li>
                    <div onClick={() => this.logout()}>
                      <div className="text-primary">
                        <FiLogOut />
                      </div>
                      Logout
                    </div>
                  </li>
                </ul>
              </IconContext.Provider>
            </div>
          )}
        </div>
      </header>
    )
  }
}

export default HeaderView
