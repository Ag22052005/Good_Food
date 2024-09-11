const { v2: cloudinary } = require("cloudinary");
const fs = require("fs");
const User = require("../models/user");

const ProfileImageUpload = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const uploadResult = await cloudinary.uploader
      .upload(req.file.path)
      .catch((error) => {
        console.log(error);
      });
    console.log(uploadResult);
    fs.unlink(req.file.path, (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Deleted Successfully");
      }
    });
    const user = await User.findOneAndUpdate(
      { _id: userId },
      { profileImg: uploadResult.secure_url },
      { new: true, runValidators: true }
    );
    console.log("user :", user);
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.json(error);
  }
};

module.exports = { ProfileImageUpload };
