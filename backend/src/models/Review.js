const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  rating: {
    type: Number,
    required: [true, 'Please provide a rating'],
    min: [1, 'Rating must be at least 1'],
    max: [5, 'Rating cannot be more than 5']
  },
  comment: {
    type: String,
    required: [true, 'Please provide a comment'],
    trim: true,
    minlength: [10, 'Comment must be at least 10 characters'],
    maxlength: [500, 'Comment cannot be more than 500 characters']
  },
  isApproved: {
    type: Boolean,
    default: true
  },
  helpful: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

reviewSchema.index({ user: 1 }, { unique: true });
reviewSchema.index({ rating: 1 });
reviewSchema.index({ isApproved: 1 });
reviewSchema.index({ createdAt: -1 });

reviewSchema.statics.getAverageRating = async function() {
  const result = await this.aggregate([
    { $match: { isApproved: true } },
    {
      $group: {
        _id: null,
        averageRating: { $avg: '$rating' },
        totalReviews: { $sum: 1 }
      }
    }
  ]);

  return result.length > 0 
    ? { 
        averageRating: Math.round(result[0].averageRating * 10) / 10,
        totalReviews: result[0].totalReviews 
      }
    : { averageRating: 0, totalReviews: 0 };
};

reviewSchema.statics.getRatingDistribution = async function() {
  return this.aggregate([
    { $match: { isApproved: true } },
    {
      $group: {
        _id: '$rating',
        count: { $sum: 1 }
      }
    },
    { $sort: { _id: -1 } }
  ]);
};

module.exports = mongoose.model('Review', reviewSchema);
