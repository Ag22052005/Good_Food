import React, { useEffect, useState,useContext } from "react";
import {UserInfo} from "../../store/store.jsx";
import axios from "axios";

function CartItem({cartItem}) {

  const {USER_ID} = useContext(UserInfo)
  const UpdateCart = (action)=>{
    if(action==='remove'){
      axios.put('https://good-food-rkxe.onrender.com/updatemycart',{action,userId:USER_ID,foodId:cartItem.foodId}).then(
        (res)=>console.log('updated')
      ).catch((err)=>console.log(err))
    }
    else{
      action === '+' ?cartItem.option.qty++:cartItem.option.qty--;
      // console.log(cartItem.option.qty)
      axios.put('https://good-food-rkxe.onrender.com/updatemycart',{action,userId:USER_ID,foodId:cartItem.foodId,qty:cartItem.option.qty}).then(
        (res)=>console.log('updated')
      ).catch((err)=>console.log(err))
    }
  }

  return (
    <li
      className="d-flex border justify-content-between"
      style={{ minHeight: "11rem", width: "90%" }}
    >
      <div className="w-75 m-0 px-4 pt-2">
        <h5 className="m-1">{cartItem.name}</h5>
        <p className="m-1 " style={{'overflow':'hidden'}}>{cartItem.description}</p>
        <p className="m-1">*****</p>
        <div className="d-flex align-items-center justify-content-between">
          <div
            className="mt-2 border d-flex justify-content-center align-items-center"
            style={{ width: "25%" }}
          >
            <button className="btn fw-bold" onClick = {()=>UpdateCart('-')} >-</button>
            <button className="btn">{cartItem.option.qty}</button>
            <button className="btn" onClick = {()=>UpdateCart('+')} >+</button>
          </div>
          <div className="w-75 d-flex justify-content-around">
            <b > {cartItem.option.size.toUpperCase()}</b>
            <b>₹ {cartItem.option.qty * cartItem.option.price}/-</b>
          </div>
        </div>
      </div>
      <div
        className="m-0 d-flex justify-content-between align-items-center h-100 w-25 flex-wrap py-2"
        style={{'flexDirection':'column'}}
      >
        <img
        src={cartItem.img}  alt="This is an image" className="img-fluid"
          style={{ 'maxHeight': "6rem", 'borderRadius': "5px", 'objectFit':'contain' }}
        />
        <button className="bg-danger rounded border text-white mb-2" onClick = {()=>UpdateCart('remove')}>Remove</button>
      </div>
    </li>
  );
}

export default CartItem;
