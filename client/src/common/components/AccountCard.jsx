import React from 'react'
import { Customer } from '../api/store/Customer'
import { FiEye, FiEyeOff, FiStopCircle, FiChevronDown } from 'react-icons/fi'
import { IconContext } from 'react-icons'
import { trigger } from '../../events'
import { storeClient } from '../api/store/storeClient'
import { gql } from '@apollo/client'
import ReactCountryFlag from 'react-country-flag'

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
      selectedCountry: {
        code: '',
        name: ''
      },
      countrySearchTerm: '',
      rememberMe: false,
      isProcessing: false,
      isLoggedIn: false,
      currentError: undefined,
      supportedCountries: []
    }

    this.updateEmail = this.updateEmail.bind(this)
    this.updatePassword = this.updatePassword.bind(this)
    this.updateRememberMe = this.updateRememberMe.bind(this)
    this.updateFirstName = this.updateFirstName.bind(this)
    this.updateLastName = this.updateLastName.bind(this)
    this.updateAdress = this.updateAdress.bind(this)
    this.updateCity = this.updateCity.bind(this)
    this.updateZip = this.updateZip.bind(this)
    this.updateCountrySearchTerm = this.updateCountrySearchTerm.bind(this)
  }

  componentDidMount() {
    // eslint-disable-next-line react/prop-types
    this.setState({ signUpMode: this.props.signUpMode })
    storeClient
      .query({
        query: gql`
          query {
            availableCountries {
              code
              name
            }
          }
        `
      })
      .then((r) => {
        this.setState({ supportedCountries: r.data.availableCountries })
      })
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

  updateCountry(event) {
    if (!this.state.isProcessing)
      this.setState({ countryCode: event.target.value })
  }

  updateCountrySearchTerm(event) {
    if (!this.state.isProcessing)
      this.setState({ countrySearchTerm: event.target.value })
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
            this.state.zip,
            this.state.selectedCountry.code
          )
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
            <div className="flex gap-x-4 items-stretch">
              <div className="textPlaceholder w-28 shrink-0">
                <input
                  type="number"
                  className="inputText input input-bordered w-full"
                  required
                  disabled={this.state.isProcessing}
                  onChange={this.updateZip}
                  value={this.state.zip}
                />
                <span className="floating-label">Zip</span>
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
              <div className="dropdown">
                <label tabIndex={0} className="btn input h-full input-bordered">
                  {this.state.selectedCountry.name === '' ? (
                    <span className="normal-case text-lg font-normal opacity-50 flex items-center gap-2">
                      Country <FiChevronDown />
                    </span>
                  ) : (
                    <span className="normal-case text-lg font-normal flex items-center gap-2">
                      <ReactCountryFlag
                        countryCode={this.state.selectedCountry.code}
                      />
                      <span
                        className="whitespace-nowrap"
                        style={{
                          maxWidth: '9rem',
                          maskImage:
                            this.state.selectedCountry.name.length > 14
                              ? 'linear-gradient(to left, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1) 33%)'
                              : 'none'
                        }}>
                        {this.state.selectedCountry.name}
                      </span>
                      <FiChevronDown />
                    </span>
                  )}
                </label>
                <ul
                  tabIndex={0}
                  className="dropdown-content menu p-2 shadow bg-base-100 rounded-box">
                  <div className="flex flex-col max-h-96 w-52">
                    <input
                      type="text"
                      placeholder="Search for a country..."
                      className="inputText input input-ghost input-sm shrink-0 min-w-0 mb-2"
                      disabled={this.state.isProcessing}
                      onChange={this.updateCountrySearchTerm}
                      value={this.state.countrySearchTerm}
                    />
                    <div className="overflow-scroll shrink">
                      {this.state.supportedCountries
                        .filter((c) => {
                          if (this.state.countrySearchTerm === '') {
                            return true
                          } else {
                            return c.name
                              .toLowerCase()
                              .includes(
                                this.state.countrySearchTerm.toLowerCase()
                              )
                          }
                        })
                        .map((c) => (
                          <li
                            key={c.code}
                            className="flex"
                            onClick={() => {
                              this.setState({
                                selectedCountry: c,
                                countrySearchTerm: ''
                              })
                            }}>
                            <div>
                              <ReactCountryFlag countryCode={c.code} />
                              <span>{c.name}</span>
                            </div>
                          </li>
                        ))}
                    </div>
                  </div>
                </ul>
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
