const mongoose = require('mongoose');

const screeningSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type: Date, required: true },
  director: { type: String, required: true },
  imageUrl: { type: String },
  length: { type: Number, required: true },
  country: { type: String, required: true },
  year: { type: Number, required: true },
  version: { type: String },
  synopsis: { type: String, required: true },
  series: { type: String },
  links: { type: [String] },
});

const Screening = mongoose.model('Screening', screeningSchema);

module.exports = Screening;
