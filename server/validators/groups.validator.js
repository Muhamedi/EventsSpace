const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi)

module.exports = {
  createGroup: {
    body: Joi.object({
      name: Joi.string().required(),
      description: Joi.string().required(),
    }),
  },
  createGroupInvite: {
    params: Joi.object({
      groupId: Joi.objectId().required(),
      userId: Joi.objectId().required(),
    })
  },
  updateGroupInvite: {
    params: Joi.object({
      id: Joi.objectId().required(),
    }),
    body: Joi.object({
      status: Joi.number().required(),
    }),
  },
  joinGroupRequest: {
    params: Joi.object({
      id: Joi.objectId().required(),
    }),
  },
  updateJoinRequest: {
    params: Joi.object({
      id: Joi.objectId().required(),
    }),
    body: Joi.object({
      status: Joi.number().required(),
    }),
  },
  getGroupRequests: {
    params: Joi.object({
      id: Joi.objectId().required(),
    }),
  }
};
