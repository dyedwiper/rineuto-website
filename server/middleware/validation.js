const Joi = require('@hapi/joi');

function validateUser(req, res, next) {
  const userSchema = Joi.object({
    username: Joi.string()
      .min(4)
      .max(30)
      .required(),
    password: Joi.string()
      .min(8)
      .max(40)
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
    username: Joi.string()
      .max(30)
      .required(),
    password: Joi.string()
      .max(40)
      .required()
  });
  const { error } = loginSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
}

function validateScreening(req, res, next) {
  console.log(req.body);
  const screeningSchema = Joi.object({
    title: Joi.string().max(100),
    date: Joi.date(),
    director: Joi.string().max(100),
    length: Joi.number()
      .integer()
      .positive()
      .max(1000),
    country: Joi.string().max(50),
    year: Joi.number()
      .integer()
      .positive()
      .min(1890)
      .max(10000),
    version: Joi.string().max(50),
    synopsis: Joi.string().max(3000),
    series: Joi.string().max(100),
    links: Joi.array().items(Joi.string().max(1000))
  });
  const { error } = screeningSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
}

module.exports.validateUser = validateUser;
module.exports.validateLogin = validateLogin;
module.exports.validateScreening = validateScreening;
