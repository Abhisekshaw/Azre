const jwt = require('jsonwebtoken');

const generateToken = (id , role) => {
    try {
        
        return jwt.sign({id, role}, process.env.JWT_SECRET,{
            expiresIn: '5h',
        });
    } catch (error) {
       console.log(error);
        
    }
};

module.exports = generateToken;
