# Lo-Dash <sup>v0.1.0</sup>

Lo-Dash, from the devs behind [jsPerf.com](http://jsperf.com), is a drop-in replacement for Underscore.js that delivers [performance improvements](http://jsperf.com/lodash-underscore#filterby=family), [additional features](https://github.com/bestiejs/lodash/wiki/The-Low-Down#wiki-features), and works on nearly all JavaScript platforms<sup><a name="fnref1" href="#fn1">1</a></sup>.

## Screencasts

For more information check out the series of screencasts over Lo-Dash:
 * [Introducing Lo-Dash](http://dl.dropbox.com/u/513327/allyoucanleet/post/20/file/screencast.mp4)
 * [Compiling and custom builds]()

## BestieJS

Lo-Dash is part of the BestieJS *"Best in Class"* module collection. This means we promote solid browser/environment support, ES5 precedents, unit testing, and plenty of documentation.

## Documentation

The documentation for Lo-Dash can be viewed here: <http://lodash.com/docs>

Underscore's [documentation](http://documentcloud.github.com/underscore/) may also be used.

For a list of upcoming features, check out our [roadmap](https://github.com/bestiejs/lodash/wiki/Roadmap).

## So What's The Secret?

Lo-Dash's performance is gained by avoiding slower native methods, instead opting for simplified non-ES5 compliant methods optimized for common usage, and by leveraging function compilation to reduce the number of overall function calls.

## Any New Features?

Lo-Dash comes with AMD loader support, chainable `_.each`, lazy `_.bind`, [and more](https://github.com/bestiejs/lodash/wiki/The-Low-Down#wiki-features)...

## Custom builds

Creating custom builds to keep your utility belt lightweight is easy.
We handle all the method dependency and alias mapping for you.

Custom builds may be created in two ways:

 1. Use the`include` argument to pass the names of the methods to include in the build.
~~~ bash
node build include=each,filter,map,noConflict
node build include="each, filter, map, noConflict"
~~~

 2. Use the `exclude` argument to pass the names of the methods to exclude from the build.
~~~ bash
node build exclude=isNaN,union,zip
node build exclude="isNaN, union, zip"
~~~

Custom builds are saved to `lodash.custom.js` and `lodash.custom.min.js`.

## Installation and usage

In a browser:

~~~ html
<script src="lodash.js"></script>
~~~

Via [npm](http://npmjs.org/):

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
// Lo-Dash is defined as an anonymous module so, through path mapping, it can be
// referenced as the "underscore" module
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

Feel free to fork and send pull requests if you see improvements!

## Footnotes

  1. Lo-Dash has been tested in at least Chrome 5-19, Firefox 1.5-12, IE 6-9, Opera 9.25-11.64, Safari 3.0.4-5.1.3, Node.js 0.4.8-0.6.18, Narwhal 0.3.2, RingoJS 0.8, and Rhino 1.7RC3.
     <a name="fn1" title="Jump back to footnote 1 in the text." href="#fnref1">&#8617;</a>

## Author

* [John-David Dalton](http://allyoucanleet.com/)
  [![twitter/jdalton](http://gravatar.com/avatar/299a3d891ff1920b69c364d061007043?s=70)](https://twitter.com/jdalton "Follow @jdalton on Twitter")

## Contributors

* [Kit Cambridge](http://kitcambridge.github.com/)
  [![twitter/kitcambridge](http://gravatar.com/avatar/6662a1d02f351b5ef2f8b4d815804661?s=70)](https://twitter.com/kitcambridge "Follow @kitcambridge on Twitter")
* [Mathias Bynens](http://mathiasbynens.be/)
  [![twitter/mathias](http://gravatar.com/avatar/24e08a9ea84deb17ae121074d0f17125?s=70)](https://twitter.com/mathias "Follow @mathias on Twitter")
