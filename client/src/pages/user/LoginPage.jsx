import React from 'react'
import AccountCard from '../../common/components/AccountCard'
import { Navigate } from 'react-router-dom'

class LoginPage extends React.Component {
  state = {
    loading: true,
    error: null
  }

  render() {
    return (
      <div className="all-width pt-24 m-auto pb-8">
        <AccountCard onLogin={<Navigate to={-1}></Navigate>} />
      </div>
    )
  }
}

export default LoginPage
