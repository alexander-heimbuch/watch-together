const debug = require('debug')('watch-together:cache')
const CACHE = {}
const CLIENTS = {}
const { get, set } = require('lodash')

const key = token => Buffer.from(token).toString('base64')

const readCache = token => {
  debug(`cache: get ${token}`)
  return get(CACHE, key(token), [])
}

const addCache = (token, client) => {
  debug(`cache: add client ${client.id} to ${token}`)
  const existing = readCache(token)
  set(CACHE, key(token), [...existing, client])
  set(CLIENTS, client, token)
  return existing
}

const removeCache = clientId => {
  debug(`cache: remove client ${clientId}`)
  const token = get(CLIENTS, clientId)

  if (!token) {
    return
  }

  const clients = readCache(token)
  set(CACHE, token, clients.filter(({ id }) => id !== clientId))
  delete CLIENTS[clientId]
}

module.exports = { add: addCache, get: readCache, remove: removeCache }
