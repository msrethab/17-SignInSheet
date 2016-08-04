var express = require('express');
var app = express();
var router = express.Router();
var User = require('../app/models/user');
var mid = require('../middleware/middleware');

// student CRUD routes

var studentRoutes = express.Router();

module.exports = router;