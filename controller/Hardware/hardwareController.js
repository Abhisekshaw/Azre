const mongoose = require('mongoose');
const DeviceModelFlowmeter = require('../../models/device.modelFlowmeter'); // Adjust path if needed
const DeviceModelPlc = require('../../models/device.modelPlc'); // Adjust path if needed
const moment = require('moment-timezone');


exports.StoreFlowmeter = async (req, res) => {
  try {
    const data = req.body;
    console.log({ Body: JSON.stringify(data) });

    // Validation: Basic check
    if (!data.d_details || !data.flow_data) {
      return res.status(400).json({ success: false, message: 'Missing d_details or flow_data' });
    }

    // Create and save the document
    const newGatewayData = new DeviceModelFlowmeter({
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

exports.StorePlc = async(req, res) => {
  try {
    const data = req.body;
    console.log({ Body: JSON.stringify(data) });

    // Validation: Basic check
    if (!data.d_details || !data.PLC_data) {
      return res.status(400).json({ success: false, message: 'Missing d_details or PLC_data' });
    }

    // Create and save the document
    const newDeviceData = new DeviceModelPlc({
      d_details: {
        gatewayID: data.d_details.gatewayID,
        f_version: data.d_details.f_version,
        timestamp: data.d_details.timestamp
      },
      PLC_data: {
        mode_DI: data.PLC_data.mode_DI,
        D_R: data.PLC_data.D_R,
        T_L: data.PLC_data.T_L,
        A_F: data.PLC_data.A_F,
        F_F: data.PLC_data.F_F,
        Y_F_T: data.PLC_data.Y_F_T,
        Y_O_C: data.PLC_data.Y_O_C
      }
    });

    await newDeviceData.save();

    return res.status(200).json({ success: true, message: 'Data saved successfully' });

  } catch (error) {
    console.error('Error saving PLC data:', error);
    return res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
}
