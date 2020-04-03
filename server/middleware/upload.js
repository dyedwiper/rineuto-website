const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/filmstills');
  },
  filename: (req, file, cb) => {
    cb(
      null,
      req.body.title.toLowerCase().replace(/[^a-z^A-z^0-9]+/g, '_') +
        '_' +
        req.body.day +
        '.' +
        file.mimetype.slice(file.mimetype.indexOf('/') + 1)
    );
  }
});

function fileFilter(req, file, cb) {
  if (file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/png') {
    return cb(new Error('mimetype not allowed'), false);
  }
  if (!req.body.title) {
    return cb(new Error('title must not be empty'), false);
  }
  if (req.body.title.length > 50) {
    return cb(new Error('title too long'), false);
  }
  cb(null, true);
}

const uploadImage = multer({
  limits: { fileSize: 1024 * 1024 * 1 },
  fileFilter: fileFilter,
  storage: storage
}).single('image');

module.exports.uploadImage = uploadImage;
