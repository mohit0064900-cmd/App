const { body, param, query, validationResult } = require('express-validator');

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array().map(err => ({
        field: err.path,
        message: err.msg
      }))
    });
  }
  next();
};

const registerValidation = [
  body('name')
    .trim()
    .notEmpty().withMessage('Name is required')
    .isLength({ min: 2, max: 50 }).withMessage('Name must be between 2 and 50 characters'),
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please provide a valid email')
    .normalizeEmail(),
  body('password')
    .notEmpty().withMessage('Password is required')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/).withMessage('Password must contain at least one uppercase letter, one lowercase letter, and one number'),
  validate
];

const loginValidation = [
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please provide a valid email')
    .normalizeEmail(),
  body('password')
    .notEmpty().withMessage('Password is required'),
  validate
];

const resourceValidation = [
  body('title')
    .trim()
    .notEmpty().withMessage('Title is required')
    .isLength({ max: 100 }).withMessage('Title cannot exceed 100 characters'),
  body('description')
    .trim()
    .notEmpty().withMessage('Description is required')
    .isLength({ max: 500 }).withMessage('Description cannot exceed 500 characters'),
  body('category')
    .trim()
    .notEmpty().withMessage('Category is required')
    .isIn(['programming', 'web-development', 'data-structures', 'algorithms', 'databases', 'machine-learning', 'other'])
    .withMessage('Invalid category'),
  validate
];

const quizValidation = [
  body('title')
    .trim()
    .notEmpty().withMessage('Title is required')
    .isLength({ max: 100 }).withMessage('Title cannot exceed 100 characters'),
  body('description')
    .trim()
    .notEmpty().withMessage('Description is required')
    .isLength({ max: 500 }).withMessage('Description cannot exceed 500 characters'),
  body('category')
    .trim()
    .notEmpty().withMessage('Category is required'),
  body('duration')
    .isInt({ min: 1, max: 180 }).withMessage('Duration must be between 1 and 180 minutes'),
  body('questions')
    .isArray({ min: 1 }).withMessage('At least one question is required'),
  body('questions.*.question')
    .trim()
    .notEmpty().withMessage('Question text is required'),
  body('questions.*.type')
    .isIn(['mcq', 'true-false']).withMessage('Question type must be mcq or true-false'),
  body('questions.*.correctAnswer')
    .isInt({ min: 0 }).withMessage('Correct answer must be a valid index'),
  validate
];

const reviewValidation = [
  body('rating')
    .isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),
  body('comment')
    .trim()
    .notEmpty().withMessage('Comment is required')
    .isLength({ min: 10, max: 500 }).withMessage('Comment must be between 10 and 500 characters'),
  validate
];

const codeExecutionValidation = [
  body('language')
    .trim()
    .notEmpty().withMessage('Language is required')
    .isIn(['c', 'cpp', 'python', 'java', 'javascript', 'csharp'])
    .withMessage('Invalid language'),
  body('code')
    .trim()
    .notEmpty().withMessage('Code is required')
    .isLength({ max: 10000 }).withMessage('Code cannot exceed 10000 characters'),
  body('input')
    .optional()
    .isString()
    .isLength({ max: 5000 }).withMessage('Input cannot exceed 5000 characters'),
  validate
];

const mongoIdValidation = [
  param('id')
    .isMongoId().withMessage('Invalid ID format'),
  validate
];

module.exports = {
  registerValidation,
  loginValidation,
  resourceValidation,
  quizValidation,
  reviewValidation,
  codeExecutionValidation,
  mongoIdValidation
};
