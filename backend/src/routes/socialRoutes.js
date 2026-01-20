const express = require('express');
const router = express.Router();
const {
  getAllLinks,
  updateLinks,
  deleteLink,
  toggleLinkStatus
} = require('../controllers/socialController');
const { protect } = require('../middleware/auth');
const isAdmin = require('../middleware/admin');

router.get('/', getAllLinks);
router.put('/', protect, isAdmin, updateLinks);
router.delete('/:platform', protect, isAdmin, deleteLink);
router.put('/:platform/toggle', protect, isAdmin, toggleLinkStatus);

module.exports = router;
