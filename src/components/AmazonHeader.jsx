import React from 'react';
import { Link } from 'react-router-dom';
import amazonLogoWhite from '../assets/images/amazon-logo-white.png';
import amazonMobileLogoWhite from '../assets/images/amazon-mobile-logo-white.png';
import searchIcon from '../assets/images/icons/search-icon.png';
import cartIcon from '../assets/images/icons/cart-icon.png';

const AmazonHeader = () => {
  return (
    <header className="bg-[rgb(19,25,33)] text-white px-[15px] flex items-center justify-between fixed top-0 left-0 right-0 h-[60px] z-50">
      {/* Left Section */}
      <div className="w-[180px] max-[800px]:w-auto">
        <Link to="/" className="inline-block p-[6px] rounded-[2px] cursor-pointer no-underline border border-transparent hover:border-white">
          <img 
            className="w-[100px] mt-[8px] max-[575px]:hidden" 
            src={amazonLogoWhite} 
            alt="Amazon" 
          />
          <img 
            className="hidden max-[575px]:block h-[35px] mt-[8px]" 
            src={amazonMobileLogoWhite} 
            alt="Amazon" 
          />
        </Link>
      </div>

      {/* Middle Section - Search */}
      <div className="flex-1 max-w-[850px] mx-[10px] flex">
        <input 
          type="text" 
          placeholder="Search" 
          className="flex-1 w-0 text-[16px] bg-white h-[40px] pl-[15px] border-none rounded-l-[4px] outline-none text-black"
        />
        <button className="bg-[rgb(254,189,105)] border-none w-[45px] h-[40px] rounded-r-[4px] flex-shrink-0 hover:bg-[rgb(252,180,90)] transition-colors">
          <img 
            className="h-[22px] ml-[12px] mt-[0px]" 
            src={searchIcon} 
            alt="Search" 
          />
        </button>
      </div>

      {/* Right Section */}
      <div className="w-[180px] flex-shrink-0 flex justify-end">
        {/* Orders Link */}
        <Link to="/orders" className="text-white inline-block p-[6px] rounded-[2px] no-underline border border-transparent hover:border-white">
          <span className="block text-[13px] ml-1 m-0 leading-3.5">Returns</span>
          <span className="block text-[15px] m-0 leading-3.5 font-bold">& Orders</span>
        </Link>

        {/* Cart Link */}
        <Link to="/checkout" className="text-white flex items-center relative p-[6px] rounded-[2px] no-underline border border-transparent hover:border-white ml-[5px]">
          <img 
            className="w-[50px]" 
            src={cartIcon} 
            alt="Cart" 
          />
          <div className="absolute top-[4px] left-[22px] w-[26px] text-center text-[rgb(240,136,4)] text-[16px] font-bold">
            0
          </div>
          <div className="mt-[12px] text-[15px] font-bold">Cart</div>
        </Link>
      </div>
    </header>
  );
};

export default AmazonHeader;