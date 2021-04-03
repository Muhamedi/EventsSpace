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

// /api/groups/{:groupId}/users/{:userId}/invite
router
  .route('/:groupId/users/:userId/invite')
  .post(
    validate(groupsValidator.createGroupInvite),
    groupsController.createGroupInvite
  );

// /api/groups/invites/:id/update
router
  .route('/invites/:id/update')
  .put(
    validate(groupsValidator.updateGroupInvite),
    groupsController.updateGroupInvite
  );

// /api/groups/:id/join
router
  .route('/:id/join')
  .post(
    validate(groupsValidator.joinGroupRequest),
    groupsController.joinGroupRequest
  );

// /api/groups/:id/join-requests
router
  .route('/:id/join-requests')
  .get(
    validate(groupsValidator.getGroupRequests),
    groupsController.getGroupRequests
  );

// /api/groups/:id/join
router
  .route('requests/:id/update')
  .put(
    validate(groupsValidator.updateJoinRequest),
    groupsController.updateJoinRequest
  );

module.exports = router;
