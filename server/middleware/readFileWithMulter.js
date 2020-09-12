const multer = require('multer');

const storage = multer.memoryStorage();

function fileFilter(req, file, cb) {
  if (file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/png') {
    return cb(new Error('mimetype not allowed'), false);
  }
  if (!req.body.title) {
    return cb(new Error('title must not be empty'), false);
  }
  cb(null, true);
}

function readFileWithMulter(req, res, next) {
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

module.exports.readFileWithMulter = readFileWithMulter;
