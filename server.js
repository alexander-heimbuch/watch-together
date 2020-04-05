const express = require('express')
const bookmarklets = require('./src/lib/bookmarklets')
const app = express()

app.set('view engine', 'pug')
app.use(express.static('dist'))
app.get('/', function (_, res) {
  res.render('index', { prime: bookmarklets.prime(process.env.SERVER || 'http://localhost', process.env.PORT || 3000) })
})
const server = require('http').createServer(app)
const io = require('socket.io')(server)

let CLIENTS = []

const dispatch = (client, type) => payload => {
  console.log(`dispatch: ${type} ~>`)

  CLIENTS.filter(({ id }) => client.id !== id).forEach(client => {
    console.log(`   client: ${client.id}`)
    client.emit(type, payload)
  })
}

const disconnect = client => () => {
  console.log(`disconnect: ${client.id}`)
  CLIENTS = CLIENTS.filter(({ id }) => client.id === id)
}

io.on('connection', client => {
  CLIENTS.push(client)
  console.log(`connect: ${client.id}`)
  client.on('play', dispatch(client, 'play'))
  client.on('pause', dispatch(client, 'pause'))
  client.on('updatetime', dispatch(client, 'updatetime'))
  client.on('disconnect', disconnect(client))
});

server.listen(process.env.PORT || 3000)
