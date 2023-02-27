import React from 'react'
import { FiEye, FiEyeOff } from 'react-icons/fi'

class AccountCard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      signUpMode: false
    }
  }

  switchMode() {
    this.setState({ signUpMode: !this.state.signUpMode })
  }

  render() {
    return (
      <div className="card shadow bg-base-200 grow border-base-300 border max-w-md m-auto">
        <div className="card-body space-y-2">
          <h1 className="text-3xl text-center">
            {this.state.signUpMode ? 'Sign Up' : 'Log In'}
          </h1>
          <p className="opacity-75 text-center">
            {this.state.signUpMode ? 'Sign Up' : 'Log In'} with{' '}
            {this.state.signUpMode ? 'an' : 'your'} e-mail adress and password
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
              <span className="label-text-alt">
                {!this.state.signUpMode && (
                  <a
                    className="link-primary"
                    tabIndex="-1"
                    href="/password-reset">
                    Forgot Password?
                  </a>
                )}
              </span>
            </label>
            <div className="input-group">
              <input type="password" className="input input-bordered w-full" />
              <label className="swap">
                <input type="checkbox" />
                <div className="btn rounded-l-none no-animation swap-on">
                  <FiEyeOff />
                </div>
                <div className="btn rounded-l-none no-animation swap-off">
                  <FiEye />
                </div>
              </label>
            </div>
          </div>
          <div className="form-control">
            <label className="label cursor-pointer">
              <span className="label-text">Remember me</span>
              <input type="checkbox" className="checkbox checkbox-primary" />
            </label>
          </div>
          <button className="btn btn-primary">Log in</button>
          <div>
            <span className="opacity-75">Don&apos;t have an account yet? </span>
            <a className="link link-primary" onClick={() => this.switchMode()}>
              {this.state.signUpMode ? 'Log In' : 'Sign Up'}
            </a>
          </div>
        </div>
      </div>
    )
  }
}

export default AccountCard
