const bookmarkleter = require('bookmarkleter')
const fs = require('fs')

const path = require('path')
const prime = fs.readFileSync(path.resolve('.', 'dist', 'prime.js'))

module.exports.prime = (server, port) => bookmarkleter(`
  window.VIDEO_PARTY_SERVER = '${server}:${port}';
  eval(atob('${Buffer.from(prime).toString('base64')}'));
`)
