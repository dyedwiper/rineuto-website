const DatauriParser = require('datauri/parser');
const path = require('path');
const { config, uploader } = require('cloudinary').v2;
const { replaceUmlautsAndSpecialCharacters } = require('../utils/stringMethods');

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
    .upload(file, {
      public_id: computeCloudinaryPublicId(req),
    })
    .then((result) => {
      req.file.path = result.url;
      next();
    })
    .catch((err) => {
      res.status(400).json({ cloudinaryError: err.message });
    });
}

function computeCloudinaryPublicId(req) {
  let cloudinaryPublicId;
  if (req.baseUrl.includes('notices')) {
    cloudinaryPublicId =
      'rineuto/notices/' + req.body.date + '_' + replaceUmlautsAndSpecialCharacters(req.body.title.toLowerCase());
  } else if (req.baseUrl.includes('serials')) {
    cloudinaryPublicId =
      'rineuto/serials/' + req.body.year + '/' + replaceUmlautsAndSpecialCharacters(req.body.title.toLowerCase());
  } else {
    cloudinaryPublicId =
      'rineuto/screenings/' +
      req.body.day.slice(0, 4) +
      '/' +
      replaceUmlautsAndSpecialCharacters(req.body.title.toLowerCase()) +
      '_' +
      req.body.day;
  }
  return cloudinaryPublicId;
}

module.exports.uploadToCloudinary = uploadToCloudinary;
