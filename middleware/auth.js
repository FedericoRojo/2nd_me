const jwt = require('jsonwebtoken');
const secretKey = require('../config/keys').jwtSecret;

function auth (req, res, next) {
    //Token
    const token = req.header('x-auth-token');
    //Check for token
    if(!token) {return res.status(401).json({msg: 'No token, authorization denied'})}    
    
    try{
        //Verify token
        const decoded = jwt.verify(token, secretKey);
        //Add user from payload
        req.user = decoded
        next();
    }catch(e){
        res.status(400).json({msg: 'Token is not valid'})
    }
    
}

module.exports = auth;