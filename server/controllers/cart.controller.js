const mongoose = require('mongoose');
const Cart = require('../models/cart');
const { ObjectId } = mongoose.Types;
const addCart = async (req, res) => {
  try {
    const userId = req.user.userId;
    const food = req.body.food;
    let isthere = await Cart.findOne({ userId:userId });
    const foodIdObject = new ObjectId(food.foodId);
    const foodDetails = await mongoose.connection.db
      .collection("food_items")
      .findOne({ _id: foodIdObject });
    let f = false;
    isthere.items.forEach((item) => {
      if (item.foodId == food.foodId && item.option.size === food.option.size) {
        item.option.qty += food.option.qty;
        f = true;
      }
    });

    if (!f) {
      isthere.items.push({
        foodId: food.foodId,
        CategoryName: foodDetails.CategoryName,
        name: foodDetails.name,
        img: foodDetails.img,
        description: foodDetails.description,
        option: {
          qty: food.option.qty,
          size: food.option.size,
          price: food.option.price,
        },
      });
    }

    const a = await isthere.save();
    res.status(200).json({ a });
  } catch (err) {
    console.log(err);
    res.status(504).json({ err });
  }
}

const getCartPrice = async(req,res)=>{
  try {
    const uid = req.user.userId;
    const userId = new ObjectId(uid)
    const mycart = await Cart.findOne({userId})
    res.status(200).json(mycart)
    
  } catch (error) {
    console.log(error)
    res.status(504).json(error)
  }
};
const mycart =  async (req, res) => {
  try {
    const userId = req.user.userId;
    const myCart = await Cart.findOne({ userId: userId });
    res.status(200).json(myCart);
  } catch (err) {
    console.log(err);
    res.status(504).json({ err });
  }
}

const updatemycart = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { action, foodId, qty } = req.body;
    let MYCART = await Cart.findOne({ userId });
    if (action === "remove") {
      MYCART.items = MYCART.items.filter((x) => {
        return x.foodId != foodId;
      });
    } else {
      MYCART.items.forEach((element) => {
        if (element.foodId == foodId) {
          element.option.qty = qty;
        }
      });
    }
    console.log(MYCART);
    const response = await MYCART.save();
    res.status(200).json({ response });
  } catch (error) {
    console.log(error);
    res.status(504).json({ error });
  }
};
module.exports = {getCartPrice,addCart,updatemycart,mycart}