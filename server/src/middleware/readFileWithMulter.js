const multer = require('multer');
const { STANDARD_ERROR_MESSAGE } = require('../constants');

const ERROR_MESSAGE_MIMETYPE = 'Nur die Dateiformate JPEG und PNG sind erlaubt.';

function fileFilter(req, file, cb) {
  if (file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/png') {
    return cb(new Error(ERROR_MESSAGE_MIMETYPE), false);
  }

  cb(null, true);
}

function readFileWithMulter(req, res, next) {
  const upload = multer({
    limits: { fileSize: 1024 * 1024 * 1 },
    fileFilter: fileFilter,
    storage: multer.memoryStorage(),
  }).single('image');

  upload(req, res, function (err) {
    if (err?.message === ERROR_MESSAGE_MIMETYPE || err?.code === 'LIMIT_FILE_SIZE') {
      return res.status(422).json({ multerError: err.message });
    } else if (err) {
      return res.status(500).json(STANDARD_ERROR_MESSAGE);
    }

    next();
  });
}

module.exports.readFileWithMulter = readFileWithMulter;
