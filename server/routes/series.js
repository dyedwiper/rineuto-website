const router = require('express').Router();
const Series = require('../models/Series');

router.get('/', (req, res) => {
  Series.find()
    .then((series) => res.json(series))
    .catch((err) => res.status(400).json(err));
});

router.get('/year/:year', (req, res) => {
  Series.find({ year: req.params.year })
    .then((series) => res.json(series))
    .catch((err) => res.status(400).json(err));
});

router.post('/', (req, res) => {
  const newSeries = new Series(req.body);
  newSeries
    .save()
    .then((series) => res.json(series))
    .catch((err) => res.status(400).json(err));
});

router.patch('/:id', (req, res) => {
  Series.findByIdAndUpdate(req.params.id, req.body)
    .then((updatedSeries) => res.json(updatedSeries))
    .catch((err) => res.status(400).json(err));
});

module.exports = router;
