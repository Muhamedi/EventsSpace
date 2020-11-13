const { number } = require('joi');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventTypeSchema = new Schema({
  _id: { 
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('EventType', eventTypeSchema);
