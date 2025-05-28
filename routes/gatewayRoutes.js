const express = require('express');
const router = express.Router();
const { getGatewayDataByTimeRange } = require('../controller/getGatewayData');
const { gatewayList } = require('../controller/getGatewaylist');


// GET /gateway-data?start=unixStart&end=unixEnd
router.post('/gateway-data', getGatewayDataByTimeRange);
router.get('/gateway-list', gatewayList);

module.exports = router;