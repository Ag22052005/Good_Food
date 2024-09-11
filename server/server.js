const express = require('express')
const app = express()
const db = require('./db')
const cors = require('cors')
require('dotenv').config();
const userRoutes = require('./routes/user.routes')
const foodRoutes = require('./routes/food.routes')
const paymentRoutes = require('./routes/Razorpay.payment.routes')
const multerRoutes= require('./routes/multer.routes')
const transactionRoutes = require('./routes/transaction.routes')
const cartRoutes = require('./routes/cart.routes')

const PORT = process.env.PORT || 3000
// const bodyParser = require('body-parser')
// app.use(bodyParser)
app.use(express.json())
app.use(cors())
app.use('/',userRoutes)
app.use('/',foodRoutes)
app.use('/',paymentRoutes)
app.use('/',multerRoutes)
app.use('/',transactionRoutes)
app.use('/',cartRoutes)


app.listen(PORT,()=>{
  console.log('port is listening on ',PORT)
})