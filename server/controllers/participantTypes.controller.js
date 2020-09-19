const ParticipantType = require('../models/participantType.model');
const { HttpStatusCodes } = require('../enums/enums.js');

exports.getParticipantTypes = async (req, res, next) => {
  try {
    const participantTypes = ParticipantType.find((err, participantTypes) => {
      if (err) throw new Error(err);
      return res.status(HttpStatusCodes.OK).json({
        success: true,
        participantTypes,
      });
    });
    return participantTypes;
  } catch (err) {
    return next(new Error(err));
  }
};
