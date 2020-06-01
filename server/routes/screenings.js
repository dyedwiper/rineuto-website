const router = require('express').Router();
const fs = require('fs');
const Screening = require('../models/Screening');
const authenticate = require('../middleware/authenticate');
const { validateScreening } = require('../middleware/validation');
const { uploadFilmstill } = require('../middleware/uploadFilmstill');
const formatDate = require('../middleware/formatDate');

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

router.post('/', authenticate, uploadFilmstill, validateScreening, formatDate, (req, res) => {
  if (!req.body.serial) {
    req.body.serial = null;
  }
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
});

router.patch('/:id', authenticate, uploadFilmstill, validateScreening, formatDate, (req, res) => {
  let screeningToUpdate;
  if (req.file) {
    screeningToUpdate = {
      ...req.body,
      imageUrl: req.file.path.slice(req.file.path.indexOf('/filmstills')),
    };
  } else {
    screeningToUpdate = req.body;
  }
  Screening.findByIdAndUpdate(req.params.id, screeningToUpdate)
    .then(() => res.json('updated successfully'))
    .catch((err) => res.status(400).json(err));
});

router.delete('/:id', authenticate, (req, res) => {
  Screening.findByIdAndDelete(req.params.id)
    .then((deletedScreening) => {
      if (deletedScreening.imageUrl) {
        fs.unlink('server/public' + deletedScreening.imageUrl, (err) => {
          if (err) throw err;
        });
      }
      res.json('Deleted ' + deletedScreening.title);
    })
    .catch((err) => res.status(400).json(err));
});

module.exports = router;
