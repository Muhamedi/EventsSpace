const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi)

module.exports = {
  createNewUser: {
    body: Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      confirmPassword: Joi.string().required().equal(Joi.ref('password')),
    }),
  },
  login: {
    body: Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    }),
  },
  activateUser: {
    params: Joi.object({
      userId: Joi.objectId().required(),
    }),
    query: Joi.object({
      id: Joi.string().required(),
      email: Joi.string().required(),
    })
  }
};
