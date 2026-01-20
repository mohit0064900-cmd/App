const express = require('express');
const router = express.Router();
const {
  getAllQuizzes,
  getQuizById,
  createQuiz,
  updateQuiz,
  deleteQuiz,
  joinQuizByCode,
  submitQuiz,
  getLeaderboard,
  getUserAttempts,
  getQuizStatistics
} = require('../controllers/quizController');
const { protect } = require('../middleware/auth');
const isAdmin = require('../middleware/admin');
const { quizValidation, mongoIdValidation } = require('../middleware/validation');

router.get('/', getAllQuizzes);
router.get('/my-attempts', protect, getUserAttempts);
router.get('/:id', protect, mongoIdValidation, getQuizById);
router.get('/:id/leaderboard', mongoIdValidation, getLeaderboard);
router.get('/:id/statistics', mongoIdValidation, getQuizStatistics);
router.post('/', protect, isAdmin, quizValidation, createQuiz);
router.post('/join', protect, joinQuizByCode);
router.post('/:id/submit', protect, mongoIdValidation, submitQuiz);
router.put('/:id', protect, isAdmin, mongoIdValidation, updateQuiz);
router.delete('/:id', protect, isAdmin, mongoIdValidation, deleteQuiz);

module.exports = router;
