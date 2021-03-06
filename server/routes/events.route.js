const express = require('express');
const eventsController = require('../controllers/events.controller.js');
const eventsValidator = require('../validators/events.validator.js');
const validate = require('../helpers/validate');

const router = express.Router();

// /api/events/create
router
  .route('/create')
  .post(
    validate(eventsValidator.createNewEvent),
    eventsController.createNewEvent
  );

// /api/events/upcoming
router.route('/upcoming').get(eventsController.getUpcomingEvents);

// /api/events/:eventId/details
router
  .route('/:eventId/details')
  .get(
    validate(eventsValidator.getEventDetails),
    eventsController.getEventDetails
  );

module.exports = router;
