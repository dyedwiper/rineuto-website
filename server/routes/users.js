const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const { validateUser } = require('../middleware/validation');

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

module.exports = router;
