const jwt = require('jsonwebtoken');

const secretKey = "bhushan45"

const generateToken = (userId) =>{
    return jwt.sign({ userId }, secretKey, { expiresIn: "1h" }); 
}

module.exports = generateToken;