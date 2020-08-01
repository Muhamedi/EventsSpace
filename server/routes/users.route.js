const express = require('express');
const usersController = require('../controllers/users.controller.js');
const usersValidator = require('../validators/users.validator.js');
const validate = require('../helpers/validate');

const router = express.Router();

// /api/users/create
router
  .route('/create')
  .post(validate(usersValidator.createNewUser), usersController.createNewUser);

// /api/users/login
router
  .route('/login')
  .post(validate(usersValidator.login), usersController.login);

module.exports = router;
