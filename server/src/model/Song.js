const mongoose = require('mongoose')
const Schema = mongoose.Schema

const songSchema = new Schema({
  title: String,
  artist: String,
  genre: String,
  album: String,
  year: Date,
  coverImage: String,
  audio: String,
  likes: {
    type: Number,
    default: 0,
  },
})
const Song = mongoose.model('Song', songSchema)
module.exports = Song
