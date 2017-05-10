const config = require('../config')
const logger = require('../logger')
const mongoose = require('mongoose')
const Promise = require('bluebird')

class DB {
  constructor () {
    mongoose.Promise = Promise
    this.dbAdapter = mongoose
    this.instance = this
    initMongoose(this.dbAdapter)
  }

  start = () => {
    logger.info('Starting database')
    if (config.mongoose.options) {
      logger.info(config.mongoose.options)

      return this.dbAdapter.connect(process.env.MONGOD_URI, config.mongoose.options)
    }
  }

  close = () => {
    logger.info('Closing to database connection')
    this.dbAdapter.connection.close()
  }
  getAdapter = () => {
    return this.dbAdapter
  }
}

var initMongoose = (mongoose) => {
  mongoose.connection.on('connecting', () => {
    logger.info('Connecting to the database')
  })
  mongoose.connection.on('connected', () => {
    logger.info('Connected to the database')
  })
  mongoose.connection.on('open', () => {
    logger.info('onOpen')
  })
  mongoose.connection.on('disconnecting', () => {
    logger.warn('Disconnecting from the database')
  })
  mongoose.connection.on('Disconnected', () => {
    logger.warn('Disconnected from the dataabse')
    mongoose.connect(process.env.MONGO_URI, config.mongoose.options)
  })
  mongoose.connection.on('closed', () => {
    logger.info('DB connection closed')
  })
  mongoose.connection.on('reconnected', () => {
    logger.info('Reconnected to the database')
  })
  mongoose.connection.on('error', (err) => {
    logger.error(`Connection to the database failed with ${err}`)
    mongoose.disconnect()
  })
}

const db = new DB()

module.exports = db
