# bare-os

Operating system utilities for Bare. The API closely follows that of the Node.js `os` module.

```
npm i bare-os
```

## Usage

```js
const os = require('bare-os')

console.log(os.platform()) // 'darwin', 'linux', 'win32', ...
console.log(os.arch()) // 'arm64', 'x64', ...
console.log(os.homedir())
console.log(os.tmpdir())
console.log(os.hostname())
console.log(os.networkInterfaces())
```

## API

See the [full API reference](https://docs.pears.com/reference/bare/modules/bare-os).

## License

Apache-2.0
