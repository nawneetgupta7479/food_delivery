import React from "react";
import Navbar from "./components/navbar/Navbar";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder";
import Footer from "./components/Footer/Footer";
import { useState } from "react";
import Login from "./components/Login/Login";
import VerifyPayment from "./pages/VerifyPayment";
import MyOrders from "./pages/MyOrders";
import { ToastContainer } from "react-toastify"; // Import ToastContainer
import "react-toastify/dist/ReactToastify.css"; // Import Toastify styles

const App = () => {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <>
      <ToastContainer /> {/* Add ToastContainer here */}
      {showLogin ? <Login setShowLogin={setShowLogin} /> : null}
      <div className="app">
        <Navbar setShowLogin={setShowLogin} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<PlaceOrder />} />
          <Route path="/verify" element={<VerifyPayment />} />
          <Route path="/myorders" element={<MyOrders />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default App;
