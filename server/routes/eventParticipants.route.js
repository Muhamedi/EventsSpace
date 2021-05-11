const express = require('express');
const eventParticipantsController = require('../controllers/eventParticipants.controller.js');
const eventsParticipantsValidator = require('../validators/eventParticipants.validator.js');
const validate = require('../helpers/validate');

const router = express.Router();

// /api/events/:eventId/users/:userId/status
router
  .route('/events/:eventId/users/:userId/status')
  .get(
    validate(eventsParticipantsValidator.getMyEventStatus),
    eventParticipantsController.getMyEventStatus
  );

// /api/events/:eventId/users/:userId/status
router
  .route('/events/:eventId/users/:userId/status')
  .patch(
    validate(eventsParticipantsValidator.updateMyEventStatus),
    eventParticipantsController.updateMyEventStatus
  );

  // /api/events/:eventId/participants
  router
  .route('/events/:eventId/participants')
  .get(
    validate(eventsParticipantsValidator.getEventTeamParticipants),
    eventParticipantsController.getEventTeamParticipants
  );

// /api/events/:eventId/participants/init
router
  .route('/events/:eventId/participants/init')
  .put(
    validate(eventsParticipantsValidator.initTeamParticipants),
    eventParticipantsController.initTeamParticipants
  );

// /api/events/:eventId/participants
router
  .route('/events/:eventId/participants')
  .delete(
    validate(eventsParticipantsValidator.clearEventTeamParticipants),
    eventParticipantsController.clearEventTeamParticipants
  );

module.exports = router;
