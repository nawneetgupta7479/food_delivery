import React, { useContext } from 'react'
import "./FoodDisplay.css"
import { StoreContext } from '../../Context/StoreContext'
import FoodItem from '../FoodItem/FoodItem'

const FoodDisplay = ({category,setCategory}) => {

    const {food_list} = useContext(StoreContext)
  return (
    <div className='food-display  mt-14' id='food-display'>
      <h2 className='sm:text-3xl text-2xl  font-bold text-slate-900 mb-8'>Top dishes near you</h2>
      <div className='food-display-list'>
        {food_list.map((item,index)=>{
            if(category === "All"){
                return <FoodItem key={index} id={item._id} name={item.name} description = {item.description} image={item.image} price={item.price} />
            }
            else if(category === item.category){
                return <FoodItem key={index} id={item._id} name={item.name} description = {item.description} image={item.image} price={item.price} />
            }
            else{
                return null;
            }
           
        })}
      </div>
    </div>
  )
}

export default FoodDisplay
