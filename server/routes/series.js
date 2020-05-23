const router = require('express').Router();
const Series = require('../models/Series');
const authenticate = require('../middleware/authenticate');
const { validateSeries } = require('../middleware/validation');

router.get('/', (req, res) => {
  Series.find()
    .then((series) => res.json(series))
    .catch((err) => res.status(400).json(err));
});

router.post('/', authenticate, validateSeries, (req, res) => {
  const newSeries = new Series(req.body);
  newSeries
    .save()
    .then((series) => res.json(series))
    .catch((err) => res.status(400).json(err));
});

router.patch('/:id', authenticate, validateSeries, (req, res) => {
  Series.findByIdAndUpdate(req.params.id, req.body)
    .then((updatedSeries) => res.json(updatedSeries))
    .catch((err) => res.status(400).json(err));
});

module.exports = router;
