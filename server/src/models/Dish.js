const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dishSchema = new Schema({
  name: { type: String, required: true },
  date: { type: Date, required: true },
});

const Dish = mongoose.model('Dish', dishSchema);

module.exports = Dish;
