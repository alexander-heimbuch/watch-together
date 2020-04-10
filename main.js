const debug = require('debug')('watch-together')
const config = require('config')
const express = require('express')
const { http, https } = require('./src/server')

const bookmarklet = require('./src/lib/bookmarklets')
const app = express()
const cache = require('./src/cache')

app.set('view engine', 'pug')
app.use(express.static('dist'))
app.get('/', function (_, res) {
  res.render('index', { bookmarklet })
})

if (config.get('environment')  === 'development') {
  app.get('/example', function (_, res) {
    res.render('example')
  })
}

const server = config.get('environment') === 'production' ? https(app) : http(app)
const io = require('socket.io')(server)

const dispatch = (_, type) => ({ session, payload }) => {
 debug(`dispatch: ${session}:${type} ~>`)

  cache.get(session).forEach(client => {
   debug(`   client: ${client.id}`)
    client.emit(type, payload)
  })
}

const register = client => session => {
 debug(`register: ${client.id}, session: ${session}`)
  const existing = cache.add(session, client)
  client.emit('role', existing.length === 0 ? 'master' : 'client')
}

const remove = client => () => {
 debug(`remove: ${client.id}`)
  cache.remove(client.id)
}

io.on('connection', client => {
 debug(`connect: ${client.id}`)
  client.on('session', register(client))
  client.on('play', dispatch(client, 'play'))
  client.on('pause', dispatch(client, 'pause'))
  client.on('updatetime', dispatch(client, 'updatetime'))
  client.on('disconnect', remove(client))
});

server.listen(config.get('port'), () => {
 debug('started server on port', config.get('port'))
})
