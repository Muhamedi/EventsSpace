const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const groupJoinRequestSchema = new Schema(
  {
    groupId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Group',
    },
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    statusId: {
      type: Number,
      required: true,
      ref: 'InvitationStatus',
    },
    isActive: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('GroupJoinRequest', groupJoinRequestSchema);
