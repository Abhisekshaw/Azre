const mongoose = require('mongoose');
const GatewayModels = require('../../models/gateway.model'); // Adjust path if needed

exports.Store = async (req, res) => {
  try {
    const data = req.body;
    console.log({ Body: JSON.stringify(data) });

    // Validation: Basic check
    if (!data.d_details || !data.flow_data) {
      return res.status(400).json({ success: false, message: 'Missing d_details or flow_data' });
    }

    // Create and save the document
    const newGatewayData = new GatewayModels({
      d_details: {
        gatewayID: data.d_details.gatewayID,
        f_version: data.d_details.f_version,
        timestamp: data.d_details.timestamp
      },
      flow_data: {
        Batt_R: data.flow_data.Batt_R,
        Pb: data.flow_data.pb,
        Tb: data.flow_data.Tb,
        Qb: data.flow_data.Qb,
        VmT: data.flow_data.VmT,
        VbT: data.flow_data.VbT
      }
    });

    await newGatewayData.save();

    return res.status(200).json({ success: true, message: 'Data saved successfully' });

  } catch (error) {
    console.error('Error saving gateway data:', error);
    return res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};
