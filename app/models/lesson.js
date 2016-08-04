var mongoose = require('mongoose');
var Student = require('./student'); // get mongoose student model
var Teacher = require('./teacher'); // get mongoose teacher model

var lessonSchema = new mongoose.Schema({
    teacher: {
        type: Teacher,
        required: true
    },
    student: [Student],
    signedInDate:{
        type: Date,
        required: true
    }
    createdDate: {
        type: Date,
        required: true,
        default: Date.now
    }
});

var Lesson = mongoose.model('Lesson', lessonSchema);
module.exports = Lesson;