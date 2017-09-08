const logger = require('../logger')
const mongoose = require('mongoose')

class DbHandler {

  constructor() {

    mongoose.Promise = Promise
    initMongoose(mongoose)

  }

  start() {
    logger.info('Starting database')
    return mongoose.connect(process.env.MONGO_URI, {
      useMongoClient: true,
    })

  }
  close() {
    return mongoose.connection.close()
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
    mongoose.connect(process.env.MONGO_URI)
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
const db = new DbHandler()

module.exports = db;
