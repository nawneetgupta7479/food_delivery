import React from 'react'
import {assets} from "../assets/assets"

const Navbar = () => {
  return (
    <div className='flex flex-row justify-between items-center px-[20px] py-[10px]'>
      <h2 className=' foodflick font-sans text-[1.7rem] text-[#ff4d00] font-bold'>FoodFlick</h2>
      <img className='sm:w-[40px] sm:h-[40px] h-[35px] w-[35px] rounded-full '  src={assets.admin_photo} alt="" />
    </div>
  )
}

export default Navbar
