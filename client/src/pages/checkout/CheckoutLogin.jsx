import React from 'react'
import AccountCard from '../../common/components/AccountCard'
import { Navigate } from 'react-router-dom'

class CheckoutLogin extends React.Component {
  render() {
    return <AccountCard onLogin={<Navigate to="/checkout/pay"></Navigate>} />
  }
}

export default CheckoutLogin
