import { Link } from 'react-router-dom'

import CheckoutHeader from '../components/CheckoutHeader.jsx'
import OrderSummary from '../components/OrderSummary.jsx'

export default function Checkout() {
	return (
		<>
			<CheckoutHeader />
			{/* <div className="max-w-[1100px] px-0 mt-[140px] mb-[100px] mx-auto ">
				<div className="font-extrabold text-[22px] mb-[18px] mx-0 px-0">Review your order</div>

			</div> */}
				<div>
						<OrderSummary />
				</div>
		</>
	);
}