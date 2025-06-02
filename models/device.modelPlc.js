const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const moment = require('moment-timezone');

const PlcSchema = new mongoose.Schema({
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
    PLC_data: {
        mode_DI: {
            type: String,
            required: true
        },
        D_R: {
            type: Number,
            required: true
        },
        T_L: {
            type: Number,
            required: true
        },
        A_F: {
            type: Number,
            required: true
        },
        F_F: {
            type: Number,
            required: true
        },
        Y_F_T: {
            type: Number,
            required: true
        },
        Y_O_C: {
            type: Number,
            required: true
        }
    }
}, { timeatamps: true }); // Adds createdAt and updatedAt automatically
const DeviceModelPlc = mongoose.model('DeviceModelPlc', PlcSchema);
module.exports = DeviceModelPlc;



