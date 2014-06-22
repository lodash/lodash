;(function() {

  /** Used as a safe reference for `undefined` in pre ES5 environments */
  var undefined;

  /** Used as the size to cover large array optimizations */
  var largeArraySize = 200;

  /** Used as the maximum length an array-like object */
  var maxSafeInteger = Math.pow(2, 53) - 1;

  /** Used as a reference to the global object */
  var root = (typeof global == 'object' && global) || this;

  /** Used to store Lo-Dash to test for bad extensions/shims */
  var lodashBizarro = root.lodashBizarro;

  /** Method and object shortcuts */
  var phantom = root.phantom,
      amd = root.define && define.amd,
      argv = root.process && process.argv,
      ArrayBuffer = root.ArrayBuffer,
      document = !phantom && root.document,
      body = root.document && root.document.body,
      create = Object.create,
      freeze = Object.freeze,
      JSON = root.JSON,
      noop = function() {},
      params = root.arguments,
      push = Array.prototype.push,
      slice = Array.prototype.slice,
      system = root.system,
      toString = Object.prototype.toString;

  /** The file path of the Lo-Dash file to test */
  var filePath = (function() {
    var min = 0,
        result = [];

    if (phantom) {
      result = params = phantom.args;
    } else if (system) {
      min = 1;
      result = params = system.args;
    } else if (argv) {
      min = 2;
      result = params = argv;
    } else if (params) {
      result = params;
    }
    var last = result[result.length - 1];
    result = (result.length > min && !/test(?:\.js)?$/.test(last)) ? last : '../lodash.js';

    if (!amd) {
      try {
        result = require('fs').realpathSync(result);
      } catch(e) { }

      try {
        result = require.resolve(result);
      } catch(e) { }
    }
    return result;
  }());

  /** The `ui` object */
  var ui = root.ui || (root.ui = {
    'buildPath': filePath,
    'loaderPath': '',
    'isModularize': /\b(?:commonjs|(index|main)\.js|lodash-(?:amd|es6|node)|modularize|npm|transpiled)\b/.test(filePath),
    'isStrict': /\b(?:lodash-es6|transpiled)\b/.test(filePath),
    'urlParams': {}
  });

  /** The basename of the Lo-Dash file to test */
  var basename = /[\w.-]+$/.exec(filePath)[0];

  /** Detect if in a Java environment */
  var isJava = !document && !!root.java;

  /** Used to indicate testing a modularized build */
  var isModularize = ui.isModularize;

  /** Detect if testing `npm` modules */
  var isNpm = isModularize && /\bnpm\b/.test([ui.buildPath, ui.urlParams.build]);

  /** Detect if running in PhantomJS */
  var isPhantom = phantom || typeof callPhantom == 'function';

  /** Detect if running in Rhino */
  var isRhino = isJava && typeof global == 'function' && global().Array === root.Array;

  /** Detect if Lo-Dash is in strict mode */
  var isStrict = ui.isStrict;

  /** Used to test Web Workers */
  var Worker = !(ui.isForeign || isModularize) && document && root.Worker;

  /** Used to test host objects in IE */
  try {
    var xml = new ActiveXObject('Microsoft.XMLDOM');
  } catch(e) { }

  /** Use a single "load" function */
  var load = (typeof require == 'function' && !amd)
    ? require
    : (isJava && root.load) || noop;

  /** The unit testing framework */
  var QUnit = (function() {
    return  root.QUnit || (
      root.addEventListener || (root.addEventListener = noop),
      root.setTimeout || (root.setTimeout = noop),
      root.QUnit = load('../vendor/qunit/qunit/qunit.js') || root.QUnit,
      addEventListener === noop && delete root.addEventListener,
      root.QUnit
    );
  }());

  /** Load and install QUnit Extras */
  var qe = load('../vendor/qunit-extras/qunit-extras.js');
  if (qe) {
    qe.runInContext(root);
  }

  /*--------------------------------------------------------------------------*/

  // log params provided to `test.js`
  if (params) {
    console.log('test.js invoked with arguments: ' + JSON.stringify(slice.call(params)));
  }
  // exit early if going to run tests in a PhantomJS web page
  if (phantom && isModularize) {
    var page = require('webpage').create();
    page.open(filePath, function(status) {
      if (status != 'success') {
        console.log('PhantomJS failed to load page: ' + filePath);
        phantom.exit(1);
      }
    });

    page.onCallback = function(details) {
      var coverage = details.coverage;
      if (coverage) {
        var fs = require('fs'),
            cwd = fs.workingDirectory,
            sep = fs.separator;

        fs.write([cwd, 'coverage', 'coverage.json'].join(sep), JSON.stringify(coverage));
      }
      phantom.exit(details.failed ? 1 : 0);
    };

    page.onConsoleMessage = function(message) {
      console.log(message);
    };

    page.onInitialized = function() {
      page.evaluate(function() {
        document.addEventListener('DOMContentLoaded', function() {
          QUnit.done(function(details) {
            details.coverage = window.__coverage__;
            callPhantom(details);
          });
        });
      });
    };

    return;
  }

  /*--------------------------------------------------------------------------*/

  /** The `lodash` function to test */
  var _ = root._ || (root._ = (
    _ = load(filePath) || root._,
    _ = _._ || (isStrict = ui.isStrict = isStrict || 'default' in _, _['default'])  || _,
    (_.runInContext ? _.runInContext(root) : _)
  ));

  /** Used to pass falsey values to methods */
  var falsey = [, '', 0, false, NaN, null, undefined];

  /** Used to pass empty values to methods */
  var empties = [[], {}].concat(falsey.slice(1));

  /** Used to check whether methods support error objects */
  var errorTypes = [
    'Error',
    'EvalError',
    'RangeError',
    'ReferenceError',
    'SyntaxError',
    'TypeError',
    'URIError'
  ];

  /** Used as the property name for wrapper metadata */
  var expando = '__lodash@'  + _.VERSION + '__';

  /** Used to set property descriptors */
  var defineProperty = (function() {
    try {
      var o = {},
          func = Object.defineProperty,
          result = func(o, o, o) && func;
    } catch(e) { }
    return result;
  }());

  /** Used to check problem JScript properties (a.k.a. the `[[DontEnum]]` bug) */
  var shadowedProps = [
    'constructor',
    'hasOwnProperty',
    'isPrototypeOf',
    'propertyIsEnumerable',
    'toLocaleString',
    'toString',
    'valueOf'
  ];

  /** Used to check problem JScript properties too */
  var shadowedObject = _.invert(shadowedProps);

  /** Used to check whether methods support typed arrays */
  var typedArrays = [
    'Float32Array',
    'Float64Array',
    'Int8Array',
    'Int16Array',
    'Int32Array',
    'Uint8Array',
    'Uint8ClampedArray',
    'Uint16Array',
    'Uint32Array'
  ];

  /** Used to check for problems removing whitespace */
  var whitespace = ' \t\x0B\f\xA0\ufeff\n\r\u2028\u2029\u1680\u180E\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000';

  /**
   * Removes all own enumerable properties from a given object.
   *
   * @private
   * @param {Object} object The object to empty.
   */
  function emptyObject(object) {
    _.forOwn(object, function(value, key, object) {
      delete object[key];
    });
  }

  /**
   * Sets a non-enumerable property value on `object`.
   *
   * Note: This function is used to avoid a bug in older versions of V8 where
   * overwriting non-enumerable built-ins makes them enumerable.
   * See https://code.google.com/p/v8/issues/detail?id=1623
   *
   * @private
   * @param {Object} object The object augment.
   * @param {string} key The name of the property to set.
   * @param {*} value The property value.
   */
  function setProperty(object, key, value) {
    try {
      defineProperty(object, key, {
        'configurable': true,
        'enumerable': false,
        'writable': true,
        'value': value
      });
    } catch(e) {
      object[key] = value;
    }
  }

  /**
   * Skips a given number of tests with a passing result.
   *
   * @private
   * @param {number} [count=1] The number of tests to skip.
   */
  function skipTest(count) {
    count || (count = 1);
    while (count--) {
      ok(true, 'test skipped');
    }
  }

  /*--------------------------------------------------------------------------*/

  // setup values for Node.js
  (function() {
    if (amd) {
      return;
    }
    try {
      // add values from a different realm
      _.extend(_, require('vm').runInNewContext([
        '({',
        "'_arguments': (function() { return arguments; }(1, 2, 3)),",
        "'_array': [1, 2, 3],",
        "'_boolean': Object(false),",
        "'_date': new Date,",
        "'_errors': [new Error, new EvalError, new RangeError, new ReferenceError, new SyntaxError, new TypeError, new URIError],",
        "'_function': function() {},",
        "'_nan': NaN,",
        "'_null': null,",
        "'_number': Object(0),",
        "'_object': { 'a': 1, 'b': 2, 'c': 3 },",
        "'_regexp': /x/,",
        "'_string': Object('a'),",
        "'_undefined': undefined",
        '})'
      ].join('\n')));
    }
    catch(e) {
      return;
    }
    // load ES6 Set shim
    require('./asset/set');

    // expose `baseEach` for better code coverage
    if (isModularize && !isNpm) {
      var path = require('path'),
          baseEach = require(path.join(path.dirname(filePath), 'internal', 'baseEach.js'));

      _._baseEach = baseEach.baseEach || baseEach['default'] || baseEach;
    }
    // allow bypassing native checks
    var _fnToString = Function.prototype.toString;
    setProperty(Function.prototype, 'toString', function wrapper() {
      setProperty(Function.prototype, 'toString', _fnToString);
      var result = this === Set ? this.toString() : _fnToString.call(this);
      setProperty(Function.prototype, 'toString', wrapper);
      return result;
    });

    // fake DOM
    setProperty(global, 'window', {});
    setProperty(global.window, 'document', {});
    setProperty(global.window.document, 'createDocumentFragment', function() {
      return { 'nodeType': 11 };
    });

    // fake `WinRTError`
    setProperty(global, 'WinRTError', Error);

    // add extensions
    Function.prototype._method = _.noop;

    // set bad shims
    var _isArray = Array.isArray;
    setProperty(Array, 'isArray', _.noop);

    var _now = Date.now;
    setProperty(Date, 'now', _.noop);

    var _create = create;
    setProperty(Object, 'create', _.noop);

    var _defineProperty = Object.defineProperty;
    setProperty(Object, 'defineProperty', _.noop);

    var _getPrototypeOf = Object.getPrototypeOf;
    setProperty(Object, 'getPrototypeOf', _.noop);

    var _keys = Object.keys;
    setProperty(Object, 'keys', _.noop);

    var _hasOwnProperty = Object.prototype.hasOwnProperty;
    setProperty(Object.prototype, 'hasOwnProperty', function(key) {
      if (key == '1' && _.isArguments(this) && _.isEqual(_.values(this), [0, 0])) {
        throw new Error;
      }
      return _hasOwnProperty.call(this, key);
    });

    var _contains = String.prototype.contains;
    setProperty(String.prototype, 'contains',  _contains ? _.noop : Boolean);

    // clear cache so Lo-Dash can be reloaded
    emptyObject(require.cache);

    // load Lo-Dash and expose it to the bad extensions/shims
    lodashBizarro = (lodashBizarro = require(filePath))._ || lodashBizarro['default'] || lodashBizarro;

    // restore native methods
    setProperty(Array,  'isArray', _isArray);
    setProperty(Date,   'now', _now);
    setProperty(Object, 'create', _create);
    setProperty(Object, 'defineProperty', _defineProperty);
    setProperty(Object, 'getPrototypeOf', _getPrototypeOf);
    setProperty(Object, 'keys', _keys);
    setProperty(Object.prototype,   'hasOwnProperty', _hasOwnProperty);
    setProperty(Function.prototype, 'toString', _fnToString);

    if (_contains) {
      setProperty(String.prototype, 'contains', _contains);
    } else {
      delete String.prototype.contains;
    }
    delete global.window;
    delete global.WinRTError;
    delete Function.prototype._method;
  }());

  // add values from an iframe
  (function() {
    if (_._object || !document) {
      return;
    }
    var iframe = document.createElement('iframe');
    iframe.frameBorder = iframe.height = iframe.width = 0;
    body.appendChild(iframe);

    var idoc = (idoc = iframe.contentDocument || iframe.contentWindow).document || idoc;
    idoc.write([
      '<script>',
      'parent._._arguments = (function() { return arguments; }(1, 2, 3));',
      'parent._._array = [1, 2, 3];',
      'parent._._boolean = Object(false);',
      'parent._._date = new Date;',
      "parent._._element = document.createElement('div');",
      'parent._._errors = [new Error, new EvalError, new RangeError, new ReferenceError, new SyntaxError, new TypeError, new URIError];',
      'parent._._function = function() {};',
      'parent._._nan = NaN;',
      'parent._._null = null;',
      'parent._._number = Object(0);',
      "parent._._object = { 'a': 1, 'b': 2, 'c': 3 };",
      'parent._._regexp = /x/;',
      "parent._._string = Object('a');",
      'parent._._undefined = undefined;',
      '<\/script>'
    ].join('\n'));
    idoc.close();
  }());

  // add web worker
  (function() {
    if (!Worker) {
      return;
    }
    var worker = new Worker('./asset/worker.js?t=' + (+new Date));
    worker.addEventListener('message', function(e) {
      _._VERSION = e.data || '';
    }, false);

    worker.postMessage(ui.buildPath);
  }());

  /*--------------------------------------------------------------------------*/

  // explicitly call `QUnit.module()` instead of `module()`
  // in case we are in a CLI environment
  QUnit.module(basename);

  (function() {
    test('supports loading ' + basename + ' as the "lodash" module', 1, function() {
      if (amd) {
        strictEqual((lodashModule || {}).moduleName, 'lodash');
      }
      else {
        skipTest();
      }
    });

    test('supports loading ' + basename + ' with the Require.js "shim" configuration option', 1, function() {
      if (amd && /requirejs/.test(ui.loaderPath)) {
        strictEqual((shimmedModule || {}).moduleName, 'shimmed');
      } else {
        skipTest();
      }
    });

    test('supports loading ' + basename + ' as the "underscore" module', 1, function() {
      if (amd) {
        strictEqual((underscoreModule || {}).moduleName, 'underscore');
      }
      else {
        skipTest();
      }
    });

    asyncTest('supports loading ' + basename + ' in a web worker', 1, function() {
      if (Worker) {
        var limit = 30000 / QUnit.config.asyncRetries,
            start = +new Date;

        var attempt = function() {
          var actual = _._VERSION;
          if ((new Date - start) < limit && typeof actual != 'string') {
            setTimeout(attempt, 16);
            return;
          }
          strictEqual(actual, _.VERSION);
          QUnit.start();
        };

        attempt();
      }
      else {
        skipTest();
        QUnit.start();
      }
    });

    test('should not add `Function.prototype` extensions to lodash', 1, function() {
      if (lodashBizarro) {
        ok(!('_method' in lodashBizarro));
      }
      else {
        skipTest();
      }
    });

    test('should avoid overwritten native methods', 9, function() {
      function Foo() {}

      function message(methodName) {
        return '`_.' + methodName + '` should avoid overwritten native methods';
      }

      var object = { 'a': 1 },
          otherObject = { 'b': 2 },
          largeArray = _.times(largeArraySize, _.constant(object));

      if (lodashBizarro) {
        try {
          var actual = [lodashBizarro.isArray([]), lodashBizarro.isArray({ 'length': 0 })];
        } catch(e) {
          actual = null;
        }
        deepEqual(actual, [true, false], message('Array.isArray'));

        try {
          actual = lodashBizarro.now();
        } catch(e) {
          actual = null;
        }
        ok(typeof actual == 'number', message('Date.now'));

        try {
          actual = [lodashBizarro.create(Foo.prototype, object), lodashBizarro.create()];
        } catch(e) {
          actual = null;
        }
        ok(actual[0] instanceof Foo, message('Object.create'));
        deepEqual(actual[1], {}, message('Object.create'));

        try {
          actual = lodashBizarro.bind(function() { return this.a; }, object);
        } catch(e) {
          actual = null;
        }
        ok(!(expando in actual), message('Object.defineProperty'));

        try {
          actual = [lodashBizarro.isPlainObject({}), lodashBizarro.isPlainObject([])];
        } catch(e) {
          actual = null;
        }
        deepEqual(actual, [true, false], message('Object.getPrototypeOf'));

        try {
          actual = [lodashBizarro.keys(object), lodashBizarro.keys()];
        } catch(e) {
          actual = null;
        }
        deepEqual(actual, [['a'], []], message('Object.keys'));

        try {
          actual = [
            lodashBizarro.difference([object, otherObject], largeArray),
            lodashBizarro.intersection(largeArray, [object]),
            lodashBizarro.uniq(largeArray)
          ];
        } catch(e) {
          actual = null;
        }
        deepEqual(actual, [[otherObject], [object], [object]], message('Set'));

        try {
          actual = lodashBizarro.contains('abc', 'c');
        } catch(e) {
          actual = null;
        }
        strictEqual(actual, true, message('String#contains'));
      }
      else {
        skipTest(9);
      }
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash constructor');

  (function() {
    test('creates a new instance when called without the `new` operator', 1, function() {
      ok(_() instanceof _);
    });

    test('should return provided `lodash` instances', 1,function() {
      var wrapped = _(false);
      strictEqual(_(wrapped), wrapped);
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.after');

  (function() {
    function after(n, times) {
      var count = 0;
      _.times(times, _.after(n, function() { count++; }));
      return count;
    }
    test('should create a function that executes `func` after `n` calls', 4, function() {
      strictEqual(after(5, 5), 1, 'after(n) should execute `func` after being called `n` times');
      strictEqual(after(5, 4), 0, 'after(n) should not execute `func` unless called `n` times');
      strictEqual(after(0, 0), 0, 'after(0) should not execute `func` immediately');
      strictEqual(after(0, 1), 1, 'after(0) should execute `func` when called once');
    });

    test('should coerce non-finite `n` values to `0`', 3, function() {
      _.each([-Infinity, NaN, Infinity], function(n) {
        strictEqual(after(n, 1), 1);
      });
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.assign');

  (function() {
    test('should assign properties of a source object to the destination object', 1, function() {
      deepEqual(_.assign({ 'a': 1 }, { 'b': 2 }), { 'a': 1, 'b': 2 });
    });

    test('should assign own source properties', 1, function() {
      function Foo() {
        this.a = 1;
        this.c = 3;
      }
      Foo.prototype.b = 2;
      deepEqual(_.assign({}, new Foo), { 'a': 1, 'c': 3 });
    });

    test('should accept multiple source objects', 2, function() {
      var expected = { 'a': 1, 'b': 2, 'c': 3 };
      deepEqual(_.assign({ 'a': 1 }, { 'b': 2 }, { 'c': 3 }), expected);
      deepEqual(_.assign({ 'a': 1 }, { 'b': 2, 'c': 2 }, { 'c': 3 }), expected);
    });

    test('should overwrite source properties', 1, function() {
      var expected = { 'a': 3, 'b': 2, 'c': 1 };
      deepEqual(_.assign({ 'a': 1, 'b': 2 }, expected), expected);
    });

    test('should assign source properties with `null` and `undefined` values', 1, function() {
      var expected = { 'a': null, 'b': undefined, 'c': null };
      deepEqual(_.assign({ 'a': 1, 'b': 2 }, expected), expected);
    });

    test('should work with a callback', 1, function() {
      var actual = _.assign({ 'a': 1, 'b': 2 }, { 'a': 3, 'c': 3 }, function(a, b) {
        return typeof a == 'undefined' ? b : a;
      });

      deepEqual(actual, { 'a': 1, 'b': 2, 'c': 3 });
    });

    test('should be aliased', 1, function() {
      strictEqual(_.extend, _.assign);
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.at');

  (function() {
    var args = arguments;

    test('should return `undefined` for nonexistent keys', 1, function() {
      var actual = _.at(['a', 'b',  'c'], [2, 4, 0]);
      deepEqual(actual, ['c', undefined, 'a']);
    });

    test('should return an empty array when no keys are provided', 1, function() {
      deepEqual(_.at(['a', 'b', 'c']), []);
    });

    test('should accept multiple key arguments', 1, function() {
      var actual = _.at(['a', 'b', 'c', 'd'], 3, 0, 2);
      deepEqual(actual, ['d', 'a', 'c']);
    });

    test('should work with an `arguments` object for `collection`', 1, function() {
      var actual = _.at(args, [2, 0]);
      deepEqual(actual, ['c', 'a']);
    });

    test('should work with an object for `collection`', 1, function() {
      var actual = _.at({ 'a': 1, 'b': 2, 'c': 3 }, ['c', 'a']);
      deepEqual(actual, [3, 1]);
    });

    _.each({
      'literal': 'abc',
      'object': Object('abc')
    },
    function(collection, key) {
      test('should work with a string ' + key + ' for `collection`', 1, function() {
        deepEqual(_.at(collection, [2, 0]), ['c', 'a']);
      });
    });
  }('a', 'b', 'c'));

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.bind');

  (function() {
    function fn() {
      var args = [this];
      push.apply(args, arguments);
      return args;
    }

    test('should bind a function to an object', 1, function() {
      var object = {},
          bound = _.bind(fn, object);

      deepEqual(bound('a'), [object, 'a']);
    });

    test('should accept a falsey `thisArg` argument', 1, function() {
      var values = _.reject(falsey.slice(1), function(value) { return value == null; }),
          expected = _.map(values, function(value) { return [value]; });

      var actual = _.map(values, function(value) {
        try {
          var bound = _.bind(fn, value);
          return bound();
        } catch(e) { }
      });

      ok(_.every(actual, function(value, index) {
        return _.isEqual(value, expected[index]);
      }));
    });

    test('should bind a function to `null` or `undefined`', 6, function() {
      var bound = _.bind(fn, null),
          actual = bound('a');

      ok(actual[0] === null || actual[0] && actual[0].Array);
      strictEqual(actual[1], 'a');

      _.times(2, function(index) {
        bound = index ? _.bind(fn, undefined) : _.bind(fn);
        actual = bound('b');

        ok(actual[0] === undefined || actual[0] && actual[0].Array);
        strictEqual(actual[1], 'b');
      });
    });

    test('should partially apply arguments ', 4, function() {
      var object = {},
          bound = _.bind(fn, object, 'a');

      deepEqual(bound(), [object, 'a']);

      bound = _.bind(fn, object, 'a');
      deepEqual(bound('b'), [object, 'a', 'b']);

      bound = _.bind(fn, object, 'a', 'b');
      deepEqual(bound(), [object, 'a', 'b']);
      deepEqual(bound('c', 'd'), [object, 'a', 'b', 'c', 'd']);
    });

    test('should support placeholders', 4, function() {
      if (!isModularize) {
        var object = {},
            bound = _.bind(fn, object, _, 'b', _);

        deepEqual(bound('a', 'c'), [object, 'a', 'b', 'c']);
        deepEqual(bound('a'), [object, 'a', 'b', undefined]);
        deepEqual(bound('a', 'c', 'd'), [object, 'a', 'b', 'c', 'd']);
        deepEqual(bound(), [object, undefined, 'b', undefined]);
      }
      else {
        skipTest(4);
      }
    });

    test('should create a function with a `length` of `0`', 2, function() {
      var fn = function(a, b, c) {},
          bound = _.bind(fn, {});

      strictEqual(bound.length, 0);

      bound = _.bind(fn, {}, 1);
      strictEqual(bound.length, 0);
    });

    test('should ignore binding when called with the `new` operator', 3, function() {
      function Foo() {
        return this;
      }

      var bound = _.bind(Foo, { 'a': 1 }),
          newBound = new bound;

      strictEqual(newBound.a, undefined);
      strictEqual(bound().a, 1);
      ok(newBound instanceof Foo);
    });

    test('ensure `new bound` is an instance of `func`', 2, function() {
      function Foo(value) {
        return value && object;
      }

      var bound = _.bind(Foo),
          object = {};

      ok(new bound instanceof Foo);
      strictEqual(new bound(true), object);
    });

    test('should append array arguments to partially applied arguments (test in IE < 9)', 1, function() {
      var object = {},
          bound = _.bind(fn, object, 'a');

      deepEqual(bound(['b'], 'c'), [object, 'a', ['b'], 'c']);
    });

    test('should return a wrapped value when chaining', 2, function() {
      if (!isNpm) {
        var object = {},
            bound = _(fn).bind({}, 'a', 'b');

        ok(bound instanceof _);

        var actual = bound.value()('c');
        deepEqual(actual, [object, 'a', 'b', 'c']);
      }
      else {
        skipTest(2);
      }
    });

    test('should rebind functions correctly', 3, function() {
      var object1 = {},
          object2 = {},
          object3 = {};

      var bound1 = _.bind(fn, object1),
          bound2 = _.bind(bound1, object2, 'a'),
          bound3 = _.bind(bound1, object3, 'b');

      deepEqual(bound1(), [object1]);
      deepEqual(bound2(), [object1, 'a']);
      deepEqual(bound3(), [object1, 'b']);
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.bindAll');

  (function() {
    var args = arguments;

    test('should bind all methods of `object`', 1, function() {
      function Foo() {
        this._a = 1;
        this._b = 2;
        this.a = function() { return this._a; };
      }
      Foo.prototype.b = function() { return this._b; };

      var object = new Foo;
      _.bindAll(object);

      var actual = _.map(_.functions(object).sort(), function(methodName) {
        return object[methodName].call({});
      });

      deepEqual(actual, [1, 2]);
    });

    test('should accept individual method names', 1, function() {
      var object = {
        '_a': 1,
        '_b': 2,
        '_c': 3,
        'a': function() { return this._a; },
        'b': function() { return this._b; },
        'c': function() { return this._c; }
      };

      _.bindAll(object, 'a', 'b');

      var actual = _.map(_.functions(object).sort(), function(methodName) {
        return object[methodName].call({});
      });

      deepEqual(actual, [1, 2, undefined]);
    });

    test('should accept arrays of method names', 1, function() {
      var object = {
        '_a': 1,
        '_b': 2,
        '_c': 3,
        '_d': 4,
        'a': function() { return this._a; },
        'b': function() { return this._b; },
        'c': function() { return this._c; },
        'd': function() { return this._d; }
      };

      _.bindAll(object, ['a', 'b'], ['c']);

      var actual = _.map(_.functions(object).sort(), function(methodName) {
        return object[methodName].call({});
      });

      deepEqual(actual, [1, 2, 3, undefined]);
    });

    test('should work with an array `object` argument', 1, function() {
      var array = ['push', 'pop'];
      _.bindAll(array);
      strictEqual(array.pop, Array.prototype.pop);
    });

    test('should work with `arguments` objects as secondary arguments', 1, function() {
      var object = {
        '_a': 1,
        'a': function() { return this._a; }
      };

      _.bindAll(object, args);

      var actual = _.map(_.functions(object).sort(), function(methodName) {
        return object[methodName].call({});
      });

      deepEqual(actual, [1]);
    });
  }('a'));

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.bindKey');

  (function() {
    test('should work when the target function is overwritten', 2, function() {
      var object = {
        'name': 'fred',
        'greet': function(greeting) {
          return this.name + ' says: ' + greeting;
        }
      };

      var bound = _.bindKey(object, 'greet', 'hi');
      strictEqual(bound(), 'fred says: hi');

      object.greet = function(greeting) {
        return this.name + ' says: ' + greeting + '!';
      };
      strictEqual(bound(), 'fred says: hi!');
    });

    test('should support placeholders', 4, function() {
      var object = {
        'fn': function fn(a, b, c, d) {
          return slice.call(arguments);
        }
      };

      if (!isModularize) {
        var bound = _.bindKey(object, 'fn', _, 'b', _);
        deepEqual(bound('a', 'c'), ['a', 'b', 'c']);
        deepEqual(bound('a'), ['a', 'b', undefined]);
        deepEqual(bound('a', 'c', 'd'), ['a', 'b', 'c', 'd']);
        deepEqual(bound(), [undefined, 'b', undefined]);
      }
      else {
        skipTest(4);
      }
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('case methods');

  _.each(['camel', 'kebab', 'snake'], function(caseName) {
    var methodName = caseName + 'Case',
        func = _[methodName];

    var expected = (function() {
      switch (caseName) {
        case 'camel': return 'helloWorld';
        case 'kebab': return 'hello-world';
        case 'snake': return 'hello_world';
      }
    }());

    var burredLetters = [
      '\xC0', '\xC1', '\xC2', '\xC3', '\xC4', '\xC5', '\xC6', '\xC7', '\xC8', '\xC9', '\xCA', '\xCB', '\xCC', '\xCD', '\xCE', '\xCF',
      '\xD0', '\xD1', '\xD2', '\xD3', '\xD4', '\xD5', '\xD6', '\xD7', '\xD8', '\xD9', '\xDA', '\xDB', '\xDC', '\xDD', '\xDE', '\xDF',
      '\xE0', '\xE1', '\xE2', '\xE3', '\xE4', '\xE5', '\xE6', '\xE7', '\xE8', '\xE9', '\xEA', '\xEB', '\xEC', '\xED', '\xEE', '\xEF',
      '\xF0', '\xF1', '\xF2', '\xF3', '\xF4', '\xF5', '\xF6', '\xF7', '\xF8', '\xF9', '\xFA', '\xFB', '\xFC', '\xFD', '\xFE', '\xFF'
    ];

    var deburredLetters = [
      'A', 'A', 'A', 'A', 'A', 'A', 'AE', 'C', 'E', 'E', 'E', 'E', 'I', 'I', 'I', 'I',
      'D', 'N', 'O', 'O', 'O', 'O', 'O', '', 'O', 'U', 'U', 'U', 'U', 'Y', 'Th', 'ss',
      'a', 'a', 'a', 'a', 'a', 'a', 'ae', 'c', 'e', 'e', 'e', 'e', 'i', 'i', 'i', 'i',
      'd', 'n', 'o', 'o', 'o', 'o', 'o', '', 'o', 'u', 'u', 'u', 'u', 'y', 'th', 'y'
    ];

    test('`_.' + methodName + '` should convert `string` to ' + caseName + ' case', 4, function() {
      _.each(['Hello world', 'helloWorld', '--hello-world', '__hello_world__'], function(string) {
        strictEqual(func(string), expected);
      });
    });

    test('`_.' + methodName + '` should handle double-converting strings', 4, function() {
      _.each(['Hello world', 'helloWorld', '--hello-world', '__hello_world__'], function(string) {
        strictEqual(func(func(string)), expected);
      });
    });

    test('`_.' + methodName + '` should deburr letters', 1, function() {
      var actual = _.map(burredLetters, function(burred, index) {
        var isCamel = caseName == 'camel',
            deburrLetter = deburredLetters[index];

        var string = isCamel
          ? func('z' + burred)
          : func(burred);

        var deburredString = isCamel
          ? 'z' + deburrLetter
          : deburrLetter.toLowerCase();

        return string == deburredString;
      });

      ok(_.every(actual, _.identity));
    });

    test('`_.' + methodName + '` should coerce `string` to a string', 2, function() {
      var string = 'Hello world';
      strictEqual(func(Object(string)), expected);
      strictEqual(func({ 'toString': _.constant(string) }), expected);
    });

    test('`_.' + methodName + '` should return an unwrapped value when chaining', 1, function() {
      if (!isNpm) {
        var actual = _('hello world')[methodName]();
        strictEqual(actual, expected);
      }
      else {
        skipTest();
      }
    });
  });

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.camelCase');

  (function() {
    test('should work with numbers', 3, function() {
      strictEqual(_.camelCase('too legit 2 quit'), 'tooLegit2Quit');
      strictEqual(_.camelCase('walk 500 miles'), 'walk500Miles');
      strictEqual(_.camelCase('xhr2 request'), 'xhr2Request');
    });

    test('should handle acronyms', 3, function() {
      strictEqual(_.camelCase('safe HTML'), 'safeHTML');
      strictEqual(_.camelCase('escape HTML entities'), 'escapeHTMLEntities');
      strictEqual(_.camelCase('XMLHttpRequest'), 'xmlHttpRequest');
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.capitalize');

  (function() {
    test('should capitalize the first character of a string', 3, function() {
      strictEqual(_.capitalize('fred'), 'Fred');
      strictEqual(_.capitalize('Fred'), 'Fred');
      strictEqual(_.capitalize(' fred'), ' fred');
    });

    test('should return an unwrapped value when chaining', 1, function() {
      if (!isNpm) {
        var actual = _('fred').capitalize();
        strictEqual(actual, 'Fred');
      }
      else {
        skipTest();
      }
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.chain');

  (function() {
    test('should return a wrapped value', 1, function() {
      if (!isNpm) {
        var actual = _.chain({ 'a': 0 });
        ok(actual instanceof _);
      }
      else {
        skipTest();
      }
    });

    test('should return an existing wrapper', 2, function() {
      if (!isNpm) {
        var wrapper = _({ 'a': 0 });
        strictEqual(_.chain(wrapper), wrapper);
        strictEqual(wrapper.chain(), wrapper);
      }
      else {
        skipTest(2);
      }
    });

    test('should enable chaining of methods that return unwrapped values by default', 6, function() {
      if (!isNpm) {
        var array = ['c', 'b', 'a'];

        ok(_.chain(array).first() instanceof _);
        ok(_(array).chain().first() instanceof _);

        ok(_.chain(array).isArray() instanceof _);
        ok(_(array).chain().isArray() instanceof _);

        ok(_.chain(array).sortBy().first() instanceof _);
        ok(_(array).chain().sortBy().first() instanceof _);
      }
      else {
        skipTest(6);
      }
    });

    test('should chain multiple methods', 6, function() {
      if (!isNpm) {
        _.times(2, function(index) {
          var array = ['one two three four', 'five six seven eight', 'nine ten eleven twelve'],
              expected = { ' ': 9, 'e': 14, 'f': 2, 'g': 1, 'h': 2, 'i': 4, 'l': 2, 'n': 6, 'o': 3, 'r': 2, 's': 2, 't': 5, 'u': 1, 'v': 4, 'w': 2, 'x': 1 },
              wrapper = index ? _(array).chain() : _.chain(array);

          var actual = wrapper
            .chain()
            .map(function(value) { return value.split(''); })
            .flatten()
            .reduce(function(object, chr) {
              object[chr] || (object[chr] = 0);
              object[chr]++;
              return object;
            }, {})
            .value();

          deepEqual(actual, expected);

          array = [1, 2, 3, 4, 5, 6];
          wrapper = index ? _(array).chain() : _.chain(array);
          actual = wrapper
            .chain()
            .filter(function(n) { return n % 2; })
            .reject(function(n) { return n % 3 == 0; })
            .sortBy(function(n) { return -n; })
            .value();

          deepEqual(actual, [5, 1]);

          array = [3, 4];
          wrapper = index ? _(array).chain() : _.chain(array);
          actual = wrapper
            .reverse()
            .concat([2, 1])
            .unshift(5)
            .tap(function(value) { value.pop(); })
            .map(function(n) { return n * n; })
            .value();

          deepEqual(actual,[25, 16, 9, 4]);
        });
      }
      else {
        skipTest(6);
      }
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.chunk');

  (function() {
    var array = [0, 1, 2, 3, 4, 5];

    test('should return chunked arrays', 1, function() {
      var actual = _.chunk(array, 3);
      deepEqual(actual, [[0, 1, 2], [3, 4, 5]]);
    });

    test('should return the last chunk as remaining elements', 1, function() {
      var actual = _.chunk(array, 4);
      deepEqual(actual, [[0, 1, 2, 3], [4, 5]]);
    });

    test('should ensure the minimum `chunkSize` is `1`', 1, function() {
      var values = falsey.concat(-1),
          expected = _.map(values, _.constant([[0], [1], [2], [3], [4], [5]]));

      var actual = _.map(values, function(value, index) {
        return index ? _.chunk(array, value) : _.chunk(array);
      });

      deepEqual(actual, expected);
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('cloning');

  (function() {
    function Klass() { this.a = 1; }
    Klass.prototype = { 'b': 1 };

    var nonCloneable = {
      'DOM elements': body,
      'functions': Klass
    };

    var objects = {
      '`arguments` objects': arguments,
      'arrays': ['a', ''],
      'array-like-objects': { '0': 'a', '1': '', 'length': 3 },
      'booleans': false,
      'boolean objects': Object(false),
      'Klass instances': new Klass,
      'objects': { 'a': 0, 'b': 1, 'c': 3 },
      'objects with object values': { 'a': /a/, 'b': ['B'], 'c': { 'C': 1 } },
      'objects from another document': _._object || {},
      'null values': null,
      'numbers': 3,
      'number objects': Object(3),
      'regexes': /a/gim,
      'strings': 'a',
      'string objects': Object('a'),
      'undefined values': undefined
    };

    objects['arrays'].length = 3;

    test('`_.clone` should perform a shallow clone', 2, function() {
      var expected = [{ 'a': 0 }, { 'b': 1 }],
          actual = _.clone(expected);

      deepEqual(actual, expected);
      ok(actual !== expected && actual[0] === expected[0]);
    });

    test('`_.clone` should work with `isDeep`', 2, function() {
      var expected = [{ 'a': 0 }, { 'b': 1 }],
          actual = _.clone(expected, true);

      deepEqual(actual, expected);
      ok(actual !== expected && actual[0] !== expected[0]);
    });

    test('`_.cloneDeep` should deep clone objects with circular references', 1, function() {
      var object = {
        'foo': { 'b': { 'foo': { 'c': { } } } },
        'bar': { }
      };

      object.foo.b.foo.c = object;
      object.bar.b = object.foo.b;

      var clone = _.cloneDeep(object);
      ok(clone.bar.b === clone.foo.b && clone === clone.foo.b.foo.c && clone !== object);
    });

    _.each(['clone', 'cloneDeep'], function(methodName) {
      var func = _[methodName],
          isDeep = methodName == 'cloneDeep',
          klass = new Klass;

      _.forOwn(objects, function(object, key) {
        test('`_.' + methodName + '` should clone ' + key, 2, function() {
          var actual = func(object);

          ok(_.isEqual(actual, object));

          if (_.isObject(object)) {
            notStrictEqual(actual, object);
          } else {
            strictEqual(actual, object);
          }
        });
      });

      _.forOwn(nonCloneable, function(object, key) {
        test('`_.' + methodName + '` should not clone ' + key, 1, function() {
          strictEqual(func(object), object);
        });
      });

      _.each(errorTypes, function(type) {
        test('`_.' + methodName + '` should not clone ' + type + ' objects', 1, function() {
          var error = new root[type];
          strictEqual(func(error), error);
        });
      });

      _.each(typedArrays, function(type) {
        test('`_.' + methodName + '` should clone ' + type + ' arrays', 2, function() {
          var Ctor = root[type];
          if (Ctor) {
            var array = new Ctor(new ArrayBuffer(8)),
                actual = func(array);

            deepEqual(actual, array);
            notStrictEqual(actual, array);
          }
          else {
            skipTest(2);
          }
        });
      });

      test('`_.' + methodName + '` should clone array buffers', 2, function() {
        var buffer = ArrayBuffer && new ArrayBuffer(8);
        if (buffer) {
          var actual = func(buffer);
          strictEqual(actual.byteLength, buffer.byteLength);
          notStrictEqual(actual, buffer);
        }
        else {
          skipTest(2);
        }
      });

      test('`_.' + methodName + '` should clone problem JScript properties (test in IE < 9)', 2, function() {
        var actual = func(shadowedObject);
        deepEqual(actual, shadowedObject);
        notStrictEqual(actual, shadowedObject);
      });

      test('`_.' + methodName + '` should perform a ' + (isDeep ? 'deep' : 'shallow') + ' clone when used as a callback for `_.map`', 2, function() {
        var expected = [{ 'a': [0] }, { 'b': [1] }],
            actual = _.map(expected, func);

        deepEqual(actual, expected);

        if (isDeep) {
          ok(actual[0] !== expected[0] && actual[0].a !== expected[0].a && actual[1].b !== expected[1].b);
        } else {
          ok(actual[0] !== expected[0] && actual[0].a === expected[0].a && actual[1].b === expected[1].b);
        }
      });

      test('`_.' + methodName + '` should pass the correct `callback` arguments', 1, function() {
        var argsList = [];

        func(klass, function() {
          argsList.push(slice.call(arguments));
        });

        deepEqual(argsList, isDeep ? [[klass], [1, 'a']] : [[klass]]);
      });

      test('`_.' + methodName + '` should support the `thisArg` argument', 1, function() {
        var actual = func('a', function(value) {
          return this[value];
        }, { 'a': 'A' });

        strictEqual(actual, 'A');
      });

      test('`_.' + methodName + '` should handle cloning if `callback` returns `undefined`', 1, function() {
        var actual = func({ 'a': { 'b': 'c' } }, _.noop);
        deepEqual(actual, { 'a': { 'b': 'c' } });
      });

      test('`_.' + methodName + '` should clone `index` and `input` array properties', 2, function() {
        var array = /x/.exec('vwxyz'),
            actual = func(array);

        strictEqual(actual.index, 2);
        strictEqual(actual.input, 'vwxyz');
      });

      test('`_.' + methodName + '` should clone `lastIndex` regexp property', 1, function() {
        // avoid a regexp literal for older Opera and use `exec` for older Safari
        var regexp = RegExp('x', 'g');
        regexp.exec('vwxyz');

        var actual = func(regexp);
        strictEqual(actual.lastIndex, 3);
      });

      test('`_.' + methodName + '` should not error on DOM elements', 1, function() {
        if (document) {
          var element = document.createElement('div');
          try {
            strictEqual(func(element), element);
          } catch(e) {
            ok(false);
          }
        }
        else {
          skipTest();
        }
      });

      test('`_.' + methodName + '` should return a unwrapped value when chaining', 2, function() {
        if (!isNpm) {
          var object = objects['objects'],
              actual = _(object)[methodName]();

          deepEqual(actual, object);
          notStrictEqual(actual, object);
        }
        else {
          skipTest(2);
        }
      });
    });
  }(1, 2, 3));

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.compact');

  (function() {
    test('should filter falsey values', 1, function() {
      var array = ['0', '1', '2'];
      deepEqual(_.compact(falsey.concat(array)), array);
    });

    test('should return a wrapped value when chaining', 2, function() {
      if (!isNpm) {
        var actual = _(falsey).compact();
        ok(actual instanceof _);
        deepEqual(actual.value(), []);
      }
      else {
        skipTest(2);
      }
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.compose');

  (function() {
    test('should create a function that is the composition of the provided functions', 1, function() {
      var realNameMap = {
        'pebbles': 'penelope'
      };

      var format = function(name) {
        name = realNameMap[name.toLowerCase()] || name;
        return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
      };

      var greet = function(formatted) {
        return 'Hiya ' + formatted + '!';
      };

      var welcome = _.compose(greet, format);
      strictEqual(welcome('pebbles'), 'Hiya Penelope!');
    });

    test('should return a new function', 1, function() {
      notStrictEqual(_.compose(_.noop), _.noop);
    });

    test('should return a noop function when no arguments are provided', 2, function() {
      var composed = _.compose();

      try {
        strictEqual(composed(), undefined);
      } catch(e) {
        ok(false);
      }
      notStrictEqual(composed, _.noop);
    });

    test('should return a wrapped value when chaining', 1, function() {
      if (!isNpm) {
        var actual = _(_.noop).compose();
        ok(actual instanceof _);
      }
      else {
        skipTest();
      }
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.constant');

  (function() {
    test('should create a function that always returns `value`', 1, function() {
      var object = { 'a': 1 },
          values = falsey.concat(null, null, 1, 'a'),
          constant = _.constant(object),
          expected = _.map(values, function() { return true; });

      var actual = _.map(values, function(value, index) {
        if (index == 0) {
          var result = constant();
        } else if (index == 1) {
          result = constant.call({});
        } else {
          result = constant(value);
        }
        return result === object;
      });

      deepEqual(actual, expected);
    });

    test('should work with falsey values', 1, function() {
      var expected = _.map(falsey, function() { return true; });

      var actual = _.map(falsey, function(value, index) {
        var constant = index ? _.constant(value) : _.constant();
        return constant() === value || _.isNaN(value);
      });

      deepEqual(actual, expected);
    });

    test('should return a wrapped value when chaining', 1, function() {
      if (!isNpm) {
        var actual = _(true).constant();
        ok(actual instanceof _);
      }
      else {
        skipTest();
      }
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.contains');

  (function() {
    _.each({
      'an `arguments` object': arguments,
      'an array': [1, 2, 3, 4],
      'an object': { 'a': 1, 'b': 2, 'c': 3, 'd': 4 },
      'a string': '1234'
    },
    function(collection, key) {
      var values = _.toArray(collection);

      test('should work with ' + key + ' and  return `true` for  matched values', 1, function() {
        strictEqual(_.contains(collection, 3), true);
      });

      test('should work with ' + key + ' and  return `false` for unmatched values', 1, function() {
        strictEqual(_.contains(collection, 5), false);
      });

      test('should work with ' + key + ' and a positive `fromIndex`', 2, function() {
        strictEqual(_.contains(collection, values[2], 2), true);
        strictEqual(_.contains(collection, values[1], 2), false);
      });

      test('should work with ' + key + ' and a `fromIndex` >= `collection.length`', 12, function() {
        _.each([6, 8, Math.pow(2, 32), Infinity], function(fromIndex) {
          strictEqual(_.contains(collection, 1, fromIndex), false);
          strictEqual(_.contains(collection, undefined, fromIndex), false);
          strictEqual(_.contains(collection, '', fromIndex), false);
        });
      });

      test('should work with ' + key + ' and treat falsey `fromIndex` values as `0`', 1, function() {
        var expected = _.map(falsey, _.constant(true));

        var actual = _.map(falsey, function(fromIndex) {
          return _.contains(collection, values[0], fromIndex);
        });

        deepEqual(actual, expected);
      });

      test('should work with ' + key + ' and treat non-number `fromIndex` values as `0`', 1, function() {
        strictEqual(_.contains(collection, values[0], '1'), true);
      });

      test('should work with ' + key + ' and a negative `fromIndex`', 2, function() {
        strictEqual(_.contains(collection, values[2], -2), true);
        strictEqual(_.contains(collection, values[1], -2), false);
      });

      test('should work with ' + key + ' and a negative `fromIndex` <= negative `collection.length`', 3, function() {
        _.each([-4, -6, -Infinity], function(fromIndex) {
          strictEqual(_.contains(collection, values[0], fromIndex), true);
        });
      });

      test('should work with ' + key + ' and return an unwrapped value when chaining', 1, function() {
        if (!isNpm) {
          strictEqual(_(collection).contains(3), true);
        }
        else {
          skipTest();
        }
      });
    });

    _.each({
      'literal': 'abc',
      'object': Object('abc')
    },
    function(collection, key) {
      test('should work with a string ' + key + ' for `collection`', 2, function() {
        strictEqual(_.contains(collection, 'bc'), true);
        strictEqual(_.contains(collection, 'd'), false);
      });
    });

    test('should not be possible to perform a binary search', 1, function() {
      strictEqual(_.contains([3, 2, 1], 3, true), true);
    });

    test('should be aliased', 1, function() {
      strictEqual(_.include, _.contains);
    });
  }(1, 2, 3, 4));

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.countBy');

  (function() {
    var array = [4.2, 6.1, 6.4];

    test('should work with a callback', 1, function() {
      var actual = _.countBy(array, function(num) {
        return Math.floor(num);
      }, Math);

      deepEqual(actual, { '4': 1, '6': 2 });
    });

    test('should use `_.identity` when no `callback` is provided', 1, function() {
      var actual = _.countBy([4, 6, 6]);
      deepEqual(actual, { '4': 1, '6':  2 });
    });

    test('should pass the correct `callback` arguments', 1, function() {
      var args;

      _.countBy(array, function() {
        args || (args = slice.call(arguments));
      });

      deepEqual(args, [4.2, 0, array]);
    });

    test('should support the `thisArg` argument', 1, function() {
      var actual = _.countBy(array, function(num) {
        return this.floor(num);
      }, Math);

      deepEqual(actual, { '4': 1, '6': 2 });
    });

    test('should only add values to own, not inherited, properties', 2, function() {
      var actual = _.countBy([4.2, 6.1, 6.4], function(num) {
        return Math.floor(num) > 4 ? 'hasOwnProperty' : 'constructor';
      });

      deepEqual(actual.constructor, 1);
      deepEqual(actual.hasOwnProperty, 2);
    });

    test('should work with a string for `callback`', 1, function() {
      var actual = _.countBy(['one', 'two', 'three'], 'length');
      deepEqual(actual, { '3': 2, '5': 1 });
    });

    test('should work with an object for `collection`', 1, function() {
      var actual = _.countBy({ 'a': 4.2, 'b': 6.1, 'c': 6.4 }, function(num) {
        return Math.floor(num);
      });

      deepEqual(actual, { '4': 1, '6': 2 });
    });

    test('should work with a number for `callback`', 2, function() {
      var array = [
        [1, 'a'],
        [2, 'a'],
        [2, 'b']
      ];

      deepEqual(_.countBy(array, 0), { '1': 1, '2': 2 });
      deepEqual(_.countBy(array, 1), { 'a': 2, 'b': 1 });
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.create');

  (function() {
    test('should create an object that inherits from the given `prototype` object', 3, function() {
      function Shape() {
        this.x = 0;
        this.y = 0;
      }

      function Circle() {
        Shape.call(this);
      }

      Circle.prototype = _.create(Shape.prototype);
      Circle.prototype.constructor = Circle;

      var actual = new Circle;

      ok(actual instanceof Circle);
      ok(actual instanceof Shape);
      notStrictEqual(Circle.prototype, Shape.prototype);
    });

    test('should assign `properties` to the created object', 3, function() {
      function Shape() {
        this.x = 0;
        this.y = 0;
      }

      function Circle() {
        Shape.call(this);
      }

      var expected = { 'constructor': Circle, 'radius': 0 };
      Circle.prototype = _.create(Shape.prototype, expected);

      var actual = new Circle;

      ok(actual instanceof Circle);
      ok(actual instanceof Shape);
      deepEqual(Circle.prototype, expected);
    });

    test('should accept a falsey `prototype` argument', 1, function() {
      var expected = _.map(falsey, function() { return {}; });

      var actual = _.map(falsey, function(value, index) {
        return index ? _.create(value) : _.create();
      });

      deepEqual(actual, expected);
    });

    test('should ignore primitive `prototype` arguments and use an empty object instead', 1, function() {
      var primitives = [true, null, 1, 'a', undefined],
          expected = _.map(primitives, _.constant(true));

      var actual = _.map(primitives, function(value, index) {
        return _.isPlainObject(index ? _.create(value) : _.create());
      });

      deepEqual(actual, expected);
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.callback');

  (function() {
    test('should create a callback with a falsey `thisArg`', 1, function() {
      var fn = function() { return this; },
          object = {};

      var expected = _.map(falsey, function(value) {
        var result = fn.call(value);
        return (result && result.Array) ? object : result;
      });

      var actual = _.map(falsey, function(value) {
        var callback = _.callback(fn, value),
            result = callback();

        return (result && result.Array) ? object : result;
      });

      ok(_.isEqual(actual, expected));
    });

    test('should return `_.identity` when `func` is nullish', 2, function() {
      var object = {};
      _.each([null, undefined], function(value) {
        var callback = _.callback(value);
        strictEqual(callback(object), object);
      });
    });

    test('should not error when `func` is nullish and a `thisArg` is provided', 2, function() {
      var object = {};
      _.each([null, undefined], function(value) {
        try {
          var callback = _.callback(value, {});
          strictEqual(callback(object), object);
        } catch(e) {
          ok(false);
        }
      });
    });

    test('should return a callback created by `_.matches` when `func` is an object', 2, function() {
      var callback = _.callback({ 'a': 1 });
      strictEqual(callback({ 'a': 1, 'b': 2 }), true);
      strictEqual(callback({}), false);
    });

    test('should return a callback created by `_.property` when `func` is a number or string', 2, function() {
      var array = ['a'],
          callback = _.callback(0);

      strictEqual(callback(array), 'a');

      callback = _.callback('0');
      strictEqual(callback(array), 'a');
    });

    test('should work without an `argCount`', 1, function() {
      var args,
          expected = ['a', 'b', 'c', 'd', 'e'];

      var callback = _.callback(function() {
        args = slice.call(arguments);
      });

      callback.apply(null, expected);
      deepEqual(args, expected);
    });

    test('should work with functions created by `_.partial` and `_.partialRight`', 2, function() {
      function fn() {
        var result = [this.a];
        push.apply(result, arguments);
        return result;
      }

      var expected = [1, 2, 3],
          object = { 'a': 1 },
          callback = _.callback(_.partial(fn, 2), object);

      deepEqual(callback(3), expected);

      callback = _.callback(_.partialRight(fn, 3), object);
      deepEqual(callback(2), expected);
    });

    test('should support binding built-in methods', 2, function() {
      var object = { 'a': 1 },
          callback = _.callback(Object.prototype.hasOwnProperty, object);

      strictEqual(callback('a'), true);

      var fn = function () {},
          bound = fn.bind && fn.bind(object);

      if (bound) {
        callback = _.callback(bound, object);
        notStrictEqual(callback, bound);
      }
      else {
        skipTest();
      }
    });

    test('should return the function provided when there is no `this` reference', 2, function() {
      function a() {}
      function b() { return this.b; }

      var object = {};

      if (_.support.funcDecomp) {
        strictEqual(_.callback(a, object), a);
        notStrictEqual(_.callback(b, object), b);
      }
      else {
        skipTest(2);
      }
    });

    test('should only write metadata to named functions', 3, function() {
      function a() {};
      var b = function() {};
      function c() {};

      var object = {};

      if (defineProperty && _.support.funcDecomp) {
        _.callback(a, object);
        ok(expando in a);

        _.callback(b, object);
        ok(!(expando in b));

        if (_.support.funcNames) {
          _.support.funcNames = false;
          _.callback(c, object);

          ok(expando in c);
          _.support.funcNames = true;
        }
        else {
          skipTest();
        }
      }
      else {
        skipTest(3);
      }
    });

    test('should not write metadata when `_.support.funcDecomp` is `false`', 1, function() {
      function a() {};

      if (defineProperty && lodashBizarro) {
        lodashBizarro.callback(a, {});
        ok(!(expando in a));
      }
      else {
        skipTest();
      }
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.curry');

  (function() {
    function fn(a, b, c, d) {
      return slice.call(arguments);
    }

    test('should curry based on the number of arguments provided', 3, function() {
      var curried = _.curry(fn),
          expected = [1, 2, 3, 4];

      deepEqual(curried(1)(2)(3)(4), expected);
      deepEqual(curried(1, 2)(3, 4), expected);
      deepEqual(curried(1, 2, 3, 4), expected);
    });

    test('should work with partialed methods', 2, function() {
      var curried = _.curry(fn),
          expected = [1, 2, 3, 4];

      var a = _.partial(curried, 1),
          b = _.bind(a, null, 2),
          c = _.partialRight(b, 4),
          d = _.partialRight(b(3), 4);

      deepEqual(c(3), expected);
      deepEqual(d(), expected);
    });

    test('should support placeholders', 4, function() {
      if (!isModularize) {
        var curried = _.curry(fn);
        deepEqual(curried(1)(_, 3)(_, 4)(2), [1, 2, 3, 4]);
        deepEqual(curried(_, 2)(1)(_, 4)(3), [1, 2, 3, 4]);
        deepEqual(curried(_, _, 3)(_, 2)(_, 4)(1), [1, 2, 3, 4]);
        deepEqual(curried(_, _, _, 4)(_, _, 3)(_, 2)(1), [1, 2, 3, 4]);
      }
      else {
        skipTest(4);
      }
    });

    test('should return a function with a `length` of `0`', 6, function() {
      _.times(2, function(index) {
        var curried = index ? _.curry(fn, 4) : _.curry(fn);
        strictEqual(curried.length, 0);
        strictEqual(curried(1).length, 0);
        strictEqual(curried(1, 2).length, 0);
      });
    });

    test('ensure `new curried` is an instance of `func`', 2, function() {
      function Foo(value) {
        return value && object;
      }

      var curried = _.curry(Foo),
          object = {};

      ok(new curried(false) instanceof Foo);
      strictEqual(new curried(true), object);
    });

    test('should not alter the `this` binding', 9, function() {
      function fn(a, b, c) {
        var value = this || {};
        return [value[a], value[b], value[c]];
      }

      var object = { 'a': 1, 'b': 2, 'c': 3 },
          expected = [1, 2, 3];

      deepEqual(_.curry(_.bind(fn, object), 3)('a')('b')('c'), expected);
      deepEqual(_.curry(_.bind(fn, object), 3)('a', 'b')('c'), expected);
      deepEqual(_.curry(_.bind(fn, object), 3)('a', 'b', 'c'), expected);

      deepEqual(_.bind(_.curry(fn), object)('a')('b')('c'), Array(3));
      deepEqual(_.bind(_.curry(fn), object)('a', 'b')('c'), Array(3));
      deepEqual(_.bind(_.curry(fn), object)('a', 'b', 'c'), expected);

      object.curried = _.curry(fn);
      deepEqual(object.curried('a')('b')('c'), Array(3));
      deepEqual(object.curried('a', 'b')('c'), Array(3));
      deepEqual(object.curried('a', 'b', 'c'), expected);
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.debounce');

  (function() {
    asyncTest('should debounce a function', 2, function() {
      if (!(isRhino && isModularize)) {
        var count = 0,
            debounced = _.debounce(function() { count++; }, 32);

        debounced();
        debounced();
        debounced();

        strictEqual(count, 0);

        setTimeout(function() {
          strictEqual(count, 1);
          QUnit.start();
        }, 96);
      }
      else {
        skipTest(2);
        QUnit.start();
      }
    });

    asyncTest('subsequent debounced calls return the last `func` result', 2, function() {
      if (!(isRhino && isModularize)) {
        var debounced = _.debounce(_.identity, 32);
        debounced('x');

        setTimeout(function() {
          notEqual(debounced('y'), 'y');
        }, 64);

        setTimeout(function() {
          notEqual(debounced('z'), 'z');
          QUnit.start();
        }, 128);
      }
      else {
        skipTest(2);
        QUnit.start();
      }
    });

    asyncTest('subsequent "immediate" debounced calls return the last `func` result', 2, function() {
      if (!(isRhino && isModularize)) {
        var debounced = _.debounce(_.identity, 32, true),
            result = [debounced('x'), debounced('y')];

        deepEqual(result, ['x', 'x']);

        setTimeout(function() {
          var result = [debounced('a'), debounced('b')];
          deepEqual(result, ['a', 'a']);
          QUnit.start();
        }, 64);
      }
      else {
        skipTest(2);
        QUnit.start();
      }
    });

    asyncTest('should apply default options correctly', 2, function() {
      if (!(isRhino && isModularize)) {
        var count = 0;

        var debounced = _.debounce(function(value) {
          count++;
          return value;
        }, 32, {});

        strictEqual(debounced('x'), undefined);

        setTimeout(function() {
          strictEqual(count, 1);
          QUnit.start();
        }, 64);
      }
      else {
        skipTest(2);
        QUnit.start();
      }
    });

    asyncTest('should support a `leading` option', 7, function() {
      if (!(isRhino && isModularize)) {
        var withLeading,
            counts = [0, 0, 0];

        _.each([true, { 'leading': true }], function(options, index) {
          var debounced = _.debounce(function(value) {
            counts[index]++;
            return value;
          }, 32, options);

          if (index == 1) {
            withLeading = debounced;
          }
          strictEqual(debounced('x'), 'x');
        });

        _.each([false, { 'leading': false }], function(options) {
          var withoutLeading = _.debounce(_.identity, 32, options);
          strictEqual(withoutLeading('x'), undefined);
        });

        var withLeadingAndTrailing = _.debounce(function() {
          counts[2]++;
        }, 32, { 'leading': true });

        withLeadingAndTrailing();
        withLeadingAndTrailing();

        strictEqual(counts[2], 1);

        setTimeout(function() {
          deepEqual(counts, [1, 1, 2]);

          withLeading('x');
          strictEqual(counts[1], 2);

          QUnit.start();
        }, 64);
      }
      else {
        skipTest(7);
        QUnit.start();
      }
    });

    asyncTest('should support a `trailing` option', 4, function() {
      if (!(isRhino && isModularize)) {
        var withCount = 0,
            withoutCount = 0;

        var withTrailing = _.debounce(function(value) {
          withCount++;
          return value;
        }, 32, { 'trailing': true });

        var withoutTrailing = _.debounce(function(value) {
          withoutCount++;
          return value;
        }, 32, { 'trailing': false });

        strictEqual(withTrailing('x'), undefined);
        strictEqual(withoutTrailing('x'), undefined);

        setTimeout(function() {
          strictEqual(withCount, 1);
          strictEqual(withoutCount, 0);
          QUnit.start();
        }, 64);
      }
      else {
        skipTest(4);
        QUnit.start();
      }
    });

    asyncTest('should support a `maxWait` option', 1, function() {
      if (!(isRhino && isModularize)) {
        var limit = (argv || isPhantom) ? 1000 : 320,
            withCount = 0,
            withoutCount = 0;

        var withMaxWait = _.debounce(function() {
          withCount++;
        }, 64, { 'maxWait': 128 });

        var withoutMaxWait = _.debounce(function() {
          withoutCount++;
        }, 96);

        var start = +new Date;
        while ((new Date - start) < limit) {
          withMaxWait();
          withoutMaxWait();
        }
        var actual = [Boolean(withCount), Boolean(withoutCount)];

        setTimeout(function() {
          deepEqual(actual, [true, false]);
          QUnit.start();
        }, 1);
      }
      else {
        skipTest();
        QUnit.start();
      }
    });

    asyncTest('should cancel `maxDelayed` when `delayed` is executed', 1, function() {
      if (!(isRhino && isModularize)) {
        var count = 0;

        var debounced = _.debounce(function() {
          count++;
        }, 32, { 'maxWait': 64 });

        debounced();

        setTimeout(function() {
          strictEqual(count, 1);
          QUnit.start();
        }, 128);
      }
      else {
        skipTest();
        QUnit.start();
      }
    });

    asyncTest('should execute the `trailing` call with the correct arguments and `this` binding', 2, function() {
      if (!(isRhino && isModularize)) {
        var args,
            count = 0,
            object = {};

        var debounced = _.debounce(function(value) {
          args = [this];
          push.apply(args, arguments);
          return ++count != 2;
        }, 32, { 'leading': true, 'maxWait': 64 });

        while (true) {
          if (!debounced.call(object, 'a')) {
            break;
          }
        }
        setTimeout(function() {
          strictEqual(count, 2);
          deepEqual(args, [object, 'a']);
          QUnit.start();
        }, 64);
      }
      else {
        skipTest(2);
        QUnit.start();
      }
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.defaults');

  (function() {
    test('should assign properties of a source object if missing on the destination object', 1, function() {
      deepEqual(_.defaults({ 'a': 1 }, { 'a': 2, 'b': 2 }), { 'a': 1, 'b': 2 });
    });

    test('should assign own source properties', 1, function() {
      function Foo() {
        this.a = 1;
        this.c = 3;
      }
      Foo.prototype.b = 2;
      deepEqual(_.defaults({ 'c': 2 }, new Foo), { 'a': 1, 'c': 2 });
    });

    test('should accept multiple source objects', 2, function() {
      var expected = { 'a': 1, 'b': 2, 'c': 3 };
      deepEqual(_.defaults({ 'a': 1, 'b': 2 }, { 'b': 3 }, { 'c': 3 }), expected);
      deepEqual(_.defaults({ 'a': 1, 'b': 2 }, { 'b': 3, 'c': 3 }, { 'c': 2 }), expected);
    });

    test('should not overwrite `null` values', 1, function() {
      var actual = _.defaults({ 'a': null }, { 'a': 1 });
      strictEqual(actual.a, null);
    });

    test('should overwrite `undefined` values', 1, function() {
      var actual = _.defaults({ 'a': undefined }, { 'a': 1 });
      strictEqual(actual.a, 1);
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.defer');

  (function() {
    asyncTest('should defer `func` execution', 1, function() {
      if (!(isRhino && isModularize)) {
        var pass = false;
        _.defer(function(){ pass = true; });

        setTimeout(function() {
          ok(pass);
          QUnit.start();
        }, 128);
      }
      else {
        skipTest();
        QUnit.start();
      }
    });

    asyncTest('should accept additional arguments', 1, function() {
      if (!(isRhino && isModularize)) {
        var args;

        _.defer(function() {
          args = slice.call(arguments);
        }, 1, 2, 3);

        setTimeout(function() {
          deepEqual(args, [1, 2, 3]);
          QUnit.start();
        }, 128);
      }
      else {
        skipTest();
        QUnit.start();
      }
    });

    asyncTest('should be cancelable', 1, function() {
      if (!(isRhino && isModularize)) {
        var pass = true;

        var timerId = _.defer(function() {
          pass = false;
        });

        clearTimeout(timerId);

        setTimeout(function() {
          ok(pass);
          QUnit.start();
        }, 128);
      }
      else {
        skipTest();
        QUnit.start();
      }
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.delay');

  (function() {
    asyncTest('should delay `func` execution', 2, function() {
      if (!(isRhino && isModularize)) {
        var pass = false;
        _.delay(function(){ pass = true; }, 96);

        setTimeout(function() {
          ok(!pass);
        }, 32);

        setTimeout(function() {
          ok(pass);
          QUnit.start();
        }, 160);
      }
      else {
        skipTest(2);
        QUnit.start();
      }
    });

    asyncTest('should accept additional arguments', 1, function() {
      if (!(isRhino && isModularize)) {
        var args;

        _.delay(function() {
          args = slice.call(arguments);
        }, 32, 1, 2, 3);

        setTimeout(function() {
          deepEqual(args, [1, 2, 3]);
          QUnit.start();
        }, 128);
      }
      else {
        skipTest();
        QUnit.start();
      }
    });

    asyncTest('should be cancelable', 1, function() {
      if (!(isRhino && isModularize)) {
        var pass = true;

        var timerId = _.delay(function() {
          pass = false;
        }, 32);

        clearTimeout(timerId);

        setTimeout(function() {
          ok(pass);
          QUnit.start();
        }, 128);
      }
      else {
        skipTest();
        QUnit.start();
      }
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.difference');

  (function() {
    var args = arguments;

    test('should return the difference of the given arrays', 2, function() {
      var actual = _.difference([1, 2, 3, 4, 5], [5, 2, 10]);
      deepEqual(actual, [1, 3, 4]);

      actual = _.difference([1, 2, 3, 4, 5], [5, 2, 10], [8, 4]);
      deepEqual(actual, [1, 3]);
    });

    test('should work with large arrays', 1, function() {
      var array1 = _.range(largeArraySize + 1),
          array2 = _.range(largeArraySize),
          a = {},
          b = {},
          c = {};

      array1.push(a, b, c);
      array2.push(b, c, a);

      deepEqual(_.difference(array1, array2), [largeArraySize]);
    });

    test('should work with large arrays of objects', 1, function() {
      var object1 = {},
          object2 = {},
          largeArray = _.times(largeArraySize, _.constant(object1));

      deepEqual(_.difference([object1, object2], largeArray), [object2]);
    });

    test('should ignore values that are not arrays or `arguments` objects', 3, function() {
      var array = [0, 1, null, 3];
      deepEqual(_.difference(array, 3, null, { '0': 1 }), array);
      deepEqual(_.difference(null, array, null, [2, 1]), [0, null, 3]);
      deepEqual(_.difference(null, array, null, args), [0, null]);
    });
  }(1, 2, 3));

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.drop');

  (function() {
    var array = [1, 2, 3];

    test('should drop the first two elements', 1, function() {
      deepEqual(_.drop(array, 2), [3]);
    });

    test('should treat falsey `n` values, except nullish, as `0`', 1, function() {
      var expected = _.map(falsey, function(value) {
        return value == null ? [2, 3] : array;
      });

      var actual = _.map(falsey, function(n) {
        return _.drop(array, n);
      });

      deepEqual(actual, expected);
    });

    test('should return all elements when `n` < `1`', 3, function() {
      _.each([0, -1, -Infinity], function(n) {
        deepEqual(_.drop(array, n), array);
      });
    });

    test('should return an empty array when `n` >= `array.length`', 4, function() {
      _.each([3, 4, Math.pow(2, 32), Infinity], function(n) {
        deepEqual(_.drop(array, n), []);
      });
    });

    test('should return a wrapped value when chaining', 2, function() {
      if (!isNpm) {
        var actual = _(array).drop(2);
        ok(actual instanceof _);
        deepEqual(actual.value(), [3]);
      }
      else {
        skipTest(2);
      }
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.dropRight');

  (function() {
    var array = [1, 2, 3];

    test('should drop the last two elements', 1, function() {
      deepEqual(_.dropRight(array, 2), [1]);
    });

    test('should treat falsey `n` values, except nullish, as `0`', 1, function() {
      var expected = _.map(falsey, function(value) {
        return value == null ? [1, 2] : array;
      });

      var actual = _.map(falsey, function(n) {
        return _.dropRight(array, n);
      });

      deepEqual(actual, expected);
    });

    test('should return all elements when `n` < `1`', 3, function() {
      _.each([0, -1, -Infinity], function(n) {
        deepEqual(_.dropRight(array, n), array);
      });
    });

    test('should return an empty array when `n` >= `array.length`', 4, function() {
      _.each([3, 4, Math.pow(2, 32), Infinity], function(n) {
        deepEqual(_.dropRight(array, n), []);
      });
    });

    test('should return a wrapped value when chaining', 2, function() {
      if (!isNpm) {
        var actual = _(array).dropRight(2);
        ok(actual instanceof _);
        deepEqual(actual.value(), [1]);
      }
      else {
        skipTest(2);
      }
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.dropRightWhile');

  (function() {
    var array = [1, 2, 3];

    var objects = [
      { 'a': 0, 'b': 0 },
      { 'a': 1, 'b': 1 },
      { 'a': 2, 'b': 2 }
    ];

    test('should drop elements while `predicate` returns truthy', 1, function() {
      var actual = _.dropRightWhile(array, function(num) {
        return num > 1;
      });

      deepEqual(actual, [1]);
    });

    test('should pass the correct `predicate` arguments', 1, function() {
      var args;

      _.dropRightWhile(array, function() {
        args = slice.call(arguments);
      });

      deepEqual(args, [3, 2, array]);
    });

    test('should support the `thisArg` argument', 1, function() {
      var actual = _.dropRightWhile(array, function(num, index) {
        return this[index] > 1;
      }, array);

      deepEqual(actual, [1]);
    });

    test('should work with an object for `predicate`', 1, function() {
      deepEqual(_.dropRightWhile(objects, { 'b': 2 }), objects.slice(0, 2));
    });

    test('should work with a string for `predicate`', 1, function() {
      deepEqual(_.dropRightWhile(objects, 'b'), objects.slice(0, 1));
    });

    test('should return a wrapped value when chaining', 2, function() {
      if (!isNpm) {
        var actual = _(array).dropRightWhile(function(num) {
          return num > 1;
        });

        ok(actual instanceof _);
        deepEqual(actual.value(), [1]);
      }
      else {
        skipTest(2);
      }
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.dropWhile');

  (function() {
    var array = [1, 2, 3];

    var objects = [
      { 'a': 2, 'b': 2 },
      { 'a': 1, 'b': 1 },
      { 'a': 0, 'b': 0 }
    ];

    test('should drop elements while `predicate` returns truthy', 1, function() {
      var actual = _.dropWhile(array, function(num) {
        return num < 3;
      });

      deepEqual(actual, [3]);
    });

    test('should pass the correct `predicate` arguments', 1, function() {
      var args;

      _.dropWhile(array, function() {
        args = slice.call(arguments);
      });

      deepEqual(args, [1, 0, array]);
    });

    test('should support the `thisArg` argument', 1, function() {
      var actual = _.dropWhile(array, function(num, index) {
        return this[index] < 3;
      }, array);

      deepEqual(actual, [3]);
    });

    test('should work with an object for `predicate`', 1, function() {
      deepEqual(_.dropWhile(objects, { 'b': 2 }), objects.slice(1));
    });

    test('should work with a string for `predicate`', 1, function() {
      deepEqual(_.dropWhile(objects, 'b'), objects.slice(2));
    });

    test('should return a wrapped value when chaining', 2, function() {
      if (!isNpm) {
        var actual = _(array).dropWhile(function(num) {
          return num < 3;
        });

        ok(actual instanceof _);
        deepEqual(actual.value(), [3]);
      }
      else {
        skipTest(2);
      }
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.endsWith');

  (function() {
    var string = 'abc';

    test('should return `true` if a string ends with `target`', 1, function() {
      strictEqual(_.endsWith(string, 'c'), true);
    });

    test('should return `false` if a string does not end with `target`', 1, function() {
      strictEqual(_.endsWith(string, 'b'), false);
    });

    test('should work with a `position` argument', 1, function() {
      strictEqual(_.endsWith(string, 'b', 2), true);
    });

    test('should work with `position` >= `string.length`', 4, function() {
      _.each([3, 5, maxSafeInteger, Infinity], function(position) {
        strictEqual(_.endsWith(string, 'c', position), true);
      });
    });

    test('should treat falsey `position` values, except `undefined`, as `0`', 1, function() {
      var expected = _.map(falsey, _.constant(true));

      var actual = _.map(falsey, function(position) {
        return _.endsWith(string, position === undefined ? 'c' : '', position);
      });

      deepEqual(actual, expected);
    });

    test('should treat a negative `position` as `0`', 6, function() {
      _.each([-1, -3, -Infinity], function(position) {
        ok(_.every(string, function(chr) {
          return _.endsWith(string, chr, position) === false;
        }));
        strictEqual(_.endsWith(string, '', position), true);
      });
    });

    test('should always return `true` when `target` is an empty string regardless of `position`', 1, function() {
      ok(_.every([-Infinity, NaN, -3, -1, 0, 1, 2, 3, 5, maxSafeInteger, Infinity], function(position) {
        return _.endsWith(string, '', position, true);
      }));
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.escape');

  (function() {
    var escaped = '&amp;&lt;&gt;&quot;&#39;&#96;\/',
        unescaped = '&<>"\'`\/';

    test('should escape values', 1, function() {
      strictEqual(_.escape(unescaped), escaped);
    });

    test('should not escape the "/" character', 1, function() {
      strictEqual(_.escape('/'), '/');
    });

    test('should handle strings with nothing to escape', 1, function() {
      strictEqual(_.escape('abc'), 'abc');
    });

    test('should escape the same characters unescaped by `_.unescape`', 1, function() {
      strictEqual(_.escape(_.unescape(escaped)), escaped);
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.escapeRegExp');

  (function() {
    test('should escape values', 1, function() {
      var escaped = '\\.\\*\\+\\?\\^\\$\\{\\}\\(\\)\\|\\[\\]\\/\\\\',
          unescaped = '.*+?^${}()|[\]\/\\';

      strictEqual(_.escapeRegExp(unescaped), escaped);
    });

    test('should handle strings with nothing to escape', 1, function() {
      strictEqual(_.escapeRegExp('abc'), 'abc');
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.every');

  (function() {
    test('should return `true` for empty or falsey collections', 1, function() {
      var expected = _.map(empties, _.constant(true));

      var actual = _.map(empties, function(value) {
        try {
          return _.every(value, _.identity);
        } catch(e) { }
      });

      deepEqual(actual, expected);
    });

    test('should return `true` if `predicate` returns truthy for all elements in the collection', 1, function() {
      strictEqual(_.every([true, 1, 'x'], _.identity), true);
    });

    test('should return `false` as soon as `predicate` returns falsey', 1, function() {
      strictEqual(_.every([true, null, true], _.identity), false);
    });

    test('should work with collections of `undefined` values (test in IE < 9)', 1, function() {
      strictEqual(_.every([undefined, undefined, undefined], _.identity), false);
    });

    test('should use `_.identity` when no predicate is provided', 2, function() {
      strictEqual(_.every([0]), false);
      strictEqual(_.every([1]), true);
    });

    test('should be aliased', 1, function() {
      strictEqual(_.all, _.every);
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('source property checks');

  _.each(['assign', 'defaults', 'merge'], function(methodName) {
    var func = _[methodName];

    test('`_.' + methodName + '` should not assign inherited `source` properties', 1, function() {
      function Foo() {}
      Foo.prototype = { 'a': 1 };

      deepEqual(func({}, new Foo), {});
    });

    test('should work when used as a callback for `_.reduce`', 1, function() {
      var array = [{ 'a':  1 }, { 'b': 2 }, { 'c': 3 }],
          actual = _.reduce(array, _.merge);

      deepEqual(actual, { 'a':  1, 'b': 2, 'c': 3 });
    });
  });

  /*--------------------------------------------------------------------------*/

  QUnit.module('strict mode checks');

  _.each(['assign', 'bindAll', 'defaults'], function(methodName) {
    var func = _[methodName];

    test('`_.' + methodName + '` should ' + (isStrict ? '' : 'not ') + 'throw strict mode errors', 1, function() {
      var object = { 'a': null, 'b': function(){} },
          pass = !isStrict;

      if (freeze) {
        freeze(object);
        try {
          if (methodName == 'bindAll') {
            func(object);
          } else {
            func(object, { 'a': 1 });
          }
        } catch(e) {
          pass = !pass;
        }
        ok(pass);
      }
      else {
        skipTest();
      }
    });
  });

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.filter');

  (function() {
    test('should return elements `predicate` returns truthy for', 1, function() {
      var actual = _.filter([1, 2, 3], function(num) {
        return num % 2;
      });

      deepEqual(actual, [1, 3]);
    });

    test('should not modify wrapped values', 2, function() {
      if (!isNpm) {
        var wrapped = _([1, 2, 3, 4]);

        var actual = wrapped.filter(function(num) {
          return num < 3;
        });

        deepEqual(actual.value(), [1, 2]);

        actual = wrapped.filter(function(num) {
          return num > 2;
        });

        deepEqual(actual.value(), [3, 4]);
      }
      else {
        skipTest(2);
      }
    });

    test('should be aliased', 1, function() {
      strictEqual(_.select, _.filter);
    });
  }());

  /*--------------------------------------------------------------------------*/

  _.each(['find', 'findLast', 'findIndex', 'findLastIndex', 'findKey', 'findLastKey'], function(methodName) {
    QUnit.module('lodash.' + methodName);

    var func = _[methodName];

    (function() {
      var objects = [
        { 'a': 0, 'b': 0 },
        { 'a': 1, 'b': 1 },
        { 'a': 2, 'b': 2 }
      ];

      var expected = ({
        'find': [objects[1], undefined, objects[2], objects[1]],
        'findLast': [objects[2], undefined, objects[2], objects[2]],
        'findIndex': [1, -1, 2, 1],
        'findLastIndex': [2, -1, 2, 2],
        'findKey': ['1', undefined, '2', '1'],
        'findLastKey': ['2', undefined, '2', '2']
      })[methodName];

      test('should return the correct value', 1, function() {
        strictEqual(func(objects, function(object) { return object.a; }), expected[0]);
      });

      test('should work with a `thisArg`', 1, function() {
        strictEqual(func(objects, function(object, index) { return this[index].a; }, objects), expected[0]);
      });

      test('should return `' + expected[1] + '` if value is not found', 1, function() {
        strictEqual(func(objects, function(object) { return object.a === 3; }), expected[1]);
      });

      test('should work with an object for `predicate`', 1, function() {
        strictEqual(func(objects, { 'b': 2 }), expected[2]);
      });

      test('should work with a string for `predicate`', 1, function() {
        strictEqual(func(objects, 'b'), expected[3]);
      });

      test('should return `' + expected[1] + '` for empty or falsey collections', 1, function() {
        var actual = [],
            emptyValues = /Index/.test(methodName) ? _.reject(empties, _.isPlainObject) : empties,
            expecting = _.map(emptyValues, function() { return expected[1]; });

        _.each(emptyValues, function(value) {
          try {
            actual.push(func(value, { 'a': 3 }));
          } catch(e) { }
        });

        deepEqual(actual, expecting);
      });
    }());

    (function() {
      var expected = ({
        'find': 1,
        'findLast': 2,
        'findKey': 'a',
        'findLastKey': 'b'
      })[methodName];

      if (expected != null) {
        test('should work with an object for `collection`', 1, function() {
          var actual = func({ 'a': 1, 'b': 2, 'c': 3 }, function(num) {
            return num < 3;
          });

          strictEqual(actual, expected);
        });
      }
    }());

    (function() {
      var expected = ({
        'find': 'a',
        'findLast': 'b',
        'findIndex': 0,
        'findLastIndex': 1
      })[methodName];

      if (expected != null) {
        test('should work with a string for `collection`', 1, function() {
          var actual = func('abc', function(chr, index) {
            return index < 2;
          });

          strictEqual(actual, expected);
        });
      }
      if (methodName == 'find') {
        test('should be aliased', 1, function() {
          strictEqual(_.detect, func);
        });
      }
    }());
  });

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.findWhere');

  (function() {
    var objects = [
      { 'a': 1 },
      { 'a': 1 },
      { 'a': 1, 'b': 2 },
      { 'a': 2, 'b': 2 },
      { 'a': 3 }
    ];

    test('should filter by `source` properties', 6, function() {
      strictEqual(_.findWhere(objects, { 'a': 1 }), objects[0]);
      strictEqual(_.findWhere(objects, { 'a': 2 }), objects[3]);
      strictEqual(_.findWhere(objects, { 'a': 3 }), objects[4]);
      strictEqual(_.findWhere(objects, { 'b': 1 }), undefined);
      strictEqual(_.findWhere(objects, { 'b': 2 }), objects[2]);
      strictEqual(_.findWhere(objects, { 'a': 1, 'b': 2 }), objects[2]);
    });

    test('should work with a function for `source`', 1, function() {
      function source() {}
      source.a = 2;

      strictEqual(_.findWhere(objects, source), objects[3]);
    });

    test('should match all elements when provided an empty `source`', 1, function() {
      var expected = _.map(empties, _.constant(true));

      var actual = _.map(empties, function(value) {
        return _.findWhere(objects, value) === objects[0];
      });

      deepEqual(actual, expected);
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.first');

  (function() {
    var array = [1, 2, 3];

    test('should return the first element', 1, function() {
      strictEqual(_.first(array), 1);
    });

    test('should return `undefined` when querying empty arrays', 1, function() {
      strictEqual(_.first([]), undefined);
    });

    test('should work when used as a callback for `_.map`', 1, function() {
      var array = [[1, 2, 3], [4, 5, 6], [7, 8, 9]],
          actual = _.map(array, _.first);

      deepEqual(actual, [1, 4, 7]);
    });

    test('should return an unwrapped value when chaining', 1, function() {
      if (!isNpm) {
        strictEqual(_(array).first(), 1);
      }
      else {
        skipTest();
      }
    });

    test('should be aliased', 1, function() {
      strictEqual(_.head, _.first);
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.take');

  (function() {
    var array = [1, 2, 3];

    test('should take the first two elements', 1, function() {
      deepEqual(_.take(array, 2), [1, 2]);
    });

    test('should treat falsey `n` values, except nullish, as `0`', 1, function() {
      var expected = _.map(falsey, function(value) {
        return value == null ? [1] : [];
      });

      var actual = _.map(falsey, function(n) {
        return _.take(array, n);
      });

      deepEqual(actual, expected);
    });

    test('should return an empty array when `n` < `1`', 3, function() {
      _.each([0, -1, -Infinity], function(n) {
        deepEqual(_.take(array, n), []);
      });
    });

    test('should return all elements when `n` >= `array.length`', 4, function() {
      _.each([3, 4, Math.pow(2, 32), Infinity], function(n) {
        deepEqual(_.take(array, n), array);
      });
    });

    test('should return a wrapped value when chaining', 2, function() {
      if (!isNpm) {
        var actual = _(array).take(2);
        ok(actual instanceof _);
        deepEqual(actual.value(), [1, 2]);
      }
      else {
        skipTest(2);
      }
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.takeRight');

  (function() {
    var array = [1, 2, 3];

    test('should take the last two elements', 1, function() {
      deepEqual(_.takeRight(array, 2), [2, 3]);
    });

    test('should treat falsey `n` values, except nullish, as `0`', 1, function() {
      var expected = _.map(falsey, function(value) {
        return value == null ? [3] : [];
      });

      var actual = _.map(falsey, function(n) {
        return _.takeRight(array, n);
      });

      deepEqual(actual, expected);
    });

    test('should return an empty array when `n` < `1`', 3, function() {
      _.each([0, -1, -Infinity], function(n) {
        deepEqual(_.takeRight(array, n), []);
      });
    });

    test('should return all elements when `n` >= `array.length`', 4, function() {
      _.each([3, 4, Math.pow(2, 32), Infinity], function(n) {
        deepEqual(_.takeRight(array, n), array);
      });
    });

    test('should return a wrapped value when chaining', 2, function() {
      if (!isNpm) {
        var actual = _(array).takeRight(2);
        ok(actual instanceof _);
        deepEqual(actual.value(), [2, 3]);
      }
      else {
        skipTest(2);
      }
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.takeRightWhile');

  (function() {
    var array = [1, 2, 3];

    var objects = [
      { 'a': 0, 'b': 0 },
      { 'a': 1, 'b': 1 },
      { 'a': 2, 'b': 2 }
    ];

    test('should take elements while `predicate` returns truthy', 1, function() {
      var actual = _.takeRightWhile(array, function(num) {
        return num > 1;
      });

      deepEqual(actual, [2, 3]);
    });

    test('should pass the correct `predicate` arguments', 1, function() {
      var args;

      _.takeRightWhile(array, function() {
        args = slice.call(arguments);
      });

      deepEqual(args, [3, 2, array]);
    });

    test('should support the `thisArg` argument', 1, function() {
      var actual = _.takeRightWhile(array, function(num, index) {
        return this[index] > 1;
      }, array);

      deepEqual(actual, [2, 3]);
    });

    test('should work with an object for `predicate`', 1, function() {
      deepEqual(_.takeRightWhile(objects, { 'b': 2 }), objects.slice(2));
    });

    test('should work with a string for `predicate`', 1, function() {
      deepEqual(_.takeRightWhile(objects, 'b'), objects.slice(1));
    });

    test('should return a wrapped value when chaining', 2, function() {
      if (!isNpm) {
        var actual = _(array).takeRightWhile(function(num) {
          return num > 1;
        });

        ok(actual instanceof _);
        deepEqual(actual.value(), [2, 3]);
      }
      else {
        skipTest(2);
      }
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.takeWhile');

  (function() {
    var array = [1, 2, 3];

    var objects = [
      { 'a': 2, 'b': 2 },
      { 'a': 1, 'b': 1 },
      { 'a': 0, 'b': 0 }
    ];

    test('should take elements while `predicate` returns truthy', 1, function() {
      var actual = _.takeWhile(array, function(num) {
        return num < 3;
      });

      deepEqual(actual, [1, 2]);
    });

    test('should pass the correct `predicate` arguments', 1, function() {
      var args;

      _.takeWhile(array, function() {
        args = slice.call(arguments);
      });

      deepEqual(args, [1, 0, array]);
    });

    test('should support the `thisArg` argument', 1, function() {
      var actual = _.takeWhile(array, function(num, index) {
        return this[index] < 3;
      }, array);

      deepEqual(actual, [1, 2]);
    });

    test('should work with an object for `predicate`', 1, function() {
      deepEqual(_.takeWhile(objects, { 'b': 2 }), objects.slice(0, 1));
    });

    test('should work with a string for `predicate`', 1, function() {
      deepEqual(_.takeWhile(objects, 'b'), objects.slice(0, 2));
    });

    test('should return a wrapped value when chaining', 2, function() {
      if (!isNpm) {
        var actual = _(array).takeWhile(function(num) {
          return num < 3;
        });

        ok(actual instanceof _);
        deepEqual(actual.value(), [1, 2]);
      }
      else {
        skipTest(2);
      }
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.flatten');

  (function() {
    var args = arguments;

    test('should perform a shallow flatten', 1, function() {
      var array = [[['a']], [['b']]];
      deepEqual(_.flatten(array), [['a'], ['b']]);
    });

    test('should work with `isDeep`', 1, function() {
      var array = [[['a']], [['b']]];
      deepEqual(_.flatten(array, true), ['a', 'b']);
    });

    test('should flatten `arguments` objects', 1, function() {
      deepEqual(_.flatten([args, args]), [1, 2, 3, 1, 2, 3]);
    });

    test('should perform a shallow flatten when used as a callback for `_.map`', 1, function() {
      var array = [[[['a']]], [[['b']]]];
      deepEqual(_.map(array, _.flatten), [[['a']], [['b']]]);
    });

    test('should treat sparse arrays as dense', 4, function() {
      var array = [[1, 2, 3], Array(3)],
          expected = [1, 2, 3];

      expected.push(undefined, undefined, undefined);

      _.each([_.flatten(array), _.flatten(array, true)], function(actual) {
        deepEqual(actual, expected);
        ok('4' in actual);
      });
    });

    test('should work with extremely large arrays', 1, function() {
      // test in modern browsers
      if (freeze) {
        try {
          var expected = Array(5e5),
              actual = _.flatten([expected]);

          deepEqual(actual, expected);
        } catch(e) {
          ok(false);
        }
      } else {
        skipTest();
      }
    });

    test('should work with empty arrays', 2, function() {
      var array = [[], [[]], [[], [[[]]]]];

      deepEqual(_.flatten(array), [[], [], [[[]]]]);
      deepEqual(_.flatten(array, true), []);
    });

    test('should support flattening of nested arrays', 2, function() {
      var array = [1, [2], [3, [4]]];

      deepEqual(_.flatten(array), [1, 2, 3, [4]]);
      deepEqual(_.flatten(array, true), [1, 2, 3, 4]);
    });

    test('should return an empty array for non array-like objects', 1, function() {
      deepEqual(_.flatten({ 'a': 1 }), []);
    });

    test('should return a wrapped value when chaining', 4, function() {
      if (!isNpm) {
        var wrapped = _([1, [2], [3, [4]]]),
            actual = wrapped.flatten();

        ok(actual instanceof _);
        deepEqual(actual.value(), [1, 2, 3, [4]]);

        actual = wrapped.flatten(true);
        ok(actual instanceof _);
        deepEqual(actual.value(), [1, 2, 3, 4]);
      }
      else {
        skipTest(4);
      }
    });
  }(1, 2, 3));

  /*--------------------------------------------------------------------------*/

  QUnit.module('forEach methods');

  _.each(['forEach', 'forEachRight'], function(methodName) {
    var func = _[methodName],
        isForEach = methodName == 'forEach';

    _.each({
      'literal': 'abc',
      'object': Object('abc')
    },
    function(collection, key) {
      test('`_.' + methodName + '` should work with a string ' + key + ' for `collection` (test in IE < 9)', 2, function() {
        var args,
            values = [];

        func(collection, function(value) {
          args || (args = slice.call(arguments));
          values.push(value);
        });

        if (isForEach) {
          deepEqual(args, ['a', 0, collection]);
          deepEqual(values, ['a', 'b', 'c']);
        } else {
          deepEqual(args, ['c', 2, collection]);
          deepEqual(values, ['c', 'b', 'a']);
        }
      });
    });

    test('`_.' + methodName + '` should be aliased', 1, function() {
      if (isForEach) {
        strictEqual(_.each, _.forEach);
      } else {
        strictEqual(_.eachRight, _.forEachRight);
      }
    });
  });

  /*--------------------------------------------------------------------------*/

  QUnit.module('forIn methods');

  _.each(['forIn', 'forInRight'], function(methodName) {
    var func = _[methodName];

    test('`_.' + methodName + '` iterates over inherited properties', 1, function() {
      function Foo() { this.a = 1; }
      Foo.prototype.b = 2;

      var keys = [];
      func(new Foo, function(value, key) { keys.push(key); });
      deepEqual(keys.sort(), ['a', 'b']);
    });
  });

  /*--------------------------------------------------------------------------*/

  QUnit.module('forOwn methods');

  _.each(['forOwn', 'forOwnRight'], function(methodName) {
    var func = _[methodName];

    test('iterates over the `length` property', 1, function() {
      var object = { '0': 'zero', '1': 'one', 'length': 2 },
          props = [];

      func(object, function(value, prop) { props.push(prop); });
      deepEqual(props.sort(), ['0', '1', 'length']);
    });
  });

  /*--------------------------------------------------------------------------*/

  QUnit.module('iteration methods');

  (function() {
    var methods = [
      'countBy',
      'every',
      'filter',
      'forEachRight',
      'forIn',
      'forInRight',
      'forOwn',
      'forOwnRight',
      'groupBy',
      'indexBy',
      'map',
      'max',
      'min',
      'partition',
      'reject',
      'some'
    ];

    var collectionMethods = [
      'countBy',
      'every',
      'filter',
      'find',
      'findLast',
      'forEach',
      'forEachRight',
      'groupBy',
      'indexBy',
      'map',
      'max',
      'min',
      'partition',
      'reduce',
      'reduceRight',
      'reject',
      'some'
    ];

    var forInMethods = [
      'forIn',
      'forInRight'
    ];

    var iterationMethods = [
      'forEach',
      'forEachRight',
      'forIn',
      'forInRight',
      'forOwn',
      'forOwnRight'
    ]

    var objectMethods = [
      'forIn',
      'forInRight',
      'forOwn',
      'forOwnRight'
    ];

    var rightMethods = [
      'forEachRight',
      'forInRight',
      'forOwnRight'
    ];

    var unwrappedMethods = [
      'every',
      'max',
      'min',
      'some'
    ];

    _.each(methods, function(methodName) {
      var array = [1, 2, 3],
          func = _[methodName];

      test('`_.' + methodName + '` should pass the correct `callback` arguments', 1, function() {
        var args,
            expected = [1, 0, array];

        func(array, function() {
          args || (args = slice.call(arguments));
        });

        if (_.contains(rightMethods, methodName)) {
          expected[0] = 3;
          expected[1] = 2;
        }
        if (_.contains(objectMethods, methodName)) {
          expected[1] += '';
        }
        deepEqual(args, expected);
      });

      test('`_.' + methodName + '` should support the `thisArg` argument', 2, function() {
        var actual;

        function callback(num, index) {
          actual = this[index];
        }
        func([1], callback, [2]);
        strictEqual(actual, 2);

        func({ 'a': 1 }, callback, { 'a': 2 });
        strictEqual(actual, 2);
      });
    });

    _.each(_.difference(methods, unwrappedMethods), function(methodName) {
      var array = [1, 2, 3],
          func = _[methodName];

      test('`_.' + methodName + '` should return a wrapped value when chaining', 1, function() {
        if (!isNpm) {
          var actual = _(array)[methodName](_.noop);
          ok(actual instanceof _);
        }
        else {
          skipTest();
        }
      });
    });

    _.each(unwrappedMethods, function(methodName) {
      var array = [1, 2, 3],
          func = _[methodName];

      test('`_.' + methodName + '` should return an unwrapped value when chaining', 1, function() {
        if (!isNpm) {
          var actual = _(array)[methodName](_.noop);
          ok(!(actual instanceof _));
        }
        else {
          skipTest();
        }
      });
    });

    _.each(_.difference(methods, forInMethods), function(methodName) {
      var array = [1, 2, 3],
          func = _[methodName];

      test('`_.' + methodName + '` iterates over own properties of objects', 1, function() {
        function Foo() { this.a = 1; }
        Foo.prototype.b = 2;

        var keys = [];
        func(new Foo, function(value, key) { keys.push(key); });
        deepEqual(keys, ['a']);
      });
    });

    _.each(iterationMethods, function(methodName) {
      var array = [1, 2, 3],
          func = _[methodName];

      test('`_.' + methodName + '` should return the collection', 1, function() {
        strictEqual(func(array, Boolean), array);
      });

      test('`_.' + methodName + '` should return the existing wrapper when chaining', 1, function() {
        if (!isNpm) {
          var wrapper = _(array);
          strictEqual(wrapper[methodName](_.noop), wrapper);
        }
        else {
          skipTest();
        }
      });
    });

    _.each(collectionMethods, function(methodName) {
      var func = _[methodName];

      test('`_.' + methodName + '` should treat objects with lengths of `0` as array-like', 1, function() {
        var pass = true;
        func({ 'length': 0 }, function() { pass = false; }, 0);
        ok(pass);
      });

      test('`_.' + methodName + '` should not treat objects with negative lengths as array-like', 1, function() {
        var pass = false;
        func({ 'length': -1 }, function() { pass = true; }, 0);
        ok(pass);
      });

      test('`_.' + methodName + '` should not treat objects with non-number lengths as array-like', 1, function() {
        var pass = false;
        func({ 'length': '0' }, function() { pass = true; }, 0);
        ok(pass);
      });
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('collection iteration bugs');

  _.each(['forEach', 'forEachRight', 'forIn', 'forInRight', 'forOwn', 'forOwnRight'], function(methodName) {
    var func = _[methodName];

    test('`_.' + methodName + '` fixes the JScript `[[DontEnum]]` bug (test in IE < 9)', 1, function() {
      var props = [];
      func(shadowedObject, function(value, prop) { props.push(prop); });
      deepEqual(props.sort(), shadowedProps);
    });

    test('`_.' + methodName + '` does not iterate over non-enumerable properties (test in IE < 9)', 10, function() {
      _.forOwn({
        'Array': Array.prototype,
        'Boolean': Boolean.prototype,
        'Date': Date.prototype,
        'Error': Error.prototype,
        'Function': Function.prototype,
        'Object': Object.prototype,
        'Number': Number.prototype,
        'TypeError': TypeError.prototype,
        'RegExp': RegExp.prototype,
        'String': String.prototype
      },
      function(proto, key) {
        var message = 'non-enumerable properties on ' + key + '.prototype',
            props = [];

        func(proto, function(value, prop) { props.push(prop); });

        if (/Error/.test(key)) {
          ok(_.every(['constructor', 'toString'], function(prop) {
            return !_.contains(props, prop);
          }), message);
        }
        else {
          deepEqual(props, [], message);
        }
      });
    });

    test('`_.' + methodName + '` skips the prototype property of functions (test in Firefox < 3.6, Opera > 9.50 - Opera < 11.60, and Safari < 5.1)', 2, function() {
      function Foo() {}
      Foo.prototype.a = 1;

      var props = [];
      function callback(value, prop) { props.push(prop); }

      func(Foo, callback);
      deepEqual(props, []);
      props.length = 0;

      Foo.prototype = { 'a': 1 };
      func(Foo, callback);
      deepEqual(props, []);
    });
  });

  /*--------------------------------------------------------------------------*/

  QUnit.module('object assignments');

  _.each(['assign', 'defaults', 'merge'], function(methodName) {
    var func = _[methodName];

    test('`_.' + methodName + '` should return `undefined` when no destination object is provided', 1, function() {
      strictEqual(func(), undefined);
    });

    test('`_.' + methodName + '` should assign problem JScript properties (test in IE < 9)', 1, function() {
      var object = {
        'constructor': '0',
        'hasOwnProperty': '1',
        'isPrototypeOf': '2',
        'propertyIsEnumerable': undefined,
        'toLocaleString': undefined,
        'toString': undefined,
        'valueOf': undefined
      };

      var source = {
        'propertyIsEnumerable': '3',
        'toLocaleString': '4',
        'toString': '5',
        'valueOf': '6'
      };

      deepEqual(func(object, source), shadowedObject);
    });

    test('`_.' + methodName + '` skips the prototype property of functions (test in Firefox < 3.6, Opera > 9.50 - Opera < 11.60, and Safari < 5.1)', 2, function() {
      function Foo() {}
      Foo.a = 1;
      Foo.b = 2;
      Foo.prototype.c = 3;

      var expected = { 'a': 1, 'b': 2 };
      deepEqual(func({}, Foo), expected);

      Foo.prototype = { 'c': 3 };
      deepEqual(func({}, Foo), expected);
    });

    test('`_.' + methodName + '` should work with `_.reduce`', 1, function() {
      var array = [{ 'b': 2 }, { 'c': 3 }];
      deepEqual(_.reduce(array, func, { 'a': 1}), { 'a': 1, 'b': 2, 'c': 3 });
    });

    test('`_.' + methodName + '` should not error on nullish sources (test in IE < 9)', 1, function() {
      try {
        deepEqual(func({ 'a': 1 }, undefined, { 'b': 2 }, null), { 'a': 1, 'b': 2 });
      } catch(e) {
        ok(false);
      }
    });

    test('`_.' + methodName + '` should not error when `object` is nullish and source objects are provided', 1, function() {
      var expected = _.times(2, _.constant(true));

      var actual = _.map([null, undefined], function(value) {
        try {
          return _.isEqual(func(value, { 'a': 1 }), value);
        } catch(e) {
          return false;
        }
      });

      deepEqual(actual, expected);
    });

    test('`_.' + methodName + '` should return the existing wrapper when chaining', 1, function() {
      if (!isNpm) {
        var wrapper = _({ 'a': 1 });
        strictEqual(wrapper[methodName]({ 'b': 2 }), wrapper);
      }
      else {
        skipTest();
      }
    });
  });

  _.each(['assign', 'merge'], function(methodName) {
    var func = _[methodName],
        isMerge = methodName == 'merge';

    test('`_.' + methodName + '` should pass the correct `callback` arguments', 3, function() {
      var args,
          object = { 'a': 1 },
          source = { 'a': 2 };

      func(object, source, function() {
        args || (args = slice.call(arguments));
      });

      deepEqual(args, [1, 2, 'a', object, source], 'primitive property values');

      args = null;
      object = { 'a': 1 };
      source = { 'b': 2 };

      func(object, source, function() {
        args || (args = slice.call(arguments));
      });

      deepEqual(args, [undefined, 2, 'b', object, source], 'missing destination property');

      var argsList = [],
          objectValue = [1, 2],
          sourceValue = { 'b': 2 };

      object = { 'a': objectValue };
      source = { 'a': sourceValue };

      func(object, source, function() {
        argsList.push(slice.call(arguments));
      });

      var expected = [[objectValue, sourceValue, 'a', object, source]];
      if (isMerge) {
        expected.push([undefined, 2, 'b', sourceValue, sourceValue]);
      }
      deepEqual(argsList, expected, 'non-primitive property values');
    });

    test('`_.' + methodName + '`should support the `thisArg` argument', 1, function() {
      var actual = func({}, { 'a': 0 }, function(a, b) {
        return this[b];
      }, [2]);

      deepEqual(actual, { 'a': 2 });
    });

    test('`_.' + methodName + '` should not treat the second argument as a callback', 2, function() {
      function callback() {}
      callback.b = 2;

      var actual = func({ 'a': 1 }, callback);
      deepEqual(actual, { 'a': 1, 'b': 2 });

      actual = func({ 'a': 1 }, callback, { 'c': 3 });
      deepEqual(actual, { 'a': 1, 'b': 2, 'c': 3 });
    });
  });

  /*--------------------------------------------------------------------------*/

  QUnit.module('exit early');

  _.each(['_baseEach', 'forEach', 'forEachRight', 'forIn', 'forInRight', 'forOwn', 'forOwnRight'], function(methodName) {
    var func = _[methodName];
    if (!func) {
      return;
    }
    test('`_.' + methodName + '` can exit early when iterating arrays', 1, function() {
      var array = [1, 2, 3],
          values = [];

      func(array, function(value) { values.push(value); return false; });
      deepEqual(values, [/Right/.test(methodName) ? 3 : 1]);
    });

    test('`_.' + methodName + '` can exit early when iterating objects', 1, function() {
      var object = { 'a': 1, 'b': 2, 'c': 3 },
          values = [];

      func(object, function(value) { values.push(value); return false; });
      strictEqual(values.length, 1);
    });
  });

  /*--------------------------------------------------------------------------*/

  QUnit.module('`__proto__` property bugs');

  (function() {
    test('internal data objects should work with the `__proto__` key', 4, function() {
      var stringLiteral = '__proto__',
          stringObject = Object(stringLiteral),
          expected = [stringLiteral, stringObject];

      var largeArray = _.times(largeArraySize, function(count) {
        return count % 2 ? stringObject : stringLiteral;
      });

      deepEqual(_.difference(largeArray, largeArray), []);
      deepEqual(_.intersection(largeArray, largeArray), expected);
      deepEqual(_.uniq(largeArray), expected);
      deepEqual(_.without.apply(_, [largeArray].concat(largeArray)), []);
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.functions');

  (function() {
    test('should return the function names of an object', 1, function() {
      var object = { 'a': 'a', 'b': _.identity, 'c': /x/, 'd': _.each };
      deepEqual(_.functions(object).sort(), ['b', 'd']);
    });

    test('should include inherited functions', 1, function() {
      function Foo() {
        this.a = _.identity;
        this.b = 'b'
      }
      Foo.prototype.c = _.noop;
      deepEqual(_.functions(new Foo).sort(), ['a', 'c']);
    });

    test('should be aliased', 1, function() {
      strictEqual(_.methods, _.functions);
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.groupBy');

  (function() {
    var array = [4.2, 6.1, 6.4];

    test('should use `_.identity` when no `callback` is provided', 1, function() {
      var actual = _.groupBy([4, 6, 6]);
      deepEqual(actual, { '4': [4], '6':  [6, 6] });
    });

    test('should pass the correct `callback` arguments', 1, function() {
      var args;

      _.groupBy(array, function() {
        args || (args = slice.call(arguments));
      });

      deepEqual(args, [4.2, 0, array]);
    });

    test('should support the `thisArg` argument', 1, function() {
      var actual = _.groupBy(array, function(num) {
        return this.floor(num);
      }, Math);

      deepEqual(actual, { '4': [4.2], '6': [6.1, 6.4] });
    });

    test('should only add values to own, not inherited, properties', 2, function() {
      var actual = _.groupBy([4.2, 6.1, 6.4], function(num) {
        return Math.floor(num) > 4 ? 'hasOwnProperty' : 'constructor';
      });

      deepEqual(actual.constructor, [4.2]);
      deepEqual(actual.hasOwnProperty, [6.1, 6.4]);
    });

    test('should work with an object for `collection`', 1, function() {
      var actual = _.groupBy({ 'a': 4.2, 'b': 6.1, 'c': 6.4 }, function(num) {
        return Math.floor(num);
      });

      deepEqual(actual, { '4': [4.2], '6': [6.1, 6.4] });
    });

    test('should work with a number for `callback`', 2, function() {
      var array = [
        [1, 'a'],
        [2, 'a'],
        [2, 'b']
      ];

      deepEqual(_.groupBy(array, 0), { '1': [[1 , 'a']], '2': [[2, 'a'], [2, 'b']] });
      deepEqual(_.groupBy(array, 1), { 'a': [[1 , 'a'], [2, 'a']], 'b': [[2, 'b']] });
    });

    test('should work with a string for `callback`', 1, function() {
      var actual = _.groupBy(['one', 'two', 'three'], 'length');
      deepEqual(actual, { '3': ['one', 'two'], '5': ['three'] });
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.has');

  (function() {
    test('should check for own properties', 2, function() {
      var object = { 'a': 1 };
      strictEqual(_.has(object, 'a'), true);
      strictEqual(_.has(object, 'b'), false);
    });

    test('should not use the `hasOwnProperty` method of the object', 1, function() {
      var object = { 'hasOwnProperty': null, 'a': 1 };
      strictEqual(_.has(object, 'a'), true);
    });

    test('should not check for inherited properties', 1, function() {
      function Foo() {}
      Foo.prototype.a = 1;
      strictEqual(_.has(new Foo, 'a'), false);
    });

    test('should work with functions', 1, function() {
      function Foo() {}
      strictEqual(_.has(Foo, 'prototype'), true);
    });

    test('should return `false` for primitives', 1, function() {
      var values = falsey.concat(1, 'a'),
          expected = _.map(values, _.constant(false));

      var actual = _.map(values, function(value) {
        return _.has(value, 'valueOf');
      });

      deepEqual(actual, expected);
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.identity');

  (function() {
    test('should return the first argument provided', 1, function() {
      var object = { 'name': 'fred' };
      strictEqual(_.identity(object), object);
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.indexBy');

  (function() {
    test('should use `_.identity` when no `callback` is provided', 1, function() {
      var actual = _.indexBy([4, 6, 6]);
      deepEqual(actual, { '4': 4, '6': 6 });
    });

    test('should support the `thisArg` argument', 1, function() {
      var actual = _.indexBy([4.2, 6.1, 6.4], function(num) {
        return this.floor(num);
      }, Math);

      deepEqual(actual, { '4': 4.2, '6': 6.4 });
    });

    test('should only add values to own, not inherited, properties', 2, function() {
      var actual = _.indexBy([4.2, 6.1, 6.4], function(num) {
        return Math.floor(num) > 4 ? 'hasOwnProperty' : 'constructor';
      });

      deepEqual(actual.constructor, 4.2);
      deepEqual(actual.hasOwnProperty, 6.4);
    });

    test('should work with an object for `collection`', 1, function() {
      var actual = _.indexBy({ 'a': 4.2, 'b': 6.1, 'c': 6.4 }, function(num) {
        return Math.floor(num);
      });

      deepEqual(actual, { '4': 4.2, '6': 6.4 });
    });

    test('should work with a number for `callback`', 2, function() {
      var array = [
        [1, 'a'],
        [2, 'a'],
        [2, 'b']
      ];

      deepEqual(_.indexBy(array, 0), { '1': [1 , 'a'], '2': [2, 'b'] });
      deepEqual(_.indexBy(array, 1), { 'a': [2, 'a'], 'b': [2, 'b'] });
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.indexOf');

  (function() {
    var array = [1, 2, 3, 1, 2, 3];

    test('should return the index of the first matched value', 1, function() {
      strictEqual(_.indexOf(array, 3), 2);
    });

    test('should return `-1` for an unmatched value', 4, function() {
      strictEqual(_.indexOf(array, 4), -1);
      strictEqual(_.indexOf(array, 4, true), -1);

      var empty = [];
      strictEqual(_.indexOf(empty, undefined), -1);
      strictEqual(_.indexOf(empty, undefined, true), -1);
    });

    test('should work with a positive `fromIndex`', 1, function() {
      strictEqual(_.indexOf(array, 1, 2), 3);
    });

    test('should work with `fromIndex` >= `array.length`', 12, function() {
      _.each([6, 8, Math.pow(2, 32), Infinity], function(fromIndex) {
        strictEqual(_.indexOf(array, 1, fromIndex), -1);
        strictEqual(_.indexOf(array, undefined, fromIndex), -1);
        strictEqual(_.indexOf(array, '', fromIndex), -1);
      });
    });

    test('should treat falsey `fromIndex` values as `0`', 1, function() {
      var expected = _.map(falsey, _.constant(0));

      var actual = _.map(falsey, function(fromIndex) {
        return _.indexOf(array, 1, fromIndex);
      });

      deepEqual(actual, expected);
    });

    test('should treat non-number `fromIndex` values as `0`', 1, function() {
      strictEqual(_.indexOf([1, 2, 3], 1, '1'), 0);
    });

    test('should work with a negative `fromIndex`', 1, function() {
      strictEqual(_.indexOf(array, 2, -3), 4);
    });

    test('should work with a negative `fromIndex` <= `-array.length`', 3, function() {
      _.each([-6, -8, -Infinity], function(fromIndex) {
        strictEqual(_.indexOf(array, 1, fromIndex), 0);
      });
    });

    test('should work with `isSorted`', 1, function() {
      strictEqual(_.indexOf([1, 2, 3], 1, true), 0);
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('custom `_.indexOf` methods');

  (function() {
    function Foo() {}

    function custom(array, value, fromIndex) {
      var index = (fromIndex || 0) - 1,
          length = array.length;

      while (++index < length) {
        var other = array[index];
        if (other === value || (value instanceof Foo && other instanceof Foo)) {
          return index;
        }
      }
      return -1;
    }

    var array = [1, new Foo, 3, new Foo],
        indexOf = _.indexOf;

    var largeArray = _.times(largeArraySize, function() {
      return new Foo;
    });

    test('`_.contains` should work with a custom `_.indexOf` method', 2, function() {
      if (!isModularize) {
        _.indexOf = custom;
        ok(_.contains(array, new Foo));
        ok(_.contains({ 'a': 1, 'b': new Foo, 'c': 3 }, new Foo));
        _.indexOf = indexOf;
      }
      else {
        skipTest(2);
      }
    });

    test('`_.difference` should work with a custom `_.indexOf` method', 2, function() {
      if (!isModularize) {
        _.indexOf = custom;
        deepEqual(_.difference(array, [new Foo]), [1, 3]);
        deepEqual(_.difference(array, largeArray), [1, 3]);
        _.indexOf = indexOf;
      }
      else {
        skipTest(2);
      }
    });

    test('`_.intersection` should work with a custom `_.indexOf` method', 2, function() {
      if (!isModularize) {
        _.indexOf = custom;
        deepEqual(_.intersection(array, [new Foo]), [array[1]]);
        deepEqual(_.intersection(largeArray, [new Foo]), [array[1]]);
        _.indexOf = indexOf;
      }
      else {
        skipTest(2);
      }
    });

    test('`_.uniq` should work with a custom `_.indexOf` method', 2, function() {
      if (!isModularize) {
        _.indexOf = custom;
        deepEqual(_.uniq(array), array.slice(0, 3));
        deepEqual(_.uniq(largeArray), [largeArray[0]]);
        _.indexOf = indexOf;
      }
      else {
        skipTest(2);
      }
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.initial');

  (function() {
    var array = [1, 2, 3];

    test('should accept a falsey `array` argument', 1, function() {
      var expected = _.map(falsey, _.constant([]));

      var actual = _.map(falsey, function(value, index) {
        try {
          return index ? _.initial(value) : _.initial();
        } catch(e) { }
      });

      deepEqual(actual, expected);
    });

    test('should exclude last element', 1, function() {
      deepEqual(_.initial(array), [1, 2]);
    });

    test('should return an empty when querying empty arrays', 1, function() {
      deepEqual(_.initial([]), []);
    });

    test('should work when used as a callback for `_.map`', 1, function() {
      var array = [[1, 2, 3], [4, 5, 6], [7, 8, 9]],
          actual = _.map(array, _.initial);

      deepEqual(actual, [[1, 2], [4, 5], [7, 8]]);
    });

    test('should return a wrapped value when chaining', 2, function() {
      if (!isNpm) {
        var actual = _(array).initial();
        ok(actual instanceof _);
        deepEqual(actual.value(), [1, 2]);
      }
      else {
        skipTest(2);
      }
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.intersection');

  (function() {
    var args = arguments;

    test('should return the intersection of the given arrays', 1, function() {
      var actual = _.intersection([1, 3, 2], [5, 2, 1, 4], [2, 1]);
      deepEqual(actual, [1, 2]);
    });

    test('should return an array of unique values', 2, function() {
      var array = [1, 1, 3, 2, 2];
      deepEqual(_.intersection(array, [5, 2, 2, 1, 4], [2, 1, 1]), [1, 2]);
      deepEqual(_.intersection(array), [1, 3, 2]);
    });

    test('should work with large arrays of objects', 1, function() {
      var object = {},
          largeArray = _.times(largeArraySize, _.constant(object));

      deepEqual(_.intersection([object], largeArray), [object]);
    });

    test('should work with large arrays of objects', 2, function() {
      var object = {},
          largeArray = _.times(largeArraySize, _.constant(object));

      deepEqual(_.intersection([object], largeArray), [object]);
      deepEqual(_.intersection(_.range(largeArraySize), null, [1]), [1]);
    });

    test('should ignore values that are not arrays or `arguments` objects', 3, function() {
      var array = [0, 1, null, 3];
      deepEqual(_.intersection(array, 3, null, { '0': 1 }), array);
      deepEqual(_.intersection(null, array, null, [2, 1]), [1]);
      deepEqual(_.intersection(null, array, null, args), [1, 3]);
    });

    test('should return a wrapped value when chaining', 2, function() {
      if (!isNpm) {
        var actual = _([1, 3, 2]).intersection([5, 2, 1, 4]);
        ok(actual instanceof _);
        deepEqual(actual.value(), [1, 2]);
      }
      else {
        skipTest(2);
      }
    });
  }(1, 2, 3));

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.invert');

  (function() {
    test('should invert an object', 2, function() {
      var object = { 'a': 1, 'b': 2 },
          actual = _.invert(object);

      deepEqual(actual, { '1': 'a', '2': 'b' });
      deepEqual(_.invert(actual), { 'a': '1', 'b': '2' });
    });

    test('should work with an object that has a `length` property', 1, function() {
      var object = { '0': 'a', '1': 'b', 'length': 2 };
      deepEqual(_.invert(object), { 'a': '0', 'b': '1', '2': 'length' });
    });

    test('should accept a `multiValue` flag', 1, function() {
      var object = { 'a': 1, 'b': 2, 'c': 1 };
      deepEqual(_.invert(object, true), { '1': ['a', 'c'], '2': ['b'] });
    });

    test('should only add multiple values to own, not inherited, properties', 2, function() {
      var object = { 'a': 'hasOwnProperty', 'b': 'constructor' };
      deepEqual(_.invert(object), { 'hasOwnProperty': 'a', 'constructor': 'b' });
      ok(_.isEqual(_.invert(object, true), { 'hasOwnProperty': ['a'], 'constructor': ['b'] }));
    });

    test('should return a wrapped value when chaining', 2, function() {
      if (!isNpm) {
        var object = { 'a': 1, 'b': 2 },
            actual = _(object).invert();

        ok(actual instanceof _);
        deepEqual(actual.value(), { '1': 'a', '2': 'b' });
      }
      else {
        skipTest(2);
      }
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.invoke');

  (function() {
    test('should invoke a methods on each element of a collection', 1, function() {
      var array = ['a', 'b', 'c'];
      deepEqual( _.invoke(array, 'toUpperCase'), ['A', 'B', 'C']);
    });

    test('should work with a function `methodName` argument', 1, function() {
      var actual = _.invoke(['a', 'b', 'c'], function() {
        return this.toUpperCase();
      });

      deepEqual(actual, ['A', 'B', 'C']);
    });

    test('should work with an object for `collection`', 1, function() {
      var object = { 'a': 1, 'b': 2, 'c': 3 };
      deepEqual(_.invoke(object, 'toFixed', 1), ['1.0', '2.0', '3.0']);
    });

    test('should treat number values for `collection` as empty', 1, function() {
      deepEqual(_.invoke(1), []);
    });

    test('should work with nullish elements', 1, function() {
      var array = ['a', null, undefined, 'd'];
      deepEqual(_.invoke(array, 'toUpperCase'), ['A', undefined, undefined, 'D']);
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.isArguments');

  (function() {
    var args = arguments;

    test('should return `true` for `arguments` objects', 1, function() {
      strictEqual(_.isArguments(args), true);
    });

    test('should return `false` for non `arguments` objects', 10, function() {
      var expected = _.map(falsey, _.constant(false));

      var actual = _.map(falsey, function(value, index) {
        return index ? _.isArguments(value) : _.isArguments();
      });

      strictEqual(_.isArguments([1, 2, 3]), false);
      strictEqual(_.isArguments(true), false);
      strictEqual(_.isArguments(new Date), false);
      strictEqual(_.isArguments(new Error), false);
      strictEqual(_.isArguments(_), false);
      strictEqual(_.isArguments({ '0': 1, 'callee': _.noop, 'length': 1 }), false);
      strictEqual(_.isArguments(1), false);
      strictEqual(_.isArguments(/x/), false);
      strictEqual(_.isArguments('a'), false);

      deepEqual(actual, expected);
    });

    test('should work with `arguments` objects from another realm', 1, function() {
      if (_._object) {
        strictEqual(_.isArguments(_._arguments), true);
      }
      else {
        skipTest();
      }
    });
  }(1, 2, 3));

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.isArray');

  (function() {
    var args = arguments;

    test('should return `true` for arrays', 1, function() {
      strictEqual(_.isArray([1, 2, 3]), true);
    });

    test('should return `false` for non arrays', 10, function() {
      var expected = _.map(falsey, _.constant(false));

      var actual = _.map(falsey, function(value, index) {
        return index ? _.isArray(value) : _.isArray();
      });

      strictEqual(_.isArray(args), false);
      strictEqual(_.isArray(true), false);
      strictEqual(_.isArray(new Date), false);
      strictEqual(_.isArray(new Error), false);
      strictEqual(_.isArray(_), false);
      strictEqual(_.isArray({ '0': 1, 'length': 1 }), false);
      strictEqual(_.isArray(1), false);
      strictEqual(_.isArray(/x/), false);
      strictEqual(_.isArray('a'), false);

      deepEqual(actual, expected);
    });

    test('should work with arrays from another realm', 1, function() {
      if (_._object) {
        strictEqual(_.isArray(_._array), true);
      }
      else {
        skipTest();
      }
    });
  }(1, 2, 3));

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.isBoolean');

  (function() {
    var args = arguments;

    test('should return `true` for booleans', 4, function() {
      strictEqual(_.isBoolean(true), true);
      strictEqual(_.isBoolean(false), true);
      strictEqual(_.isBoolean(Object(true)), true);
      strictEqual(_.isBoolean(Object(false)), true);
    });

    test('should return `false` for non booleans', 10, function() {
      var expected = _.map(falsey, function(value) { return value === false; });

      var actual = _.map(falsey, function(value, index) {
        return index ? _.isBoolean(value) : _.isBoolean();
      });

      strictEqual(_.isBoolean(args), false);
      strictEqual(_.isBoolean([1, 2, 3]), false);
      strictEqual(_.isBoolean(new Date), false);
      strictEqual(_.isBoolean(new Error), false);
      strictEqual(_.isBoolean(_), false);
      strictEqual(_.isBoolean({ 'a': 1 }), false);
      strictEqual(_.isBoolean(1), false);
      strictEqual(_.isBoolean(/x/), false);
      strictEqual(_.isBoolean('a'), false);

      deepEqual(actual, expected);
    });

    test('should work with booleans from another realm', 1, function() {
      if (_._object) {
        strictEqual(_.isBoolean(_._boolean), true);
      }
      else {
        skipTest();
      }
    });
  }(1, 2, 3));

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.isDate');

  (function() {
    var args = arguments;

    test('should return `true` for dates', 1, function() {
      strictEqual(_.isDate(new Date), true);
    });

    test('should return `false` for non dates', 10, function() {
      var expected = _.map(falsey, _.constant(false));

      var actual = _.map(falsey, function(value, index) {
        return index ? _.isDate(value) : _.isDate();
      });

      strictEqual(_.isDate(args), false);
      strictEqual(_.isDate([1, 2, 3]), false);
      strictEqual(_.isDate(true), false);
      strictEqual(_.isDate(new Error), false);
      strictEqual(_.isDate(_), false);
      strictEqual(_.isDate({ 'a': 1 }), false);
      strictEqual(_.isDate(1), false);
      strictEqual(_.isDate(/x/), false);
      strictEqual(_.isDate('a'), false);

      deepEqual(actual, expected);
    });

    test('should work with dates from another realm', 1, function() {
      if (_._object) {
        strictEqual(_.isDate(_._date), true);
      }
      else {
        skipTest();
      }
    });
  }(1, 2, 3));

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.isElement');

  (function() {
    var args = arguments;

    function Element() {
      this.nodeType = 1;
    }

    test('should use robust check', 7, function() {
      var element = body || new Element;

      strictEqual(_.isElement(element), true);
      strictEqual(_.isElement({ 'nodeType': 1 }), false);
      strictEqual(_.isElement({ 'nodeType': Object(1) }), false);
      strictEqual(_.isElement({ 'nodeType': true }), false);
      strictEqual(_.isElement({ 'nodeType': [1] }), false);
      strictEqual(_.isElement({ 'nodeType': '1' }), false);
      strictEqual(_.isElement({ 'nodeType': '001' }), false);
    });

    test('should use a stronger check in browsers', 2, function() {
      var expected = !body;
      strictEqual(_.isElement(new Element), expected);

      if (lodashBizarro) {
        strictEqual(lodashBizarro.isElement(new Element), !expected);
      }
      else {
        skipTest();
      }
    });

    test('should return `false` for non DOM elements', 11, function() {
      var expected = _.map(falsey, _.constant(false));

      var actual = _.map(falsey, function(value, index) {
        return index ? _.isElement(value) : _.isElement();
      });

      strictEqual(_.isElement(args), false);
      strictEqual(_.isElement([1, 2, 3]), false);
      strictEqual(_.isElement(true), false);
      strictEqual(_.isElement(new Date), false);
      strictEqual(_.isElement(new Error), false);
      strictEqual(_.isElement(_), false);
      strictEqual(_.isElement({ 'a': 1 }), false);
      strictEqual(_.isElement(1), false);
      strictEqual(_.isElement(/x/), false);
      strictEqual(_.isElement('a'), false);

      deepEqual(actual, expected);
    });

    test('should work with DOM elements from another realm', 1, function() {
      if (_._element) {
        strictEqual(_.isElement(_._element), true);
      }
      else {
        skipTest();
      }
    });
  }(1, 2, 3));

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.isEmpty');

  (function() {
    var args = arguments;

    test('should return `true` for empty or falsey values', 3, function() {
      var expected = _.map(empties, _.constant(true));

      var actual = _.map(empties, function(value) {
        return _.isEmpty(value);
      });

      strictEqual(_.isEmpty(), true);
      strictEqual(_.isEmpty(/x/), true);
      deepEqual(actual, expected);
    });

    test('should return `false` for non-empty values', 3, function() {
      strictEqual(_.isEmpty([0]), false);
      strictEqual(_.isEmpty({ 'a': 0 }), false);
      strictEqual(_.isEmpty('a'), false);
    });

    test('should work with an object that has a `length` property', 1, function() {
      strictEqual(_.isEmpty({ 'length': 0 }), false);
    });

    test('should work with `arguments` objects (test in IE < 9)', 1, function() {
      strictEqual(_.isEmpty(args), false);
    });

    test('should work with jQuery/MooTools DOM query collections', 1, function() {
      function Foo(elements) { push.apply(this, elements); }
      Foo.prototype = { 'length': 0, 'splice': Array.prototype.splice };

      strictEqual(_.isEmpty(new Foo([])), true);
    });

    test('should not treat objects with negative lengths as array-like', 1, function() {
      function Foo() {}
      Foo.prototype.length = -1;

      strictEqual(_.isEmpty(new Foo), true);
    });

    test('should not treat objects with lengths larger than `maxSafeInteger` as array-like', 1, function() {
      function Foo() {}
      Foo.prototype.length = maxSafeInteger + 1;

      strictEqual(_.isEmpty(new Foo), true);
    });

    test('should not treat objects with non-number lengths as array-like', 1, function() {
      strictEqual(_.isEmpty({ 'length': '0' }), false);
    });

    test('fixes the JScript `[[DontEnum]]` bug (test in IE < 9)', 1, function() {
      strictEqual(_.isEmpty(shadowedObject), false);
    });

    test('skips the prototype property of functions (test in Firefox < 3.6, Opera > 9.50 - Opera < 11.60, and Safari < 5.1)', 2, function() {
      function Foo() {}
      Foo.prototype.a = 1;

      strictEqual(_.isEmpty(Foo), true);

      Foo.prototype = { 'a': 1 };
      strictEqual(_.isEmpty(Foo), true);
    });

    test('should return an unwrapped value when intuitively chaining', 1, function() {
      if (!isNpm) {
        strictEqual(_({}).isEmpty(), true);
      }
      else {
        skipTest();
      }
    });

    test('should return a wrapped value when explicitly chaining', 1, function() {
      if (!isNpm) {
        ok(_({}).chain().isEmpty() instanceof _);
      }
      else {
        skipTest();
      }
    });
  }(1, 2, 3));

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.isEqual');

  (function() {
    test('should perform comparisons between primitive values', 1, function() {
      var pairs = [
        [1, 1, true], [1, Object(1), true], [1, '1', false], [1, 2, false],
        [-0, -0, true], [0, 0, true], [0, Object(0), true], [Object(0), Object(0), true], [-0, 0, false], [0, '0', false], [0, null, false],
        [NaN, NaN, true], [NaN, Object(NaN), true], [Object(NaN), Object(NaN), true], [NaN, 'a', false], [NaN, Infinity, false],
        ['a', 'a', true], ['a', Object('a'), true], [Object('a'), Object('a'), true], ['a', 'b', false], ['a', ['a'], false],
        [true, true, true], [true, Object(true), true], [Object(true), Object(true), true], [true, 1, false], [true, 'a', false],
        [false, false, true], [false, Object(false), true], [Object(false), Object(false), true], [false, 0, false], [false, '', false],
        [null, null, true], [null, undefined, false], [null, {}, false], [null, '', false],
        [undefined, undefined, true], [undefined, null, false], [undefined, '', false]
      ];

      var expected = _.map(pairs, function(pair) {
        return pair[2];
      });

      var actual = _.map(pairs, function(pair) {
        return _.isEqual(pair[0], pair[1]);
      });

      deepEqual(actual, expected);
    });

    test('should perform comparisons between arrays', 6, function() {
      var array1 = [true, null, 1, 'a', undefined],
          array2 = [true, null, 1, 'a', undefined];

      strictEqual(_.isEqual(array1, array2), true);

      array1 = [[1, 2, 3], new Date(2012, 4, 23), /x/, { 'e': 1 }];
      array2 = [[1, 2, 3], new Date(2012, 4, 23), /x/, { 'e': 1 }];

      strictEqual(_.isEqual(array1, array2), true);

      array1 = [1];
      array1[2] = 3;

      array2 = [1];
      array2[1] = undefined;
      array2[2] = 3;

      strictEqual(_.isEqual(array1, array2), true);

      array1 = [Object(1), false, Object('a'), /x/, new Date(2012, 4, 23), ['a', 'b', [Object('c')]], { 'a': 1 }];
      array2 = [1, Object(false), 'a', /x/, new Date(2012, 4, 23), ['a', Object('b'), ['c']], { 'a': 1 }];

      strictEqual(_.isEqual(array1, array2), true);

      array1 = [1, 2, 3];
      array2 = [3, 2, 1];

      strictEqual(_.isEqual(array1, array2), false);

      array1 = [1, 2];
      array2 = [1, 2, 3];

      strictEqual(_.isEqual(array1, array2), false);
    });

    test('should treat arrays with identical values but different non-numeric properties as equal', 3, function() {
      var array1 = [1, 2, 3],
          array2 = [1, 2, 3];

      array1.every = array1.filter = array1.forEach = array1.indexOf = array1.lastIndexOf = array1.map = array1.some = array1.reduce = array1.reduceRight = null;
      array2.concat = array2.join = array2.pop = array2.reverse = array2.shift = array2.slice = array2.sort = array2.splice = array2.unshift = null;

      strictEqual(_.isEqual(array1, array2), true);

      array1 = [1, 2, 3];
      array1.a = 1;

      array2 = [1, 2, 3];
      array2.b = 1;

      strictEqual(_.isEqual(array1, array2), true);

      array1 = /x/.exec('vwxyz');
      array2 = ['x'];

      strictEqual(_.isEqual(array1, array2), true);
    });

    test('should work with sparse arrays', 3, function() {
      var array = Array(1);

      strictEqual(_.isEqual(array, Array(1)), true);
      strictEqual(_.isEqual(array, [undefined]), true);
      strictEqual(_.isEqual(array, Array(2)), false);
    });

    test('should perform comparisons between plain objects', 5, function() {
      var object1 = { 'a': true, 'b': null, 'c': 1, 'd': 'a', 'e': undefined },
          object2 = { 'a': true, 'b': null, 'c': 1, 'd': 'a', 'e': undefined };

      strictEqual(_.isEqual(object1, object2), true);

      object1 = { 'a': [1, 2, 3], 'b': new Date(2012, 4, 23), 'c': /x/, 'd': { 'e': 1 } };
      object2 = { 'a': [1, 2, 3], 'b': new Date(2012, 4, 23), 'c': /x/, 'd': { 'e': 1 } };

      strictEqual(_.isEqual(object1, object2), true);

      object1 = { 'a': 1, 'b': 2, 'c': 3 };
      object2 = { 'a': 3, 'b': 2, 'c': 1 };

      strictEqual(_.isEqual(object1, object2), false);

      object1 = { 'a': 1, 'b': 2, 'c': 3 };
      object2 = { 'd': 1, 'e': 2, 'f': 3 };

      strictEqual(_.isEqual(object1, object2), false);

      object1 = { 'a': 1, 'b': 2 };
      object2 = { 'a': 1, 'b': 2, 'c': 3 };

      strictEqual(_.isEqual(object1, object2), false);
    });

    test('should perform comparisons of nested objects', 1, function() {
      var object1 = {
        'a': [1, 2, 3],
        'b': true,
        'c': Object(1),
        'd': 'a',
        'e': {
          'f': ['a', Object('b'), 'c'],
          'g': Object(false),
          'h': new Date(2012, 4, 23),
          'i': _.noop,
          'j': 'a'
        }
      };

      var object2 = {
        'a': [1, Object(2), 3],
        'b': Object(true),
        'c': 1,
        'd': Object('a'),
        'e': {
          'f': ['a', 'b', 'c'],
          'g': false,
          'h': new Date(2012, 4, 23),
          'i': _.noop,
          'j': 'a'
        }
      };

      strictEqual(_.isEqual(object1, object2), true);
    });

    test('should perform comparisons between object instances', 4, function() {
      function Foo() { this.value = 1; }
      Foo.prototype.value = 1;

      function Bar() {
        this.value = 1;
      }
      Bar.prototype.value = 2;

      strictEqual(_.isEqual(new Foo, new Foo), true);
      strictEqual(_.isEqual(new Foo, new Bar), false);
      strictEqual(_.isEqual({ 'value': 1 }, new Foo), false);
      strictEqual(_.isEqual({ 'value': 2 }, new Bar), false);
    });

    test('should perform comparisons between objects with constructor properties', 5, function() {
      strictEqual(_.isEqual({ 'constructor': 1 },   { 'constructor': 1 }), true);
      strictEqual(_.isEqual({ 'constructor': 1 },   { 'constructor': '1' }), false);
      strictEqual(_.isEqual({ 'constructor': [1] }, { 'constructor': [1] }), true);
      strictEqual(_.isEqual({ 'constructor': [1] }, { 'constructor': ['1'] }), false);
      strictEqual(_.isEqual({ 'constructor': Object }, {}), false);
    });

    test('should perform comparisons between arrays with circular references', 4, function() {
      var array1 = [],
          array2 = [];

      array1.push(array1);
      array2.push(array2);

      strictEqual(_.isEqual(array1, array2), true);

      array1.push('a');
      array2.push('a');

      strictEqual(_.isEqual(array1, array2), true);

      array1.push('b');
      array2.push('c');

      strictEqual(_.isEqual(array1, array2), false);

      array1 = ['a', 'b', 'c'];
      array1[1] = array1;
      array2 = ['a', ['a', 'b', 'c'], 'c'];

      strictEqual(_.isEqual(array1, array2), false);
    });

    test('should perform comparisons between objects with circular references', 4, function() {
      var object1 = {},
          object2 = {};

      object1.a = object1;
      object2.a = object2;

      strictEqual(_.isEqual(object1, object2), true);

      object1.b = 0;
      object2.b = Object(0);

      strictEqual(_.isEqual(object1, object2), true);

      object1.c = Object(1);
      object2.c = Object(2);

      strictEqual(_.isEqual(object1, object2), false);

      object1 = { 'a': 1, 'b': 2, 'c': 3 };
      object1.b = object1;
      object2 = { 'a': 1, 'b': { 'a': 1, 'b': 2, 'c': 3 }, 'c': 3 };

      strictEqual(_.isEqual(object1, object2), false);
    });

    test('should perform comparisons between objects with multiple circular references', 3, function() {
      var array1 = [{}],
          array2 = [{}];

      (array1[0].a = array1).push(array1);
      (array2[0].a = array2).push(array2);

      strictEqual(_.isEqual(array1, array2), true);

      array1[0].b = 0;
      array2[0].b = Object(0);

      strictEqual(_.isEqual(array1, array2), true);

      array1[0].c = Object(1);
      array2[0].c = Object(2);

      strictEqual(_.isEqual(array1, array2), false);
    });

    test('should perform comparisons between objects with complex circular references', 1, function() {
      var object1 = {
        'foo': { 'b': { 'foo': { 'c': { } } } },
        'bar': { 'a': 2 }
      };

      var object2 = {
        'foo': { 'b': { 'foo': { 'c': { } } } },
        'bar': { 'a': 2 }
      };

      object1.foo.b.foo.c = object1;
      object1.bar.b = object1.foo.b;

      object2.foo.b.foo.c = object2;
      object2.bar.b = object2.foo.b;

      strictEqual(_.isEqual(object1, object2), true);
    });

    test('should perform comparisons between objects with shared property values', 1, function() {
      var object1 = {
        'a': [1, 2]
      };

      var object2 = {
        'a': [1, 2],
        'b': [1, 2]
      };

      object1.b = object1.a;

      strictEqual(_.isEqual(object1, object2), true);
    });

    test('should work with `arguments` objects (test in IE < 9)', 2, function() {
      var args1 = (function() { return arguments; }(1, 2, 3)),
          args2 = (function() { return arguments; }(1, 2, 3)),
          args3 = (function() { return arguments; }(1, 2));

      strictEqual(_.isEqual(args1, args2), true);

      if (!isPhantom) {
        strictEqual(_.isEqual(args1, args3), false);
      }
      else {
        skipTest();
      }
    });

    test('should treat `arguments` objects like `Object` objects', 4, function() {
      var args = (function() { return arguments; }(1, 2, 3)),
          object = { '0': 1, '1': 2, '2': 3, 'length': 3 };

      function Foo() {}
      Foo.prototype = object;

      strictEqual(_.isEqual(args, object), true);
      strictEqual(_.isEqual(object, args), true);

      if (!isPhantom) {
        strictEqual(_.isEqual(args, new Foo), false);
        strictEqual(_.isEqual(new Foo, args), false);
      }
      else {
        skipTest(2);
      }
    });

    test('should perform comparisons between date objects', 4, function() {
      strictEqual(_.isEqual(new Date(2012, 4, 23), new Date(2012, 4, 23)), true);
      strictEqual(_.isEqual(new Date(2012, 4, 23), new Date(2013, 3, 25)), false);
      strictEqual(_.isEqual(new Date(2012, 4, 23), { 'getTime': function() { return 1337756400000; } }), false);
      strictEqual(_.isEqual(new Date('a'), new Date('a')), false);
    });

    test('should perform comparisons between error objects', 1, function() {
      var pairs = _.map(errorTypes, function(type, index) {
        var otherType = errorTypes[++index % errorTypes.length],
            CtorA = root[type],
            CtorB = root[otherType];

        return [new CtorA('a'), new CtorA('a'), new CtorB('a'), new CtorB('b')];
      });

      var expected = _.times(pairs.length, _.constant([true, false, false]));

      var actual = _.map(pairs, function(pair) {
        return [_.isEqual(pair[0], pair[1]), _.isEqual(pair[0], pair[2]), _.isEqual(pair[2], pair[3])];
      });

      deepEqual(actual, expected);
    });

    test('should perform comparisons between functions', 2, function() {
      function a() { return 1 + 2; }
      function b() { return 1 + 2; }

      strictEqual(_.isEqual(a, a), true);
      strictEqual(_.isEqual(a, b), false);
    });

    test('should perform comparisons between regexes', 5, function() {
      strictEqual(_.isEqual(/x/gim, /x/gim), true);
      strictEqual(_.isEqual(/x/gim, /x/mgi), true);
      strictEqual(_.isEqual(/x/gi, /x/g), false);
      strictEqual(_.isEqual(/x/, /y/), false);
      strictEqual(_.isEqual(/x/g, { 'global': true, 'ignoreCase': false, 'multiline': false, 'source': 'x' }), false);
    });

    test('should perform comparisons between typed arrays', 1, function() {
      var pairs = _.map(typedArrays, function(type, index) {
        var otherType = typedArrays[++index % typedArrays.length],
            CtorA = root[type] || function(n) { this.n = n; },
            CtorB = root[otherType] || function(n) { this.n = n; },
            bufferA = root[type] ? new ArrayBuffer(8) : 8,
            bufferB = root[otherType] ? new ArrayBuffer(8) : 8,
            bufferC = root[otherType] ? new ArrayBuffer(16) : 16;

        return [new CtorA(bufferA), new CtorA(bufferA), new CtorB(bufferB), new CtorB(bufferC)];
      });

      var expected = _.times(pairs.length, _.constant([true, false, false]));

      var actual = _.map(pairs, function(pair) {
        return [_.isEqual(pair[0], pair[1]), _.isEqual(pair[0], pair[2]), _.isEqual(pair[2], pair[3])];
      });

      deepEqual(actual, expected);
    });

    test('should avoid common type coercions', 9, function() {
      strictEqual(_.isEqual(true, Object(false)), false);
      strictEqual(_.isEqual(Object(false), Object(0)), false);
      strictEqual(_.isEqual(false, Object('')), false);
      strictEqual(_.isEqual(Object(36), Object('36')), false);
      strictEqual(_.isEqual(0, ''), false);
      strictEqual(_.isEqual(1, true), false);
      strictEqual(_.isEqual(1337756400000, new Date(2012, 4, 23)), false);
      strictEqual(_.isEqual('36', 36), false);
      strictEqual(_.isEqual(36, '36'), false);
    });

    test('fixes the JScript `[[DontEnum]]` bug (test in IE < 9)', 1, function() {
      strictEqual(_.isEqual(shadowedObject, {}), false);
    });

    test('should return `false` for objects with custom `toString` methods', 1, function() {
      var primitive,
          object = { 'toString': function() { return primitive; } },
          values = [true, null, 1, 'a', undefined],
          expected = _.map(values, _.constant(false));

      var actual = _.map(values, function(value) {
        primitive = value;
        return _.isEqual(object, value);
      });

      deepEqual(actual, expected);
    });

    test('should pass the correct `callback` arguments', 1, function() {
      var argsList = [];

      var object1 = {
        'a': [1, 2],
        'b': null
      };

      var object2 = {
        'a': [1, 2],
        'b': null
      };

      object1.b = object2;
      object2.b = object1;

      var expected = [
        [object1, object2],
        [object1.a, object2.a, 'a'],
        [object1.a[0], object2.a[0], 0],
        [object1.a[1], object2.a[1], 1],
        [object1.b, object2.b, 'b'],
        [object1.b.a, object2.b.a, 'a'],
        [object1.b.a[0], object2.b.a[0], 0],
        [object1.b.a[1], object2.b.a[1], 1],
        [object1.b.b, object2.b.b, 'b']
      ];

      _.isEqual(object1, object2, function() {
        argsList.push(slice.call(arguments));
      });

      deepEqual(argsList, expected);
    });

    test('should correctly set the `this` binding', 1, function() {
      var actual = _.isEqual('a', 'b', function(a, b) {
        return this[a] == this[b];
      }, { 'a': 1, 'b': 1 });

      strictEqual(actual, true);
    });

    test('should handle comparisons if `callback` returns `undefined`', 1, function() {
      var actual = _.isEqual('a', 'a', _.noop);
      strictEqual(actual, true);
    });

    test('should return a boolean value even if `callback` does not', 2, function() {
      var actual = _.isEqual('a', 'a', function() { return 'a'; });
      strictEqual(actual, true);

      var expected = _.map(falsey, _.constant(false));
      actual = [];

      _.each(falsey, function(value) {
        actual.push(_.isEqual('a', 'b', _.constant(value)));
      });

      deepEqual(actual, expected);
    });

    test('should ensure `callback` is a function', 1, function() {
      var array = [1, 2, 3],
          eq = _.partial(_.isEqual, array),
          actual = _.every([array, [1, 0, 3]], eq);

      strictEqual(actual, false);
    });

    test('should work when used as a callback for `_.every`', 1, function() {
      var actual = _.every([1, 1, 1], _.partial(_.isEqual, 1));
      ok(actual);
    });

    test('should treat objects created by `Object.create(null)` like any other plain object', 2, function() {
      function Foo() { this.a = 1; }
      Foo.prototype.constructor = null;

      var otherObject = { 'a': 1 };
      strictEqual(_.isEqual(new Foo, otherObject), false);

      if (create)  {
        var object = create(null);
        object.a = 1;
        strictEqual(_.isEqual(object, otherObject), true);
      }
      else {
        skipTest();
      }
    });

    test('should return `true` for like-objects from different documents', 1, function() {
      // ensure `_._object` is assigned (unassigned in Opera 10.00)
      if (_._object) {
        var object = { 'a': 1, 'b': 2, 'c': 3 };
        strictEqual(_.isEqual(object, _._object), true);
      }
      else {
        skipTest();
      }
    });

    test('should not error on DOM elements', 1, function() {
      if (document) {
        var element1 = document.createElement('div'),
            element2 = element1.cloneNode(true);

        try {
          strictEqual(_.isEqual(element1, element2), false);
        } catch(e) {
          ok(false);
        }
      }
      else {
        skipTest();
      }
    });

    test('should perform comparisons between wrapped values', 4, function() {
      if (!isNpm) {
        var object1 = _({ 'a': 1, 'b': 2 }),
            object2 = _({ 'a': 1, 'b': 2 }),
            actual = object1.isEqual(object2);

        strictEqual(actual, true);
        strictEqual(_.isEqual(_(actual), _(true)), true);

        object1 = _({ 'a': 1, 'b': 2 });
        object2 = _({ 'a': 1, 'b': 1 });

        actual = object1.isEqual(object2);
        strictEqual(actual, false);
        strictEqual(_.isEqual(_(actual), _(false)), true);
      }
      else {
        skipTest(4);
      }
    });

    test('should perform comparisons between wrapped and non-wrapped values', 4, function() {
      if (!isNpm) {
        var object1 = _({ 'a': 1, 'b': 2 }),
            object2 = { 'a': 1, 'b': 2 };

        strictEqual(object1.isEqual(object2), true);
        strictEqual(_.isEqual(object1, object2), true);

        object1 = _({ 'a': 1, 'b': 2 });
        object2 = { 'a': 1, 'b': 1 };

        strictEqual(object1.isEqual(object2), false);
        strictEqual(_.isEqual(object1, object2), false);
      }
      else {
        skipTest(4);
      }
    });

    test('should return an unwrapped value when intuitively chaining', 1, function() {
      if (!isNpm) {
        strictEqual(_('a').isEqual('a'), true);
      }
      else {
        skipTest();
      }
    });

    test('should return a wrapped value when explicitly chaining', 1, function() {
      if (!isNpm) {
        ok(_('a').chain().isEqual('a') instanceof _);
      }
      else {
        skipTest();
      }
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.isError');

  (function() {
    var args = arguments;

    test('should return `true` for error objects', 1, function() {
      var errors = [new Error, new EvalError, new RangeError, new ReferenceError, new SyntaxError, new TypeError, new URIError],
          expected = _.map(errors, _.constant(true));

      var actual = _.map(errors, function(error) {
        return _.isError(error) === true;
      });

      deepEqual(actual, expected);
    });

    test('should return `false` for non-error objects', 10, function() {
      var expected = _.map(falsey, _.constant(false));

      var actual = _.map(falsey, function(value, index) {
        return index ? _.isError(value) : _.isError();
      });

      strictEqual(_.isError(args), false);
      strictEqual(_.isError([1, 2, 3]), false);
      strictEqual(_.isError(true), false);
      strictEqual(_.isError(new Date), false);
      strictEqual(_.isError(_), false);
      strictEqual(_.isError({ 'a': 1 }), false);
      strictEqual(_.isError(1), false);
      strictEqual(_.isError(/x/), false);
      strictEqual(_.isError('a'), false);

      deepEqual(actual, expected);
    });

    test('should work with an error object from another realm', 1, function() {
      if (_._object) {
        var expected = _.map(_._errors, _.constant(true));

        var actual = _.map(_._errors, function(error) {
          return _.isError(error) === true;
        });

        deepEqual(actual, expected);
      }
      else {
        skipTest();
      }
    });
  }(1, 2, 3));

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.isFinite');

  (function() {
    test('should return `true` for finite values', 1, function() {
      var values = [0, 1, 3.14, -1],
          expected = _.map(values, _.constant(true));

      var actual = _.map(values, function(value) {
        return _.isFinite(value);
      });

      deepEqual(actual, expected);
    });

    test('should return `false` for non-finite values', 1, function() {
      var values = [NaN, Infinity, -Infinity, Object(1)],
          expected = _.map(values, _.constant(false));

      var actual = _.map(values, function(value) {
        return _.isFinite(value);
      });

      deepEqual(actual, expected);
    });

    test('should return `false` for non-numeric values', 1, function() {
      var values = [undefined, [], true, new Date, new Error, '', ' ', '2px'],
          expected = _.map(values, _.constant(false));

      var actual = _.map(values, function(value) {
        return _.isFinite(value);
      });

      deepEqual(actual, expected);
    });

    test('should return `false` for numeric string values', 1, function() {
      var values = ['2', '0', '08'],
          expected = _.map(values, _.constant(false));

      var actual = _.map(values, function(value) {
        return _.isFinite(value);
      });

      deepEqual(actual, expected);
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.isFunction');

  (function() {
    var args = arguments;

    test('should return `true` for functions', 1, function() {
      strictEqual(_.isFunction(_), true);
    });

    test('should return `false` for non functions', 10, function() {
      var expected = _.map(falsey, _.constant(false));

      var actual = _.map(falsey, function(value, index) {
        return index ? _.isFunction(value) : _.isFunction();
      });

      strictEqual(_.isFunction(args), false);
      strictEqual(_.isFunction([1, 2, 3]), false);
      strictEqual(_.isFunction(true), false);
      strictEqual(_.isFunction(new Date), false);
      strictEqual(_.isFunction(new Error), false);
      strictEqual(_.isFunction({ 'a': 1 }), false);
      strictEqual(_.isFunction(1), false);
      strictEqual(_.isFunction(/x/), false);
      strictEqual(_.isFunction('a'), false);

      deepEqual(actual, expected);
    });

    test('should work with host objects in non-edge document modes (test in IE 11)', 1, function() {
      if (xml) {
        // trigger Chakra bug
        // https://github.com/jashkenas/underscore/issues/1621
        _.times(100, _.isFunction);

        strictEqual(_.isFunction(xml), false);
      }
      else {
        skipTest();
      }
    });

    test('should work with functions from another realm', 1, function() {
      if (_._object) {
        strictEqual(_.isFunction(_._function), true);
      }
      else {
        skipTest();
      }
    });
  }(1, 2, 3));

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.isNaN');

  (function() {
    var args = arguments;

    test('should return `true` for NaNs', 2, function() {
      strictEqual(_.isNaN(NaN), true);
      strictEqual(_.isNaN(Object(NaN)), true);
    });

    test('should return `false` for non NaNs', 11, function() {
      var expected = _.map(falsey, function(value) { return value !== value; });

      var actual = _.map(falsey, function(value, index) {
        return index ? _.isNaN(value) : _.isNaN();
      });

      strictEqual(_.isNaN(args), false);
      strictEqual(_.isNaN([1, 2, 3]), false);
      strictEqual(_.isNaN(true), false);
      strictEqual(_.isNaN(new Date), false);
      strictEqual(_.isNaN(new Error), false);
      strictEqual(_.isNaN(_), false);
      strictEqual(_.isNaN({ 'a': 1 }), false);
      strictEqual(_.isNaN(1), false);
      strictEqual(_.isNaN(/x/), false);
      strictEqual(_.isNaN('a'), false);

      deepEqual(actual, expected);
    });

    test('should work with NaNs from another realm', 1, function() {
      if (_._object) {
        strictEqual(_.isNaN(_._nan), true);
      }
      else {
        skipTest();
      }
    });
  }(1, 2, 3));

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.isNull');

  (function() {
    var args = arguments;

    test('should return `true` for nulls', 1, function() {
      strictEqual(_.isNull(null), true);
    });

    test('should return `false` for non nulls', 11, function() {
      var expected = _.map(falsey, function(value) { return value === null; });

      var actual = _.map(falsey, function(value, index) {
        return index ? _.isNull(value) : _.isNull();
      });

      strictEqual(_.isNull(args), false);
      strictEqual(_.isNull([1, 2, 3]), false);
      strictEqual(_.isNull(true), false);
      strictEqual(_.isNull(new Date), false);
      strictEqual(_.isNull(new Error), false);
      strictEqual(_.isNull(_), false);
      strictEqual(_.isNull({ 'a': 1 }), false);
      strictEqual(_.isNull(1), false);
      strictEqual(_.isNull(/x/), false);
      strictEqual(_.isNull('a'), false);

      deepEqual(actual, expected);
    });

    test('should work with nulls from another realm', 1, function() {
      if (_._object) {
        strictEqual(_.isNull(_._null), true);
      }
      else {
        skipTest();
      }
    });
  }(1, 2, 3));

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.isNumber');

  (function() {
    var args = arguments;

    test('should return `true` for numbers', 2, function() {
      strictEqual(_.isNumber(0), true);
      strictEqual(_.isNumber(Object(0)), true);
    });

    test('should return `false` for non numbers', 10, function() {
      var expected = _.map(falsey, function(value) { return typeof value == 'number'; });

      var actual = _.map(falsey, function(value, index) {
        return index ? _.isNumber(value) : _.isNumber();
      });

      strictEqual(_.isNumber(args), false);
      strictEqual(_.isNumber([1, 2, 3]), false);
      strictEqual(_.isNumber(true), false);
      strictEqual(_.isNumber(new Date), false);
      strictEqual(_.isNumber(new Error), false);
      strictEqual(_.isNumber(_), false);
      strictEqual(_.isNumber({ 'a': 1 }), false);
      strictEqual(_.isNumber(/x/), false);
      strictEqual(_.isNumber('a'), false);

      deepEqual(actual, expected);
    });

    test('should work with numbers from another realm', 1, function() {
      if (_._object) {
        strictEqual(_.isNumber(_._number), true);
      }
      else {
        skipTest();
      }
    });

    test('should avoid `[xpconnect wrapped native prototype]` in Firefox', 1, function() {
      strictEqual(_.isNumber(+"2"), true);
    });
  }(1, 2, 3));

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.isObject');

  (function() {
    var args = arguments;

    test('should return `true` for objects', 11, function() {
      strictEqual(_.isObject(args), true);
      strictEqual(_.isObject([1, 2, 3]), true);
      strictEqual(_.isObject(Object(false)), true);
      strictEqual(_.isObject(new Date), true);
      strictEqual(_.isObject(new Error), true);
      strictEqual(_.isObject(_), true);
      strictEqual(_.isObject({ 'a': 1 }), true);
      strictEqual(_.isObject(Object(0)), true);
      strictEqual(_.isObject(/x/), true);
      strictEqual(_.isObject(Object('a')), true);

      if (document) {
        strictEqual(_.isObject(body), true);
      } else {
        skipTest();
      }
    });

    test('should return `false` for non objects', 1, function() {
      var values = falsey.concat('a', true),
          expected = _.map(values, _.constant(false));

      var actual = _.map(values, function(value, index) {
        return index ? _.isObject(value) : _.isObject();
      });

      deepEqual(actual, expected);
    });

    test('should work with objects from another realm', 8, function() {
      if (_._element) {
        strictEqual(_.isObject(_._element), true);
      }
      else {
        skipTest();
      }
      if (_._object) {
        strictEqual(_.isObject(_._object), true);
        strictEqual(_.isObject(_._boolean), true);
        strictEqual(_.isObject(_._date), true);
        strictEqual(_.isObject(_._function), true);
        strictEqual(_.isObject(_._number), true);
        strictEqual(_.isObject(_._regexp), true);
        strictEqual(_.isObject(_._string), true);
      }
      else {
        skipTest(7);
      }
    });

    test('should avoid V8 bug #2291 (test in Chrome 19-20)', 1, function() {
      // trigger V8 bug
      // http://code.google.com/p/v8/issues/detail?id=2291
      var object = {};

      // 1: Useless comparison statement, this is half the trigger
      object == object;

      // 2: Initial check with object, this is the other half of the trigger
      _.isObject(object);

      strictEqual(_.isObject('x'), false);
    });
  }(1, 2, 3));

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.isPlainObject');

  (function() {
    var element = document && document.createElement('div');

    test('should detect plain objects', 5, function() {
      function Foo(a) {
        this.a = 1;
      }
      strictEqual(_.isPlainObject({}), true);
      strictEqual(_.isPlainObject({ 'a': 1 }), true);
      strictEqual(_.isPlainObject({ 'constructor': Foo }), true);

      strictEqual(_.isPlainObject([1, 2, 3]), false);
      strictEqual(_.isPlainObject(new Foo(1)), false);
    });

    test('should return `true` for objects with a `[[Prototype]]` of `null`', 1, function() {
      if (create) {
        strictEqual(_.isPlainObject(create(null)), true);
      } else {
        skipTest();
      }
    });

    test('should return `true` for plain objects with a custom `valueOf` property', 2, function() {
      strictEqual(_.isPlainObject({ 'valueOf': 0 }), true);

      if (element) {
        var valueOf = element.valueOf;
        element.valueOf = 0;
        strictEqual(_.isPlainObject(element), false);
        element.valueOf = valueOf;
      }
      else {
        skipTest();
      }
    });

    test('should return `false` for DOM elements', 1, function() {
      if (element) {
        strictEqual(_.isPlainObject(element), false);
      } else {
        skipTest();
      }
    });

    test('should return `false` for Object objects without a `[[Class]]` of "Object"', 3, function() {
      strictEqual(_.isPlainObject(arguments), false);
      strictEqual(_.isPlainObject(Error), false);
      strictEqual(_.isPlainObject(Math), false);
    });

    test('should return `false` for non objects', 3, function() {
      var expected = _.map(falsey, _.constant(false));

      var actual = _.map(falsey, function(value, index) {
        return index ? _.isPlainObject(value) : _.isPlainObject();
      });

      strictEqual(_.isPlainObject(true), false);
      strictEqual(_.isPlainObject('a'), false);
      deepEqual(actual, expected);
    });

    test('should work with objects from another realm', 1, function() {
      if (_._object) {
        strictEqual(_.isPlainObject(_._object), true);
      }
      else {
        skipTest();
      }
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.isRegExp');

  (function() {
    var args = arguments;

    test('should return `true` for regexes', 2, function() {
      strictEqual(_.isRegExp(/x/), true);
      strictEqual(_.isRegExp(RegExp('x')), true);
    });

    test('should return `false` for non regexes', 10, function() {
      var expected = _.map(falsey, _.constant(false));

      var actual = _.map(falsey, function(value, index) {
        return index ? _.isRegExp(value) : _.isRegExp();
      });

      strictEqual(_.isRegExp(args), false);
      strictEqual(_.isRegExp([1, 2, 3]), false);
      strictEqual(_.isRegExp(true), false);
      strictEqual(_.isRegExp(new Date), false);
      strictEqual(_.isRegExp(new Error), false);
      strictEqual(_.isRegExp(_), false);
      strictEqual(_.isRegExp({ 'a': 1 }), false);
      strictEqual(_.isRegExp(1), false);
      strictEqual(_.isRegExp('a'), false);

      deepEqual(actual, expected);
    });

    test('should work with regexes from another realm', 1, function() {
      if (_._object) {
        strictEqual(_.isRegExp(_._regexp), true);
      }
      else {
        skipTest();
      }
    });
  }(1, 2, 3));

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.isString');

  (function() {
    var args = arguments;

    test('should return `true` for strings', 2, function() {
      strictEqual(_.isString('a'), true);
      strictEqual(_.isString(Object('a')), true);
    });

    test('should return `false` for non strings', 10, function() {
      var expected = _.map(falsey, function(value) { return value === ''; });

      var actual = _.map(falsey, function(value, index) {
        return index ? _.isString(value) : _.isString();
      });

      strictEqual(_.isString(args), false);
      strictEqual(_.isString([1, 2, 3]), false);
      strictEqual(_.isString(true), false);
      strictEqual(_.isString(new Date), false);
      strictEqual(_.isString(new Error), false);
      strictEqual(_.isString(_), false);
      strictEqual(_.isString({ '0': 1, 'length': 1 }), false);
      strictEqual(_.isString(1), false);
      strictEqual(_.isString(/x/), false);

      deepEqual(actual, expected);
    });

    test('should work with strings from another realm', 1, function() {
      if (_._object) {
        strictEqual(_.isString(_._string), true);
      }
      else {
        skipTest();
      }
    });
  }(1, 2, 3));

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.isUndefined');

  (function() {
    var args = arguments;

    test('should return `true` for `undefined` values', 2, function() {
      strictEqual(_.isUndefined(), true);
      strictEqual(_.isUndefined(undefined), true);
    });

    test('should return `false` for non `undefined` values', 11, function() {
      var expected = _.map(falsey, function(value) { return value === undefined; });

      var actual = _.map(falsey, function(value, index) {
        return index ? _.isUndefined(value) : _.isUndefined();
      });

      strictEqual(_.isUndefined(args), false);
      strictEqual(_.isUndefined([1, 2, 3]), false);
      strictEqual(_.isUndefined(true), false);
      strictEqual(_.isUndefined(new Date), false);
      strictEqual(_.isUndefined(new Error), false);
      strictEqual(_.isUndefined(_), false);
      strictEqual(_.isUndefined({ 'a': 1 }), false);
      strictEqual(_.isUndefined(1), false);
      strictEqual(_.isUndefined(/x/), false);
      strictEqual(_.isUndefined('a'), false);

      deepEqual(actual, expected);
    });

    test('should work with `undefined` from another realm', 1, function() {
      if (_._object) {
        strictEqual(_.isUndefined(_._undefined), true);
      }
      else {
        skipTest();
      }
    });
  }(1, 2, 3));

  /*--------------------------------------------------------------------------*/

  QUnit.module('isType checks');

  (function() {
    test('should return `false` for subclassed values', 8, function() {
      var funcs = [
        'isArray', 'isBoolean', 'isDate', 'isError',
        'isFunction', 'isNumber', 'isRegExp', 'isString'
      ];

      _.each(funcs, function(methodName) {
        function Foo() {}
        Foo.prototype = root[methodName.slice(2)].prototype;

        var object = new Foo;
        if (toString.call(object) == '[object Object]') {
          strictEqual(_[methodName](object), false, '`_.' + methodName + '` returns `false`');
        } else {
          skipTest();
        }
      });
    });

    test('should not error on host objects (test in IE)', 12, function() {
      if (xml) {
        var funcs = [
          'isArray', 'isArguments', 'isBoolean', 'isDate', 'isElement', 'isError',
          'isFunction', 'isObject', 'isNull', 'isNumber', 'isRegExp', 'isString',
          'isUndefined'
        ];

        _.each(funcs, function(methodName) {
          var pass = true;
          try {
            _[methodName](xml);
          } catch(e) {
            pass = false;
          }
          ok(pass, '`_.' + methodName + '` should not error');
        });
      }
      else {
        skipTest(17);
      }
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('keys methods');

  _.each(['keys', 'keysIn'], function(methodName) {
    var args = arguments,
        func = _[methodName],
        isKeys = methodName == 'keys';

    test('`_.' + methodName + '` should return the keys of an object', 1, function() {
      var object = { 'a': 1, 'b': 1 },
          actual = func(object);

      deepEqual(actual.sort(), ['a', 'b']);
    });

    test('`_.' + methodName + '` should coerce primitives to objects', 1, function() {
      var actual = func('abc');
      deepEqual(actual.sort(), ['0', '1', '2']);
    });

    test('`_.' + methodName + '` should treat sparse arrays as dense', 1, function() {
      var array = [1];
      array[2] = 3;

      var actual = func(array);
      deepEqual(actual.sort(), ['0', '1', '2']);
    });

    test('`_.' + methodName + '` should return keys for custom properties on arrays', 1, function() {
      var array = [1];
      array.a = 1;

      var actual = func(array);
      deepEqual(actual.sort(), ['0', 'a']);
    });

    test('`_.' + methodName + '` should ' + (isKeys ? 'not' : '') + ' include inherited properties of arrays', 1, function() {
      Array.prototype.a = 1;
      var expected = isKeys ? ['0'] : ['0', 'a'],
          actual = func([1]);

      deepEqual(actual.sort(), expected);
      delete Array.prototype.a;
    });

    test('`_.' + methodName + '` should work with `arguments` objects (test in IE < 9)', 1, function() {
      if (!(isPhantom || isStrict)) {
        var actual = func(args);
        deepEqual(actual.sort(), ['0', '1', '2']);
      } else {
        skipTest();
      }
    });

    test('`_.' + methodName + '` should return keys for custom properties on `arguments` objects', 1, function() {
      if (!(isPhantom || isStrict)) {
        args.a = 1;
        var actual = func(args);

        deepEqual(actual.sort(), ['0', '1', '2', 'a']);
        delete args.a;
      } else {
        skipTest();
      }
    });

    test('`_.' + methodName + '` should ' + (isKeys ? 'not' : '') + ' include inherited properties of `arguments` objects', 1, function() {
      if (!(isPhantom || isStrict)) {
        Object.prototype.a = 1;
        var expected = isKeys ? ['0', '1', '2'] : ['0', '1', '2', 'a'],
            actual = func(args);

        deepEqual(actual.sort(), expected);
        delete Object.prototype.a;
      } else {
        skipTest();
      }
    });

    test('`_.' + methodName + '` should work with string objects (test in IE < 9)', 1, function() {
      var actual = func(Object('abc'));
      deepEqual(actual.sort(), ['0', '1', '2']);
    });

    test('`_.' + methodName + '` should return keys for custom properties on string objects', 1, function() {
      var object = Object('a');
      object.a = 1;

      var actual = func(object);
      deepEqual(actual.sort(), ['0', 'a']);
    });

    test('`_.' + methodName + '` should ' + (isKeys ? 'not' : '') + ' include inherited properties of string objects', 1, function() {
      String.prototype.a = 1;
      var expected = isKeys ? ['0'] : ['0', 'a'],
          actual = func(Object('a'));

      deepEqual(actual.sort(), expected);
      delete String.prototype.a;
    });

    test('`_.' + methodName + '` fixes the JScript `[[DontEnum]]` bug (test in IE < 9)', 1, function() {
      var actual = func(shadowedObject);
      deepEqual(actual.sort(), shadowedProps);
    });

    test('`_.' + methodName + '` skips the prototype property of functions (test in Firefox < 3.6, Opera > 9.50 - Opera < 11.60, and Safari < 5.1)', 2, function() {
      function Foo() {}
      Foo.a = 1;
      Foo.b = 2;
      Foo.prototype.c = 3;

      var expected = ['a', 'b'],
          actual = func(Foo);

      deepEqual(actual.sort(), expected);

      Foo.prototype = { 'c': 3 };
      actual = func(Foo);
      deepEqual(actual.sort(), expected);
    });

    test('`_.' + methodName + '` skips the `constructor` property on prototype objects', 2, function() {
      function Foo() {}
      Foo.prototype.a = 1;

      var expected = ['a'];
      deepEqual(func(Foo.prototype), ['a']);

      Foo.prototype = { 'constructor': Foo, 'a': 1 };
      deepEqual(func(Foo.prototype), ['a']);
    });

    test('`_.' + methodName + '` should ' + (isKeys ? 'not' : '') + ' include inherited properties', 1, function() {
      function Foo() {
        this.a = 1;
        this.b = 2;
      }
      Foo.prototype.c = 3;

      var expected = isKeys ? ['a', 'b'] : ['a', 'b', 'c'],
          actual = func(new Foo);

      deepEqual(actual.sort(), expected);
    });
  });

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.last');

  (function() {
    var array = [1, 2, 3];

    test('should return the last element', 1, function() {
      strictEqual(_.last(array), 3);
    });

    test('should return `undefined` when querying empty arrays', 1, function() {
      var array = []
      array['-1'] = 1;
      strictEqual(_.last([]), undefined);
    });

    test('should work when used as a callback for `_.map`', 1, function() {
      var array = [[1, 2, 3], [4, 5, 6], [7, 8, 9]],
          actual = _.map(array, _.last);

      deepEqual(actual, [3, 6, 9]);
    });

    test('should return an unwrapped value when chaining', 1, function() {
      if (!isNpm) {
        strictEqual(_(array).last(), 3);
      }
      else {
        skipTest();
      }
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.lastIndexOf');

  (function() {
    var array = [1, 2, 3, 1, 2, 3];

    test('should return the index of the last matched value', 1, function() {
      strictEqual(_.lastIndexOf(array, 3), 5);
    });

    test('should return `-1` for an unmatched value', 1, function() {
      strictEqual(_.lastIndexOf(array, 4), -1);
    });

    test('should work with a positive `fromIndex`', 1, function() {
      strictEqual(_.lastIndexOf(array, 1, 2), 0);
    });

    test('should work with `fromIndex` >= `array.length`', 12, function() {
      _.each([6, 8, Math.pow(2, 32), Infinity], function(fromIndex) {
        strictEqual(_.lastIndexOf(array, undefined, fromIndex), -1);
        strictEqual(_.lastIndexOf(array, 1, fromIndex), 3);
        strictEqual(_.lastIndexOf(array, '', fromIndex), -1);
      });
    });

    test('should treat falsey `fromIndex` values, except `0` and `NaN`, as `array.length`', 1, function() {
      var expected = _.map(falsey, function(value) {
        return typeof value == 'number' ? -1 : 5;
      });

      var actual = _.map(falsey, function(fromIndex) {
        return _.lastIndexOf(array, 3, fromIndex);
      });

      deepEqual(actual, expected);
    });

    test('should treat non-number `fromIndex` values as `array.length`', 2, function() {
      strictEqual(_.lastIndexOf(array, 3, '1'), 5);
      strictEqual(_.lastIndexOf(array, 3, true), 5);
    });

    test('should work with a negative `fromIndex`', 1, function() {
      strictEqual(_.lastIndexOf(array, 2, -3), 1);
    });

    test('should work with a negative `fromIndex` <= `-array.length`', 3, function() {
      _.each([-6, -8, -Infinity], function(fromIndex) {
        strictEqual(_.lastIndexOf(array, 1, fromIndex), 0);
      });
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('indexOf methods');

  (function() {
    _.each(['indexOf', 'lastIndexOf'], function(methodName) {
      var func = _[methodName];

      test('`_.' + methodName + '` should accept a falsey `array` argument', 1, function() {
        var expected = _.map(falsey, _.constant(-1));

        var actual = _.map(falsey, function(value, index) {
          try {
            return index ? func(value) : func();
          } catch(e) { }
        });

        deepEqual(actual, expected);
      });
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.map');

  (function() {
    var array = [1, 2, 3];

    test('should pass the correct `callback` arguments', 1, function() {
      var args;

      _.map(array, function() {
        args || (args = slice.call(arguments));
      });

      deepEqual(args, [1, 0, array]);
    });

    test('should support the `thisArg` argument', 2, function() {
      function callback(num, index) {
        return this[index] + num;
      }

      var actual = _.map([1], callback, [2]);
      deepEqual(actual, [3]);

      actual = _.map({ 'a': 1 }, callback, { 'a': 2 });
      deepEqual(actual, [3]);
    });

    test('should iterate over own properties of objects', 1, function() {
      function Foo() { this.a = 1; }
      Foo.prototype.b = 2;

      var actual = _.map(new Foo, function(value, key) { return key; });
      deepEqual(actual, ['a']);
    });

    test('should work on an object with no `callback`', 1, function() {
      var actual = _.map({ 'a': 1, 'b': 2, 'c': 3 });
      deepEqual(actual, array);
    });

    test('should handle object arguments with non-numeric length properties', 1, function() {
      if (defineProperty) {
        var object = {};
        defineProperty(object, 'length', { 'value': 'x' });
        deepEqual(_.map(object, _.identity), []);
      } else {
        skipTest();
      }
    });

    test('should treat a nodelist as an array-like object', 1, function() {
      if (document) {
        var actual = _.map(document.getElementsByTagName('body'), function(element) {
          return element.nodeName.toLowerCase();
        });

        deepEqual(actual, ['body']);
      }
      else {
        skipTest();
      }
    });

    test('should accept a falsey `collection` argument', 1, function() {
      var expected = _.map(falsey, _.constant([]));

      var actual = _.map(falsey, function(value, index) {
        try {
          return index ? _.map(value) : _.map();
        } catch(e) { }
      });

      deepEqual(actual, expected);
    });

    test('should treat number values for `collection` as empty', 1, function() {
      deepEqual(_.map(1), []);
    });

    test('should return a wrapped value when chaining', 1, function() {
      if (!isNpm) {
        ok(_(array).map(_.noop) instanceof _);
      }
      else {
        skipTest();
      }
    });

    test('should be aliased', 1, function() {
      strictEqual(_.collect, _.map);
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.mapValues');

  (function() {
    var object = { 'a': 1, 'b': 2, 'c': 3 };

    test('should pass the correct `callback` arguments', 1, function() {
      var args;

      _.mapValues(object, function() {
        args || (args = slice.call(arguments));
      });

      deepEqual(args, [1, 'a', object]);
    });

    test('should support the `thisArg` argument', 2, function() {
      function callback(num, key) {
        return this[key] + num;
      }

      var actual = _.mapValues({ 'a': 1 }, callback, { 'a': 2 });
      deepEqual(actual, { 'a': 3 });

      actual = _.mapValues([1], callback, [2]);
      deepEqual(actual, { '0': 3 });
    });

    test('should iterate over own properties of objects', 1, function() {
      function Foo() { this.a = 1; }
      Foo.prototype.b = 2;

      var actual = _.mapValues(new Foo, function(value, key) { return key; });
      deepEqual(actual, { 'a': 'a' });
    });

    test('should work on an object with no `callback`', 1, function() {
      var actual = _.mapValues({ 'a': 1, 'b': 2, 'c': 3 });
      deepEqual(actual, object);
    });

    test('should accept a falsey `object` argument', 1, function() {
      var expected = _.map(falsey, _.constant({}));

      var actual = _.map(falsey, function(value, index) {
        try {
          return index ? _.mapValues(value) : _.mapValues();
        } catch(e) { }
      });

      deepEqual(actual, expected);
    });

    test('should return a wrapped value when chaining', 1, function() {
      if (!isNpm) {
        ok(_(object).mapValues(_.noop) instanceof _);
      }
      else {
        skipTest();
      }
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.matches');

  (function() {
    var object = { 'a': 1, 'b': 2, 'c': 3 },
        sources = [{ 'a': 1 }, { 'a': 1, 'c': 3 }];

    test('should create a function that performs a deep comparison between a given object and the `source` object', 6, function() {
      _.each(sources, function(source, index) {
        var matches = _.matches(source);
        strictEqual(matches.length, 1);
        strictEqual(matches(object), true);

        matches = _.matches(index ? { 'c': 3, 'd': 4 } : { 'b': 1 });
        strictEqual(matches(object), false);
      });
    });

    test('should return `true` when comparing an empty `source`', 1, function() {
      var expected = _.map(empties, _.constant(true));

      var actual = _.map(empties, function(value) {
        var matches = _.matches(value);
        return matches(object) === true;
      });

      deepEqual(actual, expected);
    });

    test('should not error error for falsey `object` values', 2, function() {
      var expected = _.map(falsey, _.constant(true));

      _.each(sources, function(source) {
        var matches = _.matches(source);

        var actual = _.map(falsey, function(value, index) {
          try {
            var result = index ? matches(value) : matches();
            return result === false;
          } catch(e) { }
        });

        deepEqual(actual, expected);
      });
    });

    test('should return `true` when comparing an empty `source` to a falsey `object`', 1, function() {
      var expected = _.map(falsey, _.constant(true)),
          matches = _.matches({});

      var actual = _.map(falsey, function(value, index) {
        try {
          var result = index ? matches(value) : matches();
          return result === true;
        } catch(e) { }
      });

      deepEqual(actual, expected);
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.max');

  (function() {
    test('should return the largest value from a collection', 1, function() {
      strictEqual(3, _.max([1, 2, 3]));
    });

    test('should return `-Infinity` for empty collections', 1, function() {
      var expected = _.map(empties, function() { return -Infinity; });

      var actual = _.map(empties, function(value) {
        try {
          return _.max(value);
        } catch(e) { }
      });

      deepEqual(actual, expected);
    });

    test('should return `-Infinity` for non-numeric collection values', 1, function() {
      var collections = [['a', 'b'], { 'a': 'a', 'b': 'b' }],
          expected = _.map(collections, function() { return -Infinity; });

      var actual = _.map(collections, function(value) {
        try {
          return _.max(value);
        } catch(e) { }
      });

      deepEqual(actual, expected);
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.memoize');

  (function() {
    test('should memoize results based on the first argument provided', 2, function() {
      var memoized = _.memoize(function(a, b, c) {
        return a + b + c;
      });

      strictEqual(memoized(1, 2, 3), 6);
      strictEqual(memoized(1, 3, 5), 6);
    });

    test('should support a `resolver` argument', 2, function() {
      var fn = function(a, b, c) { return a + b + c; },
          memoized = _.memoize(fn, fn);

      strictEqual(memoized(1, 2, 3), 6);
      strictEqual(memoized(1, 3, 5), 9);
    });

    test('should not set a `this` binding', 2, function() {
      var memoized = _.memoize(function(a, b, c) {
        return a + this.b + this.c;
      });

      var object = { 'b': 2, 'c': 3, 'memoized': memoized };
      strictEqual(object.memoized(1), 6);
      strictEqual(object.memoized(2), 7);
    });

    test('should throw a TypeError if `resolve` is truthy and not a function', function() {
      raises(function() { _.memoize(_.noop, {}); }, TypeError);
    });

    test('should not throw a TypeError if `resolve` is falsey', function() {
      var expected = _.map(falsey, _.constant(true));

      var actual = _.map(falsey, function(value, index) {
        try {
          return _.isFunction(index ? _.memoize(_.noop, value) : _.memoize(_.noop));
        } catch(e) { }
      });

      deepEqual(actual, expected);
    });

    test('should check cache for own properties', 1, function() {
      var actual = [],
          memoized = _.memoize(_.identity);

      _.each(shadowedProps, function(value) {
        actual.push(memoized(value));
      });

      deepEqual(actual, shadowedProps);
    });

    test('should expose a `cache` object on the `memoized` function', 4, function() {
      _.times(2, function(index) {
        var resolver = index && _.identity,
            memoized = _.memoize(_.identity, resolver);

        memoized('a');
        strictEqual(memoized.cache.a, 'a');

        memoized.cache.a = 'b';
        strictEqual(memoized('a'), 'b');
      });
    });

    test('should skip the `__proto__` key', 4, function() {
      _.times(2, function(index) {
        var count = 0,
            resolver = index && _.identity;

        var memoized = _.memoize(function() {
          count++;
          return [];
        }, resolver);

        memoized('__proto__');
        memoized('__proto__');

        strictEqual(count, 2);
        ok(!(memoized.cache instanceof Array));
      });
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.merge');

  (function() {
    var args = arguments;

    test('should merge `source` into the destination object', 1, function() {
      var names = {
        'characters': [
          { 'name': 'barney' },
          { 'name': 'fred' }
        ]
      };

      var ages = {
        'characters': [
          { 'age': 36 },
          { 'age': 40 }
        ]
      };

      var heights = {
        'characters': [
          { 'height': '5\'4"' },
          { 'height': '5\'5"' }
        ]
      };

      var expected = {
        'characters': [
          { 'name': 'barney', 'age': 36, 'height': '5\'4"' },
          { 'name': 'fred', 'age': 40, 'height': '5\'5"' }
        ]
      };

      deepEqual(_.merge(names, ages, heights), expected);
    });

    test('should merge sources containing circular references', 1, function() {
      var object = {
        'foo': { 'a': 1 },
        'bar': { 'a': 2 }
      };

      var source = {
        'foo': { 'b': { 'foo': { 'c': { } } } },
        'bar': { }
      };

      source.foo.b.foo.c = source;
      source.bar.b = source.foo.b;

      var actual = _.merge(object, source);
      ok(actual.bar.b === actual.foo.b && actual.foo.b.foo.c === actual.foo.b.foo.c.foo.b.foo.c);
    });

    test('should treat sources that are sparse arrays as dense', 2, function() {
      var array = Array(3);
      array[0] = 1;
      array[2] = 3;

      var actual = _.merge([], array),
          expected = array.slice();

      expected[1] = undefined;

      ok('1' in actual);
      deepEqual(actual, expected);
    });

    test('should not treat `arguments` objects as plain objects', 1, function() {
      var object = {
        'args': args
      };

      var source = {
        'args': { '3': 4 }
      };

      var actual = _.merge(object, source);
      strictEqual(_.isArguments(actual.args), false);
    });

    test('should work with four arguments', 1, function() {
      var expected = { 'a': 4 };
      deepEqual(_.merge({ 'a': 1 }, { 'a': 2 }, { 'a': 3 }, expected), expected);
    });

    test('should assign `null` values', 1, function() {
      var actual = _.merge({ 'a': 1 }, { 'a': null });
      strictEqual(actual.a, null);
    });

    test('should not assign `undefined` values', 1, function() {
      var actual = _.merge({ 'a': 1 }, { 'a': undefined, 'b': undefined });
      deepEqual(actual, { 'a': 1 });
    });

    test('should handle merging if `callback` returns `undefined`', 1, function() {
      var actual = _.merge({ 'a': { 'b': [1, 1] } }, { 'a': { 'b': [0] } }, _.noop);
      deepEqual(actual, { 'a': { 'b': [0, 1] } });
    });

    test('should defer to `callback` when it returns a value other than `undefined`', 1, function() {
      var actual = _.merge({ 'a': { 'b': [0, 1] } }, { 'a': { 'b': [2] } }, function(a, b) {
        return _.isArray(a) ? a.concat(b) : undefined;
      });
      deepEqual(actual, { 'a': { 'b': [0, 1, 2] } });
    });
  }(1, 2, 3));

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.min');

  (function() {
    test('should return the smallest value from a collection', 1, function() {
      strictEqual(1, _.min([1, 2, 3]));
    });

    test('should return `Infinity` for empty collections', 1, function() {
      var expected = _.map(empties, function() { return Infinity; });

      var actual = _.map(empties, function(value) {
        try {
          return _.min(value);
        } catch(e) { }
      });

      deepEqual(actual, expected);
    });

    test('should return `Infinity` for non-numeric collection values', 1, function() {
      var collections = [['a', 'b'], { 'a': 'a', 'b': 'b' }],
          expected = _.map(collections, function() { return Infinity; });

      var actual = _.map(collections, function(value) {
        try {
          return _.min(value);
        } catch(e) { }
      });

      deepEqual(actual, expected);
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.max and lodash.min');

  _.each(['max', 'min'], function(methodName) {
    var array = [1, 2, 3],
        func = _[methodName],
        isMax = methodName == 'max';

    test('`_.' + methodName + '` should work with Date objects', 1, function() {
      var now = new Date,
          past = new Date(0);

      strictEqual(func([now, past]), isMax ? now : past);
    });

    test('`_.' + methodName + '` should work with a callback argument', 1, function() {
      var actual = func(array, function(num) {
        return -num;
      });

      strictEqual(actual, isMax ? 1 : 3);
    });

    test('`_.' + methodName + '` should pass the correct `callback` arguments when iterating an array', 1, function() {
      var args;

      func(array, function() {
        args || (args = slice.call(arguments));
      });

      deepEqual(args, [1, 0, array]);
    });

    test('`_.' + methodName + '` should pass the correct `callback` arguments when iterating an object', 1, function() {
      var args,
          object = { 'a': 1, 'b': 2 },
          firstKey = _.first(_.keys(object));

      var expected = firstKey == 'a'
        ? [1, 'a', object]
        : [2, 'b', object];

      func(object, function() {
        args || (args = slice.call(arguments));
      }, 0);

      deepEqual(args, expected);
    });

    test('`_.' + methodName + '` should support the `thisArg` argument', 1, function() {
      var actual = func(array, function(num, index) {
        return -this[index];
      }, array);

      strictEqual(actual, isMax ? 1 : 3);
    });

    test('`_.' + methodName + '` should work when used as a callback for `_.map`', 1, function() {
      var array = [[2, 3, 1], [5, 6, 4], [8, 9, 7]],
          actual = _.map(array, func);

      deepEqual(actual, isMax ? [3, 6, 9] : [1, 4, 7]);
    });

    test('`_.' + methodName + '` should iterate an object', 1, function() {
      var actual = func({ 'a': 1, 'b': 2, 'c': 3 });
      strictEqual(actual, isMax ? 3 : 1);
    });

    test('`_.' + methodName + '` should iterate a string', 2, function() {
      _.each(['abc', Object('abc')], function(value) {
        var actual = func(value);
        strictEqual(actual, isMax ? 'c' : 'a');
      });
    });

    test('`_.' + methodName + '` should work when `callback` returns +/-Infinity', 1, function() {
      var object = { 'a': (isMax ? -Infinity : Infinity) };

      var actual = func([object, { 'a': object.a }], function(object) {
        return object.a;
      });

      strictEqual(actual, object);
    });

    test('`_.' + methodName + '` should work with extremely large arrays', 1, function() {
      var array = _.range(0, 5e5);
      strictEqual(func(array), isMax ? 499999 : 0);
    });

    test('`_.' + methodName + '` should work when chaining on an array with only one value', 1, function() {
      if (!isNpm) {
        var actual = _([40])[methodName]();
        strictEqual(actual, 40);
      }
      else {
        skipTest();
      }
    });
  });

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.mixin');

  (function() {
    function wrapper(value) {
      if (!(this instanceof wrapper)) {
        return new wrapper(value);
      }
      this.__wrapped__ = value;
    }

    var value = ['a'],
        source = { 'a': function(array) { return array[0]; }, 'b': 'B' };

    test('should mixin `source` methods into lodash', 4, function() {
      _.mixin(source);

      strictEqual(_.a(value), 'a');
      strictEqual(_(value).a().__wrapped__, 'a');

      delete _.a;
      delete _.prototype.a;

      ok(!('b' in _));
      ok(!('b' in _.prototype));

      delete _.b;
      delete _.prototype.b;
    });

    test('should use `this` as the default `object` value', 3, function() {
      var object = _.create(_);
      object.mixin(source);

      strictEqual(object.a(value), 'a');

      ok(!('a' in _));
      ok(!('a' in _.prototype));

      delete wrapper.a;
      delete wrapper.prototype.a;
      delete wrapper.b;
      delete wrapper.prototype.b;
    });

    test('should accept an `object` argument', 1, function() {
      var object = {};
      _.mixin(object, source);
      strictEqual(object.a(value), 'a');
    });

    test('should return `object`', 2, function() {
      var object = {};
      strictEqual(_.mixin(object, source), object);
      strictEqual(_.mixin(), _);
    });

    test('should work with a function for `object`', 2, function() {
      _.mixin(wrapper, source);

      var wrapped = wrapper(value),
          actual = wrapped.a();

      strictEqual(actual.__wrapped__, 'a');
      ok(actual instanceof wrapper);

      delete wrapper.a;
      delete wrapper.prototype.a;
      delete wrapper.b;
      delete wrapper.prototype.b;
    });

    test('should not assign inherited `source` properties', 1, function() {
      function Foo() {}
      Foo.prototype = { 'a': _.noop };

      deepEqual(_.mixin({}, new Foo, {}), {});
    });

    test('should accept an `options` argument', 16, function() {
      function message(func, chain) {
        return (func === _ ? 'lodash' : 'provided') + ' function should ' + (chain ? '' : 'not ') + 'chain';
      }

      _.each([_, wrapper], function(func) {
        _.each([false, true, { 'chain': false }, { 'chain': true }], function(options) {
          if (func === _) {
            _.mixin(source, options);
          } else {
            _.mixin(func, source, options);
          }
          var wrapped = func(value),
              actual = wrapped.a();

          if (options === true || (options && options.chain)) {
            strictEqual(actual.__wrapped__, 'a', message(func, true));
            ok(actual instanceof func, message(func, true));
          } else {
            strictEqual(actual, 'a', message(func, false));
            ok(!(actual instanceof func), message(func, false));
          }
          delete func.a;
          delete func.prototype.a;
          delete func.b;
          delete func.prototype.b;
        });
      });
    });

    test('should not error for non-object `options` values', 2, function() {
      var pass = true;

      try {
        _.mixin({}, source, 1);
      } catch(e) {
        pass = false;
      }
      ok(pass);

      pass = true;

      try {
        _.mixin(source, 1);
      } catch(e) {
        pass = false;
      }
      delete _.a;
      delete _.prototype.a;
      delete _.b;
      delete _.prototype.b;

      ok(pass);
    });

    test('should return the existing wrapper when chaining', 2, function() {
      if (!isNpm) {
        _.each([_, wrapper], function(func) {
          if (func === _) {
            var wrapper = _(source),
                actual = wrapper.mixin();

            strictEqual(actual.value(), _);
          }
          else {
            wrapper = _(func);
            actual = wrapper.mixin(source);
            strictEqual(actual, wrapper);
          }
          delete func.a;
          delete func.prototype.a;
          delete func.b;
          delete func.prototype.b;
        });
      }
      else {
        skipTest(2);
      }
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.noop');

  (function() {
    test('should always return `undefined`', 1, function() {
      var values = falsey.concat([], true, new Date, _, {}, /x/, 'a'),
          expected = _.map(values, _.constant());

      var actual = _.map(values, function(value, index) {
        return index ? _.noop(value) : _.noop();
      });

      deepEqual(actual, expected);
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.now');

  (function() {
    asyncTest('should return the number of milliseconds that have elapsed since the Unix epoch', 2, function() {
      var stamp = +new Date,
          actual = _.now();

      ok(actual >= stamp);

      if (!(isRhino && isModularize)) {
        setTimeout(function() {
          ok(_.now() > actual);
          QUnit.start();
        }, 32);
      }
      else {
      	skipTest();
      	QUnit.start();
      }
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.omit');

  (function() {
    var args = arguments,
        object = { 'a': 1, 'b': 2, 'c': 3 },
        expected = { 'b': 2 };

    test('should create an object with omitted properties', 2, function() {
      deepEqual(_.omit(object, 'a'), { 'b': 2, 'c': 3 });
      deepEqual(_.omit(object, 'a', 'c'), expected);
    });

    test('should support picking an array of properties', 1, function() {
      deepEqual(_.omit(object, ['a', 'c']), expected);
    });

    test('should support picking an array of properties and individual properties', 1, function() {
      deepEqual(_.omit(object, ['a'], 'c'), expected);
    });

    test('should iterate over inherited properties', 1, function() {
      function Foo() {}
      Foo.prototype = object;

      deepEqual(_.omit(new Foo, 'a', 'c'), expected);
    });

    test('should work with `arguments` objects as secondary arguments', 1, function() {
      deepEqual(_.omit(object, args), expected);
    });

    test('should work with an array `object` argument', 1, function() {
      deepEqual(_.omit([1, 2, 3], '0', '2'), { '1': 2 });
    });

    test('should work with a callback argument', 1, function() {
      var actual = _.omit(object, function(num) {
        return num != 2;
      });

      deepEqual(actual, expected);
    });

    test('should pass the correct `callback` arguments', 1, function() {
      var args,
          object = { 'a': 1, 'b': 2 },
          lastKey = _.keys(object).pop();

      var expected = lastKey == 'b'
        ? [1, 'a', object]
        : [2, 'b', object];

      _.omit(object, function() {
        args || (args = slice.call(arguments));
      });

      deepEqual(args, expected);
    });

    test('should correctly set the `this` binding', 1, function() {
      var actual = _.omit(object, function(num) {
        return num != this.b;
      }, { 'b': 2 });

      deepEqual(actual, expected);
    });

    test('should coerce property names to strings', 1, function() {
      deepEqual(_.omit({ '0': 'a' }, 0), {});
    });
  }('a', 'c'));

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.once');

  (function() {
    test('should execute `func` once', 2, function() {
      var count = 0,
          once = _.once(function() { return ++count; });

      once();
      strictEqual(once(), 1);
      strictEqual(count, 1);
    });

    test('should not set a `this` binding', 2, function() {
      var once = _.once(function() { return ++this.count; }),
          object = { 'count': 0, 'once': once };

      object.once();
      strictEqual(object.once(), 1);
      strictEqual(object.count, 1);
    });

    test('should ignore recursive calls', 2, function() {
      var count = 0;

      var once = _.once(function() {
        once();
        return ++count;
      });

      strictEqual(once(), 1);
      strictEqual(count, 1);
    });

    test('should not throw more than once', 2, function() {
      var pass = true;

      var once = _.once(function() {
        throw new Error;
      });

      raises(function() { once(); }, Error);

      try {
        once();
      } catch(e) {
        pass = false;
      }
      ok(pass);
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.pad');

  (function() {
    test('should pad a string to a given length', 1, function() {
      strictEqual(_.pad('abc', 9), '   abc   ');
    });

    test('should truncate pad characters to fit the pad length', 2, function() {
      strictEqual(_.pad('abc', 8), '  abc   ');
      strictEqual(_.pad('abc', 8, '_-'), '_-abc_-_');
    });

    test('should coerce `string` to a string', 2, function() {
      strictEqual(_.pad(Object('abc'), 4), 'abc ');
      strictEqual(_.pad({ 'toString': _.constant('abc') }, 5), ' abc ');
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.padLeft');

  (function() {
    test('should pad a string to a given length', 1, function() {
      strictEqual(_.padLeft('abc', 6), '   abc');
    });

    test('should truncate pad characters to fit the pad length', 1, function() {
      strictEqual(_.padLeft('abc', 6, '_-'), '_-_abc');
    });

    test('should coerce `string` to a string', 2, function() {
      strictEqual(_.padLeft(Object('abc'), 4), ' abc');
      strictEqual(_.padLeft({ 'toString': _.constant('abc') }, 5), '  abc');
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.padRight');

  (function() {
    test('should pad a string to a given length', 1, function() {
      strictEqual(_.padRight('abc', 6), 'abc   ');
    });

    test('should truncate pad characters to fit the pad length', 1, function() {
      strictEqual(_.padRight('abc', 6, '_-'), 'abc_-_');
    });

    test('should coerce `string` to a string', 2, function() {
      strictEqual(_.padRight(Object('abc'), 4), 'abc ');
      strictEqual(_.padRight({ 'toString': _.constant('abc') }, 5), 'abc  ');
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('pad methods');

  _.each(['pad', 'padLeft', 'padRight'], function(methodName, index) {
    var func = _[methodName];

    test('`_.' + methodName + '` should not pad is string is >= `length`', 2, function() {
      strictEqual(func('abc', 2), 'abc');
      strictEqual(func('abc', 3), 'abc');
    });

    test('`_.' + methodName + '` should treat negative `length` as `0`', 2, function() {
      _.each([0, -2], function(length) {
        strictEqual(func('abc', length), 'abc');
      });
    });

    test('`_.' + methodName + '` should coerce `length` to a number', 2, function() {
      _.each(['', '4'], function(length) {
        var actual = length ? (index == 1 ? ' abc' : 'abc ') : 'abc';
        strictEqual(func('abc', length), actual);
      });
    });

    test('`_.' + methodName + '` should return an empty string when provided `null`, `undefined`, or empty string and `chars`', 6, function() {
      _.each([null, '_-'], function(chars) {
        strictEqual(func(null, 0, chars), '');
        strictEqual(func(undefined, 0, chars), '');
        strictEqual(func('', 0, chars), '');
      });
    });

    test('`_.' + methodName + '` should work with `null`, `undefined`, or empty string for `chars`', 3, function() {
      notStrictEqual(func('abc', 6, null), 'abc');
      notStrictEqual(func('abc', 6, undefined), 'abc');
      strictEqual(func('abc', 6, ''), 'abc');
    });
  });

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.pairs');

  (function() {
    test('should create a two dimensional array of an object\'s key-value pairs', 1, function() {
      var object = { 'a': 1, 'b': 2 };
      deepEqual(_.pairs(object), [['a', 1], ['b', 2]]);
    });

    test('should work with an object that has a `length` property', 1, function() {
      var object = { '0': 'a', '1': 'b', 'length': 2 };
      deepEqual(_.pairs(object), [['0', 'a'], ['1', 'b'], ['length', 2]]);
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.parseInt');

  (function() {
    test('should accept a `radix` argument', 1, function() {
      var expected = _.range(2, 37);

      var actual = _.map(expected, function(radix) {
        return _.parseInt('10', radix);
      });

      deepEqual(actual, expected);
    });

    test('should use a radix of `10`, for non-hexadecimals, if `radix` is `undefined` or `0`', 4, function() {
      strictEqual(_.parseInt('10'), 10);
      strictEqual(_.parseInt('10', 0), 10);
      strictEqual(_.parseInt('10', 10), 10);
      strictEqual(_.parseInt('10', undefined), 10);
    });

    test('should use a radix of `16`, for hexadecimals, if `radix` is `undefined` or `0`', 8, function() {
      _.each(['0x20', '0X20'], function(string) {
        strictEqual(_.parseInt(string), 32);
        strictEqual(_.parseInt(string, 0), 32);
        strictEqual(_.parseInt(string, 16), 32);
        strictEqual(_.parseInt(string, undefined), 32);
      });
    });

    test('should use a radix of `10` for string with leading zeros', 2, function() {
      strictEqual(_.parseInt('08'), 8);
      strictEqual(_.parseInt('08', 10), 8);
    });

    test('should parse strings with leading whitespace (test in Chrome, Firefox, and Opera)', 8, function() {
      strictEqual(_.parseInt(whitespace + '10'), 10);
      strictEqual(_.parseInt(whitespace + '10', 10), 10);

      strictEqual(_.parseInt(whitespace + '08'), 8);
      strictEqual(_.parseInt(whitespace + '08', 10), 8);

      _.each(['0x20', '0X20'], function(string) {
        strictEqual(_.parseInt(whitespace + string), 32);
        strictEqual(_.parseInt(whitespace + string, 16), 32);
      });
    });

    test('should coerce `radix` to a number', 2, function() {
      var object = { 'valueOf': function() { return 0; } };
      strictEqual(_.parseInt('08', object), 8);
      strictEqual(_.parseInt('0x20', object), 32);
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('partial methods');

  _.each(['partial', 'partialRight'], function(methodName) {
    var func = _[methodName],
        isPartial = methodName == 'partial';

    test('`_.' + methodName + '` partially applies arguments', 1, function() {
      var par = func(_.identity, 'a');
      strictEqual(par(), 'a');
    });

    test('`_.' + methodName + '` creates a function that can be invoked with additional arguments', 1, function() {
      var expected = ['a', 'b'],
          fn = function(a, b) { return [a, b]; },
          par = func(fn, 'a');

      deepEqual(par('b'), isPartial ? expected : expected.reverse());
    });

    test('`_.' + methodName + '` works when there are no partially applied arguments and the created function is invoked without additional arguments', 1, function() {
      var fn = function() { return arguments.length; },
          par = func(fn);

      strictEqual(par(), 0);
    });

    test('`_.' + methodName + '` works when there are no partially applied arguments and the created function is invoked with additional arguments', 1, function() {
      var par = func(_.identity);
      strictEqual(par('a'), 'a');
    });

    test('`_.' + methodName + '` should support placeholders', 4, function() {
      if (!isModularize) {
        var fn = function() { return slice.call(arguments); },
            par = func(fn, _, 'b', _);

        deepEqual(par('a', 'c'), ['a', 'b', 'c']);
        deepEqual(par('a'), ['a', 'b', undefined]);
        deepEqual(par(), [undefined, 'b', undefined]);

        if (isPartial) {
          deepEqual(par('a', 'c', 'd'), ['a', 'b', 'c', 'd']);
        } else {
          par = func(fn, _, 'c', _);
          deepEqual(par('a', 'b', 'd'), ['a', 'b', 'c', 'd']);
        }
      }
      else {
        skipTest(4);
      }
    });

    test('`_.' + methodName + '` should not alter the `this` binding', 3, function() {
      var fn = function() { return this.a; },
          object = { 'a': 1 };

      var par = func(_.bind(fn, object));
      strictEqual(par(), object.a);

      par = _.bind(func(fn), object);
      strictEqual(par(), object.a);

      object.par = func(fn);
      strictEqual(object.par(), object.a);
    });

    test('`_.' + methodName + '` creates a function with a `length` of `0`', 1, function() {
      var fn = function(a, b, c) {},
          par = func(fn, 'a');

      strictEqual(par.length, 0);
    });

    test('`_.' + methodName + '` ensure `new partialed` is an instance of `func`', 2, function() {
      function Foo(value) {
        return value && object;
      }

      var object = {},
          par = func(Foo);

      ok(new par instanceof Foo);
      strictEqual(new par(true), object);
    });

    test('`_.' + methodName + '` should clone metadata for created functions', 3, function() {
      var greet = function(greeting, name) {
        return greeting + ' ' + name;
      };

      var par1 = func(greet, 'hi'),
          par2 = func(par1, 'barney'),
          par3 = func(par1, 'pebbles');

      strictEqual(par1('fred'), isPartial ? 'hi fred' : 'fred hi');
      strictEqual(par2(), isPartial ? 'hi barney'  : 'barney hi');
      strictEqual(par3(), isPartial ? 'hi pebbles' : 'pebbles hi');
    });

    test('`_.' + methodName + '` should work with curried methods', 2, function() {
      var fn = function(a, b, c) { return a + b + c; },
          curried = _.curry(func(fn, 1), 2);

      strictEqual(curried(2, 3), 6);
      strictEqual(curried(2)(3), 6);
    });
  });

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.partialRight');

  (function() {
    test('should work as a deep `_.defaults`', 1, function() {
      var object = { 'a': { 'b': 1 } },
          source = { 'a': { 'b': 2, 'c': 3 } },
          expected = { 'a': { 'b': 1, 'c': 3 } };

      var defaultsDeep = _.partialRight(_.merge, function deep(value, other) {
        return _.merge(value, other, deep);
      });

      deepEqual(defaultsDeep(object, source), expected);
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('methods using `createWrapper`');

  (function() {
    test('combinations of partial functions should work', 1, function() {
      function fn() {
        return slice.call(arguments);
      }

      var a = _.partial(fn),
          b = _.partialRight(a, 3),
          c = _.partial(b, 1);

      deepEqual(c(2), [1, 2, 3]);
    });

    test('combinations of bound and partial functions should work', 3, function() {
      function fn() {
        var result = [this.a];
        push.apply(result, arguments);
        return result;
      }

      var expected = [1, 2, 3, 4],
          object = { 'a': 1, 'fn': fn };

      var a = _.bindKey(object, 'fn'),
          b = _.partialRight(a, 4),
          c = _.partial(b, 2);

      deepEqual(c(3), expected);

      a = _.bind(fn, object);
      b = _.partialRight(a, 4);
      c = _.partial(b, 2);

      deepEqual(c(3), expected);

      a = _.partial(fn, 2);
      b = _.bind(a, object);
      c = _.partialRight(b, 4);

      deepEqual(c(3), expected);
    });

    test('recursively bound functions should work', 1, function() {
      function fn() {
        return this.a;
      }

      var a = _.bind(fn, { 'a': 1 }),
          b = _.bind(a,  { 'a': 2 }),
          c = _.bind(b,  { 'a': 3 });

      strictEqual(c(), 1);
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.partition');

  (function() {
    var array = [1, 0, 1];

    test('should always return two groups of elements', 3, function() {
      deepEqual(_.partition([], _.identity), [[], []]);
      deepEqual(_.partition(array, _.constant(true)), [array, []]);
      deepEqual(_.partition(array, _.constant(false)), [[], array]);
    });

    test('should use `_.identity` when no `callback` is provided', 1, function() {
      var actual = _.partition(array);
      deepEqual(actual, [[1, 1], [0]]);
    });

    test('should pass the correct `callback` arguments', 1, function() {
      var args;

      _.partition(array, function() {
        args || (args = slice.call(arguments));
      });

      deepEqual(args, [1, 0, array]);
    });

    test('should support the `thisArg` argument', 1, function() {
      var actual = _.partition([1.1, 0.2, 1.3], function(num) {
        return this.floor(num);
      }, Math);

      deepEqual(actual, [[1.1, 1.3], [0.2]]);
    });

    test('should work with an object for `collection`', 1, function() {
      var actual = _.partition({ 'a': 1.1, 'b': 0.2, 'c': 1.3 }, function(num) {
        return Math.floor(num);
      });

      deepEqual(actual, [[1.1, 1.3], [0.2]]);
    });

    test('should work with a number for `callback`', 2, function() {
      var array = [
        [1, 0],
        [0, 1],
        [1, 0]
      ];

      deepEqual(_.partition(array, 0), [[array[0], array[2]], [array[1]]]);
      deepEqual(_.partition(array, 1), [[array[1]], [array[0], array[2]]]);
    });

    test('should work with a string for `callback`', 1, function() {
      var objects = [{ 'a': 1 }, { 'a': 1 }, { 'b': 2 }],
          actual = _.partition(objects, 'a');

      deepEqual(actual, [objects.slice(0, 2), objects.slice(2)]);
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.pick');

  (function() {
    var args = arguments,
        object = { 'a': 1, 'b': 2, 'c': 3 },
        expected = { 'a': 1, 'c': 3 };

    test('should create an object of picked properties', 2, function() {
      deepEqual(_.pick(object, 'a'), { 'a': 1 });
      deepEqual(_.pick(object, 'a', 'c'), expected);
    });

    test('should support picking an array of properties', 1, function() {
      deepEqual(_.pick(object, ['a', 'c']), expected);
    });

    test('should support picking an array of properties and individual properties', 1, function() {
      deepEqual(_.pick(object, ['a'], 'c'), expected);
    });

    test('should iterate over inherited properties', 1, function() {
      function Foo() {}
      Foo.prototype = object;

      deepEqual(_.pick(new Foo, 'a', 'c'), expected);
    });

    test('should work with `arguments` objects as secondary arguments', 1, function() {
      deepEqual(_.pick(object, args), expected);
    });

    test('should work with an array `object` argument', 1, function() {
      deepEqual(_.pick([1, 2, 3], '1'), { '1': 2 });
    });

    test('should work with a callback argument', 1, function() {
      var actual = _.pick(object, function(num) {
        return num != 2;
      });

      deepEqual(actual, expected);
    });

    test('should pass the correct `callback` arguments', 1, function() {
      var args,
          object = { 'a': 1, 'b': 2 },
          lastKey = _.keys(object).pop();

      var expected = lastKey == 'b'
        ? [1, 'a', object]
        : [2, 'b', object];

      _.pick(object, function() {
        args || (args = slice.call(arguments));
      });

      deepEqual(args, expected);
    });

    test('should correctly set the `this` binding', 1, function() {
      var actual = _.pick(object, function(num) {
        return num != this.b;
      }, { 'b': 2 });

      deepEqual(actual, expected);
    });

    test('should coerce property names to strings', 1, function() {
      deepEqual(_.pick({ '0': 'a', '1': 'b' }, 0), { '0': 'a' });
    });
  }('a', 'c'));

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.pluck');

  (function() {
    test('should return an array of property values from each element of a collection', 1, function() {
      var objects = [{ 'name': 'barney', 'age': 36 }, { 'name': 'fred', 'age': 40 }],
          actual = _.pluck(objects, 'name');

      deepEqual(actual, ['barney', 'fred']);
    });

    test('should work with an object for `collection`', 1, function() {
      var object = { 'a': [1], 'b': [1, 2], 'c': [1, 2, 3] };
      deepEqual(_.pluck(object, 'length'), [1, 2, 3]);
    });

    test('should work with nullish elements', 1, function() {
      var objects = [{ 'a': 1 }, null, undefined, { 'a': 4 }];
      deepEqual(_.pluck(objects, 'a'), [1, undefined, undefined, 4]);
    });

    test('should coerce `key` to a string', 1, function() {
      function fn() {}
      fn.toString = _.constant('fn');

      var objects = [{ 'null': 1 }, { 'undefined': 2 }, { 'fn': 3 }, { '[object Object]': 4 }],
          values = [null, undefined, fn, {}]

      var actual = _.map(objects, function(object, index) {
        return _.pluck([object], values[index]);
      });

      deepEqual(actual, [[1], [2], [3], [4]]);
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.property');

  (function() {
    test('should create a function that plucks a property value of a given object', 3, function() {
      var object = { 'a': 1, 'b': 2 },
          property = _.property('a');

      strictEqual(property.length, 1);
      strictEqual(property(object), 1);

      property = _.property('b');
      strictEqual(property(object), 2);
    });

    test('should work with non-string `prop` arguments', 1, function() {
      var array = [1, 2, 3],
          property = _.property(1);

      strictEqual(property(array), 2);
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.pull');

  (function() {
    test('should modify and return the array', 2, function() {
      var array = [1, 2, 3],
          actual = _.pull(array, 1, 3);

      deepEqual(array, [2]);
      ok(actual === array);
    });

    test('should preserve holes in arrays', 2, function() {
      var array = [1, 2, 3, 4];
      delete array[1];
      delete array[3];

      _.pull(array, 1);
      ok(!('0' in array));
      ok(!('2' in array));
    });

    test('should treat holes as `undefined`', 1, function() {
      var array = [1, 2, 3];
      delete array[1];

      _.pull(array, undefined);
      deepEqual(array, [1, 3]);
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.pullAt');

  (function() {
    test('should modify the array and return removed elements', 2, function() {
      var array = [1, 2, 3],
          actual = _.pullAt(array, [0, 1]);

      deepEqual(array, [3]);
      deepEqual(actual, [1, 2]);
    });

    test('should work with unsorted indexes', 2, function() {
      var array = [1, 2, 3, 4],
          actual = _.pullAt(array, [1, 3, 0]);

      deepEqual(array, [3]);
      deepEqual(actual, [2, 4, 1]);
    });

    test('should work with repeated indexes', 2, function() {
      var array = [1, 2, 3, 4],
          actual = _.pullAt(array, [0, 2, 0, 1, 0, 2]);

      deepEqual(array, [4]);
      deepEqual(actual, [1, 3, 1, 2, 1, 3]);
    });

    test('should return `undefined` for nonexistent keys', 2, function() {
      var array = ['a', 'b',  'c'],
          actual = _.pullAt(array, [2, 4, 0]);

      deepEqual(array, ['b']);
      deepEqual(actual, ['c', undefined, 'a']);
    });

    test('should return an empty array when no keys are provided', 2, function() {
      var array = ['a', 'b', 'c'],
          actual = _.pullAt(array);

      deepEqual(array, ['a', 'b', 'c']);
      deepEqual(actual, []);
    });

    test('should accept multiple index arguments', 2, function() {
      var array = ['a', 'b', 'c', 'd'],
          actual = _.pullAt(array, 3, 0, 2);

      deepEqual(array, ['b']);
      deepEqual(actual, ['d', 'a', 'c']);
    });

    test('should ignore non-index values', 2, function() {
      var array = ['a', 'b', 'c'],
          clone = array.slice();

      var values = _.reject(empties, function(value) {
        return value === 0 || _.isArray(value);
      }).concat(-1, 1.1);

      var expected = _.map(values, _.constant(undefined)),
          actual = _.pullAt.apply(_, [array].concat(values));

      deepEqual(actual, expected);
      deepEqual(array, clone);
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.random');

  (function() {
    var array = Array(1000);

    test('should return `0` or `1` when arguments are not provided', 1, function() {
      var actual = _.map(array, function() {
        return _.random();
      });

      deepEqual(_.uniq(actual).sort(), [0, 1]);
    });

    test('supports not providing a `max` argument', 1, function() {
      ok(_.some(array, function() {
        return _.random(5) !== 5;
      }));
    });

    test('supports large integer values', 2, function() {
      var min = Math.pow(2, 31),
          max = Math.pow(2, 62);

      ok(_.every(array, function() {
        return _.random(min, max) >= min;
      }));

      ok(_.some(array, function() {
        return _.random(Number.MAX_VALUE) > 0;
      }));
    });

    test('should coerce arguments to numbers', 1, function() {
      strictEqual(_.random('1', '1'), 1);
    });

    test('should support floats', 2, function() {
      var min = 1.5,
          max = 1.6,
          actual = _.random(min, max);

      ok(actual % 1);
      ok(actual >= min && actual <= max);
    });

    test('supports providing a `floating` argument', 3, function() {
      var actual = _.random(true);
      ok(actual % 1 && actual >= 0 && actual <= 1);

      actual = _.random(2, true);
      ok(actual % 1 && actual >= 0 && actual <= 2);

      actual = _.random(2, 4, true);
      ok(actual % 1 && actual >= 2 && actual <= 4);
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.range');

  (function() {
    test('should work with a single `end` argument', 1, function() {
      deepEqual(_.range(4), [0, 1, 2, 3]);
    });

    test('should work with `start` and `end` arguments', 1, function() {
      deepEqual(_.range(1, 5), [1, 2, 3, 4]);
    });

    test('should work with `start`, `end`, and `step` arguments', 1, function() {
      deepEqual(_.range(0, 20, 5), [0, 5, 10, 15]);
    });

    test('should support a `step` of `0`', 1, function() {
      deepEqual(_.range(1, 4, 0), [1, 1, 1]);
    });

    test('should work with a `step` larger than `end`', 1, function() {
      deepEqual(_.range(1, 5, 20), [1]);
    });

    test('should work with a negative `step` argument', 2, function() {
      deepEqual(_.range(0, -4, -1), [0, -1, -2, -3]);
      deepEqual(_.range(21, 10, -3), [21, 18, 15, 12]);
    });

    test('should treat falsey `start` arguments as `0`', 13, function() {
      _.each(falsey, function(value, index) {
        if (index) {
          deepEqual(_.range(value), []);
          deepEqual(_.range(value, 1), [0]);
        } else {
          deepEqual(_.range(), []);
        }
      });
    });

    test('should coerce arguments to finite numbers', 1, function() {
      var actual = [_.range('0', 1), _.range('1'), _.range(0, 1, '1'), _.range(NaN), _.range(NaN, NaN)];
      deepEqual(actual, [[0], [0], [0], [], []]);
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.reduce');

  (function() {
    var array = [1, 2, 3];

    test('should use the first element of a collection as the default `accumulator`', 1, function() {
      strictEqual(_.reduce(array), 1);
    });

    test('should pass the correct `callback` arguments when iterating an array', 2, function() {
      var args;

      _.reduce(array, function() {
        args || (args = slice.call(arguments));
      }, 0);

      deepEqual(args, [0, 1, 0, array]);

      args = null;
      _.reduce(array, function() {
        args || (args = slice.call(arguments));
      });

      deepEqual(args, [1, 2, 1, array]);
    });

    test('should pass the correct `callback` arguments when iterating an object', 2, function() {
      var args,
          object = { 'a': 1, 'b': 2 },
          firstKey = _.first(_.keys(object));

      var expected = firstKey == 'a'
        ? [0, 1, 'a', object]
        : [0, 2, 'b', object];

      _.reduce(object, function() {
        args || (args = slice.call(arguments));
      }, 0);

      deepEqual(args, expected);

      args = null;
      expected = firstKey == 'a'
        ? [1, 2, 'b', object]
        : [2, 1, 'a', object];

      _.reduce(object, function() {
        args || (args = slice.call(arguments));
      });

      deepEqual(args, expected);
    });

    _.each({
      'literal': 'abc',
      'object': Object('abc')
    },
    function(collection, key) {
      test('should work with a string ' + key + ' for `collection` (test in IE < 9)', 2, function() {
        var args;

        var actual = _.reduce(collection, function(accumulator, value) {
          args || (args = slice.call(arguments));
          return accumulator + value;
        });

        deepEqual(args, ['a', 'b', 1, collection]);
        strictEqual(actual, 'abc');
      });
    });

    test('should be aliased', 2, function() {
      strictEqual(_.foldl, _.reduce);
      strictEqual(_.inject, _.reduce);
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.reduceRight');

  (function() {
    var array = [1, 2, 3];

    test('should use the last element of a collection as the default `accumulator`', 1, function() {
      strictEqual(_.reduceRight(array), 3);
    });

    test('should pass the correct `callback` arguments when iterating an array', 2, function() {
      var args;

      _.reduceRight(array, function() {
        args || (args = slice.call(arguments));
      }, 0);

      deepEqual(args, [0, 3, 2, array]);

      args = null;
      _.reduceRight(array, function() {
        args || (args = slice.call(arguments));
      });

      deepEqual(args, [3, 2, 1, array]);
    });

    test('should pass the correct `callback` arguments when iterating an object', 2, function() {
      var args,
          object = { 'a': 1, 'b': 2 },
          lastKey = _.last(_.keys(object));

      var expected = lastKey == 'b'
        ? [0, 2, 'b', object]
        : [0, 1, 'a', object];

      _.reduceRight(object, function() {
        args || (args = slice.call(arguments));
      }, 0);

      deepEqual(args, expected);

      args = null;
      expected = lastKey == 'b'
        ? [2, 1, 'a', object]
        : [1, 2, 'b', object];

      _.reduceRight(object, function() {
        args || (args = slice.call(arguments));
      });

      deepEqual(args, expected);
    });

    _.each({
      'literal': 'abc',
      'object': Object('abc')
    },
    function(collection, key) {
      test('should work with a string ' + key + ' for `collection` (test in IE < 9)', 2, function() {
        var args;

        var actual = _.reduceRight(collection, function(accumulator, value) {
          args || (args = slice.call(arguments));
          return accumulator + value;
        });

        deepEqual(args, ['c', 'b', 1, collection]);
        strictEqual(actual, 'cba');
      });
    });

    test('should be aliased', 1, function() {
      strictEqual(_.foldr, _.reduceRight);
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('reduce methods');

  _.each(['reduce', 'reduceRight'], function(methodName) {
    var array = [1, 2, 3],
        func = _[methodName];

    test('`_.' + methodName + '` should reduce a collection to a single value', 1, function() {
      var actual = func(['a', 'b', 'c'], function(accumulator, value) {
        return accumulator + value;
      }, '');

      strictEqual(actual, methodName == 'reduce' ? 'abc' : 'cba');
    });

    test('`_.' + methodName + '` should support the `thisArg` argument', 1, function() {
      var actual = func(array, function(sum, num, index) {
        return sum + this[index];
      }, 0, array);

      deepEqual(actual, 6);
    });

    test('`_.' + methodName + '` should support empty or falsey collections without an initial `accumulator` value', 1, function() {
      var actual = [],
          expected = _.map(empties, _.constant());

      _.each(empties, function(value) {
        try {
          actual.push(func(value, _.noop));
        } catch(e) { }
      });

      deepEqual(actual, expected);
    });

    test('`_.' + methodName + '` should support empty or falsey collections with an initial `accumulator` value', 1, function() {
      var expected = _.map(empties, _.constant('x'));

      var actual = _.map(empties, function(value) {
        try {
          return func(value, _.noop, 'x');
        } catch(e) { }
      });

      deepEqual(actual, expected);
    });

    test('`_.' + methodName + '` should handle an initial `accumulator` value of `undefined`', 1, function() {
      var actual = func([], _.noop, undefined);
      strictEqual(actual, undefined);
    });

    test('`_.' + methodName + '` should return `undefined` for empty collections when no `accumulator` is provided (test in IE > 9 and modern browsers)', 2, function() {
      var array = [],
          object = { '0': 1, 'length': 0 };

      if ('__proto__' in array) {
        array.__proto__ = object;
        strictEqual(_.reduce(array, _.noop), undefined);
      }
      else {
        skipTest();
      }
      strictEqual(_.reduce(object, _.noop), undefined);
    });

    test('`_.' + methodName + '` should return an unwrapped value when chaining', 1, function() {
      if (!isNpm) {
        var actual = _(array)[methodName](function(sum, num) {
          return sum + num;
        });

        strictEqual(actual, 6);
      }
      else {
        skipTest();
      }
    });
  });

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.reject');

  (function() {
    test('should return elements the `callback` returns falsey for', 1, function() {
      var actual = _.reject([1, 2, 3], function(num) {
        return num % 2;
      });

      deepEqual(actual, [2]);
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('filter methods');

  _.each(['filter', 'reject'], function(methodNames) {
    var func = _[methodNames];

    test('`_.' + methodNames + '` should not modify the resulting value from within `callback`', 1, function() {
      var actual = func([0], function(num, index, array) {
        array[index] = 1;
        return methodNames == 'filter';
      });

      deepEqual(actual, [0]);
    });
  });

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.remove');

  (function() {
    test('should modify the array and return removed elements', 2, function() {
      var array = [1, 2, 3];

      var actual = _.remove(array, function(num) {
        return num < 3;
      });

      deepEqual(array, [3]);
      deepEqual(actual, [1, 2]);
    });

    test('should pass the correct `predicate` arguments', 1, function() {
      var args,
          array = [1, 2, 3];

      _.remove(array, function() {
        args || (args = slice.call(arguments));
      });

      deepEqual(args, [1, 0, array]);
    });

    test('should support the `thisArg` argument', 1, function() {
      var array = [1, 2, 3];

      var actual = _.remove(array, function(num, index) {
        return this[index] < 3;
      }, array);

      deepEqual(actual, [1, 2]);
    });

    test('should preserve holes in arrays', 2, function() {
      var array = [1, 2, 3, 4];
      delete array[1];
      delete array[3];

      _.remove(array, function(num) { return num === 1; });
      ok(!('0' in array));
      ok(!('2' in array));
    });

    test('should treat holes as `undefined`', 1, function() {
      var array = [1, 2, 3];
      delete array[1];

      _.remove(array, function(num) { return num == null; });
      deepEqual(array, [1, 3]);
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.repeat');

  (function() {
    test('should repeat a string `n` times', 2, function() {
      strictEqual(_.repeat('*', 3), '***');
      strictEqual(_.repeat('abc', 2), 'abcabc');
    });

    test('should return an empty string for negative `n` or `n` of `0`', 2, function() {
      strictEqual(_.repeat('abc', 0), '');
      strictEqual(_.repeat('abc', -2), '');
    });

    test('should coerce `n` to a number', 3, function() {
      strictEqual(_.repeat('abc'), '');
      strictEqual(_.repeat('abc', '2'), 'abcabc');
      strictEqual(_.repeat('*', { 'valueOf': _.constant(3) }), '***');
    });

    test('should coerce `string` to a string', 2, function() {
      strictEqual(_.repeat(Object('abc'), 2), 'abcabc');
      strictEqual(_.repeat({ 'toString': _.constant('*') }, 3), '***');
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.result');

  (function() {
    var object = {
      'a': 1,
      'b': null,
      'c': function() { return this.a; }
    };

    test('should resolve property values', 4, function() {
      strictEqual(_.result(object, 'a'), 1);
      strictEqual(_.result(object, 'b'), null);
      strictEqual(_.result(object, 'c'), 1);
      strictEqual(_.result(object, 'd'), undefined);
    });

    test('should return `undefined` when `object` is nullish', 2, function() {
      strictEqual(_.result(null, 'a'), undefined);
      strictEqual(_.result(undefined, 'a'), undefined);
    });

    test('should return the specified default value for undefined properties', 1, function() {
      var values = falsey.concat(1, _.constant(1));

      var expected = _.transform(values, function(result, value) {
        result.push(value, value);
      });

      var actual = _.transform(values, function(result, value) {
        result.push(
          _.result(object, 'd', value),
          _.result(null, 'd', value)
        );
      });

      deepEqual(actual, expected);
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.rest');

  (function() {
    var array = [1, 2, 3];

    test('should accept a falsey `array` argument', 1, function() {
      var expected = _.map(falsey, _.constant([]));

      var actual = _.map(falsey, function(value, index) {
        try {
          return index ? _.rest(value) : _.rest();
        } catch(e) { }
      });

      deepEqual(actual, expected);
    });

    test('should exclude the first element', 1, function() {
      deepEqual(_.rest(array), [2, 3]);
    });

    test('should return an empty when querying empty arrays', 1, function() {
      deepEqual(_.rest([]), []);
    });

    test('should work when used as a callback for `_.map`', 1, function() {
      var array = [[1, 2, 3], [4, 5, 6], [7, 8, 9]],
          actual = _.map(array, _.rest);

      deepEqual(actual, [[2, 3], [5, 6], [8, 9]]);
    });

    test('should return a wrapped value when chaining', 2, function() {
      if (!isNpm) {
        var actual = _(array).rest();
        ok(actual instanceof _);
        deepEqual(actual.value(), [2, 3]);
      }
      else {
        skipTest(2);
      }
    });

    test('should be aliased', 1, function() {
      strictEqual(_.tail, _.rest);
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.runInContext');

  (function() {
    test('should not require a fully populated `context` object', 1, function() {
      if (!isModularize) {
        var lodash = _.runInContext({
          'setTimeout': function(callback) {
            callback();
          }
        });

        var pass = false;
        lodash.delay(function() { pass = true; }, 32);
        ok(pass);
      }
      else {
        skipTest();
      }
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.sample');

  (function() {
    var array = [1, 2, 3];

    test('should return a random element', 1, function() {
      var actual = _.sample(array);
      ok(_.contains(array, actual));
    });

    test('should return two random elements', 1, function() {
      var actual = _.sample(array, 2);
      ok(actual[0] !== actual[1] && _.contains(array, actual[0]) && _.contains(array, actual[1]));
    });

    test('should contain elements of the collection', 1, function() {
      var actual = _.sample(array, array.length);
      deepEqual(actual.sort(), array);
    });

    test('should treat falsey `n` values, except nullish, as `0`', 1, function() {
      var expected = _.map(falsey, function(value) {
        return value == null ? 1 : [];
      });

      var actual = _.map(falsey, function(n) {
        return _.sample([1], n);
      });

      deepEqual(actual, expected);
    });

    test('should return an empty array when `n` < `1` or `NaN`', 3, function() {
      _.each([0, -1, -Infinity], function(n) {
        deepEqual(_.sample(array, n), []);
      });
    });

    test('should return all elements when `n` >= `array.length`', 4, function() {
      _.each([3, 4, Math.pow(2, 32), Infinity], function(n) {
        deepEqual(_.sample(array, n).sort(), array);
      });
    });

    test('should return `undefined` when sampling an empty array', 1, function() {
      strictEqual(_.sample([]), undefined);
    });

    test('should return an empty array for empty or falsey collections', 1, function() {
      var actual = [];

      var expected = _.transform(empties, function(result) {
        result.push([], []);
      });

      _.each(empties, function(value) {
        try {
          actual.push(_.shuffle(value), _.shuffle(value, 1));
        } catch(e) { }
      });

      deepEqual(actual, expected);
    });

    test('should sample an object', 2, function() {
      var object = { 'a': 1, 'b': 2, 'c': 3 },
          actual = _.sample(object);

      ok(_.contains(array, actual));

      actual = _.sample(object, 2);
      ok(actual[0] !== actual[1] && _.contains(array, actual[0]) && _.contains(array, actual[1]));
    });

    test('should work when used as a callback for `_.map`', 1, function() {
      var a = [1, 2, 3],
          b = [4, 5, 6],
          c = [7, 8, 9],
          actual = _.map([a, b, c], _.sample);

      ok(_.contains(a, actual[0]) && _.contains(b, actual[1]) && _.contains(c, actual[2]));
    });

    test('should chain when `n` is provided', 1, function() {
      if (!isNpm) {
        var actual = _(array).sample(2);
        ok(actual instanceof _);
      }
      else {
        skipTest();
      }
    });

    test('should not chain when arguments are not provided', 1, function() {
      if (!isNpm) {
        var actual = _(array).sample();
        ok(_.contains(array, actual));
      }
      else {
        skipTest();
      }
    });

    _.each({
      'literal': 'abc',
      'object': Object('abc')
    },
    function(collection, key) {
      test('should work with a string ' + key + ' for `collection`', 2, function() {
        var actual = _.sample(collection);
        ok(_.contains(collection, actual));

        actual = _.sample(collection, 2);
        ok(actual[0] !== actual[1] && _.contains(collection, actual[0]) && _.contains(collection, actual[1]));
      });
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.shuffle');

  (function() {
    var array = [1, 2, 3],
        object = { 'a': 1, 'b': 2, 'c': 3 };

    test('should return a new array', 1, function() {
      notStrictEqual(_.shuffle(array), array);
    });

    test('should contain the same elements after a collection is shuffled', 2, function() {
      deepEqual(_.shuffle(array).sort(), array);
      deepEqual(_.shuffle(object).sort(), array);
    });

    test('should shuffle an object', 1, function() {
      var actual = _.shuffle(object);
      deepEqual(actual.sort(), array);
    });

    test('should treat number values for `collection` as empty', 1, function() {
      deepEqual(_.shuffle(1), []);
    });

    _.each({
      'literal': 'abc',
      'object': Object('abc')
    },
    function(collection, key) {
      test('should work with a string ' + key + ' for `collection`', 1, function() {
        var actual = _.shuffle(collection);
        deepEqual(actual.sort(), ['a','b', 'c']);
      });
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.size');

  (function() {
    var args = arguments,
        array = [1, 2, 3];

    test('should return the number of own enumerable properties of an object', 1, function() {
      strictEqual(_.size({ 'one': 1, 'two': 2, 'three': 3 }), 3);
    });

    test('should return the length of an array', 1, function() {
      strictEqual(_.size(array), 3);
    });

    test('should accept a falsey `object` argument', 1, function() {
      var expected = _.map(falsey, _.constant(0));

      var actual = _.map(falsey, function(value, index) {
        try {
          return index ? _.size(value) : _.size();
        } catch(e) { }
      });

      deepEqual(actual, expected);
    });

    test('should work with `arguments` objects (test in IE < 9)', 1, function() {
      strictEqual(_.size(args), 3);
    });

    test('should work with jQuery/MooTools DOM query collections', 1, function() {
      function Foo(elements) { push.apply(this, elements); }
      Foo.prototype = { 'length': 0, 'splice': Array.prototype.splice };

      strictEqual(_.size(new Foo(array)), 3);
    });

    test('should not treat objects with negative lengths as array-like', 1, function() {
      strictEqual(_.size({ 'length': -1 }), 1);
    });

    test('should not treat objects with lengths larger than `maxSafeInteger` as array-like', 1, function() {
      strictEqual(_.size({ 'length': maxSafeInteger + 1 }), 1);
    });

    test('should not treat objects with non-number lengths as array-like', 1, function() {
      strictEqual(_.size({ 'length': '0' }), 1);
    });

    test('fixes the JScript `[[DontEnum]]` bug (test in IE < 9)', 1, function() {
      strictEqual(_.size(shadowedObject), 7);
    });

    _.each({
      'literal': 'abc',
      'object': Object('abc')
    },
    function(collection, key) {
      test('should work with a string ' + key + ' for `collection`', 1, function() {
        deepEqual(_.size(collection), 3);
      });
    });
  }(1, 2, 3));

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.slice');

  (function() {
    var array = [1, 2, 3];

    test('should work with a positive `start`', 1, function() {
      deepEqual(_.slice(array, 1), [2, 3]);
    });

    test('should work with a `start` >= `array.length`', 4, function() {
      _.each([3, 4, Math.pow(2, 32), Infinity], function(start) {
        deepEqual(_.slice(array, start), []);
      });
    });

    test('should treat falsey `start` values as `0`', 1, function() {
      var expected = _.map(falsey, _.constant(array));

      var actual = _.map(falsey, function(start) {
        return _.slice(array, start);
      });

      deepEqual(actual, expected);
    });

    test('should work with a negative `start`', 1, function() {
      deepEqual(_.slice(array, -1), [3]);
    });

    test('should work with a negative `start` <= negative `array.length`', 3, function() {
      _.each([-3, -4, -Infinity], function(start) {
        deepEqual(_.slice(array, start), [1, 2, 3]);
      });
    });

    test('should work with a positive `end`', 1, function() {
      deepEqual(_.slice(array, 0, 1), [1]);
    });

    test('should work with a `end` >= `array.length`', 4, function() {
      _.each([3, 4, Math.pow(2, 32), Infinity], function(end) {
        deepEqual(_.slice(array, 0, end), [1, 2, 3]);
      });
    });

    test('should treat falsey `end` values, except `undefined`, as `0`', 1, function() {
      var expected = _.map(falsey, function(value) {
        return value === undefined ? array : [];
      });

      var actual = _.map(falsey, function(end) {
        return _.slice(array, 0, end);
      });

      deepEqual(actual, expected);
    });

    test('should work with a negative `end`', 1, function() {
      deepEqual(_.slice(array, 0, -1), [1, 2]);
    });

    test('should work with a negative `end` <= negative `array.length`', 3, function() {
      _.each([-3, -4, -Infinity], function(end) {
        deepEqual(_.slice(array, 0, end), []);
      });
    });

    test('should coerce `start` and `end` to finite numbers', 1, function() {
      var actual = [_.slice(array, '0', 1), _.slice(array, 0, '1'), _.slice(array, '1'), _.slice(array, NaN, 1), _.slice(array, 1, NaN)];
      deepEqual(actual, [[1], [1], [2, 3], [1], []]);
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.some');

  (function() {
    test('should return `false` for empty or falsey collections', 1, function() {
      var expected = _.map(empties, _.constant(false));

      var actual = _.map(empties, function(value) {
        try {
          return _.some(value, _.identity);
        } catch(e) { }
      });

      deepEqual(actual, expected);
    });

    test('should return `true` if `predicate` returns truthy for any element in the collection', 2, function() {
      strictEqual(_.some([false, 1, ''], _.identity), true);
      strictEqual(_.some([null, 'x', 0], _.identity), true);
    });

    test('should return `false` if `predicate` returns falsey for all elements in the collection', 2, function() {
      strictEqual(_.some([false, false, false], _.identity), false);
      strictEqual(_.some([null, 0, ''], _.identity), false);
    });

    test('should return `true` as soon as `predicate` returns truthy', 1, function() {
      strictEqual(_.some([null, true, null], _.identity), true);
    });

    test('should use `_.identity` when no predicate is provided', 2, function() {
      strictEqual(_.some([0, 1]), true);
      strictEqual(_.some([0, 0]), false);
    });

    test('should be aliased', 1, function() {
      strictEqual(_.any, _.some);
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.sortBy');

  (function() {
    function Pair(a, b, c) {
      this.a = a;
      this.b = b;
      this.c = c;
    }

    var objects = [
      { 'a': 'x', 'b': 3 },
      { 'a': 'y', 'b': 4 },
      { 'a': 'x', 'b': 1 },
      { 'a': 'y', 'b': 2 }
    ];

    var stableOrder = [
      new Pair(1, 1, 1), new Pair(1, 2, 1),
      new Pair(1, 1, 1), new Pair(1, 2, 1),
      new Pair(1, 3, 1), new Pair(1, 4, 1),
      new Pair(1, 5, 1), new Pair(1, 6, 1),
      new Pair(2, 1, 2), new Pair(2, 2, 2),
      new Pair(2, 3, 2), new Pair(2, 4, 2),
      new Pair(2, 5, 2), new Pair(2, 6, 2),
      new Pair(undefined, 1, 1), new Pair(undefined, 2, 1),
      new Pair(undefined, 3, 1), new Pair(undefined, 4, 1),
      new Pair(undefined, 5, 1), new Pair(undefined, 6, 1)
    ];

    test('should sort in ascending order', 1, function() {
      var actual = _.pluck(_.sortBy(objects, function(object) {
        return object.b;
      }), 'b');

      deepEqual(actual, [1, 2, 3, 4]);
    });

    test('should perform a stable sort (test in IE > 8, Opera, and V8)', 1, function() {
      var actual = _.sortBy(stableOrder, function(pair) {
        return pair.a;
      });

      deepEqual(actual, stableOrder);
    });

    test('should work with `undefined` values', 1, function() {
      var array = [undefined, 4, 1, undefined, 3, 2];
      deepEqual(_.sortBy(array, _.identity), [1, 2, 3, 4, undefined, undefined]);
    });

    test('should use `_.identity` when no predicate is provided', 1, function() {
      var actual = _.sortBy([3, 2, 1]);
      deepEqual(actual, [1, 2, 3]);
    });

    test('should pass the correct `callback` arguments', 1, function() {
      var args;

      _.sortBy(objects, function() {
        args || (args = slice.call(arguments));
      });

      deepEqual(args, [objects[0], 0, objects]);
    });

    test('should support the `thisArg` argument', 1, function() {
      var actual = _.sortBy([1, 2, 3], function(num) {
        return this.sin(num);
      }, Math);

      deepEqual(actual, [3, 1, 2]);
    });

    test('should work with a string for `callback`', 1, function() {
      var actual = _.pluck(_.sortBy(objects, 'b'), 'b');
      deepEqual(actual, [1, 2, 3, 4]);
    });

    test('should work with an object for `collection`', 1, function() {
      var actual = _.sortBy({ 'a': 1, 'b': 2, 'c': 3 }, function(num) {
        return Math.sin(num);
      });

      deepEqual(actual, [3, 1, 2]);
    });

    test('should treat number values for `collection` as empty', 1, function() {
      deepEqual(_.sortBy(1), []);
    });

    test('should support sorting by an array of properties', 1, function() {
      var actual = _.sortBy(objects, ['a', 'b']);
      deepEqual(actual, [objects[2], objects[0], objects[3], objects[1]]);
    });

    test('should perform a stable sort when sorting by multiple properties (test in IE > 8, Opera, and V8)', 1, function() {
      var actual = _.sortBy(stableOrder, ['a', 'c']);
      deepEqual(actual, stableOrder);
    });

    test('should coerce arrays returned from a callback', 1, function() {
      var actual = _.sortBy(objects, function(object) {
        var result = [object.a, object.b];
        result.toString = function() { return String(this[0]); };
        return result;
      });

      deepEqual(actual, [objects[0], objects[2], objects[1], objects[3]]);
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.sortedIndex');

  (function() {
    var array = [20, 30, 50],
        objects = [{ 'x': 20 }, { 'x': 30 }, { 'x': 50 }];

    test('should return the insert index of a given value', 2, function() {
      strictEqual(_.sortedIndex(array, 40), 2);
      strictEqual(_.sortedIndex(array, 30), 1);
    });

    test('should pass the correct `callback` arguments', 1, function() {
      var args;

      _.sortedIndex(array, 40, function() {
        args || (args = slice.call(arguments));
      });

      deepEqual(args, [40]);
    });

    test('should support the `thisArg` argument', 1, function() {
      var actual = _.sortedIndex(array, 40, function(num) {
        return this[num];
      }, { '20': 20, '30': 30, '40': 40 });

      strictEqual(actual, 2);
    });

    test('should work with a string for `callback`', 1, function() {
      var actual = _.sortedIndex(objects, { 'x': 40 }, 'x');
      strictEqual(actual, 2);
    });

    test('supports arrays with lengths larger than `Math.pow(2, 31) - 1`', 1, function() {
      var length = Math.pow(2, 32) - 1,
          index = length - 1,
          array = Array(length),
          steps = 0;

      if (array.length == length) {
        array[index] = index;
        _.sortedIndex(array, index, function() { steps++; });
        strictEqual(steps, 33);
      }
      else {
        skipTest();
      }
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.support');

  (function() {
    test('should contain properties with boolean values', 1, function() {
      ok(_.every(_.values(_.support), function(value) {
        return value === true || value === false;
      }));
    });

    test('should not contain minified properties (test production builds)', 1, function() {
      var props = [
        'argsClass',
        'argsObject',
        'dom',
        'enumErrorProps',
        'enumPrototypes',
        'fastBind',
        'funcDecomp',
        'funcNames',
        'nodeClass',
        'nonEnumArgs',
        'nonEnumShadows',
        'nonEnumStrings',
        'ownLast',
        'spliceObjects',
        'unindexedChars'
      ];

      ok(_.isEmpty(_.difference(_.keys(_.support), props)));
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.startsWith');

  (function() {
    var string = 'abc';

    test('should return `true` if a string starts with `target`', 1, function() {
      strictEqual(_.startsWith(string, 'a'), true);
    });

    test('should return `false` if a string does not start with `target`', 1, function() {
      strictEqual(_.startsWith(string, 'b'), false);
    });

    test('should work with a `position` argument', 1, function() {
      strictEqual(_.startsWith(string, 'b', 1), true);
    });

    test('should work with `position` >= `string.length`', 4, function() {
      _.each([3, 5, maxSafeInteger, Infinity], function(position) {
        strictEqual(_.startsWith(string, 'a', position), false);
      });
    });

    test('should treat falsey `position` values as `0`', 1, function() {
      var expected = _.map(falsey, _.constant(true));

      var actual = _.map(falsey, function(position) {
        return _.startsWith(string, 'a', position);
      });

      deepEqual(actual, expected);
    });

    test('should treat a negative `position` as `0`', 6, function() {
      _.each([-1, -3, -Infinity], function(position) {
        strictEqual(_.startsWith(string, 'a', position), true);
        strictEqual(_.startsWith(string, 'b', position), false);
      });
    });

    test('should always return `true` when `target` is an empty string regardless of `position`', 1, function() {
      ok(_.every([-Infinity, NaN, -3, -1, 0, 1, 2, 3, 5, maxSafeInteger, Infinity], function(position) {
        return _.startsWith(string, '', position, true);
      }));
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.startsWith and lodash.endsWith');

  _.each(['startsWith', 'endsWith'], function(methodName) {
    var func = _[methodName],
        isEndsWith = methodName == 'endsWith',
        chr = isEndsWith ? 'c' : 'a',
        string = 'abc';

    test('`_.' + methodName + '` should coerce `string` to a string', 2, function() {
      strictEqual(func(Object(string), chr), true);
      strictEqual(func({ 'toString': _.constant(string) }, chr), true);
    });

    test('`_.' + methodName + '` should coerce `target` to a string', 2, function() {
      strictEqual(func(string, Object(chr)), true);
      strictEqual(func(string, { 'toString': _.constant(chr) }), true);
    });

    test('`_.' + methodName + '` should coerce `position` to a number', 2, function() {
      var position = isEndsWith ? 2 : 1;
      strictEqual(func(string, 'b', Object(position)), true);
      strictEqual(func(string, 'b', { 'toString': _.constant(String(position)) }), true);
    });
  });

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.tap');

  (function() {
    test('should intercept and return the given value', 2, function() {
      if (!isNpm) {
        var intercepted,
            array = [1, 2, 3];

        var actual = _.tap(array, function(value) {
          intercepted = value;
        });

        strictEqual(actual, array);
        strictEqual(intercepted, array);
      }
      else {
        skipTest(2);
      }
    });

    test('should return intercept unwrapped values and return wrapped values when chaining', 2, function() {
      if (!isNpm) {
        var intercepted,
            array = [1, 2, 3];

        var actual = _(array).tap(function(value) {
          intercepted = value;
          value.pop();
        });

        ok(actual instanceof _);
        strictEqual(intercepted, array);
      }
      else {
        skipTest(2);
      }
    });

    test('should support the `thisArg` argument', 1, function() {
      if (!isNpm) {
        var array = [1, 2];

        var actual = _(array.slice()).tap(function(value) {
          value.push(this[0]);
        }, array);

        deepEqual(actual.value(), [1, 2, 1]);
      }
      else {
        skipTest();
      }
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.template');

  (function() {
    test('should escape values in "escape" delimiters', 1, function() {
      var escaped = '<p>&amp;&lt;&gt;&quot;&#39;\/</p>',
          unescaped = '&<>"\'\/';

      var compiled = _.template('<p><%- value %></p>');
      strictEqual(compiled({ 'value': unescaped }), escaped);
    });

    test('should evaluate JavaScript in "evaluate" delimiters', 1, function() {
      var compiled = _.template(
        '<ul><%\
        for (var key in collection) {\
          %><li><%= collection[key] %></li><%\
        } %></ul>'
      );

      var actual = compiled({ 'collection': { 'a': 'A', 'b': 'B' } });
      strictEqual(actual, '<ul><li>A</li><li>B</li></ul>');
    });

    test('should interpolate data object properties', 1, function() {
      var compiled = _.template('<%= a %>BC');
      strictEqual(compiled({ 'a': 'A' }), 'ABC');
    });

    test('should support escaped values in "interpolation" delimiters', 1, function() {
      var compiled = _.template('<%= a ? "a=\\"A\\"" : "" %>');
      strictEqual(compiled({ 'a': true }), 'a="A"');
    });

    test('should work with "interpolate" delimiters containing ternary operators', 1, function() {
      var compiled = _.template('<%= value ? value : "b" %>'),
          data = { 'value': 'a' };

      strictEqual(compiled(data), 'a');
    });

    test('should work with "interpolate" delimiters containing global values', 1, function() {
      var compiled = _.template('<%= typeof Math.abs %>');

      try {
        var actual = compiled();
      } catch(e) { }

      strictEqual(actual, 'function');
    });

    test('should work with complex "interpolate" delimiters', 22, function() {
      _.each({
        '<%= a + b %>': '3',
        '<%= b - a %>': '1',
        '<%= a = b %>': '2',
        '<%= !a %>': 'false',
        '<%= ~a %>': '-2',
        '<%= a * b %>': '2',
        '<%= a / b %>': '0.5',
        '<%= a % b %>': '1',
        '<%= a >> b %>': '0',
        '<%= a << b %>': '4',
        '<%= a & b %>': '0',
        '<%= a ^ b %>': '3',
        '<%= a | b %>': '3',
        '<%= {}.toString.call(0) %>': '[object Number]',
        '<%= a.toFixed(2) %>': '1.00',
        '<%= obj["a"] %>': '1',
        '<%= delete a %>': 'true',
        '<%= "a" in obj %>': 'true',
        '<%= obj instanceof Object %>': 'true',
        '<%= new Boolean %>': 'false',
        '<%= typeof a %>': 'number',
        '<%= void a %>': ''
      },
      function(value, key) {
        var compiled = _.template(key),
            data = { 'a': 1, 'b': 2 };

        strictEqual(compiled(data), value, key);
      });
    });

    test('should parse ES6 template delimiters', 2, function() {
      var data = { 'value': 2 };
      strictEqual(_.template('1${value}3')(data), '123');
      strictEqual(_.template('${"{" + value + "\\}"}')(data), '{2}');
    });

    test('should not reference `_.escape` when "escape" delimiters are not used', 1, function() {
      var compiled = _.template('<%= typeof __e %>');
      strictEqual(compiled({}), 'undefined');
    });

    test('should allow referencing variables declared in "evaluate" delimiters from other delimiters', 1, function() {
      var compiled = _.template('<% var b = a; %><%= b.value %>'),
          data = { 'a': { 'value': 1 } };

      strictEqual(compiled(data), '1');
    });

    test('should support single line comments in "evaluate" delimiters (test production builds)', 1, function() {
      var compiled = _.template('<% // comment %><% if (value) { %>yap<% } else { %>nope<% } %>');
      strictEqual(compiled({ 'value': true }), 'yap');
    });

    test('should work with custom `_.templateSettings` delimiters', 1, function() {
      var settings = _.clone(_.templateSettings);

      _.assign(_.templateSettings, {
        'escape': /\{\{-([\s\S]+?)\}\}/g,
        'evaluate': /\{\{([\s\S]+?)\}\}/g,
        'interpolate': /\{\{=([\s\S]+?)\}\}/g
      });

      var compiled = _.template('<ul>{{ _.each(collection, function(value, index) { }}<li>{{= index }}: {{- value }}</li>{{ }); }}</ul>'),
          expected = '<ul><li>0: a &amp; A</li><li>1: b &amp; B</li></ul>';

      strictEqual(compiled({ 'collection': ['a & A', 'b & B'] }), expected);
      _.assign(_.templateSettings, settings);
    });

    test('should work with `_.templateSettings` delimiters containing special characters', 1, function() {
      var settings = _.clone(_.templateSettings);

      _.assign(_.templateSettings, {
        'escape': /<\?-([\s\S]+?)\?>/g,
        'evaluate': /<\?([\s\S]+?)\?>/g,
        'interpolate': /<\?=([\s\S]+?)\?>/g
      });

      var compiled = _.template('<ul><? _.each(collection, function(value, index) { ?><li><?= index ?>: <?- value ?></li><? }); ?></ul>'),
          expected = '<ul><li>0: a &amp; A</li><li>1: b &amp; B</li></ul>';

      strictEqual(compiled({ 'collection': ['a & A', 'b & B'] }), expected);
      _.assign(_.templateSettings, settings);
    });

    test('should work with no delimiters', 1, function() {
      var expected = 'abc';
      strictEqual(_.template(expected)({}), expected);
    });

    test('should support the "imports" option', 1, function() {
      var options = { 'imports': { 'a': 1 } },
          compiled = _.template('<%= a %>', options);

      strictEqual(compiled({}), '1');
    });

    test('should support the "variable" options', 1, function() {
      var compiled = _.template(
        '<% _.each( data.a, function( value ) { %>' +
            '<%= value.valueOf() %>' +
        '<% }) %>', { 'variable': 'data' }
      );

      try {
        var data = { 'a': [1, 2, 3] };
        strictEqual(compiled(data), '123');
      } catch(e) {
        ok(false);
      }
    });

    test('should use a `with` statement by default', 1, function() {
      var compiled = _.template('<%= index %><%= collection[index] %><% _.each(collection, function(value, index) { %><%= index %><% }); %>'),
          actual = compiled({ 'index': 1, 'collection': ['a', 'b', 'c'] });

      strictEqual(actual, '1b012');
    });

    test('should work correctly with `this` references', 2, function() {
      var compiled = _.template('a<%= this.String("b") %>c');
      strictEqual(compiled(), 'abc');

      var object = { 'b': 'B' };
      object.compiled = _.template('A<%= this.b %>C', { 'variable': 'obj' });
      strictEqual(object.compiled(), 'ABC');
    });

    test('should work with backslashes', 1, function() {
      var compiled = _.template('<%= a %> \\b');
      strictEqual(compiled({ 'a': 'A' }), 'A \\b');
    });

    test('should work with escaped characters in string literals', 2, function() {
      var compiled = _.template('<% print("\'\\n\\r\\t\\u2028\\u2029\\\\") %>');
      strictEqual(compiled(), "'\n\r\t\u2028\u2029\\");

      compiled = _.template('\'\n\r\t<%= a %>\u2028\u2029\\"');
      strictEqual(compiled({ 'a': 'A' }), '\'\n\r\tA\u2028\u2029\\"');
    });

    test('should handle \\u2028 & \\u2029 characters', 1, function() {
      var compiled = _.template('\u2028<%= "\\u2028\\u2029" %>\u2029');
      strictEqual(compiled(), '\u2028\u2028\u2029\u2029');
    });

    test('should work with statements containing quotes', 1, function() {
      var compiled = _.template("<%\
        if (a == 'A' || a == \"a\") {\
          %>'a',\"A\"<%\
        } %>"
      );

      strictEqual(compiled({ 'a': 'A' }), "'a',\"A\"");
    });

    test('should work with templates containing newlines and comments', 1, function() {
      var compiled = _.template('<%\n\
	// comment\n\
	if (value) { value += 3; }\n\
        %><p><%= value %></p>'
      );

      strictEqual(compiled({ 'value': 3 }), '<p>6</p>');
    });

    test('should not error with IE conditional comments enabled (test with development build)', 1, function() {
      var compiled = _.template(''),
          pass = true;

      /*@cc_on @*/
      try {
        compiled();
      } catch(e) {
        pass = false;
      }
      ok(pass);
    });

    test('should tokenize delimiters', 1, function() {
      var compiled = _.template('<span class="icon-<%= type %>2"></span>'),
          data = { 'type': 1 };

      strictEqual(compiled(data), '<span class="icon-12"></span>');
    });

    test('should evaluate delimiters once', 1, function() {
      var actual = [],
          compiled = _.template('<%= func("a") %><%- func("b") %><% func("c") %>');

      compiled({ 'func': function(value) { actual.push(value); } });
      deepEqual(actual, ['a', 'b', 'c']);
    });

    test('should match delimiters before escaping text', 1, function() {
      var compiled = _.template('<<\n a \n>>', { 'evaluate': /<<(.*?)>>/g });
      strictEqual(compiled(), '<<\n a \n>>');
    });

    test('should resolve `null` and `undefined` values to an empty string', 4, function() {
      var compiled = _.template('<%= a %><%- a %>');
      strictEqual(compiled({ 'a': null }), '');
      strictEqual(compiled({ 'a': undefined }), '');

      compiled = _.template('<%= a.b %><%- a.b %>');
      strictEqual(compiled({ 'a': {} }), '');
      strictEqual(compiled({ 'a': {} }), '');
    });

    test('should parse delimiters with newlines', 1, function() {
      var expected = '<<\nprint("<p>" + (value ? "yes" : "no") + "</p>")\n>>',
          compiled = _.template(expected, { 'evaluate': /<<(.+?)>>/g }),
          data = { 'value': true };

      strictEqual(compiled(data), expected);
    });

    test('should support recursive calls', 1, function() {
      var compiled = _.template('<%= a %><% a = _.template(c)(obj) %><%= a %>'),
          data = { 'a': 'A', 'b': 'B', 'c': '<%= b %>' };

      strictEqual(compiled(data), 'AB');
    });

    test('should coerce `text` argument to a string', 1, function() {
      var data = { 'a': 1 },
          object = { 'toString': function() { return '<%= a %>'; } };

      strictEqual(_.template(object)(data), '1');
    });

    test('should not augment the `options` object', 1, function() {
      var options = {};
      _.template('', options);
      deepEqual(options, {});
    });

    test('should not modify `_.templateSettings` when `options` are provided', 2, function() {
      ok(!('a' in _.templateSettings));

      _.template('', {}, { 'a': 1 });
      ok(!('a' in _.templateSettings));

      delete _.templateSettings.a;
    });

    test('should not error for non-object `data` and `options` values', 2, function() {
      var pass = true;

      try {
        _.template('')(1);
      } catch(e) {
        pass = false;
      }
      ok(pass);

      pass = true;

      try {
        _.template('', 1)(1);
      } catch(e) {
        pass = false;
      }
      ok(pass);
    });

    test('should provide the template source when a SyntaxError occurs', 1, function() {
      try {
        _.template('<% if x %>');
      } catch(e) {
        var source = e.source;
      }
      ok(/__p/.test(source));
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.trunc');

  (function() {
    var string = 'hi-diddly-ho there, neighborino';

    test('should truncate to a length of `30` by default', 1, function() {
      strictEqual(_.trunc(string), 'hi-diddly-ho there, neighbo...');
    });

    test('should not truncate if `string` is <= `length`', 2, function() {
      strictEqual(_.trunc(string, string.length), string);
      strictEqual(_.trunc(string, string.length + 2), string);
    });

    test('should truncate string the given length', 1, function() {
      strictEqual(_.trunc(string, 24), 'hi-diddly-ho there, n...');
    });

    test('should support a `omission` option', 1, function() {
      strictEqual(_.trunc(string, { 'omission': ' [...]' }), 'hi-diddly-ho there, neig [...]');
    });

    test('should support a `length` option', 1, function() {
      strictEqual(_.trunc(string, { 'length': 4 }), 'h...');
    });

    test('should support a `separator` option', 2, function() {
      strictEqual(_.trunc(string, { 'length': 24, 'separator': ' ' }), 'hi-diddly-ho there,...');
      strictEqual(_.trunc(string, { 'length': 24, 'separator': /,? +/ }), 'hi-diddly-ho there...');
    });

    test('should treat negative `length` as `0`', 4, function() {
      _.each([0, -2], function(length) {
        strictEqual(_.trunc(string, length), '...');
        strictEqual(_.trunc(string, { 'length': length }), '...');
      });
    });

    test('should coerce `length` to a number', 4, function() {
      _.each(['', '4'], function(length, index) {
        var actual = index ? 'h...' : '...';
        strictEqual(_.trunc(string, length), actual);
        strictEqual(_.trunc(string, { 'length': { 'valueOf': _.constant(length) } }), actual);
      });
    });

    test('should coerce `string` to a string', 2, function() {
      strictEqual(_.trunc(Object(string), 4), 'h...');
      strictEqual(_.trunc({ 'toString': _.constant(string) }, 5), 'hi...');
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.throttle');

  (function() {
    asyncTest('should throttle a function', 2, function() {
      if (!(isRhino && isModularize)) {
        var count = 0;
        var throttled = _.throttle(function() { count++; }, 32);

        throttled();
        throttled();
        throttled();

        var lastCount = count;
        ok(count > 0);

        setTimeout(function() {
          ok(count > lastCount);
          QUnit.start();
        }, 64);
      }
      else {
        skipTest(2);
        QUnit.start();
      }
    });

    asyncTest('subsequent calls should return the result of the first call', 5, function() {
      if (!(isRhino && isModularize)) {
        var throttled = _.throttle(_.identity, 32),
            result = [throttled('a'), throttled('b')];

        deepEqual(result, ['a', 'a']);

        setTimeout(function() {
          var result = [throttled('x'), throttled('y')];
          notEqual(result[0], 'a');
          notStrictEqual(result[0], undefined);

          notEqual(result[1], 'y');
          notStrictEqual(result[1], undefined);
          QUnit.start();
        }, 64);
      }
      else {
        skipTest(5);
        QUnit.start();
      }
    });

    asyncTest('should clear timeout when `func` is called', 1, function() {
      if (!isModularize) {
        var callCount = 0,
            dateCount = 0;

        var getTime = function() {
          return ++dateCount < 3 ? +new Date : Infinity;
        };

        var lodash = _.runInContext(_.assign({}, root, {
          'Date': function() {
            return { 'getTime': getTime, 'valueOf': getTime };
          }
        }));

        var throttled = lodash.throttle(function() {
          callCount++;
        }, 32);

        throttled();
        throttled();
        throttled();

        setTimeout(function() {
          strictEqual(callCount, 2);
          QUnit.start();
        }, 64);
      }
      else {
        skipTest();
        QUnit.start();
      }
    });

    asyncTest('should not trigger a trailing call when invoked once', 2, function() {
      if (!(isRhino && isModularize)) {
        var count = 0,
            throttled = _.throttle(function() { count++; }, 32);

        throttled();
        strictEqual(count, 1);

        setTimeout(function() {
          strictEqual(count, 1);
          QUnit.start();
        }, 64);
      }
      else {
        skipTest(2);
        QUnit.start();
      }
    });

    _.times(2, function(index) {
      asyncTest('should trigger a call when invoked repeatedly' + (index ? ' and `leading` is `false`' : ''), 1, function() {
        if (!(isRhino && isModularize)) {
          var count = 0,
              limit = (argv || isPhantom) ? 1000 : 320,
              options = index ? { 'leading': false } : {};

          var throttled = _.throttle(function() {
            count++;
          }, 32, options);

          var start = +new Date;
          while ((new Date - start) < limit) {
            throttled();
          }
          var actual = count > 1;

          setTimeout(function() {
            ok(actual);
            QUnit.start();
          }, 1);
        }
        else {
          skipTest();
          QUnit.start();
        }
      });
    });

    asyncTest('should apply default options correctly', 3, function() {
      if (!(isRhino && isModularize)) {
        var count = 0;

        var throttled = _.throttle(function(value) {
          count++;
          return value;
        }, 32, {});

        strictEqual(throttled('a'), 'a');
        strictEqual(throttled('b'), 'a');

        setTimeout(function() {
          strictEqual(count, 2);
          QUnit.start();
        }, 256);
      }
      else {
        skipTest(3);
        QUnit.start();
      }
    });

    test('should support a `leading` option', 4, function() {
      if (!(isRhino && isModularize)) {
        _.each([true, { 'leading': true }], function(options) {
          var withLeading = _.throttle(_.identity, 32, options);
          strictEqual(withLeading('a'), 'a');
        });

        _.each([false, { 'leading': false }], function(options) {
          var withoutLeading = _.throttle(_.identity, 32, options);
          strictEqual(withoutLeading('a'), undefined);
        });
      }
      else {
        skipTest(4);
      }
    });

    asyncTest('should support a `trailing` option', 6, function() {
      if (!(isRhino && isModularize)) {
        var withCount = 0,
            withoutCount = 0;

        var withTrailing = _.throttle(function(value) {
          withCount++;
          return value;
        }, 64, { 'trailing': true });

        var withoutTrailing = _.throttle(function(value) {
          withoutCount++;
          return value;
        }, 64, { 'trailing': false });

        strictEqual(withTrailing('a'), 'a');
        strictEqual(withTrailing('b'), 'a');

        strictEqual(withoutTrailing('a'), 'a');
        strictEqual(withoutTrailing('b'), 'a');

        setTimeout(function() {
          strictEqual(withCount, 2);
          strictEqual(withoutCount, 1);
          QUnit.start();
        }, 256);
      }
      else {
        skipTest(6);
        QUnit.start();
      }
    });

    asyncTest('should not update `lastCalled`, at the end of the timeout, when `trailing` is `false`', 1, function() {
      if (!(isRhino && isModularize)) {
        var count = 0;

        var throttled = _.throttle(function() {
          count++;
        }, 64, { 'trailing': false });

        throttled();
        throttled();

        setTimeout(function() {
          throttled();
          throttled();
        }, 96);

        setTimeout(function() {
          ok(count > 1);
          QUnit.start();
        }, 192);
      }
      else {
        skipTest();
        QUnit.start();
      }
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.debounce and lodash.throttle');

  _.each(['debounce', 'throttle'], function(methodName) {
    var func = _[methodName],
        isThrottle = methodName == 'throttle';

    test('_.' + methodName + ' should not error for non-object `options` values', 1, function() {
      var pass = true;

      try {
        func(_.noop, 32, 1);
      } catch(e) {
        pass = false;
      }
      ok(pass);
    });

    asyncTest('_.' + methodName + ' should call `func` with the correct `this` binding', 1, function() {
      if (!(isRhino && isModularize)) {
        var object = {
          'funced': func(function() { actual.push(this); }, 32)
        };

        var actual = [],
            expected = _.times(isThrottle ? 2 : 1, _.constant(object));

        object.funced();
        if (isThrottle) {
          object.funced();
        }
        setTimeout(function() {
          deepEqual(actual, expected);
          QUnit.start();
        }, 64);
      }
      else {
        skipTest();
        QUnit.start();
      }
    });

    asyncTest('_.' + methodName + ' supports recursive calls', 2, function() {
      if (!(isRhino && isModularize)) {
        var actual = [],
            args = _.map(['a', 'b', 'c'], function(chr) { return [{}, chr]; }),
            length = isThrottle ? 2 : 1,
            expected = args.slice(0, length),
            queue = args.slice();

        var funced = func(function() {
          var current = [this];
          push.apply(current, arguments);
          actual.push(current);

          var next = queue.shift();
          if (next) {
            funced.call(next[0], next[1]);
          }
        }, 32);

        var next = queue.shift();
        funced.call(next[0], next[1]);
        deepEqual(actual, expected.slice(0, length - 1));

        setTimeout(function() {
          deepEqual(actual, expected);
          QUnit.start();
        }, 42);
      }
      else {
        skipTest(2);
        QUnit.start();
      }
    });

    asyncTest('_.' + methodName + ' should work if the system time is set backwards', 1, function() {
      if (!isModularize) {
        var callCount = 0,
            dateCount = 0;

        var getTime = function() {
          return ++dateCount < 2 ? +new Date : +new Date(2012, 3, 23, 23, 27, 18);
        };

        var lodash = _.runInContext(_.assign({}, root, {
          'Date': function() {
            return { 'getTime': getTime, 'valueOf': getTime };
          }
        }));

        var funced = lodash[methodName](function() {
          callCount++;
        }, 32);

        funced();

        setTimeout(function() {
          funced();
          strictEqual(callCount, isThrottle ? 2 : 1);
          QUnit.start();
        }, 64);
      }
      else {
        skipTest();
        QUnit.start();
      }
    });

    asyncTest('_.' + methodName + ' should support cancelling delayed calls', 1, function() {
      if (!(isRhino && isModularize)) {
        var callCount = 0;

        var funced = func(function() {
          callCount++;
        }, 32, { 'leading': false });

        funced();
        funced.cancel();

        setTimeout(function() {
          strictEqual(callCount, 0);
          QUnit.start();
        }, 64);
      }
      else {
        skipTest();
        QUnit.start();
      }
    });
  });

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.toArray');

  (function() {
    test('should return the values of objects', 1, function() {
      var array = [1, 2, 3],
          object = { 'a': 1, 'b': 2, 'c': 3 };

      deepEqual(_.toArray(object), array);
    });

    test('should work with a string for `collection` (test in Opera < 10.52)', 2, function() {
      deepEqual(_.toArray('abc'), ['a', 'b', 'c']);
      deepEqual(_.toArray(Object('abc')), ['a', 'b', 'c']);
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.slice and lodash.toArray');

  _.each(['slice', 'toArray'], function(methodName) {
    var args = (function() { return arguments; }(1, 2, 3)),
        array = [1, 2, 3],
        func = _[methodName];

    test('should return a dense array', 3, function() {
      var sparse = Array(3);
      sparse[1] = 2;

      var actual = func(sparse);

      ok('0' in actual);
      ok('2' in actual);
      deepEqual(actual, sparse);
    });

    test('should treat array-like objects like arrays', 2, function() {
      var object = { '0': 'a', '1': 'b', '2': 'c', 'length': 3 };
      deepEqual(func(object), ['a', 'b', 'c']);
      deepEqual(func(args), array);
    });

    test('should return a shallow clone of arrays', 2, function() {
      var actual = func(array);
      notStrictEqual(actual, array);
      deepEqual(func(array), array);
    });

    test('should work with a node list for `collection` (test in IE < 9)', 1, function() {
      if (document) {
        try {
          var nodeList = document.getElementsByTagName('body'),
              actual = func(nodeList);
        } catch(e) { }

        deepEqual(actual, [body]);
      }
      else {
        skipTest();
      }
    });
  });

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.times');

  (function() {
    test('should rollover large `n` values', 1, function() {
      var actual = _.times(Math.pow(2, 32) + 1);
      deepEqual(actual, [0]);
    });

    test('should coerce non-finite `n` values to `0`', 3, function() {
      _.each([-Infinity, NaN, Infinity], function(n) {
        deepEqual(_.times(n), []);
      });
    });

    test('should pass the correct `callback` arguments', 1, function() {
      var args;

      _.times(1, function() {
        args || (args = slice.call(arguments));
      });

      deepEqual(args, [0]);
    });

    test('should support the `thisArg` argument', 1, function() {
      var expect = [1, 2, 3];

      var actual = _.times(3, function(num) {
        return this[num];
      }, expect);

      deepEqual(actual, expect);
    });

    test('should use `_.identity` when no `callback` is provided', 1, function() {
      var actual = _.times(3);
      deepEqual(actual, [0, 1, 2]);
    });

    test('should return an array of the results of each `callback` execution', 1, function() {
      deepEqual(_.times(3, function(n) { return n * 2; }), [0, 2, 4]);
    });

    test('should return an empty array for falsey and negative `n` arguments', 1, function() {
      var values = falsey.concat(-1, -Infinity),
          expected = _.map(values, _.constant([]));

      var actual = _.map(values, function(value, index) {
        return index ? _.times(value) : _.times();
      });

      deepEqual(actual, expected);
    });

    test('should return a wrapped value when chaining', 2, function() {
      if (!isNpm) {
        var actual = _(3).times();
        ok(actual instanceof _);
        deepEqual(actual.value(), [0, 1, 2]);
      }
      else {
        skipTest(2);
      }
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.transform');

  (function() {
    test('should produce an that is an instance of the given object\'s constructor', 2, function() {
      function Foo() {
        this.a = 1;
        this.b = 2;
        this.c = 3;
      }

      var actual = _.transform(new Foo, function(result, value, key) {
        result[key] = value * value;
      });

      ok(actual instanceof Foo);
      deepEqual(_.clone(actual), { 'a': 1, 'b': 4, 'c': 9 });
    });

    test('should treat sparse arrays as dense', 1, function() {
      var actual = _.transform(Array(1), function(result, value, index) {
        result[index] = String(value);
      });

      deepEqual(actual, ['undefined']);
    });

    test('should work without a callback argument', 1, function() {
      function Foo() {}
      ok(_.transform(new Foo) instanceof Foo);
    });

    test('should check that `object` is an object before using it as the `accumulator` `[[Prototype]]', 1, function() {
      ok(!(_.transform(1) instanceof Number));
    });

    _.each({
      'array': [1, 2, 3],
      'object': { 'a': 1, 'b': 2, 'c': 3 }
    },
    function(object, key) {
      test('should pass the correct `callback` arguments when transforming an ' + key, 2, function() {
        var args;

        _.transform(object, function() {
          args || (args = slice.call(arguments));
        });

        var first = args[0];
        if (key == 'array') {
          ok(first !== object && _.isArray(first));
          deepEqual(args, [first, 1, 0, object]);
        } else {
          ok(first !== object && _.isPlainObject(first));
          deepEqual(args, [first, 1, 'a', object]);
        }
      });

      test('should support the `thisArg` argument when transforming an ' + key, 2, function() {
        var actual = _.transform(object, function(result, value, key) {
          result[key] = this[key];
        }, null, object);

        notStrictEqual(actual, object);
        deepEqual(actual, object);
      });
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('trim methods');

  _.each(['trim', 'trimLeft', 'trimRight'], function(methodName, index) {
    var func = _[methodName];

    var parts = [];
    if (index != 2) {
      parts.push('leading');
    }
    if (index != 1) {
      parts.push('trailing');
    }
    parts = parts.join(' and ');

    test('`_.' + methodName + '` should remove ' + parts + ' whitespace', 1, function() {
      var string = whitespace + 'a b c' + whitespace,
          expected = (index == 2 ? whitespace : '') + 'a b c' + (index == 1 ? whitespace : '');

      strictEqual(func(string), expected);
    });

    test('`_.' + methodName + '` should not remove non-whitespace characters', 1, function() {
      var problemChars = '\x85\u200b\ufffe',
          string = problemChars + 'a b c' + problemChars;

      strictEqual(func(string), string);
    });

    test('`_.' + methodName + '` should coerce `string` to a string', 1, function() {
      var object = { 'toString': function() { return whitespace + 'a b c' + whitespace; } },
          expected = (index == 2 ? whitespace : '') + 'a b c' + (index == 1 ? whitespace : '');

      strictEqual(func(object), expected);
    });

    test('`_.' + methodName + '` should remove ' + parts + ' `chars`', 1, function() {
      var string = '-_-a-b-c-_-',
          expected = (index == 2 ? '-_-' : '') + 'a-b-c' + (index == 1 ? '-_-' : '');

      strictEqual(func(string, '_-'), expected);
    });

    test('`_.' + methodName + '` should coerce `chars` to a string', 1, function() {
      var object = { 'toString': function() { return '_-'; } },
          string = '-_-a-b-c-_-',
          expected = (index == 2 ? '-_-' : '') + 'a-b-c' + (index == 1 ? '-_-' : '');

      strictEqual(func(string, object), expected);
    });

    test('`_.' + methodName + '` should return an empty string when provided `null`, `undefined`, or empty string and `chars`', 6, function() {
      _.each([null, '_-'], function(chars) {
        strictEqual(func(null, chars), '');
        strictEqual(func(undefined, chars), '');
        strictEqual(func('', chars), '');
      });
    });

    test('`_.' + methodName + '` should work with `null`, `undefined`, or empty string for `chars`', 3, function() {
      var string = whitespace + 'a b c' + whitespace,
          expected = (index == 2 ? whitespace : '') + 'a b c' + (index == 1 ? whitespace : '');

      strictEqual(func(string, null), expected);
      strictEqual(func(string, undefined), expected);
      strictEqual(func(string, ''), string);
    });

    test('`_.' + methodName + '` should return an unwrapped value when chaining', 1, function() {
      if (!isNpm) {
        var string = whitespace + 'a b c' + whitespace,
            expected = (index == 2 ? whitespace : '') + 'a b c' + (index == 1 ? whitespace : ''),
            actual = _(string)[methodName]();

        strictEqual(actual, expected);
      }
      else {
        skipTest();
      }
    });
  });

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.unescape');

  (function() {
    var escaped = '&amp;&lt;&gt;&quot;&#39;\/',
        unescaped = '&<>"\'\/';

    test('should unescape entities in the correct order', 1, function() {
      strictEqual(_.unescape('&amp;lt;'), '&lt;');
    });

    test('should unescape the proper entities', 1, function() {
      strictEqual(_.unescape(escaped), unescaped);
    });

    test('should not unescape the "&#x2F;" entity', 1, function() {
      strictEqual(_.unescape('&#x2F;'), '&#x2F;');
    });

    test('should handle strings with nothing to unescape', 1, function() {
      strictEqual(_.unescape('abc'), 'abc');
    });

    test('should unescape the same characters escaped by `_.escape`', 1, function() {
      strictEqual(_.unescape(_.escape(unescaped)), unescaped);
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.union');

  (function() {
    var args = arguments;

    test('should return the union of the given arrays', 1, function() {
      var actual = _.union([1, 3, 2], [5, 2, 1, 4], [2, 1]);
      deepEqual(actual, [1, 3, 2, 5, 4]);
    });

    test('should not flatten nested arrays', 1, function() {
      var actual = _.union([1, 3, 2], [1, [5]], [2, [4]]);
      deepEqual(actual, [1, 3, 2, [5], [4]]);
    });

    test('should ignore values that are not arrays or `arguments` objects', 3, function() {
      var array = [0];
      deepEqual(_.union(array, 3, null, { '0': 1 }), array);
      deepEqual(_.union(null, array, null, [2, 1]), [0, 2, 1]);
      deepEqual(_.union(null, array, null, args), [0, 1, 2, 3]);
    });
  }(1, 2, 3));

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.uniq');

  (function() {
    var objects = [{ 'a': 2 }, { 'a': 3 }, { 'a': 1 }, { 'a': 2 }, { 'a': 3 }, { 'a': 1 }];

    test('should return unique values of an unsorted array', 1, function() {
      var array = [2, 3, 1, 2, 3, 1];
      deepEqual(_.uniq(array), [2, 3, 1]);
    });

    test('should return unique values of a sorted array', 1, function() {
      var array = [1, 1, 2, 2, 3];
      deepEqual(_.uniq(array), [1, 2, 3]);
    });

    test('should work with `isSorted`', 1, function() {
      var array = [1, 1, 2, 2, 3];
      deepEqual(_.uniq([1, 1, 2, 2, 3], true), [1, 2, 3]);
    });

    test('should work with a callback', 1, function() {
      var actual = _.uniq(objects, false, function(object) {
        return object.a;
      });

      deepEqual(actual, objects.slice(0, 3));
    });

    test('should work with a callback without specifying `isSorted`', 1, function() {
      var actual = _.uniq(objects, function(object) {
        return object.a;
      });

      deepEqual(actual, objects.slice(0, 3));
    });

    test('should support the `thisArg` argument', 1, function() {
      var actual = _.uniq([1, 2, 1.5, 3, 2.5], function(num) {
        return this.floor(num);
      }, Math);

      deepEqual(actual, [1, 2, 3]);
    });

    test('should perform an unsorted uniq operation when used as a callback for `_.map`', 1, function() {
      var array = [[2, 1, 2], [1, 2, 1]],
          actual = _.map(array, _.uniq);

      deepEqual(actual, [[2, 1], [1, 2]]);
    });

    test('should work with large arrays', 1, function() {
      var object = {};

      var largeArray = _.times(largeArraySize, function(index) {
        switch (index % 3) {
          case 0: return 0;
          case 1: return 'a';
          case 2: return object;
        }
      });

      deepEqual(_.uniq(largeArray), [0, 'a', object]);
    });

    test('should work with large arrays of boolean, `null`, and `undefined` values', 1, function() {
      var array = [],
          expected = [true, false, null, undefined],
          count = Math.ceil(largeArraySize / expected.length);

      _.times(count, function() {
        push.apply(array, expected);
      });

      deepEqual(_.uniq(array), expected);
    });

    test('should distinguish between numbers and numeric strings', 1, function() {
      var array = [],
          expected = ['2', 2, Object('2'), Object(2)],
          count = Math.ceil(largeArraySize / expected.length);

      _.times(count, function() {
        push.apply(array, expected);
      });

      deepEqual(_.uniq(array), expected);
    });

    _.each({
      'an object': ['a'],
      'a number': 0,
      'a string': '0'
    },
    function(callback, key) {
      test('should work with ' + key + ' for `callback`', 1, function() {
        var actual = _.uniq([['a'], ['b'], ['a']], callback);
        deepEqual(actual, [['a'], ['b']]);
      });
    });

    test('should be aliased', 1, function() {
      strictEqual(_.unique, _.uniq);
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.uniqueId');

  (function() {
    test('should generate unique ids', 1, function() {
      var actual = [];
      _.times(1000, function() {
        actual.push(_.uniqueId());
      });

      strictEqual(_.uniq(actual).length, actual.length);
    });

    test('should return a string value when not providing a prefix argument', 1, function() {
      strictEqual(typeof _.uniqueId(), 'string');
    });

    test('should coerce the prefix argument to a string', 1, function() {
      var actual = [_.uniqueId(3), _.uniqueId(2), _.uniqueId(1)];
      ok(/3\d+,2\d+,1\d+/.test(actual));
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.values');

  (function() {
    test('should get the values of an object', 1, function() {
      var object = { 'a': 1, 'b': 2 };
      deepEqual(_.values(object), [1, 2]);
    });

    test('should work with an object that has a `length` property', 1, function() {
      var object = { '0': 'a', '1': 'b', 'length': 2 };
      deepEqual(_.values(object), ['a', 'b', 2]);
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.where');

  (function() {
    var objects = [
      { 'a': 1 },
      { 'a': 1 },
      { 'a': 1, 'b': 2 },
      { 'a': 2, 'b': 2 },
      { 'a': 3 }
    ];

    test('should filter by `source` properties', 12, function() {
      var pairs = [
        [{ 'a': 1 }, [{ 'a': 1 }, { 'a': 1 }, { 'a': 1, 'b': 2 }]],
        [{ 'a': 2 }, [{ 'a': 2, 'b': 2 }]],
        [{ 'a': 3 }, [{ 'a': 3 }]],
        [{ 'b': 1 }, []],
        [{ 'b': 2 }, [{ 'a': 1, 'b': 2 }, { 'a': 2, 'b': 2 }]],
        [{ 'a': 1, 'b': 2 }, [{ 'a': 1, 'b': 2 }]]
      ];

      _.each(pairs, function(pair) {
        var actual = _.where(objects, pair[0]);
        deepEqual(actual, pair[1]);
        ok(_.isEmpty(_.difference(actual, objects)));
      });
    });

    test('should not filter by inherited `source` properties', 1, function() {
      function Foo() {}
      Foo.prototype = { 'a': 2 };

      var source = new Foo;
      source.b = 2;

      var expected = [objects[2], objects[3]],
          actual = _.where(objects, source);

      deepEqual(actual, expected);
    });

    test('should filter by problem JScript properties (test in IE < 9)', 1, function() {
      var collection = [shadowedObject];
      deepEqual(_.where(collection, shadowedObject), [shadowedObject]);
    });

    test('should work with an object for `collection`', 1, function() {
      var collection = {
        'x': { 'a': 1 },
        'y': { 'a': 3 },
        'z': { 'a': 1, 'b': 2 }
      };

      var expected = [collection.x, collection.z],
          actual = _.where(collection, { 'a': 1 });

      deepEqual(actual, expected);
    });

    test('should work with a function for `source`', 1, function() {
      function source() {}
      source.a = 2;

      deepEqual(_.where(objects, source), [{ 'a': 2, 'b': 2 }]);
    });

    test('should match all elements when provided an empty `source`', 1, function() {
      var expected = _.map(empties, _.constant(objects));

      var actual = _.map(empties, function(value) {
        var result = _.where(objects, value);
        return result !== objects && result;
      });

      deepEqual(actual, expected);
    });

    test('should perform a deep partial comparison of `source`', 1, function() {
      var collection = [{ 'a': { 'b': { 'c': 1, 'd': 2 }, 'e': 3 }, 'f': 4 }],
          expected = collection.slice(),
          actual = _.where(collection, { 'a': { 'b': { 'c': 1 } } });

      deepEqual(actual, expected);
    });

    test('should search arrays of `source` for values', 4, function() {
      var collection = [{ 'a': ['b'] }, { 'a': ['c', 'd'] }],
          actual = _.where(collection, { 'a': ['d'] });

      deepEqual(actual, [collection[1]]);

      actual = _.where(collection, { 'a': [] });
      deepEqual(actual, []);

      actual = _.where(collection, { 'a': ['b', 'd'] });
      deepEqual(actual, []);

      actual = _.where(collection, { 'a': ['d', 'b'] });
      deepEqual(actual, []);
    });

    test('should perform a partial comparison of all objects within arrays of `source`', 1, function() {
      var collection = [
        { 'a': [{ 'b': 1, 'c': 2 }, { 'b': 4, 'c': 5, 'd': 6 }] },
        { 'a': [{ 'b': 1, 'c': 2 }, { 'b': 4, 'c': 6, 'd': 7 }] }
      ];

      var actual = _.where(collection, { 'a': [{ 'b': 1 }, { 'b': 4, 'c': 5 }] });
      deepEqual(actual, [collection[0]]);
    });

    test('should handle a `source` with `undefined` values', 4, function() {
      var source = { 'b': undefined },
          actual = _.where([{ 'a': 1 }, { 'a': 1, 'b': 1 }], source);

      deepEqual(actual, []);

      var object = { 'a': 1, 'b': undefined };
      actual = _.where([object], source);
      deepEqual(actual, [object]);

      source = { 'a': { 'c': undefined } };
      actual = _.where([{ 'a': { 'b': 1 } }, { 'a':{ 'b':1 , 'c': 1 } }], source);
      deepEqual(actual, []);

      object = { 'a': { 'b': 1, 'c': undefined } };
      actual = _.where([object], source);
      deepEqual(actual, [object]);
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.without');

  (function() {
    test('should use strict equality to determine the values to reject', 2, function() {
      var object1 = { 'a': 1 },
          object2 = { 'b': 2 },
          array = [object1, object2];

      deepEqual(_.without(array, { 'a': 1 }), array);
      deepEqual(_.without(array, object1), [object2]);
    });

    test('should remove all occurrences of each value from an array', 1, function() {
      var array = [1, 2, 3, 1, 2, 3];
      deepEqual(_.without(array, 1, 2), [3, 3]);
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.wrap');

  (function() {
    test('should create a wrapped function', 1, function() {
      var p = _.wrap(_.escape, function(func, text) {
        return '<p>' + func(text) + '</p>';
      });

      strictEqual(p('fred, barney, & pebbles'), '<p>fred, barney, &amp; pebbles</p>');
    });

    test('should pass the correct `wrapper` arguments', 1, function() {
      var args;

      var wrapped = _.wrap(_.noop, function() {
        args || (args = slice.call(arguments));
      });

      wrapped(1, 2, 3);
      deepEqual(args, [_.noop, 1, 2, 3]);
    });

    test('should not set a `this` binding', 1, function() {
      var p = _.wrap(_.escape, function(func) {
        return '<p>' + func(this.text) + '</p>';
      });

      var object = { 'p': p, 'text': 'fred, barney, & pebbles' };
      strictEqual(object.p(), '<p>fred, barney, &amp; pebbles</p>');
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.xor');

  (function() {
    var args = arguments;

    test('should return the symmetric difference of the given arrays', 1, function() {
      var actual = _.xor([1, 2, 5], [2, 3, 5], [3, 4, 5]);
      deepEqual(actual, [1, 4, 5]);
    });

    test('should return an array of unique values', 2, function() {
      var actual = _.xor([1, 1, 2, 5], [2, 2, 3, 5], [3, 4, 5, 5]);
      deepEqual(actual, [1, 4, 5]);

      actual = _.xor([1, 1]);
      deepEqual(actual, [1]);
    });

    test('should return a new array when a single array is provided', 1, function() {
      var array = [1];
      notStrictEqual(_.xor(array), array);
    });

    test('should ignore individual secondary arguments', 1, function() {
      var array = [0];
      deepEqual(_.xor(array, 3, null, { '0': 1 }), array);
    });

    test('should ignore values that are not arrays or `arguments` objects', 3, function() {
      var array = [1, 2];
      deepEqual(_.xor(array, 3, null, { '0': 1 }), array);
      deepEqual(_.xor(null, array, null, [2, 3]), [1, 3]);
      deepEqual(_.xor(null, array, null, args), [3]);
    });

    test('should return a wrapped value when chaining', 2, function() {
      if (!isNpm) {
        var actual = _([1, 2, 3]).xor([5, 2, 1, 4]);
        ok(actual instanceof _);
        deepEqual(actual.value(), [3, 5, 4]);
      }
      else {
        skipTest(2);
      }
    });
  }(1, 2, 3));

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.zip');

  (function() {
    var object = {
      'an empty array': [
        [],
        []
      ],
      '0-tuples': [
        [[], []],
        []
      ],
      '2-tuples': [
        [['barney', 'fred'], [36, 40]],
        [['barney', 36], ['fred', 40]]
      ],
      '3-tuples': [
        [['barney', 'fred'], [36, 40], [true, false]],
        [['barney', 36, true], ['fred', 40, false]]
      ]
    };

    _.forOwn(object, function(pair, key) {
      test('should work with ' + key, 2, function() {
        var actual = _.zip.apply(_, pair[0]);
        deepEqual(actual, pair[1]);
        deepEqual(_.zip.apply(_, actual), actual.length ? pair[0] : []);
      });
    });

    test('should work with tuples of different lengths', 4, function() {
      var pair = [
        [['barney', 36], ['fred', 40, false]],
        [['barney', 'fred'], [36, 40], [undefined, false]]
      ];

      var actual = _.zip(pair[0]);
      ok('0' in actual[2]);
      deepEqual(actual, pair[1]);

      actual = _.zip.apply(_, actual);
      ok('2' in actual[0]);
      deepEqual(actual, [['barney', 36, undefined], ['fred', 40, false]]);
    });

    test('should treat falsey values as empty arrays', 1, function() {
      var expected = _.map(falsey, _.constant([]));

      var actual = _.map(falsey, function(value) {
        return _.zip(value, value, value);
      });

      deepEqual(actual, expected);
    });

    test('should support consuming its return value', 1, function() {
      var expected = [['barney', 'fred'], [36, 40]];
      deepEqual(_.zip(_.zip(_.zip(_.zip(expected)))), expected);
    });

    test('should support consuming its return value', 1, function() {
      var expected = [['barney', 'fred'], [36, 40]];
      deepEqual(_.zip(_.zip(_.zip(_.zip(expected)))), expected);
    });

    test('should be aliased', 1, function() {
      strictEqual(_.unzip, _.zip);
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.zipObject');

  (function() {
    var object = { 'barney': 36, 'fred': 40 },
        array = [['barney', 36], ['fred', 40]];

    test('should skip falsey elements in a given two dimensional array', 1, function() {
      var actual = _.zipObject(array.concat(falsey));
      deepEqual(actual, object);
    });

    test('should zip together key/value arrays into an object', 1, function() {
      var actual = _.zipObject(['barney', 'fred'], [36, 40]);
      deepEqual(actual, object);
    });

    test('should ignore extra `values`', 1, function() {
      deepEqual(_.zipObject(['a'], [1, 2]), { 'a': 1 });
    });

    test('should accept a two dimensional array', 1, function() {
      var actual = _.zipObject(array);
      deepEqual(actual, object);
    });

    test('should not assume `keys` is two dimensional if `values` is not provided', 1, function() {
      var actual = _.zipObject(['barney', 'fred']);
      deepEqual(actual, { 'barney': undefined, 'fred': undefined });
    });

    test('should accept a falsey `array` argument', 1, function() {
      var expected = _.map(falsey, _.constant({}));

      var actual = _.map(falsey, function(value, index) {
        try {
          return index ? _.zipObject(value) : _.zipObject();
        } catch(e) { }
      });

      deepEqual(actual, expected);
    });

    test('should support consuming the return value of `_.pairs`', 1, function() {
      deepEqual(_.zipObject(_.pairs(object)), object);
    });

    test('should be aliased', 1, function() {
      strictEqual(_.object, _.zipObject);
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash(...).shift');

  (function() {
    test('should remove the value at index `0` when length is `0` (test in IE 8 compatibility mode)', 2, function() {
      if (!isNpm) {
        var wrapped = _({ '0': 1, 'length': 1 });
        wrapped.shift();

        deepEqual(wrapped.keys().value(), ['length']);
        strictEqual(wrapped.first(), undefined);
      }
      else {
        skipTest(2);
      }
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash(...).splice');

  (function() {
    test('should remove the value at index `0` when length is `0` (test in IE < 9, and in compatibility mode for IE 9)', 2, function() {
      if (!isNpm) {
        var wrapped = _({ '0': 1, 'length': 1 });
        wrapped.splice(0, 1);

        deepEqual(wrapped.keys().value(), ['length']);
        strictEqual(wrapped.first(), undefined);
      }
      else {
        skipTest(2);
      }
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash(...).toString');

  (function() {
    test('should return the `toString` result of the wrapped value', 1, function() {
      if (!isNpm) {
        var wrapped = _([1, 2, 3]);
        strictEqual(String(wrapped), '1,2,3');
      }
      else {
        skipTest();
      }
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash(...).valueOf');

  (function() {
    test('should return the `valueOf` result of the wrapped value', 1, function() {
      if (!isNpm) {
        var wrapped = _(123);
        strictEqual(Number(wrapped), 123);
      }
      else {
        skipTest();
      }
    });

    test('should stringify the wrapped value when passed to `JSON.stringify`', 1, function() {
      if (!isNpm && JSON) {
        var wrapped = _([1, 2, 3]);
        strictEqual(JSON.stringify(wrapped), '[1,2,3]');
      }
      else {
        skipTest();
      }
    });

    test('should be aliased', 2, function() {
      if (!isNpm) {
        var expected = _.prototype.valueOf;
        strictEqual(_.prototype.toJSON, expected);
        strictEqual(_.prototype.value, expected);
      }
      else {
        skipTest(2);
      }
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash(...) methods that return existing wrapped values');

  (function() {
    var array = [1, 2, 3],
        wrapped = _(array);

    var funcs = [
      'push',
      'reverse',
      'sort',
      'unshift'
    ];

    _.each(funcs, function(methodName) {
      test('`_(...).' + methodName + '` should return the existing wrapped value', 1, function() {
        if (!isNpm) {
          strictEqual(wrapped[methodName](), wrapped);
        }
        else {
          skipTest();
        }
      });
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash(...) methods that return new wrapped values');

  (function() {
    var array = [1, 2, 3],
        wrapped = _(array);

    var funcs = [
      'concat',
      'slice',
      'splice'
    ];

    _.each(funcs, function(methodName) {
      test('`_(...).' + methodName + '` should return a new wrapped value', 2, function() {
        if (!isNpm) {
          var actual = wrapped[methodName]();
          ok(actual instanceof _);
          notStrictEqual(actual, wrapped);
        }
        else {
          skipTest(2);
        }
      });
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash(...) methods that return unwrapped values');

  (function() {
    var array = [1, 2, 3],
        wrapped = _(array);

    var funcs = [
      'clone',
      'contains',
      'every',
      'find',
      'first',
      'has',
      'isArguments',
      'isArray',
      'isBoolean',
      'isDate',
      'isElement',
      'isEmpty',
      'isEqual',
      'isError',
      'isFinite',
      'isFunction',
      'isNaN',
      'isNull',
      'isNumber',
      'isObject',
      'isPlainObject',
      'isRegExp',
      'isString',
      'isUndefined',
      'join',
      'last',
      'max',
      'min',
      'pop',
      'shift',
      'reduce',
      'reduceRight',
      'some'
    ];

    _.each(funcs, function(methodName) {
      test('`_(...).' + methodName + '` should return an unwrapped value', 1, function() {
        if (!isNpm) {
          var actual = methodName == 'reduceRight'
            ? wrapped[methodName](_.identity)
            : wrapped[methodName]();

          ok(!(actual instanceof _));
        }
        else {
          skipTest();
        }
      });
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash(...) methods capable of returning wrapped and unwrapped values');

  (function() {
    var array = [1, 2, 3],
        wrapped = _(array);

    var funcs = [
      'sample'
    ];

    _.each(funcs, function(methodName) {
      test('`_(...).' + methodName + '` called without an `n` argument should return an unwrapped value', 1, function() {
        if (!isNpm) {
          strictEqual(typeof wrapped[methodName](), 'number');
        }
        else {
          skipTest();
        }
      });

      test('`_(...).' + methodName + '` called with an `n` argument should return a wrapped value', 1, function() {
        if (!isNpm) {
          ok(wrapped[methodName](1) instanceof _);
        }
        else {
          skipTest();
        }
      });

      test('`_.' + methodName + '` should return `undefined` when querying falsey arguments without an `n` argument', 1, function() {
        if (!isNpm) {
          var actual = [],
              expected = _.map(falsey, _.constant()),
              func = _[methodName];

          _.each(falsey, function(value, index) {
            try {
              actual.push(index ? func(value) : func());
            } catch(e) { }
          });

          deepEqual(actual, expected);
        }
        else {
          skipTest();
        }
      });

      test('`_.' + methodName + '` should return an empty array when querying falsey arguments with an `n` argument', 1, function() {
        if (!isNpm) {
          var expected = _.map(falsey, _.constant([])),
              func = _[methodName];

          var actual = _.map(falsey, function(value, index) {
            try {
              return func(value, 2);
            } catch(e) { }
          });

          deepEqual(actual, expected);
        }
        else {
          skipTest();
        }
      });
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('"Arrays" category methods');

 (function() {
    var args = arguments,
        array = [1, 2, 3, 4, 5, 6];

    test('should work with `arguments` objects', 31, function() {
      function message(methodName) {
        return '`_.' + methodName + '` should work with `arguments` objects';
      }

      deepEqual(_.at(args, 0, 4), [1, 5], message('at'));
      deepEqual(_.at(array, args), [2, undefined, 4, undefined, 6], '_.at should work with `arguments` objects as secondary arguments');

      deepEqual(_.difference(args, [null]), [1, [3], 5], message('difference'));
      deepEqual(_.difference(array, args), [2, 3, 4, 6], '_.difference should work with `arguments` objects as secondary arguments');

      deepEqual(_.union(args, [null, 6]), [1, null, [3], 5, 6], message('union'));
      deepEqual(_.union(array, args), array.concat([null, [3]]), '_.union should work with `arguments` objects as secondary arguments');

      deepEqual(_.compact(args), [1, [3], 5], message('compact'));
      deepEqual(_.drop(args, 3), [null, 5], message('drop'));
      deepEqual(_.dropRight(args, 3), [1, null], message('dropRight'));
      deepEqual(_.dropRightWhile(args,_.identity), [1, null, [3], null], message('dropRightWhile'));
      deepEqual(_.dropWhile(args,_.identity), [ null, [3], null, 5], message('dropWhile'));
      deepEqual(_.findIndex(args, _.identity), 0, message('findIndex'));
      deepEqual(_.findLastIndex(args, _.identity), 4, message('findLastIndex'));
      deepEqual(_.first(args), 1, message('first'));
      deepEqual(_.flatten(args), [1, null, 3, null, 5], message('flatten'));
      deepEqual(_.indexOf(args, 5), 4, message('indexOf'));
      deepEqual(_.initial(args), [1, null, [3], null], message('initial'));
      deepEqual(_.intersection(args, [1]), [1], message('intersection'));
      deepEqual(_.last(args), 5, message('last'));
      deepEqual(_.lastIndexOf(args, 1), 0, message('lastIndexOf'));
      deepEqual(_.rest(args, 4), [null, [3], null, 5], message('rest'));
      deepEqual(_.sortedIndex(args, 6), 5, message('sortedIndex'));
      deepEqual(_.take(args, 2), [1, null], message('take'));
      deepEqual(_.takeRight(args, 1), [5], message('takeRight'));
      deepEqual(_.takeRightWhile(args, _.identity), [5], message('takeRightWhile'));
      deepEqual(_.takeWhile(args, _.identity), [1], message('takeWhile'));
      deepEqual(_.uniq(args), [1, null, [3], 5], message('uniq'));
      deepEqual(_.without(args, null), [1, [3], 5], message('without'));
      deepEqual(_.zip(args, args), [[1, 1], [null, null], [[3], [3]], [null, null], [5, 5]], message('zip'));

      if (_.support.argsClass && _.support.argsObject && !_.support.nonEnumArgs) {
        _.pull(args, null);
        deepEqual([args[0], args[1], args[2]], [1, [3], 5], message('pull'));

        _.remove(args, function(value) { return typeof value == 'number'; });
        ok(args.length === 1 && _.isEqual(args[0], [3]), message('remove'));
      }
      else {
        skipTest(2);
      }
    });

    test('should accept falsey primary arguments', 4, function() {
      function message(methodName) {
        return '`_.' + methodName + '` should accept falsey primary arguments';
      }

      deepEqual(_.difference(null, array), array, message('difference'));
      deepEqual(_.intersection(null, array), array, message('intersection'));
      deepEqual(_.union(null, array), array, message('union'));
      deepEqual(_.xor(null, array), array, message('xor'));
    });

    test('should accept falsey secondary arguments', 3, function() {
      function message(methodName) {
        return '`_.' + methodName + '` should accept falsey secondary arguments';
      }

      deepEqual(_.difference(array, null), array, message('difference'));
      deepEqual(_.intersection(array, null), array, message('intersection'));
      deepEqual(_.union(array, null), array, message('union'));
    });
  }(1, null, [3], null, 5));

  /*--------------------------------------------------------------------------*/

  QUnit.module('"Strings" category methods');

 (function() {
    var stringMethods = [
      'camelCase',
      'capitalize',
      'escape',
      'escapeRegExp',
      'kebabCase',
      'pad',
      'padLeft',
      'padRight',
      'repeat',
      'snakeCase',
      'trim',
      'trimLeft',
      'trimRight',
      'trunc',
      'unescape'
    ];

    _.each(stringMethods, function(methodName) {
      var func = _[methodName];

      test('`_.' + methodName + '` should return an empty string when provided `null`, `undefined`, or empty string', 3, function() {
        strictEqual(func(null), '');
        strictEqual(func(undefined), '');
        strictEqual(func(''), '');
      });
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash methods');

  (function() {
    var allMethods = _.reject(_.functions(_).sort(), function(methodName) {
      return /^_/.test(methodName);
    });

    var returnArrays = [
      'at',
      'chunk',
      'compact',
      'difference',
      'drop',
      'filter',
      'flatten',
      'functions',
      'initial',
      'intersection',
      'invoke',
      'keys',
      'map',
      'pairs',
      'pluck',
      'pull',
      'pullAt',
      'range',
      'reject',
      'remove',
      'rest',
      'sample',
      'shuffle',
      'sortBy',
      'take',
      'times',
      'toArray',
      'union',
      'uniq',
      'values',
      'where',
      'without',
      'xor',
      'zip'
    ];

    var rejectFalsey = [
      'after',
      'bind',
      'compose',
      'curry',
      'debounce',
      'defer',
      'delay',
      'memoize',
      'negate',
      'once',
      'partial',
      'partialRight',
      'tap',
      'throttle',
      'wrap'
    ];

    var acceptFalsey = _.difference(allMethods, rejectFalsey);

    test('should accept falsey arguments', 190, function() {
      var emptyArrays = _.map(falsey, _.constant([])),
          isExposed = '_' in root,
          oldDash = root._;

      _.each(acceptFalsey, function(methodName) {
        var expected = emptyArrays,
            func = _[methodName],
            pass = true;

        var actual = _.map(falsey, function(value, index) {
          try {
            return index ? func(value) : func();
          } catch(e) {
            pass = false;
          }
        });

        if (methodName == 'noConflict') {
          if (isExposed) {
            root._ = oldDash;
          } else {
            delete root._;
          }
        }
        else if (methodName == 'pull') {
          expected = falsey;
        }
        if (_.contains(returnArrays, methodName) && methodName != 'sample') {
          deepEqual(actual, expected, '_.' + methodName + ' returns an array');
        }
        ok(pass, '`_.' + methodName + '` accepts falsey arguments');
      });

      // skip tests for missing methods of modularized builds
      _.each(['noConflict', 'runInContext', 'tap'], function(methodName) {
        if (!_[methodName]) {
          skipTest();
        }
      });
    });

    test('should return an array', 68, function() {
      var array = [1, 2, 3];

      _.each(returnArrays, function(methodName) {
        var actual,
            func = _[methodName];

        switch (methodName) {
          case 'invoke':
             actual = func(array, 'toFixed');
             break;
          case 'sample':
            actual = func(array, 1);
            break;
          default:
            actual = func(array);
        }
        ok(_.isArray(actual), '_.' + methodName + ' returns an array');

        var isPull = methodName == 'pull';
        strictEqual(actual === array, isPull, '_.' + methodName + ' should ' + (isPull ? '' : 'not ') + 'return the provided array');
      });
    });

    test('should throw a TypeError for falsey arguments', 15, function() {
      _.each(rejectFalsey, function(methodName) {
        var expected = _.map(falsey, _.constant(true)),
            func = _[methodName];

        var actual = _.map(falsey, function(value, index) {
          var pass = !index && methodName == 'compose';
          try {
            index ? func(value) : func();
          } catch(e) {
            pass = !pass;
          }
          return pass;
        });

        deepEqual(actual, expected, '`_.' + methodName + '` rejects falsey arguments');
      });
    });

    test('should handle `null` `thisArg` arguments', 43, function() {
      var expected = (function() { return this; }).call(null);

      var funcs = [
        'assign',
        'clone',
        'cloneDeep',
        'countBy',
        'dropWhile',
        'dropRightWhile',
        'every',
        'filter',
        'find',
        'findIndex',
        'findKey',
        'findLast',
        'findLastIndex',
        'findLastKey',
        'forEach',
        'forEachRight',
        'forIn',
        'forInRight',
        'forOwn',
        'forOwnRight',
        'groupBy',
        'isEqual',
        'map',
        'mapValues',
        'max',
        'merge',
        'min',
        'omit',
        'partition',
        'pick',
        'reduce',
        'reduceRight',
        'reject',
        'remove',
        'some',
        'sortBy',
        'sortedIndex',
        'takeWhile',
        'takeRightWhile',
        'tap',
        'times',
        'transform',
        'uniq'
      ];

      _.each(funcs, function(methodName) {
        var actual,
            array = ['a'],
            func = _[methodName],
            message = '`_.' + methodName + '` handles `null` `thisArg` arguments';

        function callback() {
          actual = this;
        }
        if (func) {
          if (/^reduce/.test(methodName) || methodName == 'transform') {
            func(array, callback, 0, null);
          } else if (_.contains(['assign', 'merge'], methodName)) {
            func(array, array, callback, null);
          } else if (_.contains(['isEqual', 'sortedIndex'], methodName)) {
            func(array, 'a', callback, null);
          } else if (methodName == 'times') {
            func(1, callback, null);
          } else {
            func(array, callback, null);
          }
          strictEqual(actual, expected, message);
        }
        else {
          skipTest();
        }
      });
    });

    test('should not contain minified method names (test production builds)', 1, function() {
      ok(_.every(_.functions(_), function(methodName) {
        return methodName.length > 2 || methodName === 'at';
      }));
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.config.asyncRetries = 10;
  QUnit.config.hidepassed = true;

  if (!document) {
    QUnit.config.noglobals = true;
    QUnit.start();
  }
}.call(this));
