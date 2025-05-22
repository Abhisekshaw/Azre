const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const moment = require('moment-timezone');

const GatewaySchema = new mongoose.Schema({
  d_details: {
    gatewayID: {
      type: String,
      required: true
    },
    f_version: {
      type: String,
      required: true
    },
    timestamp: {
      type: Number,
      required: true
    }
  },
  flow_data: {
    Batt_R: {
      type: Number,
      required: true
    },
    Pb: {
      type: Number,
      required: true
    },
    Tb: {
      type: Number,
      required: true
    },
    Qb: {
      type: Number,
      required: true
    },
    VmT: {
      type: Number,
      required: true
    },
    VbT: {
      type: Number,
      required: true
    }
  }
}, { timestamps: true }); // Adds createdAt and updatedAt automatically

const GatewayModels = mongoose.model('gatewaymodels', GatewaySchema);

module.exports = GatewayModels;