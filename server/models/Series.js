const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const seriesSchema = new Schema({
  title: { type: String, required: true },
  year: { type: Number, required: true },
  screenings: [{ type: Schema.Types.ObjectId, ref: 'screenings' }],
  description: { type: String },
  posterUrl: { type: String },
});

const Series = mongoose.model('Series', seriesSchema);

module.exports = Series;
