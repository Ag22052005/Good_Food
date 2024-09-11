const express = require("express");
const router = express.Router();
const { jwtmiddleware } = require("./../jwt");
const { getCartPrice, addCart, mycart, updatemycart } = require("../controllers/cart.controller");


router.get("/getCartPrice", jwtmiddleware, getCartPrice);
router.post("/addCart", jwtmiddleware,addCart);
router.get("/mycart", jwtmiddleware,mycart);
router.put("/updatemycart", jwtmiddleware,updatemycart);

module.exports = router;
