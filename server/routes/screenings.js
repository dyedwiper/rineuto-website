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
    .catch((err) => res.status(500).json(err));
});

router.post('/', authenticate, readFileWithMulter, uploadToCloudinary, validateScreening, formatDate, (req, res) => {
  new Screening(req.body)
    .save()
    .then(() => res.json('Created successfully'))
    .catch((err) => res.status(500).json(err));
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
      .then(() => res.json('Updated successfully'))
      .catch((err) => res.status(500).json(err));
  }
);

router.delete('/:id', authenticate, (req, res) => {
  Screening.findByIdAndDelete(req.params.id)
    .then(() => res.json('Deleted successfully'))
    .catch((err) => res.status(500).json(err));
});

module.exports = router;
