import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';

import { orders, loadOrdersFromStorage } from '../assets/data/orders.jsx';
import { getProduct, formatCurrency } from '../assets/data/products.jsx';
import { useSearch } from '../context/SearchContext.jsx';

const getImageUrl = (assetPath) => new URL(assetPath, import.meta.url).href;

const Orders = () => {
  const [orderList, setOrderList] = useState([]);
  const { searchTerm } = useSearch();

  useEffect(() => {
    const loadOrders = () => {
      loadOrdersFromStorage();
      setOrderList([...orders]);
    };

    loadOrders();

    window.addEventListener('ordersUpdate', loadOrders);

    return () => {
      window.removeEventListener('ordersUpdate', loadOrders);
    };
  }, []);

  const normalizedSearch = searchTerm.trim().toLowerCase();

  const filteredOrders = normalizedSearch
    ? orderList
        .map((order) => ({
          ...order,
          products: order.products.filter((orderProduct) => {
            const product = getProduct(orderProduct.productId);
            if (!product) return false;

            const nameMatch = product.name?.toLowerCase().includes(normalizedSearch);
            const keywordMatch = Array.isArray(product.keywords) &&
              product.keywords.some((keyword) =>
                keyword.toLowerCase().includes(normalizedSearch)
              );
            const typeMatch = product.type?.toLowerCase().includes(normalizedSearch);

            return nameMatch || keywordMatch || typeMatch;
          })
        }))
        .filter((order) => order.products.length > 0)
    : orderList;

  return (
    <div className="font-roboto text-[#212121] m-0">
      <div className="max-w-[850px] mt-[90px] mb-[100px] px-5 mx-auto">
        <div className="font-bold text-[26px] mb-[25px]">Your Orders</div>

        {orderList.length === 0 ? (
          <div className="text-[#565959]">
            You don't have any orders yet.{' '}
            <Link to="/" className="text-[#007185] hover:text-[#c7511f] hover:underline">
              Start shopping
            </Link>
          </div>
        ) : normalizedSearch && filteredOrders.length === 0 ? (
          <div className="text-[#565959]">
            No ordered products found for "{searchTerm}".
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-[50px]">
            {filteredOrders.map((order) => (
              <div key={order.id} className="order-container">
                {/* Order Header */}
                <div className="bg-[#f0f2f2] border border-[#d5d9d9] flex items-center justify-between py-5 px-[25px] rounded-t-lg max-[575px]:flex-col max-[575px]:items-start max-[575px]:leading-[23px] max-[575px]:p-[15px]">
                  <div className="flex shrink-0 max-[575px]:flex-col">
                    <div className="mr-[45px] max-[575px]:grid max-[575px]:grid-cols-[auto_1fr] max-[575px]:mr-0">
                      <div className="font-medium mr-[5px] max-[575px]:mr-[5px]">Order Placed:</div>
                      <div>{dayjs(order.orderDate).format('MMMM D, YYYY')}</div>
                    </div>
                    <div className="mr-[45px] max-[575px]:grid max-[575px]:grid-cols-[auto_1fr] max-[575px]:mr-0">
                      <div className="font-medium mr-[5px] max-[575px]:mr-[5px]">Total:</div>
                      <div>${formatCurrency(order.totalCents)}</div>
                    </div>
                  </div>

                  <div className="shrink max-[575px]:grid max-[575px]:grid-cols-[auto_1fr]">
                    <div className="font-medium mr-[5px] max-[575px]:mr-[5px]">Order ID:</div>
                    <div>{order.id}</div>
                  </div>
                </div>

                {/* Order Details */}
                <div className="p-[40px_25px] border border-[#d5d9d9] border-t-0 rounded-b-lg grid grid-cols-[110px_1fr_220px] gap-x-[35px] gap-y-[60px] items-center max-[800px]:grid-cols-[110px_1fr] max-[800px]:gap-y-0 max-[800px]:pb-2 max-[450px]:grid-cols-1">
                  {order.products.map((orderProduct) => {
                    const product = getProduct(orderProduct.productId);
                    if (!product) return null;

                    return (
                      <React.Fragment key={orderProduct.productId}>
                        {/* Product Image */}
                        <div className="text-center max-[450px]:mb-[25px]">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="max-w-[110px] max-h-[110px] max-[450px]:max-w-[150px] max-[450px]:max-h-[150px]"
                          />
                        </div>

                        {/* Product Details */}
                        <div className="md:col-span-1">
                          <div className="font-bold mb-[5px] max-[450px]:mb-[10px]">{product.name}</div>
                          <div className="mb-[3px]">
                            Arriving on: {dayjs(orderProduct.estimatedDeliveryDate).format('dddd, MMMM D')}
                          </div>
                          <div className="mb-2 max-[450px]:mb-[15px]">Quantity: {orderProduct.quantity}</div>
                          <Link to={`/`}>
                            <button className="text-[15px] w-[140px] h-9 rounded-[8px] flex items-center justify-center text-[#212121] bg-[#ffd814] border border-[#fcd200] shadow-[0_2px_5px_rgba(213,217,217,0.5)] hover:bg-[#f7ca00] hover:border-[#f2c200] active:bg-[#ffd814] active:border-[#fcd200] active:shadow-none max-[800px]:mb-[10px] max-[450px]:w-full max-[450px]:mb-[15px]">
                              <img
                                src={getImageUrl('../assets/images/icons/buy-again.png')}
                                alt="Buy again"
                                className="w-[25px] mr-[15px]"
                            />
                            <span>Buy it again</span>
                          </button>
                          </Link>
                        </div>

                        {/* Product Actions */}
                        <div className="self-start max-[800px]:col-start-2 max-[800px]:mb-[30px] max-[450px]:col-auto max-[450px]:mb-[70px]">
                          <Link to={`/Tracking?orderId=${order.id}&productId=${orderProduct.productId}`}>
                            <button className="w-full text-[15px] p-2 text-[#212121] bg-white border border-[#d5d9d9] rounded-lg shadow-[0_2px_5px_rgba(213,217,217,0.5)] hover:bg-[#f7fafa] active:bg-[#edfdff] active:shadow-none max-[800px]:w-[140px] max-[450px]:w-full max-[450px]:p-3">
                              Track package
                            </button>
                          </Link>
                        </div>
                      </React.Fragment>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
