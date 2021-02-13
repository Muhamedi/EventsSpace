const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventParticipantSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    eventId: {
      type: Schema.Types.ObjectId,
      ref: 'Event',
      required: true,
    },
    teamId: {
      type: Schema.Types.ObjectId,
      ref: 'Team',
    },
    statusId: {
      type: Number,
      ref: 'ParticipantStatus',
      required: true,
    },
    isActive: {
      type: Boolean,
      required: true,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('EventParticipant', eventParticipantSchema);
