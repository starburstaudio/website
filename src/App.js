import './App.css';

import { Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";

import HeaderView from './components/HeaderView';
import FooterView from './components/FooterView';

function App() {
  return (
    <div className="App justify-center">
      <HeaderView />
      <Routes>
        <Route path="/" element={ <HomePage/> } />
        <Route path="/about" element={ <AboutPage/> } />
      </Routes>
      <FooterView/>
    </div>
  );
}

export default App;
