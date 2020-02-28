const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String
  },
  password: {
    type: String,
    required: true
  },
  ckdCities: {
    type: Array
  },
  ckdCats: {
    type: Array
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('user', UserSchema);