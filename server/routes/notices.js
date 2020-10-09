const router = require('express').Router();
const Notice = require('../models/Notice');
const authenticate = require('../middleware/authenticate');
const { validateNotice } = require('../middleware/validation');
const { readFileWithMulter } = require('../middleware/readFileWithMulter');
const { uploadToCloudinary } = require('../middleware/uploadToCloudinary');

router.get('/', (req, res) => {
  Notice.find()
    .then((notices) => res.json(notices))
    .catch((err) => res.status(500).json(err));
});

router.post('/', authenticate, readFileWithMulter, uploadToCloudinary, validateNotice, (req, res) => {
  const date = Date.now();
  new Notice({ date, ...req.body })
    .save()
    .then(() => res.json('Created successfully'))
    .catch((err) => res.status(500).json(err));
});

router.patch('/:id', authenticate, readFileWithMulter, uploadToCloudinary, validateNotice, (req, res) => {
  Notice.findByIdAndUpdate(req.params.id, req.body)
    .then(() => res.json('Updated successfully'))
    .catch((err) => res.status(500).json(err));
});

router.delete('/:id', authenticate, (req, res) => {
  Notice.findByIdAndDelete(req.params.id)
    .then(() => res.json('Deleted succesfully'))
    .catch((err) => res.status(500).json(err));
});

module.exports = router;
