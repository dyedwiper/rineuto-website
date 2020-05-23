const router = require('express').Router();
const Screening = require('../models/Screening');
const authenticate = require('../middleware/authenticate');
const { validateScreening } = require('../middleware/validation');
const { uploadImage } = require('../middleware/upload');
const formatDate = require('../middleware/formatDate');

router.get('/', (req, res) => {
  Screening.find()
    .populate('series')
    .then((screenings) => res.json(screenings))
    .catch((err) => res.status(404).json(err));
});

router.get('/:id', (req, res) => {
  Screening.findById(req.params.id)
    .populate('series')
    .then((screening) => res.json(screening))
    .catch((err) => res.status(404).json(err));
});

router.post(
  '/',
  authenticate,
  uploadImage,
  validateScreening,
  formatDate,
  (req, res) => {
    let newScreening;
    if (req.file) {
      newScreening = new Screening({
        ...req.body,
        imageUrl: req.file.path.slice(req.file.path.indexOf('/filmstills')),
      });
    } else {
      newScreening = new Screening(req.body);
    }
    newScreening
      .save()
      .then((newScreening) => res.json(newScreening))
      .catch((err) => res.status(400).json(err));
  }
);

router.patch(
  '/:id',
  authenticate,
  validateScreening,
  formatDate,
  (req, res) => {
    Screening.findByIdAndUpdate(req.params.id, req.body)
      .then((updatedScreening) => res.json(updatedScreening))
      .catch((err) => res.status(400).json(err));
  }
);

router.delete('/:id', authenticate, (req, res) => {
  Screening.findByIdAndDelete(req.params.id)
    .then((deletedScreening) => res.json('Deleted ' + deletedScreening.title))
    .catch((err) => res.status(400).json(err));
});

module.exports = router;
