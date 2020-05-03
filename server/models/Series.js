const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const seriesSchema = new Schema({
  title: { type: String, required: true },
  year: { type: Number, required: true },
  month: { type: Number, required: true },
  posterUrl: { type: String },
});

const Series = mongoose.model('Series', seriesSchema);

module.exports = Series;
