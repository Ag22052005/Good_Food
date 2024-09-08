import React from 'react'
import { useContext,createContext,useEffect,useState } from 'react'
import axios from "axios";

export const FoodContext = createContext({
  foodItems:[],
  setFoodItems:()=>{},
})
export const FoodCategoryContext = createContext({
  foodCategory:[]
})

