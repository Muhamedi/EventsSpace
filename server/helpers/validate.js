const { HttpStatusCodes } = require('../enums/enums');

const validate = schema => {
  return (req, res, next) => {
    if (schema.body) {
      const result = schema.body.validate(req.body);
      if (result.error) {
        return res
          .status(HttpStatusCodes.UNPROCESSABLE_ENTITY)
          .json({ success: false, message: result.error });
      }
    }
    if (schema.params) {
      const result = schema.params.validate(req.params);
      if (result.error) {
        return res
          .status(HttpStatusCodes.UNPROCESSABLE_ENTITY)
          .json({ success: false, message: result.error });
      }
    }
    if (schema.query) {
      const result = schema.query.validate(req.query);
      if (result.error) {
        return res
          .status(HttpStatusCodes.UNPROCESSABLE_ENTITY)
          .json({ success: false, message: result.error });
      }
    }
    next();
  };
};

module.exports = validate;