import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache
} from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import React from 'react'

const AUTH_TOKEN_KEY = 'auth_token'

const httpLink = new HttpLink({
  uri: 'http://localhost:3001/shop-api',
  withCredentials: true
})

const afterwareLink = new ApolloLink((operation, forward) => {
  return forward(operation).map((response) => {
    const context = operation.getContext()
    const authHeader = context.response.headers.get('vendure-auth-token')
    if (authHeader) {
      // If the auth token has been returned by the Vendure
      // server, we store it in localStorage
      localStorage.setItem(AUTH_TOKEN_KEY, authHeader)
    }
    return response
  })
})

const storeClient = new ApolloClient({
  link: ApolloLink.from([
    setContext(() => {
      const authToken = localStorage.getItem(AUTH_TOKEN_KEY)
      if (authToken) {
        // If we have stored the authToken from a previous
        // response, we attach it to all subsequent requests.
        return {
          headers: {
            authorization: `Bearer ${authToken}`
          }
        }
      }
    }),
    afterwareLink,
    httpLink
  ]),
  cache: new InMemoryCache()
})

class Product {
  constructor () {
    this.productId = Number
    this.productVariantId = String
    this.productName = String
    this.slug = String
    this.description = String
    this.currencyCode = String
    this.facetValueIds = Array
    this.productAsset = {
      preview: String
    }
    this.price = Number
  }

  formatPrice (p) {
    if (this.price !== 0) {
      return (parseFloat(this.price) / 100.0) + ' $'
    } else {
      return 'FREE'
    }
  }

  badge () {
    switch (Number(this.facetValueIds[0])) {
      case 41:
        return <div className="badge badge-secondary">FREE</div>
      case 42:
        return <div className="badge badge-accent">NEW</div>
      default:
    }
  }
}

// formatPrice (p) {
//   let v = 0
//   if (p.__typename === 'SinglePrice') v = p.value
//   if (p.__typename === 'PriceRange') v = p.min

//   if (v !== 0) {
//     return (parseFloat(v) / 100.0) + ' $'
//   } else {
//     return 'FREE'
//   }
// }

export { storeClient, Product }
