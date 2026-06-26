import { Link } from 'react-router-dom'

import CheckoutHeader from '../components/CheckoutHeader.jsx'

export default function Checkout() {
	return (
		<>
			<CheckoutHeader />
			<div className="max-w-[1100px] px-0 mt-[140px] mb-[100px] mx-auto ">
				<div className="font-extrabold text-[22px] mb-[18px] mx-0 px-0">Review your order</div>
				<div>
					<div className="border border-solid border-[rgb(222,222,222)] rounded-[4px] p-[18px] mb-[12px]">
						
					</div>
				</div>
			</div>
		</>
	);
}