const express = require('express');
const router = express.Router();
const {
  getAllReviews,
  createReview,
  updateReview,
  deleteReview,
  toggleApproval,
  getReviewStats,
  getUserReview
} = require('../controllers/reviewController');
const { protect } = require('../middleware/auth');
const isAdmin = require('../middleware/admin');
const { reviewValidation, mongoIdValidation } = require('../middleware/validation');

router.get('/', getAllReviews);
router.get('/stats', getReviewStats);
router.get('/my-review', protect, getUserReview);
router.post('/', protect, reviewValidation, createReview);
router.put('/my-review', protect, reviewValidation, updateReview);
router.put('/:id/toggle-approval', protect, isAdmin, mongoIdValidation, toggleApproval);
router.delete('/:id', protect, mongoIdValidation, deleteReview);

module.exports = router;
