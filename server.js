// =======================
// get the packages we need ============
// =======================
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');

var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var config = require('./config'); // get our config file
var User = require('./app/models/user'); // get mongoose user model
var mid = require('./middleware/middleware');

// =======================
// configuration =========
// =======================
var port = process.env.PORT || 3000; // used to create, sign, and verify tokens
mongoose.connect(config.database); // connect to database
app.set('superSecret', config.secret); // secret variable

// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// use morgan to log requests to the console
app.use(morgan('dev'));


// enabling CORS
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-access-token");
    res.header("Access-Control-Allow-Methods", "PUT");
    next();
});

// authorization and authentication routes containing register and login methods
var authRoutes = require('./routes/authRoutes');
app.use('/api', authRoutes);

// student routes containing GET, POST, PUT AND DELETE methods
var studentRoutes = require('./routes/studentRoutes');
app.use('/api', studentRoutes);

// teacher routes containing GET, POST, PUT AND DELETE methods
var teacherRoutes = require('./routes/teacherRoutes');
app.use('/api', teacherRoutes);

// lesson routes containing GET, POST, PUT AND DELETE methods
var lessonRoutes = require('./routes/lessonRoutes');
app.use('/api', lessonRoutes);

// test routes for middleware 
var apiRoutes = express.Router();

// route to show a random message (GET http://localhost:3000/api/)
apiRoutes.get('/', mid.requiresToken, function(req, res) {
    res.json({ message: 'Welcome to the coolest API on earth!' });
});

// route to return all users (GET http://localhost:3000/api/users)
apiRoutes.get('/users', mid.requiresToken, function(req, res) {
    User.find({}, function(err, users) {
        res.json(users);
    });
});

// apply the routes to our application with the prefix /api
app.use('/api', apiRoutes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('File Not Found');
    err.status = 404;
    next(err);
});

// =======================
// start the server ======
// =======================
app.listen(port);
console.log('Magic happens at http://localhost:' + port);
