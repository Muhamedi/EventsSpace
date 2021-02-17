const EventParticipant = require('../models/eventParticipant.model');
const Event = require('../models/event.model');
const User = require('../models/user.model');
const Invitation = require('../models/invitation.model');
const ParticipantStatus = require('../models/participantStatus.model');
const CONSTANTS = require('../constants');
const { HttpStatusCodes, InvitationStatus } = require('../enums/enums');
const sendEmail = require('../services/sendEmail.service');
const { readFile } = require('../helpers/readFile');
const io = require('../socket');

exports.createNewEvent = async (req, res, next) => {
  try {
    const {
      title,
      participantsType,
      nrOfParticipants,
      eventType,
      inviteAll,
      location,
      startDateTime,
    } = req.body;

    const imgUrl =
      'https://www.logolynx.com/images/logolynx/b5/b5e6c595e4c915f3ce0e3e7a50fa68d0.jpeg'; //req.body.imgUrl;

    const event = new Event({
      title,
      text: title,
      participantsType,
      nrOfParticipants,
      eventType,
      inviteAll,
      createdBy: req.user.id,
      location,
      startDateTime,
      imgUrl,
    });
    const result = await event.save();
    if (result) {
      const createdEvent = await Event.findById(result._id)
        .populate('eventType')
        .populate('participantsType')
        .populate('createdBy');
      io.getIO().emit('events', { action: 'create', event: createdEvent });
    }
    if (inviteAll) {
      let users = await User.find({});
      users = users.filter(user => user._id !== req.user.id);
      const invitations = [];
      const templateFile = readFile('templates/eventinvitation.html');
      for (user of users) {
        const invitation = new Invitation({
          eventId: event.id,
          userId: user._id,
          statusId: InvitationStatus.PENDING,
          expiration: event.startDateTime,
        });
        invitations.push(invitation);
        const template = templateFile
          .replace(
            /\[invitationUrl\]/g,
            CONSTANTS.EVENTS_SPACE_CLIENT_BASE_URL.concat(
              `users/${user._id}/invitation?id=${invitation._id}&eventId=${event.id}`
            )
          )
          .replace(/\[title\]/g, title)
          .replace(/\[location\]/g, location)
          .replace(/\[startDateTime\]/g, startDateTime);
        const emailContent = {
          to: user.email,
          subject: 'Event invitation',
          template,
        };
        sendEmail(emailContent);
      }
      const invitationResult = await Invitation.insertMany(invitations);
      if (!invitationResult) {
        return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({
          success: false,
          message: 'Failed to create invitation.',
        });
      }
    }
    return res.status(HttpStatusCodes.CREATED).json({
      success: true,
      message: 'Event created successfully.',
    });
  } catch (err) {
    return next(new Error(err));
  }
};

exports.getUpcomingEvents = async (req, res, next) => {
  try {
    const upcomingEvents = await Event.find({ isActive: true })
      .populate('eventType', 'name')
      .exec({ startDateTime: { $gt: new Date() } });

    return res.status(HttpStatusCodes.OK).json({
      success: true,
      events: upcomingEvents,
    });
  } catch (err) {
    return next(new Error(err));
  }
};

exports.getEventDetails = async (req, res, next) => {
  try {
    const event = await Event.findOne(
      {
        _id: req.params.eventId,
        isActive: true,
      },
      { __v: false }
    )
      .populate('eventType', 'name')
      .populate('participantsType', 'name')
      .populate('createdBy', 'email')
      .exec();

    let participants = await EventParticipant.find(
      {
        eventId: req.params.eventId,
        isActive: true,
      }
    )
      .populate('userId', 'email')
      .populate('statusId', 'name')
      .select('userId statusId createdAt')
      .sort('createdAt');

    participants = participants.map(participant => ({
      _id: participant._id,
      user: { ...participant.userId._doc },
      status: { ...participant.statusId._doc },
      createdAt: participant.createdAt
    }));

    return res.status(HttpStatusCodes.OK).json({
      success: true,
      eventDetails: { event, participants },
    });
  } catch (err) {
    return next(new Error(err));
  }
};
