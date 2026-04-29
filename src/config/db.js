import mongoose from 'mongoose';
import logger from './logger.js';

const connectDB = async () => {
  try {
    const dbUri = process.env.NODE_ENV === 'production'
      ? process.env.MONGODB_URI_ATLAS
      : process.env.MONGODB_URI_LOCAL;

    if (!dbUri) {
      throw new Error(`MongoDB URI is missing for ${process.env.NODE_ENV} mode`);
    }

    // In production (Vercel), disable buffering so we get immediate errors if not connected
    if (process.env.NODE_ENV === 'production') {
      mongoose.set('bufferCommands', false);
    }

    const conn = await mongoose.connect(dbUri, {
      dbName: 'finance_tracker', // Explicitly setting database name
    });
    
    logger.info(`MongoDB Connected successfully: ${conn.connection.host}`);
  } catch (error) {
    logger.error(`❌ MongoDB Connection Error: ${error.message}`);
    // Hint for Vercel users
    if (process.env.VERCEL) {
      logger.error('Tip: Ensure you have added MONGODB_URI_ATLAS to Vercel Environment Variables and whitelisted 0.0.0.0/0 in Atlas.');
    }
  }
};

export default connectDB;
