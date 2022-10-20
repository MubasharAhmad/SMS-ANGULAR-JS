const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ClerkSchema = new Schema({
    name: {
        type: String,
        required: true
    },
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
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = Clerk = mongoose.model('Clerk', ClerkSchema)