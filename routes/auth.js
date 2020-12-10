const router = require('express').Router();

const User = require('../models/User');

const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');

const {
  registrationRequestValidation,
  loginRequestValidation,
} = require('../validation');

router.post('/register', async (req, res) => {
  const { error } = registrationRequestValidation(req.body);

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

router.post('/login', async (req, res) => {
  const { error } = loginRequestValidation(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  const {
    body: { email, password },
  } = req;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).json({ error: 'user not found' });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(401).json({ error: 'invalid password' });
  }

  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
  return res
    .header('auth-token', token)
    .json({ message: 'login-successful', 'auth-token': token });
});

module.exports = router;
