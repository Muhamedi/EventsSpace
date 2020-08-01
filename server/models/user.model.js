const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    dateCreated:  {
        type: Date,
        default: Date.now,
        required: true
    },
});

module.exports = mongoose.model('User', userSchema);