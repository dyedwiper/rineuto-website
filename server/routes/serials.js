const router = require('express').Router();
const Serial = require('../models/Serial');
const authenticate = require('../middleware/authenticate');
const { validateSerial } = require('../middleware/validation');
const { readFileWithMulter } = require('../middleware/readFileWithMulter');
const { uploadToCloudinary } = require('../middleware/uploadToCloudinary');
const { STANDARD_ERROR_MESSAGE, STANDARD_SUCCESS_MESSAGE } = require('../constants');

router.get('/', (req, res) => {
  Serial.find()
    .then((serials) => res.json(serials))
    .catch(() => res.status(500).json(STANDARD_ERROR_MESSAGE));
});

router.post('/', authenticate, readFileWithMulter, uploadToCloudinary, validateSerial, (req, res) => {
  new Serial(req.body)
    .save()
    .then((serial) => res.status(201).json(serial))
    .catch(() => res.status(500).json(STANDARD_ERROR_MESSAGE));
});

router.patch('/:id', authenticate, readFileWithMulter, uploadToCloudinary, validateSerial, (req, res) => {
  Serial.findByIdAndUpdate(req.params.id, req.body)
    .then((serial) => res.json(serial))
    .catch(() => res.status(500).json(STANDARD_ERROR_MESSAGE));
});

router.delete('/:id', authenticate, (req, res) => {
  Serial.findByIdAndDelete(req.params.id)
    .then(() => res.json(STANDARD_SUCCESS_MESSAGE))
    .catch(() => res.status(500).json(STANDARD_ERROR_MESSAGE));
});

module.exports = router;
