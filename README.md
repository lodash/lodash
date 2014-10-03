# Lo-Dash v3.0.0-pre

A utility library delivering consistency, [customization](http://lodash.com/custom-builds), [performance](http://lodash.com/benchmarks), & [extras](http://lodash.com/#features).

## Documentation

* [API Documentation](http://lodash.com/docs)
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
Create [custom builds](http://lodash.com/custom-builds) with only the features you need.<br>
Love modules? We’ve got you covered with [lodash-amd](https://github.com/lodash/lodash-amd/tree/2.4.1), [lodash-node](https://npmjs.org/package/lodash-node), & [npm packages](https://npmjs.org/browse/keyword/lodash-modularized) per method.

## Dive in

Check out our [unit tests](http://lodash.com/tests), [benchmarks](http://lodash.com/benchmarks), [changelog](https://github.com/lodash/lodash/wiki/Changelog), [roadmap](https://github.com/lodash/lodash/wiki/Roadmap), as well as [community created podcasts, posts, & videos](https://github.com/lodash/lodash/wiki/Resources).

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
var _ = require('lodash');
// or as Underscore
var _ = require('lodash-underscore');
```

**Note:**
Don’t assign values to the [special variable](http://nodejs.org/api/repl.html#repl_repl_features) `_` when in the REPL

## Features *not* in Underscore

 * ~100% [code coverage](https://coveralls.io/r/lodash)
 * Module bundles for [AMD](https://github.com/lodash/lodash-amd/tree/2.4.1) & [Node.js](https://npmjs.org/package/lodash-node) as well as [npm packages](https://npmjs.org/browse/keyword/lodash-modularized)
 * Follows [semantic versioning](http://semver.org/) for releases
 * [_(…)](http://lodash.com/docs#_) supports intuitive chaining
 * [_.at](http://lodash.com/docs#at) for cherry-picking collection values
 * [_.attempt](http://lodash.com/docs#attempt) to execute functions which may error without a try-catch
 * [_.before](http://lodash.com/docs#before) to complement [_.after](http://lodash.com/docs#after)
 * [_.bindKey](http://lodash.com/docs#bindKey) for binding [*“lazy”*](http://michaux.ca/articles/lazy-function-definition-pattern) defined methods
 * [_.chunk](http://lodash.com/docs#chunk) for splitting an array into chunks of a given size
 * [_.clone](http://lodash.com/docs#clone) supports shallow cloning of `Date` & `RegExp` objects
 * [_.cloneDeep](http://lodash.com/docs#cloneDeep) for deep cloning arrays & objects
 * [_.contains](http://lodash.com/docs#contains) accepts a `fromIndex`
 * [_.create](http://lodash.com/docs#create) for easier object inheritance
 * [_.curry](http://lodash.com/docs#curry) & [_.curryRight](http://lodash.com/docs#curryRight) for creating [curried](http://hughfdjackson.com/javascript/why-curry-helps/) functions
 * [_.debounce](http://lodash.com/docs#debounce) & [_.throttle](http://lodash.com/docs#throttle) are cancelable & accept options for more control
 * [_.findIndex](http://lodash.com/docs#findIndex) & [_.findKey](http://lodash.com/docs#findKey) for finding indexes & keys
 * [_.flow](http://lodash.com/docs#flow) to complement [_.flowRight](http://lodash.com/docs#vlowRight) (a.k.a `_.compose`)
 * [_.forEach](http://lodash.com/docs#forEach) supports exiting early
 * [_.forIn](http://lodash.com/docs#forIn) for iterating all enumerable properties
 * [_.forOwn](http://lodash.com/docs#forOwn) for iterating own properties
 * [_.isError](http://lodash.com/docs#isError) to check for error objects
 * [_.isNative](http://lodash.com/docs#isNative) to check for native functions
 * [_.isPlainObject](http://lodash.com/docs#isPlainObject) to check for objects created by `Object`
 * [_.keysIn](http://lodash.com/docs#keysIn) & [_.valuesIn](http://lodash.com/docs#valuesIn) for getting keys and values of all enumerable properties
 * [_.mapValues](http://lodash.com/docs#mapValues) for [mapping](http://lodash.com/docs#map) values to an object
 * [_.merge](http://lodash.com/docs#merge) for a deep [_.extend](http://lodash.com/docs#extend)
 * [_.parseInt](http://lodash.com/docs#parseInt) for consistent behavior
 * [_.pull](http://lodash.com/docs#pull), [_.pullAt](http://lodash.com/docs#pullAt), & [_.remove](http://lodash.com/docs#remove) for mutating arrays
 * [_.random](http://lodash.com/docs#random) supports returning floating-point numbers
 * [_.runInContext](http://lodash.com/docs#runInContext) for collisionless mixins & easier mocking
 * [_.slice](http://lodash.com/docs#slice) for creating subsets of array-like values
 * [_.sortBy](http://lodash.com/docs#sortBy) supports sorting by multiple properties
 * [_.support](http://lodash.com/docs#support) for flagging environment features
 * [_.template](http://lodash.com/docs#template) supports [*“imports”*](http://lodash.com/docs#templateSettings_imports) options & [ES6 template delimiters](http://people.mozilla.org/~jorendorff/es6-draft.html#sec-template-literal-lexical-components)
 * [_.transform](http://lodash.com/docs#transform) as a powerful alternative to [_.reduce](http://lodash.com/docs#reduce) for transforming objects
 * [_.thru](http://lodash.com/docs#thru) to pass values thru method chains
 * [_.where](http://lodash.com/docs#where) supports deep object comparisons
 * [_.xor](http://lodash.com/docs#xor) to complement [_.difference](http://lodash.com/docs#difference), [_.intersection](http://lodash.com/docs#intersection), & [_.union](http://lodash.com/docs#union)
 * [_.bind](http://lodash.com/docs#bind), [_.curry](http://lodash.com/docs#curry), [_.partial](http://lodash.com/docs#partial), &
   [more](http://lodash.com/docs  "_.bindKey, _.curryRight, _.partialRight") support argument placeholders
 * [_.capitalize](http://lodash.com/docs#capitalize), [_.trim](http://lodash.com/docs#trim), &
   [more](http://lodash.com/docs "_.camelCase, _.deburr, _.endsWith, _.escapeRegExp, _.kebabCase, _.pad, _.padLeft, _.padRight, _.repeat, _.snakeCase, _.startsWith, _.trimLeft, _.trimRight, _.trunc, _.words") string methods
 * [_.clone](http://lodash.com/docs#clone), [_.isEqual](http://lodash.com/docs#isEqual), &
   [more](http://lodash.com/docs "_.assign, _.cloneDeep, _.merge") accept callbacks
 * [_.contains](http://lodash.com/docs#contains), [_.toArray](http://lodash.com/docs#toArray), &
   [more](http://lodash.com/docs "_.at, _.countBy, _.every, _.filter, _.find, _.findLast, _.forEach, _.forEachRight, _.groupBy, _.indexBy, _.invoke, _.map, _.max, _.min, _.partition, _.pluck, _.reduce, _.reduceRight, _.reject, _.shuffle, _.size, _.some, _.sortBy") accept strings
 * [_.dropWhile](http://lodash.com/docs#dropWhile), [_.takeWhile](http://lodash.com/docs#takeWhile), &
   [more](http://lodash.com/docs "_.drop, _.dropRightWhile, _.take, _.takeRightWhile") to complement [_.first](http://lodash.com/docs#first), [_.initial](http://lodash.com/docs#initial), [_.last](http://lodash.com/docs#last), & [_.rest](http://lodash.com/docs#rest)
 * [_.findLast](http://lodash.com/docs#findLast), [_.findLastIndex](http://lodash.com/docs#findLastIndex), &
   [more](http://lodash.com/docs "_.findLastKey, _.flowRight, _.forEachRight, _.forInRight, _.forOwnRight, _.partialRight") right-associative methods

## Support

Tested in Chrome (19, 36-37), Firefox (3, 20, 31-32), IE 6-11, Opera 23-24, Safari 5-7, Node.js 0.8.26~0.10.32, PhantomJS 1.9.7, RingoJS 0.9, & Rhino 1.7RC5.

Automated browser test runs [are available](https://saucelabs.com/u/lodash) as well as CI runs for [lodash](https://travis-ci.org/lodash/lodash/), [lodash-cli](https://travis-ci.org/lodash/lodash-cli/), [lodash-amd](https://travis-ci.org/lodash/lodash-amd/), [lodash-node](https://travis-ci.org/lodash/lodash-node/), & [grunt-lodash](https://travis-ci.org/lodash/grunt-lodash). Special thanks to [Sauce Labs](https://saucelabs.com/) for providing automated browser testing.

## Author

| [![twitter/jdalton](http://gravatar.com/avatar/299a3d891ff1920b69c364d061007043?s=70)](https://twitter.com/jdalton "Follow @jdalton on Twitter") |
|---|
| [John-David Dalton](http://allyoucanleet.com/) |

## Main Contributors

| [![twitter/blainebublitz](http://gravatar.com/avatar/ac1c67fd906c9fecd823ce302283b4c1?s=70)](https://twitter.com/blainebublitz "Follow @BlaineBublitz on Twitter") | [![twitter/kitcambridge](http://gravatar.com/avatar/6662a1d02f351b5ef2f8b4d815804661?s=70)](https://twitter.com/kitcambridge "Follow @kitcambridge on Twitter") | [![twitter/mathias](http://gravatar.com/avatar/24e08a9ea84deb17ae121074d0f17125?s=70)](https://twitter.com/mathias "Follow @mathias on Twitter") |
|---|---|---|
| [Blaine Bublitz](http://www.iceddev.com/) | [Kit Cambridge](http://kitcambridge.be/) | [Mathias Bynens](http://mathiasbynens.be/) |
