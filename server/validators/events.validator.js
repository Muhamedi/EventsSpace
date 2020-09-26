const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi)

module.exports = {
  createNewEvent: {
    body: Joi.object({
      title: Joi.string().required(),
      participantsType: Joi.string().required(),
      nrOfTeams: Joi.number().required(),
      nrOfTeamPlayers: Joi.number().required(),
      eventType: Joi.string().required(),
      location: Joi.string().required(),
      startDateTime: Joi.date().required(),
    }),
  },
};
