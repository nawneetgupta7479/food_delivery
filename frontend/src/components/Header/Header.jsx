import React from 'react'
import "./Header.css"

const Header = () => {
  return (
    <div className='header    '> 
        <div className='header-contents flex justify-center items-start  gap-5 absolute lg:top-20 md:top-16 sm:top-10 top-2   flex-col  text-white'>
            <h2 className='lg:text-5xl md:text-4xl sm:text-3xl text-2xl   sm:max-w-[70%] max-w-[80%]   opacity-85'>Order your favourite food here</h2>
            <p className=' opacity-70 max-w-[70%] hidden lg:block '>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint, itaque facere. Unde et atque optio cumque fuga debitis velit quisquam quasi sapiente, dolorem sed delectus expedita possimus beatae, reiciendis quia.</p>
            <button className='view-menu-btn opacity-90 cursor-pointer lg:px-[1rem] lg:py-[0.3rem] lg:rounded-[20px] lg:text-[0.9rem] sm:px-[0.7rem]  sm:rounded-[15px] sm:text-[0.7rem] px-[0.5rem] py-[0.1rem] rounded-[20px] text-[0.5rem]  '>view menu</button>
        </div>
      
    </div>
  )
}

export default Header
