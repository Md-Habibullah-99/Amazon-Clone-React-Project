import React from 'react';
import { Link } from 'react-router-dom';
import athleticCottonSocksImage from '../assets/images/products/athletic-cotton-socks-6-pairs.jpg';

const Tracking = () => {

  return (
    <div className="mx-auto mb-25 mt-22.5 max-w-212.5 px-7.5">
      <div>
        <Link
          className="mb-7.5 inline-block text-[#007185] hover:text-[#c7511f] hover:underline"
          to="/Orders"
        >
          View all orders
        </Link>

        <div className="mb-2.5 text-[25px] font-bold">
          Arriving on Monday, June 13
        </div>

        <div className="mb-0.75">
          Black and Gray Athletic Cotton Socks - 6 Pairs
        </div>

        <div className="mb-0.75">
          Quantity: 1
        </div>

        <img
          className="mb-12.5 mt-6.25 max-h-37.5 max-w-37.5"
          src={athleticCottonSocksImage}
          alt="Athletic Cotton Socks - 6 Pairs"
        />

        <div className="mb-3.75 flex justify-between text-[20px] font-medium max-[575px]:text-[16px] max-[450px]:mb-1.25 max-[450px]:flex-col">
          <div className="max-[450px]:mb-0.75">
            Preparing
          </div>
          <div className="text-[#067d62] max-[450px]:mb-0.75">
            Shipped
          </div>
          <div className="max-[450px]:mb-0.75">
            Delivered
          </div>
        </div>

        <div className="h-6.25 w-full overflow-hidden rounded-[50px] border border-[#c8c8c8]">
          <div className="h-full w-1/2 rounded-[50px] bg-green-600"></div>
        </div>
      </div>
    </div>
  );
};

export default Tracking;