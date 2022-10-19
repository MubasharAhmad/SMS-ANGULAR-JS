const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VarificationSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    code:{
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: () => Date.now()
    }
});

module.exports = mongoose.model('varification', VarificationSchema);
