const User = require('../models/User');
const { STANDARD_ERROR_MESSAGE } = require('../constants');

function authorize(req, res, next) {
  User.findById(req.user)
    .then((user) => {
      if (!user || !user.isAdmin) {
        return res.status(403).json('Not authorized');
      }
      next();
    })
    .catch(() => res.status(500).json(STANDARD_ERROR_MESSAGE));
}

module.exports = authorize;
