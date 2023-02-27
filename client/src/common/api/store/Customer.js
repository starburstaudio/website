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
        const c = r.data.activeCustomer
        this.loggedIn = c !== null
        console.log(r)
      })
  }
}

export { Customer }
