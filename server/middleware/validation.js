const Joi = require('@hapi/joi').extend(require('@hapi/joi-date'));

function validateUser(req, res, next) {
  const userSchema = Joi.object({
    username: Joi.string().min(4).max(20).required(),
    password: Joi.string().min(8).max(40).required(),
    repeat_password: Joi.ref('password'),
    isAdmin: Joi.boolean(),
  }).with('password', 'repeat_password');
  handleError(req, res, next, userSchema);
}

function validateLogin(req, res, next) {
  const loginSchema = Joi.object({
    username: Joi.string().max(20).required(),
    password: Joi.string().max(100).required(),
  });
  handleError(req, res, next, loginSchema);
}

function validateScreening(req, res, next) {
  const screeningSchema = Joi.object({
    title: Joi.string().max(100),
    day: Joi.date().format('YYYY-MM-DD').required(),
    time: Joi.string()
      .pattern(/([0-1]\d|[2][0-3]):([0-5]\d)/)
      .required(),
    director: Joi.string().allow('').max(50),
    imageUrl: Joi.string().allow('').max(300),
    altText: Joi.string().allow('').max(300),
    length: Joi.number().integer().positive().max(1440),
    country: Joi.string().allow('').max(50),
    year: Joi.string().allow('').max(20),
    version: Joi.string().allow('').max(50),
    synopsis: Joi.string().allow('').max(10000),
    special: Joi.string().allow('').max(100),
    serial: Joi.string().allow('').max(50),
  });
  handleError(req, res, next, screeningSchema);
}

function validateSerial(req, res, next) {
  const serialSchema = Joi.object({
    title: Joi.string().max(50),
    year: Joi.number().min(2018).max(10000),
    month: Joi.number().min(1).max(12),
    imageUrl: Joi.string().allow('').max(300),
    altText: Joi.string().allow('').max(300),
  });
  handleError(req, res, next, serialSchema);
}

function validateNotice(req, res, next) {
  const noticeSchema = Joi.object({
    title: Joi.string().max(50),
    date: Joi.date(),
    text: Joi.string().allow('').max(10000),
    imageUrl: Joi.string().allow('').max(300),
    altText: Joi.string().allow('').max(300),
  });
  handleError(req, res, next, noticeSchema);
}

function validateQuote(req, res, next) {
  const quoteSchema = Joi.object({
    text: Joi.string().max(2000),
    author: Joi.string().max(100),
  });
  handleError(req, res, next, quoteSchema);
}

function validateDish(req, res, next) {
  const dishSchema = Joi.object({
    name: Joi.string().max(200),
    date: Joi.date(),
  });
  handleError(req, res, next, dishSchema);
}

function handleError(req, res, next, joiSchema) {
  const { error } = joiSchema.validate(req.body);
  if (error) {
    return res.status(422).json({ joiError: error.details[0].message });
  }
  next();
}

module.exports.validateUser = validateUser;
module.exports.validateLogin = validateLogin;
module.exports.validateScreening = validateScreening;
module.exports.validateSerial = validateSerial;
module.exports.validateNotice = validateNotice;
module.exports.validateQuote = validateQuote;
module.exports.validateDish = validateDish;
