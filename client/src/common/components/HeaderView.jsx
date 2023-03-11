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
      customer: new Customer(),
      latestProduct: new Product()
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
    this.getLatestProduct()
  }

  getLatestProduct() {
    this.state.latestProduct.fromLatest().then((r) => {
      this.setState({ latestProduct: r })
    })
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
              className="flex items-center text-xl font-bold h-full pr-4"
              to="/">
              <h2 className="font-bold">Starburst Audio</h2>
            </Link>
            <div className="flex flex-row h-full text-md">
              <div className="dropdown dropdown-hover">
                <Link to="/products/">
                  <label
                    tabIndex={0}
                    className="hover:text-primary h-full items-center flex cursor-pointer transition px-4">
                    Products
                  </label>
                </Link>
                <div
                  tabIndex={0}
                  className="dropdown-content -mt-2 menu p-4 shadow-2xl rounded-3xl">
                  <div className="flex">
                    <div className="flex flex-col gap-y-2 w-72">
                      <Link to="/products">
                        <div className="p-4 flex items-center gap-4 hover:backdrop-brightness-150 transition group rounded-2xl cursor-pointer">
                          <div className="-space-y-1 shrink">
                            <h3 className="text-xl font-semibold ">
                              All Products
                            </h3>
                            <div className="text-base opacity-75 group-hover:opacity-100 transition-opacity">
                              Check out all our products here.
                            </div>
                          </div>
                        </div>
                      </Link>
                      <Link to="/products/sample-packs">
                        <div className="p-4 flex items-center gap-4 hover:backdrop-brightness-125 transition group rounded-xl cursor-pointer">
                          <div className="w-16 h-16">
                            <img
                              src="/icons/skeu/Samples_md.png"
                              className="w-16 h-16 opacity-0 transition group-hover:opacity-75 blur-md absolute"
                            />
                            <img
                              src="/icons/skeu/Samples_md.png"
                              className="w-16 h-16 max-w-none relative group-hover:brightness-125 transition"
                            />
                          </div>
                          <div className="shrink">
                            <h3 className="text-lg font-semibold ">Samples</h3>
                            <div className="text-sm opacity-75 group-hover:opacity-100 transition-opacity">
                              High-quality Sample Packs to elevate your music.
                            </div>
                          </div>
                        </div>
                      </Link>
                      <Link to="/products/presets">
                        <div className="p-4 flex items-center gap-4 hover:backdrop-brightness-125 transition group rounded-xl cursor-pointer">
                          <div className="w-16 h-16">
                            <img
                              src="/icons/skeu/Presets_md.png"
                              className="w-16 h-16 opacity-0 transition group-hover:opacity-75 blur-md absolute"
                            />
                            <img
                              src="/icons/skeu/Presets_md.png"
                              className="w-16 h-16 max-w-none relative group-hover:brightness-125 transition"
                            />
                          </div>
                          <div className="shrink">
                            <h3 className="text-lg font-semibold">Presets</h3>
                            <div className="text-sm opacity-75 group-hover:opacity-100 transition-opacity">
                              Versatile Preset Packs for your favorite synths.
                            </div>
                          </div>
                        </div>
                      </Link>
                      <Link to="/products/plugins">
                        <div className="p-4 flex items-center gap-4 hover:backdrop-brightness-125 transition group rounded-xl cursor-pointer">
                          <div className="w-16 h-16">
                            <img
                              src="/icons/skeu/Plugins_md.png"
                              className="w-16 h-16 opacity-0 transition group-hover:opacity-75 blur-md absolute"
                            />
                            <img
                              src="/icons/skeu/Plugins_md.png"
                              className="w-16 h-16 max-w-none relative group-hover:brightness-125 transition"
                            />
                          </div>
                          <div className="shrink">
                            <h3 className="text-lg font-semibold">Plugins</h3>
                            <div className="text-sm opacity-75 group-hover:opacity-100 transition-opacity">
                              Plugins that make music production fun and easy.
                            </div>
                          </div>
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <Link
                className="hover:text-primary items-center flex transition px-4"
                to="/products/all/free">
                Free Stuff
              </Link>
              <Link
                className="hover:text-primary items-center flex transition px-4"
                to="/blog">
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
                className="dropdown-content menu menu-compact mt-3 shadow-2xl rounded-3xl w-80">
                <h2 className="pt-6 text-xl mb-2 px-6 font-bold">
                  Shopping Cart
                </h2>
                <div className="opacity-75 mb-3 px-6">
                  {this.state.order.totalQuantity +
                    (this.state.order.totalQuantity > 1 ? ' items' : 'item')}
                </div>
                <div className="px-6">
                  {this.state.order.lines.map((l) => (
                    <div className="flex-row flex mb-4 items-center" key={l.ID}>
                      <img
                        className="h-16 w-16 p-0 rounded-lg"
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
                  <div className="btn btn-lg btn-ghost rounded-b-3xl rounded-t-none no-animation w-full text-primary border-t border-base-300">
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
                className="btn btn-sm rounded-2xl btn-ghost normal-case"
                to="/u/login">
                <span>Log In</span>
              </Link>
              <Link
                className="btn btn-sm rounded-2xl btn-primary space-x-2 normal-case"
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
