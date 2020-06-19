const express = require('express');
const usersController = require('../controllers/Users');

const router = express.Router();

// /api/users/create
router.post('/create', usersController.createNewUser);

// /api/users/login
router.post('/login', usersController.login);

module.exports = router;