const express = require('express');
const eventController = require('../controllers/Event');

const router = express.Router();

// /api/events/create
router.post('/create', eventController.createNewEvent);

// /api/events/upcoming
router.get('/upcoming', eventController.getUpcomingEvents);


module.exports = router;