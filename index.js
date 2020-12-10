const express = require('express');

const cors = require('cors');

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
app.use(cors());
app.use(express.json());

// Route Middleware
app.use('/api/user', authRoute);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log('Server booted up successfully'));
