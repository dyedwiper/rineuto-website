const User = require('../models/User');

function authorize(req, res, next) {
  User.findById(req.user)
    .then((user) => {
      if (!user || !user.isAdmin) {
        return res.status(403).json({ error: 'Not authorized' });
      }
      next();
    })
    .catch((err) => res.status(500).json(err));
}

module.exports = authorize;
