const express = require('express');
const router = express.Router();
const { getGatewayDataByTimeRange } = require('../controller/getGatewayData');
const { gatewayList } = require('../controller/getGatewaylist');
const protect = require('../middleware/authMiddleware');
const { registerDevice } = require('../controller/AddDevice/addDevice');


// GET /gateway-data?start=unixStart&end=unixEnd
router.post('/gateway-data/:device', getGatewayDataByTimeRange);
router.get('/gateway-list/:device', gatewayList);
router.post('/register-device', registerDevice);
module.exports = router;