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
      firstName: '',
      lastName: '',
      adress: '',
      city: '',
      zip: '',
      rememberMe: false,
      isProcessing: false,
      isLoggedIn: false,
      currentError: undefined
    }

    this.updateEmail = this.updateEmail.bind(this)
    this.updatePassword = this.updatePassword.bind(this)
    this.updateRememberMe = this.updateRememberMe.bind(this)
    this.updateFirstName = this.updateFirstName.bind(this)
    this.updateLastName = this.updateLastName.bind(this)
    this.updateAdress = this.updateAdress.bind(this)
    this.updateCity = this.updateCity.bind(this)
    this.updateZip = this.updateZip.bind(this)
  }

  componentDidMount() {
    // eslint-disable-next-line react/prop-types
    this.setState({ signUpMode: this.props.signUpMode })
  }

  updateEmail(event) {
    if (!this.state.isProcessing) this.setState({ email: event.target.value })
  }

  updatePassword(event) {
    if (!this.state.isProcessing)
      this.setState({ password: event.target.value })
  }

  updateFirstName(event) {
    if (!this.state.isProcessing)
      this.setState({ firstName: event.target.value })
  }

  updateLastName(event) {
    if (!this.state.isProcessing)
      this.setState({ lastName: event.target.value })
  }

  updateAdress(event) {
    if (!this.state.isProcessing) this.setState({ adress: event.target.value })
  }

  updateCity(event) {
    if (!this.state.isProcessing) this.setState({ city: event.target.value })
  }

  updateZip(event) {
    if (!this.state.isProcessing) this.setState({ zip: event.target.value })
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
    if (this.state.signUpMode) {
      this.setState({ isProcessing: true }, () => {
        new Customer()
          .register(
            this.state.email,
            this.state.password,
            this.state.firstName,
            this.state.lastName,
            this.state.adress,
            this.state.city,
            this.state.zip
          )
          .then(
            (r) => {
              console.log(r)
            },
            (e) => {
              this.setState({ isProcessing: false, currentError: e.message })
            }
          )
      })
    } else {
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
  }

  render() {
    // eslint-disable-next-line react/prop-types
    if (this.state.isLoggedIn) return this.props.onLogin
    if (this.state.signUpMode)
      return (
        <div
          className={`card grow border max-w-xl m-auto ${
            this.state.isProcessing
              ? 'bg-base-100 border-base-200'
              : 'bg-base-200 border-base-300'
          }`}>
          <div className="card-body space-y-2">
            <h1 className="text-3xl">Create an account</h1>
            <p className="opacity-75">
              Create an account to check out. Already have an account?{' '}
              <a
                className="link link-primary"
                onClick={() =>
                  this.setState({ signUpMode: !this.state.signUpMode })
                }>
                Sign in!
              </a>
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
            <div className="flex gap-x-4">
              <div className="textPlaceholder w-full">
                <input
                  type="text"
                  className="inputText input input-bordered w-full"
                  required
                  disabled={this.state.isProcessing}
                  onChange={this.updateFirstName}
                  value={this.state.firstName}
                />
                <span className="floating-label">First Name</span>
              </div>
              <div className="textPlaceholder w-full">
                <input
                  type="text"
                  className="inputText input input-bordered w-full"
                  required
                  disabled={this.state.isProcessing}
                  onChange={this.updateLastName}
                  value={this.state.lastName}
                />
                <span className="floating-label">Last Name</span>
              </div>
            </div>
            <div className="textPlaceholder">
              <input
                type="text"
                className="inputText input input-bordered w-full"
                required
                disabled={this.state.isProcessing}
                onChange={this.updateEmail}
                value={this.state.email}
              />
              <span className="floating-label">E-Mail</span>
            </div>
            <div className="textPlaceholder">
              <input
                type="password"
                className="inputText input input-bordered w-full"
                required
                disabled={this.state.isProcessing}
                onChange={this.updatePassword}
                value={this.state.password}
              />
              <span className="floating-label">Password</span>
            </div>
            <div className="textPlaceholder">
              <input
                type="text"
                className="inputText input input-bordered w-full"
                required
                disabled={this.state.isProcessing}
                onChange={this.updateAdress}
                value={this.state.adress}
              />
              <span className="floating-label">Street and House Number</span>
            </div>
            <div className="flex gap-x-4">
              <div className="textPlaceholder w-full">
                <input
                  type="number"
                  className="inputText input input-bordered w-full"
                  required
                  disabled={this.state.isProcessing}
                  onChange={this.updateZip}
                  value={this.state.zip}
                />
                <span className="floating-label">Zip Code</span>
              </div>
              <div className="textPlaceholder w-full">
                <input
                  type="text"
                  className="inputText input input-bordered w-full"
                  required
                  disabled={this.state.isProcessing}
                  onChange={this.updateCity}
                  value={this.state.city}
                />
                <span className="floating-label">City</span>
              </div>
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
              className="btn btn-primary rounded-full"
              onClick={() => this.submitData()}
              disabled={this.state.isProcessing}>
              Continue
            </button>
          </div>
        </div>
      )
    else
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
              <div className="input-group">
                <div className="textPlaceholder w-full">
                  <input
                    type="text"
                    className="inputText input input-bordered w-full"
                    required
                    disabled={this.state.isProcessing}
                    onChange={this.updateEmail}
                    value={this.state.email}
                  />
                  <span className="floating-label bg-transparent p-0">
                    E-Mail
                  </span>
                </div>
              </div>
            </div>
            <div className="form-control w-full">
              <div className="input-group">
                <div className="textPlaceholder w-full">
                  <input
                    type="password"
                    className="inputText input w-full rounded-r-none input-bordered border-r-0"
                    required
                    disabled={this.state.isProcessing}
                    onChange={this.updatePassword}
                    value={this.state.password}
                  />
                  <span className="floating-label bg-transparent p-0">
                    Password
                  </span>
                </div>
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
              className="btn btn-primary rounded-full"
              onClick={() => this.submitData()}
              disabled={this.state.isProcessing}>
              Log In
            </button>
            <div>
              <span className="opacity-75">
                Don&apos;t have an account yet?{' '}
              </span>
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
