import React from 'react'

class NotFoundPage extends React.Component {
  render () {
    return (
      <div className="all-width pt-24 m-auto">
        <h1 className="text-4xl my-6">Error 404</h1>
        <p className="mb-8 content-width">
          This page doesn&apos;t seem to exist! &gt;:( How frustrating! If you
          think this wasn&apos;t supposed to happen, contact us so we can fix
          whatever just went wrong.
        </p>
      </div>
    )
  }
}

export default NotFoundPage
