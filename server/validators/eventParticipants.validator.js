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
  getEventTeamParticipants: {
    params: Joi.object({
      eventId: Joi.objectId().required(),
    }),
  },
  initTeamParticipants: {
    params: Joi.object({
      eventId: Joi.objectId().required(),
    }),
    body: Joi.object({
      teamIds: Joi.array().items(Joi.objectId()).optional(),
    }),
  },
  clearEventTeamParticipants: {
    params: Joi.object({
      eventId: Joi.objectId().required(),
    }),
  },
};
