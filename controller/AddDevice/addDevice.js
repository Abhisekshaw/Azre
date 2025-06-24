const AddPlc = require('../../models/Registration/addPlc');
const AddFlowMeter = require('../../models/Registration/addFlowMeter');

// @desc   Register a new device
// @route  POST /api/register-device
exports.registerDevice = async (req, res) => {
  try {
    const { deviceId, devicetype, location, dateOfJoining, timeZone } = req.body;

    if (!deviceId || !devicetype || !location || !dateOfJoining || !timeZone) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const deviceData = {
      deviceId,
      devicetype,
      location,
      dateOfJoining: new Date(dateOfJoining),
      timeZone
    };

    let existingDevice;

    if (devicetype.toLowerCase() === 'plc') {
      existingDevice = await AddPlc.findOne({ deviceId });
      if (existingDevice) {
        return res.status(409).json({ message: 'Device ID already registered' });
      }
      const plcDevice = new AddPlc(deviceData);
      const savedDevice = await plcDevice.save();
      return res.status(201).json({sucess:true, message:`Device registered successfully`});

    } else if (devicetype.toLowerCase() === 'flowmeter' || devicetype.toLowerCase() === 'flow meter') {
      existingDevice = await AddFlowMeter.findOne({ deviceId });
      if (existingDevice) {
        return res.status(409).json({ message: 'Device ID already registered' });
      }
      const flowMeterDevice = new AddFlowMeter(deviceData);
      const savedDevice = await flowMeterDevice.save();
      return res.status(201).json({sucess:true, message:`Device registered successfully`});

    } else {
      return res.status(400).json({ message: 'Invalid devicetype. Must be "plc" or "flowmeter"' });
    }

  } catch (error) {
    console.error('Error registering device:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};
