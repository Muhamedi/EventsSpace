const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const accountActivationSchema = new Schema({
    UserId: {
        type: String,
        required: true
    },
    Link: {
        type: String,
        required: true
    },
    isValid: {
        type: Boolean,
        required: true
    }
});

module.exports = mongoose.model('AccountActivation', accountActivationSchema);