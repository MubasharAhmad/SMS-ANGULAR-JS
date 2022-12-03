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
    createdDate: {
        type: Date,
        default: Date.now
    },
    addedBy: {
        // email of the user who added the subject
        type: String,
        required: true
    },
    lastModifiedBy: {
        // email of the user who last modified the subject
        type: String,
        required: true
    },
    lastModifiedDate: {
        type: Date,
        default: Date.now
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
})

module.exports = Subject = mongoose.model('Subject', SubjectSchema)
