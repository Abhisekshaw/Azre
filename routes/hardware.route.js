const express = require('express');
const router = express.Router();
const HardwareController = require('../controller/Hardware/hardwareController');
const HardwareTime = require('../controller/Hardware/hardwareTime');


// StoreFlowmeter gateway data.
router.post('/gateway/save/data',  HardwareController.StoreFlowmeter);
// StoreFlowmeter gateway data.
router.post('/plc/device/save/data',  HardwareController.StorePlc);

// Hardware set timestamp route
router.get('/hardware-time',HardwareTime.hardwaretime);



module.exports = router;