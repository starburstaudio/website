import React from 'react'
import { Routes, Route } from 'react-router-dom'

import NotFoundPage from './pages/NotFoundPage'
import HeaderView from './common/components/HeaderView'
import FooterView from './common/components/FooterView'

import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'

import ProductsPage from './pages/ProductsPage'
import ProductPage from './pages/ProductPage'

import CheckoutPage from './pages/checkout/CheckoutPage'

import LoginPage from './pages/user/LoginPage'
import UserProducts from './pages/user/User'

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
          <Route path="/u/products" element={<UserProducts />} />
          <Route path="/u/login" element={<LoginPage />} />
        </Routes>
        <FooterView />
      </>
    )
  }
}

export default App
