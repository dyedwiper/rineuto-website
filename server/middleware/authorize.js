const User = require('../models/User');

function authorize(req, res, next) {
  User.findById(req.user)
    .then((user) => {
      if (!user.isAdmin) {
        return res.status(400).json({ error: 'Not authorized' });
      }
      next();
    })
    .catch((err) => res.status(400).json(err));
}

module.exports = authorize;
