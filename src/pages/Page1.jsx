import { Link } from 'react-router-dom'

export default function Page1() {
    return (
        <div>
            <h1>Page 1</h1>
            <p>This is the content for Page 1.</p>

            <Link to="/">Go to Home</Link>
        </div>
    );
}