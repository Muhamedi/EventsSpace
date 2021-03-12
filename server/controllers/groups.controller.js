const Group = require('../models/group.model');
const UserGroup = require('../models/userGroup.model');
const GroupJoinRequest = require('../models/groupJoinRequest.model');
const GroupInvitation = require('../models/groupInvitation.model');
const { HttpStatusCodes, InvitationStatus } = require('../enums/enums');
const moment = require('moment');

exports.createGroup = async (req, res, next) => {
  try {
    const { name, description } = req.body;
    const group = new Group({
      name,
      description,
      owner: req.user.id,
      isActive: true,
    });
    const result = group.save();
    if (result) {
      return res.status(HttpStatusCodes.CREATED).json({
        success: true,
        message: 'Group created successfully.',
      });
    }
    return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: 'An error ocurred creating the group.',
    });
  } catch (err) {
    return next(new Error(err));
  }
};

exports.joinGroupRequest = async (req, res, next) => {
  try {
    const { groupId } = req.params;
    const groupJoinRequest = new GroupJoinRequest({
      groupId,
      userId: req.user.Id,
      statusId: InvitationStatus.PENDING,
      isActive: true,
    });
    const result = groupJoinRequest.save();
    if (result) {
      return res.status(HttpStatusCodes.OK).json({
        success: true,
        message: 'Group created successfully.',
      });
    }
    return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: 'An error ocurred creating the group.',
    });
  } catch (err) {
    return next(new Error(err));
  }
};

exports.createGroupInvite = async (req, res, next) => {
  try {
    const { groupId } = req.params;
    const groupInvitation = new GroupInvitation({
      groupId,
      userId: req.user.Id,
      statusId: InvitationStatus.PENDING,
      isActive: true,
      expiration: moment().add(1, 'weeks'),
    });
    const result = groupInvitation.save();
    if (result) {

      //Send email for the invitation

      return res.status(HttpStatusCodes.CREATED).json({
        success: true,
        message: 'Group invite created successfully.',
      });
    }
    return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: 'An error ocurred creating the invite.',
    });
  } catch (err) {
    return next(new Error(err));
  }
};


// accept group invite 

// accept group join request