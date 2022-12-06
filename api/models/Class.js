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
    feeperstudent: {
        type: Number,
        required: true
    },
    students: [{
        type: Schema.Types.ObjectId,
        ref: 'Student',
        default: []
    }],
    subjects: {
        type: [{
            subject: {
                type: Schema.Types.ObjectId,
                ref: 'Subject'
            },
            teacher: {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        }],
        default: []
    },
    createdDate: {
        type: Date,
        default: Date.now
    },
    addedBy: {
        // email of the user who added the class
        type: String,
        required: true
    },
    lastModifiedBy: {
        // email of the user who last modified the class
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

module.exports = Class = mongoose.model('Class', ClassSchema)
