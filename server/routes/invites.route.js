const express = require('express');
const invitesController = require('../controllers/invites.controller.js');
const invitesValidator = require('../validators/invites.validator.js');
const validate = require('../helpers/validate');

const router = express.Router();

// /api/invites
router
  .route('/:inviteId')
  .get(
    validate(invitesValidator.updateInvite),
    invitesController.updateInvite
  );

module.exports = router;
