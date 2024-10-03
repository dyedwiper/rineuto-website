const router = require('express').Router();
const Screening = require('../models/Screening');
const authenticate = require('../middleware/authenticate');
const { validateScreening } = require('../middleware/validation');
const formatDate = require('../middleware/formatDate');
const { readFileWithMulter } = require('../middleware/readFileWithMulter');
const { uploadToCloudinary } = require('../middleware/uploadToCloudinary');
const { STANDARD_ERROR_MESSAGE, STANDARD_SUCCESS_MESSAGE } = require('../constants');

router.get('/future', (req, res) => {
  Screening.find({ date: { $gte: new Date() } })
    .sort({ date: 1 })
    .populate('serial')
    .then((screenings) => res.json(screenings))
    .catch(() => res.status(500).json(STANDARD_ERROR_MESSAGE));
});

router.get('/past/year/:year', (req, res) => {
  Screening.find({ date: { $lt: new Date() } })
    .sort({ date: -1 })
    .populate('serial')
    .then((screenings) => {
      const filteredScreenings = screenings.filter((screening) => screening.date.getFullYear() == req.params.year);
      res.json(filteredScreenings);
    })
    .catch(() => res.status(500).json(STANDARD_ERROR_MESSAGE));
});

router.get('/past/years', (req, res) => {
  Screening.find({ date: { $lt: new Date() } })
    .then((screenings) => {
      const years = screenings
        .map((screening) => screening.date.getFullYear())
        .filter((value, index, self) => self.indexOf(value) === index)
        .sort((a, b) => a - b);
      res.json(years);
    })
    .catch(() => res.status(500).json(STANDARD_ERROR_MESSAGE));
});

router.get('/id/:id', (req, res) => {
  Screening.findById(req.params.id)
    .populate('serial')
    .then((screening) => res.json(screening))
    .catch(() => res.status(500).json(STANDARD_ERROR_MESSAGE));
});

router.post('/', authenticate, readFileWithMulter, uploadToCloudinary, validateScreening, formatDate, (req, res) => {
  new Screening(req.body)
    .save()
    .then((screening) => res.status(201).json(screening))
    .catch(() => res.status(500).json(STANDARD_ERROR_MESSAGE));
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
      .then((screening) => res.json(screening))
      .catch(() => res.status(500).json(STANDARD_ERROR_MESSAGE));
  }
);

router.delete('/:id', authenticate, (req, res) => {
  Screening.findByIdAndDelete(req.params.id)
    .then(() => res.json(STANDARD_SUCCESS_MESSAGE))
    .catch(() => res.status(500).json(STANDARD_ERROR_MESSAGE));
});

module.exports = router;
