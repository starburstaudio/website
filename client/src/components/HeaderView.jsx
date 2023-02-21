import React from 'react'
import { IconContext } from 'react-icons'
import {
  FiDownload,
  FiLogOut,
  FiMinusCircle,
  FiSettings,
  FiShoppingCart
} from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { storeClient } from '../storeClient'
import gql from 'graphql-tag'
import { subscribe } from '../events'

class HeaderView extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      activeOrder: false,
      order: {
        lines: [],
        totalWithTax: 0,
        totalQuantity: 0
      }
    }
    this.getCurrentOrder()
    subscribe('updateOrder', (r) => {
      this.setState({ order: r.detail })
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
          this.setState({ activeOrder: true })
          this.setState({ order: r.data.activeOrder })
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
          this.setState({ order: r.data.removeAllOrderLines })
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
          this.setState({ order: r.data.removeOrderLine })
        }
      })
  }

  render() {
    return (
      <header className="flex justify-center fixed top-0 bg-base-200 header z-20">
        <div className="navbar px-0 all-width">
          <div className="flex-1">
            <Link className="btn normal-case text-2xl" to="/">
              SBA
            </Link>
          </div>
          <div className="flex-none">
            <ul className="menu menu-horizontal px-1">
              <li>
                <Link to="/products/all/free">Free Stuff</Link>
              </li>
              <li>
                <Link to="/products/plugins">Plugins</Link>
              </li>
              <li>
                <Link to="/products/sample-packs">Sample Packs</Link>
              </li>
              <li>
                <Link to="/">Blog</Link>
              </li>
            </ul>
            <div className="form-control">
              <input
                type="text"
                placeholder="Search..."
                className="input input-ghost input-sm mx-2"
              />
            </div>
            {this.state.activeOrder && (
              <div className="dropdown dropdown-end">
                <label tabIndex={0}>
                  <div className="btn btn-ghost btn-circle w-12 h-12 mx-2 flex justify-center items-center">
                    <div className="indicator">
                      <span className="indicator-item badge badge-sm text-sm badge-primary">
                        {this.state.order.totalQuantity}
                      </span>
                      <IconContext.Provider value={{ size: '1.5rem' }}>
                        <FiShoppingCart className="-ml-1 mt-1" />
                      </IconContext.Provider>
                    </div>
                  </div>
                </label>
                <ul
                  tabIndex={0}
                  className="dropdown-content menu menu-compact px-6 mt-3 shadow-2xl rounded-box w-80 border-base-300 border">
                  <h2 className="pt-6 text-xl">Shopping Cart</h2>
                  {this.state.order.lines.map((l) => (
                    <div
                      className="flex-row flex border-b border-base-300 py-3 items-center"
                      key={l.id}>
                      <img
                        className="h-16 w-16 p-0 rounded-lg"
                        src={l.featuredAsset.preview}
                      />
                      <div className="grow ml-3 cursor-default">
                        <h3 className="text-base">{l.productVariant.name}</h3>
                        <p className="text-sm">{l.proratedLinePrice}</p>
                      </div>
                      <div
                        className="btn btn-ghost text-primary btn-circle color-primary btn-sm "
                        onClick={() => this.removeFromOrder(l.id)}>
                        <IconContext.Provider value={{ size: '1.25rem' }}>
                          <FiMinusCircle></FiMinusCircle>
                        </IconContext.Provider>
                      </div>
                    </div>
                  ))}
                  <div className="pt-3">
                    Total (after VAT): {this.state.order.totalWithTax}
                  </div>
                  <div className="py-3 justify-end flex-row flex">
                    <div
                      className="btn btn-sm btn-ghost text-sm"
                      onClick={() => this.removeAllFromOrder()}>
                      Remove all
                    </div>
                    <div className="btn btn-sm btn-primary ml-2">Check out</div>
                  </div>
                </ul>
              </div>
            )}
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
                <ul className="mt-3 p-2 menu menu-compact dropdown-content shadow-2xl bg-base-200 w-52 border-base-300 border rounded-box z-50">
                  <h2 className="p-3 text-xl">Your Profile</h2>
                  <li>
                    <Link to="my/products">
                      <div className="text-primary">
                        <FiDownload />
                      </div>
                      My Products
                    </Link>
                  </li>
                  <li>
                    <Link to="settings">
                      <div className="text-primary">
                        <FiSettings />
                      </div>
                      Settings
                    </Link>
                  </li>
                  <li>
                    <Link to="settings">
                      <div className="text-primary">
                        <FiLogOut />
                      </div>
                      Logout
                    </Link>
                  </li>
                </ul>
              </IconContext.Provider>
            </div>
          </div>
        </div>
      </header>
    )
  }
}

export default HeaderView
