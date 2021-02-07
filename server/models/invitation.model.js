const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const invitationSchema = new Schema(
  {
    eventId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Event',
    },
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    statusId: {
      type: Number,
      ref: 'InvitationStatus',
      required: true,
    },
    expiration: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Invitation', invitationSchema);
