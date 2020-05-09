const router = require('express').Router();
const News = require('../models/News');

router.get('/', (req, res) => {
  News.find()
    .then((news) => res.json(news))
    .catch((err) => res.status(400).json(err));
});

router.post('/', (req, res) => {
  const date = Date.now();
  const newNews = new News({ date, ...req.body });
  newNews
    .save()
    .then((newNews) => res.json(newNews))
    .catch((err) => res.status(400).json(err));
});

module.exports = router;
