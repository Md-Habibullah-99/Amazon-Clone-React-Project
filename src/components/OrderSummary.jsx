import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import calculateCartQuantity, { cart, removeFromCart, saveToStorage, updateDeliveryOption } from "../assets/data/cart.jsx";
import { getProduct, formatCurrency } from "../assets/data/products.jsx";
import { deliveryOptions, getDeliveryOption } from "../assets/data/deliveryOptions.jsx";
import { PaymentSummary } from "./PaymentSummary.jsx";

export function OrderSummary() {
  const [cartItems, setCartItems] = useState([]);
  const [editingProductId, setEditingProductId] = useState(null);
  const [quantityInput, setQuantityInput] = useState('');

  useEffect(() => {
    loadCartItems();
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
        loadCartItems();
        // Trigger re-render of payment summary
        window.dispatchEvent(new Event('cartUpdate'));
      }
    }
    setEditingProductId(null);
  };

  const handleDeleteItem = (productId) => {
    removeFromCart(productId);
    loadCartItems();
    window.dispatchEvent(new Event('cartUpdate'));
  };

  const handleDeliveryOptionChange = (productId, deliveryOptionId) => {
    updateDeliveryOption(productId, deliveryOptionId);
    loadCartItems();
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
          className="delivery-option js-delivery-option"
          data-product-id={cartItem.productId}
          data-delivery-option-id={deliveryOption.id}
          onClick={() => handleDeliveryOptionChange(cartItem.productId, deliveryOption.id)}
        >
          <input
            type="radio"
            checked={isChecked}
            className="delivery-option-input"
            id={`delivery-${cartItem.productId}-${deliveryOption.id}`}
            name={`delivery-option-${cartItem.productId}`}
            readOnly
          />
          <div>
            <div className="delivery-option-date">
              {dateString}
            </div>
            <div className="delivery-option-price">
              {priceString} Shipping
            </div>
          </div>
        </div>
      );
    });
  };

  const itemCount = calculateCartQuantity();

  return (
    <>
      <div className="checkout-middle-header-js">
        Checkout (<a className="return-to-home-link" href="amazon.html">{itemCount} items</a>)
      </div>

      <div className="js-order-summary">
        {cartItems.map((cartItem) => {
          const isEditing = editingProductId === cartItem.productId;
          
          return (
            <div 
              key={cartItem.productId}
              className={`cart-item-container js-cart-item-container-${cartItem.product.id}`}
            >
              <div className={`delivery-date js-delivery-date-${cartItem.product}`}>
                Delivery date: {cartItem.deliveryDate}
              </div>

              <div className="cart-item-details-grid">
                <img 
                  className="product-image"
                  src={cartItem.product.image} 
                  alt={cartItem.product.name}
                />

                <div className="cart-item-details">
                  <div className="product-name">
                    {cartItem.product.name}
                  </div>
                  <div className="product-price">
                    {cartItem.product.getPrice()}
                  </div>
                  <div className="product-quantity">
                    <span>
                      Quantity: 
                      <span 
                        className={`quantity-label quantity-label-js-${cartItem.product.id}`}
                        data-product-id={cartItem.product.id}
                      >
                        {isEditing ? (
                          <input
                            type="number"
                            className="update-quantity-link-js-input"
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
                        className="save-quantity-link link-primary save-quantity-link-js"
                        onClick={() => handleSaveQuantity(cartItem.productId)}
                      >
                        Save
                      </span>
                    ) : (
                      <>
                        <span 
                          className="update-quantity-link link-primary update-quantity-link-js"
                          onClick={() => handleUpdateQuantity(cartItem.productId)}
                        >
                          Update
                        </span>
                        <span 
                          className="delete-quantity-link link-primary js-delete-link"
                          onClick={() => handleDeleteItem(cartItem.productId)}
                        >
                          Delete
                        </span>
                      </>
                    )}
                  </div>
                </div>

                <div className="delivery-options">
                  <div className="delivery-options-title">
                    Choose a delivery option:
                  </div>
                  {renderDeliveryOptions(cartItem)}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <PaymentSummary />
    </>
  );
}