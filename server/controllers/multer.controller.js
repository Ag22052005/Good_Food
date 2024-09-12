const { v2: cloudinary } = require("cloudinary");
const fs = require("fs");
const User = require("../models/user");

const ProfileImageUpload = async (req, res, next) => {
  try {
    const userId = req.user.userId;

    // Upload file to Cloudinary
    const uploadResult = await cloudinary.uploader.upload(req.file.path);
    
    // Ensure the upload was successful
    if (!uploadResult) {
      return res.status(500).json({ message: 'Upload to Cloudinary failed' });
    }
    
    console.log('Upload result:', uploadResult);

    // Only delete the file after successful upload
    await fs.promises.unlink(req.file.path);
    console.log("File deleted successfully from the local filesystem");

    // Update user's profile image in the database
    const user = await User.findOneAndUpdate(
      { _id: userId },
      { profileImg: uploadResult.secure_url },
      { new: true, runValidators: true }
    );
    
    console.log("Updated user:", user);
    res.status(200).json(user);
  } catch (error) {
    console.error('Error during profile image upload:', error);
    res.status(500).json({ message: "Internal server error", error });
  }
};

module.exports = { ProfileImageUpload };
