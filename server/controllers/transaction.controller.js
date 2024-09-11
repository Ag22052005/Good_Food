const { default: mongoose } = require("mongoose");
const Cart = require("../models/cart");
const Transaction = require("../models/Transaction");
const {ObjectId} = mongoose.Types;
const transaction = async (req, res) => {
  try {
    const uid = req.user.userId;
    // console.log(user.userId)
    const userId = new ObjectId(uid);
    const myTransaction = await Transaction.findOne({ userId });
    res.status(200).json(myTransaction);
  } catch (error) {
    console.log(error);
    res.status(504).json(error);
  }
};

const payment = async (req, res) => {
  try {
    // console.log('i am in /payment')
    const transactionDetails = req.body;
    const userId = new ObjectId(req.user.userId);
    const myTransaction = await Transaction.findOne({ userId });
    // console.log(myTransaction)
    myTransaction.transactionList.push({
      price: transactionDetails.price,
      itemsName: transactionDetails.itemsName,
    });
    const response = await myTransaction.save();
    console.log("res: ", response);

    res.status(200).json({ msg: "Order Placed" });

    setTimeout(async () => {
      let len = response.transactionList.length;
      response.transactionList[len - 1].status = "Delivered";
      const newR = await response.save();
      console.log("Finally After 10sec");
      // console.log(newR)
    }, 10000);
    const mycart = await Cart.findOne({ userId });
    mycart.items = [];
    const cartres = await mycart.save();
    console.log("Cart Empty !!");
  } catch (error) {
    console.log(error);
    res.status(504).json(error);
  }
};

module.exports = { payment, transaction };
