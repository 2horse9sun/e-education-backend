const jwt = require('jsonwebtoken');
const {SuccessResponse, ErrorResponse} = require('../utils/ResponseModel');
const {STATUS_CODE} = require('../configs/StatusCode');

const loginVerification = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
  
    if (token == null){
        return res.json(new ErrorResponse("JWT is null", STATUS_CODE.NOT_LOGIN));
    }
  
    jwt.verify(token, process.env.JWT_SECRET_KEY, (error, userAccountInfo) => {
        if (error){
            console.log(error);
            return res.json(new ErrorResponse("JWT verification failed", STATUS_CODE.NOT_LOGIN));
        }
        req.userAccountInfo = userAccountInfo;
        next();
    })
}

module.exports = {
    loginVerification
}