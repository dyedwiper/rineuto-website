const jwt = require('jsonwebtoken');

function authenticate(req, res, next) {
  const token = req.header('auth-token');
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (error) {
    res.status(401).json('Invalid token');
  }
}

module.exports = authenticate;
