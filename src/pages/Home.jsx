import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Home() {

  return (
    <div>
        <h1>Home</h1>
        <p>This is the Home.</p>

        <Link to="/page1">Go to Page 1</Link>
    </div>
  )
}

