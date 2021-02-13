const Invitation = require('../models/invitation.model');
const EventParticipant = require('../models/eventParticipant.model');
const {
  HttpStatusCodes,
  InvitationStatus,
  ParticipantStatus,
} = require('../enums/enums.js');

exports.updateInvite = async (req, res, next) => {
  const { inviteId } = req.params;
  const { userId, eventId, status } = req.body;
  try {
    const invitation = await Invitation.findOne({
      _id: inviteId,
      expiration: { $gt: new Date() },
      statusId: InvitationStatus.PENDING,
    });
    if (!invitation) {
      return res.status(HttpStatusCodes.NOT_FOUND).json({
        success: false,
        message: 'Invitation is not found or invalid',
      });
    }
    invitation.statusId = Number(status);
    invitation.save();
    const event = new EventParticipant({
      userId,
      eventId,
      statusId: mapParticipantStatus(Number(status)),
      isActive: true,
    });
    event.save();
    return res.status(HttpStatusCodes.OK).json({
      success: true,
      message: 'You have been added as event participant',
    });
  } catch (err) {
    return next(new Error(err));
  }
};

const mapParticipantStatus = invitationStatus => {
  switch (invitationStatus) {
    case InvitationStatus.ACCEPTED:
      return ParticipantStatus.IN;
    case InvitationStatus.REJECTED:
      return ParticipantStatus.OUT;
    case InvitationStatus.NOT_SURE:
      return ParticipantStatus.MAYBE;
    default:
      return InvitationStatus.PENDING;
  }
};
