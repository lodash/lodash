# lodash v4.17.21

[Site](https://lodash.com/) |
[Docs](https://lodash.com/docs) |
[FP Guide](https://github.com/lodash/lodash/wiki/FP-Guide) |
[Contributing](https://github.com/lodash/lodash/blob/master/.github/CONTRIBUTING.md) |
[Wiki](https://github.com/lodash/lodash/wiki "Changelog, Roadmap, etc.") |
[Code of Conduct](https://github.com/openjs-foundation/cross-project-council/blob/main/CODE_OF_CONDUCT.md) |
[Twitter](https://twitter.com/bestiejs) |
[Chat](https://gitter.im/lodash/lodash)

The [Lodash](https://lodash.com/) library exported as a [UMD](https://github.com/umdjs/umd) module.

Generated using [lodash-cli](https://www.npmjs.com/package/lodash-cli):
```shell
$ npm run build
$ lodash -o ./dist/lodash.js
$ lodash core -o ./dist/lodash.core.js
```

## Download

 * [Core build](https://raw.githubusercontent.com/lodash/lodash/4.17.21/dist/lodash.core.js) ([~4 kB gzipped](https://raw.githubusercontent.com/lodash/lodash/4.17.21/dist/lodash.core.min.js))
 * [Full build](https://raw.githubusercontent.com/lodash/lodash/4.17.21/dist/lodash.js) ([~24 kB gzipped](https://raw.githubusercontent.com/lodash/lodash/4.17.21/dist/lodash.min.js))
 * [CDN copies](https://www.jsdelivr.com/projects/lodash)

Lodash is released under the [MIT license](https://raw.githubusercontent.com/lodash/lodash/4.17.21/LICENSE) & supports modern environments.<br>
Review the [build differences](https://github.com/lodash/lodash/wiki/build-differences) & pick one that’s right for you.

## Installation

In a browser:
```html
<script src="lodash.js"></script>
```

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
var at = require('lodash/at');
var curryN = require('lodash/fp/curryN');
```

**Note:**<br>
Install [n_](https://www.npmjs.com/package/n_) for Lodash use in the Node.js < 6 REPL.

## Why Lodash?

Lodash makes JavaScript easier by taking the hassle out of working with arrays,<br>
numbers, objects, strings, etc. Lodash’s modular methods are great for:

 * Iterating arrays, objects, & strings
 * Manipulating & testing values
 * Creating composite functions

## Module Formats

Lodash is available in a [variety of builds](https://lodash.com/custom-builds) & module formats.

 * [lodash](https://www.npmjs.com/package/lodash) & [per method packages](https://www.npmjs.com/browse/keyword/lodash-modularized)
 * [lodash-es](https://www.npmjs.com/package/lodash-es), [babel-plugin-lodash](https://www.npmjs.com/package/babel-plugin-lodash), & [lodash-webpack-plugin](https://www.npmjs.com/package/lodash-webpack-plugin)
 * [lodash/fp](https://github.com/lodash/lodash/tree/npm/fp)
 * [lodash-amd](https://www.npmjs.com/package/lodash-amd)
