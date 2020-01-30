const mongoose = require('mongoose');

const screeningSchema = new mongoose.Schema({
  title: { type: String },
  date: { type: Date },
  director: { type: String },
  imageUrl: { type: String },
  length: { type: Number },
  country: { type: String },
  year: { type: Number },
  version: { type: String },
  synopsis: { type: String },
  series: { type: String },
  links: { type: [String] }
});

const Screening = mongoose.model('Screening', screeningSchema);

module.exports = Screening;
