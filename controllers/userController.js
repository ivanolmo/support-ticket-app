const asyncHandler = require('express-async-handler');

const registerUser = asyncHandler(async (request, response) => {
  const { user, password, email } = request.body;

  if (!user || !password || !email) {
    // testing
    response.status(400);
    throw new Error('Error in registerUser');
  }

  response.send('User registration controller');
});

const loginUser = asyncHandler(async (request, response) => {
  response.send('User login controller');
});

module.exports = {
  registerUser,
  loginUser,
};
