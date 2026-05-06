import swaggerJsDoc from 'swagger-jsdoc';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Personal Finance Tracker API',
      version: '1.0.0',
      description: 'API for tracking personal income and expenses',
    },
    servers: [
      {
        url: process.env.NODE_ENV === 'production' 
          ? 'https://personal-finance-tracker-api-mu.vercel.app' 
          : `http://localhost:${process.env.PORT || 5000}`,
        description: 'Current Server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
    tags: [
      { name: 'Auth', description: 'Authentication and User Profile' },
      { name: 'Transactions', description: 'Income and Expense tracking' },
      { name: 'Categories', description: 'Transaction Categories' },
      { name: 'Upload', description: 'File uploads' },
      { name: 'Admin', description: 'Admin operations' }
    ],
  },
  apis: [
    path.join(__dirname, '../routes/*.js'),
    path.join(__dirname, './paths.js')
  ],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

export default swaggerDocs;
