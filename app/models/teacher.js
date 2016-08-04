var mongoose = require('mongoose');
var Student = require('./student'); // get mongoose Teacher model
// var Lesson = require('./lesson'); // get mongoose Teacher model

var teacherSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    phoneNumber: {
        type: Number,
        required: true,
        trim: true
    },
    address:{
    	type: String,
    	trim: true
    },
    gender:{
    	type: String,
    	trim: true
    },
    student: [{
        type: Number,
        ref: Student}]
});

var Teacher = mongoose.model('Teacher', teacherSchema);
module.exports = Teacher;
