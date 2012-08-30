# Lo-Dash <sup>v0.6.1</sup>

A drop-in replacement<sup>[*](https://github.com/bestiejs/lodash/wiki/Drop-in-Disclaimer)</sup> for Underscore.js, from the devs behind [jsPerf.com](http://jsperf.com), delivering [performance](http://lodash.com/benchmarks), [bug fixes](https://github.com/bestiejs/lodash#resolved-underscorejs-issues-30), and [additional features](https://github.com/bestiejs/lodash#features).

Lo-Dash’s performance is gained by avoiding slower native methods, instead opting for simplified non-ES5 compliant methods optimized for common usage, and by leveraging function compilation to reduce the number of overall function calls.

## Download

 * [Development source](https://raw.github.com/bestiejs/lodash/v0.6.1/lodash.js)
 * [Production source](https://raw.github.com/bestiejs/lodash/v0.6.1/lodash.min.js)
 * CDN copies of ≤ [v0.6.1](http://cdnjs.cloudflare.com/ajax/libs/lodash.js/0.6.1/lodash.min.js) are available on [cdnjs](http://cdnjs.com/) thanks to [CloudFlare](http://www.cloudflare.com/)
 * For optimal performance, [create a custom build](https://github.com/bestiejs/lodash#custom-builds) with only the features you need

## Dive in

We’ve got [API docs](http://lodash.com/docs), [benchmarks](http://lodash.com/benchmarks), and [unit tests](http://lodash.com/tests).

Create your own benchmarks at [jsPerf](http://jsperf.com), or [search](http://jsperf.com/search?q=lodash) for existing ones.

For a list of upcoming features, check out our [roadmap](https://github.com/bestiejs/lodash/wiki/Roadmap).

## Screencasts

For more information check out these screencasts over Lo-Dash:

 * [Introducing Lo-Dash](https://vimeo.com/44154599)
 * [Lo-Dash optimizations and custom builds](https://vimeo.com/44154601)
 * [Lo-Dash’s origin and why it’s a better utility belt](https://vimeo.com/44154600)
 * [Unit testing in Lo-Dash](https://vimeo.com/45865290)

## Features

 * AMD loader support ([RequireJS](http://requirejs.org/), [curl.js](https://github.com/cujojs/curl), etc.)
 * [_.bind](http://lodash.com/docs#bind) supports *“lazy”* binding
 * [_.clone](http://lodash.com/docs#clone) supports *“deep”* cloning
 * [_.countBy](http://lodash.com/docs#countBy) as a companion function for [_.groupBy](http://lodash.com/docs#groupBy) and [_.sortBy](http://lodash.com/docs#sortBy)
 * [_.debounce](http://lodash.com/docs#debounce)’ed functions match [_.throttle](http://lodash.com/docs#throttle)’ed functions’ return value behavior
 * [_.drop](http://lodash.com/docs#drop) for the inverse functionality of [_.pick](http://lodash.com/docs#pick)
 * [_.forEach](http://lodash.com/docs#forEach) is chainable and supports exiting iteration early
 * [_.forIn](http://lodash.com/docs#forIn) for iterating over an object’s own and inherited properties
 * [_.forOwn](http://lodash.com/docs#forOwn) for iterating over an object’s own properties
 * [_.groupBy](http://lodash.com/docs#groupBy), [_.sortedIndex](http://lodash.com/docs#sortedIndex), and [_.uniq](http://lodash.com/docs#uniq) accept a `thisArg` argument
 * [_.indexOf](http://lodash.com/docs#indexOf) and [_.lastIndexOf](http://lodash.com/docs#lastIndexOf) accept a `fromIndex` argument
 * [_.merge](http://lodash.com/docs#merge) for a *“deep”* [_.extend](http://lodash.com/docs#extend)
 * [_.partial](http://lodash.com/docs#partial) for partial application without `this` binding
 * [_.pick](http://lodash.com/docs#pick) and [_.drop](http://lodash.com/docs#drop) accept `callback` and `thisArg` arguments
 * [_.sortBy](http://lodash.com/docs#sortBy) performs a [stable](http://en.wikipedia.org/wiki/Sorting_algorithm#Stability) sort
 * [_.template](http://lodash.com/docs#template) utilizes [sourceURLs](http://www.html5rocks.com/en/tutorials/developertools/sourcemaps/#toc-sourceurl) for easier debugging
 * [_.unescape](http://lodash.com/docs#unescape) to unescape strings escaped by [_.escape](http://lodash.com/docs#escape)
 * [_.where](http://lodash.com/docs#where) for filtering collections by contained properties
 * [_.zipObject](http://lodash.com/docs#zipObject) for composing objects
 * [_.contains](http://lodash.com/docs#contains), [_.size](http://lodash.com/docs#size), [_.toArray](http://lodash.com/docs#toArray),
   [and more…](http://lodash.com/docs "_.every, _.filter, _.find, _.forEach, _.groupBy, _.invoke, _.map, _.pluck, _.reduce, _.reduceRight, _.reject, _.some, _sortBy") accept strings

## Support

Lo-Dash has been tested in at least Chrome 5-21, Firefox 1-15, IE 6-9, Opera 9.25-12, Safari 3-6, Node.js 0.4.8-0.8.8, Narwhal 0.3.2, RingoJS 0.8, and Rhino 1.7RC5.

## Custom builds

Custom builds make it easy to create lightweight versions of Lo-Dash containing only the methods you need.
We handle all the method dependency and alias mapping for you.

 * Backbone builds, containing all methods required by Backbone, may be created using the `backbone` modifier argument.
```bash
lodash backbone
```

 * CSP builds, supporting default Content Security Policy restrictions, may be created using the `csp` modifier argument.
```bash
lodash csp
```

 * Legacy builds, tailored for older browsers without [ES5 support](http://es5.github.com/), may be created using the `legacy` modifier argument.
```bash
lodash legacy
```

 * Mobile builds, with IE < 9 bug fixes and method compilation removed, may be created using the `mobile` modifier argument.
```bash
lodash mobile
```

 * Strict builds, with `_.bindAll`, `_.defaults`, and `_.extend` in [strict mode](http://es5.github.com/#C), may be created using the `strict` modifier argument.
```bash
lodash strict
```

 * Underscore builds, containing only methods included in Underscore, may be created using the `underscore` modifier argument.
```bash
lodash underscore
```

Custom builds may be created in three ways:

 1. Use the `category` argument to pass the categories of methods to include in the build.<br>
    Valid categories are *“arrays”*, *“chaining”*, *“collections”*, *“functions”*, *“objects”*, and *“utilities”*.
```bash
lodash category=collections,functions
lodash category="collections, functions"
```

 2. Use the `exclude` argument to pass the names of methods to exclude from the build.
```bash
lodash exclude=union,uniq,zip
lodash exclude="union, uniq, zip"
```

 3. Use the `include` argument to pass the names of methods to include in the build.
```bash
lodash include=each,filter,map
lodash include="each, filter, map"
```

All arguments, except `backbone` with `underscore`, `exclude` with `include`, and `legacy` with `csp`/`mobile`, may be combined.

```bash
lodash backbone legacy category=utilities exclude=first,last
lodash underscore mobile strict category=functions include=pick,uniq
```

The `lodash` command-line utility is available when Lo-Dash is installed as a global package (i.e. `npm install -g lodash`).

Custom builds are saved to `lodash.custom.js` and `lodash.custom.min.js`.

## Installation and usage

In browsers:

```html
<script src="lodash.js"></script>
```

Using [npm](http://npmjs.org/):

```bash
npm install lodash
npm install -g lodash
```

In [Node.js](http://nodejs.org/) and [RingoJS v0.8.0+](http://ringojs.org/):

```js
var _ = require('lodash');
```

In [RingoJS v0.7.0-](http://ringojs.org/):

```js
var _ = require('lodash')._;
```

In [Rhino](http://www.mozilla.org/rhino/):

```js
load('lodash.js');
```

In an AMD loader like [RequireJS](http://requirejs.org/):

```js
require({
  'paths': {
    'underscore': 'path/to/lodash'
  }
},
['underscore'], function(_) {
  console.log(_.VERSION);
});
```

## Resolved Underscore.js issues <sup>(30+)</sup>

 * Allow iteration of objects with a `length` property [[#148](https://github.com/documentcloud/underscore/issues/148), [#154](https://github.com/documentcloud/underscore/issues/154), [#252](https://github.com/documentcloud/underscore/issues/252), [#448](https://github.com/documentcloud/underscore/issues/448), [#659](https://github.com/documentcloud/underscore/issues/659), [test](https://github.com/bestiejs/lodash/blob/v0.6.1/test/test.js#L578-584)]
 * Ensure array-like objects with invalid `length` properties are treated like regular objects [[test](https://github.com/bestiejs/lodash/blob/v0.6.1/test/test.js#L526-536)]
 * Ensure *“Arrays”*, “Collections”, and “Objects” methods don’t error when passed falsey arguments [[#650](https://github.com/documentcloud/underscore/pull/650), [test](https://github.com/bestiejs/lodash/blob/v0.6.1/test/test.js#L1668-1703)]
 * Ensure *“Collections”* methods allow string `collection` arguments [[#247](https://github.com/documentcloud/underscore/issues/247), [#276](https://github.com/documentcloud/underscore/issues/276), [#561](https://github.com/documentcloud/underscore/pull/561), [test](https://github.com/bestiejs/lodash/blob/v0.6.1/test/test.js#L538-555)]
 * Ensure templates compiled with errors are inspectable [[#666](https://github.com/documentcloud/underscore/issues/666), [test](https://github.com/bestiejs/lodash/blob/v0.6.1/test/test.js#L1383-1386)]
 * Fix cross-browser object iteration bugs [[#60](https://github.com/documentcloud/underscore/issues/60), [#376](https://github.com/documentcloud/underscore/issues/376), [test](https://github.com/bestiejs/lodash/blob/v0.6.1/test/test.js#L589-614)]
 * Handle arrays with `undefined` values correctly in IE < 9 [[#601](https://github.com/documentcloud/underscore/issues/601)]
 * Methods should work on pages with incorrectly shimmed native methods [[#7](https://github.com/documentcloud/underscore/issues/7), [test](https://github.com/bestiejs/lodash/blob/v0.6.1/test/test.js#L117-123)]
 * Register as an AMD module, but still export to global [[#431](https://github.com/documentcloud/underscore/pull/431), [test](https://github.com/bestiejs/lodash/blob/v0.6.1/test/test.js#L101-115)]
 * `_(…)` should return passed wrapper instances [[test](https://github.com/bestiejs/lodash/blob/v0.6.1/test/test.js#L135-138)]
 * `_.clone` should allow `deep` cloning [[#595](https://github.com/documentcloud/underscore/pull/595), [test](https://github.com/bestiejs/lodash/blob/v0.6.1/test/test.js#L205-220)]
 * `_.contains` should work with strings [[#667](https://github.com/documentcloud/underscore/pull/667), [test](https://github.com/bestiejs/lodash/blob/v0.6.1/test/test.js#L275-284)]
 * `_.countBy` and `_.groupBy` should only add values to own, not inherited, properties [[test](https://github.com/bestiejs/lodash/blob/v0.6.1/test/test.js#L292-299)]
 * `_.escape` should return an empty string when passed `null` or `undefined` [[#427](https://github.com/documentcloud/underscore/issues/427), [test](https://github.com/bestiejs/lodash/blob/v0.6.1/test/test.js#L402-405)]
 * `_.extend` should recursively extend objects [[#379](https://github.com/documentcloud/underscore/pull/379), [#718](https://github.com/documentcloud/underscore/issues/718), [test](https://github.com/bestiejs/lodash/blob/v0.6.1/test/test.js#L979-1001)]
 * `_.forEach` should be chainable [[#142](https://github.com/documentcloud/underscore/issues/142), [test](https://github.com/bestiejs/lodash/blob/v0.6.1/test/test.js#L521-524)]
 * `_.forEach` should allow exiting iteration early [[#211](https://github.com/documentcloud/underscore/issues/211), [test](https://github.com/bestiejs/lodash/blob/v0.6.1/test/test.js#L616-635)]
 * `_.isElement` should use strict equality for its duck type check [[test](https://github.com/bestiejs/lodash/blob/v0.6.1/test/test.js#L731-740)]
 * `_.isEmpty` and `_.size` should support jQuery/MooTools DOM query collections [[#690](https://github.com/documentcloud/underscore/pull/690), [test](https://github.com/bestiejs/lodash/blob/v0.6.1/test/test.js#L767-772)]
 * `_.isEqual` should return `true` for like-objects from different documents [[test](https://github.com/bestiejs/lodash/blob/v0.6.1/test/test.js#L808-828)]
 * `_.isObject` should avoid V8 bug [#2291](http://code.google.com/p/v8/issues/detail?id=2291) [[#605](https://github.com/documentcloud/underscore/issues/605), [test](https://github.com/bestiejs/lodash/blob/v0.6.1/test/test.js#L836-848)]
 * `_.isNaN(new Number(NaN))` should return `true` [[test](https://github.com/bestiejs/lodash/blob/v0.6.1/test/test.js#L856-858)]
 * `_.keys` and `_.size` should work with `arguments` objects cross-browser [[#396](https://github.com/documentcloud/underscore/issues/396), [#653](https://github.com/documentcloud/underscore/issues/653), [test](https://github.com/bestiejs/lodash/blob/v0.6.1/test/test.js#L912-914)]
 * `_.once` should free the given function for garbage collection [[#693](https://github.com/documentcloud/underscore/pull/693)]
 * `_.range` should coerce arguments to numbers [[#634](https://github.com/documentcloud/underscore/issues/634), [#683](https://github.com/documentcloud/underscore/issues/683), [test](https://github.com/bestiejs/lodash/blob/v0.6.1/test/test.js#L1170-1173)]
 * `_.reduceRight` should pass correct callback arguments when iterating objects [[test](https://github.com/bestiejs/lodash/blob/v0.6.1/test/test.js#L1205-1219)]
 * `_.size` should return the `length` of string values [[test](https://github.com/bestiejs/lodash/blob/v0.6.1/test/test.js#L1263-1265)]
 * `_.sortedIndex` should support arrays with high `length` values [[test](https://github.com/bestiejs/lodash/blob/v0.6.1/test/test.js#L1353-1362)]
 * `_.template` should not augment the `options` object [[test](https://github.com/bestiejs/lodash/blob/v0.6.1/test/test.js#L1377-1381)]
 * `_.throttle` should work when called in a loop [[#502](https://github.com/documentcloud/underscore/issues/502), [test](https://github.com/bestiejs/lodash/blob/v0.6.1/test/test.js#L1473-1483)]
 * `_.toArray` uses custom `toArray` methods of arrays and strings [[test](https://github.com/bestiejs/lodash/blob/v0.6.1/test/test.js#L1510-1518)]
 * `_.zipObject` should accept less than two arguments [[test](https://github.com/bestiejs/lodash/blob/v0.6.1/test/test.js#L1630-1632)]

## Optimized methods <sup>(50+)</sup>

 * `_.bind`
 * `_.bindAll`
 * `_.clone`
 * `_.compact`
 * `_.contains`, `_.include`
 * `_.defaults`
 * `_.defer`
 * `_.difference`
 * `_.drop`, `_.omit`
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

### <sup>v0.6.1</sup>

 * Ensured IE conditional compilation isn’t enabled by the `useSourceURL` test
 * Optimized `isPlainObject`

### <sup>v0.6.0</sup>

 * Added `callback` and `thisArg` arguments to `_.drop` and `_.pick`
 * Added `hasObjectSpliceBug` test to avoid `delete` operator use
 * Added `_.omit` alias for `_.drop`
 * Added [_.unescape](http://lodash.com/docs#unescape)
 * Ensured `_.reduce` works with string objects in IE < 9
 * Made compiled methods take advantage of engines with strict mode optimizations
 * Optimized `_.intersection` and removed its dependency on `_.every`
 * Reduced the file size of the `underscore` build

The full changelog is available [here](https://github.com/bestiejs/lodash/wiki/Changelog).

## BestieJS

Lo-Dash is part of the BestieJS *“Best in Class”* module collection. This means we promote solid browser/environment support, ES5 precedents, unit testing, and plenty of documentation.

## Author

* [John-David Dalton](http://allyoucanleet.com/)
  [![twitter/jdalton](http://gravatar.com/avatar/299a3d891ff1920b69c364d061007043?s=70)](https://twitter.com/jdalton "Follow @jdalton on Twitter")

## Contributors

* [Kit Cambridge](http://kitcambridge.github.com/)
  [![twitter/kitcambridge](http://gravatar.com/avatar/6662a1d02f351b5ef2f8b4d815804661?s=70)](https://twitter.com/kitcambridge "Follow @kitcambridge on Twitter")
* [Mathias Bynens](http://mathiasbynens.be/)
  [![twitter/mathias](http://gravatar.com/avatar/24e08a9ea84deb17ae121074d0f17125?s=70)](https://twitter.com/mathias "Follow @mathias on Twitter")
