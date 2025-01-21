import React, { useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import axios from 'axios'
import { toast } from 'react-toastify';
import Spinner from '../components/Spinner';

const Add = ({url}) => {
    
    const [image, setImage] = useState(false);
    const [loading, setLoading] = useState(false);

    const [data, setData] = useState({
        name: "",
        description: "",
        price: "",
        category: "Salad"
    });

    const onChangeHandler = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setData(data => ({ ...data, [name]: value }));
    };

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        setLoading(true);
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("description", data.description);
        formData.append("price", Number(data.price));
        formData.append("category", data.category);
        formData.append("image", image);

        try {
            const response = await axios.post(`${url}/api/food/add`, formData);
            if (response.data.success) {
                setData({
                    name: "",
                    description: "",
                    price: "",
                    category: "Salad"
                });
                setImage(false);
                toast.success(response.data.message);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error("An error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        
        <div  className='md:ml-16 sm:ml-12 ml-8 mt-8 w-[45%]'>
            <form onSubmit={onSubmitHandler} className='flex flex-col justify-start gap-[1.3rem]'>
                <div className="add-img-upload flex flex-col gap-[0.4rem]">
                    <p className='text-[#8b8a8a]'>Upload Images</p>
                    <label htmlFor='image'>
                        <img className='w-[120px] h-[70px]' src={image ? URL.createObjectURL(image) : assets.upload_area} alt="" />
                    </label>
                    <input onChange={(e) => setImage(e.target.files[0])} className='rounded-[3px] px-2 py-1 border-[2px] border-solid border-[#a9a9a9] focus:outline-none' type="file" id='image' hidden required />
                </div>
                <div className="add-product-name flex flex-col gap-[0.4rem]">
                    <p className='text-[#8b8a8a]'>Product name</p>
                    <input onChange={onChangeHandler} value={data.name} className='rounded-[3px] px-2 py-1 text-[#3a3939] border-[2px] border-solid border-[#a9a9a9] focus:outline-none' type="text" name='name' placeholder='Type here' />
                </div>
                <div className='add-product-description flex flex-col gap-[0.4rem]'>
                    <p className='text-[#8b8a8a]'>Product description</p>
                    <textarea onChange={onChangeHandler} value={data.description} className='h-[100px] rounded-[3px] px-2 py-1 text-[#3a3939] border-[2px] border-solid border-[#a9a9a9] focus:outline-none' name='description' rows="6" placeholder='write content here' required></textarea>
                </div>
                <div className="add-category-price flex md:flex-row flex-col gap-4">
                    <div className="add-category flex flex-col gap-[0.4rem]">
                        <p className='text-[#8b8a8a]'>Product category</p>
                        <select onChange={onChangeHandler} value={data.category} className='rounded-[3px] px-3 py-1 h-[35.6px] text-[#3a3939] bg-[white] border-[2px] border-solid border-[#a9a9a9] focus:outline-none' name="category" id="category">
                            <option value="Salad">Salad</option>
                            <option value="Rolls">Rolls</option>
                            <option value="Deserts">Deserts</option>
                            <option value="Sandwich">Sandwich</option>
                            <option value="Cake">Cake</option>
                            <option value="Pure Veg">Pure Veg</option>
                            <option value="Pasta">Pasta</option>
                            <option value="Noodles">Noodles</option>
                        </select>
                    </div>
                    <div className="add-price flex flex-col gap-[0.4rem]">
                        <p className='text-[#8b8a8a]'>Product Price</p>
                        <input onChange={onChangeHandler} value={data.price} className='rounded-[3px] px-2 py-1 text-[#3a3939] border-[2px] border-solid border-[#a9a9a9] focus:outline-none' type="number" name='price' placeholder='$20' />
                    </div>
                </div>
                <button type='submit' className='bg-[#ff4d00] text-white rounded-sm w-[80px] text-center px-3 py-[5px] text-[14px]'>ADD</button>
            </form>
            {loading && <Spinner />}
        </div>
    );
};

export default Add;
