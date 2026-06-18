import { Link } from 'react-router-dom'

export default function Checkout() {
    return (
        <div>
            <h1>checkout</h1>
            <p>This is the content for checkout.</p>

            <Link to="/">Go to Home</Link>
        </div>
    );
}