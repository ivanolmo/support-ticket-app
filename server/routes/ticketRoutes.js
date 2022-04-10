const express = require('express');
const router = express.Router();

const { protect } = require('../middleware/authMiddleware');
const {
  getAllTickets,
  getOneTicket,
  createTicket,
  deleteTicket,
  updateTicket,
} = require('../controllers/ticketController');

router.route('/').get(protect, getAllTickets).post(protect, createTicket);
router.route('/:id').get(protect, getOneTicket).put(protect, updateTicket);
router.route('/:id').delete(protect, deleteTicket);

module.exports = router;
