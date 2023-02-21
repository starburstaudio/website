import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
  gql
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
  constructor(
    ID,
    pvID,
    name,
    slug,
    description,
    currencyCode,
    facetValueIds,
    assets,
    featuredAsset,
    price,
    customFields,
    collections
  ) {
    this.ID = ID
    this.pvID = pvID
    this.name = name
    this.slug = slug
    this.description = description
    this.currencyCode = currencyCode
    this.facetValueIds = facetValueIds
    this.assets = assets
    this.featuredAsset = featuredAsset
    this.price = price
    this.customFields = customFields
    this.collections = collections
  }

  fromSlug(slug) {
    this.slug = slug
    return new Promise((resolve) => {
      storeClient
        .query({
          query: gql`
        query RevealProduct {
          product(slug: "${slug}") {
            id
            name
            description
            customFields {
              youtubeUrl
              totalSamples
              fileSize
              contents
            }
            assets {
              id
              name
              source
              mimeType
            }
            variants {
              id
              priceWithTax
            }
            featuredAsset {
              source
              preview
            }
            collections {
              slug
              name
            }
            customFields {
              youtubeUrl
              totalSamples
              fileSize
              contents
            }
          }
        }
      `
        })
        .then((result) => {
          const p = result.data.product
          this.ID = p.id
          this.pvID = p.variants[0]?.id
          this.name = p.name
          this.description = p.description
          this.currencyCode = p.currencyCode
          this.facetValues = p.facetValues
          this.assets = p.assets
          this.featuredAsset = p.featuredAsset
          this.price = p.variants[0].priceWithTax
          this.customFields = p.customFields
          this.collections = p.collections
          resolve(this)
        })
    })
  }

  fromOrderLine(line) {
    this.ID = line.id
    this.name = line.productVariant.name
    this.featuredAsset = line.featuredAsset
    this.price = line.proratedLinePrice
  }

  formatPrice() {
    return Product.formatPrice(this.price)
  }

  static formatPrice(p) {
    if (p !== 0) {
      return parseFloat(p) / 100.0 + ' $'
    } else {
      return 'FREE'
    }
  }

  badge() {
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
