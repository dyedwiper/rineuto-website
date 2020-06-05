const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  admin: {
    type: Boolean,
    default: false,
  },
  lastLogin: {
    type: Date,
    default: Date.now(),
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
