const EventParticipant = require('../models/eventParticipant.model');
const Event = require('../models/event.model');
const Team = require('../models/team.model');
const User = require('../models/user.model');
const { HttpStatusCodes, InvitationStatus } = require('../enums/enums.js');
const ObjectId = require('mongoose').Types.ObjectId;

exports.updateMyEventStatus = async (req, res, next) => {
  try {
    const { eventId, userId } = req.params;
    const { statusId } = req.body;
    const event = await Event.findOne({ _id: eventId, isActive: true });
    if (!event) {
      return res.status(HttpStatusCodes.NOT_FOUND).json({
        success: false,
        message: 'Event not found',
      });
    }
    const eventParticipant = await EventParticipant.findOne({
      eventId,
      userId,
      isActive: true,
    });
    if (!eventParticipant) {
      const newEventParticipant = new EventParticipant({
        userId,
        eventId,
        statusId: statusId,
        isActive: true,
      });
      newEventParticipant.save();
    } else {
      eventParticipant.statusId = statusId;
      eventParticipant.save();
    }
    event.updatedAt = new Date();
    event.save();
    return res.status(HttpStatusCodes.OK).json({
      success: true,
      message: 'Event status updated successfully',
    });
  } catch (err) {
    return next(new Error(err));
  }
};

exports.getMyEventStatus = async (req, res, next) => {
  try {
    const { eventId, userId } = req.params;
    const eventParticipant = await EventParticipant.findOne({
      eventId,
      userId,
      isActive: true,
    })
      .populate('statusId', 'name')
      .select('statusId');

    if (!eventParticipant) {
      return res.status(HttpStatusCodes.NOT_FOUND).json({
        success: false,
        message: 'Event not found',
      });
    }
    res.status(HttpStatusCodes.OK).json({
      success: true,
      status: eventParticipant.statusId,
    });
  } catch (err) {
    return next(new Error(err));
  }
};

exports.getEventTeamMembers = async (req, res, next) => {
  try {
    const { eventId } = req.params;

    const participants = await EventParticipant.aggregate([
      {
        $match: {
          teamId: { $ne: null },
          eventId: { $eq: ObjectId(eventId) },
          statusId: { $eq: InvitationStatus.ACCEPTED },
          isActive: true,
        },
      },
      {
        $group: {
          _id: '$teamId',
          team: {
            $push: { userId: '$userId' },
          },
        },
      },
    ]);

    await User.populate(participants, {
      path: 'team.userId',
      select: 'firstName lastName',
    });
    await Team.populate(participants, { path: '_id', select: 'name color' });

    var teams = participants.map(participant => ({
      team: { ...participant._id._doc },
      members: participant.team.map(member => ({
        _id: member.userId._id,
        firstName: member.userId.firstName,
        lastName: member.userId.lastName,
      })),
    }));

    res.status(HttpStatusCodes.OK).json({
      success: true,
      teams,
    });
  } catch (err) {
    return next(new Error(err));
  }
};

exports.initParticipantTeams = async (req, res, next) => {
  try {
    const { eventId } = req.params;
    const { teamIds } = req.body;
    if (!teamIds) {
      let teamWhite = await Team.findOne({ name: 'Team White' });
      let teamBlack = await Team.findOne({ name: 'Team Black' });
      if (!teamWhite) {
        teamWhite = new Team({ name: 'Team White', color: '#fff' });
        teamWhite.save();
      }
      if (!teamBlack) {
        teamBlack = new Team({ name: 'Team Black', color: '#000' });
        teamBlack.save();
      }
      const participants = await EventParticipant.find({
        eventId,
        isActive: true,
      });
      const participantIds = participants.map(x => x.id);
      const teamParticipantsNr = Math.floor(participantIds.length / 2);
      const blackTeamIds = participantIds.slice(0, teamParticipantsNr);
      const whiteTeamIds = participantIds.slice(teamParticipantsNr);
      await EventParticipant.updateMany(
        {
          _id: {
            $in: blackTeamIds,
          },
        },
        { $set: { teamId: teamBlack._id } }
      );
      await EventParticipant.updateMany(
        {
          _id: {
            $in: whiteTeamIds,
          },
        },
        { $set: { teamId: teamWhite._id } }
      );
      const teamParticipants = await EventParticipant.find({
        eventId: eventId,
        isActive: true,
      })
        .populate('userId', 'firstName lastName')
        .select('userId teamId');

      const firstTeam = teamParticipants.filter(x =>
        x.teamId.equals(teamWhite._id)
      );
      const secondTeam = teamParticipants.filter(x =>
        x.teamId.equals(teamBlack._id)
      );

      res.status(HttpStatusCodes.OK).json({
        success: true,
        response: {
          firstTeam,
          secondTeam,
        },
      });
    } else {
      res.status(HttpStatusCodes.OK).json({
        success: true,
      });
    }
  } catch (err) {
    return next(new Error(err));
  }
};
