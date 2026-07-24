import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import amazonLogoWhite from '../assets/images/amazon-logo-white.png';
import amazonMobileLogoWhite from '../assets/images/amazon-mobile-logo-white.png';
import searchIcon from '../assets/images/icons/search-icon.png';
import cartIcon from '../assets/images/icons/cart-icon.png';
import { CartQuantityBadge } from '../assets/data/cart.jsx';
/* SEARCH FUNCTIONALITY */
import { useSearch } from '../context/SearchContext.jsx';

const AmazonHeader = () => {
  /* SEARCH FUNCTIONALITY: pull shared searchTerm state from context */
  const { searchTerm, setSearchTerm } = useSearch();
  const navigate = useNavigate();

  /* SEARCH FUNCTIONALITY: pressing Enter or clicking the search button
     navigates back to the home/product feed so the user sees filtered results */
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    navigate('/');
  };

  return (
    /* ADDED FOR RESPONSIVENESS: flex-wrap lets the row collapse gracefully on
       very small screens instead of squashing/overflowing; height is auto on
       mobile (search drops to its own row) and fixed 60px from sm: up */
    <header className="bg-[rgb(19,25,33)] text-white px-2 sm:px-[15px] flex flex-wrap sm:flex-nowrap items-center justify-between gap-y-2 fixed top-0 left-0 right-0 min-h-[60px] py-2 sm:py-0 sm:h-[60px] z-50">
      {/* Left Section - Logo */}
      {/* ADDED FOR RESPONSIVENESS: fixed width from sm:, auto/shrink on mobile */}
      <div className="w-auto sm:w-[180px] flex-shrink-0 order-1">
        <Link to="/" className="inline-block p-[6px] rounded-[2px] cursor-pointer no-underline border border-transparent hover:border-white">
          <img
            className="w-[100px] mt-[8px] hidden sm:block"
            src={amazonLogoWhite}
            alt="Amazon"
          />
          <img
            className="block sm:hidden h-[30px] mt-0"
            src={amazonMobileLogoWhite}
            alt="Amazon"
          />
        </Link>
      </div>

      {/* Middle Section - Search */}
      {/* ADDED FOR RESPONSIVENESS: search bar becomes full-width and drops to
          its own row on mobile (order-3 + basis-full), sits inline from sm: up */}
      <form
        onSubmit={handleSearchSubmit}
        className="order-3 sm:order-2 basis-full sm:basis-auto flex-1 sm:max-w-[850px] mx-0 sm:mx-[10px] flex"
      >
        <input
          type="text"
          value={searchTerm}
          /* SEARCH FUNCTIONALITY: update shared searchTerm on every keystroke */
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search products, brands, categories..."
          className="flex-1 w-0 text-[14px] sm:text-[16px] bg-white h-[38px] sm:h-[40px] pl-[12px] sm:pl-[15px] border-none rounded-l-[4px] outline-none text-black"
        />
        <button
          type="submit"
          className="bg-[rgb(254,189,105)] border-none w-[40px] sm:w-[45px] h-[38px] sm:h-[40px] rounded-r-[4px] flex-shrink-0 hover:bg-[rgb(252,180,90)] transition-colors flex items-center justify-center"
        >
          <img
            className="h-[18px] sm:h-[22px]"
            src={searchIcon}
            alt="Search"
          />
        </button>
      </form>

      {/* Right Section */}
      {/* ADDED FOR RESPONSIVENESS: hide the "Returns & Orders" text label below
          md:, keep icon-based cart visible at every breakpoint */}
      <div className="order-2 sm:order-3 w-auto sm:w-[180px] flex-shrink-0 flex items-center justify-end gap-1">
        {/* Orders Link - hidden on phones, shown from md: up */}
        <Link
          to="/orders"
          className="hidden md:inline-block text-white p-[6px] rounded-[2px] no-underline border border-transparent hover:border-white"
        >
          <span className="block text-[13px] ml-1 m-0 leading-3.5">Returns</span>
          <span className="block text-[15px] m-0 leading-3.5 font-bold">& Orders</span>
        </Link>

        {/* Cart Link */}
        <Link to="/checkout" className="text-white flex items-center relative p-[6px] rounded-[2px] no-underline border border-transparent hover:border-white sm:ml-[5px]">
          <img
            className="w-[38px] sm:w-[50px]"
            src={cartIcon}
            alt="Cart"
          />
          <div className="absolute top-[2px] sm:top-[4px] left-[16px] sm:left-[22px] w-[26px] text-center text-[rgb(240,136,4)] text-[14px] sm:text-[16px] font-bold">
            <CartQuantityBadge />
          </div>
          <div className="hidden sm:block mt-[12px] text-[15px] font-bold">Cart</div>
        </Link>
      </div>
    </header>
  );
};

export default AmazonHeader;
