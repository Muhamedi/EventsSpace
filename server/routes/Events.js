const express = require('express');
const eventsController = require('../controllers/Events');

const router = express.Router();

// /api/events/create
router.post('/create', eventsController.createNewEvent);

// /api/events/upcoming
router.get('/upcoming', eventsController.getUpcomingEvents);


module.exports = router;