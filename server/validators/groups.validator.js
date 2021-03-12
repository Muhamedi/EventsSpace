const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi)

module.exports = {
  createGroup: {
    body: Joi.object({
      name: Joi.string().required(),
      description: Joi.string().required(),
      owner: Joi.objectId().required(),
    }),
  }
};
