const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const participantTypeSchema = new Schema({
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('ParticipantType', participantTypeSchema);
