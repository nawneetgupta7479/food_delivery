import React from 'react'
import "./ExploreMenu.css"
import { menu_list } from '../../assets/assets'

const ExploreMenu = ({category, setCategory}) => {
  return (
    <div className='explore-menu flex flex-col gap-4' id='explore-menu'>
      <h1 className='text-2xl font-bold text-slate-900 '>Explore Our Menu</h1>
      <p className='text-slate-800 sm:max-w-[80%] md:max-w-[50%]'>Choose from our wide range of menu items. Our mission is to provide you a heathy and good foods.  </p>
      <div className='explore-menu-list   flex gap-10'>
        {menu_list.map((item, index) => (
            <div onClick={()=>setCategory(prev=>prev===item.menu_name?"All":item.menu_name)} key={index} className='menu-item cursor-pointer flex flex-col gap-2 justify-center '>
              <img className={category===item.menu_name?"active":""} src={item.menu_image} alt="" />
              <h3 className='text-slate-900  text-lg'>{item.menu_name}</h3>
            </div>
            ))
        }
      </div>
        <hr/> 
    </div>
  )
}

export default ExploreMenu
