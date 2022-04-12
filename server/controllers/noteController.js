const asyncHandler = require('express-async-handler');

const User = require('../models/userModel');
const Ticket = require('../models/ticketModel');
const Note = require('../models/noteModel');

// get all user notes from db by user id
const getNotes = asyncHandler(async (request, response) => {
  const user = await User.findById(request.user.id);

  if (!user) {
    response.status(401);
    throw new Error('Authorization required, please log in');
  }

  const ticket = await Ticket.findById(request.params.ticketId);

  if (ticket.user.toString() !== request.user.id) {
    response.status(401);
    throw new Error('Authorization required, please log in');
  }

  const notes = await Note.find({ ticket: request.params.ticketId });

  response.status(200).json(notes);
});

// create a note for a specific ticket
const addNoteToTicket = asyncHandler(async (request, response) => {
  const user = await User.findById(request.user.id);

  if (!user) {
    response.status(401);
    throw new Error('Authorization required, please log in');
  }

  const ticket = await Ticket.findById(request.params.ticketId);

  if (ticket.user.toString() !== request.user.id) {
    response.status(401);
    throw new Error('Authorization required, please log in');
  }

  const note = await Note.create({
    text: request.body.text,
    user: request.user.id,
    ticket: request.params.ticketId,
  });

  response.status(201).json(note);
});

module.exports = { getNotes, addNoteToTicket };
