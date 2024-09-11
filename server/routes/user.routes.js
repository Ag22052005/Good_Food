const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const jwt = require("jsonwebtoken");
const { jwtmiddleware } = require("../jwt");
const { getUserInfo, updateUser, login, signUp, getId } = require("../controllers/user.controller");

router.get("/getUserInfo", jwtmiddleware, getUserInfo);
router.post("/updateUser", jwtmiddleware,updateUser);
router.post("/signup", [
  body("name", "Name must be of 3 to 40 character").isLength({ min: 3 }),
  body("email", "Invalid Email").isEmail(),
  body("password", "Password atleast contains 8 characters").isLength({
    min: 8,
  }),
],signUp);
router.post("/login",login);
router.get("/getId",getId);


module.exports = router;
