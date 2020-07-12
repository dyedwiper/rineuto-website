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

router.patch('/:id', authenticate, validateQuote, (req, res) => {
  Quote.findByIdAndUpdate(req.params.id, req.body)
    .then(() => res.json('updated successfully'))
    .catch((err) => res.status(400).json(err));
});

router.delete('/:id', authenticate, (req, res) => {
  Quote.findByIdAndDelete(req.params.id)
    .then(() => res.json('deleted succesfully'))
    .catch((err) => res.status(400).json(err));
});

module.exports = router;
