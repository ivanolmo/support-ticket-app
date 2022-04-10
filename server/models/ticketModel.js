const mongoose = require('mongoose');

const ticketSchema = mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    product: {
      type: String,
      required: true,
      enum: ['iphone', 'ipad', 'macbook', 'imac'],
    },
    description: { type: String, required: true },
    status: {
      type: String,
      required: true,
      enum: ['new', 'open', 'assigned', 'closed'],
      default: 'new',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Ticket', ticketSchema);
