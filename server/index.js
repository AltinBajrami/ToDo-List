require('express-async-errors');
require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const { StatusCodes } = require('http-status-codes');
const cors = require('cors');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');

// routers
const toDoListRoutes = require('./routes/toDoListRoutes');
const authRoutes = require('./routes/authRoutes');

// middlewares
const errorHandlerMiddleware = require('./middleware/errorHandlerMiddleware');
const { authenticateUser } = require('./middleware/authMiddleware');

const server = express();

server.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);
server.use(cookieParser());
server.use(express.json());
server.use(morgan('dev'));

server.use('/api/v1/auth', authRoutes);
server.use('/api/v1/tasks', authenticateUser, toDoListRoutes);

server.use('*', (req, res) => {
  return res.status(StatusCodes.NOT_FOUND).json({ msg: 'Route not found' });
});

server.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;
const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    server.listen(port, () => {
      console.log(`server running on PORT ${port}...`);
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

start();
