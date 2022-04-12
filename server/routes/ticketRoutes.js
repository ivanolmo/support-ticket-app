const express = require('express');
const router = express.Router();

const noteRouter = require('./noteRoutes');
router.use('/:ticketId/notes', noteRouter);

const { protect } = require('../middleware/authMiddleware');
const {
  getAllTickets,
  getOneTicket,
  createTicket,
  deleteTicket,
  updateTicket,
} = require('../controllers/ticketController');

router.route('/').get(protect, getAllTickets).post(protect, createTicket);
router
  .route('/:id')
  .get(protect, getOneTicket)
  .put(protect, updateTicket)
  .delete(protect, deleteTicket);

module.exports = router;
