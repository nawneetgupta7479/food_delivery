import React, { useContext, useState, useEffect } from 'react';
import { StoreContext } from '../Context/StoreContext';
import axios from 'axios';
import { assets } from '../assets/assets';

const MyOrders = () => {
  const { url, token } = useContext(StoreContext);
  const [data, setData] = useState([]);

  const fetchOrders = async () => {
    try {
      const response = await axios.post(url + "/api/order/userorders", {}, { headers: { token } });
      setData(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token]);

  return (
    <div className="p-4 bg-gray-100 min-h-fit my-[50px]">
      <h2 className="text-2xl font-bold mb-4 text-center">My Orders</h2>
      <div className="container mx-auto">
        {data.map((order, index) => (
          <div key={index} className="bg-white p-2 rounded-lg shadow-md mb-4 flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center mb-4 md:mb-0">
              <img src={assets.parcel_icon} alt="Parcel Icon" className="w-12 h-12 mr-4" />
              <div>
                <p className="font-medium text-gray-700">
                  {order.items.map((item, idx) => (
                    <span key={idx}>
                      {item.name} x {item.quantity}{idx === order.items.length - 1 ? '' : ', '}
                    </span>
                  ))}
                </p>
              </div>
            </div>
            <div className="text-center mb-4 md:mb-0">
              <p className="text-lg font-semibold">${order.amount}.00</p>
            </div>
            <div className="text-center mb-4 md:mb-0">
              <p className="text-gray-700">Items: {order.items.length}</p>
            </div>
            <div className="text-center mb-4 md:mb-0">
              <p className="text-gray-700"><span className="text-green-500">&#x25cf;</span> <b>{order.status}</b></p>
            </div>
            <div className="text-center">
              <button onClick={fetchOrders} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">Track Order</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyOrders;
