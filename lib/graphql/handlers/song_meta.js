import { trimStart, trim, startsWith } from 'lodash'
import logger from '../../logger'
import {
  unbase64
} from '../../utils/base64.js'
import { connectionFromMongoose } from '../connections/mongooseConnection'
import SongMeta from '../../db/models/SongMeta'


const getTotalViews = (args) => {
  const { after, before, first, last, orderby } = args

  let sort = {}
  let limit
  let where = {}
  let order = trimStart(orderby, '-')

  if (orderby) {
    if (startsWith(orderby, '-')) {
      sort[order] = -1
    } else {
      sort[order] = 1
    }
    delete args.orderby
  }
  /**
   * Graphql Connection Implementation
   */
  if (first) {
    limit = first
    delete args.first
  }
  if (last) {
    limit = last
    sort[order] = -sort[order]
    delete args.last
  }

  if (after) {
    const id = trim(unbase64(after), SongMeta.modelName + ':')
    where['_id'] = { '$gt': id }
    delete args.after
  }
  if (before) {
    const id = trim(unbase64(before), SongMeta.modelName + ':')
    where['_id'] = { '$lt': id }
    delete args.before
  }
  // Temporary measure to ignore GraphQL-Relay connectionArgs and remove null fields
  for (var x in args) {
    if (args[x] === null) {
      delete args[x]
    }
  }
  Object.assign(where, args)
  /**
   * Compute query along with edges and pageInfo
   */
  if (limit !== undefined) {
    return SongMeta.find(where)
      .sort(sort)
      .limit(limit)
      .exec()
      .then((data) => { return connectionFromMongoose(SongMeta, data) })
      .catch((err) => { logger.log('error', err) })
  }

  return SongMeta.find(where)
    .sort(sort)
    .exec()
    .then((data) => { return connectionFromMongoose(SongMeta, data) })
    .catch((err) => { logger.log('error', err) })
}

module.exports = {
  getTotalViews
}
