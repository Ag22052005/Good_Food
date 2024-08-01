const express = require('express')
const router = express.Router()
const db = require('./../db')
const jwt = require('jsonwebtoken')
require('dotenv').config()


router.get('/foodDisplay', async (req,res)=>{
  try {
    const coll = await db.db.collection('food_items').find({}).toArray()
    // console.log(coll)
    res.status(200).json({foodItems:coll})
  } catch (error) {
    console.log(error)
    res.status(504).json(error)
  }
})

router.get('/foodDisplay/category', async (req,res)=>{
  try {
    const coll = await db.db.collection('foodCategory').find({}).toArray()
    // console.log(coll)
    res.status(200).json({foodCategory:coll})
  } catch (error) {
    console.log(error)
    res.status(504).json(error)
  }
})


router.get('/getId',async (req,res)=>{
  try{
    const token = req.headers.authorization.split(' ')[1]
    console.log(token)
    const decode = await jwt.verify(token,process.env.JWT_KEY)
    console.log(decode)
    res.json({decode})

  }catch(err){
    console.log(err)
    res.json(err)
  }
})



module.exports = router