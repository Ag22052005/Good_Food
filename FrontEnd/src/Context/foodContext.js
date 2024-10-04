import {createContext} from 'react'

export const FoodContext = createContext({
  foodItems:[],
  setFoodItems:()=>{},
})
export const FoodCategoryContext = createContext({
  foodCategory:[]
})

