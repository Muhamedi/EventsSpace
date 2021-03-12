const express = require('express');
const groupsController = require('../controllers/groups.controller.js');
const groupsValidator = require('../validators/groups.validator.js');
const validate = require('../helpers/validate');

const router = express.Router();

// /api/groups
router.post(
  validate(groupsValidator.createGroup),
  groupsController.createGroup
);

// /api/groups
router.post(
  validate(groupsValidator.joinGroup),
  groupsController.joinGroup
);

module.exports = router;
