const Quiz = require('../models/Quiz');
const QuizAttempt = require('../models/QuizAttempt');
const { generateUniqueCode } = require('../utils/generateCode');
const { calculatePagination, calculatePercentage } = require('../utils/helpers');

const getAllQuizzes = async (req, res, next) => {
  try {
    const { category, difficulty, page = 1, limit = 10, sort = '-createdAt' } = req.query;

    const query = { isActive: true };

    if (category) {
      query.category = category;
    }

    if (difficulty) {
      query.difficulty = difficulty;
    }

    const { skip, limit: limitNum, page: pageNum } = calculatePagination(page, limit);

    const quizzes = await Quiz.find(query)
      .select('-questions')
      .populate('createdBy', 'name avatar')
      .sort(sort)
      .skip(skip)
      .limit(limitNum);

    const total = await Quiz.countDocuments(query);

    res.status(200).json({
      success: true,
      count: quizzes.length,
      quizzes,
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

const getQuizById = async (req, res, next) => {
  try {
    const quiz = await Quiz.findById(req.params.id)
      .populate('createdBy', 'name avatar');

    if (!quiz) {
      return res.status(404).json({
        success: false,
        message: 'Quiz not found'
      });
    }

    const quizData = quiz.toObject();
    quizData.questions = quizData.questions.map(q => {
      const { correctAnswer, explanation, ...questionWithoutAnswer } = q;
      return questionWithoutAnswer;
    });

    res.status(200).json({
      success: true,
      quiz: quizData
    });
  } catch (error) {
    next(error);
  }
};

const createQuiz = async (req, res, next) => {
  try {
    const { title, description, category, duration, questions, difficulty, passingScore } = req.body;

    const code = await generateUniqueCode(Quiz);

    const quiz = await Quiz.create({
      title,
      description,
      category,
      code,
      duration,
      questions,
      difficulty,
      passingScore,
      createdBy: req.user.id
    });

    await quiz.populate('createdBy', 'name avatar');

    res.status(201).json({
      success: true,
      message: 'Quiz created successfully',
      quiz,
      code: quiz.code
    });
  } catch (error) {
    next(error);
  }
};

const updateQuiz = async (req, res, next) => {
  try {
    const { title, description, category, duration, questions, difficulty, passingScore, isActive } = req.body;

    const quiz = await Quiz.findById(req.params.id);

    if (!quiz) {
      return res.status(404).json({
        success: false,
        message: 'Quiz not found'
      });
    }

    if (title) quiz.title = title;
    if (description) quiz.description = description;
    if (category) quiz.category = category;
    if (duration) quiz.duration = duration;
    if (questions) quiz.questions = questions;
    if (difficulty) quiz.difficulty = difficulty;
    if (passingScore !== undefined) quiz.passingScore = passingScore;
    if (isActive !== undefined) quiz.isActive = isActive;

    await quiz.save();
    await quiz.populate('createdBy', 'name avatar');

    res.status(200).json({
      success: true,
      message: 'Quiz updated successfully',
      quiz
    });
  } catch (error) {
    next(error);
  }
};

const deleteQuiz = async (req, res, next) => {
  try {
    const quiz = await Quiz.findById(req.params.id);

    if (!quiz) {
      return res.status(404).json({
        success: false,
        message: 'Quiz not found'
      });
    }

    await QuizAttempt.deleteMany({ quiz: quiz._id });
    await quiz.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Quiz deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

const joinQuizByCode = async (req, res, next) => {
  try {
    const { code } = req.body;

    const quiz = await Quiz.findOne({ code: code.toUpperCase(), isActive: true })
      .populate('createdBy', 'name avatar');

    if (!quiz) {
      return res.status(404).json({
        success: false,
        message: 'Invalid or inactive quiz code'
      });
    }

    const existingAttempt = await QuizAttempt.findOne({
      quiz: quiz._id,
      user: req.user.id
    });

    if (existingAttempt) {
      return res.status(400).json({
        success: false,
        message: 'You have already attempted this quiz',
        attempted: true
      });
    }

    const quizData = quiz.toObject();
    quizData.questions = quizData.questions.map(q => {
      const { correctAnswer, explanation, ...questionWithoutAnswer } = q;
      return questionWithoutAnswer;
    });

    res.status(200).json({
      success: true,
      quiz: quizData
    });
  } catch (error) {
    next(error);
  }
};

const submitQuiz = async (req, res, next) => {
  try {
    const { answers, timeSpent, tabSwitches = 0 } = req.body;

    const quiz = await Quiz.findById(req.params.id);

    if (!quiz) {
      return res.status(404).json({
        success: false,
        message: 'Quiz not found'
      });
    }

    const existingAttempt = await QuizAttempt.findOne({
      quiz: quiz._id,
      user: req.user.id
    });

    if (existingAttempt) {
      return res.status(400).json({
        success: false,
        message: 'You have already submitted this quiz'
      });
    }

    let correctAnswers = 0;
    let score = 0;

    answers.forEach((answer, index) => {
      if (quiz.questions[index] && answer === quiz.questions[index].correctAnswer) {
        correctAnswers++;
        score += quiz.questions[index].points;
      }
    });

    const percentage = calculatePercentage(score, quiz.totalPoints);
    const passed = percentage >= quiz.passingScore;

    const attempt = await QuizAttempt.create({
      quiz: quiz._id,
      user: req.user.id,
      answers,
      score,
      percentage,
      totalQuestions: quiz.questions.length,
      correctAnswers,
      timeSpent,
      passed,
      tabSwitches
    });

    await quiz.incrementAttempts();

    const rank = await QuizAttempt.getUserRank(quiz._id, req.user.id);
    attempt.rank = rank;
    await attempt.save();

    res.status(200).json({
      success: true,
      message: 'Quiz submitted successfully',
      result: {
        score,
        percentage,
        totalQuestions: quiz.questions.length,
        correctAnswers,
        timeSpent,
        passed,
        rank,
        totalPoints: quiz.totalPoints
      }
    });
  } catch (error) {
    next(error);
  }
};

const getLeaderboard = async (req, res, next) => {
  try {
    const { limit = 10 } = req.query;

    const quiz = await Quiz.findById(req.params.id);

    if (!quiz) {
      return res.status(404).json({
        success: false,
        message: 'Quiz not found'
      });
    }

    const leaderboard = await QuizAttempt.find({ quiz: quiz._id })
      .populate('user', 'name avatar')
      .sort({ score: -1, timeSpent: 1 })
      .limit(parseInt(limit));

    const leaderboardData = leaderboard.map((entry, index) => ({
      rank: index + 1,
      userName: entry.user.name,
      avatar: entry.user.avatar,
      score: entry.score,
      percentage: entry.percentage,
      timeSpent: entry.timeSpent,
      submittedAt: entry.submittedAt
    }));

    res.status(200).json({
      success: true,
      leaderboard: leaderboardData,
      totalAttempts: quiz.attemptCount
    });
  } catch (error) {
    next(error);
  }
};

const getUserAttempts = async (req, res, next) => {
  try {
    const attempts = await QuizAttempt.find({ user: req.user.id })
      .populate('quiz', 'title category code')
      .sort({ submittedAt: -1 });

    res.status(200).json({
      success: true,
      count: attempts.length,
      attempts
    });
  } catch (error) {
    next(error);
  }
};

const getQuizStatistics = async (req, res, next) => {
  try {
    const quiz = await Quiz.findById(req.params.id);

    if (!quiz) {
      return res.status(404).json({
        success: false,
        message: 'Quiz not found'
      });
    }

    const attempts = await QuizAttempt.find({ quiz: quiz._id });

    const totalAttempts = attempts.length;
    const averageScore = totalAttempts > 0
      ? attempts.reduce((sum, a) => sum + a.score, 0) / totalAttempts
      : 0;
    const averageTime = totalAttempts > 0
      ? attempts.reduce((sum, a) => sum + a.timeSpent, 0) / totalAttempts
      : 0;
    const passRate = totalAttempts > 0
      ? (attempts.filter(a => a.passed).length / totalAttempts) * 100
      : 0;

    res.status(200).json({
      success: true,
      statistics: {
        totalAttempts,
        averageScore: Math.round(averageScore * 10) / 10,
        averageTime: Math.round(averageTime),
        passRate: Math.round(passRate * 10) / 10
      }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
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
};
