const EventParticipant = require('../models/eventParticipant.model');
const { HttpStatusCodes } = require('../enums/enums.js');

// exports.updateMyEventStatus = async (req, res, next) => {
    
// }

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
      eventParticipant,
    });
  } catch (err) {
    return next(new Error(err));
  }
};
