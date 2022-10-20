const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TimeandDaySchema = new Schema({
    day: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    timeperiod: {
        type: String,
        required: true
    }
})


const TimeTableSchema = new Schema({
    class: {
        type: Schema.Types.ObjectId,
        ref: 'Class'
    },
    subject: {
        type: Schema.Types.ObjectId,
        ref: 'Subject'
    },
    teacher: {
        type: Schema.Types.ObjectId,
        ref: 'Teacher'
    },
    date: {
        type: Date,
        default: Date.now
    },
    timeandday: [TimeandDaySchema]
})

module.exports = TimeTable = mongoose.model('TimeTable', TimeTableSchema)