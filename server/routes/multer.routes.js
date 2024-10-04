const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
const multer = require("multer");
const { v2: cloudinary } = require("cloudinary");

const { ProfileImageUpload } = require("../controllers/multer.controller");
const { jwtmiddleware } = require("../jwt");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, uuidv4() + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post("/profile",upload.single("myfile"),jwtmiddleware,ProfileImageUpload);

module.exports = router;
