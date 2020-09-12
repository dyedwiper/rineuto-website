const router = require('express').Router();
const Serial = require('../models/Serial');
const authenticate = require('../middleware/authenticate');
const { validateSerial } = require('../middleware/validation');
const { readFileWithMulter } = require('../middleware/readFileWithMulter');
const { uploadToCloudinary } = require('../middleware/uploadToCloudinary');

router.get('/', (req, res) => {
  Serial.find()
    .then((serials) => res.json(serials))
    .catch((err) => res.status(500).json(err));
});

router.post('/', authenticate, readFileWithMulter, uploadToCloudinary, validateSerial, (req, res) => {
  new Serial(req.body)
    .save()
    .then((serial) => res.json(serial))
    .catch((err) => res.status(500).json(err));
});

router.patch('/:id', authenticate, readFileWithMulter, uploadToCloudinary, validateSerial, (req, res) => {
  Serial.findByIdAndUpdate(req.params.id, req.body)
    .then(() => res.json('updated successfully'))
    .catch((err) => res.status(400).json(err));
});

router.delete('/:id', authenticate, (req, res) => {
  Serial.findByIdAndDelete(req.params.id)
    .then((deletedSerial) => res.json('Deleted ' + deletedSerial.title))
    .catch((err) => res.status(400).json(err));
});

module.exports = router;
