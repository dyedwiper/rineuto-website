const router = require('express').Router();
const Quote = require('../models/Quote');
const authenticate = require('../middleware/authenticate');
const { validateQuote } = require('../middleware/validation');

router.get('/', (req, res) => {
  Quote.find()
    .then((quotes) => res.json(quotes))
    .catch((err) => res.status(400).json(err));
});

router.post('/', authenticate, validateQuote, (req, res) => {
  const newQuote = new Quote(req.body);
  newQuote
    .save()
    .then((newQuote) => res.json(newQuote))
    .catch((err) => res.status(400).json(err));
});

module.exports = router;
