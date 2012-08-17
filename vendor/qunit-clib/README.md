# QUnit CLIB <sup>v1.0.0</sup>
## command-line interface boilerplate

QUnit CLIB helps extend QUnit's CLI support to many common CLI environments.

## Screenshot

![QUnit CLIB brings QUnit to your favorite shell.](http://i.imgur.com/jpu9l.png)

## Support

QUnit CLIB has been tested in at least Node.js 0.4.8-0.8.6, Narwhal v0.3.2, RingoJS v0.8.0, and Rhino v1.7RC3-RC5.

## Usage

```js
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
```

## Footnotes

  1. QUnit v1.3.0 does not work with Narwhal or Ringo < v0.8.0

  2. Rhino v1.7RC4 does not support timeout fallbacks `clearTimeout` and `setTimeout`

## Author

* [John-David Dalton](http://allyoucanleet.com/)
  [![twitter/jdalton](http://gravatar.com/avatar/299a3d891ff1920b69c364d061007043?s=70)](https://twitter.com/jdalton "Follow @jdalton on Twitter")
