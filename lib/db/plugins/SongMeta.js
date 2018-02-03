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
            'date.day': day
          }
          let meta = new SongMeta(doc)
          return meta.save()
        }
      }).catch((err) => {
        logger.error(err)
      })
  }
}

module.exports = {
  updateMeta
}