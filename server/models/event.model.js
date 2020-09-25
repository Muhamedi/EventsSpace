const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    participantsType: {
      type: String,
      required: true,
    },
    nrOfTeams: {
      type: Number,
      required: true,
    },
    nrOfTeamPlayers: {
      type: Number,
      required: true,
    },
    eventType: {
      type: String,
      required: true,
    },
    startDateTime: {
      type: Date,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    imgUrl: {
      type: String,
      required: true,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    lastModified: {
      type: Date,
      required: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Event', eventSchema);
