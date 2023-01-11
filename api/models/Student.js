const mongoose = require('mongoose')
const Schema = mongoose.Schema

const StudentSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    fathername: {
        type: String,
        required: true
    },
    fatheroccupation: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    rollnumber: {
        type: Number,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    classId: {
        type: Schema.Types.ObjectId,
        ref: 'Class',
        required: true
    },
    addedBy: {
        type: String,
        required: true
    },
    addDate: {
        type: Date,
        default: Date.now
    },
    modifiedDate: {
        type: Date,
        default: Date.now
    }
})

module.exports = Student = mongoose.model('Student', StudentSchema)