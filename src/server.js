const debug = require('debug')('watch-together:server')

const https = app => {
  debug(`create https server`)
  return require('https').createServer(app)
}

const http = app => {
  debug(`create http server`)
  return require('http').createServer(app)
}

module.exports = { https, http }
