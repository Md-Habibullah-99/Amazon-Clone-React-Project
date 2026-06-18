import { Link } from 'react-router-dom'

export default function Orders() {
    return (
        <div>
            <h1>Orders</h1>
            <p>This is the content for orders.</p>

            <Link to="/">Go to Home</Link>
        </div>
    );
}