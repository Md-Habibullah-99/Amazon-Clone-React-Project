import React, { useState, useEffect } from 'react';
import { cart, addToCart, updateCartQuantity } from "../assets/data/cart.jsx";
import { products } from "../assets/data/products.jsx";
import checkmarkIcon from '../assets/images/icons/checkmark.png';

const ProductsGrid = () => {
  const [productList, setProductList] = useState([]);
  const [cartQuantity, setCartQuantity] = useState(0);
  const [addedProducts, setAddedProducts] = useState({});

  useEffect(() => {
    setProductList(products);
    updateCartQuantity();
    setCartQuantity(cart.length);
  }, []);

  const handleAddToCart = (productId) => {
    addToCart(productId);
    
    setAddedProducts(prev => ({
      ...prev,
      [productId]: true
    }));
    
    setTimeout(() => {
      setAddedProducts(prev => ({
        ...prev,
        [productId]: false
      }));
    }, 1000);
    
    const selectElement = document.querySelector(`.select-on-productId-${productId}`);
    if (selectElement) {
      selectElement.value = '1';
    }
    
    updateCartQuantity();
    setCartQuantity(cart.length);
  };

  return (
    <main className="mt-[60px] text-black">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-5 [@media(max-width:2000px)]:grid-cols-6 [@media(max-width:1600px)]:grid-cols-5 [@media(max-width:1300px)]:grid-cols-5 [@media(max-width:1000px)]:grid-cols-4 [@media(max-width:800px)]:grid-cols-3 [@media(max-width:575px)]:grid-cols-2 [@media(max-width:450px)]:grid-cols-1">
        {productList.map((product) => (
          <div 
            key={product.id}
            className="pt-[40px] pb-[25px] px-[25px] border-r border-b border-[rgb(231,231,231)] flex flex-col"
          >
            <div className="flex justify-center items-center h-[180px] mb-[20px]">
              <img 
                className="max-w-full max-h-full" 
                src={product.image} 
                alt={product.name}
              />
            </div>

            <div className="h-[36px] mt-[1px] mb-[4px] line-clamp-2 leading-4 text-[16px]">
              {product.name}
            </div>

            <div className="flex items-center mb-[8px]">
              <img 
                className="w-[100px] mr-[6px]" 
                src={product.getStarsUrl()} 
                alt="Rating"
              />
              <div className="text-[rgb(1,124,182)] cursor-pointer mt-[4px] text-[16px]">
                {product.rating.count}
              </div>
            </div>

            <div className="font-bold mt-[-4px] mb-[4px] pt-0 text-[16px]">
              {product.getPrice()}
            </div>

            <div className="mb-[14px]">
              <select className={`select-on-productId-${product.id} bg-gray-100 border border-gray-300 rounded-[8px] px-1 py-1 text-[14px] shadow-[0_2px_5px_rgba(213,217,217,0.5)]`}>
                {[1,2,3,4,5,6,7,8,9,10].map(num => (
                  <option key={num} value={num}>{num}</option>
                ))}
              </select>
            </div>

            {product.extraInfoHTML && (
              <div className="text-[16px] text-gray-600" dangerouslySetInnerHTML={{ __html: product.extraInfoHTML() }} />
            )}

            <div className="flex-1"></div>

            <div className={`text-[rgb(6,125,98)] text-[16px] flex items-center mb-[2px] transition-opacity duration-300 ${
              addedProducts[product.id] ? 'opacity-100' : 'opacity-0'
            }`}>
              <img 
                className="h-[20px] mr-[5px]" 
                src={checkmarkIcon} 
                alt="Added"
              />
              Added
            </div>

            <button 
              className="w-full text-[12px] py-[4px] px-[8px] mt-[-4px] rounded-[50px] border-[rgb(252,210,0)] bg-[rgb(255,216,20)]  hover:bg-[rgb(247,202,0)] hover:border-[rgb(242,194,0)] transition-colors cursor-pointer border-none shadow-[0_2px_5px_rgba(213,217,217,0.5)]"
              onClick={() => handleAddToCart(product.id)}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </main>
  );
};

export default ProductsGrid;