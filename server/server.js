const dotenv = require('dotenv').config({ path: '../.env' });
const express = require('express');
const { connectDB } = require('./config/db');
const { errorMiddleware } = require('./middleware/errorMiddleware');

const PORT = process.env.PORT || 5500;

connectDB();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (request, response) => {
  response.status(200).send('Support Ticket API...');
});

// ROUTES //
app.use('/api/users', require('./routes/userRoutes'));
app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
