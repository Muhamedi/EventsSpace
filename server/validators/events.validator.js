const Joi = require('joi');

module.exports = {
  createNewEvent: {
    body: Joi.object({
      title: Joi.string().required(),
      participantsType: Joi.string().required(),
      nrOfTeams: Joi.number().required(),
      nrOfTeamPlayers: Joi.number().required(),
      type: Joi.string().required(),
      location: Joi.string().required(),
      startDateTime: Joi.date().required(),
    }),
  },
};
