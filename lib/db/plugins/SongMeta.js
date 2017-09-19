import SongMeta from '../models/SongMeta'
import Song from '../models/Song'
const moment = require('moment')
const logger = require('../../logger')


const updateMeta = (result) => {
  if (result) {
    const song_id = result._id
    const year = moment.utc().year()
    const week = moment.utc().isoWeek()
    const day = moment.utc().isoWeekday()

    return SongMeta.findOneAndUpdate({ 'song_id': song_id, 'date.year': year, 'date.week': week, 'date.day': day }, { '$inc': { 'views': 1 } }, { 'new': true }).
      then((res) => {
        if (!res) {
          let doc = {
            views: 1,
            song_id: song_id,
            'date.year': year,
            'date.week': week,
            'date.day': day,
          }
          let meta = new SongMeta(doc)
          return meta.save().then(() => {
            return Song.findOneAndUpdate({ '_id': song_id }, { '$inc': { 'total_views': 1 } })
          })
        } else {
          return Song.findOne({ '_id': song_id }).then((doc) => {
            const total_views = doc.total_views + 1
            return Song.update({ '_id': song_id }, { '$set': { 'total_views': total_views } })
          })
        }
      }).catch((err) => {
        logger.error(err)
      })
  }
}

module.exports = {
  updateMeta
}