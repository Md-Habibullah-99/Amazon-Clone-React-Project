import React from 'react';
import { Link } from 'react-router-dom';

import calculateCartQuantity from '../assets/data/cart.jsx';

import amazonMobile from '../assets/images/amazon-logo.png';
import amazonMobileLogo from '../assets/images/amazon-mobile-logo.png';
import searchIcon from '../assets/images/icons/search-icon.png';
import lockIcon from '../assets/images/icons/checkout-lock-icon.png';

const itemCount = calculateCartQuantity();

export default function CheckoutHeader() {
  return (
    <header className="bg-white text-white px-[30px] py-[30px] flex items-center justify-center fixed top-0 left-0 right-0 h-[60px] z-50">
      <div className="w-[100%] max-w-[1100px] flex center">

        {/* Left Section */}
        <div className="w-[150px] ml-[-12px] flex items-center">
          <Link to="/" className="inline-block p-[6px] cursor-pointer no-underline ">
            <img 
              className="w-[100px] mt-[14px] max-[575px]:hidden" 
              src={amazonMobile} 
              alt="Amazon" 
            />
            <img 
              className="hidden max-[575px]:block h-[35px] mt-[8px]" 
              src={amazonMobileLogo} 
              alt="Amazon" 
            />
          </Link>
        </div>

        {/* Middle Section */}
        <div className="flex-1 max-w-[850px] mx-[10px] mt-[19px] flex justify-center text-black text-[24px] font-semibold">
          <div>
            Checkout (<Link to="/">
              <span className='text-[rgb(0,113,133)]'>{itemCount} items</span>
            </Link> )
          </div>
        </div>

        {/* Right Section */}
        <div className="w-[144px] mx-[7px] mt-[16px] flex justify-end ">
          <img src={lockIcon} alt="lock icon" className='w-[16px] h-[21px]' />
        </div>

      </div>
    </header>
  );
};
