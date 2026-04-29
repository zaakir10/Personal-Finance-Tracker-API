# 💰 Personal Finance Tracker API


A production-ready RESTful API for tracking personal income and expenses. Built with Node.js, Express, and MongoDB, featuring secure JWT authentication, detailed financial summaries, and interactive API documentation.

## 🚀 Live Demo
The API is deployed and accessible at:
[https://personal-finance-tracker-api-mu.vercel.app](https://personal-finance-tracker-api-mu.vercel.app)

---

## ✨ Features

- **🔐 Secure Authentication**: JWT-based authentication with protected routes.
- **📈 Transaction Management**: Full CRUD operations for income and expenses.
- **📁 File Uploads**: Profile picture uploads integrated with Cloudinary.
- **📊 Financial Analytics**: Monthly summaries and category-based breakdown using MongoDB Aggregation.
- **📖 API Documentation**: Interactive Swagger UI documentation.
- **🛡️ Security Focused**: Implements Helmet CSP, Rate Limiting, and CORS.

---

## 🛠️ Technology Stack

- **Runtime**: Node.js (ES Modules)
- **Framework**: Express.js
- **Database**: MongoDB Atlas (Mongoose ODM)
- **Documentation**: Swagger UI / Swagger-jsdoc
- **Cloud Storage**: Cloudinary (for image uploads)
- **Security**: JWT, Helmet, Express-Rate-Limit
- **Logging**: Winston

---

## 📖 API Documentation

The interactive API documentation is available at the `/docs` endpoint. You can test all API features directly from the browser:

[View Documentation](https://personal-finance-tracker-api-mu.vercel.app/docs)

### Core Endpoints

#### Auth
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Authenticate and get token
- `GET /api/auth/profile` - Get current user profile

#### Transactions
- `GET /api/transactions` - List all user transactions
- `POST /api/transactions` - Create new entry
- `PUT /api/transactions/:id` - Update existing entry
- `DELETE /api/transactions/:id` - Remove entry
- `GET /api/transactions/monthly-summary` - Get financial statistics

---

## ⚙️ Installation & Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/zaakir10/Personal-Finance-Tracker-API.git
   cd Personal-Finance-Tracker-API
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Create a `.env` file in the root directory:
   ```env
   PORT=5000
   MONGODB_URI_ATLAS=your_mongodb_atlas_uri
   JWT_SECRET=your_jwt_secret
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```

4. **Run the application**:
   ```bash
   # Development mode
   npm run dev

   # Production mode
   npm start
   ```

---
**Developed by Eng zaakir**
## 📄 License
This project is licensed under the ISC License.
