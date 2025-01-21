import React, { useContext, useEffect, useState } from 'react';
import "./PlaceOrder.css";
import { StoreContext } from '../../Context/StoreContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const PlaceOrder = () => {
  const { totalCartAmount,token, food_list, cartItems, url } = useContext(StoreContext);
  // const navigate = useNavigate();

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    pincode: "",
    city: "",
    state: "",
    country: "",
    number: "",
  }); 

  const onchangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData(data=>({ ...data, [name]: value }));
  }



  const placeOrder = async(event)=>{
    event.preventDefault();
    let orderItems = [];
    food_list.map((item) => {
      if(cartItems[item._id]>0){
        let itemInfo = item;
        itemInfo['quantity'] = cartItems[item._id];
        orderItems.push(itemInfo);
      }
      
    })
    

    let orderData = {
      address:data,
      items:orderItems,
      amount: totalCartAmount() + 2,


    }
    try{
    let response = await axios.post(url + "/api/order/place", orderData, {headers:{token}});
    if(response.data.success){
      const {session_url} = response.data;
      window.location.replace(session_url);
    }else{
      alert("Order Failed");
    }
  }catch(error){
    console.log(error)
  }
   
  }
   
  const navigate = useNavigate();

  useEffect(()=>{
    if(!token){
      navigate('/cart');
    }else if(totalCartAmount() === 0){
      navigate('/cart');
    }
  },[token])

  return (
    <form onSubmit={placeOrder} className='flex flex-row justify-between items-start flex-wrap gap-10 my-10'>
      <div className="place-order-left flex flex-col gap-3 w-full md:w-1/2">
        <p className='text-[1.2rem] text-slate-900 mb-4 font-sans'>Delivery Information</p>
        <div className='flex flex-col gap-6'>
          <input required className='rounded-sm text-[#403f3f] focus:outline-none border border-[#d8d6d6] px-2 py-1 w-full' name="firstName" onChange={onchangeHandler} value={data.firstName} type="text" placeholder='First Name' />
          <input required className='rounded-sm text-[#403f3f] focus:outline-none border border-[#d8d6d6] px-2 py-1 w-full' name="lastName" onChange={onchangeHandler} value={data.lastName} type="text" placeholder='Last Name' />
        </div>
        <input required className='rounded-sm text-[#403f3f] focus:outline-none border border-[#d8d6d6] px-2 py-1 w-full' name="email" onChange={onchangeHandler} value={data.email} type="email" placeholder='Email' />
        <input required className='rounded-sm text-[#403f3f] focus:outline-none border border-[#d8d6d6] px-2 py-1 w-full' name="street" onChange={onchangeHandler} value={data.street} type="text" placeholder='Street' />
        <div className='flex flex-col gap-6'>
          <input required className='rounded-sm text-[#403f3f] focus:outline-none border border-[#d8d6d6] px-2 py-1 w-full' name="pincode" onChange={onchangeHandler} value={data.pincode} type="number" placeholder='Pincode' />
          <input required className='rounded-sm text-[#403f3f] focus:outline-none border border-[#d8d6d6] px-2 py-1 w-full' name="city" onChange={onchangeHandler} value={data.city} type="text" placeholder='City' />
        </div>
        <div className='flex flex-col gap-6'>
          <input required className='rounded-sm text-[#403f3f] focus:outline-none border border-[#d8d6d6] px-2 py-1 w-full' name="state" onChange={onchangeHandler} value={data.state} type="text" placeholder='State' />
          <input required className='rounded-sm text-[#403f3f] focus:outline-none border border-[#d8d6d6] px-2 py-1 w-full' name="country" onChange={onchangeHandler} value={data.country} type="text" placeholder='Country' />
        </div>
        <input required className='rounded-sm text-[#403f3f] focus:outline-none border border-[#d8d6d6] px-2 py-1 w-full' name="number" onChange={onchangeHandler} value={data.number} type="number" placeholder='Number' />
      </div>
      
      <div className="place-order-right flex flex-col justify-between items-start gap-9 mt-14 mb-20 w-full md:w-1/2">
        <div className="cart-total flex flex-col gap-3 w-full">
          <h2 className="text-[1.2rem] font-sans">Cart Totals</h2>
          <div className="flex flex-col gap-2 text-[#787575] ">
            <div className="flex justify-between">
              <p>Subtotals</p>
              <p>${totalCartAmount()}</p>
            </div>
            <hr className="h-[2px] border-none bg-[#f4f0f0]" />
            <div className="flex justify-between">
              <p>Delivery Fee</p>
              <p>$2</p>
            </div>
            <hr className="h-[2px] border-none bg-[#f4f0f0]" />
            <div className="flex justify-between">
              <h2 className="text-slate-900">Total</h2>
              <p className="text-slate-900">${totalCartAmount() + 2}</p>
            </div>
          </div>
          <button  type='submit' className="text-white bg-[#ff5900] font-bold font-sans duration-300 opacity-95 hover:opacity-100 hover:bg-[#ff4d00] rounded-sm px-5 py-[2px]">
            Pay Now
          </button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
