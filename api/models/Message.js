const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        default: ""
    },
    email: {
        type: String,
        required: true
    },
    message: {
        type: String,
        default: false
    },
    date: {
        type: Date,
        default: () => Date.now()
    }
});

module.exports = mongoose.model('message', MessageSchema);
