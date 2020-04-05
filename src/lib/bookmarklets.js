const bookmarkleter = require('bookmarkleter')

module.exports.prime = (server, port) => bookmarkleter(`
  window.VIDEO_PARTY_SERVER = '${server}:${port}';
  var script = document.createElement('script');
  script.src = '${server}:${port}/prime.js';
  document.body.append(script);
`)
