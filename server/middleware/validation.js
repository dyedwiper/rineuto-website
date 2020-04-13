const Joi = require('@hapi/joi').extend(require('@hapi/joi-date'));

function validateUser(req, res, next) {
  const userSchema = Joi.object({
    username: Joi.string().min(4).max(30).required(),
    password: Joi.string().min(8).max(40).required(),
    repeat_password: Joi.ref('password'),
    admin: Joi.boolean(),
  }).with('password', 'repeat_password');
  const { error } = userSchema.validate(req.body);
  if (error) {
    return res.status(400).json(error);
  }
  next();
}

function validateLogin(req, res, next) {
  const loginSchema = Joi.object({
    username: Joi.string().max(30).required(),
    password: Joi.string().max(40).required(),
  });
  const { error } = loginSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
}

function validateScreening(req, res, next) {
  const screeningSchema = Joi.object({
    title: Joi.string().max(50),
    day: Joi.date().format('YYYY-MM-DD').required(),
    time: Joi.string().pattern(/([0-1]\d|[2][0-3]):([0-5]\d)/),
    director: Joi.string().max(50),
    length: Joi.number().integer().positive().max(1440).required(),
    country: Joi.string().max(50),
    year: Joi.number().integer().positive().min(1890).max(10000).required(),
    version: Joi.string().allow('').max(50),
    synopsis: Joi.string().max(2000),
    series: Joi.string().max(50),
    links: Joi.string().allow('').max(200),
  });
  const { error } = screeningSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ joiError: error.details[0].message });
  }
  next();
}

module.exports.validateUser = validateUser;
module.exports.validateLogin = validateLogin;
module.exports.validateScreening = validateScreening;
