const mongoose = require('mongoose');

const quizAttemptSchema = new mongoose.Schema({
  quiz: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Quiz',
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  answers: {
    type: [Number],
    required: true
  },
  score: {
    type: Number,
    required: true,
    min: 0
  },
  percentage: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  },
  totalQuestions: {
    type: Number,
    required: true
  },
  correctAnswers: {
    type: Number,
    required: true,
    min: 0
  },
  timeSpent: {
    type: Number,
    required: true,
    min: 0
  },
  passed: {
    type: Boolean,
    default: false
  },
  rank: {
    type: Number
  },
  tabSwitches: {
    type: Number,
    default: 0
  },
  submittedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

quizAttemptSchema.index({ quiz: 1, user: 1 });
quizAttemptSchema.index({ quiz: 1, score: -1, timeSpent: 1 });
quizAttemptSchema.index({ user: 1, submittedAt: -1 });

quizAttemptSchema.statics.getLeaderboard = async function(quizId, limit = 10) {
  return this.find({ quiz: quizId })
    .populate('user', 'name avatar')
    .sort({ score: -1, timeSpent: 1 })
    .limit(limit)
    .lean();
};

quizAttemptSchema.statics.getUserRank = async function(quizId, userId) {
  const attempt = await this.findOne({ quiz: quizId, user: userId });
  if (!attempt) return null;

  const rank = await this.countDocuments({
    quiz: quizId,
    $or: [
      { score: { $gt: attempt.score } },
      { score: attempt.score, timeSpent: { $lt: attempt.timeSpent } }
    ]
  });

  return rank + 1;
};

quizAttemptSchema.pre('save', function(next) {
  if (this.isNew) {
    this.percentage = Math.round((this.score / this.quiz?.totalPoints || 100) * 100);
  }
  next();
});

module.exports = mongoose.model('QuizAttempt', quizAttemptSchema);
