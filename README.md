# Lo-Dash v1.3.1

A utility library delivering consistency, [customization](http://lodash.com/custom-builds), [performance](http://lodash.com/benchmarks), & [extras](http://lodash.com/#features).

## Download

* Modern builds:
[Development](https://raw.github.com/lodash/lodash/1.3.1/dist/lodash.js) &
[Production](https://raw.github.com/lodash/lodash/1.3.1/dist/lodash.min.js)

* Compatibility builds:
[Development](https://raw.github.com/lodash/lodash/1.3.1/dist/lodash.compat.js) &
[Production](https://raw.github.com/lodash/lodash/1.3.1/dist/lodash.compat.min.js)

* Underscore builds:
[Development](https://raw.github.com/lodash/lodash/1.3.1/dist/lodash.underscore.js) &
[Production](https://raw.github.com/lodash/lodash/1.3.1/dist/lodash.underscore.min.js)

CDN copies are available on [cdnjs](http://cdnjs.com/) & [jsDelivr](http://www.jsdelivr.com/#!lodash).<br>
For smaller file sizes, create [custom builds](http://lodash.com/custom-builds) with only the features needed.

## Dive in

There’s plenty of [documentation](http://lodash.com/docs), [unit tests](http://lodash.com/tests), & [benchmarks](http://lodash.com/benchmarks).

For a list of upcoming features, check out our [roadmap](https://github.com/lodash/lodash/wiki/Roadmap).

## Features *not* in Underscore

 * AMD loader support ([curl](https://github.com/cujojs/curl), [dojo](http://dojotoolkit.org/), [requirejs](http://requirejs.org/), etc.)
 * [_(…)](http://lodash.com/docs#_) supports intuitive chaining
 * [_.at](http://lodash.com/docs#at) for cherry-picking collection values
 * [_.bindKey](http://lodash.com/docs#bindKey) for binding [*“lazy”*](http://michaux.ca/articles/lazy-function-definition-pattern) defined methods
 * [_.cloneDeep](http://lodash.com/docs#cloneDeep) for deep cloning arrays & objects
 * [_.contains](http://lodash.com/docs#contains) accepts a `fromIndex`
 * [_.createCallback](http://lodash.com/docs#createCallback) for extending callbacks in methods & mixins
 * [_.debounce](http://lodash.com/docs#debounce) & [_.throttle](http://lodash.com/docs#throttle) accept `options` for more control
 * [_.findIndex](http://lodash.com/docs#findIndex) & [_.findKey](http://lodash.com/docs#findKey) for finding indexes & keys
 * [_.forEach](http://lodash.com/docs#forEach) is chainable & supports exiting early
 * [_.forIn](http://lodash.com/docs#forIn) for iterating own & inherited properties
 * [_.forOwn](http://lodash.com/docs#forOwn) for iterating own properties
 * [_.isPlainObject](http://lodash.com/docs#isPlainObject) for checking if values are created by `Object`
 * [_.memoize](http://lodash.com/docs#memoize) exposes the `cache` of memoized functions
 * [_.merge](http://lodash.com/docs#merge) for a deep [_.extend](http://lodash.com/docs#extend)
 * [_.parseInt](http://lodash.com/docs#parseInt) for consistent behavior
 * [_.partialRight](http://lodash.com/docs#partialRight) for [partial application](http://lodash.com/docs#partial) from the right
 * [_.runInContext](http://lodash.com/docs#runInContext) for easier mocking
 * [_.support](http://lodash.com/docs#support) for flagging environment features
 * [_.template](http://lodash.com/docs#template) supports [*“imports”*](http://lodash.com/docs#templateSettings_imports) options & [ES6 template delimiters](http://people.mozilla.org/~jorendorff/es6-draft.html#sec-7.8.6)
 * [_.transform](http://lodash.com/docs#transform) as a powerful alternative to [_.reduce](http://lodash.com/docs#reduce) for transforming objects
 * [_.unzip](http://lodash.com/docs#unzip) as the inverse of [_.zip](http://lodash.com/docs#zip)
 * [_.where](http://lodash.com/docs#where) supports deep object comparisons
 * [_.omit](http://lodash.com/docs#omit), [_.pick](http://lodash.com/docs#pick), &
   [more](http://lodash.com/docs "_.assign, _.clone, _.cloneDeep, _.first, _.initial, _.isEqual, _.last, _.merge, _.rest") accept callbacks
 * [_.contains](http://lodash.com/docs#contains), [_.toArray](http://lodash.com/docs#toArray), &
   [more](http://lodash.com/docs "_.at, _.countBy, _.every, _.filter, _.find, _.forEach, _.forEachRight, _.groupBy, _.invoke, _.map, _.max, _.min, _.pluck, _.reduce, _.reduceRight, _.reject, _.shuffle, _.size, _.some, _.sortBy, _.where") accept strings
 * [_.filter](http://lodash.com/docs#filter), [_.map](http://lodash.com/docs#map), &
   [more](http://lodash.com/docs "_.countBy, _.every, _.find, _.findKey, _.findLast, _.findLastIndex, _.findLastKey, _.first, _.groupBy, _.initial, _.last, _.max, _.min, _.reject, _.rest, _.some, _.sortBy, _.sortedIndex, _.uniq") support *“_.pluck”* & *“_.where”* shorthands

## Resources

 * Posts
  - [Say “Hello” to Lo-Dash](http://kitcambridge.be/blog/say-hello-to-lo-dash/)

 * Videos
  - [Introduction](https://vimeo.com/44154599)
  - [Origins](https://vimeo.com/44154600)
  - [Optimizations & builds](https://vimeo.com/44154601)
  - [Native method use](https://vimeo.com/48576012)
  - [Testing](https://vimeo.com/45865290)
  - [CascadiaJS ’12](http://www.youtube.com/watch?v=dpPy4f_SeEk)

## Support

Tested in Chrome 5~28, Firefox 2~22, IE 6-10, Opera 9.25~15, Safari 3-6, Node.js 0.4.8-0.10.15, Narwhal 0.3.2, PhantomJS 1.9.1, RingoJS 0.9, & Rhino 1.7RC5.

## Installation & usage

In browsers:

```html
<script src="lodash.js"></script>
```

Using [`npm`](http://npmjs.org/):

```bash
npm install lodash

npm install -g lodash
npm link lodash
```

In [Node.js](http://nodejs.org/) & [Ringo](http://ringojs.org/):

```js
var _ = require('lodash');
// or as an Underscore replacement
var _ = require('lodash/dist/lodash.underscore');
```

**Notes:**
 * Don’t assign values to [special variable](http://nodejs.org/api/repl.html#repl_repl_features) `_` when in the REPL
 * If Lo-Dash is installed globally, run [`npm link lodash`](http://blog.nodejs.org/2011/03/23/npm-1-0-global-vs-local-installation/) in your project’s root directory *before* requiring it
 * Node.js 0.10.8-0.10.11 [have](https://github.com/joyent/node/issues/5622) [bugs](https://github.com/joyent/node/issues/5688) preventing minified builds

In [Rhino](http://www.mozilla.org/rhino/):

```js
load('lodash.js');
```

In an AMD loader:

```js
require({
  'paths': { 'underscore': 'path/to/lodash' }
},
['underscore'], function(_) {
  console.log(_.VERSION);
});
```

## Release Notes

### <sup>v1.3.1</sup>

 * Added missing `cache` property to the objects returned by `getObject`
 * Ensured `maxWait` unit tests pass in Ringo
 * Increased the `maxPoolSize` value
 * Optimized `releaseArray` & `releaseObject`

The full changelog is available [here](https://github.com/lodash/lodash/wiki/Changelog).

## BestieJS

Lo-Dash is part of the [BestieJS](https://github.com/bestiejs) *“Best in Class”* module collection. This means it promotes solid environment support, ES5+ precedents, unit testing, & plenty of documentation.

## Author

| [![twitter/jdalton](http://gravatar.com/avatar/299a3d891ff1920b69c364d061007043?s=70)](http://twitter.com/jdalton "Follow @jdalton on Twitter") |
|---|
| [John-David Dalton](http://allyoucanleet.com/) |

## Contributors

| [![twitter/blainebublitz](http://gravatar.com/avatar/ac1c67fd906c9fecd823ce302283b4c1?s=70)](http://twitter.com/blainebublitz "Follow @BlaineBublitz on Twitter") | [![twitter/kitcambridge](http://gravatar.com/avatar/6662a1d02f351b5ef2f8b4d815804661?s=70)](https://twitter.com/kitcambridge "Follow @kitcambridge on Twitter") | [![twitter/mathias](http://gravatar.com/avatar/24e08a9ea84deb17ae121074d0f17125?s=70)](http://twitter.com/mathias "Follow @mathias on Twitter") |
|---|---|---|
| [Blaine Bublitz](http://iceddev.com/) | [Kit Cambridge](http://kitcambridge.github.io/) | [Mathias Bynens](http://mathiasbynens.be/) |
