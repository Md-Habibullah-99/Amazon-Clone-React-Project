import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import dayjs from 'dayjs';

import { getOrder } from '../assets/data/orders.jsx';
import { getProduct } from '../assets/data/products.jsx';

const Tracking = () => {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get('orderId');
  const productId = searchParams.get('productId');

  const order = orderId ? getOrder(orderId) : undefined;
  const orderProduct = order
    ? order.products.find((item) => item.productId === productId)
    : undefined;
  const product = orderProduct ? getProduct(orderProduct.productId) : undefined;

  if (!order || !orderProduct || !product) {
    return (
      <div className="mx-auto mb-25 mt-22.5 max-w-212.5 px-7.5">
        <Link
          className="mb-7.5 inline-block text-[#007185] hover:text-[#c7511f] hover:underline"
          to="/Orders"
        >
          View all orders
        </Link>
        <div className="mt-5 text-[18px]">
          We couldn't find that order. It may have been removed.
        </div>
      </div>
    );
  }

  // How many days the delivery option promised in total.
  const totalDays = orderProduct.deliveryDays || 0;

  // How many days have actually passed since the order was placed,
  // clamped between 0 and totalDays so the bar never over/undershoots.
  const rawDaysPassed = dayjs().diff(dayjs(order.orderDate), 'day');
  const daysPassed = Math.min(Math.max(rawDaysPassed, 0), totalDays);

  // Percentage of the delivery window that has elapsed.
  const progressPercent = totalDays > 0
    ? Math.round((daysPassed / totalDays) * 100)
    : 100;

  const isDelivered = progressPercent >= 100;
  const isShipped = progressPercent > 0 && progressPercent < 100;
  const isPreparing = progressPercent === 0;

  const stageTextClass = (isActive) =>
    isActive ? 'text-[#067d62] font-bold' : '';

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
          {isDelivered ? 'Delivered on ' : 'Arriving on '}
          {dayjs(orderProduct.estimatedDeliveryDate).format('dddd, MMMM D')}
        </div>

        <div className="mb-0.75">
          {product.name}
        </div>

        <div className="mb-0.75">
          Quantity: {orderProduct.quantity}
        </div>

        <img
          className="mb-12.5 mt-6.25 max-h-37.5 max-w-37.5"
          src={product.image}
          alt={product.name}
        />

        <div className="mb-3.75 flex justify-between text-[20px] font-medium max-[575px]:text-[16px] max-[450px]:mb-1.25 max-[450px]:flex-col">
          <div className={`max-[450px]:mb-0.75 ${stageTextClass(isPreparing)}`}>
            Preparing
          </div>
          <div className={`max-[450px]:mb-0.75 ${stageTextClass(isShipped)}`}>
            Shipped
          </div>
          <div className={`max-[450px]:mb-0.75 ${stageTextClass(isDelivered)}`}>
            Delivered
          </div>
        </div>

        <div className="h-6.25 w-full overflow-hidden rounded-[50px] border border-[#c8c8c8]">
          <div
            className="h-full rounded-[50px] bg-green-600 transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>

        <div className="mt-2.5 text-[14px] text-[#565959]">
          {daysPassed} of {totalDays} day{totalDays === 1 ? '' : 's'} passed ({progressPercent}%)
        </div>
      </div>
    </div>
  );
};

export default Tracking;
