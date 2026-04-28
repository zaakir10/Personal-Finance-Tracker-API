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
    logger.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
