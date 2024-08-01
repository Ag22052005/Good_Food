const express = require('express')
const app = express()
const db = require('./db')
const cors = require('cors')
require('dotenv').config();


const PORT = process.env.PORT || 3000
// const bodyParser = require('body-parser')
// app.use(bodyParser)
app.use(express.json())
app.use(cors())
const userRoutes = require('./routes/userRoutes')
const foodDisplay = require('./routes/foodDisplay')
const paymentRoutes = require('./routes/paymentroutes')
app.use('/',userRoutes)
app.use('/',foodDisplay)
app.use('/',paymentRoutes)


app.listen(PORT,()=>{
  console.log('port is listening on ',PORT)
})