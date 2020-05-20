const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    participantsType: {
        type: String,
        required: true
    },
    nrOfTeams: {
        type: Number,
        required: true
    },
    nrOfTeamPlayers:  {
        type: Number,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    startDateTime:  {
        type: Date,
        required: true
    },
    imgUrl:  {
        type: String,
        required: true
    },
    dateCreated:  {
        type: Date,
        default: Date.now,
        required: false
    },
    lastModified:  {
        type: Date,
        required: false
    },
});

module.exports = mongoose.model('Event', eventSchema);