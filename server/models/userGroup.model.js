const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userGroupSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    groupId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Group',
    },
    isActive: {
        type: Boolean,
        required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('UserGroup', userGroupSchema);
