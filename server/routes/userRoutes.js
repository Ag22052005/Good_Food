const express = require("express");
const router = express.Router();
const User = require("./../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
const { default: mongoose, Error } = require("mongoose");
const Cart = require("../models/cart");
const Transaction = require("../models/Transaction");
const { ObjectId } = mongoose.Types;
const {jwtmiddleware} = require('./../jwt')

router.get('/getCartPrice',jwtmiddleware,async(req,res)=>{
  try {
    const uid = req.user.userId;
    const userId = new ObjectId(uid)
    const mycart = await mongoose.connection.collection('carts').findOne({userId})
    res.status(200).json(mycart)
    
  } catch (error) {
    console.log(error)
    res.status(504).json(error)
  }
})

router.get('/getUserInfo',jwtmiddleware,async (req,res)=>{
  try {
    const uid = req.user.userId;
    const userId = new ObjectId(uid)
    const user = await mongoose.connection.collection('users').findOne({_id:userId})
    // console.log(user)
    res.status(200).json(user)
  } catch (error) {
    console.log(error)
    res.status(504).json(error)
  }
})


router.post('/updateUser',jwtmiddleware,async(req,res)=>{
  try {
    const uid = req.user.userId;
    const userId = new ObjectId(uid)
    const payload = req.body.payload
    console.log(payload)
    const user = await mongoose.connection.collection('users').findOneAndUpdate({_id:userId}, {$set:payload},{
      returnDocument: 'after',
      runValidators: true,
    })
    console.log('updated data',user)
    res.status(200).json(user)
  } catch (error) {
    console.log(error)
    res.status(504).json(error)
  }
})



router.get('/transaction',jwtmiddleware,async(req,res)=>{
  try {
    const uid = req.user.userId
    // console.log(user.userId)
    const userId = new ObjectId(uid)
    const myTransaction = await Transaction.findOne({userId})
    res.status(200).json(myTransaction)


  } catch (error) {
    console.log(error)
    res.status(504).json(error)
  }
})

router.post('/payment',jwtmiddleware,async (req,res)=>{
  try {
    // console.log('i am in /payment')
    const transactionDetails = req.body
    const userId = new ObjectId(req.user.userId)
    const myTransaction = await Transaction.findOne({userId})
    // console.log(myTransaction)
    myTransaction.transactionList.push({
      price:transactionDetails.price,
      itemsName:transactionDetails.itemsName
    });
    const response = await myTransaction.save()
    console.log("res: ",response)

    res.status(200).json({'msg':'Order Placed'})

    setTimeout(async()=>{
      let len = response.transactionList.length
      response.transactionList[len-1].status = 'Delivered'
      const newR = await response.save()
      console.log("Finally After 10sec")
      // console.log(newR)
    },10000)
    const mycart = await Cart.findOne({userId})
    mycart.items=[]
    const cartres = await mycart.save();
    console.log('Cart Empty !!')

  } catch (error) {
    console.log(error)
    res.status(504).json(error)
  }
})



router.post("/addCart", jwtmiddleware,async (req, res) => {
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
});


router.get("/mycart",jwtmiddleware, async (req, res) => {
  try {
    const userId = req.user.userId;
    const myCart = await Cart.findOne({ userId: userId });
    res.status(200).json(myCart);
  } catch (err) {
    console.log(err);
    res.status(504).json({ err });
  }
});

router.post(
  "/signup",
  [
    body("name", "Name must be of 3 to 40 character").isLength({ min: 3 }),
    body("email", "Invalid Email").isEmail(),
    body("password", "Password atleast contains 8 characters").isLength({
      min: 8,
    }),
  ],

  async (req, res) => {
    try {
    const errors = validationResult(req);
      if (!errors.isEmpty()) {
        console.log(errors.array());
        res.status(504).json({status:"err",errors:errors.array()})
        // console.log("hiiiiiiiiiiiiiiiiiiiiiii")
        return;
      }
      // console.log("hiiiiiiiiiiiiiiiiiiiiiii")
      const data = req.body;
      console.log(data)
      // password hashing
      const SALT = await bcrypt.genSalt(10);
      const hashedpassword = await bcrypt.hash(data.password, SALT);
      data.password = hashedpassword;
      console.log(data);
      const user = new User(data);
      const response = await user.save();
      console.log("User is created");
      const newCart = new Cart({ userId: user.id, items: [] });
      const cartresponse = await newCart.save();
      console.log("Cart is created");
      const myOrders = new Transaction({userId:user.id,transactionList:[]})
      const orederResponse = await myOrders.save()
      console.log('My orders in created')
      res.status(200).json({status:"success",response});
    } catch (e) {
      console.log(e)
      if(e.errorResponse && e.errorResponse.code === 11000){
        res.status(504).json({status:"user exists", error:e});
      }else{
        res.status(500).json({status:"internal error", error:e});
      }
    }
  }
);


router.post("/login", async (req, res) => {
  try {
    const user = req.body;
    const isUser = await User.findOne({ email: user.email });
    if (!isUser) {
      throw new Error("User Not Found")
    }
    const cmpPassword = await bcrypt.compare(user.password, isUser.password);
    if (!cmpPassword) {
      throw new Error("Password is Incorrect" );
    }
    const payload = {
      userId: isUser.id,
    };
    const authToken = jwt.sign(payload, process.env.JWT_KEY);
  
    res.status(200).json({ user: isUser, authToken: authToken });
    
  } catch (error) {
    if(error.message === "User Not Found")
      res.status(404).json({errmsg:error.message})
    else if(error.message === "Password is Incorrect")
      res.status(401).json({errmsg:error.message})
    else{
      res.status(500).json({errmsg:error.message})
    }
  }
});


router.put("/updatemycart",jwtmiddleware, async (req, res) => {
  try {
    const userId = req.user.userId
    const { action,foodId, qty } = req.body;
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
});

module.exports = router;
