import moment from 'moment'
import mongoose from 'mongoose'
import logger from '../../logger'

const ObjectId = mongoose.Types.ObjectId
const newMeta = () => {
  let meta = {
    totalViews: 1,
    stats: [{
      year: moment().year(),
      week: moment().isoWeek(),
      day: moment().isoWeekday(),
      views: 1
    }]

  }

  return meta
}

module.exports = exports = (schema, options) => {
  schema.add({
    meta: {
      totalViews: { type: Number, default: 0 },
      stats: [
        {
          year: { type: Number },
          week: { type: Number },
          day: { type: Number, min: 1, max: 7 },
          views: { type: Number }
        }
      ]
    }
  })

  schema.post('findOne', (result) => {
    var lastItem = []
    if (result.meta.stats) {
      lastItem = result.meta.stats.pop()
      logger.warn(`LAST ITEM: ${JSON.stringify(lastItem)}`)
    }
    if (lastItem) {
      if (lastItem.year === moment().year() && lastItem.week === moment().isoWeek() && lastItem.day === moment().isoWeekday()) {
        mongoose.model('Song').findOneAndUpdate({ '_id': ObjectId(result._id), 'meta.stats': { '$elemMatch': { 'year': moment().year(), 'week': moment().isoWeek(), 'day': moment().isoWeekday() } } }, { '$inc': { 'meta.stats.$.views': 1, 'meta.totalViews': 1 } })
          .then((res) => { })
          .catch((err) => { logger.log('error', err) })
      } else {
        const stats = {
          year: moment().year(),
          week: moment().isoWeek(),
          day: moment().isoWeekday(),
          views: 1
        }
        mongoose.model('Song').updateOne({ '_id': ObjectId(result._id) }, { '$addToSet': { 'meta.stats': stats }, '$inc': { 'meta.totalViews': 1 } })
          .then((res) => { })
          .catch((err) => { logger.log('error', err) })
      }
    } else {
      var meta = newMeta()
      logger.warn(`NEW META: ${JSON.stringify(meta)}`)
      mongoose.model('Song').updateOne({ '_id': ObjectId(result._id) }, { '$set': { meta } })
    }
  })
  if (options && options.index) {
    schema.path('meta').index({ 'meta.stats.year': 1, 'meta.stats.week': 1, 'meta.stats.day': 1 }, { unique: true })
    schema.path('meta').index({ 'meta.totalViews': 1 })
  }
}
