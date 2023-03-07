import React from 'react'
import { Customer } from '../api/store/Customer'
import { FiEye, FiEyeOff, FiStopCircle } from 'react-icons/fi'
import { IconContext } from 'react-icons'
import { trigger } from '../../events'

class AccountCard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      signUpMode: false,
      email: '',
      password: '',
      rememberMe: false,
      isProcessing: false,
      isLoggedIn: false,
      currentError: undefined
    }

    this.updateEmail = this.updateEmail.bind(this)
    this.updatePassword = this.updatePassword.bind(this)
    this.updateRememberMe = this.updateRememberMe.bind(this)
  }

  updateEmail(event) {
    if (!this.state.isProcessing) this.setState({ email: event.target.value })
  }

  updatePassword(event) {
    if (!this.state.isProcessing)
      this.setState({ password: event.target.value })
  }

  updateRememberMe(event) {
    if (!this.state.isProcessing)
      this.setState({ rememberMe: event.target.checked })
  }

  switchMode() {
    if (!this.state.isProcessing)
      this.setState({ signUpMode: !this.state.signUpMode })
  }

  submitData() {
    console.log(this?.state)
    this.setState({ isProcessing: true }, () => {
      new Customer()
        .login(this.state.email, this.state.password, this.state.rememberMe)
        .then(
          (r) => {
            this.setState({
              isProcessing: false,
              currentError: undefined,
              isLoggedIn: true
            })
            trigger('updateCustomer', r)
          },
          (e) => {
            this.setState({ isProcessing: false, currentError: e.message })
          }
        )
    })
  }

  render() {
    // eslint-disable-next-line react/prop-types
    if (this.state.isLoggedIn) return this.props.onLogin
    if (this.state.signUpMode)
      return (
        <div
          className={`card grow border max-w-2xl m-auto ${
            this.state.isProcessing
              ? 'bg-base-100 border-base-200'
              : 'bg-base-200 border-base-300'
          }`}>
          <div className="card-body space-y-2">
            <h1 className="text-3xl">Create an account</h1>
            <p className="pb-4 opacity-75">
              Create an account to get access to all our products
            </p>
            <div className="flex gap-x-4">
              <input
                type="text"
                className="input w-full"
                placeholder="First Name"
              />
              <input
                type="text"
                className="input w-full"
                placeholder="Last Name"
              />
            </div>
            <input type="text" className="input w-full" placeholder="E-Mail" />
            <input
              type="password"
              className="input w-full"
              placeholder="Password"
            />
            <input
              type="text"
              className="input w-full"
              placeholder="Street and House Number"
            />
            <div className="flex gap-x-4">
              <input
                type="text"
                className="input w-full max-w-xs"
                placeholder="Postal Code"
              />
              <input
                type="text"
                className="input w-full max-w-xs"
                placeholder="City"
              />
            </div>
            <div className="text-sm py-4">
              <span className="opacity-75">
                By selecting continue, you confirm that you have read and accept
                the{' '}
              </span>
              <a className="link">Privacy Policy</a>
              <span className="opacity-75"> and </span>
              <a className="link">Terms of Service</a>
            </div>
            <button
              className="btn btn-primary"
              onClick={() => this.submitData()}
              disabled={this.state.isProcessing}>
              Continue
            </button>
          </div>
        </div>
      )
    return (
      <div
        className={`card grow border max-w-md m-auto ${
          this.state.isProcessing
            ? 'bg-base-100 border-base-200'
            : 'bg-base-200 border-base-300'
        }`}>
        <div className="card-body space-y-2">
          <h1 className="text-3xl text-center">Log In</h1>
          <p className="opacity-75 text-center">
            Log in with your e-mail address and password
          </p>
          {this.state.currentError !== undefined && (
            <div className="alert alert-error shadow-lg">
              <div className="flex">
                <IconContext.Provider value={{ size: '1.25rem' }}>
                  <FiStopCircle />
                </IconContext.Provider>
                <span className="shrink">{this.state.currentError}</span>
              </div>
            </div>
          )}
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">E-Mail</span>
            </label>
            <input
              type="email"
              disabled={this.state.isProcessing}
              className="input input-bordered w-full"
              onChange={this.updateEmail}
            />
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Password</span>
              <span className="label-text-alt">
                <a
                  className={`${
                    this.state.isProcessing ? 'link' : 'link-primary'
                  }`}
                  tabIndex="-1"
                  href="/password-reset">
                  Forgot Password?
                </a>
              </span>
            </label>
            <div className="input-group">
              <input
                type="password"
                disabled={this.state.isProcessing}
                className="input border-r-0 input-bordered w-full"
                onChange={this.updatePassword}
              />
              <label className="swap">
                <input type="checkbox" disabled={this.state.isProcessing} />
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
              <input
                type="checkbox"
                disabled={this.state.isProcessing}
                checked={this.state.rememberMe}
                onChange={this.updateRememberMe}
                className="checkbox checkbox-primary"
              />
            </label>
          </div>
          <button
            className="btn btn-primary"
            onClick={() => this.submitData()}
            disabled={this.state.isProcessing}>
            Log In
          </button>
          <div>
            <span className="opacity-75">Don&apos;t have an account yet? </span>
            <a
              className={`${
                this.state.isProcessing ? 'link' : 'link-primary'
              } cursor-pointer underline`}
              onClick={() => this.switchMode()}
              disabled={this.state.isProcessing}>
              Sign Up
            </a>
          </div>
        </div>
      </div>
    )
  }
}

export default AccountCard
