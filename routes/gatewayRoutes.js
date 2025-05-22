const express = require('express');
const router = express.Router();
const { getGatewayDataByTimeRange } = require('../controller/getGatewayData');

// GET /gateway-data?start=unixStart&end=unixEnd
router.get('/gateway-data', getGatewayDataByTimeRange);

module.exports = router;