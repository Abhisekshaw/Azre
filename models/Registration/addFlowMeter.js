const mongoose = require('mongoose');

const AddFlowMeter = new mongoose.Schema({
  deviceId: {
    type: String,
    required: true
  },
  devicetype: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  dateOfJoining: {
    type: Date,
    required: true
  },
  timeZone: {
    type: String,
    required: true
  }
}, {
  timestamps: true // adds createdAt and updatedAt fields
});

module.exports = mongoose.model('AddFlowMeter', AddFlowMeter);
