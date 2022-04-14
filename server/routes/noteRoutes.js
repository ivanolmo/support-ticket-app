const express = require('express');
const router = express.Router({ mergeParams: true });

const { protect } = require('../middleware/authMiddleware');

const {
  getNotes,
  addNoteToTicket,
  deleteNote,
} = require('../controllers/noteController');

router.route('/').get(protect, getNotes).post(protect, addNoteToTicket);

router.route('/:noteId').delete(protect, deleteNote);

module.exports = router;
