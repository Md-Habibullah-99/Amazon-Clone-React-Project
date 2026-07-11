import React from 'react';
import { Link } from 'react-router-dom';

const getImageUrl = (assetPath) => new URL(assetPath, import.meta.url).href;

const Orders = () => {
  // Sample order data - in a real app this would come from an API
  const orders = [
    {
      id: '27cba69d-4c3d-4098-b42d-ac7fa62b7664',
      date: 'August 12',
      total: '$35.06',
      products: [
        {
          id: '456',
          name: 'Black and Gray Athletic Cotton Socks - 6 Pairs',
          image: getImageUrl('../assets/images/products/athletic-cotton-socks-6-pairs.jpg'),
          deliveryDate: 'August 15',
          quantity: 1
        },
        {
          id: '789',
          name: 'Adults Plain Cotton T-Shirt - 2 Pack',
          image: getImageUrl('../assets/images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg'),
          deliveryDate: 'August 19',
          quantity: 2
        }
      ]
    },
    {
      id: 'b6b6c212-d30e-4d4a-805d-90b52ce6b37d',
      date: 'June 10',
      total: '$41.90',
      products: [
        {
          id: '123',
          name: 'Intermediate Size Basketball',
          image: getImageUrl('../assets/images/products/intermediate-composite-basketball.jpg'),
          deliveryDate: 'June 17',
          quantity: 2
        }
      ]
    }
  ];

  return (
    <div className="font-roboto text-[#212121] m-0">
      <div className="max-w-[850px] mt-[90px] mb-[100px] px-5 mx-auto">
        <div className="font-bold text-[26px] mb-[25px]">Your Orders</div>

        <div className="grid grid-cols-1 gap-[50px]">
          {orders.map((order) => (
            <div key={order.id} className="order-container">
              {/* Order Header */}
              <div className="bg-[#f0f2f2] border border-[#d5d9d9] flex items-center justify-between py-5 px-[25px] rounded-t-lg max-[575px]:flex-col max-[575px]:items-start max-[575px]:leading-[23px] max-[575px]:p-[15px]">
                <div className="flex shrink-0 max-[575px]:flex-col">
                  <div className="mr-[45px] max-[575px]:grid max-[575px]:grid-cols-[auto_1fr] max-[575px]:mr-0">
                    <div className="font-medium mr-[5px] max-[575px]:mr-[5px]">Order Placed:</div>
                    <div>{order.date}</div>
                  </div>
                  <div className="mr-[45px] max-[575px]:grid max-[575px]:grid-cols-[auto_1fr] max-[575px]:mr-0">
                    <div className="font-medium mr-[5px] max-[575px]:mr-[5px]">Total:</div>
                    <div>{order.total}</div>
                  </div>
                </div>

                <div className="shrink max-[575px]:grid max-[575px]:grid-cols-[auto_1fr]">
                  <div className="font-medium mr-[5px] max-[575px]:mr-[5px]">Order ID:</div>
                  <div>{order.id}</div>
                </div>
              </div>

              {/* Order Details */}
              <div className="p-[40px_25px] border border-[#d5d9d9] border-t-0 rounded-b-lg grid grid-cols-[110px_1fr_220px] gap-x-[35px] gap-y-[60px] items-center max-[800px]:grid-cols-[110px_1fr] max-[800px]:gap-y-0 max-[800px]:pb-2 max-[450px]:grid-cols-1">
                {order.products.map((product, index) => (
                  <React.Fragment key={index}>
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
                      <div className="mb-[3px]">Arriving on: {product.deliveryDate}</div>
                      <div className="mb-2 max-[450px]:mb-[15px]">Quantity: {product.quantity}</div>
                      <button className="text-[15px] w-[140px] h-9 rounded-[8px] flex items-center justify-center text-[#212121] bg-[#ffd814] border border-[#fcd200] shadow-[0_2px_5px_rgba(213,217,217,0.5)] hover:bg-[#f7ca00] hover:border-[#f2c200] active:bg-[#ffd814] active:border-[#fcd200] active:shadow-none max-[800px]:mb-[10px] max-[450px]:w-full max-[450px]:mb-[15px]">
                        <img 
                            src={getImageUrl('../assets/images/icons/buy-again.png')} 
                          alt="Buy again"
                          className="w-[25px] mr-[15px]"
                        />
                        <span>Buy it again</span>
                      </button>
                    </div>

                    {/* Product Actions */}
                    <div className="self-start max-[800px]:col-start-2 max-[800px]:mb-[30px] max-[450px]:col-auto max-[450px]:mb-[70px]">
                      <a href={`abc/${order.id}?productId=${product.id}`} className="block">
                        <Link to={`/Tracking?orderId=${order.id}&productId=${product.id}`}>
                          <button className="w-full text-[15px] p-2 text-[#212121] bg-white border border-[#d5d9d9] rounded-lg shadow-[0_2px_5px_rgba(213,217,217,0.5)] hover:bg-[#f7fafa] active:bg-[#edfdff] active:shadow-none max-[800px]:w-[140px] max-[450px]:w-full max-[450px]:p-3">
                            Track package
                          </button>
                        </Link>
                      </a>
                    </div>
                  </React.Fragment>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Orders;