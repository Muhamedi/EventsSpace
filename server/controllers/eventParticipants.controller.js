const EventParticipant = require('../models/eventParticipant.model');
const Event = require('../models/event.model');
const Team = require('../models/team.model');
const { HttpStatusCodes } = require('../enums/enums.js');

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
        { $set: { teamId: teamWhite._id } }
      );
      await EventParticipant.updateMany(
        {
          _id: {
            $in: whiteTeamIds,
          },
        },
        { $set: { teamId: teamBlack._id } }
      );
    }
    res.status(HttpStatusCodes.OK).json({
      success: true,
      message: 'Team participants saved successfully',
    });
  } catch (err) {
    return next(new Error(err));
  }
};
