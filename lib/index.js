'use strict'

const redis = require('redis')
const redisWrapper = require('co-redis')
const { promisify } = require('util')

const defaults = {
  host: '127.0.0.1',
  port: 6379,
  db: 'db0',
}

module.exports = function (strapi) {
  const connectionKey = 'redis'

  function getConnection(connector) {
    // Get connections from ./config/environments/**/database.json
    const { connections } = strapi.config

    // Check if redis connection is defined
    if (typeof connections[connectionKey] === 'undefined') {
      return strapi.log.error(
        `(connector:${connectionKey}) please provide a valid connection for the redis.`
      )
    }

    // Return connection
    return connections[connectionKey] || { settings: defaults }
  }

  async function initialize() {
    // Get connection
    const redisConnection = getConnection()
    console.log(redisConnection.settings)
    // Create client
    const client = redis.createClient(redisConnection.settings)
    // Wrap client with co
    const wrappedClient = redisWrapper(client)

    if (redisConnection.debug) {
      // Log the initialization
      strapi.log.info(`The ${connectionKey} connector is initialised.`)

      // Log succesful connection
      client.on('connect', function () {
        return strapi.log.info(`The ${connectionKey} connector is connected.`)
      })

      // Log connection error
      client.on('error', function () {
        return strapi.log.error(
          `The ${connectionKey} connector could not connect.`
        )
      })
    }

    // Expose Redis on Strapi instance
    strapi.redis = wrappedClient
  }

  return {
    defaults,
    initialize,
  }
}
