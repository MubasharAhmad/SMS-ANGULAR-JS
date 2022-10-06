const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    isActived: {
        type: Boolean,
        default: false
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: () => Date.now()
    }
});

module.exports = mongoose.model('user', UserSchema);
