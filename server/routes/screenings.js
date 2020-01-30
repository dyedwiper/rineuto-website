const router = require('express').Router();
const multer = require('multer');
const Screening = require('../models/Screening');
const verifyToken = require('../middleware/verifyToken');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/filmstills');
  },
  filename: (req, file, cb) => {
    cb(
      null,
      new Date().toISOString() +
        '_' +
        req.body.title.toLowerCase().replace(/ /g, '_') +
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

const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 },
  fileFilter: fileFilter
});

router.get('/', (req, res) => {
  Screening.find()
    .then(screenings => res.json(screenings))
    .catch(err => res.status(404).json(err));
});

router.get('/:id', (req, res) => {
  Screening.findById(req.params.id)
    .then(screening => res.json(screening))
    .catch(err => res.status(404).json(err));
});

router.post('/', verifyToken, upload.single('image'), (req, res) => {
  console.log(req.file);
  const newScreening = new Screening({ ...req.body, imageUrl: req.file.path });
  newScreening
    .save()
    .then(newScreening => res.json(newScreening))
    .catch(err => res.status(400).json(err));
});

router.patch('/:id', verifyToken, (req, res) => {
  Screening.findByIdAndUpdate(req.params.id, req.body)
    .then(updatedScreening => res.json(updatedScreening))
    .catch(err => res.status(400).json(err));
});

router.delete('/:id', verifyToken, (req, res) => {
  Screening.findByIdAndDelete(req.params.id)
    .then(deletedScreening => res.json(deletedScreening))
    .catch(err => res.status(400).json(err));
});

module.exports = router;
