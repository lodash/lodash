# Lo-Dash <sup>v0.4.2</sup>

A drop-in replacement<sup>[*](https://github.com/bestiejs/lodash/wiki/Drop-in-Disclaimer)</sup> for Underscore.js, from the devs behind [jsPerf.com](http://jsperf.com), that delivers [performance improvements](http://lodash.com/benchmarks), [bug fixes](https://github.com/bestiejs/lodash#closed-underscorejs-issues), and [additional features](https://github.com/bestiejs/lodash#features).

Lo-Dash’s performance is gained by avoiding slower native methods, instead opting for simplified non-ES5 compliant methods optimized for common usage, and by leveraging function compilation to reduce the number of overall function calls.

## Download

 * [Development source](https://raw.github.com/bestiejs/lodash/v0.4.2/lodash.js)
 * [Production source](https://raw.github.com/bestiejs/lodash/v0.4.2/lodash.min.js)
 * CDN copies of ≤ [v0.4.1](http://cdnjs.cloudflare.com/ajax/libs/lodash.js/0.4.1/lodash.min.js) are available on [cdnjs](http://cdnjs.com/) thanks to [CloudFlare](http://www.cloudflare.com/)
 * For optimal performance, [create a custom build](https://github.com/bestiejs/lodash#custom-builds) with only the features you need

## Dive in

We’ve got [API docs](http://lodash.com/docs), [benchmarks](http://lodash.com/benchmarks), and [unit tests](http://lodash.com/tests).

Create your own benchmarks at [jsPerf](http://jsperf.com), or [search](http://jsperf.com/search?q=lodash) for existing ones.

For a list of upcoming features, check out our [roadmap](https://github.com/bestiejs/lodash/wiki/Roadmap).

## Screencasts

For more information check out these screencasts over Lo-Dash:

 * [Introducing Lo-Dash](https://vimeo.com/44154599)
 * [Optimizations and custom builds](https://vimeo.com/44154601)
 * [Lo-Dash’s origin and why it’s a better utility belt](https://vimeo.com/44154600)

## Features

 * AMD loader support ([RequireJS](http://requirejs.org/), [curl.js](https://github.com/cujojs/curl), etc.)
 * [_.bind](http://lodash.com/docs#bind) supports *"lazy"* binding
 * [_.debounce](http://lodash.com/docs#debounce)’ed functions match [_.throttle](http://lodash.com/docs#throttle)’ed functions’ return value behavior
 * [_.forEach](http://lodash.com/docs#forEach) is chainable
 * [_.forIn](http://lodash.com/docs#forIn) for iterating over an object’s own and inherited properties
 * [_.forOwn](http://lodash.com/docs#forOwn) for iterating over an object’s own properties
 * [_.groupBy](http://lodash.com/docs#groupBy), [_.sortedIndex](http://lodash.com/docs#sortedIndex), and [_.uniq](http://lodash.com/docs#uniq) accept a `thisArg` argument
 * [_.indexOf](http://lodash.com/docs#indexOf) and [_.lastIndexOf](http://lodash.com/docs#lastIndexOf) accept a `fromIndex` argument
 * [_.partial](http://lodash.com/docs#partial) for more functional fun
 * [_.template](http://lodash.com/docs#template) utilizes [sourceURLs](http://www.html5rocks.com/en/tutorials/developertools/sourcemaps/#toc-sourceurl) for easier debugging
 * [_.contains](http://lodash.com/docs#contains), [_.size](http://lodash.com/docs#size), [_.toArray](http://lodash.com/docs#toArray),
   [and more…](http://lodash.com/docs "_.every, _.filter, _.find, _.forEach, _.groupBy, _.invoke, _.map, _.pluck, _.reduce, _.reduceRight, _.reject, _.some, _sortBy") accept strings

## Support

Lo-Dash has been tested in at least Chrome 5-20, Firefox 1.5-13, IE 6-9, Opera 9.25-12, Safari 3.0.4-5.1.7, Node.js 0.4.8-0.8.2, Narwhal 0.3.2, RingoJS 0.8, and Rhino 1.7RC3.

## Custom builds

Custom builds make it easy to create lightweight versions of Lo-Dash containing only the methods you need.
We handle all the method dependency and alias mapping for you.

 * Backbone builds, containing all methods required by Backbone, may be created using the `backbone` modifier argument.
~~~ bash
lodash backbone
~~~

 * Legacy builds, tailored for older browsers without [ES5 support](http://es5.github.com/), may be created using the `legacy` modifier argument.
~~~ bash
lodash legacy
~~~

 * Mobile builds, with IE < 9 bug fixes and method compilation removed, may be created using the `mobile` modifier argument.
~~~ bash
lodash mobile
~~~

 * Strict builds, with `_.bindAll`, `_.extend`, and `_.defaults` in [strict mode](http://es5.github.com/#C), may be created using the `strict` modifier argument.
~~~ bash
lodash strict
~~~

Custom builds may be created in three ways:

 1. Use the `category` argument to pass the categories of methods to include in the build.<br>
    Valid categories are *"arrays"*, *"chaining"*, *"collections"*, *"functions"*, *"objects"*, and *"utilities"*.
~~~ bash
lodash category=collections,functions
lodash category="collections, functions"
~~~

 2. Use the `exclude` argument to pass the names of methods to exclude from the build.
~~~ bash
lodash exclude=union,uniq,zip
lodash exclude="union, uniq, zip"
~~~

 3. Use the `include` argument to pass the names of methods to include in the build.
~~~ bash
lodash include=each,filter,map
lodash include="each, filter, map"
~~~

All arguments, except `exclude` with `include` and `legacy` with `mobile`, may be combined.

~~~ bash
lodash backbone legacy category=utilities exclude=first,last
lodash backbone mobile strict category=functions include=pick,uniq
~~~

The `lodash` command-line utility is available when Lo-Dash is installed as a global package (i.e. `npm install -g lodash`).

Custom builds are saved to `lodash.custom.js` and `lodash.custom.min.js`.

## Installation and usage

In browsers:

~~~ html
<script src="lodash.js"></script>
~~~

Using [npm](http://npmjs.org/):

~~~ bash
npm install lodash
npm install -g lodash
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

## Closed Underscore.js issues <sup>(20+)</sup>

 * Allow iteration of objects with a `length` property [[#148](https://github.com/documentcloud/underscore/issues/148), [#154](https://github.com/documentcloud/underscore/issues/154), [#252](https://github.com/documentcloud/underscore/issues/252), [#448](https://github.com/documentcloud/underscore/issues/448), [#659](https://github.com/documentcloud/underscore/issues/659), [test](https://github.com/bestiejs/lodash/blob/v0.4.2/test/test.js#L364-370)]
 * Ensure array-like objects with invalid `length` properties are treated like regular objects [[test](https://github.com/bestiejs/lodash/blob/v0.4.2/test/test.js#L315-321), [test](https://github.com/bestiejs/lodash/blob/v0.4.2/test/test.js#L665-679), [test](https://github.com/bestiejs/lodash/blob/v0.4.2/test/test.js#L921-924)]
 * Ensure *"Arrays"* methods allow falsey `array` arguments [[test](https://github.com/bestiejs/lodash/blob/v0.4.2/test/test.js#L989-1027)]
 * Ensure *"Collections"* methods allow string `collection` arguments [[#247](https://github.com/documentcloud/underscore/issues/247), [#276](https://github.com/documentcloud/underscore/issues/276), [#561](https://github.com/documentcloud/underscore/pull/561), [test](https://github.com/bestiejs/lodash/blob/v0.4.2/test/test.js#L148-157), [test](https://github.com/bestiejs/lodash/blob/v0.4.2/test/test.js#L323-341), [test](https://github.com/bestiejs/lodash/blob/v0.4.2/test/test.js#L681-698), [test](https://github.com/bestiejs/lodash/blob/v0.4.2/test/test.js#L926-929)]
 * Ensure templates compiled with errors are inspectable [[#666](https://github.com/documentcloud/underscore/issues/666), [test](https://github.com/bestiejs/lodash/blob/v0.4.2/test/test.js#L795-802)]
 * Fix cross-browser object iteration bugs [[#376](https://github.com/documentcloud/underscore/issues/376), [test](https://github.com/bestiejs/lodash/blob/v0.4.2/test/test.js#L224-236), [test](https://github.com/bestiejs/lodash/blob/v0.4.2/test/test.js#L375-400), [test](https://github.com/bestiejs/lodash/blob/v0.4.2/test/test.js#L496-507), [test](https://github.com/bestiejs/lodash/blob/v0.4.2/test/test.js#L515-517), [test](https://github.com/bestiejs/lodash/blob/v0.4.2/test/test.js#L535-555), [test](https://github.com/bestiejs/lodash/blob/v0.4.2/test/test.js#L725-727)]
 * Handle arrays with `undefined` values correctly in IE < 9 [[#601](https://github.com/documentcloud/underscore/issues/601)]
 * Methods should work on pages with incorrectly shimmed native methods [[#7](https://github.com/documentcloud/underscore/issues/7), [test](https://github.com/bestiejs/lodash/blob/v0.4.2/test/test.js#L96-102)]
 * Register as an AMD module, but still export to global [[#431](https://github.com/documentcloud/underscore/pull/431), [test](https://github.com/bestiejs/lodash/blob/v0.4.2/test/test.js#L80-94)]
 * `_(…)` should return passed wrapper instances [[test](https://github.com/bestiejs/lodash/blob/v0.4.2/test/test.js#L114-117)]
 * `_.contains` should work with strings [[#667](https://github.com/documentcloud/underscore/pull/667), [test](https://github.com/bestiejs/lodash/blob/v0.4.2/test/test.js#L148-157)]
 * `_.escape` should return an empty string when passed `null` or `undefined` [[#407](https://github.com/documentcloud/underscore/issues/427), [test](https://github.com/bestiejs/lodash/blob/v0.4.2/test/test.js#L205-208)]
 * `_.forEach` should be chainable [[#142](https://github.com/documentcloud/underscore/issues/142), [test](https://github.com/bestiejs/lodash/blob/v0.4.2/test/test.js#L310-313)]
 * `_.groupBy` should add values to own, not inherited, properties [[test](https://github.com/bestiejs/lodash/blob/v0.4.2/test/test.js#L415-422)]
 * `_isNaN(new Number(NaN))` should return `true` [[test](https://github.com/bestiejs/lodash/blob/v0.4.2/test/test.js#L525-527)]
 * `_.reduceRight` should pass correct callback arguments when iterating objects [[test](https://github.com/bestiejs/lodash/blob/v0.4.2/test/test.js#L649-663)]
 * `_.size` should return the `length` of string values [[test](https://github.com/bestiejs/lodash/blob/v0.4.2/test/test.js#L708-710)]
 * `_.size` shouldn't error on falsey values [[#650](https://github.com/documentcloud/underscore/pull/650), [test](https://github.com/bestiejs/lodash/blob/v0.4.2/test/test.js#L712-719)]
 * `_.size` should work with `arguments` objects cross-browser [[#653](https://github.com/documentcloud/underscore/issues/653), [test](https://github.com/bestiejs/lodash/blob/v0.4.2/test/test.js#L721-723)]
 * `_.sortedIndex` should support arrays with high `length` values [[test](https://github.com/bestiejs/lodash/blob/v0.4.2/test/test.js#L765-774)]
 * `_.template` should not augment the `options` object [[test](https://github.com/bestiejs/lodash/blob/v0.4.2/test/test.js#L789-793)]
 * `_.throttle` should work when called in a loop [[#502](https://github.com/documentcloud/underscore/issues/502), [test](https://github.com/bestiejs/lodash/blob/v0.4.2/test/test.js#L872-882)]
 * `_.zipObject` should accept less than two arguments [[test](https://github.com/bestiejs/lodash/blob/v0.4.2/test/test.js#L951-953)]

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
 * `_.isArguments`
 * `_.isDate`
 * `_.isEmpty`
 * `_.isEqual`
 * `_.isFinite`
 * `_.isFunction`
 * `_.isObject`
 * `_.isNumber`
 * `_.isRegExp`
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
 * plus all `_(…)` method wrappers

## Release Notes

### <sup>v0.4.2</sup>

 * Added `strict` build
 * Ensured `_.bindAll`, `_.extend`, and `_.defaults` avoid strict mode errors when attempting to augment read-only properties
 * Optimized the iteration of large arrays in `_.difference`, `_.intersection`, and `_.without`
 * Fixed build bugs related to removing variables

### <sup>v0.4.1</sup>

  * Fixed `_.template` regression
  * Optimized build process to detect and remove more unused variables

### <sup>v0.4.0</sup>

 * Added `bin` and `scripts` entries to package.json
 * Added `legacy` build option
 * Added cross-browser support for passing strings to *"Collections"* methods
 * Added `_.zipObject`
 * Leveraged `_.indexOf`'s `fromIndex` in `_.difference` and `_.without`
 * Optimized compiled templates
 * Optimized inlining the `iteratorTemplate` for builds
 * Optimized object iteration for *"Collections"* methods
 * Optimized partially applied `_.bind` in V8
 * Made compiled templates more debuggable
 * Made `_.size` work with falsey values and consistent cross-browser with `arguments` objects
 * Moved `_.groupBy` and `_.sortBy` back to the *"Collections"* category
 * Removed `arguments` object from `_.range`

The full changelog is available [here](https://github.com/bestiejs/lodash/wiki/Changelog).

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
