const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  name:{
    type:String,
    required:true
  },
  email:{
    type:String,
    required:true,
    unique:true
  },
  password:{
    type:String,
    required:true
  },
  location:{
    type:String,
    required:true
  },
  date:{
    type:Date,
    default:Date.now
  },
  mobile:{
    type:String,
    unique:true,
    validate: {
      validator: function(value) {
        console.log("Checking " , value)
        return /^\d{10}$/.test(value)
      },
      message: 'Please enter a valid 10-digit mobile number'
    }
  }
})


const User = mongoose.model('users',userSchema)
module.exports = User