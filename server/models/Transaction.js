const mongoose = require('mongoose')

const transactionSchema = new mongoose.Schema({
  userId:{
    type:mongoose.Types.ObjectId,
    required:true
  },
  transactionList:[{
    status:{
      type:String,
      enum:["Delivering","Delivered"],
      default:"Delivering"
    },
    date:{
      type:String,
      default:new Date().toLocaleDateString()
    },
    time:{
      type:String,
      default:new Date().toLocaleTimeString()
    },
    price:{
      type:Number
    },
    itemsName:{
      type:[String]
    },
    paymentDetails:{
      type:{}
    }
  }]
})

const Transaction = mongoose.model('transactions',transactionSchema)
module.exports = Transaction