const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const accountActivationSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    activationId: {
      type: String,
      required: true,
    },
    expiration: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('AccountActivation', accountActivationSchema);
