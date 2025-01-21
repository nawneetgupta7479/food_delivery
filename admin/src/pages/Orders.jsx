import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import Spinner from '../components/Spinner';
import { assets } from "../assets/assets";

const Orders = ({ url }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAllOrders = async () => {
    try {
      const response = await axios.get(`${url}/api/order/allorders`, { params: { userId: localStorage.getItem("userId") } });
      setOrders(response.data.data);
    } catch (error) {
      console.log(error);
      toast.error("Orders not found");
    } finally {
      setLoading(false);
    }
  };

  const statusHandler = async ( event, orderId) => {
    
   try{
    const response = await axios.post(url+"/api/order/status",{orderId,status:event.target.value})
    toast.success(response.data.message)
    await fetchAllOrders()
   }catch(error){
      console.log(error)
      toast.error("Failed to update status")
    }
  } 

  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-slate-900">Orders</h1>
      {loading && <Spinner />}
      {!loading && orders.map((order, index) => (
        <div key={index} className="bg-white shadow-md rounded-lg p-4 sm:p-6 mb-6">
          <div className="flex flex-col sm:flex-row items-center mb-4">
            <img src={assets.parcel_icon} alt="Parcel Icon" className="w-12 sm:w-16 h-12 sm:h-16 mb-4 sm:mb-0 sm:mr-6" />
            <div className="text-center sm:text-left">
              <h3 className="text-md font-[510]  text-slate-950">Order Id: {order._id}</h3>
              <h3 className="text-md sm:text-lg">Payment: <span className={order.payment ? "text-green-500" : "text-red-500"}>{order.payment ? "Success" : "Failed"}</span></h3>
            </div>
          </div>
          <div className="bg-gray-100 p-3 sm:p-4 rounded-lg mb-4">
            <h3 className="text-md sm:text-lg font-semibold mb-2 text-slate-900">Products:</h3>
            {order.items.map((item, idx) => (
              <div key={idx} className="flex justify-between items-center mb-2">
                <div>
                  <h4 className="text-sm sm:text-md font-medium">{item.name}</h4>
                  <h4 className="text-xs sm:text-sm">Price: {item.price}</h4>
                </div>
                <h4 className="text-xs sm:text-sm">Quantity: {item.quantity}</h4>
              </div>
            ))}
          </div>
          {order.address && (
            <div className="bg-gray-50 p-3 sm:p-4 rounded-lg mb-4">
              <h3 className="text-md sm:text-lg font-semibold mb-2 text-slate-900">Shipping Details:</h3>
              <p className="text-xs sm:text-sm text-slate-900"><strong>Name:</strong> {order.address.firstName} {order.address.lastName}</p>
              <p className="text-xs sm:text-sm text-slate-900"><strong>Address:</strong> {order.address.street}, {order.address.city}-{order.address.pincode}, {order.address.state}</p>
              <p className="text-xs sm:text-sm text-slate-900"><strong>Phone:</strong> {order.address.number}</p>
            </div>
          )}
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-md sm:text-lg  text-slate-950">Items: {order.items.length}</h1>
            <p className="text-md sm:text-lg  text-slate-950">Amount: ${order.amount}</p>
          </div>
          <div className="flex justify-end">
            <select onChange={(event)=>{statusHandler(event,order._id)}} value={order.status} className="border rounded-sm px-2 sm:px-4 text-[13px] text-slate-900 sm:text-[1rem] py-2 bg-[#f7979780]">
              <option value="Food Processing">Food Processing</option>
              <option value="Out for delivery">Out for delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Orders;
