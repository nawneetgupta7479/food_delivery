import React from 'react'
import './AppDownload.css'
import { assets } from '../../assets/assets'


const AppDownload = () => {
  return (
    <div className="app-download flex flex-col gap-8  justify-center items-center  font-bold my-10 py-5" id='app-download'>
    <h1 className='text-lg px-5 sm:text-2xl md:text-3xl text-slate-900 text-center max-w-[450px]'>For Better Experience, Download the Foodflick App Now</h1>
    <div className='flex justify-center items-center gap-3'>
      <img className='w-[100px] h-[30px] sm:w-[130px] sm:h-[40px] md:w-[170px] md:h-[50px] duration-300 hover:scale-105 cursor-pointer ' src={assets.play_store} alt="" />
      <img className='w-[100px] h-[30px] sm:w-[130px] sm:h-[40px] md:w-[170px] md:h-[50px] duration-300 hover:scale-105 cursor-pointer ' src={assets.app_store} alt="" />
    </div>
  </div>
  )
}

export default AppDownload
