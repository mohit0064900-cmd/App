const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: [true, 'Question text is required'],
    trim: true
  },
  type: {
    type: String,
    enum: ['mcq', 'true-false'],
    required: true
  },
  options: {
    type: [String],
    required: function() {
      return this.type === 'mcq';
    },
    validate: {
      validator: function(v) {
        return this.type === 'true-false' || (v && v.length >= 2 && v.length <= 6);
      },
      message: 'MCQ must have between 2 and 6 options'
    }
  },
  correctAnswer: {
    type: Number,
    required: [true, 'Correct answer index is required']
  },
  points: {
    type: Number,
    default: 10,
    min: 1
  },
  explanation: {
    type: String,
    trim: true
  }
});

const quizSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a quiz title'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Please provide a description'],
    maxlength: [500, 'Description cannot be more than 500 characters']
  },
  category: {
    type: String,
    required: [true, 'Please provide a category'],
    enum: ['programming', 'web-development', 'data-structures', 'algorithms', 'databases', 'general', 'other'],
    lowercase: true
  },
  code: {
    type: String,
    unique: true,
    required: true,
    uppercase: true,
    length: 6
  },
  duration: {
    type: Number,
    required: [true, 'Please provide quiz duration in minutes'],
    min: 1,
    max: 180
  },
  questions: {
    type: [questionSchema],
    validate: {
      validator: function(v) {
        return v && v.length > 0;
      },
      message: 'Quiz must have at least one question'
    }
  },
  totalPoints: {
    type: Number,
    default: 0
  },
  difficulty: {
    type: String,
    enum: ['easy', 'medium', 'hard'],
    default: 'medium'
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  isActive: {
    type: Boolean,
    default: true
  },
  attemptCount: {
    type: Number,
    default: 0
  },
  passingScore: {
    type: Number,
    default: 50,
    min: 0,
    max: 100
  }
}, {
  timestamps: true
});

quizSchema.index({ code: 1 });
quizSchema.index({ category: 1 });
quizSchema.index({ isActive: 1 });
quizSchema.index({ createdAt: -1 });

quizSchema.pre('save', function(next) {
  if (this.isModified('questions')) {
    this.totalPoints = this.questions.reduce((sum, q) => sum + q.points, 0);
  }
  next();
});

quizSchema.methods.incrementAttempts = function() {
  this.attemptCount += 1;
  return this.save();
};

module.exports = mongoose.model('Quiz', quizSchema);
