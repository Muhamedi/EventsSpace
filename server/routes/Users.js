const express = require('express');
const usersController = require('../controllers/Users');

const router = express.Router();

// /api/users/create
router.post('/create', usersController.createNewUser);

module.exports = router;