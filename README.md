# strapi-connector-redis

**Redis connector for Redis**

The missing Redis connectorfor for Strapi. By using this third-party (not official Strapi) connector, you can use Redis client on your Strapi instance, therefore you can access your Redis database in your controllers and services.

### How to use?

**1.** Add your Redis configuration to your `config/environments/**/database.json` file:

> Note: This connector uses node-redis so check out: https://github.com/NodeRedis/node-redis for configuration guide.

```javascript
"connections": {
  "redis": {
    "connector": "redis",
      "settings": {
      "db": "0",
      "host": "127.0.0.1",
      "port": 6379
    },
    "debug": true
  },
  // ... more database configurations
}
```

**2** Access your Redis client on the Strapi instance (on controllers or services)

> Note: Redis commands are promisified so no callback is required, it will return a promise

```javascript
const fooValue = await strapi.redis.get('foo')
```
