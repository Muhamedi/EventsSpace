const { HttpStatusCodes } = require('../enums/enums.js');

module.exports = (error, req, res, next) => {
  return res
    .status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
    .json({ success: false, message: error.message });
};
