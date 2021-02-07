const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi)

module.exports = {
  updateInvite: {
    params: Joi.object({
      inviteId: Joi.objectId().required()
    }),
    body: Joi.object({
      userId: Joi.objectId().required(),
      eventId: Joi.objectId().required(),
      status: Joi.number().required()
    }),
  }
};
