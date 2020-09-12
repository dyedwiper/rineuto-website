const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { validateUser, validateLogin } = require('../middleware/validation');
const authenticate = require('../middleware/authenticate');
const authorize = require('../middleware/authorize');

router.get('/', authenticate, authorize, (req, res) => {
  User.find()
    .then((users) => {
      res.json(users);
    })
    .catch((err) => res.status(500).json(err));
});

router.get('/authenticate', authenticate, (req, res) => {
  User.findById(req.user)
    .then((user) => {
      if (!user) {
        return res.status(403).json({ error: 'No user for this token' });
      }
      res.json({ username: user.username });
    })
    .catch((err) => res.status(500).json(err));
});

router.post('/create', authenticate, authorize, validateUser, (req, res) => {
  User.findOne({ username: req.body.username })
    .then((user) => {
      if (user) {
        return res.status(400).json({ error: 'username already taken' });
      }
      bcrypt
        .hash(req.body.password, 10)
        .then((hashedPassword) => {
          const newUser = new User({
            username: req.body.username,
            password: hashedPassword,
            isAdmin: req.body.isAdmin,
            created: Date.now(),
          });
          newUser
            .save()
            .then((newUser) => res.json({ success: 'user ' + newUser.username + ' registered' }))
            .catch((err) => res.status(500).json(err));
        })
        .catch((err) => res.status(500).json(err));
    })
    .catch((err) => res.status(500).json(err));
});

router.post('/login', validateLogin, (req, res) => {
  User.findOne({ username: req.body.username })
    .then((user) => {
      if (!user) {
        return res.status(403).json({ error: 'incorrect login information' });
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.status(403).json({ error: 'incorrect login information' });
          }
          user.lastLogin = Date.now();
          user
            .save()
            .then(() => {
              const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
              res.set('auth-token', token).json({ username: user.username });
            })
            .catch((err) => res.status(500).json(err));
        })
        .catch((err) => res.status(500).json(err));
    })
    .catch((err) => res.status(500).json(err));
});

module.exports = router;
