var express = require('express');
var app = express();
var Teacher = require('../app/models/teacher');
var mid = require('../middleware/middleware');

// teacher GET, POST, PUT, and DELETE routes

var teacherRoutes = express.Router();

teacherRoutes.get('/teachers', function(req, res) {
  Teacher.find({}, function(err, teachers) {
    if (err) {
      return res.status(500).json({ message: err.message });
    }
    res.json({ teachers: teachers });
  });
});

teacherRoutes.post('/teachers', function(req, res) {
  var teacher = req.body;
  Teacher.create(teacher, function(err, teacher) {
    if (err) {
      return res.status(500).json({ err: err.message });
    }
    res.json({ 'teacher': teacher, message: 'Teacher Created' });
  });
});

teacherRoutes.put('/teachers/:id', function(req, res) {
  var id = req.params.id;
  var teacher = req.body;
  if (teacher && teacher._id !== id) {
    return res.status(500).json({ err: "Ids don't match!" });
  }
  Teacher.findByIdAndUpdate(id, teacher, {new: true}, function(err, teacher) {
    if (err) {
      return res.status(500).json({ err: err.message });
    }
    res.json({ 'teacher': teacher, message: 'Teacher Updated' });
  });
});

teacherRoutes.delete('/teachers/:id', function(req, res) {
  var id = req.params.id;
  Teacher.findByIdAndRemove(id, function(err, result) {
    if (err) {
      return res.status(500).json({ err: err.message });
    }
    res.json({ message: 'Teacher Deleted' });
  });
});

module.exports = teacherRoutes;