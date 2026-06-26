import React, { useState, useEffect } from 'react';
import calculateCartQuantity, { cart } from "../assets/data/cart.jsx";
import { getProduct, formatCurrency } from "../assets/data/products.jsx";
import { getDeliveryOption } from "../assets/data/deliveryOptions.jsx";
import addOrder from "../assets/data/orders.js";


export function PaymentSummary() {
  const [paymentData, setPaymentData] = useState({
    productPriceCents: 0,
    shippingPriceCents: 0,
    totalBeforeTaxCents: 0,
    taxCents: 0,
    totalCents: 0,
    itemCount: 0
  });

  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  useEffect(() => {
    calculatePaymentSummary();
  }, []);

  const calculatePaymentSummary = () => {
    let productPriceCents = 0;
    let shippingPriceCents = 0;

    cart.forEach((cartItem) => {
      const product = getProduct(cartItem.productId);
      productPriceCents += product.priceCents * cartItem.quantity;

      const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);
      shippingPriceCents += deliveryOption.priceCents;
    });

    const totalBeforeTaxCents = productPriceCents + shippingPriceCents;
    const taxCents = totalBeforeTaxCents * 0.1;
    const totalCents = taxCents + totalBeforeTaxCents;

    setPaymentData({
      productPriceCents,
      shippingPriceCents,
      totalBeforeTaxCents,
      taxCents,
      totalCents,
      itemCount: calculateCartQuantity()
    });
  };

  const handlePlaceOrder = async () => {
    setIsPlacingOrder(true);
    try {
      const response = await fetch("https://supersimplebackend.dev/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          cart: cart
        })
      });
      
      const order = await response.json();
      addOrder(order);
      window.location.href = "orders.html";
      
    } catch (error) {
      console.log('Unexpected error. Please try again later.');
      setIsPlacingOrder(false);
    }
  };

  return (
    <div>
      <div className="payment-summary-title">
        Order Summary
      </div>

      <div className="payment-summary-row">
        <div>Items ({paymentData.itemCount}):</div>
        <div className="payment-summary-money">
          ${formatCurrency(paymentData.productPriceCents)}
        </div>
      </div>

      <div className="payment-summary-row">
        <div>Shipping &amp; handling:</div>
        <div className="payment-summary-money">
          ${formatCurrency(paymentData.shippingPriceCents)}
        </div>
      </div>

      <div className="payment-summary-row subtotal-row">
        <div>Total before tax:</div>
        <div className="payment-summary-money">
          ${formatCurrency(paymentData.totalBeforeTaxCents)}
        </div>
      </div>

      <div className="payment-summary-row">
        <div>Estimated tax (10%):</div>
        <div className="payment-summary-money">
          ${formatCurrency(paymentData.taxCents)}
        </div>
      </div>

      <div className="payment-summary-row total-row">
        <div>Order total:</div>
        <div className="payment-summary-money">
          ${formatCurrency(paymentData.totalCents)}
        </div>
      </div>

      <button 
        className="place-order-button button-primary js-place-order"
        onClick={handlePlaceOrder}
        disabled={isPlacingOrder}
      >
        {isPlacingOrder ? 'Placing Order...' : 'Place your order'}
      </button>
    </div>
  );
}