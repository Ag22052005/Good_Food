import React from "react";
import CartItem from "./CartItem.jsx";
import { useState, useEffect } from "react";
import axios from "axios";
import {useNavigate } from "react-router-dom";


function CartList() {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate()
  let userId = null
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    axios
      .post("http://localhost:3000/getId", { token })
      .then((res) => {
        userId = res.data.decode.userId;
        // console.log("userid ", userId);
        axios
          .post("http://localhost:3000/mycart", {
            userId: userId,
          })
          .then((res) => {
            setCartItems(res.data.items);
            // console.log(res.data.items);
          })
          .catch((err) => {
            console.log(err);
            alert(err);
          });
      })
      .catch((err) => {
        console.log(err);
        alert(err);
      });
  }, [cartItems]);


  return (
    <div>
      {cartItems.length === 0 ? (
        <center>NO items</center>
      ) : (
        <>
          <div className="container border w-50 border-top-0">
            <ul className="cartItems w-100 m-4 p-0">
              {cartItems.map((cartItem) => (
                <CartItem cartItem={cartItem} key={cartItem._id}></CartItem>
              ))}
            </ul>
          </div>
          <div
            className="container border w-50 d-flex align-items-center bg-white flex-row-reverse p-0"
            style={{ position: "sticky", bottom: "0px", height: "4rem" }}
          >
            <button
              className="border bg-primary h-100 text-white"
              style={{ float: "right" }}
              onClick={()=> navigate('/checkout')}
            >
              Place Order {">"}
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default CartList;
