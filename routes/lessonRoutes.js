var express = require('express');
var app = express();
var Lesson = require('../app/models/lesson');
var mid = require('../middleware/middleware');

// lesson GET, POST, PUT, and DELETE routes

var lessonRoutes = express.Router();

lessonRoutes.get('/lessons', function(req, res) {
  Lesson.find({}, function(err, lessons) {
    if (err) {
      return res.status(500).json({ message: err.message });
    }
    res.json({ lessons: lessons });
  });
});

lessonRoutes.post('/lessons', function(req, res) {
  var lesson = req.body;
  Lesson.create(lesson, function(err, lesson) {
    if (err) {
      return res.status(500).json({ err: err.message });
    }
    res.json({ 'lesson': lesson, message: 'Lesson Created' });
  });
});

lessonRoutes.put('/lessons/:id', function(req, res) {
  var id = req.params.id;
  var lesson = req.body;
  if (lesson && lesson._id !== id) {
    return res.status(500).json({ err: "Ids don't match!" });
  }
  Lesson.findByIdAndUpdate(id, lesson, {new: true}, function(err, lesson) {
    if (err) {
      return res.status(500).json({ err: err.message });
    }
    res.json({ 'lesson': lesson, message: 'Lesson Updated' });
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