const config = {
  mongoose: {
    options: {
      db: { native_parser: true },
      server: {
        poolSize: 1000,
        reconnectTries: Number.MAX_VALUE,
        reconnectInterval: 5000
      }
    }
  }
}
module.exports = config
