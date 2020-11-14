const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi)

module.exports = {
  createNewEvent: {
    body: Joi.object({
      title: Joi.string().required(),
      participantsType: Joi.string().required(),
      nrOfParticipants: Joi.number().required(),
      eventType: Joi.string().required(),
      inviteAll: Joi.boolean().required(),
      location: Joi.string().required(),
      startDateTime: Joi.date().required(),
    }),
  },
};
