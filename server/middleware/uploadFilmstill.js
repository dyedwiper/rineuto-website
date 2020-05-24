const multer = require('multer');
const {
  replaceUmlautsAndSpecialCharacters,
} = require('../utils/stringMethods');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'server/public/filmstills');
  },
  filename: (req, file, cb) => {
    cb(
      null,
      replaceUmlautsAndSpecialCharacters(req.body.title.toLowerCase()) +
        '_' +
        req.body.day +
        '.' +
        file.mimetype.slice(file.mimetype.indexOf('/') + 1)
    );
  },
});

function fileFilter(req, file, cb) {
  if (file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/png') {
    return cb(new Error('mimetype not allowed'), false);
  }
  if (!req.body.day) {
    return cb(new Error('day must not be empty'), false);
  }
  if (!req.body.title) {
    return cb(new Error('title must not be empty'), false);
  }
  cb(null, true);
}

function uploadFilmstill(req, res, next) {
  const upload = multer({
    limits: { fileSize: 1024 * 1024 * 1 },
    fileFilter: fileFilter,
    storage: storage,
  }).single('image');

  upload(req, res, function (err) {
    if (err) {
      return res.status(400).json({ multerError: err.message });
    }
    next();
  });
}

module.exports.uploadFilmstill = uploadFilmstill;
