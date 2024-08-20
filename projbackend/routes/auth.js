const express = require('express');
const { check } = require('express-validator');
const { signup, signin, signout, isSignedIn } = require('../controllers/auth');
const router = express.Router();

router.post('/signup', [
  check('name', 'Name should be at least 3 characters').isLength({ min: 3 }),
  check('email', 'Email is required').isEmail(),
  check('password', 'Password should be at least 6 characters').isLength({ min: 6 })
], signup);

router.post('/signin', [
  check('email', 'Email is required').isEmail(),
  check('password', 'Password field is required').isLength({ min: 1 })
], signin);

router.get('/signout', signout);

module.exports = router;
