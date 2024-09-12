import React, { useEffect, useState, useContext } from "react";

import axios from "axios";

function CartItem({ cartItem }) {
  const UpdateCart = (action) => {
    const token = localStorage.getItem("authToken");
    if (action === "remove") {
      axios
        .put(
          `${import.meta.env.VITE_HOST_URL}/updatemycart`,
          {
            action,
            foodId: cartItem.foodId,
          },
          {
            headers: {
              authorization: `bearer ${token}`,
            },
          }
        )
        .then((res) => console.log("updated"))
        .catch((err) => console.log(err));
    } else {
      action === "+" ? cartItem.option.qty++ : cartItem.option.qty--;
      // console.log(cartItem.option.qty)
      axios
        .put(
          `${import.meta.env.VITE_HOST_URL}/updatemycart`,
          {
            action,
            foodId: cartItem.foodId,
            qty: cartItem.option.qty,
            size:cartItem.option.size,
          },
          {
            headers: {
              authorization: `bearer ${token}`,
            },
          }
        )
        .then((res) => console.log("updated"))
        .catch((err) => console.log(err));
    }
  };

  return (
    <li
      className="d-flex border justify-content-between"
      style={{ minHeight: "11rem", width: "90%" }}
    >
      <div className="m-0 w-75 px-1 pt-2 Cart-item-box">
        <h5 className="m-1 cart-item-heading">{cartItem.name}</h5>
        <p className="m-1 cart-item-description" style={{ overflow: "hidden" }}>
          {cartItem.description}
        </p>
        <p className="m-1">*****</p>
        <div className="d-flex align-items-center justify-content-between Cart-item-price-box">
          <div
            className="mt-2 border d-flex justify-content-center align-items-center Cart-item-qty-box"
          >
            <button className="btn fw-bold Cart-qty-btn" onClick={() => UpdateCart("-")}>
              -
            </button>
            <button className="btn Cart-qty-btn">{cartItem.option.qty}</button>
            <button className="btn Cart-qty-btn" onClick={() => UpdateCart("+")}>
              +
            </button>
          </div>
          <div className="w-75 d-flex justify-content-around">
            <b> {cartItem.option.size.toUpperCase()}</b>
            <b>₹ {cartItem.option.qty * cartItem.option.price}/-</b>
          </div>
        </div>
      </div>
      <div
        className="m-0 d-flex justify-content-between align-items-center h-100 w-25 flex-wrap py-2 Cart-item-imgbtn-box"
        style={{ flexDirection: "column" }}
      >
        <img
          src={cartItem.img}
          alt="This is an image"
          className="img-fluid Cart-item-img"
          style={{
            maxHeight: "6rem",
            borderRadius: "5px",
            objectFit: "contain",
          }}
        />
        <button
          className="bg-danger rounded border text-white mb-2 Cart-item-btn"
          onClick={() => UpdateCart("remove")}
        >
          Remove
        </button>
      </div>
    </li>
  );
}

export default CartItem;
