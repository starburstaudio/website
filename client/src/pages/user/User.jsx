import React from 'react'
import { Navigate, Link } from 'react-router-dom'
import { IconContext } from 'react-icons'
import { FiDownload, FiLink, FiSettings, FiClock } from 'react-icons/fi'
import { Customer } from '../../common/api/store/Customer'
import CheckOptions from '../../common/components/CheckOptions'

class UserProducts extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      section: '',
      customer: new Customer(),
      loggedIn: true
    }
  }

  componentDidMount() {
    this.state.customer
      .isLoggedIn()
      .then((r) => {
        if (r) return this.state.customer.getCurrentCustomer()
        else this.setState({ loggedIn: false })
      })
      .then((c) => {
        if (c) {
          this.setState({ customer: c })
          return this.state.customer.getOwnProducts()
        }
      })
      .then((c) => {
        this.setState({ customer: c })
      })
  }

  render() {
    if (!this.state.loggedIn) return <Navigate to="/u/login" />
    return (
      <main className="flex flex-col items-center pt-24">
        <h1 className="text-4xl all-width border-b border-base-300 py-6">
          {this.state.customer.firstName}&apos;s Account
        </h1>
        <div className="all-width flex space-x-4 items-start mb-8">
          <div className="w-56 mr-4 mb-8 shrink-0 sticky top-[4.5rem]">
            <IconContext.Provider value={{ size: '1.25em' }}>
              <h3 className="mt-6 text-lg">Your Account</h3>
              <div
                className="space-y-2 -ml-2 mt-2"
                style={{ width: 'calc(100% + 1rem)' }}>
                <CheckOptions
                  value={this.state.section}
                  options={[
                    {
                      jsx: (
                        <div className="flex-row flex gap-2 items-center">
                          <FiDownload />
                          <span>Products</span>
                        </div>
                      ),
                      value: 'products'
                    },
                    {
                      jsx: (
                        <div className="flex-row flex gap-2 items-center">
                          <FiClock />
                          <span>History</span>
                        </div>
                      ),
                      value: 'history'
                    },
                    {
                      jsx: (
                        <div className="flex-row flex gap-2 items-center">
                          <FiSettings />
                          <span>Settings</span>
                        </div>
                      ),
                      value: 'settings'
                    }
                  ]}
                  // onSelect={(o) => {
                  //   this.filterRedirect(o, null)
                  // }}
                />
              </div>
            </IconContext.Provider>
          </div>
          <div className="w-full grow">
            <h2 className="text-3xl my-6">Your products</h2>
            <p className="content-width opacity-75">
              These are all the products you&apos;ve purchased along with their
              download links. Note that these links only work while you are
              signed in and can only be used a set amount of times (hover the
              respective download icon to see how often)
            </p>
            <div className="">
              <div
                className="grid gap-y-4 pt-8 pb-2 font-bold"
                style={{
                  gridTemplateColumns: '1fr 1fr 1fr auto'
                }}>
                <div className="content-center flex items-center">
                  <div>Product</div>
                </div>
                <div className="content-center flex items-center">
                  <div>Purchase date</div>
                </div>
                <div className="content-center flex items-center">
                  <div>Serial</div>
                </div>
                <div className="w-[6.125rem]" />
              </div>
              {this.state.customer.orders.map((o, i) => {
                if (o?.products?.products.length > 1)
                  return (
                    <div className="my-4">
                      <div
                        key={i}
                        className="border-transparent rounded-xl box-border border px-3 -mx-3 transition hover:bg-base-200 hover:border-base-300 overflow-hidden">
                        <div className="mt-2 mb-2 transition">
                          Purchased on {new Date(o.date).toDateString()}
                        </div>
                        {o.products?.products.map((l, i) => (
                          <OrderLine key={i} i={i} l={l} o={o} multiview />
                        ))}
                      </div>
                    </div>
                  )
                else
                  return o.products?.products.map((l, i) => (
                    <OrderLine key={i} i={i} l={l} o={o} />
                  ))
              })}
            </div>
          </div>
        </div>
      </main>
    )
  }
}
/* eslint-disable react/prop-types */

class OrderLine extends React.Component {
  render() {
    return (
      <div
        className={
          this.props.multiview
            ? `grid gap-y-4 p-3 hover:bg-base-300 transition -mx-3 box-border group`
            : 'grid mb-2 gap-y-4 hover:bg-base-200 box-border border-transparent hover:border-base-300 border p-3 -mx-3 rounded-xl transition group'
        }
        style={{
          gridTemplateColumns: '1fr 1fr 1fr auto'
        }}>
        <div className="pl-0">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16">
              <img
                src={this.props.l.product.featuredAsset.preview}
                className="w-16 h-16 rounded-lg saturate-150 brightness-150 opacity-0 transition group-hover:opacity-75 blur-md absolute"
              />
              <img
                src={this.props.l.product.featuredAsset.preview}
                className="w-16 h-16 rounded-lg relative"
              />
            </div>
            <div>
              <div className="font-bold">{this.props.l.product.name}</div>
              <div className="text-sm opacity-50 group-hover:opacity-100 transition">
                {this.props.l.type}
              </div>
            </div>
          </div>
        </div>
        <div className="content-center flex items-center opacity-75 group-hover:opacity-100 transition">
          <div>{new Date(this.props.o.date).toDateString()}</div>
        </div>
        <div className="content-center flex items-center font-mono opacity-75 group-hover:opacity-100 transition">
          <div>TEST</div>
        </div>
        <IconContext.Provider value={{ size: '1.5rem' }}>
          <div className="content-center flex items-center opacity-0 group-hover:opacity-100 transition">
            <div className="tooltip" data-tip="Download">
              <a className="btn btn-ghost btn-circle text-primary">
                <FiDownload></FiDownload>
              </a>
            </div>
            <div className="tooltip" data-tip="Open store page">
              <Link
                to={`/p/${this.props.l.product.slug}`}
                className="btn btn-ghost btn-circle text-primary">
                <FiLink></FiLink>
              </Link>
            </div>
          </div>
        </IconContext.Provider>
      </div>
    )
  }
}

export default UserProducts
