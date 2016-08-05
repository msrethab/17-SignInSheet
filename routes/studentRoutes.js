var express = require('express');
var app = express();
var Student = require('../app/models/student');
var mid = require('../middleware/middleware');

// student GET, POST, PUT, and DELETE routes

var studentRoutes = express.Router();

studentRoutes.get('/students', function(req, res) {
  Student.find({}, function(err, students) {
    if (err) {
      return res.status(500).json({ message: err.message });
    }
    res.json({ students: students });
  });
});

studentRoutes.post('/students', function(req, res) {
  var student = req.body;
  Student.create(student, function(err, student) {
    if (err) {
      return res.status(500).json({ err: err.message });
    }
    res.json({ 'student': student, message: 'Student Created' });
  });
});

studentRoutes.put('/students/:id', function(req, res) {
  var id = req.params.id;
  var student = req.body;
  if (student && student._id !== id) {
    return res.status(500).json({ err: "Ids don't match!" });
  }
  Student.findByIdAndUpdate(id, student, {new: true}, function(err, student) {
    if (err) {
      return res.status(500).json({ err: err.message });
    }
    res.json({ 'student': student, message: 'Student Updated' });
  });
});

studentRoutes.delete('/students/:id', function(req, res) {
  var id = req.params.id;
  Student.findByIdAndRemove(id, function(err, result) {
    if (err) {
      return res.status(500).json({ err: err.message });
    }
    res.json({ message: 'Student Deleted' });
  });
});

module.exports = studentRoutes;