const router = require('express').Router();
const News = require('../models/News');
const authenticate = require('../middleware/authenticate');
const { validateNews } = require('../middleware/validation');
const { uploadNewsImage } = require('../middleware/uploadNewsImage');

router.get('/', (req, res) => {
  News.find()
    .then((news) => res.json(news))
    .catch((err) => res.status(400).json(err));
});

router.post('/', authenticate, uploadNewsImage, validateNews, (req, res) => {
  const date = Date.now();
  let newNews;
  if (req.file) {
    newNews = new News({
      date,
      ...req.body,
      imageUrl: req.file.path.slice(req.file.path.indexOf('/news')),
    });
  } else {
    newNews = new News({ date, ...req.body });
  }
  newNews
    .save()
    .then((newNews) => res.json(newNews))
    .catch((err) => res.status(400).json(err));
});

router.patch('/:id', authenticate, uploadNewsImage, validateNews, (req, res) => {
  let newsToUpdate;
  if (req.file) {
    newsToUpdate = {
      ...req.body,
      imageUrl: req.file.path.slice(req.file.path.indexOf('/news')),
    };
  } else {
    newsToUpdate = req.body;
  }
  News.findByIdAndUpdate(req.params.id, newsToUpdate)
    .then(() => res.json('updated successfully'))
    .catch((err) => res.status(400).json(err));
});

router.delete('/:id', authenticate, (req, res) => {
  News.findByIdAndDelete(req.params.id)
    .then((deletedNews) => res.json('Deleted ' + deletedNews.title))
    .catch((err) => res.status(400).json(err));
});

module.exports = router;
