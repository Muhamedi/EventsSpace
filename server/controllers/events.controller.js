const Event = require('../models/event.model');
const { HttpStatusCodes } = require('../enums/enums.js');

exports.createNewEvent = async (req, res, next) => {
  try {
    const {
      title,
      participantsType,
      nrOfTeams,
      nrOfTeamPlayers,
      type,
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
      type,
      location,
      startDateTime,
      imgUrl,
    });

    const result = await event.save();
    if (result) {
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
    const upcomingEvents = Event.find(
      { startDateTime: { $gt: new Date() } },
      (err, events) => {
        if (err) throw new Error(err);
        return res.status(HttpStatusCodes.OK).json({
          success: true,
          events,
        });
      }
    );
    return upcomingEvents;
  } catch (err) {
    return next(new Error(err));
  }
};
