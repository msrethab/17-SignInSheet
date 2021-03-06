var express = require('express');
var app = express();
var bcrypt = require('bcryptjs'); //use to hash password on update
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var config = require('../config'); // get our config file
var User = require('../app/models/user'); // get our mongoose model
var mid = require('../middleware/middleware'); //injecting middleware
app.set('superSecret', config.secret); // secret variable

// Authentication and authorization routes
var authRoutes = express.Router();

// route to register a user (POST http://localhost:3000/api/register)
authRoutes.post('/register', function(req, res, next) {

    if (req.body.email &&
        req.body.name &&
        req.body.password &&
        req.body.confirmPassword) {

        // confirm that user typed same password twice
        if (req.body.password !== req.body.confirmPassword) {
            var err = new Error('Passwords do not match.');
            err.status = 400;
            return next(err);
        }

        // create object with form input
        var userData = {
            email: req.body.email,
            name: req.body.name,
            password: req.body.password,
            role: req.body.role,
            teacherId: req.body.teacherId
        };

        // use schema's `create` method to insert document into Mongo
        User.create(userData, function(error, user) {
            if (error) {
                return next(error);
            } else {
                return res.json({
                    success: true,
                    message: 'User Successfully Created!'
                });
            }
        });

    } else {
        var err = new Error('All fields required.');
        err.status = 400;
        return next(err);
    }
})

// route to update a user (PUT http://localhost:3000/api/register)
authRoutes.put('/register/:id', function(req, res, next) {

    var id = req.params.id;
    var updatedUser = req.body.updatedUser;

    if (req.body.email && req.body.password) {
        User.authenticate(req.body.email, req.body.password, function(error, user) {
            if (error || !user) {
                var err = new Error('Wrong email or password.');
                err.status = 401;
                return next(err);
            } else {

                // if user is found and password is right hash new password and update user
                if (updatedUser && updatedUser._id !== id) {
                    return res.status(500).json({ err: "Ids don't match!" });
                }

                bcrypt.hash(updatedUser.password, 10, function(err, hash) {
                    if (err) {
                        return next(err);
                    }
                    updatedUser.password = hash;

                    User.findOneAndUpdate({ '_id': id }, updatedUser, { new: true }, function(err, updatedUser) {
                        if (err) {
                            return res.status(500).json({ err: err.message });
                        }
                        res.json({
                            success: true,
                            message: 'User Successfully Updated!'
                        });
                    });

                })
            }
        });
    } else {
        var err = new Error('Email and password are required.');
        err.status = 401;
        return next(err);
    }
})

// route to authenticate a user (POST http://localhost:3000/api/authenticate)

authRoutes.post('/authenticate', function(req, res, next) {

    if (req.body.email && req.body.password) {
        User.authenticate(req.body.email, req.body.password, function(error, user) {
            if (error || !user) {
                var err = new Error('Wrong email or password.');
                err.status = 401;
                return next(err);
            } else {
                // if user is found and password is right
                // create a token
                var token = jwt.sign(user, app.get('superSecret'), {
                    expiresIn: "1d" // expires in 24 hours
                });

                // return the information including token as JSON
                res.json({
                    success: true,
                    message: 'Enjoy your token!',
                    token: token
                });
            }
        });
    } else {
        var err = new Error('Email and password are required.');
        err.status = 401;
        return next(err);
    }
});

module.exports = authRoutes;
