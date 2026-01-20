# Implementation Guide - Personal Learning Platform

## Project Status: ✅ Backend Complete | ⏳ Frontend In Progress

### ✅ Completed Components

#### Backend (100% Complete)
- ✅ All models (User, Resource, Quiz, QuizAttempt, Review, SocialLink)
- ✅ All controllers (Auth, Compiler, Resource, Quiz, Review, Social)
- ✅ All routes with validation and rate limiting
- ✅ Middleware (Auth, Admin, Validation, Rate Limiting, Error Handling)
- ✅ Database configuration and connection
- ✅ JWT authentication and authorization
- ✅ File upload configuration (AWS S3)
- ✅ Judge0 API integration for code execution
- ✅ Security features (Helmet, CORS, Rate Limiting)

#### Frontend (Partial)
- ✅ Project configuration (Vite, Tailwind, PostCSS)
- ✅ All service files (API, Auth, Compiler, Resource, Quiz, Review, Social)
- ✅ Auth Context
- ✅ Utility functions and constants
- ✅ Navbar component

### 🔨 Remaining Frontend Components to Create

#### 1. Core Components

**Footer.jsx**
```jsx
import { Linkedin, Github, Instagram, Youtube, Twitter } from 'lucide-react';
import { useEffect, useState } from 'react';
import { socialService } from '../services/socialService';

export default function Footer() {
  const [socialLinks, setSocialLinks] = useState({});
  
  useEffect(() => {
    loadSocialLinks();
  }, []);
  
  const loadSocialLinks = async () => {
    try {
      const response = await socialService.getAllLinks();
      setSocialLinks(response.links);
    } catch (error) {
      console.error('Failed to load social links');
    }
  };

  const socialIcons = {
    linkedin: Linkedin,
    github: Github,
    instagram: Instagram,
    youtube: Youtube,
    twitter: Twitter
  };

  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col items-center space-y-4">
          <div className="flex space-x-6">
            {Object.entries(socialLinks).map(([platform, data]) => {
              const Icon = socialIcons[platform];
              return Icon ? (
                <a
                  key={platform}
                  href={data.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary-400 transition"
                >
                  <Icon className="w-6 h-6" />
                </a>
              ) : null;
            })}
          </div>
          <p className="text-gray-400">
            © 2024 Learning Platform by Mohit Dwivedi. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
```

**CodeEditor.jsx** (Monaco Editor Wrapper)
```jsx
import Editor from '@monaco-editor/react';

export default function CodeEditor({ language, value, onChange, theme = 'vs-dark' }) {
  const languageMap = {
    c: 'c',
    cpp: 'cpp',
    python: 'python',
    java: 'java',
    javascript: 'javascript',
    csharp: 'csharp'
  };

  return (
    <Editor
      height="100%"
      language={languageMap[language] || 'javascript'}
      value={value}
      onChange={onChange}
      theme={theme}
      options={{
        minimap: { enabled: false },
        fontSize: 14,
        lineNumbers: 'on',
        scrollBeyondLastLine: false,
        automaticLayout: true,
        tabSize: 2
      }}
    />
  );
}
```

**ProtectedRoute.jsx**
```jsx
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div className="flex items-center justify-center h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
    </div>;
  }

  return isAuthenticated ? children : <Navigate to="/login" replace />;
}
```

**AdminRoute.jsx**
```jsx
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function AdminRoute({ children }) {
  const { isAdmin, loading } = useAuth();

  if (loading) {
    return <div className="flex items-center justify-center h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
    </div>;
  }

  return isAdmin ? children : <Navigate to="/" replace />;
}
```

#### 2. Main Pages

**Home.jsx** - Landing page with hero section, features overview
**Compiler.jsx** - Code compiler with Monaco Editor, language selector, I/O panels
**Resources.jsx** - Browse and download e-books with filtering
**Quizzes.jsx** - Browse quizzes, join by code
**QuizPlay.jsx** - Take quiz with timer and question navigation
**Reviews.jsx** - View and submit reviews
**Login.jsx** - Login form with validation
**Register.jsx** - Registration form with validation
**Dashboard.jsx** - Admin panel for managing all content
**Profile.jsx** - User profile and settings

### 📦 Quick Setup Commands

```bash
# Backend Setup
cd backend
npm install
cp .env.example .env
# Edit .env with your credentials
npm run dev

# Frontend Setup
cd frontend
npm install
cp .env.example .env
# Edit .env with backend URL
npm run dev
```

### 🔑 Environment Setup

#### Backend .env (Required)
```env
# MongoDB
MONGODB_URI=your_mongodb_connection_string

# JWT
JWT_SECRET=your_secret_key_min_32_characters
JWT_EXPIRE=7d

# Judge0 API (Get from RapidAPI)
JUDGE0_API_URL=https://judge0-ce.p.rapidapi.com
JUDGE0_API_KEY=your_rapidapi_key
JUDGE0_API_HOST=judge0-ce.p.rapidapi.com

# AWS S3 (for file storage)
AWS_ACCESS_KEY_ID=your_aws_key
AWS_SECRET_ACCESS_KEY=your_aws_secret
AWS_REGION=us-east-1
AWS_S3_BUCKET=your_bucket_name

# CORS
FRONTEND_URL=http://localhost:5173
```

#### Frontend .env
```env
VITE_API_URL=http://localhost:5000/api
```

### 🎨 Frontend Component Pattern

All pages should follow this pattern:

```jsx
import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { serviceFunction } from '../services/serviceName';

export default function PageName() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const response = await serviceFunction();
      setData(response.data);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-900">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Content */}
      </main>
      <Footer />
    </div>
  );
}
```

### 🚀 Deployment Steps

#### Backend (Render.com)
1. Create new Web Service
2. Connect GitHub repository
3. Build Command: `cd backend && npm install`
4. Start Command: `cd backend && npm start`
5. Add all environment variables
6. Deploy

#### Frontend (Vercel)
1. Import project from GitHub
2. Root Directory: `frontend`
3. Build Command: `npm run build`
4. Output Directory: `dist`
5. Add environment variable: `VITE_API_URL`
6. Deploy

### ✨ Key Features Implementation Notes

#### 1. Code Compiler
- Use Monaco Editor (@monaco-editor/react)
- Support 6 languages (C, C++, Python, Java, JavaScript, C#)
- Separate input/output panels
- Real-time execution via Judge0 API
- Show execution time and memory

#### 2. Quiz System
- Generate 6-character unique codes
- Timer countdown
- Tab switch detection for anti-cheating
- Real-time leaderboard
- MCQ and True/False questions
- Auto-submit on time expiry

#### 3. E-Books/Resources
- Upload to AWS S3
- Category filtering
- Search functionality
- Download tracking
- View count

#### 4. Reviews
- 1-5 star ratings
- Admin moderation
- Average rating calculation
- One review per user

#### 5. Admin Dashboard
- Manage users
- Upload/delete resources
- Create/edit/delete quizzes
- Moderate reviews
- Update social media links
- View statistics

### 📱 Responsive Design

All components must be responsive:
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

Use Tailwind breakpoints: sm, md, lg, xl, 2xl

### 🎯 Next Steps

1. Create remaining React components (listed above)
2. Implement main pages with proper routing
3. Add loading states and error handling
4. Test all features
5. Add animations and transitions
6. Dark mode toggle
7. Deploy to production

### 📚 Additional Resources

- Monaco Editor Docs: https://microsoft.github.io/monaco-editor/
- Judge0 API: https://rapidapi.com/judge0-official/api/judge0-ce
- Tailwind CSS: https://tailwindcss.com/docs
- React Router: https://reactrouter.com/

---

**Note**: This is a production-ready foundation. All backend APIs are complete and tested. Focus on building the frontend UI components and pages to complete the platform.
