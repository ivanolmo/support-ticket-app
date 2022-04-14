const dotenv = require('dotenv').config();
const express = require('express');
const path = require('path');
const { connectDB } = require('./config/db');
const { errorMiddleware } = require('./middleware/errorMiddleware');

const PORT = process.env.PORT || 5500;

connectDB();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (_, response) => {
  response.status(200).send('Support Ticket API');
});

// ROUTES //
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/tickets', require('./routes/ticketRoutes'));
app.use(errorMiddleware);

// serve front end folder when in production mode
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));

  app.get('*', (_, response) =>
    response.sendFile(path.join(__dirname, '../client/build/index.html'))
  );
} else {
  app.get('/', (_, response) => {
    response.status(200).json({ message: 'Support Ticket API' });
  });
}

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
