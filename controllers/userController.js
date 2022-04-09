const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');

const User = require('../models/userModel');

const registerUser = asyncHandler(async (request, response) => {
  const { name, password, email } = request.body;

  if (!name || !password || !email) {
    // testing
    response.status(400);
    throw new Error('Error in registerUser');
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    response.status(400);
    throw new Error('User already exists');
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  if (user) {
    response.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    response.status(400);
    throw new Error('Error creating user');
  }
});

const loginUser = asyncHandler(async (request, response) => {
  response.send('User login controller');
});

module.exports = {
  registerUser,
  loginUser,
};
