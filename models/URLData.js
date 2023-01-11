const mongoose = require('mongoose')
const Schema = mongooss.Schema

const UrlSchema = new Schema({
  url: {
    type: String,
    required: true
  },
  shortenUrl: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('URL', UrlSchema)