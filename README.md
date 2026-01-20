# 🚀 POLO - Programming Online Language Organizer

> A modern, secure, and high-performance online compiler web application designed for students, educators, and professional developers. Write, compile, and execute code in multiple programming languages directly from your browser.

![Tech Stack](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

---

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Installation](#-installation)
- [Environment Variables](#-environment-variables)
- [API Documentation](#-api-documentation)
- [Database Schema](#-database-schema)
- [Deployment](#-deployment)
- [Security Features](#-security-features)

---

## ✨ Features

### 1️⃣ **Online Multi-Language Code Compiler**
- Supports **C, C++, Python, Java, JavaScript, HTML/CSS, C#**
- VS Code-like editor powered by **Monaco Editor**
- Real-time code execution with separate input/output console
- Secure execution using Judge0 API or Docker sandbox
- Syntax highlighting & error handling
- Execution time limits

### 2️⃣ **E-Learning Resources**
- Admin-controlled PDF/e-book uploads
- Category-wise filtering (Programming, Web Dev, DSA, etc.)
- Online viewing & download functionality
- Secure cloud storage (AWS S3 / Firebase)
- Public browsing (no login required)
- Search & sort features

### 3️⃣ **Advanced Quiz System**
- Create category-based quizzes (MCQ & True/False)
- **Unique quiz codes** for joining quizzes
- Real-time timer & auto-evaluation
- **Leaderboard** with rank, score, and time
- Anti-cheating measures (tab switch detection)
- Quiz history & analytics
- Shareable quiz codes

### 4️⃣ **Authentication & Authorization**
- JWT-based secure authentication
- Role-based access control (Admin & User)
- Admin dashboard for complete platform management
- Password hashing with bcrypt
- Token refresh mechanism
- Protected routes

### 5️⃣ **Social Media Hub**
- LinkedIn, GitHub, Instagram, YouTube, Twitter links
- Dynamic icon rendering
- Admin panel for editing links
- Professional personal branding section

### 6️⃣ **Reviews & Feedback System**
- Star ratings (1-5 stars)
- Written feedback with timestamps
- Average rating calculation & display
- Admin moderation (delete inappropriate reviews)
- User profile integration

---

## 🛠️ Tech Stack

### **Frontend**
- **React.js 18** - Modern UI library
- **Tailwind CSS** - Utility-first styling
- **Monaco Editor** - Code editor component
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **React Query** - Data fetching & caching
- **Lucide React** - Icon library
- **Vite** - Build tool

### **Backend**
- **Node.js 18+** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM library
- **JWT** - Authentication
- **Bcrypt** - Password hashing
- **Express Validator** - Input validation
- **Express Rate Limit** - Rate limiting
- **Multer** - File uploads
- **Helmet** - Security headers
- **CORS** - Cross-origin resource sharing

### **External Services**
- **Judge0 API** - Code execution
- **AWS S3 / Firebase** - File storage
- **Cloudinary** - Image hosting (optional)

---

## 📁 Project Structure

```
personal-learning-platform/
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   ├── database.js          # MongoDB connection
│   │   │   ├── jwt.js               # JWT configuration
│   │   │   └── storage.js           # File storage config
│   │   │
│   │   ├── models/
│   │   │   ├── User.js              # User schema
│   │   │   ├── Resource.js          # E-book schema
│   │   │   ├── Quiz.js              # Quiz schema
│   │   │   ├── QuizAttempt.js       # Quiz submission schema
│   │   │   ├── Review.js            # Review schema
│   │   │   └── SocialLink.js        # Social media links
│   │   │
│   │   ├── controllers/
│   │   │   ├── authController.js    # Auth logic
│   │   │   ├── compilerController.js # Code execution
│   │   │   ├── resourceController.js # E-book management
│   │   │   ├── quizController.js    # Quiz operations
│   │   │   ├── reviewController.js  # Reviews & feedback
│   │   │   └── socialController.js  # Social links
│   │   │
│   │   ├── routes/
│   │   │   ├── authRoutes.js
│   │   │   ├── compilerRoutes.js
│   │   │   ├── resourceRoutes.js
│   │   │   ├── quizRoutes.js
│   │   │   ├── reviewRoutes.js
│   │   │   └── socialRoutes.js
│   │   │
│   │   ├── middleware/
│   │   │   ├── auth.js              # JWT verification
│   │   │   ├── admin.js             # Admin authorization
│   │   │   ├── validation.js        # Input validation
│   │   │   ├── rateLimiter.js       # Rate limiting
│   │   │   └── errorHandler.js      # Global error handler
│   │   │
│   │   ├── utils/
│   │   │   ├── generateCode.js      # Quiz code generator
│   │   │   ├── fileUpload.js        # File upload helper
│   │   │   └── helpers.js           # Utility functions
│   │   │
│   │   └── server.js                # Entry point
│   │
│   ├── .env.example
│   ├── .gitignore
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── CodeEditor.jsx       # Monaco editor wrapper
│   │   │   ├── QuizCard.jsx
│   │   │   ├── ResourceCard.jsx
│   │   │   ├── Leaderboard.jsx
│   │   │   ├── ReviewCard.jsx
│   │   │   ├── ProtectedRoute.jsx
│   │   │   └── AdminRoute.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Compiler.jsx
│   │   │   ├── Resources.jsx
│   │   │   ├── Quizzes.jsx
│   │   │   ├── QuizPlay.jsx
│   │   │   ├── Leaderboard.jsx
│   │   │   ├── Reviews.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Dashboard.jsx        # Admin dashboard
│   │   │   └── Profile.jsx
│   │   │
│   │   ├── context/
│   │   │   └── AuthContext.jsx      # Authentication context
│   │   │
│   │   ├── services/
│   │   │   ├── api.js               # Axios instance
│   │   │   ├── authService.js
│   │   │   ├── compilerService.js
│   │   │   ├── resourceService.js
│   │   │   ├── quizService.js
│   │   │   └── reviewService.js
│   │   │
│   │   ├── utils/
│   │   │   ├── constants.js
│   │   │   └── helpers.js
│   │   │
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   │
│   ├── public/
│   ├── index.html
│   ├── .env.example
│   ├── .gitignore
│   ├── package.json
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── vite.config.js
│
├── .gitignore
└── README.md
```

---

## 🚀 Installation

### Prerequisites
- Node.js 18+ and npm/yarn
- MongoDB (local or Atlas)
- Judge0 API key (or Docker for local execution)
- AWS S3 or Firebase account (for file storage)

### Clone Repository
```bash
git clone <repository-url>
cd personal-learning-platform
```

### Backend Setup
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your configuration
npm run dev
```

### Frontend Setup
```bash
cd frontend
npm install
cp .env.example .env
# Edit .env with backend API URL
npm run dev
```

---

## 🔐 Environment Variables

### Backend `.env`
```env
# Server
NODE_ENV=development
PORT=5000

# Database
MONGODB_URI=mongodb://localhost:27017/learning-platform
# OR for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/learning-platform

# JWT
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRE=7d
JWT_REFRESH_SECRET=your_refresh_token_secret
JWT_REFRESH_EXPIRE=30d

# Judge0 API (for code execution)
JUDGE0_API_URL=https://judge0-ce.p.rapidapi.com
JUDGE0_API_KEY=your_rapidapi_key

# File Storage (AWS S3)
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
AWS_REGION=us-east-1
AWS_S3_BUCKET=learning-platform-resources

# OR Firebase Storage
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_STORAGE_BUCKET=your_bucket_url

# CORS
FRONTEND_URL=http://localhost:5173

# Admin Default Credentials (first time setup)
ADMIN_EMAIL=mohit@example.com
ADMIN_PASSWORD=securePassword123
```

### Frontend `.env`
```env
VITE_API_URL=http://localhost:5000/api
VITE_APP_NAME=Learning Platform
```

---

## 📡 API Documentation

### Authentication Endpoints

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123"
}

Response: 201 Created
{
  "success": true,
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securePassword123"
}

Response: 200 OK
{
  "success": true,
  "token": "jwt_token_here",
  "user": { ... }
}
```

#### Get Current User
```http
GET /api/auth/me
Authorization: Bearer {token}

Response: 200 OK
{
  "success": true,
  "user": { ... }
}
```

### Compiler Endpoints

#### Execute Code
```http
POST /api/compiler/execute
Authorization: Bearer {token}
Content-Type: application/json

{
  "language": "python",
  "code": "print('Hello World')",
  "input": ""
}

Response: 200 OK
{
  "success": true,
  "output": "Hello World\n",
  "executionTime": "0.05s",
  "memory": "2.5MB",
  "status": "Accepted"
}
```

### Resource Endpoints

#### Get All Resources
```http
GET /api/resources?category=programming&page=1&limit=10

Response: 200 OK
{
  "success": true,
  "resources": [...],
  "pagination": {
    "page": 1,
    "totalPages": 5,
    "total": 50
  }
}
```

#### Upload Resource (Admin Only)
```http
POST /api/resources
Authorization: Bearer {admin_token}
Content-Type: multipart/form-data

{
  "title": "JavaScript Fundamentals",
  "description": "Complete JS guide",
  "category": "programming",
  "file": <pdf_file>
}

Response: 201 Created
```

#### Delete Resource (Admin Only)
```http
DELETE /api/resources/:id
Authorization: Bearer {admin_token}

Response: 200 OK
```

### Quiz Endpoints

#### Create Quiz (Admin Only)
```http
POST /api/quizzes
Authorization: Bearer {admin_token}
Content-Type: application/json

{
  "title": "JavaScript Basics",
  "description": "Test your JS knowledge",
  "category": "programming",
  "duration": 30,
  "questions": [
    {
      "question": "What is JavaScript?",
      "type": "mcq",
      "options": ["Language", "Framework", "Library", "Tool"],
      "correctAnswer": 0,
      "points": 10
    }
  ]
}

Response: 201 Created
{
  "success": true,
  "quiz": { ... },
  "quizCode": "ABC123"
}
```

#### Get All Quizzes
```http
GET /api/quizzes?category=programming

Response: 200 OK
{
  "success": true,
  "quizzes": [...]
}
```

#### Join Quiz by Code
```http
POST /api/quizzes/join
Authorization: Bearer {token}
Content-Type: application/json

{
  "code": "ABC123"
}

Response: 200 OK
{
  "success": true,
  "quiz": { ... }
}
```

#### Submit Quiz
```http
POST /api/quizzes/:id/submit
Authorization: Bearer {token}
Content-Type: application/json

{
  "answers": [0, 2, 1, 3],
  "timeSpent": 1200
}

Response: 200 OK
{
  "success": true,
  "score": 80,
  "totalQuestions": 10,
  "correctAnswers": 8,
  "rank": 5
}
```

#### Get Leaderboard
```http
GET /api/quizzes/:id/leaderboard

Response: 200 OK
{
  "success": true,
  "leaderboard": [
    {
      "rank": 1,
      "userName": "John Doe",
      "score": 95,
      "timeSpent": 900
    }
  ]
}
```

### Review Endpoints

#### Get All Reviews
```http
GET /api/reviews?page=1&limit=10

Response: 200 OK
{
  "success": true,
  "reviews": [...],
  "averageRating": 4.5,
  "totalReviews": 120
}
```

#### Create Review
```http
POST /api/reviews
Authorization: Bearer {token}
Content-Type: application/json

{
  "rating": 5,
  "comment": "Excellent platform!"
}

Response: 201 Created
```

#### Delete Review (Admin Only)
```http
DELETE /api/reviews/:id
Authorization: Bearer {admin_token}

Response: 200 OK
```

### Social Links Endpoints

#### Get Social Links
```http
GET /api/social

Response: 200 OK
{
  "success": true,
  "links": {
    "linkedin": "https://linkedin.com/in/mohit",
    "github": "https://github.com/mohit",
    "instagram": "https://instagram.com/mohit",
    "youtube": "https://youtube.com/@mohit",
    "twitter": "https://twitter.com/mohit"
  }
}
```

#### Update Social Links (Admin Only)
```http
PUT /api/social
Authorization: Bearer {admin_token}
Content-Type: application/json

{
  "linkedin": "https://linkedin.com/in/mohit-dwivedi",
  "github": "https://github.com/mohitdwivedi"
}

Response: 200 OK
```

---

## 🗄️ Database Schema

### User Schema
```javascript
{
  name: String (required),
  email: String (required, unique),
  password: String (required, hashed),
  role: String (enum: ['user', 'admin'], default: 'user'),
  avatar: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Resource Schema
```javascript
{
  title: String (required),
  description: String,
  category: String (required),
  fileUrl: String (required),
  fileName: String,
  fileSize: Number,
  uploadedBy: ObjectId (ref: User),
  downloads: Number (default: 0),
  createdAt: Date,
  updatedAt: Date
}
```

### Quiz Schema
```javascript
{
  title: String (required),
  description: String,
  category: String (required),
  code: String (unique, auto-generated),
  duration: Number (minutes),
  questions: [
    {
      question: String,
      type: String (enum: ['mcq', 'true-false']),
      options: [String],
      correctAnswer: Number,
      points: Number
    }
  ],
  createdBy: ObjectId (ref: User),
  isActive: Boolean (default: true),
  createdAt: Date,
  updatedAt: Date
}
```

### QuizAttempt Schema
```javascript
{
  quiz: ObjectId (ref: Quiz),
  user: ObjectId (ref: User),
  answers: [Number],
  score: Number,
  totalQuestions: Number,
  correctAnswers: Number,
  timeSpent: Number (seconds),
  submittedAt: Date
}
```

### Review Schema
```javascript
{
  user: ObjectId (ref: User),
  rating: Number (1-5, required),
  comment: String,
  isApproved: Boolean (default: true),
  createdAt: Date,
  updatedAt: Date
}
```

### SocialLink Schema
```javascript
{
  platform: String (required, unique),
  url: String (required),
  isActive: Boolean (default: true),
  updatedAt: Date
}
```

---

## 🌐 Deployment

### Backend Deployment (Render)

1. **Create Account**: Sign up at [render.com](https://render.com)

2. **Create Web Service**:
   - Connect your GitHub repository
   - Select "Web Service"
   - Build Command: `cd backend && npm install`
   - Start Command: `cd backend && npm start`

3. **Environment Variables**: Add all backend `.env` variables in Render dashboard

4. **Database**: Use MongoDB Atlas for production database

### Frontend Deployment (Vercel)

1. **Create Account**: Sign up at [vercel.com](https://vercel.com)

2. **Import Project**:
   ```bash
   cd frontend
   npm run build
   vercel --prod
   ```

3. **Environment Variables**: Add frontend `.env` variables

4. **Build Settings**:
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Root Directory: `frontend`

### Domain Configuration
- Point your custom domain to Vercel (frontend)
- Update `FRONTEND_URL` in backend `.env`
- Update `VITE_API_URL` in frontend `.env`

---

## 🔒 Security Features

### Implemented Security Measures

1. **Authentication**
   - JWT token-based authentication
   - Bcrypt password hashing (10 salt rounds)
   - Token expiration & refresh mechanism
   - HTTP-only cookies (optional)

2. **Authorization**
   - Role-based access control (RBAC)
   - Admin-only routes protection
   - Resource ownership verification

3. **Input Validation**
   - Express Validator for all inputs
   - Sanitization against XSS
   - MongoDB injection prevention

4. **Rate Limiting**
   - API rate limiting (100 requests/15 minutes)
   - Login rate limiting (5 attempts/15 minutes)
   - Code execution rate limiting

5. **CORS**
   - Configured allowed origins
   - Credentials support
   - Pre-flight request handling

6. **Security Headers**
   - Helmet.js for security headers
   - Content Security Policy
   - XSS Protection

7. **File Upload Security**
   - File type validation (PDF only for resources)
   - File size limits (10MB)
   - Secure file naming

8. **Code Execution Security**
   - Sandboxed execution (Judge0/Docker)
   - Execution time limits
   - Memory limits
   - Input sanitization

9. **Anti-Cheating (Quiz)**
   - Tab switch detection
   - Time tracking
   - Single submission per user

---

## 🧪 Testing

### Backend Tests
```bash
cd backend
npm test
```

### Frontend Tests
```bash
cd frontend
npm test
```

---

## 📝 Development Guidelines

### Code Style
- Use ES6+ syntax
- Follow Airbnb JavaScript style guide
- Use meaningful variable names
- Comment complex logic
- Keep functions small and focused

### Git Workflow
```bash
# Create feature branch
git checkout -b feature/new-feature

# Commit changes
git add .
git commit -m "feat: add new feature"

# Push to remote
git push origin feature/new-feature
```

### Commit Message Convention
- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Code style changes
- `refactor:` - Code refactoring
- `test:` - Test changes
- `chore:` - Build/tool changes

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

---

## 📞 Contact & Support

**Developer**: Mohit Dwivedi

- **LinkedIn**: [Add your LinkedIn]
- **GitHub**: [Add your GitHub]
- **Email**: [Add your email]

---

## 📄 License

This project is licensed under the MIT License.

---

## 🙏 Acknowledgments

- Monaco Editor by Microsoft
- Judge0 API for code execution
- MongoDB & Mongoose
- React & Tailwind CSS communities

---

## 🗺️ Roadmap

- [ ] Real-time collaborative coding
- [ ] Video tutorials integration
- [ ] AI-powered code suggestions
- [ ] Mobile app (React Native)
- [ ] Discussion forum
- [ ] Certificate generation

---

**Made with ❤️ by Mohit Dwivedi**
