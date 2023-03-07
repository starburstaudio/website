class Address {
  constructor() {
    this.fullName = ''
    this.company = ''
    this.streetLine1 = ''
    this.streetLine2 = ''
    this.city = ''
    this.country = ''
    this.postalCode = ''
    this.phoneNumber = ''
    this.customFields = {}
  }

  fromOrderAddress(o) {
    this.fullName = o.fullName
    this.company = o.company
    this.streetLine1 = o.streetLine1
    this.streetLine2 = o.streetLine2
    this.city = o.city
    this.country = o.country
    this.postalCode = o.postalCode
    this.phoneNumber = o.phoneNumber
    this.customFields = o.customFields
  }
}

export { Address }
