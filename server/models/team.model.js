const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const teamSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
      default: '#fff'
    },
    isActive: {
      type: Boolean,
      required: true,
      default: true
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Team', teamSchema);
