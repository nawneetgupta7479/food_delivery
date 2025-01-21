import React from "react";
import "./FoodItem.css";
import { assets } from "../../assets/assets";
import { useContext } from "react";
import { StoreContext } from "../../Context/StoreContext";

const FoodItem = ({ id, name, price, description, image }) => {
  const { cartItems, addToCart, removeFromCart, url } = useContext(StoreContext);

  return (
    <div className="food-item w-[100%] p-3 mx-auto flex flex-col gap-5 justify-center ">
      <div className="food-item-img-container relative">
        <img className="food-item-image text-center mx-auto w-[16rem] h-[13rem]" src={url+"/images/"+image} alt="" />
        {!cartItems[id] ? (
          <img
            className="add absolute bottom-2 right-2 w-10 h-10 cursor-pointer"
            onClick={() => addToCart(id)
              
            }
            src={assets.add_icon_white}
            alt=""
          />
        ) : (
          <div className="food-item-counter absolute -bottom-6 right-9 rotate-90 bg-white p-1 rounded-[50px]">
            <img
              src={assets.remove_icon_red}
              className="decrease-qnty w-7 h-7 rotate-90 cursor-pointer"
              onClick={() => removeFromCart(id)}
              alt=""
            />
            <h1 className="qnty -rotate-90 text-rose-900 text-center text-2xl">
              {cartItems[id]}
            </h1>
            <img
              src={assets.add_icon_green}
              className="increase-qnty w-7 h-7 cursor-pointer"
              onClick={() => addToCart(id)}
              alt=""
            />
          </div>
        )}
      </div>
      <div className="food-item-info px-5 max-w-[360px]">
        <div className="food-item-name-rating max-w-[360px] flex justify-between items-center">
          <h1 className="food-item-name text-slate-900 font-bold text-[1.2rem]">
            {name}
          </h1>
          <img className="w-[3.3rem] h-3" src={assets.rating_starts} alt="" />
        </div>
        <p className="food-item-description">{description}</p>
        <h2 className="food-item-price text-2xl font-bold text-red-600">
          ${price}
        </h2>
      </div>
    </div>
  );
};

export default FoodItem;
