const mongoose = require('mongoose')
const Schema = mongoose.Schema

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
        ref: 'Student'
    }],
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