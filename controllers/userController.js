const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');

const User = require('../models/userModel');
const { generateToken } = require('../utils/generateToken');

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
      token: generateToken(user._id),
    });
  } else {
    response.status(400);
    throw new Error('Error creating user');
  }
});

const loginUser = asyncHandler(async (request, response) => {
  const { email, password } = request.body;

  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    response.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    response.status(401);
    throw new Error('Invalid username and/or password, please try again');
  }
});

module.exports = {
  registerUser,
  loginUser,
};
