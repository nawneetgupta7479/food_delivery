import React from 'react';
import "./Footer.css";
import { assets } from '../../assets/assets';
import { FaHeart } from "react-icons/fa";

const Footer = () => {
  return (
    <div className='mt-10 footer' id='footer'>
    
      <div className="lower-footer ">
        <div className="footer-links">
          <h1>Company</h1>
          <p>About Us</p>
          <p>Team</p>
          <p>Careers</p>
        </div>
        <div className="footer-links">
          <h1>Contact</h1>
          <p>Help & Support</p>
          <p>Partner with us</p>
          <p>Ride with us</p>
        </div>
        <div className="footer-links">
          <h1>Legal</h1>
          <p>Terms & Conditions</p>
          <p>Refund & Cancellation</p>
          <p>Privacy Policy</p>
        </div>
        <div className="footer-links">
          <h1>Connect</h1>
          <p>764-335-3465</p>
          <p>foodflick14@gmail.com</p>
          <p className='flex gap-2'>
            <img className='w-[25px] h-[25px]' src={assets.facebook_icon} alt="" />
            <img className='w-[25px] h-[25px]' src={assets.twitter_icon} alt="" />
            <img className='w-[25px] h-[25px]' src={assets.linkedin_icon} alt="" />
          </p>
        </div>
       
      </div>
   
      <p className=' love  mx-auto text-center gap-1 flex flex-row items-center justify-center text-white'>
          <span className='opacity-40'>made with</span>
          <span className='opacity-80'><FaHeart className='text-red-600 ' /></span>
          <span className='opacity-40'>by gupta_nawneet</span>
        </p>
    </div>
  );
}

export default Footer;
