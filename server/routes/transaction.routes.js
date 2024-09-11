const express = require("express");
const router = express.Router();
const { jwtmiddleware } = require("./../jwt");
const { transaction, payment } = require("../controllers/transaction.controller");

router.get("/transaction", jwtmiddleware,transaction);
router.post("/payment", jwtmiddleware,payment);

module.exports = router;
