require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const compression = require('compression');
const connectDatabase = require('./config/database');
const { errorHandler, notFound } = require('./middleware/errorHandler');
const { generalLimiter } = require('./middleware/rateLimiter');

const authRoutes = require('./routes/authRoutes');
const compilerRoutes = require('./routes/compilerRoutes');
const resourceRoutes = require('./routes/resourceRoutes');
const quizRoutes = require('./routes/quizRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const socialRoutes = require('./routes/socialRoutes');

const app = express();

connectDatabase();

app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(compression());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(generalLimiter);

app.get('/api', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Personal Learning & Coding Platform API',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth',
      compiler: '/api/compiler',
      resources: '/api/resources',
      quizzes: '/api/quizzes',
      reviews: '/api/reviews',
      social: '/api/social'
    }
  });
});

app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString()
  });
});

app.use('/api/auth', authRoutes);
app.use('/api/compiler', compilerRoutes);
app.use('/api/resources', resourceRoutes);
app.use('/api/quizzes', quizRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/social', socialRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`
╔═══════════════════════════════════════════════════════════╗
║                                                           ║
║   🚀 Personal Learning & Coding Platform API             ║
║                                                           ║
║   Server running in ${process.env.NODE_ENV || 'development'} mode                        ║
║   Port: ${PORT}                                           ║
║   Time: ${new Date().toLocaleString()}                   ║
║                                                           ║
╚═══════════════════════════════════════════════════════════╝
  `);
});

process.on('unhandledRejection', (err) => {
  console.error(`❌ Unhandled Rejection: ${err.message}`);
  server.close(() => process.exit(1));
});

process.on('SIGTERM', () => {
  console.log('👋 SIGTERM received. Shutting down gracefully...');
  server.close(() => {
    console.log('✅ Process terminated');
  });
});

module.exports = app;
