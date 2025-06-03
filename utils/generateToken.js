const jwt = require('jsonwebtoken');

const generateToken = (id , role) => {
    try {
        
        return jwt.sign({id, role}, process.env.JWT_SECRET,{
            expiresIn: '1d',
        });
    } catch (error) {
       console.log(error);
        
    }
};

module.exports = generateToken;
