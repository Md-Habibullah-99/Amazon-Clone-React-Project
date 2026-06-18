import { useState } from 'react'
import { Link } from 'react-router-dom'

import AmazonHeader from '../components/AmazonHeader.jsx'

export default function Home() {

  return (
    <div>
      <AmazonHeader />
      
      <br />
      <br />
      <br />
        <h1>Home</h1>
        <p>This is the Home.</p>

        <Link to="/Checkout">Go to Checkout</Link>
        <br />
        <Link to="/Orders">Go to Orders</Link>
    </div>
  )
}

