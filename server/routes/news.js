const router = require('express').Router();
const News = require('../models/News');
const authenticate = require('../middleware/authenticate');

router.get('/', (req, res) => {
  News.find()
    .then((news) => res.json(news))
    .catch((err) => res.status(400).json(err));
});

router.post('/', authenticate, (req, res) => {
  const date = Date.now();
  const newNews = new News({ date, ...req.body });
  newNews
    .save()
    .then((newNews) => res.json(newNews))
    .catch((err) => res.status(400).json(err));
});

router.patch('/:id', authenticate, (req, res) => {
  News.findByIdAndUpdate(req.params.id, req.body)
    .then(() => res.json('updated successfully'))
    .catch((err) => res.status(400).json(err));
});

module.exports = router;
