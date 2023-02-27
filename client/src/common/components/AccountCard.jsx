import React from 'react'
import { Link } from 'react-router-dom'
import { IconContext } from 'react-icons'
import { FiEye, FiInfo } from 'react-icons/fi'

class AccountCard extends React.Component {
  init = () => {}

  render() {
    return (
      <div className="card shadow bg-base-200 grow border-base-300 border max-w-md m-auto">
        <div className="card-body space-y-2">
          <h1 className="text-3xl text-center">Login</h1>
          <p className="opacity-75 text-center">
            Log in with your e-mail and password
            <div
              className="tooltip inline"
              data-tip="You need to be logged into an account. This is because you will get a download link via email, and on your personal account page.">
              <button className="btn btn-circle cursor-default no-animation btn-xs btn-ghost ml-2 align-middle translate-y-[-.2rem]">
                <IconContext.Provider value={{ size: '1.25rem' }}>
                  <FiInfo></FiInfo>
                </IconContext.Provider>
              </button>
            </div>
          </p>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">E-Mail</span>
            </label>
            <input type="email" className="input input-bordered w-full" />
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Password</span>
              <Link
                className="link-primary label-text-alt"
                tabIndex="-1"
                to="/">
                Forgot Password?
              </Link>
            </label>
            <div className="input-group">
              <input type="password" className="input input-bordered w-full" />
              <div className="btn btn-square no-animation">
                <FiEye />
              </div>
            </div>
          </div>
          <div className="form-control">
            <label className="label cursor-pointer">
              <span className="label-text">Remember me</span>
              <input type="checkbox" className="checkbox" />
            </label>
          </div>
          <button className="btn btn-primary">Log in</button>
          <button className="btn">Create Account</button>
        </div>
      </div>
    )
  }
}

export default AccountCard
