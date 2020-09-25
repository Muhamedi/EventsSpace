const EventType = require('../models/eventType.model');
const { HttpStatusCodes } = require('../enums/enums.js');

exports.getEventTypes = async (req, res, next) => {
  try {
    const eventTypes = EventType.find((err, eventTypes) => {
      if (err) throw new Error(err);
      return res.status(HttpStatusCodes.OK).json({
        success: true,
        eventTypes,
      });
    });
    return eventTypes;
  } catch (err) {
    return next(new Error(err));
  }
};
