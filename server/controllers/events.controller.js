const Event = require('../models/event.model');
const User = require('../models/user.model');
const moment = require('moment');
const { InvitationStatus } = require('../enums/enums');
const sendEmail = require('../services/sendEmail.service');
const { HttpStatusCodes } = require('../enums/enums.js');
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
      return res.status(HttpStatusCodes.CREATED).json({
        success: true,
        message: 'Event created successfully.',
      });
    }
    if (inviteAll) {
      const users = await User.find().toArray();
      const invitations = [];
      for (user of users) {
        const invitation = new Invitation({
          eventId: event.id,
          userId: user._id,
          invitationStatusId: InvitationStatus.PENDING,
          expiration: event.startDateTime,
        });
        invitations.push(invitation);
        const invitationResult = await Invitation.InsertMany(invitations);
        if (!invitationResult) {
          return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: 'Failed to create invitation.',
          });
        }
      }
      const templateFile = readFile('templates/eventinvitation.html');
      const template = templateFile
        .replace(
          /\[invitationUrl\]/g,
          CONSTANTS.EVENTS_SPACE_CLIENT_BASE_URL.concat(
            `users/${userId}/invitation?id=${invitationId}&eventId=${event.id}`
          )
        )
        .replace(/\[title\]/g, title)
        .replace(/\[location\]/g, location)
        .replace(/\[startDateTime\]/g, startDateTime);

      const emailContent = {
        to: users.map(user => user.email),
        subject: 'Event invitation',
        template,
      };
      sendEmail(emailContent);
    }
  } catch (err) {
    return next(new Error(err));
  }
};

exports.getUpcomingEvents = async (req, res, next) => {
  try {
    const upcomingEvents = await Event.find()
      .populate('eventType')
      .populate('participantsType')
      .populate('createdBy')
      .exec({ startDateTime: { $gt: new Date() } });
    return res.status(HttpStatusCodes.OK).json({
      success: true,
      events: upcomingEvents,
    });
  } catch (err) {
    return next(new Error(err));
  }
};
