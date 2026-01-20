const Review = require('../models/Review');
const { calculatePagination } = require('../utils/helpers');

const getAllReviews = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, approved = true } = req.query;

    const query = {};
    if (approved !== 'all') {
      query.isApproved = approved === 'true';
    }

    const { skip, limit: limitNum, page: pageNum } = calculatePagination(page, limit);

    const reviews = await Review.find(query)
      .populate('user', 'name avatar')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNum);

    const total = await Review.countDocuments(query);

    const stats = await Review.getAverageRating();

    res.status(200).json({
      success: true,
      count: reviews.length,
      reviews,
      ...stats,
      pagination: {
        page: pageNum,
        limit: limitNum,
        totalPages: Math.ceil(total / limitNum),
        total
      }
    });
  } catch (error) {
    next(error);
  }
};

const createReview = async (req, res, next) => {
  try {
    const { rating, comment } = req.body;

    const existingReview = await Review.findOne({ user: req.user.id });

    if (existingReview) {
      return res.status(400).json({
        success: false,
        message: 'You have already submitted a review. You can update your existing review.'
      });
    }

    const review = await Review.create({
      user: req.user.id,
      rating,
      comment
    });

    await review.populate('user', 'name avatar');

    res.status(201).json({
      success: true,
      message: 'Review submitted successfully',
      review
    });
  } catch (error) {
    next(error);
  }
};

const updateReview = async (req, res, next) => {
  try {
    const { rating, comment } = req.body;

    const review = await Review.findOne({ user: req.user.id });

    if (!review) {
      return res.status(404).json({
        success: false,
        message: 'Review not found'
      });
    }

    if (rating) review.rating = rating;
    if (comment) review.comment = comment;

    await review.save();
    await review.populate('user', 'name avatar');

    res.status(200).json({
      success: true,
      message: 'Review updated successfully',
      review
    });
  } catch (error) {
    next(error);
  }
};

const deleteReview = async (req, res, next) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({
        success: false,
        message: 'Review not found'
      });
    }

    if (req.user.role !== 'admin' && review.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this review'
      });
    }

    await review.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Review deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

const toggleApproval = async (req, res, next) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({
        success: false,
        message: 'Review not found'
      });
    }

    review.isApproved = !review.isApproved;
    await review.save();

    res.status(200).json({
      success: true,
      message: `Review ${review.isApproved ? 'approved' : 'unapproved'} successfully`,
      review
    });
  } catch (error) {
    next(error);
  }
};

const getReviewStats = async (req, res, next) => {
  try {
    const stats = await Review.getAverageRating();
    const distribution = await Review.getRatingDistribution();

    res.status(200).json({
      success: true,
      stats,
      distribution
    });
  } catch (error) {
    next(error);
  }
};

const getUserReview = async (req, res, next) => {
  try {
    const review = await Review.findOne({ user: req.user.id })
      .populate('user', 'name avatar');

    if (!review) {
      return res.status(404).json({
        success: false,
        message: 'No review found'
      });
    }

    res.status(200).json({
      success: true,
      review
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllReviews,
  createReview,
  updateReview,
  deleteReview,
  toggleApproval,
  getReviewStats,
  getUserReview
};
