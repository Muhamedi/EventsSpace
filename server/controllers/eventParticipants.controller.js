const EventParticipant = require('../models/eventParticipant.model');
const Event = require('../models/event.model');
const { HttpStatusCodes } = require('../enums/enums.js');
const mongoose = require('mongoose');

exports.updateMyEventStatus = async (req, res, next) => {
  try {
    const { eventId, userId } = req.params;
    const { statusId } = req.body;
    const event = await Event.findOne({ _id: eventId, isActive: true });
    if(!event) {
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
  const { eventId } = req.params;
  const participants = await EventParticipant.find(
    {
      eventId,
      isActive: true,
    }
  );
  const teamParticipantsNr = Math.floor(participants.length / 2);
  const reminder = participants.length % 2;
  const teamWhite = participants.splice(0, teamParticipantsNr);
  const teamBlack = participants.splice(teamParticipantsNr, teamParticipantsNr + reminder);
  teamWhite.forEach(participant => participant.teamId = mongoose.Types.ObjectId('5cabe64dcf0d4447fa60f5e2'));
  teamBlack.forEach(participant => participant.teamId = mongoose.Types.ObjectId('5cabe64dcf0d4447fa60f5e3'));
  teamWhite.save();
  teamBlack.save();
  //continue
}
