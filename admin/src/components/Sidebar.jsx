import React from 'react'
import { assets } from '../assets/assets'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className=' min-h-screen w-[18%] border-[1.5px] border-solid border-[#a9a9a9] border-t-0 text-[12px]'>
      <div className="pt-[50px]  pl-[20%] flex flex-col  gap-4  ">
      <NavLink to="/add" className=' admin-option flex flex-row justify-start items-center gap-[12px] border-[1px] border-solid border-[#a9a9a9] border-r-0 px-2 py-1 rounded-tl-sm rounded-bl-sm cursor-pointer '>
        <img className='w-[16px] ' src={assets.add_icon} alt="" />
        <p className='hidden sm:block'>Add Items</p>
      </NavLink>
      <NavLink to="/list" className='admin-option flex flex-row justify-start items-center gap-[12px] border-[1px] border-solid border-[#a9a9a9] border-r-0 px-2 py-1 rounded-tl-sm rounded-bl-sm cursor-pointer '>
        <img className='w-[16px] ' src={assets.order_icon} alt="" />
        <p className='hidden sm:block'>List Items</p>
      </NavLink>
      <NavLink to="/orders" className='admin-option flex flex-row justify-start items-center gap-[12px] border-[1px] border-solid border-[#a9a9a9] border-r-0 px-2 py-1 rounded-tl-sm rounded-bl-sm cursor-pointer '>
        <img className='w-[16px] ' src={assets.order_icon} alt="" />
        <p className='hidden sm:block'>Orders</p>
      </NavLink>
      </div>
    </div>
  )
}

export default Sidebar
