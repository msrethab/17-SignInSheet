var mongoose = require('mongoose');
var Teacher = require('./teacher'); // get mongoose teacher model
var Lesson = require('./lesson'); // get mongoose lesson model

var Schema = mongoose.Schema;

var studentSchema = new mongoose.Schema({
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
    teacher: [{
    	type: Schema.ObjectId,
    	ref: 'Teacher'
    }]
});

var Student = mongoose.model('Student', studentSchema);
module.exports = Student;
