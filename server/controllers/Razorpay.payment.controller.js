const express = require("express");
const Razorpay = require("razorpay");
const crypto = require("crypto");
const { default: mongoose } = require("mongoose");
const { ObjectId } = mongoose.Types;
require("dotenv").config();
const Transaction = require('../models/Transaction')
const Cart = require('../models/cart');
const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET,
});
const order = (req, res) => {
  const { amount } = req.body;
  console.log(amount);

  try {
    const options = {
      amount: Number(amount * 100),
      currency: "INR",
      receipt: crypto.randomBytes(10).toString("hex"),
    };

    razorpayInstance.orders.create(options, (error, order) => {
      if (error) {
        console.log(error);
        return res.status(500).json({ message: "Something Went Wrong!" });
      }
      res.status(200).json({ data: order });
      console.log(order);
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error!" });
    console.log(error);
  }
}

const verify = async (req, res) => {
  console.log("Entered for verify")

  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;
  const uid = req.body.userId;
  const userId = new ObjectId(uid);

  // console.log("req.body", req.body);

  try {
    // Create Sign
    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    // Create ExpectedSign
    const expectedSign = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(sign.toString())
      .digest("hex");

    // Create isAuthentic
    const isAuthentic = expectedSign === razorpay_signature;

    // Condition
    if (isAuthentic) {
      const paymentDetails = {
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
      };

      const transactionDetails = req.body;
      const userId = new ObjectId(transactionDetails.userId);
      const myTransaction = await Transaction.findOne({ userId });
      console.log(myTransaction)
      myTransaction.transactionList.push({
        price: transactionDetails.price,
        itemsName: transactionDetails.itemsName,
        paymentDetails
      });
      const response = await myTransaction.save();
      console.log("res: ",response)

      res.status(200).json({ msg: "Order Placed" });

      setTimeout(async () => {
        let len = response.transactionList.length;
        response.transactionList[len - 1].status = "Delivered";
        const newR = await response.save();
        console.log("Finally After 1 min");
        // console.log(newR)
      }, 60000);
      console.log("Removing the cart element")
      const mycart = await Cart.findOne({ userId });
      mycart.items = [];
      const cartres = await mycart.save(s);
      console.log("cart item removed")
      return;
    }
    return res.status(504).json({e:'not verified'})
  } 
  
  catch (error) {
    // res.status(504).json({ message: "Internal Server Error!" });
    console.log(error);
  }
}

module.exports = {order,verify};
