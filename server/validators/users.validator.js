const Joi = require('joi');

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
};
