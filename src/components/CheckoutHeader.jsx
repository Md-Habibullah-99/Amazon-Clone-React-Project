import React from 'react';
import { Link } from 'react-router-dom';

import { useCart } from '../assets/data/cart.jsx';

import amazonMobile from '../assets/images/amazon-logo.png';
import amazonMobileLogo from '../assets/images/amazon-mobile-logo.png';
import searchIcon from '../assets/images/icons/search-icon.png';
import lockIcon from '../assets/images/icons/checkout-lock-icon.png';

export default function CheckoutHeader() {
  const { cartQuantity } = useCart();

  return (
    /* ADDED FOR RESPONSIVENESS: smaller fixed height + padding on mobile so
       the row doesn't get cramped; standard height restored from sm: up */
    <header className="bg-white text-white px-3 sm:px-[30px] py-3 sm:py-[30px] flex items-center justify-center fixed top-0 left-0 right-0 h-[56px] sm:h-[60px] z-50">
      <div className="w-[100%] max-w-[1100px] flex items-center justify-between sm:justify-start">

        {/* Left Section */}
        <div className="w-auto sm:w-[150px] sm:ml-[-12px] flex items-center">
          <Link to="/" className="inline-block p-[6px] cursor-pointer no-underline ">
            <img
              className="w-[90px] sm:w-[100px] mt-0 sm:mt-[14px] hidden sm:block"
              src={amazonMobile}
              alt="Amazon"
            />
            <img
              className="block sm:hidden h-[30px] mt-0"
              src={amazonMobileLogo}
              alt="Amazon"
            />
          </Link>
        </div>

        {/* Middle Section */}
        {/* ADDED FOR RESPONSIVENESS: smaller, wrapping-safe text on mobile */}
        <div className="flex-1 max-w-[850px] mx-[10px] mt-0 sm:mt-[19px] flex justify-end sm:justify-center text-black text-[16px] sm:text-[24px] font-semibold text-center">
          <div>
            Checkout (<Link to="/">
              <span className='text-[rgb(0,113,133)]'>{cartQuantity} items</span>
            </Link> )
          </div>
        </div>

        {/* Right Section */}
        <div className="hidden sm:flex w-[144px] mx-[7px] mt-[16px] justify-end ">
          <img src={lockIcon} alt="lock icon" className='w-[16px] h-[21px]' />
        </div>

      </div>
    </header>
  );
};
