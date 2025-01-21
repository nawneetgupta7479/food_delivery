import { createContext, useEffect, useState } from "react";
import React from "react";
import axios from "axios";
import Spinner from "../components/Spinner/Spinner";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const url = "https://food-delivery-backend-39xx.onrender.com";
  const [token, setToken] = useState(null);
  const [food_list, setFoodList] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchFoodList = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${url}/api/food/list`);
      if (response.data && response.data.data) {
        setFoodList(response.data.data);
      } else {
        setFoodList([]); // Fallback if API response is invalid
        console.error("Invalid response data:", response);
      }
      setLoading(false);
    } catch (err) {
      console.log("Error fetching food list:", err);
      setFoodList([]); // Avoid undefined errors
      setLoading(false);
    }
  };

  const loadCartData = async (token) => {
    try {
      const response = await axios.post(url + "/api/cart/get", {}, { headers: { token } });
      setCartItems(response.data.cartData || {});
    } catch (err) {
      console.log("Error loading cart data:", err);
    }
  };

  const addToCart = async (itemId) => {
    try {
      const updatedCart = {
        ...cartItems,
        [itemId]: (cartItems[itemId] || 0) + 1, // Increment quantity
      };
      setCartItems(updatedCart);
      // Sync with server
      await axios.post(
        `${url}/api/cart/add`,
        { itemId, quantity: updatedCart[itemId] },
        { headers: { token } }
      );
    } catch (err) {
      console.error("Error adding to cart:", err);
    }
  };

  const removeFromCart = async (itemId) => {
    try {
      if (!cartItems[itemId]) return; // Do nothing if item doesn't exist in cart

      const updatedCart = { ...cartItems };
      if (updatedCart[itemId] > 1) {
        updatedCart[itemId] -= 1; // Decrease quantity
      } else {
        delete updatedCart[itemId]; // Remove item if quantity is 0
      }
      setCartItems(updatedCart);
      // Sync with server
      await axios.post(
        `${url}/api/cart/remove`,
        { itemId, quantity: updatedCart[itemId] || 0 },
        { headers: { token } }
      );
    } catch (err) {
      console.error("Error removing from cart:", err);
    }
  };

  useEffect(() => {
    async function loadData() {
      await fetchFoodList();
      if (localStorage.getItem("token")) {
        const token = localStorage.getItem("token");
        setToken(token);
        await loadCartData(token);
      }
    }
    loadData();
  }, []);

  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    totalCartAmount: () => {
      return Object.keys(cartItems).reduce(
        (total, itemId) => total + cartItems[itemId], 0
      );
    },
    distinctCartItemsCount: () => Object.keys(cartItems).length,
    url,
    token,
    setToken,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {loading ? <Spinner /> : props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
