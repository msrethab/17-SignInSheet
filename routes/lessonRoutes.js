var express = require('express');
var app = express();
var moment = require('moment'); //importing moment for datetime parsing
moment().format();
var Lesson = require('../app/models/lesson');
var mid = require('../middleware/middleware');

// lesson GET, POST, PUT, and DELETE routes

var lessonRoutes = express.Router();

// get route defaults to search for all lessons signed in today
lessonRoutes.get('/lessons', function(req, res) {
    var start = new Date();
    start.setHours(0, 0, 0, 0);

    var end = new Date();
    end.setHours(23, 59, 59, 999);

    Lesson.find({ signedInDate: { "$gte": start, "$lt": end }, archived: false }, function(err, lessons) {
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
        Lesson.findById(lesson._id, function(err, newLesson) {
            if (err) {
                return res.status(500).json({ err: err.message });
            }
            res.json({ newLesson });
        });
    });
});

lessonRoutes.post('/lessons/search', function(req, res) {
    var search = req.body;
    var searchQuery = { signedInDate: { $gte: search.startDate, $lt: search.endDate }, archived: false };

    if (search.teacherId && search.teacherId !== '') {
        searchQuery.teacher = search.teacherId;
    }
    if (search.student && search.student !== '') {
        searchQuery.student = search.student._id;
    }
    if (search.duration && search.duration !== '') {
        searchQuery.duration = search.duration.value;
    }

    Lesson.find(searchQuery, function(err, lessons) {
        if (err) {
            return res.status(500).json({ message: err.message });
        }
        res.json({ lessons });
    });
});

lessonRoutes.get('/lessons/search/count', function(req, res) {

    var month = req.query.month;

    Lesson.aggregate([
        {
            $match: {
                signedInDate: { $gte: moment(month).startOf('month').toDate(), $lt: moment(month).endOf('month').toDate()},
                archived: false
            }
        },
        {
            $group: {
                _id: '$teacher',
                count: {$sum: 1}
            }
        }
    ], function(err, lessons) {
        if (err) {
            return res.status(500).json({ message: err.message });
        }
        res.json({ lessons });
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
