const express = require('express');
const eventParticipantsController = require('../controllers/eventParticipants.controller.js');
const eventsParticipantsValidator = require('../validators/eventParticipants.validator.js');
const validate = require('../helpers/validate');

const router = express.Router();

// /api/event-participants/:eventId/users/:userId/status
router
  .route('/:eventId/users/:userId/status')
  .get(
    validate(eventsParticipantsValidator.getMyEventStatus),
    eventParticipantsController.getMyEventStatus
  );

// /api/event-participants/:eventId/users/:userId/status
router
  .route('/:eventId/users/:userId/status')
  .patch(
    validate(eventsParticipantsValidator.updateMyEventStatus),
    eventParticipantsController.updateMyEventStatus
  );

// /api/event-participants/:eventId
router
  .route('/:eventId')
  .put(
    validate(eventsParticipantsValidator.initParticipantTeams),
    eventParticipantsController.initParticipantTeams
  );

module.exports = router;
