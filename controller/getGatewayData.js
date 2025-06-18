const DeviceModelFlowmeter = require('../models/device.modelFlowmeter');
const DeviceModelPlc = require('../models/device.modelPlc');

/**
 * Get Gateway data within a time range (Unix timestamp in seconds)
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @route GET /gateway-data/:device?start=unixStart&end=unixEnd
 */
const getGatewayDataByTimeRange = async (req, res) => {
  try {
    // Extract query and route parameters
    let { start, end, devices } = req.body; // Use req.query for GET parameters
    const { device } = req.params;

    console.log(`Received request to get gateway data from ${start} to ${end} for device ${device}`);

    // Validate inputs
    if (!start || !end) {
      return res.status(400).json({ message: 'Start and End time are required in query parameters' });
    }

    start = parseInt(start);
    end = parseInt(end);

    if (isNaN(start) || isNaN(end)) {
      return res.status(400).json({ message: 'Start and End must be valid Unix timestamps in seconds' });
    }

    let records = [];

    // Validate and fetch data based on device type
    if (device === "Flowmeter") {
      records = await DeviceModelFlowmeter.find({
        'd_details.gatewayID': devices,
        'd_details.timestamp': { $gte: start, $lte: end }
      });
    } else if (device === "Plc") {
      records = await DeviceModelPlc.find({
        'd_details.gatewayID': devices,
        'd_details.timestamp': { $gte: start, $lte: end }
      });
    } else {
      return res.status(400).json({ message: 'Invalid device type. Must be "Flowmeter" or "Plc"' });
    }

    return res.status(200).json({
      count: records.length,
      data: records
    });

  } catch (error) {
    console.error('Error fetching gateway data:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = { getGatewayDataByTimeRange };
