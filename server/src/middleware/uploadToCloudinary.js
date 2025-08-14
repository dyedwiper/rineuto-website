const DatauriParser = require('datauri/parser');
const path = require('path');
const { config, uploader } = require('cloudinary').v2;
const { replaceUmlautsAndSpecialCharacters } = require('../utils/stringUtils');
const { STANDARD_ERROR_MESSAGE } = require('../constants');

const parser = new DatauriParser();

function uploadToCloudinary(req, res, next) {
  if (!req.file) {
    return next();
  }
  config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
  const file = parser.format(path.extname(req.file.originalname).toString(), req.file.buffer).content;
  uploader
    .upload(file, { public_id: computeCloudinaryPublicId(req, res) })
    .then((result) => {
      req.body.imageUrl = result.secure_url;
      next();
    })
    .catch(() => {
      res.status(500).json(STANDARD_ERROR_MESSAGE);
    });
}

function computeCloudinaryPublicId(req, res) {
  let cloudinaryPublicId;
  if (req.baseUrl.includes('notices')) {
    if (!req.body.title || !req.body.date) {
      return res.status(422).json({ cloudinaryError: 'Schlagzeile und Datum müssen angegeben sein.' });
    }
    cloudinaryPublicId =
      process.env.CLOUDINARY_BASE_FOLDER +
      '/notices/' +
      req.body.date +
      '_' +
      replaceUmlautsAndSpecialCharacters(req.body.title.toLowerCase());
  } else if (req.baseUrl.includes('serials')) {
    if (!req.body.title || !req.body.year) {
      return res.status(422).json({ cloudinaryError: 'Reihentitel und Jahr müssen angegeben sein.' });
    }
    cloudinaryPublicId =
      process.env.CLOUDINARY_BASE_FOLDER +
      '/serials/' +
      req.body.year +
      '/' +
      'rineuto_plakat_' +
      replaceUmlautsAndSpecialCharacters(req.body.title.toLowerCase());
  } else {
    if (!req.body.title || !req.body.day) {
      return res.status(422).json({ cloudinaryError: 'Filmtitel und Vorführdatum müssen angegeben sein.' });
    }
    cloudinaryPublicId =
      process.env.CLOUDINARY_BASE_FOLDER +
      '/screenings/' +
      req.body.day.slice(0, 4) +
      '/' +
      replaceUmlautsAndSpecialCharacters(req.body.title.toLowerCase()) +
      '_' +
      req.body.day;
  }
  return cloudinaryPublicId;
}

module.exports.uploadToCloudinary = uploadToCloudinary;
