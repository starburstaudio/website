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

  setFromActiveCustomer(c) {
    this.loggedIn = c !== null
    console.log(c)
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
}

export { Customer }