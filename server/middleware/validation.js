const Joi = require('@hapi/joi');

function validateUser(req, res, next) {
  const userSchema = Joi.object({
    username: Joi.string()
      .min(4)
      .required(),
    password: Joi.string()
      .min(8)
      .required(),
    repeat_password: Joi.ref('password'),
    admin: Joi.boolean()
  }).with('password', 'repeat_password');
  const { error } = userSchema.validate(req.body);
  if (error) {
    return res.status(400).json(error);
  }
  next();
}

function validateLogin(req, res, next) {
  const loginSchema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required()
  });
  const { error } = loginSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
}

module.exports.validateUser = validateUser;
module.exports.validateLogin = validateLogin;
