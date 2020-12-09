const router = require('express').Router();

const User = require('../models/User');

const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');

const { registrationValidation } = require('../validation');

router.post('/register', async (req, res) => {
  const { error } = registrationValidation(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  const {
    body: { username, email, password },
  } = req;

  const user = await User.findOne({ email });

  if (user) {
    return res.status(400).json({ error: 'Email already exists' });
  }

  // hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({
    username,
    email,
    password: hashedPassword,
  });

  try {
    const savedUser = await newUser.save();
    return res.json({ user: savedUser._id });
  } catch (err) {
    return res.status(400).json({ error: err });
  }
});

module.exports = router;
