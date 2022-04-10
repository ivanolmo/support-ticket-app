const asyncHandler = require('express-async-handler');

const User = require('../models/userModel');
const Ticket = require('../models/ticketModel');

// get all user tickets from db by user id
const getAllTickets = asyncHandler(async (request, response) => {
  const user = await User.findById(request.user.id);

  if (!user) {
    response.status(401);
    throw new Error('Authorization required, please log in');
  }

  const tickets = await Ticket.find({ user: request.user.id });

  response.status(200).json(tickets);
});

// get single ticket from db by both user and ticket id
const getOneTicket = asyncHandler(async (request, response) => {
  const user = await User.findById(request.user.id);

  if (!user) {
    response.status(401);
    throw new Error('Authorization required, please log in');
  }

  const ticket = await Ticket.findById(request.params.id);

  if (!ticket) {
    response.status(404);
    throw new Error("Ticket doesn't exist");
  }

  if (ticket.user.toString() !== request.user.id) {
    response.status(401);
    throw new Error('Authorization required, please log in');
  }

  response.status(200).json(ticket);
});

// create new ticket and save to db
const createTicket = asyncHandler(async (request, response) => {
  const { product, description } = request.body;

  if (!product || !description) {
    response.status(400);
    throw new Error('Please check your input and try again');
  }

  const user = await User.findById(request.user.id);

  if (!user) {
    response.status(401);
    throw new Error('Authorization required, please log in');
  }

  const ticket = await Ticket.create({
    user: request.user.id,
    product: product.toLowerCase(),
    description: description.toLowerCase(),
    status: 'new',
  });

  response.status(201).json(ticket);
});

// update a ticket in db by both user and ticket id
const updateTicket = asyncHandler(async (request, response) => {
  const user = await User.findById(request.user.id);

  if (!user) {
    response.status(401);
    throw new Error('Authorization required, please log in');
  }

  const ticket = await Ticket.findById(request.params.id);

  if (!ticket) {
    response.status(404);
    throw new Error("Ticket doesn't exist");
  }

  if (ticket.user.toString() !== request.user.id) {
    response.status(401);
    throw new Error('Authorization required, please log in');
  }

  const updatedTicket = await Ticket.findByIdAndUpdate(
    request.params.id,
    request.body,
    { new: true }
  );

  response.status(201).json(updatedTicket);
});

// delete a ticket from db by both user and ticket id
const deleteTicket = asyncHandler(async (request, response) => {
  const user = await User.findById(request.user.id);

  if (!user) {
    response.status(401);
    throw new Error('Authorization required, please log in');
  }

  const ticket = await Ticket.findById(request.params.id);

  if (!ticket) {
    response.status(404);
    throw new Error("Ticket doesn't exist");
  }

  if (ticket.user.toString() !== request.user.id) {
    response.status(401);
    throw new Error('Authorization required, please log in');
  }

  await ticket.remove();

  response.status(201).json({
    success: true,
    message: `successfully deleted ticket id:${ticket.id}`,
  });
});

module.exports = {
  getAllTickets,
  getOneTicket,
  createTicket,
  updateTicket,
  deleteTicket,
};
