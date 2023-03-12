// /* eslint-disable prettier/prettier */
import { storeClient } from './storeClient'
import gql from 'graphql-tag'
// import { OrderList } from './OrderList'
// import { User } from './User'

class Customer {
  constructor() {
    this.id = 0
    this.createdAt = undefined
    this.updatedAt = undefined
    this.title = ''
    this.firstName = ''
    this.lastName = ''
    this.phoneNumber = ''
    this.emailAddress = ''
    // this.orders       = new OrderList()
    // this.user         = new User()
    this.customFields = ''
    this.loggedIn = false
  }

  getCurrentCustomer() {
    return new Promise((resolve, reject) => {
      storeClient
        .query({
          query: gql`
            query activeCustomer {
              activeCustomer {
                id
                createdAt
                updatedAt
                title
                firstName
                lastName
                phoneNumber
                emailAddress
                customFields
              }
            }
          `
        })
        .then((r) => {
          this.setFromActiveCustomer(r.data.activeCustomer)
          resolve(this)
        })
    })
  }

  isLoggedIn() {
    return new Promise((resolve, reject) => {
      storeClient
        .query({
          query: gql`
            query activeCustomer {
              activeCustomer {
                id
              }
            }
          `
        })
        .then((r) => {
          if (r.data.activeCustomer == null) resolve(false)
          else resolve(r.data.activeCustomer.id !== null)
        })
    })
  }

  setFromActiveCustomer(c) {
    this.id = c.id
    this.createdAt = c.createdAt
    this.updatedAt = c.updatedAt
    this.title = c.title
    this.firstName = c.firstName
    this.lastName = c.lastName
    this.phoneNumber = c.phoneNumber
    this.emailAddress = c.emailAddress
    this.customFields = c.customFields
    this.loggedIn = c !== null
  }

  login(username, password, rememberMe) {
    return new Promise((resolve, reject) => {
      storeClient
        .mutate({
          mutation: gql`
            mutation {
              login(username: "${username}", password: "${password}", rememberMe: ${rememberMe}) {
                __typename
                ... on InvalidCredentialsError {
                  message
                }
                ... on NotVerifiedError {
                  message
                }
                ... on NativeAuthStrategyError {
                  message
                }
              }
            }
          `
        })
        .then((r) => {
          if (r.data.login.__typename === 'CurrentUser') {
            this.setFromActiveCustomer(r)
            resolve(this)
          } else {
            reject(new Error(r.data.login.message))
          }
        })
    })
  }

  register(
    email,
    password,
    firstName,
    lastName,
    adress,
    city,
    zip,
    countryCode
  ) {
    return new Promise((resolve, reject) => {
      storeClient
        .mutate({
          mutation: gql`
            mutation {
              registerCustomerAccount(
                input: {
                  emailAddress: "${email}",
                  firstName: "${firstName}",
                  lastName: "${lastName}",
                  password: "${password}"
                }
              ) {
                __typename
                ... on MissingPasswordError {
                  message
                }
                ... on PasswordValidationError {
                  message
                }
                ... on NativeAuthStrategyError {
                  message
                }
              }
            }
          `
        })
        .then((r) => {
          if (r.data.registerCustomerAccount.__typename === 'Success') {
            return this.login(email, password, true)
          } else {
            reject(new Error(r.data.registerCustomerAccount.message))
          }
          resolve(r)
        })
        .then(() => {
          return storeClient.mutate({
            mutation: gql`
                mutation {
                  createCustomerAddress(
                    input: {
                      fullName: "${firstName} ${lastName}"
                      streetLine1: "${adress}"
                      city: "${city}"
                      postalCode: "${zip}"
                      countryCode: "${countryCode}"
                    }
                  ) {
                    id
                  }
                }
              `
          })
        })
        .then(() => {
          resolve(this)
        })
    })
  }
}

export { Customer }
