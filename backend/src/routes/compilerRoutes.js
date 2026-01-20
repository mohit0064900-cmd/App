const express = require('express');
const router = express.Router();
const { executeCode, getSupportedLanguages } = require('../controllers/compilerController');
const { optionalAuth } = require('../middleware/auth');
const { codeExecutionValidation } = require('../middleware/validation');
const { compilerLimiter } = require('../middleware/rateLimiter');

router.post('/execute', optionalAuth, compilerLimiter, codeExecutionValidation, executeCode);
router.get('/languages', getSupportedLanguages);

module.exports = router;
