import logger from '../logger'

const gracefulShutdown = (server) => {
  logger.info('Received kill signal, shutting down gracefully.')
  server.close(function () {
    logger.info('Closed out remaining connections.')
    process.exit()
  })

  setTimeout(function () {
    logger.error('Could not close connections in time, forcefully shutting down')
    process.exit()
  }, 10 * 1000)
}

// listen for TERM signal .e.g. kill 
process.on('SIGTERM', gracefulShutdown)

// listen for INT signal e.g. Ctrl-C
process.on('SIGINT', gracefulShutdown);  