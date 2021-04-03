const Group = require('../models/group.model');
const User = require('../models/user.model');
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

exports.createGroupInvite = async (req, res, next) => {
  try {
    const { groupId, userId } = req.params;
    const groupInvitation = new GroupInvitation({
      groupId,
      userId,
      statusId: InvitationStatus.PENDING,
      isActive: true,
      expiration: moment().add(1, 'weeks'),
    });
    const result = groupInvitation.save();
    if (result) {
      let user = await User.findById(userId);
      let group = await Group.findById(groupId);
      const templateFile = readFile('templates/groupinvitation.html');
      const template = templateFile
        .replace(
          /\[invitationUrl\]/g,
          CONSTANTS.EVENTS_SPACE_CLIENT_BASE_URL.concat(
            `group-invitation/${groupInvitation._id}`
          )
        )
        .replace(/\[name\]/g, group.name)
        .replace(/\[description\]/g, group.description);
      const emailContent = {
        to: user.email,
        subject: 'Group invitation',
        template,
      };
      sendEmail(emailContent);

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

exports.updateGroupInvite = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const groupInvite = await GroupInvitation.findById(id);
    if (
      !groupInvite ||
      !groupInvite.isActive ||
      groupInvite.statusId !== InvitationStatus.PENDING
    ) {
      return res.status(HttpStatusCodes.NOT_FOUND).json({
        success: false,
        message: 'The invite was not found',
      });
    }
    groupInvite.statusId = status;
    groupInvite.save();
    const userGroup = new UserGroup({
      userId: req.user.id,
      groupId: groupInvite.groupId,
      isActive: true,
    });
    userGroup.save();
    return res.status(HttpStatusCodes.OK).json({
      success: true,
      message: 'Invite updated successfully',
    });
  } catch (err) {
    return next(new Error(err));
  }
};

exports.joinGroupRequest = async (req, res, next) => {
  try {
    const { id } = req.params;
    const groupJoinRequest = new GroupJoinRequest({
      groupId: id,
      userId: req.user.Id,
      statusId: InvitationStatus.PENDING,
      isActive: true,
    });
    const result = groupJoinRequest.save();
    if (result) {
      return res.status(HttpStatusCodes.OK).json({
        success: true,
        message: 'Group request created successfully.',
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

exports.updateJoinRequest = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const groupJoinRequest = await GroupJoinRequest.findById(id);
    if (!groupJoinRequest || groupJoinRequest.statusId !== InvitationStatus.PENDING) {
      return res.status(HttpStatusCodes.NOT_FOUND).json({
        success: false,
        message: 'The request was not found',
      });
    }
    const group = await Group.findById(groupJoinRequest.groupId);
    if(req.user.id !== group.owner) {
      return res.status(HttpStatusCodes.FORBIDDEN).json({
        success: false,
        message: 'Action is forbidden',
      });
    }
    groupJoinRequest.statusId = status;
    groupJoinRequest.save();
    const userGroup = new UserGroup({
      userId: groupJoinRequest.userId,
      groupId: groupJoinRequest.groupId,
      isActive: true,
    });
    userGroup.save();
    return res.status(HttpStatusCodes.OK).json({
      success: true,
      message: 'Group request updated successfully',
    });
  } catch (err) {
    return next(new Error(err));
  }
};

exports.getGroupRequests = async (req, res, next) => {
  try {
    const { id } = req.params;
    const groupRequests = await GroupJoinRequests.find({groupId: id});
    return res.status(HttpStatusCodes.OK).json({
      success: true,
      groupRequests,
    });
  } catch (err) {
    return next(new Error(err));
  }
};
