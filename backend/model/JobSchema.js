const mongoose = require('mongoose');

const jobInternshipSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  jobOrInternship: {
    type: String,
    enum: ['job', 'internship'],
    required: true
  },
  status: {
    type: String,
    default: 'active'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

module.exports = mongoose.model('JobInternship', jobInternshipSchema);
