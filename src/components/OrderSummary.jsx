import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import calculateCartQuantity, { cart, removeFromCart, saveToStorage, updateDeliveryOption } from "../assets/data/cart.jsx";
import { getProduct, formatCurrency } from "../assets/data/products.jsx";
import { deliveryOptions, getDeliveryOption } from "../assets/data/deliveryOptions.jsx";
import { PaymentSummary } from "./PaymentSummary.jsx";

export default function OrderSummary() {
  const [cartItems, setCartItems] = useState([]);
  const [editingProductId, setEditingProductId] = useState(null);
  const [quantityInput, setQuantityInput] = useState('');

  useEffect(() => {
    loadCartItems();

    window.addEventListener('cartUpdate', loadCartItems);

    return () => {
      window.removeEventListener('cartUpdate', loadCartItems);
    };
  }, []);

  const loadCartItems = () => {
    const items = cart.map(cartItem => {
      const product = getProduct(cartItem.productId);
      const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);
      
      const today = dayjs();
      const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
      const dateString = deliveryDate.format('dddd, MMMM D');

      return {
        ...cartItem,
        product,
        deliveryOption,
        deliveryDate: dateString
      };
    });
    setCartItems(items);
  };

  const handleUpdateQuantity = (productId) => {
    setEditingProductId(productId);
    const cartItem = cart.find(item => item.productId === productId);
    setQuantityInput(cartItem ? cartItem.quantity.toString() : '');
  };

  const handleSaveQuantity = (productId) => {
    const inputValue = Number(quantityInput);
    const cartItem = cart.find(item => item.productId === productId);
    
    if (cartItem) {
      if (!inputValue || inputValue < 0) {
        // Keep original quantity
        setQuantityInput(cartItem.quantity.toString());
      } else {
        cartItem.quantity = inputValue;
        saveToStorage();
        setCartItems((currentCartItems) =>
          currentCartItems.map((item) =>
            item.productId === productId
              ? { ...item, quantity: inputValue }
              : item
          )
        );
        // Trigger re-render of payment summary
        window.dispatchEvent(new Event('cartUpdate'));
      }
    }
    setEditingProductId(null);
  };

  const handleDeleteItem = (productId) => {
    removeFromCart(productId);
    setCartItems((currentCartItems) =>
      currentCartItems.filter((item) => item.productId !== productId)
    );
    window.dispatchEvent(new Event('cartUpdate'));
  };

  const handleDeliveryOptionChange = (productId, deliveryOptionId) => {
    updateDeliveryOption(productId, deliveryOptionId);
    setCartItems((currentCartItems) =>
      currentCartItems.map((item) =>
        item.productId === productId
          ? { ...item, deliveryOptionId }
          : item
      )
    );
    window.dispatchEvent(new Event('cartUpdate'));
  };

  const renderDeliveryOptions = (cartItem) => {
    return deliveryOptions.map((deliveryOption) => {
      const today = dayjs();
      const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
      const dateString = deliveryDate.format('dddd, MMMM D');
      
      const priceString = deliveryOption.priceCents === 0 ? 'FREE' : `$${formatCurrency(deliveryOption.priceCents)} -`;
      const isChecked = deliveryOption.id === cartItem.deliveryOptionId;

      return (
        <div 
          key={deliveryOption.id}
          className="delivery-option js-delivery-option grid grid-cols-[24px_1fr] mb-3 cursor-pointer"
          data-product-id={cartItem.productId}
          data-delivery-option-id={deliveryOption.id}
          onClick={() => handleDeliveryOptionChange(cartItem.productId, deliveryOption.id)}
        >
          <input
            type="radio"
            checked={isChecked}
            className="delivery-option-input ml-0 mr-[2px] cursor-pointer"
            id={`delivery-${cartItem.productId}-${deliveryOption.id}`}
            name={`delivery-option-${cartItem.productId}`}
            readOnly
          />
          <div className="ml-[2px] text-[16px] leading-4.5">
            <div className="delivery-option-date text-[rgb(0,118,0)] font-bold">
              {dateString}
            </div>
            <div className="delivery-option-price text-[#6b6375]">
              {priceString} Shipping
            </div>
          </div>
        </div>
      );
    });
  };


  return (
    /* ADDED FOR RESPONSIVENESS: mobile-first - full-width with side padding on
       phones/tablets, capped at 1100px with no side padding on lg: (desktop) */
    <div className="mx-auto mt-[90px] sm:mt-[110px] lg:mt-[140px] mb-[60px] sm:mb-[100px] w-full max-w-[500px] lg:max-w-[1100px] px-3 lg:px-0">

      <div className="font-extrabold text-[18px] sm:text-[22px] mb-[18px] mx-0 px-0">Review your order</div>

      {/* ADDED FOR RESPONSIVENESS: single stacked column on mobile/tablet,
          two-column (cart items left / subtotal right) from lg: up */}
      <div className="grid items-start grid-cols-1 lg:grid-cols-[1fr_350px] gap-x-[12px]">
        <div>
          {cartItems.map((cartItem) => {
            const isEditing = editingProductId === cartItem.productId;
            
            return (
              <div 
                key={cartItem.productId}
                className={`cart-item-container js-cart-item-container-${cartItem.product.id} border border-[rgb(222,222,222)] rounded-[4px] p-[18px] mb-[12px]`}
              >
                <div className={`delivery-date js-delivery-date-${cartItem.product} text-[rgb(0,118,0)] font-bold text-[19px] mt-[4px] mb-[22px]`}>
                  Delivery date: {cartItem.deliveryDate}
                </div>

                {/* ADDED FOR RESPONSIVENESS: image+details+delivery stack more
                    compactly on mobile/tablet, spread into 3 columns on lg: up */}
                <div className="mt-[-3px] grid grid-cols-[100px_1fr] lg:grid-cols-[100px_1fr_1fr] gap-x-[15px] sm:gap-x-[25px] gap-y-[20px] lg:gap-y-0">
                  <img 
                    className="max-w-full max-h-[100px] sm:max-h-[120px] mx-auto"
                    src={cartItem.product.image} 
                    alt={cartItem.product.name}
                  />

                  <div className="cart-item-details">
                    <div className="product-name font-bold mb-[0px] text-[16px]">
                      {cartItem.product.name}
                    </div>
                    <div className="product-price text-[rgb(177,39,4)] font-bold mb-[0px] text-[16px]">
                      {cartItem.product.getPrice()}
                    </div>
                    <div className="product-quantity mt-[-2px] text-[16px] flex gap-x-[6px]">
                      <span>
                        Quantity: 
                        <span 
                          className={`quantity-label quantity-label-js-${cartItem.product.id}`}
                          data-product-id={cartItem.product.id}
                        > {' '}
                          {isEditing ? (
                            <input
                              type="number"
                              className="update-quantity-link-js-input max-w-[40px] border-2 border-[rgb(165,149,2)] rounded-[3px] mr-0"
                              value={quantityInput}
                              onChange={(e) => setQuantityInput(e.target.value)}
                              autoFocus
                            />
                          ) : (
                            cartItem.quantity
                          )}
                        </span>
                      </span>

                      {isEditing ? (
                        <span 
                          className="save-quantity-link link-primary save-quantity-link-js text-[rgb(1,124,182)] hover:text-[rgb(196,80,0)] cursor-pointer"
                          onClick={() => handleSaveQuantity(cartItem.productId)}
                        >
                          Save
                        </span>
                      ) : (
                        <>
                          <span 
                            className="update-quantity-link link-primary update-quantity-link-js text-[rgb(1,124,182)] hover:text-[rgb(196,80,0)] cursor-pointer"
                            onClick={() => handleUpdateQuantity(cartItem.productId)}
                          >
                            Update
                          </span>
                          <span 
                            className="delete-quantity-link link-primary js-delete-link text-[rgb(1,124,182)] hover:text-[rgb(196,80,0)] cursor-pointer"
                            onClick={() => handleDeleteItem(cartItem.productId)}
                          >
                            Delete
                          </span>
                        </>
                      )}
                    </div>
                  </div>

                  {/* ADDED FOR RESPONSIVENESS: spans both mobile columns, becomes its own column on lg: */}
                  <div className="delivery-options col-span-2 lg:col-span-1">
                    <div className="delivery-options-title font-bold mb-[10px] text-[17px]">
                      Choose a delivery option:
                    </div>
                    {renderDeliveryOptions(cartItem)}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ADDED FOR RESPONSIVENESS: subtotal box appears above cart items on
            mobile/tablet (row-start-1), moves to the right column on lg: up */}
        <div className="payment-summary border border-[rgb(222,222,222)] rounded-[4px] p-[18px] pb-[5px] row-start-1 mb-[12px] lg:row-start-auto lg:mb-0">
          <PaymentSummary />
        </div>
      </div>
    </div>
  );
}