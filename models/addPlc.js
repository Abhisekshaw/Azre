const mongoose = require('mongoose');

const PlcRegistration = new mongoose.Schema({
    deviceName: {
        type: String,
        required: true
    },
    parameter: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true
    },
    timeZone: {
        type: String,
        required: true
    }
}, { 
    timestamps: true 
})