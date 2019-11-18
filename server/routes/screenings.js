const router = require('express').Router()
const Screening = require('../models/screenings')

router.get('/', (req, res) => {
  Screening.find()
    .then(screenings => res.json(screenings))
    .catch(err => res.status(404).json(err))
})

module.exports = router
