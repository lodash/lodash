# lodash

[Site](https://lodash.com/) |
[Docs](https://lodash.com/docs) |
[FP Guide](https://github.com/lodash/lodash/wiki/FP-Guide) |
[Contributing](https://github.com/lodash/lodash/blob/master/.github/CONTRIBUTING.md) |
[Wiki](https://github.com/lodash/lodash/wiki "Changelog, Roadmap, etc.") |
[Code of Conduct](https://js.foundation/community/code-of-conduct) |
[Twitter](https://twitter.com/bestiejs) |
[Chat](https://gitter.im/lodash/lodash)

## Why Lodash?

Lodash makes JavaScript easier by taking the hassle out of working with arrays,<br>
numbers, objects, strings, etc. Lodash’s modular methods are great for:

 * Iterating arrays, objects, & strings
 * Manipulating & testing values
 * Creating composite functions

## Installation

```shell
$ npm i lodash
# or:
$ npm i lodash-es
```

```js
// Load the full build.
var _ = require('lodash');
// Load the core build.
var _ = require('lodash/core');
// Load the FP build for immutable auto-curried iteratee-first data-last methods.
var fp = require('lodash/fp');

// Cherry-pick methods for smaller browserify/rollup/webpack bundles.
var at = require('lodash/at');
var curryN = require('lodash/fp/curryN');

// Easier cherry-picking for tree-shaking compilers such as rollup and webpack.
import { at, curryN } from 'lodash-es';

// Compromise: Load method categories.
var array = require('lodash/array');
var object = require('lodash/fp/object');
```

### Keeping your browser bundles small

If you import the entire `lodash` package but only use a couple of functions from it, you end up shipping a lot of unnecessary code to your users, which takes time to download and parse.

Instead, you can import just the functions you need:

```js
var at = require('lodash/at');
var curryN = require('lodash/fp/curryN');
```

(Note: The above is recommended over the to-be-deprecated [per method packages](https://www.npmjs.com/search?q=keywords:lodash-modularized).)

If that sounds tedious, you can use [babel-plugin-lodash](https://www.npmjs.com/package/babel-plugin-lodash) to do it for you.

If you use [webpack](https://webpack.js.org/) or [rollup](https://rollupjs.org/) you can use [lodash-es](https://www.npmjs.com/package/lodash-es) instead:

```js
import { at, curryN } from 'lodash-es';
```

There’s also [lodash-webpack-plugin](https://www.npmjs.com/package/lodash-webpack-plugin) for optimizing the size even further.

To help you choose, read [this blog post.](https://nolanlawson.com/2018/03/20/smaller-lodash-bundles-with-webpack-and-babel/)

## Good ol’ script tags

 * [Core build](https://raw.githubusercontent.com/lodash/lodash/4.17.10-npm/core.js) ([~4 kB gzipped](https://raw.githubusercontent.com/lodash/lodash/4.17.10-npm/core.min.js))
 * [Full build](https://raw.githubusercontent.com/lodash/lodash/4.17.10-npm/lodash.js) ([~24 kB gzipped](https://raw.githubusercontent.com/lodash/lodash/4.17.10-npm/lodash.min.js))
 * [CDN copies](https://www.jsdelivr.com/projects/lodash) [![jsDelivr Hits](https://data.jsdelivr.com/v1/package/npm/lodash/badge)](https://www.jsdelivr.com/package/npm/lodash)

Review the [build differences](https://github.com/lodash/lodash/wiki/build-differences) and pick one that’s right for you.

Finally, add a script tag pointing to the file you downloaded.

```html
<script src="lodash.js"></script>
```

## License

Lodash is released under the [MIT license](https://raw.githubusercontent.com/lodash/lodash/4.17.10-npm/LICENSE).
