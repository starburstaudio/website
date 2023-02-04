import './App.css';

import { Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ProductsPage from "./pages/ProductsPage";

import HeaderView from './components/HeaderView';
import FooterView from './components/FooterView';

function App() {
  return (
    <>
      <HeaderView />
      <Routes>
        <Route path="/" element={ <HomePage/> } />
        <Route path="/about" element={ <AboutPage/> } />
        <Route path="/products" element={ <ProductsPage/> } />
      </Routes>
      <FooterView/>
    </>
  );
}

export default App;
