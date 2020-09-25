const express = require('express');
const eventTypesController = require('../controllers/eventTypes.controller.js');

const router = express.Router();

// /api/event-types
router.route('/').get(eventTypesController.getEventTypes);

module.exports = router;