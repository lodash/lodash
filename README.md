# Lo-Dash <sup>v1.0.0-rc.3</sup>
[![build status](https://secure.travis-ci.org/bestiejs/lodash.png)](http://travis-ci.org/bestiejs/lodash)

An alternative to Underscore.js, delivering [consistency](https://github.com/bestiejs/lodash#resolved-underscorejs-issues), [customization](https://github.com/bestiejs/lodash#custom-builds), [performance](http://lodash.com/benchmarks), and [extra features](https://github.com/bestiejs/lodash#features).

## Download

* Lo-Dash builds:<br>
[Development](https://raw.github.com/bestiejs/lodash/v1.0.0-rc.3/lodash.js) and
[Production](https://raw.github.com/bestiejs/lodash/v1.0.0-rc.3/lodash.min.js)

* Underscore compatibility builds:<br>
[Development](https://raw.github.com/bestiejs/lodash/v1.0.0-rc.3/lodash.underscore.js) and
[Production](https://raw.github.com/bestiejs/lodash/v1.0.0-rc.3/lodash.underscore.min.js)

* CDN copies of ≤ v1.0.0-rc.3’s builds are available on [cdnjs](http://cdnjs.com/) thanks to [CloudFlare](http://www.cloudflare.com/):<br>
[Lo-Dash dev](http://cdnjs.cloudflare.com/ajax/libs/lodash.js/1.0.0-rc.3/lodash.js),
[Lo-Dash prod](http://cdnjs.cloudflare.com/ajax/libs/lodash.js/1.0.0-rc.3/lodash.min.js),
[Underscore compat-dev](http://cdnjs.cloudflare.com/ajax/libs/lodash.js/1.0.0-rc.3/lodash.underscore.js), and
[Underscore compat-prod](http://cdnjs.cloudflare.com/ajax/libs/lodash.js/1.0.0-rc.3/lodash.underscore.min.js)

* For optimal file size, [create a custom build](https://github.com/bestiejs/lodash#custom-builds) with only the features you need

## Dive in

We’ve got [API docs](http://lodash.com/docs), [benchmarks](http://lodash.com/benchmarks), and [unit tests](http://lodash.com/tests).

For a list of upcoming features, check out our [roadmap](https://github.com/bestiejs/lodash/wiki/Roadmap).

## Screencasts

For more information check out these screencasts over Lo-Dash:

 * [Introducing Lo-Dash](https://vimeo.com/44154599)
 * [Lo-Dash optimizations and custom builds](https://vimeo.com/44154601)
 * [Lo-Dash’s origin and why it’s a better utility belt](https://vimeo.com/44154600)
 * [Unit testing in Lo-Dash](https://vimeo.com/45865290)
 * [Lo-Dash’s approach to native method use](https://vimeo.com/48576012)
 * [CascadiaJS: Lo-Dash for a better utility belt](http://www.youtube.com/watch?v=dpPy4f_SeEk)

## Features

 * AMD loader support ([RequireJS](http://requirejs.org/), [curl.js](https://github.com/cujojs/curl), etc.)
 * [_(…)](http://lodash.com/docs#_) supports intuitive chaining
 * [_.bindKey](http://lodash.com/docs#bindKey) for binding [*“lazy”* defined](http://michaux.ca/articles/lazy-function-definition-pattern) methods
 * [_.cloneDeep](http://lodash.com/docs#cloneDeep) for *“deep”* cloning arrays and objects
 * [_.contains](http://lodash.com/docs#contains) accepts a `fromIndex` argument
 * [_.forEach](http://lodash.com/docs#forEach) is chainable and supports exiting iteration early
 * [_.forIn](http://lodash.com/docs#forIn) for iterating over an object’s own and inherited properties
 * [_.forOwn](http://lodash.com/docs#forOwn) for iterating over an object’s own properties
 * [_.isPlainObject](http://lodash.com/docs#isPlainObject) checks if values are created by the `Object` constructor
 * [_.merge](http://lodash.com/docs#merge) for a *“deep”* [_.extend](http://lodash.com/docs#extend)
 * [_.partial](http://lodash.com/docs#partial) for partial application without `this` binding
 * [_.pick](http://lodash.com/docs#pick) and [_.omit](http://lodash.com/docs#omit) accepts `callback` and `thisArg` arguments
 * [_.template](http://lodash.com/docs#template) supports [ES6 template delimiters](http://people.mozilla.org/~jorendorff/es6-draft.html#sec-7.8.6) and utilizes [sourceURLs](http://www.html5rocks.com/en/tutorials/developertools/sourcemaps/#toc-sourceurl) for easier debugging
 * [_.contains](http://lodash.com/docs#contains), [_.size](http://lodash.com/docs#size), [_.toArray](http://lodash.com/docs#toArray),
   [and more…](http://lodash.com/docs "_.countBy, _.every, _.filter, _.find, _.forEach, _.groupBy, _.invoke, _.map, _.max, _.min, _.pluck, _.reduce, _.reduceRight, _.reject, _.shuffle, _.some, _.sortBy, _.where") accept strings

## Support

Lo-Dash has been tested in at least Chrome 5~23, Firefox 1~17, IE 6-10, Opera 9.25-12, Safari 3-6, Node.js 0.4.8-0.8.16, Narwhal 0.3.2, RingoJS 0.8, and Rhino 1.7RC5.

## Custom builds

Custom builds make it easy to create lightweight versions of Lo-Dash containing only the methods you need.
To top it off, we handle all method dependency and alias mapping for you.

 * Backbone builds, with only methods required by Backbone, may be created using the `backbone` modifier argument.
```bash
lodash backbone
```

 * CSP builds, supporting default [Content Security Policy](http://dvcs.w3.org/hg/content-security-policy/raw-file/tip/csp-specification.dev.html) restrictions, may be created using the `csp` modifier argument.
   The `csp` modifier is an alais of the `mobile` modifier. Chrome extensions will require [sandboxing](http://developer.chrome.com/trunk/extensions/sandboxingEval.html) or the use of either the `csp`, `mobile`, or `underscore` build.
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

 * Use the `template` argument to pass the file path pattern used to match template files to precompile.
```bash
lodash template="./*.jst"
```

 * Use the `settings` argument to pass the template settings used when precompiling templates.
```bash
lodash settings="{interpolate:/\\{\\{([\\s\\S]+?)\\}\\}/g}"
```

 * Use the `moduleId` argument to specify the AMD module ID of Lo-Dash, which defaults to “lodash”, used by precompiled templates.
```bash
lodash moduleId="underscore"
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

Using [`npm`](http://npmjs.org/):

```bash
npm install lodash

npm install -g lodash
npm link lodash
```

To avoid potential issues, update `npm` before installing Lo-Dash:

```bash
npm install npm -g
```

In [Node.js](http://nodejs.org/) and [RingoJS v0.8.0+](http://ringojs.org/):

```js
var _ = require('lodash');

// or as a drop-in replacement for Underscore
var _ = require('lodash/lodash.underscore');
```

**Note:** If Lo-Dash is installed globally, run [`npm link lodash`](http://blog.nodejs.org/2011/03/23/npm-1-0-global-vs-local-installation/) in your project’s root directory before requiring it.

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

 * Allow iteration of objects with a `length` property [[#799](https://github.com/documentcloud/underscore/pull/799), [test](https://github.com/bestiejs/lodash/blob/v1.0.0-rc.3/test/test.js#L605-L611)]
 * Fix cross-browser object iteration bugs [[#60](https://github.com/documentcloud/underscore/issues/60), [#376](https://github.com/documentcloud/underscore/issues/376), [test](https://github.com/bestiejs/lodash/blob/v1.0.0-rc.3/test/test.js#L618-L642)]
 * Methods should work on pages with incorrectly shimmed native methods [[#7](https://github.com/documentcloud/underscore/issues/7), [#742](https://github.com/documentcloud/underscore/issues/742), [test](https://github.com/bestiejs/lodash/blob/v1.0.0-rc.3/test/test.js#L140-L146)]
 * `_.isEmpty` should support jQuery/MooTools DOM query collections [[#690](https://github.com/documentcloud/underscore/pull/690), [test](https://github.com/bestiejs/lodash/blob/v1.0.0-rc.3/test/test.js#L807-L812)]
 * `_.isObject` should avoid V8 bug [#2291](http://code.google.com/p/v8/issues/detail?id=2291) [[#605](https://github.com/documentcloud/underscore/issues/605), [test](https://github.com/bestiejs/lodash/blob/v1.0.0-rc.3/test/test.js#L888-L900)]
 * `_.keys` should work with `arguments` objects cross-browser [[#396](https://github.com/documentcloud/underscore/issues/396), [test](https://github.com/bestiejs/lodash/blob/v1.0.0-rc.3/test/test.js#L982-L984)]
 * `_.range` should coerce arguments to numbers [[#634](https://github.com/documentcloud/underscore/issues/634), [#683](https://github.com/documentcloud/underscore/issues/683), [test](https://github.com/bestiejs/lodash/blob/v1.0.0-rc.3/test/test.js#L1383-L1386)]

## Release Notes

### <sup>v1.0.0-rc.3</sup>

#### Compatibility Warnings

 * Made `_#join`, `_#pop`, and `_#shift` wrapper methods return unwrapped values
 * Made *“Functions”* methods wrapper counterparts return wrapped values
 * Removed `_.chain` and `_#chain` methods

#### Changes

 * Added [_.cloneDeep](http://lodash.com/docs#cloneDeep) alias of `_.clone(…, true)`
 * Added `_.once` to the `backbone` build method dependencies
 * Ensured `backbone` builds implement Underscore’s chaining behavior
 * Ensured the `settings=…` build option doesn’t clobber the default `moduleId`
 * Ensured Lo-Dash’s `npm` package installation avoids erroring when no other modules have been globally installed
 * Made compiled templates loaded via AMD use the Lo-Dash module for their `_` references
 * Removed the *“Collections”* method `_.forEach` dependency from *“Arrays”* method `_.intersection`
 * Optimized `_.isArray` and `_.isFunction` fallbacks as well as<br>
   `_.intersection`, `_.isDate`, `_.isRegExp`, `_.reduce`, `_.reduceRight`, `_.union`, and `_.uniq`

### <sup>v1.0.0-rc.2</sup>

 * Specified more method chaining behaviors
 * Updated `underscore` build compatibility to v1.4.3

### <sup>v1.0.0-rc.1</sup>

#### Compatibility Warnings

 * Made `_(…)` intuitively chain without needing to call `_#chain`
 * Made `_.isEqual` equate `arguments` objects to similar `Object` objects
 * Made `_.clone` copy the enumerable properties of `arguments` objects and objects<br>
   created by constructors other than `Object` are cloned to plain `Object` objects

#### Changes

 * Ensure Lo-Dash runs in the JS engine embedded in Adobe products
 * Ensured `_.reduce` and `_.reduceRight` pass the correct number of `callback` arguments
 * Ensured `_.throttle` nulls the `timeoutId`
 * Made deep `_.clone` more closely follow the structured clone algorithm and copy array properties assigned by `RegExp#exec`
 * Optimized compiled templates in Firefox
 * Optimized `_.forEach`, `_.forOwn`, `_.isNumber`, and `_.isString`
 * Simplified `iteratorTemplate`

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
