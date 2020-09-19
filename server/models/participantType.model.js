const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const participantTypeSchema = new Schema({
  Id: {
    type: Number,
    required: true,
  },
  Name: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('ParticipantType', participantTypeSchema);
