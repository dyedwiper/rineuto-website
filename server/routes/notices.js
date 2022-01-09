const router = require('express').Router();
const Notice = require('../models/Notice');
const authenticate = require('../middleware/authenticate');
const { validateNotice } = require('../middleware/validation');
const { readFileWithMulter } = require('../middleware/readFileWithMulter');
const { uploadToCloudinary } = require('../middleware/uploadToCloudinary');
const { STANDARD_ERROR_MESSAGE, STANDARD_SUCCESS_MESSAGE } = require('../utils/constants');

router.get('/', (req, res) => {
  Notice.find()
    .then((notices) => res.json(notices))
    .catch(() => res.status(500).json(STANDARD_ERROR_MESSAGE));
});

router.post('/', authenticate, readFileWithMulter, uploadToCloudinary, validateNotice, (req, res) => {
  const date = Date.now();
  new Notice({ date, ...req.body })
    .save()
    .then((notice) => res.status(201).json(notice))
    .catch(() => res.status(500).json(STANDARD_ERROR_MESSAGE));
});

router.patch('/:id', authenticate, readFileWithMulter, uploadToCloudinary, validateNotice, (req, res) => {
  Notice.findByIdAndUpdate(req.params.id, req.body)
    .then((notice) => res.json(notice))
    .catch(() => res.status(500).json(STANDARD_ERROR_MESSAGE));
});

router.delete('/:id', authenticate, (req, res) => {
  Notice.findByIdAndDelete(req.params.id)
    .then(() => res.json(STANDARD_SUCCESS_MESSAGE))
    .catch(() => res.status(500).json(STANDARD_ERROR_MESSAGE));
});

module.exports = router;
