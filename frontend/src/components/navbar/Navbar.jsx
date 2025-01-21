
import React, { useContext, useState } from 'react';
import "./Navbar.css";
import { assets } from '../../assets/assets';
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../Context/StoreContext'; // import StoreContext
import { toast } from "react-toastify"; // Import toast

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("home");
  const { distinctCartItemsCount, token, setToken } = useContext(StoreContext); // use distinctCartItemsCount from context
  const navigate = useNavigate();
  
  const logout = () => {
    setToken("");
    localStorage.removeItem("token");
    toast.success("You have successfully logged out!"); // Toast message
    navigate("/");
  };

  return (
    <div className='navbar px-3'>
      <div>
        <Link to="/"> <h2 className='foodflick font-bold'>Foodflick</h2></Link>
      </div>
      <div className='navbar-menu'>
        <ul className='navbar-menu-list flex gap-4 px-3'>
          <Link to='/' onClick={() => setMenu("home")} className={menu === "home" ? "active" : ""}>home</Link>
          <a href='#explore-menu' onClick={() => setMenu("menu")} className={menu === "menu" ? "active" : ""}>menu</a>
          <a href="#app-download" onClick={() => setMenu("mobile-app")} className={menu === "mobile-app" ? "active" : ""}>mobile app</a>
          <a href='#footer' onClick={() => setMenu("contact-us")} className={menu === "contact-us" ? "active" : ""}>contact us</a>
        </ul>
      </div>
      <div className='navbar-icons flex sm:gap-8 gap-4 justify-items-center items-center'>
        <img className='search-icon w-4 h-4 cursor-pointer' src={assets.search_icon} alt="search icon" />
        <div className='relative'>
          <Link to="/cart"><img className='cart w-4 h-4 cursor-pointer' src={assets.basket_icon} alt='cart' /></Link>
          <span className='cart-count absolute'>{distinctCartItemsCount()}</span>
          <div className='dot'></div>
        </div>
        {token ? 
        <div className='user-profile relative'>
          <img className=' w-4 h-4 cursor-pointer' src={assets.profile_icon} alt='user' />
          <ul className='user-profile-dropdown absolute hidden right-0'>
            <li onClick={() => navigate("/myorders")} className='flex items-center justify-center gap-[10px] cursor-pointer hover:text-[#ff4d00]'>
              <img className='w-[20px]' src={assets.bag_icon} alt="" />
              <p>Orders</p>
            </li>
            <hr />
            <li onClick={logout} className='flex items-center justify-center gap-[10px] cursor-pointer hover:text-[#ff4d00]'>
              <img className='w-[20px]' src={assets.logout_icon} alt="" />
              <p>Logout</p>
            </li>
          </ul>
        </div>
        : <button onClick={() => setShowLogin(true)} className='font-serif text-center items-center sign-in-btn cursor-pointer'>sign in</button>}
      </div>
    </div>
  );
};

export default Navbar;
