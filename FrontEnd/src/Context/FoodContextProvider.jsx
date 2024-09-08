import React, { useEffect, useState } from "react";
import { FoodContext,FoodCategoryContext } from "./foodContext";
import axios from "axios";

export function FoodContextProvider({ children }) {
  const [foodItems, setFoodItems] = useState([]);
  const getFood = async () => {
    axios
      .get(`${import.meta.env.VITE_HOST_URL}/foodDisplay`)
      .then((res) => {
        setFoodItems(res.data.foodItems);
      })
      .catch((err) => console.log(err));
  };
  useEffect(()=>{
    getFood()
  },[])

  return (
    <FoodContext.Provider
      value={{
        foodItems:foodItems,
        setFoodItems,
      }}
    >
      {children}
    </FoodContext.Provider>
  );
}

export function FoodCategoryProvider({children}){
  const[foodCategory,setFoodCategory] = useState([])
  const getFoodCategory =async()=>{
    axios
      .get(`${import.meta.env.VITE_HOST_URL}/foodDisplay/category`)
      .then((res) => {
        setFoodCategory(res.data.foodCategory);
      })
      .catch((err) => console.log(err));
  }
  useEffect(()=>{
    getFoodCategory();
  },[])
  return(
    <FoodCategoryContext.Provider  value={{foodCategory}}>
      {children}
    </FoodCategoryContext.Provider>
  )
}