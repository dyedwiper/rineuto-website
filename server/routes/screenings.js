const router = require('express').Router();
const Screening = require('../models/Screening');
const authenticate = require('../middleware/authenticate');
const { validateScreening } = require('../middleware/validation');
const formatDate = require('../middleware/formatDate');
const { readFileWithMulter } = require('../middleware/readFileWithMulter');
const { uploadToCloudinary } = require('../middleware/uploadToCloudinary');

router.get('/', (req, res) => {
  Screening.find()
    .populate('serial')
    .then((screenings) => res.json(screenings))
    .catch((err) => res.status(404).json(err));
});

router.get('/:id', (req, res) => {
  Screening.findById(req.params.id)
    .populate('serial')
    .then((screening) => res.json(screening))
    .catch((err) => res.status(404).json(err));
});

router.post('/', authenticate, readFileWithMulter, uploadToCloudinary, validateScreening, formatDate, (req, res) => {
  new Screening(req.body)
    .save()
    .then((newScreening) => res.json(newScreening))
    .catch((err) => res.status(400).json(err));
});

router.patch(
  '/:id',
  authenticate,
  readFileWithMulter,
  uploadToCloudinary,
  validateScreening,
  formatDate,
  (req, res) => {
    Screening.findByIdAndUpdate(req.params.id, req.body)
      .then(() => res.json('updated successfully'))
      .catch((err) => res.status(400).json(err));
  }
);

router.delete('/:id', authenticate, (req, res) => {
  Screening.findByIdAndDelete(req.params.id)
    .then((deletedScreening) => res.json('Deleted ' + deletedScreening.title))
    .catch((err) => res.status(400).json(err));
});

module.exports = router;
