const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi)

module.exports = {
  updateInvite: {
    params: Joi.object({
      userId: Joi.objectId().required()
    }),
    query: Joi.object({
      id: Joi.objectId().required(),
      eventId: Joi.objectId().required(),
      status: Joi.number().required()
    }),
  }
};
