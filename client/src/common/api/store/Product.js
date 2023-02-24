import { storeClient } from "./storeClient"
import gql from "graphql-tag"

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

export { Product }