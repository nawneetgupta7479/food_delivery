import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";

const List = ({ url }) => {
  const [list, setList] = useState([]); // Initialize to an empty array
  const [loading, setLoading] = useState(false);

  const fetchList = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${url}/api/food/list`);
      setList(response.data.data || []); // Fallback to an empty array if no data
      toast.success(response.data.message);
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const removeFood = async (foodId) => {
    setLoading(true);
    try {
      await axios.post(`${url}/api/food/remove`, { id: foodId });
      await fetchList();
      toast.success("Item Removed Successfully");
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="md:ml-16 sm:ml-12 ml-8 mt-8 w-[60%]">
      <p className="font-sans font-semibold mb-3 text-[1.2rem] text-[#696767]">
        All Foods List
      </p>
      <div className="list-table">
        <div className="list-table-format title bg-[#f9f9f9]">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list && list.length > 0 ? ( // Check if list exists and has items
          list.map((item) => (
            <div key={item._id} className="list-table-format">
              <img
                src={`${url}/images/${item.image}`}
                alt={item.name}
                className="w-[50px] h-[40px]"
              />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>{item.price}</p>
              <button
                onClick={() => removeFood(item._id)}
                className="bg-red-500 text-white text-[9px] sm:text-[10px] py-[2px] rounded max-w-[3rem]"
              >
                Delete
              </button>
            </div>
          ))
        ) : (
          <p>No items available</p> // Render a fallback message when the list is empty
        )}
      </div>
      {loading && <Spinner />}
    </div>
  );
};

export default List;
