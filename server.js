const express = require('express')
const { get } = require('lodash')
const bookmarklet = require('./src/lib/bookmarklets')
const app = express()

app.set('view engine', 'pug')
app.use(express.static('dist'))
app.get('/health-check', (req, res) => res.sendStatus(200));
app.get('/', function (_, res) {
  res.render('index', { bookmarklet: bookmarklet(process.env.SERVER || 'http://localhost', process.env.PORT || 3000) })
})

const server = require('http').createServer(app)
const io = require('socket.io')(server)

const CLIENTS = {}
const SESSIONS = {}

const sessionClients = session => get(SESSIONS, session, [])
const clientSession = client => get(CLIENTS, client)

const dispatch = (_, type) => ({ session, payload }) => {
  console.log(`dispatch: ${session}:${type} ~>`)

  sessionClients(session).forEach(client => {
    console.log(`   client: ${client.id}`)
    client.emit(type, payload)
  })
}

const disconnect = client => () => {
  console.log(`disconnect: ${client.id}`)
  const session = clientSession(client.id)
  SESSIONS[session] = sessionClients(session).filter(({ id }) => client.id === id)

  if (SESSIONS[session].length === 0) {
    delete SESSIONS[session]
  }
}

const register = client => session => {
  console.log(`register: ${client.id}, session: ${session}`)
  CLIENTS[client.id] = session

  if (sessionClients(session).length > 0) {
    SESSIONS[session].push(client)
    client.emit('role', 'client')
  } else {
    SESSIONS[session] = [client]
    client.emit('role', 'master')
  }
}

io.on('connection', client => {
  console.log(`connect: ${client.id}`)
  client.on('session', register(client))
  client.on('play', dispatch(client, 'play'))
  client.on('pause', dispatch(client, 'pause'))
  client.on('updatetime', dispatch(client, 'updatetime'))
  client.on('disconnect', disconnect(client))
});

server.listen(process.env.PORT || 3000)
