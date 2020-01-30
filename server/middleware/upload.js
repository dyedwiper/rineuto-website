const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/filmstills');
  },
  filename: (req, file, cb) => {
    cb(
      null,
      new Date().toISOString() +
        '_' +
        req.body.title.toLowerCase().replace(/[^a-z^A-z^0-9]+/g, '_') +
        '.' +
        file.mimetype.slice(file.mimetype.indexOf('/') + 1)
    );
  }
});

function fileFilter(req, file, cb) {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(new Error('mimetype not allowed'), false);
  }
}

const uploadImage = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 },
  fileFilter: fileFilter
});

module.exports.uploadImage = uploadImage;
