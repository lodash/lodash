# QUnit CLIB <sup>v1.0.0-pre</sup>
## command-line interface boilerplate

QUnit CLIB helps extend QUnit's CLI support to many common CLI environments<sup><a name="fnref1" href="#fn1">1</a></sup>.

## Screenshot

![QUnit CLIB brings QUnit to your favorite shell.](http://i.imgur.com/jpu9l.png)

## Usage

~~~ js
(function(window) {

  // use a single load function
  var load = typeof require == 'function' ? require : window.load;

  // load QUnit and CLIB if needed
  var QUnit =
    window.QUnit || (
      window.setTimeout || (window.addEventListener = window.setTimeout = / /),
      window.QUnit = load('path/to/qunit.js') || window.QUnit,
      load('path/to/qunit-clib.js'),
      (window.addEventListener || 0).test && delete window.addEventListener,
      window.QUnit
    );

  // explicitly call `QUnit.module()` instead of `module()`
  // in case we are in a CLI environment
  QUnit.module('A Test Module');

  test('A Test', function() {
    // ...
  });

  // must call `QUnit.start()` if using QUnit < 1.3.0 with Node.js or any
  // version of QUnit with Narwhal, Rhino, or RingoJS
  if (!window.document) {
    QUnit.start();
  }
}(typeof global == 'object' && global || this));
~~~

## Cloning this repo

To clone this repository just use:

~~~ bash
git clone https://github.com/jdalton/qunit-clib.git
cd qunit-clib
~~~

Feel free to fork and send pull requests if you see improvements!

## Footnotes

  1. QUnit CLIB has been tested in at least Node.js v0.4.8-0.6.1, Narwhal v0.3.2, RingoJS v0.7.0-0.8.0, and Rhino v1.7RC3.
     <a name="fn1" title="Jump back to footnote 1 in the text." href="#fnref1">&#8617;</a>

  2. QUnit v1.3.0 does not work with Narwhal or Ringo < v0.8.0

## Author

* [John-David Dalton](http://allyoucanleet.com/)
  [![twitter/jdalton](http://gravatar.com/avatar/299a3d891ff1920b69c364d061007043?s=70)](https://twitter.com/jdalton "Follow @jdalton on Twitter")
