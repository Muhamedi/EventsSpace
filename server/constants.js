﻿const CONSTANTS = {};

CONSTANTS.PORT = process.env.SERVER_PORT || 5000;
CONSTANTS.SALT_ROUNDS = 10;
CONSTANTS.EXPRESS_JWT_SECRET = process.env.EXPRESS_JWT_SECRET

module.exports = CONSTANTS;
