import mongoose from 'mongoose';
import logger from './logger.js';

const connectDB = async () => {
  try {
    const dbUri = process.env.NODE_ENV === 'production'
      ? process.env.MONGODB_URI_ATLAS
      : process.env.MONGODB_URI_LOCAL;

    const conn = await mongoose.connect(dbUri);
    logger.info(`MongoDB Connected successfully😍 (${process.env.NODE_ENV}): ${conn.connection.host}`);
  } catch (error) {
    logger.error(`❌ MongoDB Connection Error: ${error.message}`);
    if (error.name === 'MongoParseError') logger.error('Check if your connection string is formatted correctly.');
    if (error.name === 'MongoServerSelectionError') logger.error('Check your IP whitelisting in Atlas (0.0.0.0/0 recommended).');
    if (process.env.NODE_ENV !== 'production') {
      process.exit(1);
    }
  }
};

export default connectDB;
