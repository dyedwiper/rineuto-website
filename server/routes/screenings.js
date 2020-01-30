const router = require('express').Router();
const Screening = require('../models/Screening');
const verifyToken = require('../middleware/verifyToken');
const { validateScreening } = require('../middleware/validation');
const { uploadImage } = require('../middleware/upload');

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

router.post(
  '/',
  verifyToken,
  uploadImage.single('image'),
  validateScreening,
  (req, res) => {
    const newScreening = new Screening({
      ...req.body,
      imageUrl: req.file.path
    });
    newScreening
      .save()
      .then(newScreening => res.json(newScreening))
      .catch(err => res.status(400).json(err));
  }
);

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
