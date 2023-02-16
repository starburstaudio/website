import React from 'react'

class AboutPage extends React.Component {
  render () {
    return (
      <main className='flex flex-col items-center justify-between'>
        <div className='all-width py-24'>
          <h1 className="text-4xl my-6">Music production tools, crafted with passion.</h1>
          <p className="content-width my-4">
            We are your one-stop shop for all your music production needs. We specialize in high-quality sample packs and audio effect plugins to help producers and music creators of all levels get the most out of their projects. From lush, cinematic sounds to tight, punchy drums, our packs and plugins have something for everyone.
          </p>
          <p className="content-width my-4">
            At Starburst Audio, we believe in providing our customers with the best user experience possible. That&quot;s why our products are easy to use and offer great sound quality. Plus, our blog is constantly updated with tips and tricks for getting the most out of our products.
          </p>
          <p className="content-width my-4">
            So if you&quot;re looking for high-quality sample packs, audio plugins, and production resources, you&quot;ve come to the right place. Check out our sample packs, explore our audio plugins, and be sure to check out our blog for the latest production tips. We look forward to helping you create your best music!
          </p>
        </div>
      </main>
    )
  }
}

export default AboutPage
