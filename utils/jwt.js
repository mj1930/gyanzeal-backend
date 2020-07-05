let jwt = require('jsonwebtoken');
let userModel = require('../models/user');

let checkToken = (req, res, next) => {
    let token = req.headers['x-access-token'] || req.headers['authorization']; // Express headers are auto converted to lowercase
    if (token && token.startsWith('Bearer ')) {
        // Remove Bearer from string
        token = token.slice(7, token.length);
    }
    if (token) {
        jwt.verify(token, process.env.APP_SECRET, async (err, decoded) => {
            if (err) {
                return res.status(401).json({
                    statusCode: 401,
                    message: 'Token is not valid'
                });
            } else {
                let userInfo = await userModel.findOne({
                    emailAddress: decoded.emailAddress
                });
                if (userInfo) {
                    req.headers.decoded = decoded;
                    next();
                } else {
                    return res.status(401).json({
                        statusCode: 401,
                        message: 'Token is not valid'
                    });
                }
            }
        });
    } else {
        return res.status(401).json({
            statusCode: 401,
            message: 'Auth token is not supplied'
        });
    }
};

module.exports = {
    checkToken: checkToken
}
