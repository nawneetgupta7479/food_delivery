import React, { useContext } from "react";
import "./Cart.css";
import { useNavigate } from "react-router-dom";
import { StoreContext } from "../../Context/StoreContext";

const Cart = () => {
  const { cartItems, food_list, removeFromCart, totalCartAmount,url } = useContext(StoreContext);
  const navigate = useNavigate();

  return (
    <div className="cart mt-10">
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p className="text-center">Remove</p>
        </div>
        <br />
        <hr />
        {food_list.map((item) => {
          if (cartItems[item._id] > 0) {
            return (
              <div key={item._id}>
                <div className="cart-items-title cart-items-item my-6 text-slate-900">
                  <img className="w-[60px]" src={url+"/images/"+item.image} alt="" />
                  <p>{item.name}</p>
                  <p>${item.price}</p>
                  <p>{cartItems[item._id]}</p>
                  <p>${item.price * cartItems[item._id]}</p>
                  <p className="cursor-pointer text-center" onClick={() => removeFromCart(item._id)}>X</p>
                </div>
                <hr className="h-[2px] border-none bg-[#f4f0f0]" />
              </div>
            );
          }
          return null;
        })}
      </div>

      <div className="lower-cart flex justify-between items-start gap-9 mt-14 flex-wrap mb-36">
        <div className="cart-total flex flex-col gap-[10px]">
          <h2 className="text-[1.2rem] font-sans">Cart Totals</h2>
          <div className="flex flex-col gap-[2px] text-[#787575] text-[0.9rem] w-[250px]">
            <div className="flex justify-between items-center">
              <p>Subtotals</p>
              <p>${totalCartAmount()}</p>
            </div>
            <hr className="h-[2px] border-none bg-[#f4f0f0]" />
            <div className="flex justify-between items-center">
              <p>Delivery Fee</p>
              <p>${2}</p>
            </div>
            <hr className="h-[2px] border-none bg-[#f4f0f0]" />
            <div className="flex justify-between items-center">
              <h2 className="text-slate-900">Total</h2>
              <p className="text-slate-900">${totalCartAmount() + 2}</p>
            </div>
          </div>
          <button onClick={() => navigate('/order')} className="text-white bg-[#ff5900] font-bold text-[0.8rem] font-sans duration-300 opacity-95 hover:opacity-100 hover:bg-[#ff4d00] rounded-sm px-5 py-[3px]">PROCEED TO CHECKOUT</button>
        </div>

        <div className="promo-code">
          <p className="mb-[1rem] text-slate-900">Have a promo code! Enter here</p>
          <input className="rounded-tl-sm rounded-bl-sm text-[#201f1f] px-[5px] focus:outline-none border-[2px] solid grey bg-[#efecec]" type="text" placeholder="promo code" name="promo-code" id="promo-code" />
          <button className="text-white bg-black rounded-sm px-5">Submit</button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
