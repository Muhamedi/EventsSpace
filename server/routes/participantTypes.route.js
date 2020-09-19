const express = require('express');
const participantTypesController = require('../controllers/participantTypes.controller.js');
const eventsValidator = require('../validators/events.validator.js');

const router = express.Router();

// /api/participant-types
router.route('/').get(participantTypesController.getParticipantTypes);

module.exports = router;