const express = require("express");
const router = express.Router();
const db = require("../db");
const { foodDisplay, foodCategory } = require("../controllers/food-controller");


router.get("/foodDisplay", foodDisplay);
router.get("/foodDisplay/category", foodCategory);


module.exports = router;
