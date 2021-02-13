exports.HttpStatusCodes = {
  OK: 200,
  CREATED: 201,
  ACCEPTED: 202,
  INTERNAL_SERVER_ERROR: 500,
  FORBIDDEN: 403,
  BAD_REQUEST: 400,
  NOT_AUTHENTICATED: 401,
  NOT_FOUND: 404,
  CONFLICT: 409,
  GONE: 410,
  UNPROCESSABLE_ENTITY: 422,
};

exports.InvitationStatus = {
  ACCEPTED: 1,
  PENDING: 2,
  REJECTED: 3,
  NOT_SURE: 4
};

exports.ParticipantStatus = {
  IN: 1,
  OUT: 2,
  MAYBE: 3,
};
