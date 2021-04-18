const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

module.exports = {
  getMyEventStatus: {
    params: Joi.object({
      userId: Joi.objectId().required(),
      eventId: Joi.objectId().required(),
    }),
  },
  updateMyEventStatus: {
    params: Joi.object({
      userId: Joi.objectId().required(),
      eventId: Joi.objectId().required(),
    }),
    body: Joi.object({
      statusId: Joi.number().required(),
    }),
  },
  initParticipantTeams: {
    params: Joi.object({
      eventId: Joi.objectId().required(),
    }),
    body: Joi.object({
      teamIds: Joi.array().items(Joi.objectId()).optional(),
    }),
  },
};
