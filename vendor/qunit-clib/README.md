# QUnit CLIB <sup>v1.3.0</sup>
## command-line interface boilerplate

QUnit CLIB helps extend QUnit’s CLI support to many common CLI environments.

## Screenshot

![QUnit CLIB brings QUnit to your favorite shell.](http://i.imgur.com/jpu9l.png)

## Support

QUnit CLIB has been tested in at least Node.js 0.4.8-0.10.1, Narwhal 0.3.2, PhantomJS 1.8.1, RingoJS 0.9, and Rhino 1.7RC5.

## Usage

```js
;(function(window) {
  'use strict';

  // use a single "load" function
  var load = typeof require == 'function' ? require : window.load;

  // load QUnit and CLIB if needed
  var QUnit = (function() {
    var noop = Function.prototype;
    return  window.QUnit || (
      window.addEventListener || (window.addEventListener = noop),
      window.setTimeout || (window.setTimeout = noop),
      window.QUnit = load('../vendor/qunit/qunit/qunit.js') || window.QUnit,
      (load('../vendor/qunit-clib/qunit-clib.js') || { 'runInContext': noop }).runInContext(window),
      addEventListener === noop && delete window.addEventListener,
      window.QUnit
    );
  }());

  // explicitly call `QUnit.module()` instead of `module()`
  // in case we are in a CLI environment
  QUnit.module('A Test Module');

  test('A Test', function() {
    // ...
  });

  // call `QUnit.start()` for Narwhal, Node.js, PhantomJS, Rhino, and RingoJS
  if (!window.document || window.phantom) {
    QUnit.start();
  }
}(typeof global == 'object' && global || this));
```

## Footnotes

  1. QUnit v1.3.0 does not work with Narwhal or Ringo < v0.8.0
  2. Rhino v1.7RC4 does not support timeout fallbacks `clearTimeout` and `setTimeout`

## Author

* [John-David Dalton](http://allyoucanleet.com/)
  [![twitter/jdalton](http://gravatar.com/avatar/299a3d891ff1920b69c364d061007043?s=70)](https://twitter.com/jdalton "Follow @jdalton on Twitter")
