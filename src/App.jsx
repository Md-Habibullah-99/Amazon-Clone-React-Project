import './App.css'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Checkout from './pages/Checkout.jsx'
import Orders from './pages/Orders.jsx'

export default function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Checkout" element={<Checkout />} />
        <Route path="/Orders" element={<Orders />} />
      </Routes>
    </Router>
  )
}

