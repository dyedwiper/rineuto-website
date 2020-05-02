const router = require('express').Router();
const Series = require('../models/Series');

router.get('/', (req, res) => {
  Series.find()
    .then((series) => res.json(series))
    .catch((err) => console.error(err));
});

router.post('/', (req, res) => {
  const newSeries = new Series(req.body);
  newSeries
    .save()
    .then((series) => res.json(series))
    .catch((err) => console.error(err));
});

module.exports = router;
