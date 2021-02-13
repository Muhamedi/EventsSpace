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

  module.exports = router;
