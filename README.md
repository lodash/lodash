# lodash v4.16.1

The [Lodash](https://lodash.com/) library exported as [Node.js](https://nodejs.org/) modules.

## Installation

Using npm:
```shell
$ npm i -g npm
$ npm i --save lodash
```

In Node.js:
```js
// Load the full build.
var _ = require('lodash');
// Load the core build.
var _ = require('lodash/core');
// Load the FP build for immutable auto-curried iteratee-first data-last methods.
var fp = require('lodash/fp');

// Load method categories.
var array = require('lodash/array');
var object = require('lodash/fp/object');

// Cherry-pick methods for smaller browserify/rollup/webpack bundles.
var chunk = require('lodash/chunk');
var extend = require('lodash/fp/extend');
```

See the [package source](https://github.com/lodash/lodash/tree/4.16.1-npm) for more details.

**Note:**<br>
Install [n_](https://www.npmjs.com/package/n_) for Lodash use in the Node.js < 6 REPL.

## Support

Tested in Chrome 52-53, Firefox 47-48, IE 11, Edge 14, Safari 8-9, Node.js 4-6, & PhantomJS 2.1.1.<br>
Automated [browser](https://saucelabs.com/u/lodash) & [CI](https://travis-ci.org/lodash/lodash/) test runs are available.
