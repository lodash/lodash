# Lo-Dash <sup>v0.2.0</sup>

Lo-Dash, from the devs behind [jsPerf.com](http://jsperf.com), is a drop-in replacement for Underscore.js that delivers [performance improvements](http://jsperf.com/lodash-underscore#filterby=family), bug fixes, and additional features.

Lo-Dash’s performance is gained by avoiding slower native methods, instead opting for simplified non-ES5 compliant methods optimized for common usage, and by leveraging function compilation to reduce the number of overall function calls.

## Dive in

We’ve got [API docs](http://lodash.com/docs) and [unit tests](http://lodash.com/tests).

For a list of upcoming features, check out our [roadmap](https://github.com/bestiejs/lodash/wiki/Roadmap).

## Screencasts

For more information check out these screencasts over Lo-Dash:

 * [Introducing Lo-Dash](http://dl.dropbox.com/u/513327/allyoucanleet/post/20/file/screencast.mp4)
 * [Compiling and custom builds](http://dl.dropbox.com/u/513327/allyoucanleet/post/21/file/screencast.mp4)

## Features

 * AMD loader support
 * [_.bind](http://lodash.com/docs#_bindfunc--arg1-arg2-) supports *"lazy"* binding
 * [_.debounce](http://lodash.com/docs#_debouncefunc-wait-immediate)’ed functions match [_.throttle](http://lodash.com/docs#_throttlefunc-wait)’ed functions’ return value behavior
 * [_.forEach](http://lodash.com/docs#_foreachcollection-callback--thisarg) is chainable
 * [_.groupBy](http://lodash.com/docs#_groupbycollection-callback--thisarg) accepts a third `thisArg` argument
 * [_.partial](http://lodash.com/docs#_partialfunc--arg1-arg2-) for more functional fun
 * [_.size](http://lodash.com/docs#_sizecollection) returns the `length` of a string value

## Support

Lo-Dash has been tested in at least Chrome 5-19, Firefox 1.5-12, IE 6-9, Opera 9.25-11.64, Safari 3.0.4-5.1.3, Node.js 0.4.8-0.6.18, Narwhal 0.3.2, RingoJS 0.8, and Rhino 1.7RC3.

## Custom builds

Custom builds make it easy to create lightweight versions of Lo-Dash containing only the methods you need.
We handle all the method dependency and alias mapping for you.

Custom builds may be created in two ways:

 1. Use the`include` argument to pass the names of the methods to include in the build.
~~~ bash
node build include=each,filter,map,noConflict
node build include="each, filter, map, noConflict"
~~~

 2. Use the `exclude` argument to pass the names of the methods to exclude from the build.
~~~ bash
node build exclude=isNaN,isUndefined,union,zip
node build exclude="isNaN, isUndefined, union, zip"
~~~

Custom builds are saved to `lodash.custom.js` and `lodash.custom.min.js`.

## Installation and usage

In browsers:

~~~ html
<script src="lodash.js"></script>
~~~

Using [npm](http://npmjs.org/):

~~~ bash
npm install lodash
~~~

In [Node.js](http://nodejs.org/) and [RingoJS v0.8.0+](http://ringojs.org/):

~~~ js
var _ = require('lodash');
~~~

In [Narwhal](http://narwhaljs.org/) and [RingoJS v0.7.0-](http://ringojs.org/):

~~~ js
var _ = require('lodash')._;
~~~

In [Rhino](http://www.mozilla.org/rhino/):

~~~ js
load('lodash.js');
~~~

In an AMD loader like [RequireJS](http://requirejs.org/):

~~~ js
require({
  'paths': {
    'underscore': 'path/to/lodash'
  }
},
['underscore'], function(_) {
  console.log(_.VERSION);
});
~~~

## Cloning this repo

To clone this repository including all submodules, using Git 1.6.5 or later:

~~~ bash
git clone --recursive https://github.com/bestiejs/lodash.git
cd lodash.js
~~~

For older Git versions, just use:

~~~ bash
git clone https://github.com/bestiejs/lodash.git
cd lodash
git submodule update --init
~~~

## Closed Underscore.js issues

 * Fix Firefox, IE, Opera, and Safari object iteration bugs [#376](https://github.com/documentcloud/underscore/issues/376)
 * Handle arrays with `undefined` values correctly in IE < 9 [#601](https://github.com/documentcloud/underscore/issues/601)
 * Methods should work on pages with incorrectly shimmed native methods [#7](https://github.com/documentcloud/underscore/issues/7)
 * Register as AMD module, but still export to global [#431](https://github.com/documentcloud/underscore/pull/431)
 * `_.forEach` should be chainable [#142](https://github.com/documentcloud/underscore/issues/142)
 * `_isNaN(new Number(NaN))` should return `true`
 * `_.reduceRight` should pass correct callback arguments when iterating objects
 * `_.size` should return the `length` of a string value

## Optimized methods <sup>(50+)</sup>

 * `_.bind`
 * `_.bindAll`
 * `_.clone`
 * `_.compact`
 * `_.contains`, `_.include`
 * `_.defaults`
 * `_.defer`
 * `_.difference`
 * `_.each`
 * `_.escape`
 * `_.every`, `_.all`
 * `_.extend`
 * `_.filter`, `_.select`
 * `_.find`, `_.detect`
 * `_.flatten`
 * `_.forEach`, `_.each`
 * `_.functions`, `_.methods`
 * `_.groupBy`
 * `_.indexOf`
 * `_.intersection`, `_.intersect`
 * `_.invoke`
 * `_.isEmpty`
 * `_.isEqual`
 * `_.isFinite`
 * `_.isObject`
 * `_.isString`
 * `_.keys`
 * `_.lastIndexOf`
 * `_.map`, `_.collect`
 * `_.max`
 * `_.memoize`
 * `_.min`
 * `_.mixin`
 * `_.pick`
 * `_.pluck`
 * `_.reduce`, `_.foldl`, `_.inject`
 * `_.reject`
 * `_.result`
 * `_.shuffle`
 * `_.some`, `_.any`
 * `_.sortBy`
 * `_.sortedIndex`
 * `_.template`
 * `_.throttle`
 * `_.toArray`
 * `_.union`
 * `_.uniq`, `_.unique`
 * `_.values`
 * `_.without`
 * `_.wrap`
 * `_.zip`
 * plus all `_(...)` method wrappers

## Changelog

### <sup>v0.2.0</sup>

 * Added custom build options
 * Added default `_.templateSettings.variable` value
 * Added *"lazy bind"* support to `_.bind`
 * Added native method overwrite detection to avoid bad native shims
 * Added support for more AMD build optimizers and aliasing as the *"underscore"* module
 * Added `thisArg` to `_.groupBy`
 * Added whitespace to compiled strings
 * Added `_.partial`
 * Commented the `iterationFactory` options object
 * Ensured `_.max` and `_.min` support extremely large arrays
 * Fixed IE < 9 `[DontEnum]` bug and Firefox < 3.6, Opera > 9.50 - Opera < 11.60, and Safari < 5.1’s prototype property iteration bug
 * Inlined `_.isFunction` calls.
 * Made `_.debounce`’ed functions match `_.throttle`’ed functions’ return value behavior
 * Made `_.escape` no longer translate the *">"* character
 * Fixed `clearTimeout` typo
 * Simplified all methods in the *"Arrays"* category
 * Optimized `_.debounce`, `_.escape`, `_.flatten`, `_.forEach`, `_.groupBy`, `_.intersection`, `_.invoke`, `_.isObject`, `_.max`, `_.min`, `_.pick`, `_.shuffle`, `_.sortedIndex`, `_.template`, `_.throttle`, `_.union`, `_.uniq`

### <sup>v0.1.0</sup>

 * Initial release

## BestieJS

Lo-Dash is part of the BestieJS *"Best in Class"* module collection. This means we promote solid browser/environment support, ES5 precedents, unit testing, and plenty of documentation.

## Author

* [John-David Dalton](http://allyoucanleet.com/)
  [![twitter/jdalton](http://gravatar.com/avatar/299a3d891ff1920b69c364d061007043?s=70)](https://twitter.com/jdalton "Follow @jdalton on Twitter")

## Contributors

* [Kit Cambridge](http://kitcambridge.github.com/)
  [![twitter/kitcambridge](http://gravatar.com/avatar/6662a1d02f351b5ef2f8b4d815804661?s=70)](https://twitter.com/kitcambridge "Follow @kitcambridge on Twitter")
* [Mathias Bynens](http://mathiasbynens.be/)
  [![twitter/mathias](http://gravatar.com/avatar/24e08a9ea84deb17ae121074d0f17125?s=70)](https://twitter.com/mathias "Follow @mathias on Twitter")
