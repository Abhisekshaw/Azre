const express = require('express');
const router = express.Router();
const { getGatewayDataByTimeRange } = require('../controller/getGatewayData');
const { gatewayList } = require('../controller/getGatewaylist');
const protect = require('../middleware/authMiddleware');


// GET /gateway-data?start=unixStart&end=unixEnd
router.post('/gateway-data/:device', getGatewayDataByTimeRange);
router.get('/gateway-list/:device', gatewayList);

module.exports = router;