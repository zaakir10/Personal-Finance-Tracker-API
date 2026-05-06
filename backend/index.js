import dotenv from 'dotenv';
dotenv.config();
import path from 'path';
import { fileURLToPath } from 'url';
import app from './src/app.js';
import connectDB from './src/config/db.js';
import logger from './src/config/logger.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 5000;

// Connect to database
await connectDB();

// Health check route
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'Personal Finance Tracker API is running',
    environment: process.env.NODE_ENV,
    timestamp: new Date().toISOString()
  });
});

let server;
// Only start the server locally. Vercel handles the application lifecycle.
if (process.env.NODE_ENV !== 'production' && !process.env.VERCEL) {
  server = app.listen(PORT, () => {
    logger.info(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
    logger.info(`Swagger docs available at /docs`);
  });
}

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  logger.error(`Error: ${err.message}`);
  // Close server & exit process
  if (server) {
    server.close(() => process.exit(1));
  } else {
    // Only exit in development to prevent crashing serverless functions unnecessarily
    if (process.env.NODE_ENV !== 'production') {
      process.exit(1);
    }
  }
});

export default app;
