const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const screeningSchema = new Schema({
  title: { type: String, required: true },
  date: { type: Date, required: true },
  director: { type: String, required: true },
  imageUrl: { type: String },
  length: { type: Number, required: true },
  country: { type: String, required: true },
  year: { type: Number, required: true },
  version: { type: String },
  synopsis: { type: String, required: true },
  series: { type: Schema.Types.ObjectId, ref: 'Series' },
  links: { type: [String] },
});

const Screening = mongoose.model('Screening', screeningSchema);

module.exports = Screening;
