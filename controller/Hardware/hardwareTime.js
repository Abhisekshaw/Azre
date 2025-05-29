exports.hardwaretime = async (req, res) => {
    try {
        const currentTimeStamp = Math.floor(Date.now()/1000);
        res.status(200).json({
            success: true,
            status: "TMS",
            timestamp:currentTimeStamp
        })
    } catch (err) {
       res.status(500).json({
        success: false,
        message: 'Failed to get curent timestamp',
        error: err.message
       })
    }
}




