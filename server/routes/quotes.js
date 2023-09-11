const router = require('express').Router();
const Quote = require('../models/Quote');
const authenticate = require('../middleware/authenticate');
const { validateQuote } = require('../middleware/validation');
const { STANDARD_SUCCESS_MESSAGE, STANDARD_ERROR_MESSAGE } = require('../constants');

router.get('/', (req, res) => {
  Quote.find()
    .then((quotes) => res.json(quotes))
    .catch(() => res.status(500).json(STANDARD_ERROR_MESSAGE));
});

router.post('/', authenticate, validateQuote, (req, res) => {
  const newQuote = new Quote(req.body);
  newQuote
    .save()
    .then((quote) => res.status(201).json(quote))
    .catch(() => res.status(500).json(STANDARD_ERROR_MESSAGE));
});

router.patch('/:id', authenticate, validateQuote, (req, res) => {
  Quote.findByIdAndUpdate(req.params.id, req.body)
    .then((quote) => res.json(quote))
    .catch(() => res.status(500).json(STANDARD_ERROR_MESSAGE));
});

router.delete('/:id', authenticate, (req, res) => {
  Quote.findByIdAndDelete(req.params.id)
    .then(() => res.json(STANDARD_SUCCESS_MESSAGE))
    .catch(() => res.status(500).json(STANDARD_ERROR_MESSAGE));
});

module.exports = router;
