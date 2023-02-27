import React from 'react'
import AccountCard from '../../common/components/AccountCard'

class LoginPage extends React.Component {
  state = {
    loading: true,
    error: null
  }

  render() {
    return (
      <div className="all-width pt-24 m-auto">
        <AccountCard />
      </div>
    )
  }
}

export default LoginPage
