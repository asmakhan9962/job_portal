const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
  category: {
    type: Array,
    ref: 'categories'
  },
  city: {
    type: Array,
    ref: 'cities'
  },
  title: {
    type: String,
    required: true
  },
  job_description: {
    type: String
  },
  image: {
    type: String
  },
  email: {
    type: String
  },
  phone: {
    type: String
  },
  featured: {
    type: Boolean,
    default: false
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('job', JobSchema);
