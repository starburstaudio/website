import React from 'react'
import PropTypes from 'prop-types'
import { useParams } from 'react-router-dom'

import { IconContext } from 'react-icons'
import { FiSearch } from 'react-icons/fi'
import { HiOutlineGift } from 'react-icons/hi'
import { ReactComponent as SamplesIcon } from '../common/icons/samples.svg'
import { ReactComponent as PresetsIcon } from '../common/icons/presets.svg'
import { ReactComponent as PluginsIcon } from '../common/icons/plugins.svg'

import { storeClient } from '../common/api/store/storeClient'
import { ProductList } from '../common/api/store/ProductList'

import gql from 'graphql-tag'
import CheckOptions from '../common/components/CheckOptions'
import CheckSelect from '../common/components/CheckSelect'
import ProductCard from '../common/components/ProductCard'

function withParams(Component) {
  // eslint-disable-next-line react/display-name
  return (props) => <Component {...props} params={useParams()} />
}

class ProductsPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      products: new ProductList(),
      allItemCount: 0,
      sectionTitle: 'All Products',
      section:
        this.props.params.section === 'all'
          ? undefined
          : this.props.params.section,
      onlyFree: this.props.params.free === 'free',
      searchQuery: ''
    }
  }

  formatPrice(p) {
    let v = 0
    if (p.__typename === 'SinglePrice') v = p.value
    if (p.__typename === 'PriceRange') v = p.min

    if (p.value !== 0) {
      return parseFloat(v) / 100.0 + ' $'
    } else {
      return 'FREE'
    }
  }

  formatBadge(b) {
    switch (Number(b)) {
      case 41:
        return <div className="badge badge-secondary">FREE</div>
      case 42:
        return <div className="badge badge-accent">NEW</div>
      default:
    }
  }

  performSearch() {
    if (
      this.state.searchQuery !== '' ||
      this.state.onlyFree ||
      (this.state.section !== undefined && this.state.section !== '')
    ) {
      this.state.products
        .search(this.state.section, this.state.onlyFree)
        .then((r) => {
          this.setState({ products: r })
        })
    } else {
      this.state.products
        .listAll(this.state.section, this.state.onlyFree)
        .then((r) => {
          this.setState({ products: r })
        })
    }
  }

  componentDidMount() {
    this.performSearch()
    this.setTitle()
    storeClient
      .query({
        query: gql`
          query GetTotal {
            search(input: {}) {
              totalItems
            }
          }
        `
      })
      .then((r) => {
        this.setState({ allItemCount: r.data.search.totalItems })
      })
  }

  filterRedirect(section, isFree) {
    let newURL = '/products'
    if (section !== null) {
      if (section !== '') {
        storeClient
          .query({
            query: gql`
            query GetCollectionInfo {
              collection(slug: "${section}") {
                name
              }
            }
          `
          })
          .then((result) => {
            this.setState({ sectionTitle: result.data.collection.name })
          })
      } else {
        this.setState({ sectionTitle: 'All Products' })
      }
      newURL += '/' + section
    } else {
      section = this.state.section
      newURL += section === '' || section === undefined ? '/all' : '/' + section
    }
    if (isFree !== null) {
      this.setState({ onlyFree: isFree })
      if (isFree) newURL += '/free'
    } else {
      isFree = this.state.onlyFree
      if (this.state.onlyFree) newURL += '/free'
    }

    this.setState({ section, onlyFree: isFree }, () => {
      this.performSearch()
    })
    window.history.replaceState(null, '', newURL)
  }

  setTitle() {
    if (this.state.section !== undefined) {
      storeClient
        .query({
          query: gql`
          query GetCollectionInfo {
            collection(slug: "${this.state.section}") {
              name
            }
          }
        `
        })
        .then((result) => {
          this.setState({ sectionTitle: result.data.collection.name })
        })
    } else {
      this.setState({ sectionTitle: 'All Products' })
    }
  }

  componentDidUpdate(prevProps) {
    const prevParams = JSON.stringify(prevProps.params)
    const currParams = JSON.stringify(this.props.params)
    if (prevParams !== currParams) {
      this.setState(
        {
          section:
            this.props.params.section === 'all'
              ? undefined
              : this.props.params.section,
          onlyFree: this.props.params.free === 'free'
        },
        () => {
          this.setTitle()
          this.performSearch()
        }
      )
    }
  }

  render() {
    return (
      <main className="flex flex-col items-center">
        <div className="all-width pt-24">
          <h1 className="text-4xl my-6">{this.state.sectionTitle}</h1>
          <p className="mb-8 opacity-75">
            Showing {[this.state.products.totalItems]} out of{' '}
            {[this.state.allItemCount]} total products.
          </p>
        </div>
        <div className="all-width flex space-x-4 items-start">
          <div className="w-56 mr-4 mb-8 shrink-0 sticky top-[4.5rem]">
            <IconContext.Provider value={{ size: '1.25em' }}>
              <div
                className="form-control -ml-2"
                style={{ width: 'calc(100% + 1rem)' }}>
                <div className="input-group input-group-sm">
                  <input
                    type="text"
                    placeholder="Search..."
                    className="input bg-base-200 input-sm w-full max-w-xs pl-2"
                  />
                  <button className="btn btn-square bg-base-200 btn-ghost btn-sm">
                    <FiSearch></FiSearch>
                  </button>
                </div>
              </div>
              <h3 className="text-lg mt-4 mb-2">Category</h3>
              <div
                className="space-y-2 -ml-2"
                style={{ width: 'calc(100% + 1rem)' }}>
                <CheckOptions
                  value={this.state.section}
                  options={[
                    {
                      jsx: (
                        <div className="flex-row flex gap-2 items-center">
                          <SamplesIcon className="w-6 h-6 fill-primary" />
                          <span>Samples</span>
                        </div>
                      ),
                      value: 'sample-packs'
                    },
                    {
                      jsx: (
                        <div className="flex-row flex gap-2 items-center">
                          <PresetsIcon className="w-6 h-6 fill-primary" />
                          <span>Presets</span>
                        </div>
                      ),
                      value: 'presets'
                    },
                    {
                      jsx: (
                        <div className="flex-row flex gap-2 items-center">
                          <PluginsIcon className="w-6 h-6 fill-primary" />
                          <span>Plugins</span>
                        </div>
                      ),
                      value: 'plugins'
                    }
                  ]}
                  onSelect={(o) => {
                    this.filterRedirect(o, null)
                  }}
                />
              </div>
              <h3 className="text-lg mt-4 mb-2">Filter</h3>
              <div className="w-full -ml-2">
                <CheckSelect
                  isChecked={this.state.onlyFree}
                  onChange={(s) => {
                    this.filterRedirect(null, s)
                  }}>
                  <span className="flex gap-2">
                    <HiOutlineGift className="stroke-primary" />
                    Show only free
                  </span>
                </CheckSelect>
              </div>
            </IconContext.Provider>
          </div>
          <div
            className="gap-8 pb-8"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(16rem, 1fr))'
            }}>
            <IconContext.Provider value={{ size: '1.25em' }}>
              {this.state.products.products?.map((r) => (
                <div key={r.id}>{<ProductCard product={r} />}</div>
              ))}
            </IconContext.Provider>
          </div>
        </div>
      </main>
    )
  }
}

ProductsPage.propTypes = {
  params: PropTypes.object
}

export default withParams(ProductsPage)
