import winston from 'winston'

const logger = new winston.Logger({
  transports: [
    new (winston.transports.Console)({
      colorize: 'all',
      handleExceptions: true,
      json: false,
      timestamp: true
    })
  ],
  exitOnError: false
})

module.exports = logger
module.exports.stream = {
  write: function (message, encoding) {
    logger.info(message)
  }
}