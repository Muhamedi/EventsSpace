const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    location:  {
        type: String,
        required: true
    },
    imgUrl:  {
        type: String,
        required: true
    },
    dateCreated:  {
        type: Date,
        required: true
    },
    lastModified:  {
        type: Date,
        required: false
    },
});

module.exports = mongoose.model('Event', eventSchema);