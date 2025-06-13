const AddPlc = require('../../models/Registration/addPlc');
const AddFlowMeter = require('../../models/Registration/addFlowMeter');

// @desc   Register a new device
// @route  POST /api/devices
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

        let savedDevice;

        if (devicetype.toLowerCase() === 'plc') {
            const plcDevice = new AddPlc(deviceData);
            savedDevice = await plcDevice.save();
        } else if (devicetype.toLowerCase() === 'flowmeter' || devicetype.toLowerCase() === 'flow meter') {
            const flowMeterDevice = new AddFlowMeter(deviceData);
            savedDevice = await flowMeterDevice.save();
        } else {
            return res.status(400).json({ message: 'Invalid devicetype. Must be "plc" or "flowmeter"' });
        }

        res.status(201).json(savedDevice);

    } catch (error) {
        console.error('Error registering device:', error.message);
        res.status(500).json({ message: 'Server error' });
    }
};


