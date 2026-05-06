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

    // Using DataURI for more robust upload in various environments
    const fileBase64 = req.file.buffer.toString('base64');
    const fileUri = `data:${req.file.mimetype};base64,${fileBase64}`;
    
    const result = await cloudinary.uploader.upload(fileUri, {
      folder: 'finance-tracker/profiles',
    });

    await User.findByIdAndUpdate(req.user.id, { 
      profilePicture: result.secure_url 
    });

    res.json({
      success: true,
      message: 'Profile picture uploaded successfully',
      data: {
        profilePicture: result.secure_url,
      },
    });
  } catch (error) {
    console.error('Upload Error:', error);
    next(error);
  }
};
