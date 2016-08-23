var express = require('express');
var app = express();
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var config = require('../config'); // get our config file

// route middleware to verify a token
function requiresToken(req, res, next) {

    app.set('superSecret', config.secret); // secret variable

    // check header or url parameters or post parameters for token
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    // decode token
    if (token) {

        // verifies secret and checks exp
        jwt.verify(token, app.get('superSecret'), function(err, decoded) {
            if (err) {
                return res.status(403).send({
                    success: false,
                    message: 'Failed to Authenticate Token.'
                });
            } else {
                // if everything is good, save to request for use in other routes
                req.decoded = decoded;
                next();
            }
        });

    } else {
        // if there is no token
        // return an error
        return res.status(403).send({
            success: false,
            message: 'No token provided.'
        });

    }
};

// route middleware to verify admin or teacher access
function requiresTeacherAccess(req, res, next) {
    var decoded = req.decoded;
    var role = decoded._doc.role;

    if (role === 'teacher' || role ==='admin'){
        next();
    } else{
        return  res.status(403).send({
            success:false,
            message: 'User role not Authorized!'
        });
    }
}

// route middleware to verify admin access
function requiresAdminAccess(req, res, next) {
    var decoded = req.decoded;
    var role = decoded._doc.role;

    if (role ==='admin'){
        next();
    } else{
        return  res.status(403).send({
            success:false,
            message: 'User role not Authorized!'
        });
    }
}

module.exports.requiresToken = requiresToken;
module.exports.requiresTeacherAccess = requiresTeacherAccess;
module.exports.requiresAdminAccess = requiresAdminAccess;
