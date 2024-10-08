const User = require('../models/User');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const { sendEmail } = require('../utils/email');

exports.signup = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
    });
  }

  const user = new User(req.body);
  user.save((err, user) => {
    if (err) {
      return res.status(400).json({
        error: 'Failed to save user in DB',
      });
    }
    sendEmail(user.email, 'Welcome!', 'Thanks for signing up!');
    res.json({
      name: user.name,
      email: user.email,
      id: user._id,
    });
  });
};

exports.signin = (req, res) => {
  const { email, password } = req.body;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
    });
  }

  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: 'User email does not exist',
      });
    }

    if (!user.authenticate(password)) {
      return res.status(401).json({
        error: 'Email and password do not match',
      });
    }

    const token = jwt.sign({ _id: user._id }, process.env.SECRET);
    res.cookie('token', token, { expire: new Date() + 9999 });

    const { _id, name, email, role } = user;
    return res.json({ token, user: { _id, name, email, role } });
  });
};

exports.signout = (req, res) => {
  res.clearCookie('token');
  res.json({
    message: 'User signout successful',
  });
};

exports.isSignedIn = expressJwt({
  secret: process.env.SECRET,
  algorithms: ['HS256'],
  userProperty: 'auth',
});
