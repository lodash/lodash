# Lo-Dash <sup>v0.3.0</sup>

A drop-in replacement for Underscore.js, from the devs behind [jsPerf.com](http://jsperf.com), that delivers [performance improvements](http://lodash.com/benchmarks), [bug fixes](https://github.com/bestiejs/lodash#closed-underscorejs-issues), and [additional features](https://github.com/bestiejs/lodash#features).

Lo-Dash’s performance is gained by avoiding slower native methods, instead opting for simplified non-ES5 compliant methods optimized for common usage, and by leveraging function compilation to reduce the number of overall function calls.

## Download

 * [Development source](https://raw.github.com/bestiejs/lodash/v0.3.0/lodash.js)
 * [Production source](https://raw.github.com/bestiejs/lodash/v0.3.0/lodash.min.js)
 * For optimal performance, [create a custom build](https://github.com/bestiejs/lodash#custom-builds) with only the features you need

## Dive in

We’ve got [API docs](http://lodash.com/docs), [benchmarks](http://lodash.com/benchmarks), and [unit tests](http://lodash.com/tests).

For a list of upcoming features, check out our [roadmap](https://github.com/bestiejs/lodash/wiki/Roadmap).

## Screencasts

For more information check out these screencasts over Lo-Dash:

 * [Introducing Lo-Dash](http://dl.dropbox.com/u/513327/allyoucanleet/post/20/file/screencast.mp4)
 * [Optimizations and custom builds](http://dl.dropbox.com/u/513327/allyoucanleet/post/21/file/screencast.mp4)

## Features

 * AMD loader support (RequireJS, curl.js, etc.)
 * [_.bind](http://lodash.com/docs#bind) supports *"lazy"* binding
 * [_.debounce](http://lodash.com/docs#debounce)’ed functions match [_.throttle](http://lodash.com/docs#throttle)’ed functions’ return value behavior
 * [_.forEach](http://lodash.com/docs#forEach) is chainable
 * [_.forIn](http://lodash.com/docs#forIn) for iterating over an object’s own and inherited properties
 * [_.forOwn](http://lodash.com/docs#forOwn) for iterating over an object’s own properties
 * [_.groupBy](http://lodash.com/docs#groupBy), [_.sortedIndex](http://lodash.com/docs#sortedIndex), and [_.uniq](http://lodash.com/docs#uniq) accept a `thisArg` argument
 * [_.indexOf](http://lodash.com/docs#indexOf) and [_.lastIndexOf](http://lodash.com/docs#lastIndexOf) accept a `fromIndex` argument
 * [_.partial](http://lodash.com/docs#partial) for more functional fun
 * [_.size](http://lodash.com/docs#size) supports returning the `length` of string values
 * [_.template](http://lodash.com/docs#template) utilizes [sourceURLs](http://www.html5rocks.com/en/tutorials/developertools/sourcemaps/#toc-sourceurl) for easier debugging

## Support

Lo-Dash has been tested in at least Chrome 5-19, Firefox 1.5-13, IE 6-9, Opera 9.25-11.64, Safari 3.0.4-5.1.3, Node.js 0.4.8-0.6.18, Narwhal 0.3.2, RingoJS 0.8, and Rhino 1.7RC3.

## Custom builds

Custom builds make it easy to create lightweight versions of Lo-Dash containing only the methods you need.
We handle all the method dependency and alias mapping for you.

Mobile builds, with IE bug fixes and method compilation removed, may be created by using the `mobile` argument.

~~~ bash
node build mobile
~~~

Custom builds may be created in three ways:

 1. Use the `category` argument to pass the categories of methods to include in the build.<br>
    Valid categories are *"arrays"*, *"chaining"*, *"collections"*, *"functions"*, *"objects"*, and *"utilities"*.
~~~ bash
node build category=collections,functions
node build category="collections, functions"
node build mobile category=collections,functions
~~~

 2. Use the `include` argument to pass the names of the methods to include in the build.
~~~ bash
node build include=each,filter,map
node build include="each, filter, map"
node build mobile include=each,filter,map
~~~

 3. Use the `exclude` argument to pass the names of the methods to exclude from the build.
~~~ bash
node build exclude=union,uniq,zip
node build exclude="union, uniq, zip"
node build mobile exclude=union,uniq,zip
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

 * Allow iteration of objects with a `length` property [[#148](https://github.com/documentcloud/underscore/issues/148), [#154](https://github.com/documentcloud/underscore/issues/154), [#252](https://github.com/documentcloud/underscore/issues/252), [#448](https://github.com/documentcloud/underscore/issues/448), [test](https://github.com/bestiejs/lodash/blob/c07e1567a7a12cff2c5ee6cda81306c8bcf126f0/test/test.js#L266-272)]
 * Ensure array-like objects with invalid `length` properties are treated like regular objects [[test](https://github.com/bestiejs/lodash/blob/c07e1567a7a12cff2c5ee6cda81306c8bcf126f0/test/test.js#L237-243), [test](https://github.com/bestiejs/lodash/blob/c07e1567a7a12cff2c5ee6cda81306c8bcf126f0/test/test.js#L533-542), [test](https://github.com/bestiejs/lodash/blob/c07e1567a7a12cff2c5ee6cda81306c8bcf126f0/test/test.js#L661-664)]
 * Ensure `_(...)` returns passed wrapper instances [[test](https://github.com/bestiejs/lodash/blob/c07e1567a7a12cff2c5ee6cda81306c8bcf126f0/test/test.js#L106-109)]
 * Ensure `_.groupBy` adds values to own, not inherited, properties [[test](https://github.com/bestiejs/lodash/blob/c07e1567a7a12cff2c5ee6cda81306c8bcf126f0/test/test.js#L317-324)]
 * Ensure `_.sortedIndex` supports arrays with high `length` values [[test](https://github.com/bestiejs/lodash/blob/c07e1567a7a12cff2c5ee6cda81306c8bcf126f0/test/test.js#L586-595)]
 * Ensure `_.throttle` works when called in tight loops [[#502](https://github.com/documentcloud/underscore/issues/502), [test](https://github.com/bestiejs/lodash/blob/c07e1567a7a12cff2c5ee6cda81306c8bcf126f0/test/test.js#L629-639)]
 * Fix Firefox, IE, Opera, and Safari object iteration bugs [[#376](https://github.com/documentcloud/underscore/issues/376), [test](https://github.com/bestiejs/lodash/blob/c07e1567a7a12cff2c5ee6cda81306c8bcf126f0/test/test.js#L175-187), [test](https://github.com/bestiejs/lodash/blob/c07e1567a7a12cff2c5ee6cda81306c8bcf126f0/test/test.js#L277-302), [test](https://github.com/bestiejs/lodash/blob/c07e1567a7a12cff2c5ee6cda81306c8bcf126f0/test/test.js#L379-390), [test](https://github.com/bestiejs/lodash/blob/c07e1567a7a12cff2c5ee6cda81306c8bcf126f0/test/test.js#L398-400), [test](https://github.com/bestiejs/lodash/blob/c07e1567a7a12cff2c5ee6cda81306c8bcf126f0/test/test.js#L418-438), [test](https://github.com/bestiejs/lodash/blob/c07e1567a7a12cff2c5ee6cda81306c8bcf126f0/test/test.js#L554-556)]
 * Handle arrays with `undefined` values correctly in IE < 9 [[#601](https://github.com/documentcloud/underscore/issues/601)]
 * Methods should work on pages with incorrectly shimmed native methods [[#7](https://github.com/documentcloud/underscore/issues/7), [test](https://github.com/bestiejs/lodash/blob/c07e1567a7a12cff2c5ee6cda81306c8bcf126f0/test/test.js#L88-94)]
 * Register as AMD module, but still export to global [[#431](https://github.com/documentcloud/underscore/pull/431), [test](https://github.com/bestiejs/lodash/blob/c07e1567a7a12cff2c5ee6cda81306c8bcf126f0/test/test.js#L72-86)]
 * `_.forEach` should be chainable [[#142](https://github.com/documentcloud/underscore/issues/142), [test](https://github.com/bestiejs/lodash/blob/c07e1567a7a12cff2c5ee6cda81306c8bcf126f0/test/test.js#L232-235)]
 * `_isNaN(new Number(NaN))` should return `true` [[test](https://github.com/bestiejs/lodash/blob/c07e1567a7a12cff2c5ee6cda81306c8bcf126f0/test/test.js#L408-410)]
 * `_.reduceRight` should pass correct callback arguments when iterating objects [[test](https://github.com/bestiejs/lodash/blob/c07e1567a7a12cff2c5ee6cda81306c8bcf126f0/test/test.js#L521-531)]
 * `_.size` should return the `length` of string values [[test](https://github.com/bestiejs/lodash/blob/c07e1567a7a12cff2c5ee6cda81306c8bcf126f0/test/test.js#L550-552)]

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
 * `_.intersection`
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
 * `_.times`
 * `_.toArray`
 * `_.union`
 * `_.uniq`, `_.unique`
 * `_.values`
 * `_.without`
 * `_.wrap`
 * `_.zip`
 * plus all `_(...)` method wrappers

## Changelog

### <sup>v0.3.0</sup>

 * Added `category` build option
 * Added `fromIndex` argument to `_.indexOf` and `_.lastIndexOf`
 * Added `//@ sourceURL` support to `_.template`
 * Added `thisArg` argument to `_.sortedIndex` and `_.uniq`
 * Added `_.forIn` and `_.forOwn` methods
 * Ensured array-like objects with invalid `length` properties are treated like regular objects
 * Ensured `_.sortedIndex` supports arrays with high `length` values
 * Fixed `prototype` property iteration bug in `_.keys` for Firefox < 3.6, Opera > 9.50 - Opera < 11.60, and Safari < 5.1
 * Optimized `_.times` and `this` bindings in iterator methods

### <sup>v0.2.2</sup>

 * Added `mobile` build option
 * Ensured `_.find` returns `undefined` for unmatched values
 * Ensured `_.templateSettings.variable` is compatible with Underscore.js
 * Optimized `_.escape`
 * Reduced dependencies in `_.find`

### <sup>v0.2.1</sup>

 * Adjusted the Lo-Dash export order for r.js
 * Ensured `_.groupBy` values are added to own, not inherited, properties
 * Made `_.bind` follow ES5 spec to support a popular Backbone.js pattern
 * Removed the alias `intersect`
 * Simplified `_.bind`, `_.flatten`, `_.groupBy`, `_.max`, and `_.min`

### <sup>v0.2.0</sup>

 * Added custom build options
 * Added default `_.templateSettings.variable` value
 * Added *"lazy bind"* support to `_.bind`
 * Added native method overwrite detection to avoid bad native shims
 * Added support for more AMD build optimizers and aliasing as the *"underscore"* module
 * Added `thisArg` argument to `_.groupBy`
 * Added whitespace to compiled strings
 * Added `_.partial` method
 * Commented the `iterationFactory` options object
 * Ensured `_(...)` returns passed wrapper instances
 * Ensured `_.max` and `_.min` support extremely large arrays
 * Ensured `_.throttle` works in tight loops
 * Fixed IE < 9 `[DontEnum]` bug and Firefox < 3.6, Opera > 9.50 - Opera < 11.60, and Safari < 5.1’s `prototype` property iteration bug
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
