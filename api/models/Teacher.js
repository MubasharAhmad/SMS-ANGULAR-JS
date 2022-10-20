const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TeacherSchema = new Schema({
    userid: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    age: {
        type: Number,
        required: true
    },
    qualification: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    inerestedSubjects: [{
        type: Schema.Types.ObjectId,
        ref: 'Subject'
    }],
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = Teacher = mongoose.model('Teacher', TeacherSchema)