const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password_user: {
    type: String,
    required: true,
  },
  email_user: {
    type: String,
    required: true,
    unique: true,
  },
});


module.exports = mongoose.model('User', userSchema);
