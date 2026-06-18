import React from 'react';
import { Link } from 'react-router-dom';
import './styles/AmazonHeader.css';

const AmazonHeader = () => {
  return (
    <header className="amazon-header">
      {/* Left Section */}
      <div className="amazon-header-left-section">
        <Link to="/" className="header-link">
          <img 
            className="amazon-logo" 
            src="images/amazon-logo-white.png" 
            alt="Amazon" 
          />
          <img 
            className="amazon-mobile-logo" 
            src="images/amazon-mobile-logo-white.png" 
            alt="Amazon" 
          />
        </Link>
      </div>

      {/* Middle Section - Search */}
      <div className="amazon-header-middle-section">
        <input 
          type="text" 
          placeholder="Search" 
          className="search-bar"
        />
        <button className="search-button">
          <img 
            className="search-icon" 
            src="images/icons/search-icon.png" 
            alt="Search" 
          />
        </button>
      </div>

      {/* Right Section */}
      <div className="amazon-header-right-section">
        {/* Orders Link */}
        <Link to="/orders" className="header-link">
          <span className="returns-text">Returns</span>
          <span className="orders-text">& Orders</span>
        </Link>

        {/* Cart Link */}
        <Link to="/checkout" className="cart-link header-link">
          <img 
            className="cart-icon" 
            src="images/icons/cart-icon.png" 
            alt="Cart" 
          />
          <div className="cart-quantity">0</div>
          <div className="cart-text">Cart</div>
        </Link>
      </div>
    </header>
  );
};

export default AmazonHeader;