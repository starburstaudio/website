import React from 'react'
import { Routes, Route } from 'react-router-dom'

import NotFoundPage from './pages/NotFoundPage'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import ProductsPage from './pages/ProductsPage'
import ProductPage from './pages/ProductPage'

import HeaderView from './common/components/HeaderView'
import FooterView from './common/components/FooterView'
import CheckoutPage from './pages/checkout/CheckoutPage'
import LoginPage from './pages/user/LoginPage'

class App extends React.Component {
  render() {
    return (
      <>
        <HeaderView />
        <Routes>
          <Route path="*" element={<NotFoundPage />} />
          <Route path="/" element={<HomePage />} />
          {/* Info */}
          <Route path="/about" element={<AboutPage />} />
          {/* Products */}
          <Route path="/p/:product" element={<ProductPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/:section?/:free?" element={<ProductsPage />} />
          {/* Checkout */}
          <Route path="/checkout" element={<CheckoutPage />} />
          {/* User */}
          <Route path="/u/Login" element={<LoginPage />} />
        </Routes>
        <FooterView />
      </>
    )
  }
}

export default App
