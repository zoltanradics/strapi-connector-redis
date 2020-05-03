'use strict'

const redis = require('redis')
const redisWrapper = require('co-redis')

// Default connection object if config is not provided
const defaults = {
  host: '127.0.0.1',
  port: 6379,
  db: '0',
}

module.exports = function (strapi) {
  // This is the key we are looking up in connections
  const connectionKey = 'redis'
  const middlewareName = 'redis'

  function getConnection(connector) {
    // Get connections from ./config/environments/**/database.json
    const { connections } = strapi.config

    // Check if redis connection is defined
    if (typeof connections[connectionKey] === 'undefined') {
      strapi.log.warn(
        `(connector:${connectionKey}) please provide a valid connection for the redis. Connector is trying to connect with defaults.`
      )
    }

    // Return connection
    return connections[connectionKey] || { settings: defaults }
  }

  async function initialize() {
    // Get connection
    const redisConnection = getConnection()
    // Create client
    const client = redis.createClient(redisConnection.settings)
    // Wrap client with co
    const wrappedClient = redisWrapper(client)

    // Log connection error
    client.on('error', function (error) {
      strapi.log.error(
        `The ${connectionKey} connector could not connect.`,
        error
      )
    })

    if (redisConnection.debug) {
      strapi.log.info(`${middlewareName} has been initialised.`)

      // Log succesful connection
      client.on('connect', function () {
        strapi.log.info(`${middlewareName} has been connected to Redis server.`)
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
