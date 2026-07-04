import React, { useState, useEffect } from 'react';
import calculateCartQuantity, { cart } from "../assets/data/cart.jsx";
import { getProduct, formatCurrency } from "../assets/data/products.jsx";
import { getDeliveryOption } from "../assets/data/deliveryOptions.jsx";
import addOrder from "../assets/data/orders.jsx";


export function PaymentSummary() {
  const [paymentData, setPaymentData] = useState({
    productPriceCents: 0,
    shippingPriceCents: 0,
    totalBeforeTaxCents: 0,
    taxCents: 0,
    totalCents: 0,
    itemCount: 0
  });


  useEffect(() => {
    calculatePaymentSummary();

    window.addEventListener('cartUpdate', calculatePaymentSummary);

    return () => {
      window.removeEventListener('cartUpdate', calculatePaymentSummary);
    };
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


  return (
    <div className="leading-4">
      <div className="payment-summary-title font-bold text-[18px] mb-3">
        Order Summary
      </div>

      <div className="payment-summary-row grid grid-cols-[1fr_auto] text-[15px] mb-2.25">
        <div>Items ({paymentData.itemCount}):</div>
        <div className="payment-summary-money text-right">
          ${formatCurrency(paymentData.productPriceCents)}
        </div>
      </div>

      <div className="payment-summary-row grid grid-cols-[1fr_auto] text-[15px] mb-2.25">
        <div>Shipping &amp; handling:</div>
        <div className="payment-summary-money text-right">
          ${formatCurrency(paymentData.shippingPriceCents)}
        </div>
      </div>

      <div className="payment-summary-row subtotal-row grid grid-cols-[1fr_auto] text-[15px] mb-2.25 border-t border-[rgb(222,222,222)] pt-2.25">
        <div>Total before tax:</div>
        <div className="payment-summary-money text-right">
          ${formatCurrency(paymentData.totalBeforeTaxCents)}
        </div>
      </div>

      <div className="payment-summary-row grid grid-cols-[1fr_auto] text-[15px] mb-2.25">
        <div>Estimated tax (10%):</div>
        <div className="payment-summary-money text-right">
          ${formatCurrency(paymentData.taxCents)}
        </div>
      </div>

      <div className="payment-summary-row total-row grid grid-cols-[1fr_auto] mb-2.25 text-[rgb(177,39,4)] font-bold text-[18px] border-t border-[rgb(222,222,222)] pt-4.5">
        <div>Order total:</div>
        <div className="payment-summary-money text-right">
          ${formatCurrency(paymentData.totalCents)}
        </div>
      </div>

      <button 
        className="place-order-button button-primary js-place-order text-[12px] w-full py-[12px] rounded-lg mt-2.75 mb-3.75 border-[1px_solid_rgb(252,210,0)] bg-[rgb(255,216,20)] shadow-[0_2px_5px_rgba(213,217,217,0.5)] cursor-pointer hover:bg-[rgb(247,202,0)] hover:border-[rgb(242,194,0)] active:bg-[rgb(255,216,20)] active:border-[rgb(252,210,0)] active:shadow-none "
      >
         Place your order
      </button>
    </div>
  );
}