const jwt = require('jsonwebtoken');
const CONSTANTS = require('../constants');
const { HttpStatusCodes } = require('../enums/enums.js');

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    jwt.verify(token, CONSTANTS.EXPRESS_JWT_SECRET, (error, user) => {
      if (error) {
        return res.status(HttpStatusCodes.FORBIDDEN).json({ success: false, message: 'Forbidden' });
      }
      req.user = user;
      next();
    });
  } else {
    res.status(HttpStatusCodes.NOT_AUTHENTICATED).json({ success: false, message: 'Unauthorized' });
  }
};
