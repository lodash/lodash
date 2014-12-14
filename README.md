# Lo-Dash v3.0.0-pre

A utility library delivering consistency, [customization](https://lodash.com/custom-builds), [performance](https://lodash.com/benchmarks), & [extras](https://lodash.com/#features).

## Documentation

* [API Documentation](https://lodash.com/docs)
* [DevDocs – *a searchable interface for our documentation*](http://devdocs.io/lodash/)

## Download

Review the [build differences](https://github.com/lodash/lodash/wiki/build-differences) & pick the one that’s right for you.

* [Modern build](https://raw.github.com/lodash/lodash/2.4.1/dist/lodash.js) ([minified](https://raw.github.com/lodash/lodash/2.4.1/dist/lodash.min.js))<br>
  For new environments like Chrome, Firefox, IE ≥ 9, & Safari ≥ 5.1
* [Compatibility build](https://raw.github.com/lodash/lodash/2.4.1/dist/lodash.compat.js) ([minified](https://raw.github.com/lodash/lodash/2.4.1/dist/lodash.compat.min.js))<br>
  For new & old environments like IE ≤ 8 & PhantomJS
* [Underscore build](https://raw.github.com/lodash/lodash/2.4.1/dist/lodash.underscore.js) ([minified](https://raw.github.com/lodash/lodash/2.4.1/dist/lodash.underscore.min.js))<br>
  A drop-in replacement for [Underscore v1.6.0](http://underscorejs.org/#1.6.0)

CDN copies are available on [cdnjs](http://cdnjs.com/libraries/lodash.js/) & [jsDelivr](http://www.jsdelivr.com/#!lodash).<br>
Create [custom builds](https://lodash.com/custom-builds) with only the features you need.<br>
Love modules? We’ve got you covered with [lodash-amd](https://github.com/lodash/lodash-amd/tree/2.4.1), [lodash-node](https://npmjs.org/package/lodash-node), & [npm packages](https://npmjs.org/browse/keyword/lodash-modularized) per method.

## Dive in

Check out our [unit tests](https://lodash.com/tests), [benchmarks](https://lodash.com/benchmarks), [changelog](https://github.com/lodash/lodash/wiki/Changelog), [roadmap](https://github.com/lodash/lodash/wiki/Roadmap), as well as [community created podcasts, posts, & videos](https://github.com/lodash/lodash/wiki/Resources).

## Installation

In a browser:

```html
<script src="lodash.js"></script>
```

In an AMD loader:

```js
require(['lodash'], function(_) {/*…*/});
```

Using npm:

```bash
$ npm i --save lodash

$ {sudo -H} npm i -g lodash
$ npm ln lodash
```

In Node.js:

```js
// the default modern build
var _ = require('lodash');

// or the compat build
var _ = require('lodash-compat');

// or a specific method
var clone = require('lodash/lang/clone');
var keysIn = require('lodash-compat/object/keysIn');
```

**Note:**
Don’t assign values to the [special variable](http://nodejs.org/api/repl.html#repl_repl_features) `_` when in the REPL.
Install [n_](https://www.npmjs.org/package/n_) for a version of the REPL that includes Lo-Dash by default.

## Features *not* in Underscore

 * ~100% [code coverage](https://coveralls.io/r/lodash)
 * Module bundles for [AMD](https://github.com/lodash/lodash-amd/tree/2.4.1), [ES6](https://github.com/lodash/lodash-es6/tree/2.4.1), & [Node.js](https://npmjs.org/package/lodash-node) as well as [npm packages](https://npmjs.org/browse/keyword/lodash-modularized)
 * Follows [semantic versioning](http://semver.org/) for releases
 * Deferred chaining & [lazy evaluation](http://filimanjaro.com/blog/2014/introducing-lazy-evaluation/)
 * [_(…)](https://lodash.com/docs#_) supports intuitive chaining
 * [_.ary](https://lodash.com/docs#ary) & [_.rearg](https://lodash.com/docs#rearg) to change function argument limits & order
 * [_.at](https://lodash.com/docs#at) for cherry-picking collection values
 * [_.attempt](https://lodash.com/docs#attempt) to execute functions which may error without a try-catch
 * [_.before](https://lodash.com/docs#before) to complement [_.after](https://lodash.com/docs#after)
 * [_.bindKey](https://lodash.com/docs#bindKey) for binding [*“lazy”*](http://michaux.ca/articles/lazy-function-definition-pattern) defined methods
 * [_.chunk](https://lodash.com/docs#chunk) for splitting an array into chunks of a given size
 * [_.clone](https://lodash.com/docs#clone) supports shallow cloning of `Date` & `RegExp` objects
 * [_.cloneDeep](https://lodash.com/docs#cloneDeep) for deep cloning arrays & objects
 * [_.create](https://lodash.com/docs#create) for easier object inheritance
 * [_.curry](https://lodash.com/docs#curry) & [_.curryRight](https://lodash.com/docs#curryRight) for creating [curried](http://hughfdjackson.com/javascript/why-curry-helps/) functions
 * [_.debounce](https://lodash.com/docs#debounce) & [_.throttle](https://lodash.com/docs#throttle) are cancelable & accept options for more control
 * [_.findIndex](https://lodash.com/docs#findIndex) & [_.findKey](https://lodash.com/docs#findKey) for finding indexes & keys
 * [_.flow](https://lodash.com/docs#flow) to complement [_.flowRight](https://lodash.com/docs#vlowRight) (a.k.a `_.compose`)
 * [_.forEach](https://lodash.com/docs#forEach) supports exiting early
 * [_.forIn](https://lodash.com/docs#forIn) for iterating all enumerable properties
 * [_.forOwn](https://lodash.com/docs#forOwn) for iterating own properties
 * [_.includes](https://lodash.com/docs#includes) accepts a `fromIndex`
 * [_.isError](https://lodash.com/docs#isError) to check for error objects
 * [_.isNative](https://lodash.com/docs#isNative) to check for native functions
 * [_.isPlainObject](https://lodash.com/docs#isPlainObject) to check for objects created by `Object`
 * [_.keysIn](https://lodash.com/docs#keysIn) & [_.valuesIn](https://lodash.com/docs#valuesIn) for getting keys & values of all enumerable properties
 * [_.mapValues](https://lodash.com/docs#mapValues) for [mapping](https://lodash.com/docs#map) values to an object
 * [_.merge](https://lodash.com/docs#merge) for a deep [_.extend](https://lodash.com/docs#extend)
 * [_.parseInt](https://lodash.com/docs#parseInt) for consistent behavior
 * [_.pull](https://lodash.com/docs#pull), [_.pullAt](https://lodash.com/docs#pullAt), & [_.remove](https://lodash.com/docs#remove) for mutating arrays
 * [_.random](https://lodash.com/docs#random) supports returning floating-point numbers
 * [_.runInContext](https://lodash.com/docs#runInContext) for collisionless mixins & easier mocking
 * [_.slice](https://lodash.com/docs#slice) for creating subsets of array-like values
 * [_.sortBy](https://lodash.com/docs#sortBy) supports sorting by multiple properties
 * [_.support](https://lodash.com/docs#support) for flagging environment features
 * [_.template](https://lodash.com/docs#template) supports [*“imports”*](https://lodash.com/docs#templateSettings_imports) options & [ES6 template delimiters](http://people.mozilla.org/~jorendorff/es6-draft.html#sec-template-literal-lexical-components)
 * [_.transform](https://lodash.com/docs#transform) as a powerful alternative to [_.reduce](https://lodash.com/docs#reduce) for transforming objects
 * [_.thru](https://lodash.com/docs#thru) to pass values thru method chains
 * [_.where](https://lodash.com/docs#where) supports deep object comparisons
 * [_.xor](https://lodash.com/docs#xor) to complement [_.difference](https://lodash.com/docs#difference), [_.intersection](https://lodash.com/docs#intersection), & [_.union](https://lodash.com/docs#union)
 * [_.bind](https://lodash.com/docs#bind), [_.curry](https://lodash.com/docs#curry), [_.partial](https://lodash.com/docs#partial), &
   [more](https://lodash.com/docs  "_.bindKey, _.curryRight, _.partialRight") support argument placeholders
 * [_.capitalize](https://lodash.com/docs#capitalize), [_.trim](https://lodash.com/docs#trim), &
   [more](https://lodash.com/docs "_.camelCase, _.deburr, _.endsWith, _.escapeRegExp, _.kebabCase, _.pad, _.padLeft, _.padRight, _.repeat, _.snakeCase, _.startsWith, _.trimLeft, _.trimRight, _.trunc, _.words") string methods
 * [_.clone](https://lodash.com/docs#clone), [_.isEqual](https://lodash.com/docs#isEqual), &
   [more](https://lodash.com/docs "_.assign, _.cloneDeep, _.merge") accept callbacks
 * [_.dropWhile](https://lodash.com/docs#dropWhile), [_.takeWhile](https://lodash.com/docs#takeWhile), &
   [more](https://lodash.com/docs "_.drop, _.dropRightWhile, _.take, _.takeRightWhile") to complement [_.first](https://lodash.com/docs#first), [_.initial](https://lodash.com/docs#initial), [_.last](https://lodash.com/docs#last), & [_.rest](https://lodash.com/docs#rest)
 * [_.findLast](https://lodash.com/docs#findLast), [_.findLastIndex](https://lodash.com/docs#findLastIndex), &
   [more](https://lodash.com/docs "_.findLastKey, _.flowRight, _.forEachRight, _.forInRight, _.forOwnRight, _.partialRight") right-associative methods
 * [_.includes](https://lodash.com/docs#includes), [_.toArray](https://lodash.com/docs#toArray), &
   [more](https://lodash.com/docs "_.at, _.countBy, _.every, _.filter, _.find, _.findLast, _.forEach, _.forEachRight, _.groupBy, _.indexBy, _.invoke, _.map, _.max, _.min, _.partition, _.pluck, _.reduce, _.reduceRight, _.reject, _.shuffle, _.size, _.some, _.sortBy") accept strings

## Support

Tested in Chrome (19, 38-39), Firefox (3, 20, 33-34), IE 6-11, Opera 25-26, Safari 5-8, Node.js 0.8.26~0.10.33, PhantomJS 1.9.7, RingoJS 0.9, & Rhino 1.7RC5.

Automated browser test runs [are available](https://saucelabs.com/u/lodash) as well as CI runs for [lodash](https://travis-ci.org/lodash/lodash/), [lodash-cli](https://travis-ci.org/lodash/lodash-cli/), [lodash-amd](https://travis-ci.org/lodash/lodash-amd/), [lodash-node](https://travis-ci.org/lodash/lodash-node/), & [grunt-lodash](https://travis-ci.org/lodash/grunt-lodash). Special thanks to [Sauce Labs](https://saucelabs.com/) for providing automated browser testing.

## Author

| [![twitter/jdalton](http://gravatar.com/avatar/299a3d891ff1920b69c364d061007043?s=70)](https://twitter.com/jdalton "Follow @jdalton on Twitter") |
|---|
| [John-David Dalton](http://allyoucanleet.com/) |

## Main Contributors

| [![twitter/demoneaux](http://gravatar.com/avatar/029b19dba521584d83398ada3ecf6131?s=70)](https://twitter.com/demoneaux "Follow @demoneaux on Twitter") | [![twitter/blainebublitz](http://gravatar.com/avatar/ac1c67fd906c9fecd823ce302283b4c1?s=70)](https://twitter.com/blainebublitz "Follow @BlaineBublitz on Twitter") | [![twitter/kitcambridge](http://gravatar.com/avatar/6662a1d02f351b5ef2f8b4d815804661?s=70)](https://twitter.com/kitcambridge "Follow @kitcambridge on Twitter") | [![twitter/mathias](http://gravatar.com/avatar/24e08a9ea84deb17ae121074d0f17125?s=70)](https://twitter.com/mathias "Follow @mathias on Twitter") |
|---|---|---|---|
| [Benjamin Tan](http://d10.github.io/) | [Blaine Bublitz](http://www.iceddev.com/) | [Kit Cambridge](http://kitcambridge.be/) | [Mathias Bynens](https://mathiasbynens.be/) |
