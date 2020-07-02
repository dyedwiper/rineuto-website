const DatauriParser = require('datauri/parser');
const path = require('path');
const { config, uploader } = require('cloudinary').v2;
const { replaceUmlautsAndSpecialCharacters } = require('../utils/stringMethods');

const parser = new DatauriParser();

function parseFileBuffer(req) {
  return parser.format(path.extname(req.file.originalname).toString(), req.file.buffer);
}

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
      folder: 'rineuto/' + req.baseUrl.slice(5),
      public_id: req.body.date + '_' + replaceUmlautsAndSpecialCharacters(req.body.title.toLowerCase()),
    })
    .then((result) => {
      req.file.path = result.url;
      next();
    })
    .catch((err) => {
      res.status(400).json({ cloudinaryError: err.message });
    });
}

module.exports.uploadToCloudinary = uploadToCloudinary;
module.exports.parseFileBuffer = parseFileBuffer;
