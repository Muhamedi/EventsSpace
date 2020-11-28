const Invitation = require('../models/invitation.model');
const { HttpStatusCodes } = require('../enums/enums.js');

exports.updateInvite = async (req, res, next) => {
    const { id, eventId, status } = req.query;
    const { userId } = req.query;
    try {
      const invitation = await Invitation.findOneAndUpdate({
        _id: id,
        expiration: { $gt: new Date() },
      });
      if (!invitation) {
        return res.status(HttpStatusCodes.NOT_FOUND).json({
          success: true,
          message: 'Invitation is not found or invalid',
        });
      }
      invitation.status = status;
      invitation.save();
    } catch (err) {
      return next(new Error(err));
    }
  };