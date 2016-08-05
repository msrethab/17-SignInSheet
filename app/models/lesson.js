var mongoose = require('mongoose');
var autopopulate = require('mongoose-autopopulate');
var Student = require('./student'); // get mongoose student model
var Teacher = require('./teacher'); // get mongoose teacher model

var Schema = mongoose.Schema;

var lessonSchema = new mongoose.Schema({
    teacher: {
        type: Schema.ObjectId,
        ref: 'Teacher',
        required: true,
        autopopulate: true
    },
    student: [{
        type: Schema.ObjectId,
        ref: 'Student',
        required: true,
        autopopulate: true
    }],
    signedInDate:{
        type: Date,
        required: true,
        default: Date.now
    },
    createdDate: {
        type: Date,
        required: true,
        default: Date.now
    }
});

lessonSchema.plugin(autopopulate);

var Lesson = mongoose.model('Lesson', lessonSchema);
module.exports = Lesson;