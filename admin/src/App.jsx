import React from 'react'
import Sidebar from './components/Sidebar'
import Navbar from './components/Navbar'
import {Routes,Route} from 'react-router-dom'
import Add from './pages/Add'
import List from './pages/List'
import Orders from './pages/Orders'
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

const App = () => {

  const url = "https://food-delivery-backend-39xx.onrender.com";

  return (
    <div>
      <ToastContainer/>
      <Navbar />
      <hr/>
      <div className='flex '>
        <Sidebar />
        <Routes>
          <Route path="/add" element={<Add url={url}/>}/>
          <Route path="/list" element={<List url={url}/>}/>
          <Route path="/orders" element={<Orders url={url}/>}/>

        </Routes>
      </div>
    </div>
  )
}

export default App
