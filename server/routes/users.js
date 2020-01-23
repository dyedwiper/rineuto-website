const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { validateUser } = require('../middleware/validation');
const verifyToken = require('../middleware/verifyToken');

router.get('/', verifyToken, (req, res) => {
  User.find()
    .then(users => {
      res.json(users);
    })
    .catch(err => res.status(400).json(err));
});

router.post('/create', validateUser, (req, res) => {
  User.findOne({ username: req.body.username })
    .then(user => {
      if (user) {
        return res.status(400).json({ error: 'username already taken' });
      }
      bcrypt
        .hash(req.body.password, 10)
        .then(hashedPassword => {
          const newUser = new User({
            username: req.body.username,
            password: hashedPassword
          });
          newUser
            .save()
            .then(newUser =>
              res.json({ success: 'user ' + newUser.username + ' registered' })
            )
            .catch(err => res.status(400).json(err));
        })
        .catch(err => res.status(400).json(err));
    })
    .catch(err => res.status(400).json(err));
});

router.post('/login', validateUser, (req, res) => {
  User.findOne({ username: req.body.username })
    .then(user => {
      if (!user) {
        return res.status(400).json({ error: 'username does not exist' });
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then(valid => {
          if (!valid) {
            return res.status(400).json({ error: 'password is incorrect' });
          }
          console.log(process.env.JWT_SECRET);
          const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
          res.set('auth-token', token).send(token);
        })
        .catch(err => res.status(400).json(err));
    })
    .catch(err => res.status(400).json(err));
});

module.exports = router;
