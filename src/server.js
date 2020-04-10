const debug = require('debug')('watch-together:server')
const fs = require('fs')
const config = require('config')

const https = app => {
  debug(`create https server with certs ${config.get('certs')}`)
  // Certificate
  const privateKey = fs.readFileSync(`${config.get('certs')}/privkey.pem`, 'utf8');
  const certificate = fs.readFileSync(`${config.get('certs')}/cert.pem`, 'utf8');
  const ca = fs.readFileSync(`${config.get('certs')}/chain.pem`, 'utf8');

  const credentials = {
    key: privateKey,
    cert: certificate,
    ca: ca
  };

  return require('https').createServer(credentials, app)
}

const http = app => {
  debug(`create http server`)
  return require('http').createServer(app)
}

module.exports = { https, http }
