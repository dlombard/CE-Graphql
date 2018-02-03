import mongoose from 'mongoose'
//import { updateMeta } from '../plugins/SongMeta'

const Schema = mongoose.Schema

const schema = new Schema({
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
  songId: { type: String },
  total_views: { type: Number, min: 0, default: 0 }
})

schema.set('timestamps', { createdAt: 'created_at', updatedAt: 'updated_at' })
//schema.post('findOne', updateMeta)

const model = mongoose.model('Song', schema)
module.exports = model
