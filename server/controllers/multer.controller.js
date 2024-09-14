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

// const { v2: cloudinary } = require("cloudinary");
// const User = require("../models/user");

// const ProfileImageUpload = async (req, res, next) => {
//   try {
//     const userId = req.user.userId;

//     // Stream the file directly to Cloudinary
//     const uploadResult = await new Promise((resolve, reject) => {
//       const uploadStream = cloudinary.uploader.upload_stream(
//         { resource_type: "image" },
//         (error, result) => {
//           if (error) {
//             return reject(error);
//           }
//           resolve(result);
//         }
//       );

//       // Pipe the file stream directly into Cloudinary's upload stream
//       req.file.stream.pipe(uploadStream);
//     });

//     console.log('Upload result:', uploadResult);

//     // Update user's profile image in the database
//     const user = await User.findOneAndUpdate(
//       { _id: userId },
//       { profileImg: uploadResult.secure_url },
//       { new: true, runValidators: true }
//     );

//     console.log("Updated user:", user);
//     res.status(200).json(user);
//   } catch (error) {
//     console.error('Error during profile image upload:', error);
//     res.status(500).json({ message: "Internal server error", error });
//   }
// };

// module.exports = { ProfileImageUpload };



