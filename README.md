# lodash v4.2.1

The [lodash](https://lodash.com/) library exported as [Node.js](https://nodejs.org/) modules.

## Installation

Using npm:
```bash
$ {sudo -H} npm i -g npm
$ npm i --save lodash
```

In Node.js:
```js
// load the full build
var _ = require('lodash');
// load the core build
var _ = require('lodash/core');
// load the fp build for immutable auto-curried iteratee-first data-last methods
var _ = require('lodash/fp');

// or a method category
var array = require('lodash/array');
var object = require('lodash/fp/object');

// or method for smaller builds with browserify/rollup/webpack
var chunk = require('lodash/chunk');
var extend = require('lodash/fp/extend');
```

See the [package source](https://github.com/lodash/lodash/tree/4.2.1-npm) for more details.

**Note:**<br>
Don’t assign values to the [special variable](http://nodejs.org/api/repl.html#repl_repl_features) `_` when in the REPL.<br>
Install [n_](https://www.npmjs.com/package/n_) for a REPL that includes lodash by default.

## Module formats

Lodash is available in a variety of other builds & module formats.

 * [lodash](https://www.npmjs.com/package/lodash) & [per method packages](https://www.npmjs.com/browse/keyword/lodash-modularized)
 * [lodash-amd](https://www.npmjs.com/package/lodash-amd)
 * [lodash-es](https://www.npmjs.com/package/lodash-es) & [babel-plugin-lodash](https://www.npmjs.com/package/babel-plugin-lodash)

## Further Reading

  * [API Documentation](https://lodash.com/docs)
  * [Build Differences](https://github.com/lodash/lodash/wiki/Build-Differences)
  * [Changelog](https://github.com/lodash/lodash/wiki/Changelog)
  * [Roadmap](https://github.com/lodash/lodash/wiki/Roadmap)
  * [More Resources](https://github.com/lodash/lodash/wiki/Resources)

## Support

Tested in Chrome 47-48, Firefox 43-44, IE 9-11, Edge 13, Safari 8-9, Node.js 0.10, 0.12, 4, & 5, & PhantomJS 1.9.8.
Automated [browser](https://saucelabs.com/u/lodash) & [CI](https://travis-ci.org/lodash/lodash/) test runs are available. Special thanks to [Sauce Labs](https://saucelabs.com/) for providing automated browser testing.
