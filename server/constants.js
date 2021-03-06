﻿const CONSTANTS = {};

CONSTANTS.PORT = process.env.SERVER_PORT || 5000;
CONSTANTS.SALT_ROUNDS = 10;
CONSTANTS.EXPRESS_JWT_SECRET = process.env.EXPRESS_JWT_SECRET
CONSTANTS.TOKEN_EXPIRATION_TIME = process.env.TOKEN_EXPIRATION_TIME
CONSTANTS.SENDGRID_API_KEY = process.env.SENDGRID_API_KEY
CONSTANTS.EVENTS_SPACE_CLIENT_BASE_URL = process.env.EVENTS_SPACE_CLIENT_BASE_URL
CONSTANTS.MONGODB_CONNECTION_STRING = process.env.MONGODB_CONNECTION_STRING;

module.exports = CONSTANTS;
