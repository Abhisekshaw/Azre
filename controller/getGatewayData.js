const GatewayModels = require('../models/gateway.model'); // Adjust the path as necessary

/**
 * Get Gateway data within a time range (Unix timestamp in seconds)
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @route GET /gateway-data?start=unixStart&end=unixEnd
 */
const getGatewayDataByTimeRange = async (req, res) => {
  try {
    let { start, end } = req.query;

    // Validate inputs
    if (!start || !end) {
      return res.status(400).json({ message: 'Start and End time are required in query parameters' });
    }

    start = parseInt(start);
    end = parseInt(end);

    if (isNaN(start) || isNaN(end)) {
      return res.status(400).json({ message: 'Start and End must be valid Unix timestamps in seconds' });
    }

    // Fetch data within the given time range
    const records = await GatewayModels.find({
      'd_details.timestamp': {
        $gte: start,
        $lte: end
      }
    });

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
