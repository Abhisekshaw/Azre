const GatewayModels = require('../models/gateway.model'); 
const gatewayList = async(req, res)=>{
    try {
       const data = await GatewayModels.find({}, { 'd_details.gatewayID': 1, _id: 0 });

       const gatewayIDs = [...new Set(data.map(item=> item?.d_details?.gatewayID))];
        
        if (gatewayIDs.length === 0) {
            return res.status(404).json({ message: 'No gatewayIDs found' });
        }
        return res.status(200).json({ count: gatewayIDs.length, data: gatewayIDs });
    } catch (error) {
        console.error('Error fetching gateway list:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}
module.exports = { gatewayList};