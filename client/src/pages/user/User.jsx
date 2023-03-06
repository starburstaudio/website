import React from 'react'
import { IconContext } from 'react-icons'
import { FiDownload, FiLink, FiSettings } from 'react-icons/fi'
import CheckOptions from '../../common/components/CheckOptions'

class UserProducts extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      section: ''
    }
  }

  render() {
    return (
      <main className="flex flex-col items-center pt-24">
        <h1 className="text-4xl all-width border-b border-base-300 py-6">
          Your Account
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
            <div className="space-y-0">
              <div
                className="grid gap-y-4 font-bold"
                style={{
                  'grid-template-columns': '1fr 1fr 1fr auto'
                }}>
                <td className="content-center flex items-center">
                  <div>Product</div>
                </td>
                <td className="content-center flex items-center">
                  <div>Purchase date</div>
                </td>
                <td className="content-center flex items-center">
                  <div>Serial</div>
                </td>
                <td className="w-[6.125rem]" />
              </div>
              {[0, 0, 0, 0, 0].map((v) => (
                <div
                  className="grid gap-y-4 hover:bg-base-200 box-border border-transparent hover:border-base-300 border p-3 -mx-3 rounded-xl transition group"
                  key={v}
                  style={{
                    'grid-template-columns': '1fr 1fr 1fr auto'
                  }}>
                  <td className="pl-0">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16">
                        <img
                          src="http://localhost:3001/assets/preview/33/frame-2x1024__preview.png"
                          className="w-16 h-16 rounded-lg saturate-150 brightness-150 opacity-0 transition group-hover:opacity-75 blur-md absolute"
                        />
                        <img
                          src="http://localhost:3001/assets/preview/33/frame-2x1024__preview.png"
                          className="w-16 h-16 rounded-lg relative"
                        />
                      </div>
                      <div>
                        <div className="font-bold">Heatburst</div>
                        <div className="text-sm opacity-50 group-hover:opacity-100 transition">
                          Plugin
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="content-center flex items-center opacity-75 group-hover:opacity-100 transition">
                    <div>17th of January 2023</div>
                  </td>
                  <td className="content-center flex items-center font-mono opacity-75 group-hover:opacity-100 transition">
                    <div>SERI-AL12-345-678-9XY-Z</div>
                  </td>
                  <IconContext.Provider value={{ size: '1.5rem' }}>
                    <td className="content-center flex items-center opacity-0 group-hover:opacity-100 transition">
                      <div className="tooltip" data-tip="Download">
                        <a className="btn btn-ghost btn-circle text-primary">
                          <FiDownload></FiDownload>
                        </a>
                      </div>
                      <div className="tooltip" data-tip="Open store page">
                        <a className="btn btn-ghost btn-circle text-primary">
                          <FiLink></FiLink>
                        </a>
                      </div>
                    </td>
                  </IconContext.Provider>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    )
  }
}

export default UserProducts
