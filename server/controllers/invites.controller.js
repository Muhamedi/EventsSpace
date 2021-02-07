const Invitation = require('../models/invitation.model');
const EventParticipant = require('../models/eventParticipant.model');
const { HttpStatusCodes, InvitationStatus } = require('../enums/enums.js');

exports.updateInvite = async (req, res, next) => {
  const { inviteId } = req.params;
  const { userId, eventId, status } = req.body;
  try {
    const invitation = await Invitation.findOneAndUpdate({
      _id: inviteId,
      expiration: { $gt: new Date() },
      status: InvitationStatus.PENDING,
    });
    if (!invitation) {
      return res.status(HttpStatusCodes.NOT_FOUND).json({
        success: true,
        message: 'Invitation is not found or invalid',
      });
    }
    invitation.status = status;
    invitation.save();
    const event = new EventParticipant({
      userId,
      eventId,
      isActive: true,
    });
    event.save();
  } catch (err) {
    return next(new Error(err));
  }
};
