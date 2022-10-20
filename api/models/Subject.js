const mongoose = require('mongoose')
const Schema = mongoose.Schema

const SubjectSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    class: {
        type: Schema.Types.ObjectId,
        ref: 'Class'
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = Subject = mongoose.model('Subject', SubjectSchema)
