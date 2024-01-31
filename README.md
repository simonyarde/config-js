# Config

- Merge one or more dicts of replacement vars.
- Error if token name not found in vars.

```js
import {
    readConfigFile,
    readConfigFileSync,
    readConfigObject,
    readConfigString
} from '../config.mjs'
```

```js
const envDefaults = {
    'PORT': '443',
    'DB_CONNECTION': 'https://localhost:4321',
    'CLIENT_SECRET': ''
}
```

```js
let config = readConfigFileSync(
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

let config = readConfigObject(
    obj, envDefaults, process.env)
```

```js
const json = '{ "port": "{{PORT}}" }'

let config = readConfigString(
    json, envDefaults, process.env)
```

---

## Testing

```
npm ci
npm run test
```

---
