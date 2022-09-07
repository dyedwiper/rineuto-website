const router = require('express').Router();
const Dish = require('../models/Dish');
const authenticate = require('../middleware/authenticate');
const { validateDish } = require('../middleware/validation');
const { STANDARD_SUCCESS_MESSAGE, STANDARD_ERROR_MESSAGE } = require('../utils/constants');

router.get('/', (req, res) => {
  Dish.find()
    .then((dishes) => res.json(dishes))
    .catch(() => res.status(500).json(STANDARD_ERROR_MESSAGE));
});

router.post('/', authenticate, validateDish, (req, res) => {
  const newDish = new Dish(req.body);
  newDish
    .save()
    .then((dish) => res.status(201).json(dish))
    .catch(() => res.status(500).json(STANDARD_ERROR_MESSAGE));
});

router.delete('/:id', authenticate, (req, res) => {
  Dish.findByIdAndDelete(req.params.id)
    .then(() => res.json(STANDARD_SUCCESS_MESSAGE))
    .catch(() => res.status(500).json(STANDARD_ERROR_MESSAGE));
});

module.exports = router;
