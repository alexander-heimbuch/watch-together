const bookmarkleter = require('bookmarkleter')

module.exports = (server, port) => bookmarkleter(`
  window.WATCH_TOGETHER_SERVER = '${server}:${port}';
  var script = document.createElement('script');
  script.src = '${server}:${port}/watch-together.js';
  document.body.append(script);
`)
