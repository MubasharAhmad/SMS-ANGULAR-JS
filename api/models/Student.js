const mongoose = require('mongoose')
const Schema = mongoose.Schema

const StudentSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
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
    rollNumber: {
        type: Number,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    classes: [{
        type: Schema.Types.ObjectId,
        ref: 'Class'
    }],
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = Student = mongoose.model('Student', StudentSchema)