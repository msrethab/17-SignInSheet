var mongoose = require('mongoose');
var Student = require('./student'); // get mongoose teacher model
var Lesson = require('./lesson'); // get mongoose lesson model

var Schema = mongoose.Schema;

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
    streetAddress: {
        type: String,
        trim: true
    },
    city: {
        type: String,
        trim: true
    },
    state: {
        type: String,
        trim: true
    },
    zip: {
        type: Number,
        trim: true
    },
    gender:{
    	type: String,
    	trim: true
    },
    independent: Boolean,
    student: [{
        type: Schema.ObjectId,
        ref: 'Student'}]
});

var Teacher = mongoose.model('Teacher', teacherSchema);
module.exports = Teacher;
