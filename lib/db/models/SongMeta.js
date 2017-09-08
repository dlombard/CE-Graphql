const mongoose = require('mongoose')
const Schema = require('mongoose').Schema

const schema = new Schema({
  song_id: { type: Schema.Types.ObjectId, ref: 'Song' },
  views: { type: Number, default: 0 },
  date:
  {
    year: { type: Number },
    week: { type: Number },
    day: { type: Number, min: 1, max: 7 },
  }

}, { collection: 'song_meta' });

schema.set('timestamps', { createdAt: 'created_at', updatedAt: 'updated_at' });
schema.set('retainKeyOrder', true);


const model = mongoose.model('Song_Meta', schema)

module.exports = model
