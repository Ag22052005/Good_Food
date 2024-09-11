const mongoose = require("mongoose");
const Cart = require("../models/cart");
const { validationResult } = require("express-validator");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

const getId =  async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    // console.log(token);
    const decode = await jwt.verify(token, process.env.JWT_KEY);
    // console.log(decode);
    res.json({ decode });
  } catch (err) {
    console.log(err);
    res.json(err);
  }
}
const getUserInfo = async (req, res) => {
  try {
    const uid = req.user.userId;
    const userId = new mongoose.Types.ObjectId(uid);
    const user = await User.findOne({ _id: userId });
    // console.log(user)
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(504).json(error);
  }
};
const updateUser = async (req, res) => {
  try {
    const uid = req.user.userId;
    const userId = new ObjectId(uid);
    const payload = req.body.payload;
    // console.log(payload);
    const user = await User.findOneAndUpdate(
      { _id: userId },
      { $set: payload },
      {
        returnDocument: "after",
        runValidators: true,
      }
    );
    console.log("updated data", user);
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(504).json(error);
  }
};

const signUp = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors.array());
      res.status(504).json({ status: "err", errors: errors.array() });
      // console.log("hiiiiiiiiiiiiiiiiiiiiiii")
      return;
    }
    // console.log("hiiiiiiiiiiiiiiiiiiiiiii")
    const data = req.body;
    // console.log(data);
    // password hashing
    const SALT = await bcrypt.genSalt(10);
    const hashedpassword = await bcrypt.hash(data.password, SALT);
    data.password = hashedpassword;
    // console.log(data);
    const user = new User(data);
    const response = await user.save();
    console.log("User is created");
    const newCart = new Cart({ userId: user.id, items: [] });
    const cartresponse = await newCart.save();
    console.log("Cart is created");
    const myOrders = new Transaction({ userId: user.id, transactionList: [] });
    const orederResponse = await myOrders.save();
    console.log("My orders in created");
    res.status(200).json({ status: "success", response });
  } catch (e) {
    console.log(e);
    if (e.errorResponse && e.errorResponse.code === 11000) {
      res.status(504).json({ status: "user exists", error: e });
    } else {
      res.status(500).json({ status: "internal error", error: e });
    }
  }
};

const login = async (req, res) => {
  try {
    const user = req.body;
    const isUser = await User.findOne({ email: user.email });

    if (!isUser) {
      throw new Error("User Not Found");
    }
    const cmpPassword = await bcrypt.compare(user.password, isUser.password);
    if (!cmpPassword) {
      throw new Error("Password is Incorrect");
    }
    const payload = {
      userId: isUser.id,
    };
    const authToken = jwt.sign(payload, process.env.JWT_KEY);
    // console.log(authToken);
    res.status(200).json({ user: isUser, authToken: authToken });
  } catch (error) {
    if (error.message === "User Not Found")
      res.status(404).json({ errmsg: error.message });
    else if (error.message === "Password is Incorrect")
      res.status(401).json({ errmsg: error.message });
    else {
      res.status(500).json({ errmsg: error.message });
    }
  }
};


module.exports = { getUserInfo, updateUser, signUp, login,getId };
