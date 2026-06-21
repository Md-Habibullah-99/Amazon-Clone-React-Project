import { Link } from 'react-router-dom'

import CheckoutHeader from '../components/CheckoutHeader.jsx'

export default function Checkout() {
    return (
        <>
            <CheckoutHeader />
            <h1>checkout</h1>
            <p>This is the content for checkout.</p>

            <Link to="/">Go to Home</Link>
        </>
    );
}