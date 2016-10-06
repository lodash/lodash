# lodash-amd v4.16.4

The [Lodash](https://lodash.com/) library exported as [AMD](https://github.com/amdjs/amdjs-api/wiki/AMD) modules.

Generated using [lodash-cli](https://www.npmjs.com/package/lodash-cli):
```shell
$ lodash exports=amd -o ./
$ lodash exports=amd -d -o ./main.js
```

## Installation

Using npm:
```shell
$ npm i -g npm
$ npm i --save lodash-amd
```

Using an AMD loader:
```js
require({
  'packages': [
    { 'name': 'lodash', 'location': 'path/to/lodash' }
  ]
}, ['lodash/chunk'], function(chunk) {
  // use `chunk`
});
```

See the [package source](https://github.com/lodash/lodash/tree/4.16.4-amd) for more details.
