const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const newsSchema = new Schema({
  title: { type: String, required: true },
  date: { type: Date, required: true },
  imageUrl: { type: String },
  text: { type: String, required: true },
});

const News = mongoose.model('news', newsSchema);

module.exports = News;
