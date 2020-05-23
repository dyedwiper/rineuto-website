const router = require('express').Router();
const Series = require('../models/Series');
const authenticate = require('../middleware/authenticate');
const { validateSeries } = require('../middleware/validation');
const { uploadPoster } = require('../middleware/uploadPoster');

router.get('/', (req, res) => {
  Series.find()
    .then((series) => res.json(series))
    .catch((err) => res.status(400).json(err));
});

router.post('/', authenticate, uploadPoster, validateSeries, (req, res) => {
  let newSeries;
  if (req.file) {
    newSeries = new Series({
      ...req.body,
      imageUrl: req.file.path.slice(req.file.path.indexOf('/posters')),
    });
  } else {
    newSeries = new Series(req.body);
  }
  newSeries
    .save()
    .then((series) => res.json(series))
    .catch((err) => res.status(400).json(err));
});

router.patch('/:id', authenticate, uploadPoster, validateSeries, (req, res) => {
  let seriesToUpdate;
  if (req.file) {
    seriesToUpdate = {
      ...req.body,
      imageUrl: req.file.path.slice(req.file.path.indexOf('/posters')),
    };
  } else {
    seriesToUpdate = req.body;
  }
  Series.findByIdAndUpdate(req.params.id, seriesToUpdate)
    .then(() => res.json('updated successfully'))
    .catch((err) => res.status(400).json(err));
});

module.exports = router;
