const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
  const token = req.get('auth-token');
  if (!token) {
    return res.status(400).send('No token');
  }
  try {
    req.user = jwt.verify(token, 'secret');
    next();
  } catch (error) {
    res.status(400).send('Invalid token');
  }
}

module.exports = verifyToken;
