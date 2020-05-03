# strapi-connector-redis

**Redis connector for Strapi**

Check out Strapi: [https://github.com/strapi/strapi](https://github.com/strapi/strapi)

The missing Redis connector for Strapi. By using this third-party (not official Strapi) connector, you can use Redis client on your Strapi instance, therefore you can access your Redis database in your controllers and services. (or wherever Strapi instance is available)

> Please note, this plugin is in very early stage, it can happen that frequent updates will happen therefore you should try to update your npm package frequently!

### How to install?

```
npm i strapi-connector-redis -S
```

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

**2.** Access your Redis client on the Strapi instance (on controllers or services)

> Note: Redis commands are promisified so no callback is required, it will return a promise

```javascript
const fooValue = await strapi.redis.get('foo')
```

### Contact me if you

- need help
- want to contribute
- just want to chat about Strapi, React or Javascript or any exciting tech

Hit me up on: zoltan.radics@gmail.com
