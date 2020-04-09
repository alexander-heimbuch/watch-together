const bookmarkleter = require('bookmarkleter')
const config = require('config')

module.exports = bookmarkleter(`
  window.WATCH_TOGETHER_SERVER = '${config.get('root')}';
  var script = document.createElement('script');
  script.src = '${config.get('root')}/watch-together.js';
  document.body.append(script);
`)
