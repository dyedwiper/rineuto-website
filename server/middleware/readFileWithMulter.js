const multer = require('multer');

const storage = multer.memoryStorage();
function readFile(req, res, next) {
  const multerUpload = multer({ storage }).single('image');
  multerUpload(req, res, function (err) {
    if (err) {
      return res.status(400).json({ multerError: err.message });
    }
    next();
  });
}

module.exports.readFile = readFile;
