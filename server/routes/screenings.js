const router = require('express').Router()
const Screening = require('../models/screenings')

router.get('/', (req, res) => {
  Screening.find()
    .then(screenings => res.json(screenings))
    .catch(err => res.status(404).json(err))
})

router.get('/:id', (req, res) => {
  Screening.findById(req.params.id)
    .then(screening => res.json(screening))
    .catch(err => res.status(404).json(err))
})

router.post('/', (req, res) => {
  Screening.create(req.body)
    .then(newScreening => res.json(newScreening))
    .catch(err => res.status(400).json(err))
})

router.patch('/:id', (req, res) => {
  Screening.findByIdAndUpdate(req.params.id, req.body)
    .then(updatedScreening => res.json(updatedScreening))
    .catch(err => res.status(400).json(err))
})

module.exports = router
