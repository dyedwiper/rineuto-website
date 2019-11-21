const router = require('express').Router()
const Screening = require('../models/screenings')

router.get('/', (req, res) => {
  Screening.find()
    .then(screenings => res.json(screenings))
    .catch(err => res.status(404).json(err))
})

router.post('/', (req, res) => {
  Screening.create(req.body)
    .then(newScreening => res.json(newScreening))
    .catch(err => res.status(400).json(err))
})

router.patch('/', (req, res) => {
  const { id } = req.query
  Screening.findByIdAndUpdate(id, req.body)
    .then(updatedScreening => res.json(updatedScreening))
    .catch(err => res.status(400).json(err))
})

module.exports = router
