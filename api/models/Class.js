const mongoose = require('mongoose')
const Schema = mongoose.Schema

const SubjectTeacherSchema = new Schema({
    subject: {
        type: Schema.Types.ObjectId,
        ref: 'Subject'
    },
    teacher: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

const ClassSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    students: [{
        type: Schema.Types.ObjectId,
        ref: 'Student',
        default: []
    }],
    subjects: [SubjectTeacherSchema],
    feeperstudent: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = Class = mongoose.model('Class', ClassSchema)