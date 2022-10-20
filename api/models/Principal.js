const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PrincipalSchema = new Schema({
    userid: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    phone: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    address: {
        type: String,
        required: true
    }
})

module.exports = Principal = mongoose.model('Principal', PrincipalSchema)
