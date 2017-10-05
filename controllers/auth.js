const User = require('../models/user');
const jwt = require('jsonwebtoken');
const { secret } = require('../config/environment');

function register(req, res, next) {
  User
    .create(req.body)
    .then(() => res.json({ message: 'Registration successful'}))
    .catch(next);
}

function login(req, res, next) {
  const errors = {};
  if(!req.body.email) errors.email = 'Email is required';
  if(!req.body.password) errors.password = 'Password is required';
  if(Object.keys(errors).length > 0) return res.status(422).json({ message: 'Unprocessible Entity', errors });

  User
    .findOne({ email: req.body.email })
    .then((user) => {
      if(!user || !user.validatePassword(req.body.password)) return res.unauthorized();

      const token = jwt.sign({ userId: user.id }, secret, { expiresIn: '1hr' });
      return res.json({ token, message: `Welcome back ${user.fi}` });
    })
    .catch(next);
}

module.exports = {
  register,
  login
};
