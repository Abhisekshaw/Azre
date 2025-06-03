const express = require('express');
const router = express.Router();
const { getGatewayDataByTimeRange } = require('../controller/getGatewayData');
const { gatewayList } = require('../controller/getGatewaylist');
const protect = require('../middleware/authMiddleware');


// GET /gateway-data?start=unixStart&end=unixEnd
router.post('/gateway-data',protect, getGatewayDataByTimeRange);
router.get('/gateway-list',protect, gatewayList);

module.exports = router;