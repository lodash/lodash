# lodash v3.10.0

The [modern build](https://github.com/lodash/lodash/wiki/Build-Differences) of [lodash](https://lodash.com/) exported as [AMD](https://github.com/amdjs/amdjs-api/wiki/AMD) modules.

Generated using [lodash-cli](https://www.npmjs.com/package/lodash-cli):
```bash
$ lodash modularize modern exports=amd -o ./
$ lodash modern exports=amd -d -o ./main.js
```

## Installation

Using bower or volo:

```bash
$ bower i lodash#3.10.0-amd
$ volo add lodash/3.10.0-amd
```

Defining a build as `'lodash'`.

```js
require({
  'packages': [
    { 'name': 'lodash', 'location': 'path/to/lodash' }
  ]
}, ['lodash/array/chunk'], function(chunk) {
  // use `chunk`
});
```
