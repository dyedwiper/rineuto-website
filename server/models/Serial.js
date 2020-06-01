const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const serialSchema = new Schema({
  title: { type: String, required: true },
  year: { type: Number, required: true },
  month: { type: Number, required: true },
  imageUrl: { type: String },
});

const Serial = mongoose.model('Serial', serialSchema);

module.exports = Serial;
