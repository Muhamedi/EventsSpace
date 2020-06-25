const express = require('express');
const eventsController = require('../controllers/Events');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// /api/events/create
router.post('/create', authMiddleware, eventsController.createNewEvent);

// /api/events/upcoming
router.get('/upcoming', authMiddleware, eventsController.getUpcomingEvents);

module.exports = router;