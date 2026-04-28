import cloudinary from '../config/cloudinary.js';
import streamifier from 'streamifier';
import User from '../models/User.js';

// @desc    Upload profile picture
// @route   POST /api/upload/profile-picture
// @access  Private
export const uploadProfilePicture = async (req, res, next) => {
  try {
    if (!req.file) {
      res.status(400);
      throw new Error('Please upload an image file');
    }

    let streamUpload = (req) => {
      return new Promise((resolve, reject) => {
        let stream = cloudinary.uploader.upload_stream(
          { folder: 'finance-tracker/profiles' },
          (error, result) => {
            if (result) {
              resolve(result);
            } else {
              reject(error);
            }
          }
        );
        streamifier.createReadStream(req.file.buffer).pipe(stream);
      });
    };

    const result = await streamUpload(req);

    const user = await User.findById(req.user.id);
    user.profilePicture = result.secure_url;
    await user.save();

    res.json({
      success: true,
      message: 'Profile picture uploaded successfully',
      data: {
        profilePicture: result.secure_url,
      },
    });
  } catch (error) {
    next(error);
  }
};
