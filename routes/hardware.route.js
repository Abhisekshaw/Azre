const express = require('express');
const router = express.Router();
const HardwareController = require('../controller/Hardware/hardwareController');


// Store gateway data.
router.post('/gateway/save/data',  HardwareController.Store);

module.exports = router;