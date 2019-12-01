const mongoose = require('mongoose')

const screeningSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type: Date, required: true },
  director: { type: String, required: true },
  imageUrl: { type: String, required: true },
  length: { type: Number, required: true },
  country: { type: String, required: true },
  year: { type: Number, required: true },
  version: { type: String, required: true },
  synopsis: { type: String, required: true },
  series: { type: String, required: true },
  links: { type: [String] }
})

const Screening = mongoose.model('Screening', screeningSchema)

module.exports = Screening
