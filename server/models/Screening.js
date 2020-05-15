const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const screeningSchema = new Schema({
  title: { type: String },
  date: { type: Date },
  director: { type: String },
  imageUrl: { type: String },
  length: { type: Number },
  country: { type: String },
  year: { type: Number },
  version: { type: String },
  synopsis: { type: String },
  series: { type: Schema.Types.ObjectId, ref: 'Series' },
  links: { type: [String] },
});

const Screening = mongoose.model('Screening', screeningSchema);

module.exports = Screening;
