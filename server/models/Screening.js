const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const screeningSchema = new Schema({
  title: { type: String },
  date: { type: Date },
  director: { type: String },
  imageUrl: { type: String },
  altText: { type: String },
  length: { type: Number },
  country: { type: String },
  year: { type: Number },
  version: { type: String },
  synopsis: { type: String },
  serial: { type: Schema.Types.ObjectId, ref: 'Serial' },
});

const Screening = mongoose.model('Screening', screeningSchema);

module.exports = Screening;
