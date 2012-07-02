# Benchmark.js <sup>v1.0.0-pre</sup>

A [robust](http://calendar.perfplanet.com/2010/bulletproof-javascript-benchmarks/ "Bulletproof JavaScript benchmarks") benchmarking library that works on nearly all JavaScript platforms<sup><a name="fnref1" href="#fn1">1</a></sup>, supports high-resolution timers, and returns statistically significant results. As seen on [jsPerf](http://jsperf.com/).

## BestieJS

Benchmark.js is part of the BestieJS *"Best in Class"* module collection. This means we promote solid browser/environment support, ES5 precedents, unit testing, and plenty of documentation.

## Documentation

The documentation for Benchmark.js can be viewed here: <http://benchmarkjs.com/docs>

For a list of upcoming features, check out our [roadmap](https://github.com/bestiejs/benchmark.js/wiki/Roadmap).

## Installation and usage

In a browser or Adobe AIR:

~~~ html
<script src="benchmark.js"></script>
~~~

Optionally, expose Java’s nanosecond timer by adding the `nano` applet to the `<body>`:

~~~ html
<applet code="nano" archive="nano.jar"></applet>
~~~

Or enable Chrome’s microsecond timer by using the [command line switch](http://peter.sh/experiments/chromium-command-line-switches/#enable-benchmarking):

    --enable-benchmarking

Via [npm](http://npmjs.org/):

~~~ bash
npm install benchmark
~~~

In [Node.js](http://nodejs.org/) and [RingoJS v0.8.0+](http://ringojs.org/):

~~~ js
var Benchmark = require('benchmark');
~~~

Optionally, use the [microtime module](https://github.com/wadey/node-microtime) by Wade Simmons:

~~~ bash
npm install microtime
~~~

In [Narwhal](http://narwhaljs.org/) and [RingoJS v0.7.0-](http://ringojs.org/):

~~~ js
var Benchmark = require('benchmark').Benchmark;
~~~

In [Rhino](http://www.mozilla.org/rhino/):

~~~ js
load('benchmark.js');
~~~

In an AMD loader like [RequireJS](http://requirejs.org/):

~~~ js
require({
  'paths': {
    'benchmark': 'path/to/benchmark'
  }
},
['benchmark'], function(Benchmark) {
  console.log(Benchmark.version);
});

// or with platform.js
// https://github.com/bestiejs/platform.js
require({
  'paths': {
    'benchmark': 'path/to/benchmark',
    'platform': 'path/to/platform'
  }
},
['benchmark', 'platform'], function(Benchmark, platform) {
  Benchmark.platform = platform;
  console.log(Benchmark.platform.name);
});
~~~

Usage example:

~~~ js
var suite = new Benchmark.Suite;

// add tests
suite.add('RegExp#test', function() {
  /o/.test('Hello World!');
})
.add('String#indexOf', function() {
  'Hello World!'.indexOf('o') > -1;
})
// add listeners
.on('cycle', function(event) {
  console.log(String(event.target));
})
.on('complete', function() {
  console.log('Fastest is ' + this.filter('fastest').pluck('name'));
})
// run async
.run({ 'async': true });

// logs:
// > RegExp#test x 4,161,532 +-0.99% (59 cycles)
// > String#indexOf x 6,139,623 +-1.00% (131 cycles)
// > Fastest is String#indexOf
~~~

## Cloning this repo

To clone this repository including all submodules, using Git 1.6.5 or later:

~~~ bash
git clone --recursive https://github.com/bestiejs/benchmark.js.git
cd benchmark.js
~~~

For older Git versions, just use:

~~~ bash
git clone https://github.com/bestiejs/benchmark.js.git
cd benchmark.js
git submodule update --init
~~~

Feel free to fork and send pull requests if you see improvements!

## Footnotes

  1. Benchmark.js has been tested in at least Adobe AIR 2.6, Chrome 5-15, Firefox 1.5-8, IE 6-10, Opera 9.25-11.52, Safari 2-5.1.1, Node.js 0.4.8-0.6.1, Narwhal 0.3.2, RingoJS 0.7-0.8, and Rhino 1.7RC3.
     <a name="fn1" title="Jump back to footnote 1 in the text." href="#fnref1">&#8617;</a>

## Authors

* [Mathias Bynens](http://mathiasbynens.be/)
  [![twitter/mathias](http://gravatar.com/avatar/24e08a9ea84deb17ae121074d0f17125?s=70)](https://twitter.com/mathias "Follow @mathias on Twitter")
* [John-David Dalton](http://allyoucanleet.com/)
  [![twitter/jdalton](http://gravatar.com/avatar/299a3d891ff1920b69c364d061007043?s=70)](https://twitter.com/jdalton "Follow @jdalton on Twitter")

## Contributors

* [Kit Cambridge](http://kitcambridge.github.com/)
  [![twitter/kitcambridge](http://gravatar.com/avatar/6662a1d02f351b5ef2f8b4d815804661?s=70)](https://twitter.com/kitcambridge "Follow @kitcambridge on Twitter")
