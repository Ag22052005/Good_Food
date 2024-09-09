const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.ObjectId,
    ref:"user",
    required: true,
    unique: true,
  },
  items: {
    type: [
      {
        foodId:{
          type:mongoose.Schema.ObjectId,
          required:true
        },
        CategoryName: {
          type: String,
        },
        description:{
          type:String
        },
        name: {
          type: String,
        },
        img: {
          type: String,
        },
        option: {
          size: {
            type: String,
          },
          qty: {
            type: Number
          },
          price:{
            type:Number
          }
        },
      },
    ],
  },
});

const Cart = mongoose.model('Cart',cartSchema);
module.exports = Cart