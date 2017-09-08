import mongoose from 'mongoose'
import meta from '../plugins/SongMeta'

const Schema = mongoose.Schema

var SongSchema = new Schema({
  title: { type: String },
  num: { type: Number },
  book: {
    name: { type: String },
    abbrv: { type: String },
    languages: { type: String, many: true }
  },
  lyrics: { type: String },
  lyrics_Markdown: {
    md: { type: String },
    html: { type: String }
  },
  tags: { type: String, many: true },
  videos: { type: String, many: true },
  references: {
    author: { type: String },
    book: { type: String },
    year: { type: String }
  },
  partitions: { type: String, many: true },
  language: { type: String },
  songId: { type: String }
})

SongSchema.set('timestamps', { createdAt: 'createdAt', updatedAt: 'updatedAt' })
SongSchema.plugin(meta)

module.exports = mongoose.model('Song', SongSchema)
