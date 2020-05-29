const router = require('express').Router();
const Serial = require('../models/Serial');
const authenticate = require('../middleware/authenticate');
const { validateSerial } = require('../middleware/validation');
const { uploadPoster } = require('../middleware/uploadPoster');

router.get('/', (req, res) => {
  Serial.find()
    .then((serials) => res.json(serials))
    .catch((err) => res.status(400).json(err));
});

router.post('/', authenticate, uploadPoster, validateSerial, (req, res) => {
  let newSerial;
  if (req.file) {
    newSerial = new Serial({
      ...req.body,
      imageUrl: req.file.path.slice(req.file.path.indexOf('/posters')),
    });
  } else {
    newSerial = new Serial(req.body);
  }
  newSerial
    .save()
    .then((serial) => res.json(serial))
    .catch((err) => res.status(400).json(err));
});

router.patch('/:id', authenticate, uploadPoster, validateSerial, (req, res) => {
  let serialToUpdate;
  if (req.file) {
    serialToUpdate = {
      ...req.body,
      imageUrl: req.file.path.slice(req.file.path.indexOf('/posters')),
    };
  } else {
    serialToUpdate = req.body;
  }
  Serial.findByIdAndUpdate(req.params.id, serialToUpdate)
    .then(() => res.json('updated successfully'))
    .catch((err) => res.status(400).json(err));
});

router.delete('/:id', authenticate, (req, res) => {
  Serial.findByIdAndDelete(req.params.id)
    .then((deletedSerial) => res.json('Deleted ' + deletedSerial.title))
    .catch((err) => res.status(400).json(err));
});

module.exports = router;
