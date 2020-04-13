const express = require('express');
const eventController = require('../controllers/Event');

const router = express.Router();

// /api/event/create
router.post('/create', eventController.createNewEvent);


module.exports = router;