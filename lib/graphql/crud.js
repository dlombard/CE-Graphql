import { trimStart, startsWith } from 'lodash'
import logger from '../logger'
import {
  unbase64
} from '../utils/base64.js'
import { connectionFromMongoose } from './connections/mongooseConnection'

var exec = (model, args) => {
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
    where['_id'] = { '$gt': trimStart(unbase64(after), model.modelName) }
    delete args.after
  }
  if (before) {
    where['_id'] = { '$lt': trimStart(unbase64(before), model.modelName) }
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
    return model.find(where)
      .sort(sort)
      .limit(limit)
      .exec()
      .then((data) => { return connectionFromMongoose(model, data) })
      .catch((err) => { logger.log('error', err) })
  }

  return model.find(where)
    .sort(sort)
    .exec()
    .then((data) => { return connectionFromMongoose(model, data) })
    .catch((err) => { logger.log('error', err) })
}



const getById = (model, args) => {
  return model.findById(args.id).then((element) => { return element }).catch((err) => { logger.error(err) })
}

const getAllSongs = (model, args, opts, doc) => {
  let where = {}

  if (args.book === null) {
    delete args.book
  }

  if (args.book) {
    where['book.abbrv'] = args.book
    args['book.abbrv'] = args.book
    delete args.book
  }
  if (args.language === null) {
    delete args.language
  } else {
    where['language'] = args.language
  }

  return exec(model, args)
}

const getSongMeta = (model, args) => {
  args['orderby'] = '-meta.totalViews'
  return exec(model, args, null)
}
exports.getAllSongs = getAllSongs
exports.getById = getById
exports.getSongMeta = getSongMeta
