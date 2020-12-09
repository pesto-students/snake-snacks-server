const express = require('express');

const app = express();

const mongoose = require('mongoose');

const dotenv = require('dotenv');

const authRoute = require('./routes/auth');

dotenv.config();

// db connection
mongoose.connect(
  process.env.DB_CONNECT,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log('Connected to DB'),
);

// middleware
app.use(express.json());

// Route Middleware
app.use('/api/user', authRoute);

app.listen('3000', () => console.log('Server booted up successfully'));
