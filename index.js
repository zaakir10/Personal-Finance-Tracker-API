import dotenv from 'dotenv';
dotenv.config();
import app from './src/app.js';
import connectDB from './src/config/db.js';
import logger from './src/config/logger.js';

const PORT = process.env.PORT || 5000;

// Connect to database
connectDB();

const server = app.listen(PORT, () => {
  logger.info(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
  logger.info(`Swagger docs available at http://localhost:${PORT}/docs`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  logger.error(`Error: ${err.message}`);
  // Close server & exit process
  server.close(() => process.exit(1));
});
