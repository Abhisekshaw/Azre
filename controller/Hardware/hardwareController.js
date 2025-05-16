const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const GatewayModels = require('../../models/gateway.model')

exports.Store = async (req, res) => {
    const data = req.body;
    console.log({ Body: JSON.stringify(req.body) });
    return res.status(200).json({sucess: true, message: "Data saved sucessfully"});
}