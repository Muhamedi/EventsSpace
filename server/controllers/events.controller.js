const Event = require('../models/event.model');
const { HttpStatusCodes } = require('../enums/enums.js');
const io = require('../socket');

exports.createNewEvent = async (req, res, next) => {
  try {
    const {
      title,
      participantsType,
      nrOfTeams,
      nrOfTeamPlayers,
      eventType,
      location,
      startDateTime,
    } = req.body;

    const imgUrl =
      'https://www.logolynx.com/images/logolynx/b5/b5e6c595e4c915f3ce0e3e7a50fa68d0.jpeg'; //req.body.imgUrl;

    const event = new Event({
      title,
      text: title,
      participantsType,
      nrOfTeams,
      nrOfTeamPlayers,
      eventType,
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
