const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');

router.post('/create', (req, res) => {
  if (!req.body.username) {
    return res.status(400).json({ error: 'username must not be blank' });
  }
  if (!req.body.password) {
    return res.status(400).json({ error: 'password must not be blank' });
  }
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
            .then(res.json(newUser))
            .catch(err => res.status(400).json(err));
        })
        .catch(err => res.status(400).json(err));
    })
    .catch(err => res.status(400).json(err));
});

module.exports = router;
