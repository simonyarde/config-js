# Config

- Merge one or more dicts of replacement vars.
- Error if token name not found in vars.

```js
import { Config } from '@simonyarde/config'
```

```js
const envDefaults = {
    'PORT': '443',
    'DB_CONNECTION': 'https://localhost:4321',
    'CLIENT_SECRET': ''
}
```

```js
let config = Config.fromFile(
    './config.json', envDefaults, process.env)
```

```js
const obj = {
    nodeEnv: '{{PORT}}',
    db: {
        dbConnection: '{{DB_CONNECTION}}'
    },
    auth: {
        clientSecret: '{{CLIENT_SECRET}}'
    }
}

let config = Config.fromObj(
    obj, envDefaults, process.env)
```

```js
const json = '{ "port": "{{PORT}}" }'

let config = Config.fromJson(
    json, envDefaults, process.env)
```

---

## Testing

```
npm run test
```

---
