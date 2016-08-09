var express = require('express');
var app = express();
var moment = require('moment'); //importing moment for datetime parsing
moment().format();
var Lesson = require('../app/models/lesson');
var mid = require('../middleware/middleware');

// lesson GET, POST, PUT, and DELETE routes

var lessonRoutes = express.Router();

// get route defaults to search for all lessons created today
lessonRoutes.get('/lessons', function(req, res) {
    var start = new Date();
    start.setHours(0, 0, 0, 0);

    var end = new Date();
    end.setHours(23, 59, 59, 999);

    Lesson.find({ "signedInDate": { "$gte": start, "$lt": end } }, function(err, lessons) {
        if (err) {
            return res.status(500).json({ message: err.message });
        }
        res.json({ lessons });
    });
});

lessonRoutes.post('/lessons', function(req, res) {
    var lesson = req.body;
    Lesson.create(lesson, function(err, lesson) {
        if (err) {
            return res.status(500).json({ err: err.message });
        }
        res.json({ lesson });
    });
});

lessonRoutes.put('/lessons/:id', function(req, res) {
    var id = req.params.id;
    var lesson = req.body;
    if (lesson && lesson._id !== id) {
        return res.status(500).json({ err: "Ids don't match!" });
    }
    Lesson.findByIdAndUpdate(id, lesson, { new: true }, function(err, lesson) {
        if (err) {
            return res.status(500).json({ err: err.message });
        }
        res.json({ lesson });
    });
});

lessonRoutes.delete('/lessons/:id', function(req, res) {
    var id = req.params.id;
    Lesson.findByIdAndRemove(id, function(err, result) {
        if (err) {
            return res.status(500).json({ err: err.message });
        }
        res.json({ message: 'Lesson Deleted' });
    });
});

module.exports = lessonRoutes;
