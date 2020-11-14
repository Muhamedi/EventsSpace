const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    participantsType: {
      type: Number,
      ref: 'ParticipantType',
      required: true,
    },
    nrOfParticipants: {
      type: Number,
      required: true,
    },
    eventType: {
      type: Number,
      ref: 'EventType',
      required: true,
    },
    inviteAll: {
      type: Boolean,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    startDateTime: {
      type: Date,
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
