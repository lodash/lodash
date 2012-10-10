# Lo-Dash <sup>v0.8.2</sup>
[![build status](https://secure.travis-ci.org/bestiejs/lodash.png)](http://travis-ci.org/bestiejs/lodash)

A drop-in replacement<sup>[*](https://github.com/bestiejs/lodash/wiki/Drop-in-Disclaimer)</sup> for Underscore.js, from the devs behind [jsPerf.com](http://jsperf.com), delivering [performance](http://lodash.com/benchmarks), [bug fixes](https://github.com/bestiejs/lodash#resolved-underscorejs-issues), and [additional features](http://lodash.com/#features).

Lo-Dash’s performance is gained by avoiding slower native methods, instead opting for simplified non-ES5 compliant methods optimized for common usage, and by leveraging function compilation to reduce the number of overall function calls.

## Download

 * [Development build](https://raw.github.com/bestiejs/lodash/v0.8.2/lodash.js)
 * [Production build](https://raw.github.com/bestiejs/lodash/v0.8.2/lodash.min.js)
 * [Underscore build](https://raw.github.com/bestiejs/lodash/v0.8.2/lodash.underscore.min.js) tailored for projects already using Underscore
 * CDN copies of ≤ [v0.8.2](http://cdnjs.cloudflare.com/ajax/libs/lodash.js/0.8.2/lodash.min.js) are available on [cdnjs](http://cdnjs.com/) thanks to [CloudFlare](http://www.cloudflare.com/)
 * For optimal file size, [create a custom build](https://github.com/bestiejs/lodash#custom-builds) with only the features you need

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
 * [Lo-Dash’s approach to native method use](https://vimeo.com/48576012)

## Features

 * AMD loader support ([RequireJS](http://requirejs.org/), [curl.js](https://github.com/cujojs/curl), etc.)
 * [_.clone](http://lodash.com/docs#clone) supports *“deep”* cloning
 * [_.forEach](http://lodash.com/docs#forEach) is chainable and supports exiting iteration early
 * [_.forIn](http://lodash.com/docs#forIn) for iterating over an object’s own and inherited properties
 * [_.forOwn](http://lodash.com/docs#forOwn) for iterating over an object’s own properties
 * [_.isPlainObject](http://lodash.com/docs#isPlainObject) checks if values are created by the `Object` constructor
 * [_.lateBind](http://lodash.com/docs#lateBind) for late binding
 * [_.merge](http://lodash.com/docs#merge) for a *“deep”* [_.extend](http://lodash.com/docs#extend)
 * [_.partial](http://lodash.com/docs#partial) for partial application without `this` binding
 * [_.pick](http://lodash.com/docs#pick) and [_.omit](http://lodash.com/docs#omit) accept `callback` and `thisArg` arguments
 * [_.template](http://lodash.com/docs#template) utilizes [sourceURLs](http://www.html5rocks.com/en/tutorials/developertools/sourcemaps/#toc-sourceurl) for easier debugging
 * [_.contains](http://lodash.com/docs#contains), [_.size](http://lodash.com/docs#size), [_.toArray](http://lodash.com/docs#toArray),
   [and more…](http://lodash.com/docs "_.countBy, _.every, _.filter, _.find, _.forEach, _.groupBy, _.invoke, _.map, _.pluck, _.reduce, _.reduceRight, _.reject, _.some, _.sortBy, _.where") accept strings

## Support

Lo-Dash has been tested in at least Chrome 5~22, Firefox 1~16, IE 6-10, Opera 9.25-12, Safari 3-6, Node.js 0.4.8-0.8.11, Narwhal 0.3.2, RingoJS 0.8, and Rhino 1.7RC5.

## Custom builds

Custom builds make it easy to create lightweight versions of Lo-Dash containing only the methods you need.
To top it off, we handle all method dependency and alias mapping for you.

 * Backbone builds, with only methods required by Backbone, may be created using the `backbone` modifier argument.
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

 * Underscore builds, tailored for projects already using Underscore, may be created using the `underscore` modifier argument.
```bash
lodash underscore
```

Custom builds may be created using the following commands:

 * Use the `category` argument to pass comma separated categories of methods to include in the build.<br>
   Valid categories (case-insensitive) are *“arrays”*, *“chaining”*, *“collections”*, *“functions”*, *“objects”*, and *“utilities”*.
```bash
lodash category=collections,functions
lodash category="collections, functions"
```

 * Use the `exports` argument to pass comma separated names of ways to export the `LoDash` function.<br>
   Valid exports are *“amd”*, *“commonjs”*, *“global”*, *“node”*, and *“none”*.
```bash
lodash exports=amd,commonjs,node
lodash exports="amd, commonjs, node"
```

 * Use the `iife` argument to specify code to replace the immediately-invoked function expression that wraps Lo-Dash.
```bash
lodash iife="!function(window,undefined){%output%}(this)"
```

 * Use the `include` argument to pass comma separated method/category names to include in the build.
```bash
lodash include=each,filter,map
lodash include="each, filter, map"
```

 * Use the `minus` argument to pass comma separated method/category names to remove from those included in the build.
```bash
lodash underscore minus=result,shuffle
lodash underscore minus="result, shuffle"
```

 * Use the `plus` argument to pass comma separated method/category names to add to those included in the build.
```bash
lodash backbone plus=random,template
lodash backbone plus="random, template"
```

 * Use the `template` argument to pass the file path pattern used to match template files to precompile
```bash
lodash template="./*.jst"
```

 * Use the `settings` argument to pass the template settings used when precompiling templates
```bash
lodash settings="{interpolate:/\\{\\{([\\s\\S]+?)\\}\\}/g}"
```

All arguments, except `legacy` with `csp` or `mobile`, may be combined.<br>
Unless specified by `-o` or `--output`, all files created are saved to the current working directory.

The following options are also supported:

 * `-c`, `--stdout`&nbsp;&nbsp;&nbsp;&nbsp; Write output to standard output
 * `-d`, `--debug`&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Write only the debug output
 * `-h`, `--help`&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Display help information
 * `-m`, `--minify`&nbsp;&nbsp;&nbsp;&nbsp; Write only the minified output
 * `-o`, `--output`&nbsp;&nbsp;&nbsp;&nbsp; Write output to a given path/filename
 * `-s`, `--silent`&nbsp;&nbsp;&nbsp;&nbsp; Skip status updates normally logged to the console
 * `-V`, `--version`&nbsp;&nbsp; Output current version of Lo-Dash

The `lodash` command-line utility is available when Lo-Dash is installed as a global package (i.e. `npm install -g lodash`).

## Installation and usage

In browsers:

```html
<script src="lodash.js"></script>
```

Using [npm](http://npmjs.org/):

```bash
npm install lodash

npm install -g lodash
npm link lodash
```

In [Node.js](http://nodejs.org/) and [RingoJS v0.8.0+](http://ringojs.org/):

```js
var _ = require('lodash');
```

**Note:** If Lo-Dash is installed globally, [run `npm link lodash`](http://blog.nodejs.org/2011/03/23/npm-1-0-global-vs-local-installation/) in your project’s root directory before requiring it.

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

## Resolved Underscore.js issues

 * Add AMD loader support [[#431](https://github.com/documentcloud/underscore/pull/431), [test](https://github.com/bestiejs/lodash/blob/v0.8.2/test/test.js#L118-140)]
 * Allow iteration of objects with a `length` property [[#799](https://github.com/documentcloud/underscore/pull/799), [test](https://github.com/bestiejs/lodash/blob/v0.8.2/test/test.js#L510-516)]
 * Ensure *“Collections”* methods allow string `collection` arguments [[#247](https://github.com/documentcloud/underscore/issues/247), [#276](https://github.com/documentcloud/underscore/issues/276), [#561](https://github.com/documentcloud/underscore/pull/561), [test](https://github.com/bestiejs/lodash/blob/v0.8.2/test/test.js#L470-487)]
 * Fix cross-browser object iteration bugs [[#60](https://github.com/documentcloud/underscore/issues/60), [#376](https://github.com/documentcloud/underscore/issues/376), [test](https://github.com/bestiejs/lodash/blob/v0.8.2/test/test.js#L523-547)]
 * Methods should work on pages with incorrectly shimmed native methods [[#7](https://github.com/documentcloud/underscore/issues/7), [#742](https://github.com/documentcloud/underscore/issues/742), [test](https://github.com/bestiejs/lodash/blob/v0.8.2/test/test.js#L142-148)]
 * `_.clone` should allow `deep` cloning [[#595](https://github.com/documentcloud/underscore/pull/595), [test](https://github.com/bestiejs/lodash/blob/v0.8.2/test/test.js#L214-225)]
 * `_.contains` should work with strings [[#667](https://github.com/documentcloud/underscore/pull/667), [test](https://github.com/bestiejs/lodash/blob/v0.8.2/test/test.js#L267-276)]
 * `_.extend` should recursively extend objects [[#379](https://github.com/documentcloud/underscore/pull/379), [#718](https://github.com/documentcloud/underscore/issues/718), [test](https://github.com/bestiejs/lodash/blob/v0.8.2/test/test.js#L968-990)]
 * `_.forEach` should be chainable [[#142](https://github.com/documentcloud/underscore/issues/142), [test](https://github.com/bestiejs/lodash/blob/v0.8.2/test/test.js#L465-468)]
 * `_.forEach` should allow exiting iteration early [[#211](https://github.com/documentcloud/underscore/issues/211), [test](https://github.com/bestiejs/lodash/blob/v0.8.2/test/test.js#L553-571)]
 * `_.isEmpty` should support jQuery/MooTools DOM query collections [[#690](https://github.com/documentcloud/underscore/pull/690), [test](https://github.com/bestiejs/lodash/blob/v0.8.2/test/test.js#L712-717)]
 * `_.isObject` should avoid V8 bug [#2291](http://code.google.com/p/v8/issues/detail?id=2291) [[#605](https://github.com/documentcloud/underscore/issues/605), [test](https://github.com/bestiejs/lodash/blob/v0.8.2/test/test.js#L772-784)]
 * `_.keys` should work with `arguments` objects cross-browser [[#396](https://github.com/documentcloud/underscore/issues/396), [test](https://github.com/bestiejs/lodash/blob/v0.8.2/test/test.js#L865-867)]
 * `_.range` should coerce arguments to numbers [[#634](https://github.com/documentcloud/underscore/issues/634), [#683](https://github.com/documentcloud/underscore/issues/683), [test](https://github.com/bestiejs/lodash/blob/v0.8.2/test/test.js#L1243-1246)]

## Optimized methods <sup>(50+)</sup>

 * `_.bind`
 * `_.bindAll`
 * `_.compact`
 * `_.contains`, `_.include`
 * `_.defaults`
 * `_.difference`
 * `_.each`
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
 * `_.invert`
 * `_.invoke`
 * `_.isArguments`
 * `_.isDate`
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
 * `_.omit`
 * `_.pairs`
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
 * `_.where`
 * `_.without`
 * `_.wrap`
 * `_.zip`
 * plus all `_(…)` method wrappers

## Release Notes

### <sup>v0.8.2</sup>

 * Ensured `_.map` returns an array when passed a falsey collection
 * Ensured `_.throttle` clears its timeout when `func` is called
 * Made `_.max`, `_.min`, `_.shuffle` support iterating objects
 * Reduced `createIterator`, `_.clone`, and `_.compact`
 * Re-optimized `_.max`, `_.min`, and `_.sortedIndex`

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
