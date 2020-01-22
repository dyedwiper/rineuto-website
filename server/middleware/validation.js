const Joi = require('@hapi/joi');

function validateUser(req, res, next) {
  const userSchema = Joi.object({
    username: Joi.string()
      .min(4)
      .required(),
    password: Joi.string()
      .min(8)
      .required()
  });
  const { error } = userSchema.validate(req.body);
  if (error) {
    return res.status(400).json(error);
  }
  next();
}

module.exports.validateUser = validateUser;
