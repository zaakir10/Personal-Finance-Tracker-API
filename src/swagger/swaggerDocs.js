import swaggerJsDoc from 'swagger-jsdoc';

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
        url: 'http://localhost:5000',
        description: 'Development Server',
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
  apis: ['./src/routes/*.js', './src/swagger/paths.js'], // Paths to files containing OpenAPI definitions
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

export default swaggerDocs;
