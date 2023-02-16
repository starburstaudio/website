import './App.css'

import React from 'react'
import { Routes, Route } from 'react-router-dom'

import NotFoundPage from './pages/NotFoundPage'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import ProductsPage from './pages/ProductsPage'
import ProductPage from './pages/ProductPage'

import HeaderView from './components/HeaderView'
import FooterView from './components/FooterView'

class App extends React.Component {
  render () {
    return (
      <>
        <HeaderView />
          <Routes>
            <Route path="*" element={ <NotFoundPage/> } />
            <Route path="/" element={ <HomePage/> } />
            <Route path="/about" element={ <AboutPage/> } />
            <Route path="/products" element={ <ProductsPage/> } />
            <Route path="/products/:section?/:free?" element={ <ProductsPage/> } />
            <Route path="/p/:product" element={ <ProductPage/> } />
          </Routes>
        <FooterView/>
      </>
    )
  }
}

export default App
