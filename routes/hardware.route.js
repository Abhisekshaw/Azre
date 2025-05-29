const express = require('express');
const router = express.Router();
const HardwareController = require('../controller/Hardware/hardwareController');
const HardwareTime = require('../controller/Hardware/hardwareTime');


// Store gateway data.
router.post('/gateway/save/data',  HardwareController.Store);

// Hardware set timestamp route
router.get('/hardware-time',HardwareTime.hardwaretime);

module.exports = router;