const express = require('express');
const router = express.Router();
const {
  getAllResources,
  getResourceById,
  createResource,
  updateResource,
  deleteResource,
  downloadResource,
  getCategories
} = require('../controllers/resourceController');
const { protect, optionalAuth } = require('../middleware/auth');
const isAdmin = require('../middleware/admin');
const { upload } = require('../config/storage');
const { resourceValidation, mongoIdValidation } = require('../middleware/validation');
const { uploadLimiter } = require('../middleware/rateLimiter');

router.get('/', optionalAuth, getAllResources);
router.get('/categories', getCategories);
router.get('/:id', optionalAuth, mongoIdValidation, getResourceById);
router.get('/:id/download', optionalAuth, mongoIdValidation, downloadResource);
router.post('/', protect, isAdmin, uploadLimiter, upload.single('file'), resourceValidation, createResource);
router.put('/:id', protect, isAdmin, mongoIdValidation, upload.single('file'), updateResource);
router.delete('/:id', protect, isAdmin, mongoIdValidation, deleteResource);

module.exports = router;
