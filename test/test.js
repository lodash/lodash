;(function(root, undefined) {
  'use strict';

  /** Used to store Lo-Dash to test for bad shim detection */
  var lodashBadShim = root.lodashBadShim;

  /** Method and object shortcuts */
  var phantom = root.phantom,
      amd = root.define && define.amd,
      argv = root.process && process.argv,
      document = !phantom && root.document,
      body = document && document.body,
      create = Object.create,
      freeze = Object.freeze,
      noop = function() {},
      params = root.arguments,
      push = Array.prototype.push,
      slice = Array.prototype.slice,
      system = root.system,
      toString = Object.prototype.toString,
      Worker = document && root.Worker;

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
        return require('fs').realpathSync(result);
      } catch(e) { }
    }
    return result;
  }());

  /** The `ui` object */
  var ui = root.ui || (root.ui = {
    'buildPath': filePath,
    'loaderPath': '',
    'urlParams': {}
  });

  /** The basename of the Lo-Dash file to test */
  var basename = /[\w.-]+$/.exec(filePath)[0];

  /** Used to indicate testing a modularized build */
  var isModularize = ui.isModularize || /\b(?:commonjs|(index|main)\.js|lodash-(?:amd|node)|modularize|npm)\b/.test([ui.buildPath, ui.urlParams.build, basename]);

  /** Detect if testing `npm` modules */
  var isNpm = isModularize && /\bnpm\b/.test([ui.buildPath, ui.urlParams.build]);

  /** Detect if running in Java */
  var isJava = !document && !!root.java;

  /** Detects if running in a PhantomJS web page */
  var isPhantomPage = typeof callPhantom == 'function';

  /** Detect if running in Rhino */
  var isRhino = isJava && typeof global == 'function' && global().Array === root.Array;

  /** Use a single "load" function */
  var load = (typeof require == 'function' && !amd)
    ? require
    : (isJava && root.load);

  /** The unit testing framework */
  var QUnit = (function() {
    return  root.QUnit || (
      root.addEventListener || (root.addEventListener = noop),
      root.setTimeout || (root.setTimeout = noop),
      root.QUnit = load('../vendor/qunit/qunit/qunit.js') || root.QUnit,
      (load('../vendor/qunit-extras/qunit-extras.js') || { 'runInContext': noop }).runInContext(root),
      addEventListener === noop && delete root.addEventListener,
      root.QUnit
    );
  }());

  /*--------------------------------------------------------------------------*/

  // log params passed to `test.js`
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
      phantom.exit(details.failed ? 1 : 0);
    };

    page.onConsoleMessage = function(message) {
      console.log(message);
    };

    page.onInitialized = function() {
      page.evaluate(function() {
        document.addEventListener('DOMContentLoaded', function() {
          QUnit.done(callPhantom);
        });
      });
    };

    return;
  }

  /*--------------------------------------------------------------------------*/

  /** The `lodash` function to test */
  var _ = root._ || (root._ = (
    _ = load(filePath) || root._,
    _ = _._ || _,
    (_.runInContext ? _.runInContext(root) : _)
  ));

  /** Used to pass falsey values to methods */
  var falsey = [, '', 0, false, NaN, null, undefined];

  /** Used to pass empty values to methods */
  var empties = [[], {}].concat(falsey.slice(1));

  /** Used as the size when optimizations are enabled for large arrays */
  var largeArraySize = 75;

  /** Used to set property descriptors */
  var defineProperty = (function() {
    try {
      var o = {},
          func = Object.defineProperty,
          result = func(o, o, o) && func;
    } catch(e) { }
    return result;
  }());

  /** Used to check problem JScript properties (a.k.a. the [[DontEnum]] bug) */
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

  // add values from other realms
  (function() {
    if (!amd) {
      try {
        emptyObject(require.cache);

        _.extend(_, require('vm').runInNewContext([
          '({',
          "'_arguments': (function() { return arguments; }(1, 2, 3)),",
          "'_array': [1, 2, 3],",
          "'_boolean': new Boolean(false),",
          "'_date': new Date,",
          "'_function': function() {},",
          "'_nan': NaN,",
          "'_null': null,",
          "'_number': new Number(0),",
          "'_object': { 'a': 1, 'b': 2, 'c': 3 },",
          "'_regexp': /x/,",
          "'_string': new String('a'),",
          "'_undefined': undefined,",
          '})'
        ].join('\n')));

        // set bad shims
        Array._isArray = Array.isArray;
        Array.isArray = function() {};

        Date._now = Date.now;
        Date.now = function() {};

        Function.prototype._bind = Function.prototype.bind;
        Function.prototype.bind = function() { return function() {}; };

        Object._create = Object.create;
        Object.create = function() {};

        Object._defineProperty = Object.defineProperty;
        Object.defineProperty = function() {};

        Object._getPrototypeOf = Object.getPrototypeOf;
        Object.getPrototypeOf = function() {};

        Object._keys = Object.keys;
        Object.keys = function() {};

        // load Lo-Dash and expose it to the bad shims
        lodashBadShim = (lodashBadShim = require(filePath))._ || lodashBadShim;

        // restore native methods
        Array.isArray = Array._isArray;
        Date.now = Date._now;
        Function.prototype.bind = Function.prototype._bind;
        Object.create = Object._create;
        Object.defineProperty = Object._defineProperty;
        Object.getPrototypeOf = Object._getPrototypeOf;
        Object.keys = Object._keys;

        delete Array._isArray;
        delete Date._now;
        delete Function.prototype._bind;
        delete Object._create;
        delete Object._defineProperty;
        delete Object._getPrototypeOf;
        delete Object._keys;
      } catch(e) { }
    }
    if (!_._object && document) {
      var iframe = document.createElement('iframe');
      iframe.frameBorder = iframe.height = iframe.width = 0;
      body.appendChild(iframe);

      var idoc = (idoc = iframe.contentDocument || iframe.contentWindow).document || idoc;
      idoc.write([
        '<script>',
        'parent._._arguments = (function() { return arguments; }(1, 2, 3));',
        'parent._._array = [1, 2, 3];',
        'parent._._boolean = new Boolean(false);',
        'parent._._date = new Date;',
        "parent._._element = document.createElement('div');",
        'parent._._function = function() {};',
        'parent._._nan = NaN;',
        'parent._._null = null;',
        'parent._._number = new Number(0);',
        "parent._._object = { 'a': 1, 'b': 2, 'c': 3 };",
        'parent._._regexp = /x/;',
        "parent._._string = new String('a');",
        'parent._._undefined = undefined;',
        '<\/script>'
      ].join('\n'));
      idoc.close();
    }
  }());

  // add web worker
  (function() {
    if (!Worker || isModularize) {
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
        equal((lodashModule || {}).moduleName, 'lodash');
      } else {
        skipTest();
      }
    });

    test('supports loading ' + basename + ' with the Require.js "shim" configuration option', 1, function() {
      if (amd && /requirejs/.test(ui.loaderPath)) {
        equal((shimmedModule || {}).moduleName, 'shimmed');
      } else {
        skipTest();
      }
    });

    test('supports loading ' + basename + ' as the "underscore" module', 1, function() {
      if (amd && !/dojo/.test(ui.loaderPath)) {
        equal((underscoreModule || {}).moduleName, 'underscore');
      } else {
        skipTest();
      }
    });

    asyncTest('supports loading ' + basename + ' in a web worker', 1, function() {
      if (Worker && !isModularize) {
        var limit = 15000,
            start = +new Date;

        var attempt = function() {
          var actual = _._VERSION;
          if ((new Date - start) < limit && typeof actual != 'string') {
            setTimeout(attempt, 16);
            return;
          }
          equal(actual, _.VERSION);
          QUnit.start();
        };

        attempt();
      }
      else {
        skipTest();
        QUnit.start();
      }
    });

    test('avoids overwritten native methods', 7, function() {
      function Foo() {}

      function message(methodName) {
        return '`_.' + methodName + '` should avoid overwritten native methods';
      }
      var object = { 'a': true };

      if (lodashBadShim) {
        try {
          actual = [lodashBadShim.isArray([]), lodashBadShim.isArray({ 'length': 0 })];
        } catch(e) {
          actual = null;
        }
        deepEqual(actual, [true, false], message('Array.isArray'));

        try {
          actual = lodashBadShim.now();
        } catch(e) {
          actual = null;
        }
        ok(typeof actual == 'number', message('Date.now'));

        try {
          actual = [lodashBadShim.create(Foo.prototype, object), lodashBadShim.create()];
        } catch(e) {
          actual = null;
        }
        ok(actual[0] instanceof Foo, message('Object.create'));
        deepEqual(actual[1], {}, message('Object.create'));

        try {
          var actual = lodashBadShim.bind(function() { return this.a; }, object)();
        } catch(e) {
          actual = null;
        }
        ok(actual, message('Object.defineProperty'));

        try {
          actual = [lodashBadShim.isPlainObject({}), lodashBadShim.isPlainObject([])];
        } catch(e) {
          actual = null;
        }
        deepEqual(actual, [true, false], message('Object.getPrototypeOf'));

        try {
          actual = [lodashBadShim.keys(object), lodashBadShim.keys()];
        } catch(e) {
          actual = null;
        }
        deepEqual(actual, [['a'], []], message('Object.keys'));
      }
      else {
        skipTest(7);
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
      equal(_(wrapped), wrapped);
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.after');

  (function() {
    test('should create a function that executes `func` after `n` calls', 4, function() {
      function after(n, times) {
        var count = 0;
        _.times(times, _.after(n, function() { count++; }));
        return count;
      }

      strictEqual(after(5, 5), 1, 'after(n) should execute `func` after being called `n` times');
      strictEqual(after(5, 4), 0, 'after(n) should not execute `func` unless called `n` times');
      strictEqual(after(0, 0), 0, 'after(0) should not execute `func` immediately');
      strictEqual(after(0, 1), 1, 'after(0) should execute `func` when called once');
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

    test('should not error on `null` or `undefined` sources (test in IE < 9)', 1, function() {
      try {
        deepEqual(_.assign({}, null, undefined, { 'a': 1 }), { 'a': 1 });
      } catch(e) {
        ok(false);
      }
    });

    test('should work with a `callback`', 1, function() {
      var actual = _.assign({ 'a': 1, 'b': 2 }, { 'a': 3, 'c': 3 }, function(a, b) {
        return typeof a == 'undefined' ? b : a;
      });

      deepEqual(actual, { 'a': 1, 'b': 2, 'c': 3 });
    });

    test('should pass the correct `callback` arguments', 1, function() {
      var args;

      _.assign({ 'a': 1 }, { 'b': 2 }, function() {
        args || (args = slice.call(arguments));
      });

      deepEqual(args, [undefined, 2]);
    });

    test('should support the `thisArg` argument', 1, function() {
      var actual = _.assign({ 'a': 1, 'b': 2 }, { 'a': 3, 'c': 3 }, function(a, b) {
        return typeof this[a] == 'undefined' ? this[b] : this[a];
      }, { '1': 1, '2': 2, '3': 3 });

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
      var actual = _.at(['a', 'b',  'c'], [0, 2, 4]);
      deepEqual(actual, ['a', 'c', undefined]);
    });

    test('should return an empty array when no keys are provided', 1, function() {
      deepEqual(_.at(['a', 'b', 'c']), []);
    });

    test('should accept multiple key arguments', 1, function() {
      var actual = _.at(['a', 'b', 'c', 'd'], 0, 2, 3);
      deepEqual(actual, ['a', 'c', 'd']);
    });

    test('should work with an `arguments` object for `collection`', 1, function() {
      var actual = _.at(args, [0, 2]);
      deepEqual(actual, ['a', 'c']);
    });

    test('should work with an object for `collection`', 1, function() {
      var actual = _.at({ 'a': 1, 'b': 2, 'c': 3 }, ['a', 'c']);
      deepEqual(actual, [1, 3]);
    });

    test('should work when used as `callback` for `_.map`', 1, function() {
      var array = [[1, 2, 3], [4, 5, 6], [7, 8, 9]],
          actual = _.map(array, _.at);

      deepEqual(actual, [[1], [5], [9]]);
    });

    _.forEach({
      'literal': 'abc',
      'object': Object('abc')
    },
    function(collection, key) {
      test('should work with a string ' + key + ' for `collection`', 1, function() {
        deepEqual(_.at(collection, [0, 2]), ['a', 'c']);
      });
    });
  }('a', 'b', 'c'));

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.bind');

  (function() {
    function func() {
      var args = [this];
      push.apply(args, arguments);
      return args;
    }

    test('should bind a function to an object', 1, function() {
      var object = {},
          bound = _.bind(func, object);

      deepEqual(bound('a'), [object, 'a']);
    });

    test('should accept a falsey `thisArg` argument', 1, function() {
      var values = _.reject(falsey.slice(1), function(value) { return value == null; }),
          expected = _.map(values, function(value) { return [value]; });

      var actual = _.map(values, function(value, index) {
        try {
          var bound = _.bind(func, value);
          return bound();
        } catch(e) { }
      });

      ok(_.every(actual, function(value, index) {
        return _.isEqual(value, expected[index]);
      }));
    });

    test('should bind a function to `null` or `undefined`', 4, function() {
      var bound = _.bind(func, null),
          actual = bound('a');

      ok(actual[0] === null || actual[0] && actual[0].Array);
      equal(actual[1], 'a');

      bound = _.bind(func, undefined);
      actual = bound('b');

      ok(actual[0] === undefined || actual[0] && actual[0].Array);
      equal(actual[1], 'b');
    });

    test('should partially apply arguments ', 4, function() {
      var object = {},
          bound = _.bind(func, object, 'a');

      deepEqual(bound(), [object, 'a']);

      bound = _.bind(func, object, 'a');
      deepEqual(bound('b'), [object, 'a', 'b']);

      bound = _.bind(func, object, 'a', 'b');
      deepEqual(bound(), [object, 'a', 'b']);
      deepEqual(bound('c', 'd'), [object, 'a', 'b', 'c', 'd']);
    });

    test('bound functions should have a `length` of `0`', 1, function() {
      var func = function(a, b, c) {},
          bound = _.bind(func, {});

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
          bound = _.bind(func, object, 'a');

      deepEqual(bound(['b'], 'c'), [object, 'a', ['b'], 'c']);
    });

    test('should throw a TypeError if `func` is not a function', 1, function() {
      raises(function() { _.bind(); }, TypeError);
    });

    test('should return a wrapped value when chaining', 2, function() {
      if (!isNpm) {
        var object = {},
            bound = _(func).bind({}, 'a', 'b');

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

      var bound1 = _.bind(func, object1),
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
      };

      Foo.prototype.b = function() { return this._b; };

      var object = new Foo;
      _.bindAll(object);

      var actual = _.map(_.functions(object), function(methodName) {
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

      var actual = _.map(_.functions(object), function(methodName) {
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

      var actual = _.map(_.functions(object), function(methodName) {
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

      var actual = _.map(_.functions(object), function(methodName) {
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
          return greeting + ' ' + this.name;
        }
      };

      var func = _.bindKey(object, 'greet', 'hi');
      equal(func(), 'hi fred');

      object.greet = function(greeting) {
        return greeting + ' ' + this.name + '!';
      };
      equal(func(), 'hi fred!');
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

    test('should return the existing wrapper when chaining', 1, function() {
      if (!isNpm) {
        var wrapper = _({ 'a': 0 });
        equal(wrapper.chain(), wrapper);
      }
      else {
        skipTest();
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

  QUnit.module('cloning');

  (function() {
    function Klass() { this.a = 1; }
    Klass.prototype = { 'b': 1 };

    var nonCloneable = {
      'an element': body,
      'a function': Klass
    };

    var objects = {
      'an `arguments` object': arguments,
      'an array': ['a', 'b', 'c', ''],
      'an array-like-object': { '0': 'a', '1': 'b', '2': 'c',  '3': '', 'length': 5 },
      'boolean': false,
      'boolean object': Object(false),
      'a Klass instance': new Klass,
      'an object': { 'a': 0, 'b': 1, 'c': 3 },
      'an object with object values': { 'a': /a/, 'b': ['B'], 'c': { 'C': 1 } },
      'an object from another document': _._object || {},
      'null': null,
      'a number': 3,
      'a number object': Object(3),
      'a regexp': /a/gim,
      'a string': 'a',
      'a string object': Object('a'),
      'undefined': undefined
    };

    objects['an array'].length = 5;

    test('`_.clone` should shallow clone by default', 2, function() {
      var expected = [{ 'a': 0 }, { 'b': 1 }],
          actual = _.clone(expected);

      deepEqual(actual, expected);
      ok(actual != expected && actual[0] === expected[0]);
    });

    test('`_.clone` should perform a shallow clone when used as `callback` for `_.map`', 1, function() {
      var expected = [{ 'a': [0] }, { 'b': [1] }],
          actual = _.map(expected, _.clone);

      ok(actual[0] != expected[0] && actual[0].a === expected[0].a && actual[1].b === expected[1].b);
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

    _.forEach([
      'clone',
      'cloneDeep'
    ],
    function(methodName) {
      var func = _[methodName],
          klass = new Klass;

      _.forOwn(objects, function(object, key) {
        test('`_.' + methodName + '` should clone ' + key, 2, function() {
          var clone = func(object);
          strictEqual(_.isEqual(object, clone), true);

          if (_.isObject(object)) {
            notStrictEqual(clone, object);
          } else {
            strictEqual(clone, object);
          }
        });
      });

      _.forOwn(nonCloneable, function(object, key) {
        test('`_.' + methodName + '` should not clone ' + key, 1, function() {
          strictEqual(func(object), object);
        });
      });

      test('`_.' + methodName + '` should clone problem JScript properties (test in IE < 9)', 2, function() {
        deepEqual(func(shadowedObject), shadowedObject);
        notStrictEqual(func(shadowedObject), shadowedObject);
      });

      test('`_.' + methodName + '` should pass the correct `callback` arguments', 1, function() {
        var args;

        func(klass, function() {
          args || (args = slice.call(arguments));
        });

        deepEqual(args, [klass]);
      });

      test('`_.' + methodName + '` should support the `thisArg` argument', 1, function() {
        var actual = func('a', function(value) {
          return this[value];
        }, { 'a': 'A' });

        equal(actual, 'A');
      });

      test('`_.' + methodName + '` should handle cloning if `callback` returns `undefined`', 1, function() {
        var actual = func({ 'a': { 'b': 'c' } }, function() {});
        deepEqual(actual, { 'a': { 'b': 'c' } });
      });

      test('`_.' + methodName + '` should deep clone `index` and `input` array properties', 2, function() {
        var array = /x/.exec('vwxyz'),
            actual = func(array);

        strictEqual(actual.index, 2);
        equal(actual.input, 'vwxyz');
      });

      test('`_.' + methodName + '` should deep clone `lastIndex` regexp property', 1, function() {
        // avoid a regexp literal for older Opera and use `exec` for older Safari
        var regexp = RegExp('x', 'g');
        regexp.exec('vwxyz');

        var actual = func(regexp);
        equal(actual.lastIndex, 3);
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
      equal(welcome('pebbles'), 'Hiya Penelope!');
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.constant');

  (function() {
    test('should create a function that always returns `value`', 1, function() {
      var object = { 'a': 1 },
          values = falsey.concat(1, 'a'),
          constant = _.constant(object),
          expected = _.map(values, function() { return object; });

      var actual = _.map(values, function(value, index) {
        return index ? constant(value) : constant();
      });

      deepEqual(actual, expected);
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.contains');

  (function() {
    _.forEach({
      'an `arguments` object': arguments,
      'an array': [1, 2, 3, 1, 2, 3],
      'an object': { 'a': 1, 'b': 2, 'c': 3, 'd': 1, 'e': 2, 'f': 3 },
      'a string': '123123'
    },
    function(collection, key) {
      test('should work with ' + key + ' and  return `true` for  matched values', 1, function() {
        strictEqual(_.contains(collection, 3), true);
      });

      test('should work with ' + key + ' and  return `false` for unmatched values', 1, function() {
        strictEqual(_.contains(collection, 4), false);
      });

      test('should work with ' + key + ' and a positive `fromIndex`', 1, function() {
        strictEqual(_.contains(collection, 1, 2), true);
      });

      test('should work with ' + key + ' and a `fromIndex` >= collection\'s length', 4, function() {
        strictEqual(_.contains(collection, 1, 6), false);
        strictEqual(_.contains(collection, undefined, 6), false);
        strictEqual(_.contains(collection, 1, 8), false);
        strictEqual(_.contains(collection, undefined, 8), false);
      });

      test('should work with ' + key + ' and a negative `fromIndex`', 1, function() {
        strictEqual(_.contains(collection, 2, -3), true);
      });

      test('should work with ' + key + ' and a negative `fromIndex` <= negative collection\'s length', 2, function() {
        strictEqual(_.contains(collection, 1, -6), true);
        strictEqual(_.contains(collection, 2, -8), true);
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

    _.forEach({
      'literal': 'abc',
      'object': Object('abc')
    },
    function(collection, key) {
      test('should work with a string ' + key + ' for `collection`', 2, function() {
        strictEqual(_.contains(collection, 'bc'), true);
        strictEqual(_.contains(collection, 'd'), false);
      });
    });

    test('should be aliased', 1, function() {
      strictEqual(_.include, _.contains);
    });
  }(1, 2, 3, 1, 2, 3));

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.countBy');

  (function() {
    var array = [4.2, 6.1, 6.4];

    test('should work with a `callback`', 1, function() {
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
          expected = _.map(primitives, function() { return true; });

      var actual = _.map(primitives, function(value, index) {
        return _.isPlainObject(index ? _.create(value) : _.create());
      });

      deepEqual(actual, expected);
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.createCallback');

  (function() {
    test('should work with functions created by `_.partial` and `_.partialRight`', 2, function() {
      function func() {
        var result = [this.x];
        push.apply(result, arguments);
        return result;
      }
      var expected = [1, 2, 3],
          object = { 'x': 1 },
          callback = _.createCallback(_.partial(func, 2), object);

      deepEqual(callback(3), expected);

      callback = _.createCallback(_.partialRight(func, 3), object);
      deepEqual(callback(2), expected);
    });

    test('should work without an `argCount`', 1, function() {
      var args,
          expected = ['a', 'b', 'c', 'd', 'e'];

      var callback = _.createCallback(function() {
        args = slice.call(arguments);
      });

      callback.apply(null, expected);
      deepEqual(args, expected);
    });

    test('should return the function provided if already bound with `Function#bind`', 1, function() {
      function a() {}
      var object = {};

      var bound = a.bind && a.bind(object);
      if (bound && !('prototype' in bound)) {
        var bound = a.bind(object);
        strictEqual(_.createCallback(bound, object), bound);
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
        strictEqual(_.createCallback(a, object), a);
        notStrictEqual(_.createCallback(b, object), b);
      }
      else {
        skipTest(2);
      }
    });

    test('should only write `__bindData__` to named functions', 3, function() {
      function a() {};
      function c() {};

      var b = function() {},
          object = {};

      if (defineProperty && _.support.funcDecomp) {
        _.createCallback(a, object);
        ok('__bindData__' in a)

        _.createCallback(b, object);
        ok(!('__bindData__' in b));

        if (_.support.funcNames) {
          _.support.funcNames = false;
          _.createCallback(c, object);
          ok('__bindData__' in c);
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
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.curry');

  (function() {
    function func(a, b, c) {
      return a + b + c;
    }

    test('should curry based on the number of arguments provided', 3, function() {
      var curried = _.curry(func);

      equal(curried(1)(2)(3), 6);
      equal(curried(1, 2)(3), 6);
      equal(curried(1, 2, 3), 6);
    });

    test('should work with partial methods', 2, function() {
      var curried = _.curry(func),
          a = _.partial(curried, 1),
          b = _.partialRight(a, 3),
          c = _.partialRight(a(2), 3);

      equal(b(2), 6);
      equal(c(), 6);
    });

    test('should return a function with a `length` of `0`', 6, function() {
      _.times(2, function(index) {
        var curried = index ? _.curry(func, 4) : _.curry(func);

        strictEqual(curried.length, 0);
        strictEqual(curried(1).length, 0);
        strictEqual(curried(1, 2).length, 0);
      });
    });

    test('ensure `new bound` is an instance of `func`', 2, function() {
      function Foo(value) {
        return value && object;
      }
      var bound = _.curry(Foo),
          object = {};

      ok(new bound(false) instanceof Foo);
      strictEqual(new bound(true), object);
    });

    test('should not alter the `this` binding', 9, function() {
      function func(a, b, c) {
        var value = this || {};
        return value[a] + value[b] + value[c];
      }

      var object = { 'a': 1, 'b': 2, 'c': 3 };

      equal(_.curry(_.bind(func, object), 3)('a')('b')('c'), 6);
      equal(_.curry(_.bind(func, object), 3)('a', 'b')('c'), 6);
      equal(_.curry(_.bind(func, object), 3)('a', 'b', 'c'), 6);

      ok(_.isEqual(_.bind(_.curry(func), object)('a')('b')('c'), NaN));
      ok(_.isEqual(_.bind(_.curry(func), object)('a', 'b')('c'), NaN));
      equal(_.bind(_.curry(func), object)('a', 'b', 'c'), 6);

      object.func = _.curry(func);

      ok(_.isEqual(object.func('a')('b')('c'), NaN));
      ok(_.isEqual(object.func('a', 'b')('c'), NaN));
      equal(object.func('a', 'b', 'c'), 6);
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

        equal(count, 0);

        setTimeout(function() {
          equal(count, 1);
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

    asyncTest('should work with `leading` option', 7, function() {
      if (!(isRhino && isModularize)) {
        var withLeading,
            counts = [0, 0, 0];

        _.forEach([true, { 'leading': true }], function(options, index) {
          var debounced = _.debounce(function(value) {
            counts[index]++;
            return value;
          }, 32, options);

          if (index == 1) {
            withLeading = debounced;
          }
          equal(debounced('x'), 'x');
        });

        _.forEach([false, { 'leading': false }], function(options) {
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
          equal(counts[1], 2);

          QUnit.start();
        }, 64);
      }
      else {
        skipTest(7);
        QUnit.start();
      }
    });

    asyncTest('should work with `trailing` option', 4, function() {
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

    test('should work with `maxWait` option', 2, function() {
      if (!(isRhino && isModularize)) {
        var limit = argv ? 1000 : 500,
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
        ok(withCount > 0);
        ok(!withoutCount);
      }
      else {
        skipTest(2);
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
        skipTest(1);
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
          equal(count, 2);
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

    test('should not error on `null` or `undefined` sources (test in IE < 9)', 1, function() {
      try {
        deepEqual(_.defaults({ 'a': 1 }, null, undefined, { 'a': 2, 'b': 2 }), { 'a': 1, 'b': 2 });
      } catch(e) {
        ok(false);
      }
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
    test('should return the difference of the given arrays', 2, function() {
      var actual = _.difference([1, 2, 3, 4, 5], [5, 2, 10]);
      deepEqual(actual, [1, 3, 4]);

      actual = _.difference([1, 2, 3, 4, 5], [5, 2, 10], [8, 4]);
      deepEqual(actual, [1, 3]);
    });

    test('should work with large arrays', 1, function() {
      var array1 = _.range(largeArraySize),
          array2 = array1.slice(),
          a = {},
          b = {},
          c = {};

      array1.push(a, b, c);
      array2.push(b, c, a);

      deepEqual(_.difference(array1, array2), []);
    });

    test('should work with large arrays of objects', 1, function() {
      var object = {};

      var largeArray = _.times(largeArraySize, function() {
        return object;
      });

      deepEqual(_.difference(largeArray, [object]), []);
    });

    test('should ignore individual secondary values', 1, function() {
      var array = [1, null, 3];
      deepEqual(_.difference(array, null, 3), array);
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.escape');

  (function() {
    var escaped = '&amp;&lt;&gt;&quot;&#39;\/',
        unescaped = '&<>"\'\/';

    test('should not escape the "/" character', 1, function() {
      equal(_.escape('/'), '/');
    });

    test('should escape values', 1, function() {
      equal(_.escape(unescaped), escaped);
    });

    test('should return an empty string when provided `null` or `undefined`', 2, function() {
      equal(_.escape(null), '');
      equal(_.escape(undefined), '');
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.every');

  (function() {
    test('should return `true` for empty or falsey collections', 1, function() {
      var expected = _.map(empties, function() { return true; });

      var actual = _.map(empties, function(value) {
        try {
          return _.every(value, _.identity);
        } catch(e) { }
      });

      deepEqual(actual, expected);
    });

    test('should return `true` if the callback returns truey for all elements in the collection', 1, function() {
      strictEqual(_.every([true, 1, 'x'], _.identity), true);
    });

    test('should return `false` as soon as the callback result is falsey', 1, function() {
      strictEqual(_.every([true, null, true], _.identity), false);
    });

    test('should work with collections of `undefined` values (test in IE < 9)', 1, function() {
      strictEqual(_.every([undefined, undefined, undefined], _.identity), false);
    });

    test('should use `_.identity` when no callback is provided', 2, function() {
      strictEqual(_.every([0]), false);
      strictEqual(_.every([1]), true);
    });

    test('should be aliased', 1, function() {
      strictEqual(_.all, _.every);
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('source property checks');

  _.forEach(['assign', 'defaults', 'merge'], function(methodName) {
    var func = _[methodName];

    test('`_.' + methodName + '` should not assign inherited `source` properties', 1, function() {
      function Foo() {}
      Foo.prototype = { 'a': 1 };
      deepEqual(func({}, new Foo), {});
    });

    test('should work when used as `callback` for `_.reduce`', 1, function() {
      var array = [{ 'a':  1 }, { 'b': 2 }, { 'c': 3 }],
          actual = _.reduce(array, _.merge);

      deepEqual(actual, { 'a':  1, 'b': 2, 'c': 3 });
    });

    if (methodName == 'merge') {
      test('`_.' + methodName + '` should treat sparse arrays as dense', 2, function() {
        var array = Array(3);
        array[0] = 1;
        array[2] = 3;

        var actual = func([], array),
            expected = array.slice();

        expected[1] = undefined;

        ok(1 in actual);
        deepEqual(actual, expected);
      });
    }
  });

  /*--------------------------------------------------------------------------*/

  QUnit.module('strict mode checks');

  _.forEach(['assign', 'bindAll', 'defaults'], function(methodName) {
    var func = _[methodName];

    test('`_.' + methodName + '` should not throw strict mode errors', 1, function() {
      var object = { 'a': null, 'b': function(){} },
          pass = true;

      if (freeze) {
        freeze(object);
        try {
          if (methodName == 'bindAll') {
            func(object);
          } else {
            func(object, { 'a': 1 });
          }
        } catch(e) {
          pass = false;
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
    test('should return elements the `callback` returns truey for', 1, function() {
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

  (function() {
    var objects = [
      { 'a': 0, 'b': 0 },
      { 'a': 1, 'b': 1 },
      { 'a': 2, 'b': 2 }
    ];

    _.forEach({
      'find': [objects[1], undefined, objects[2], objects[1]],
      'findLast': [objects[2], undefined, objects[2], objects[2]],
      'findIndex': [1, -1, 2, 1],
      'findLastIndex': [2, -1, 2, 2],
      'findKey': ['1', undefined, '2', '1'],
      'findLastKey': ['2', undefined, '2', '2']
    },
    function(expected, methodName) {
      QUnit.module('lodash.' + methodName);

      var func = _[methodName];

      test('should return the correct value', 1, function() {
        strictEqual(func(objects, function(object) { return object.a; }), expected[0]);
      });

      test('should work with a `thisArg`', 1, function() {
        strictEqual(func(objects, function(object, index) { return this[index].a; }, objects), expected[0]);
      });

      test('should return `' + expected[1] + '` if value is not found', 1, function() {
        strictEqual(func(objects, function(object) { return object.a == 3; }), expected[1]);
      });

      test('should work with an object for `collection`', 1, function() {
        var actual = _.find({ 'a': 1, 'b': 2, 'c': 3 }, function(num) {
          return num > 2;
        });

        equal(actual, 3);
      });

      test('should work with an object for `callback`', 1, function() {
        strictEqual(func(objects, { 'b': 2 }), expected[2]);
      });

      test('should work with a string for `callback`', 1, function() {
        strictEqual(func(objects, 'b'), expected[3]);
      });

      test('should return `' + expected[1] + '` for empty or falsey collections', 1, function() {
        var actual = [],
            emptyValues = /Index/.test(methodName) ? _.reject(empties, _.isPlainObject) : empties,
            expecting = _.map(emptyValues, function() { return expected[1]; });

        _.forEach(emptyValues, function(value) {
          try {
            actual.push(func(value, { 'a': 3 }));
          } catch(e) { }
        });

        deepEqual(actual, expecting);
      });

      if (methodName == 'find') {
        test('should be aliased', 2, function() {
          strictEqual(_.detect, func);
          strictEqual(_.findWhere, func);
        });
      }
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.first');

  (function() {
    var array = [1, 2, 3];

    var objects = [
      { 'a': 2, 'b': 2 },
      { 'a': 1, 'b': 1 },
      { 'a': 0, 'b': 0 }
    ];

    test('should return the first element', 1, function() {
      strictEqual(_.first(array), 1);
    });

    test('should return the first two elements', 1, function() {
      deepEqual(_.first(array, 2), [1, 2]);
    });

    test('should return an empty array when `n` < `1`', 3, function() {
      _.forEach([0, -1, -2], function(n) {
        deepEqual(_.first(array, n), []);
      });
    });

    test('should return all elements when `n` >= `array.length`', 2, function() {
      _.forEach([3, 4], function(n) {
        deepEqual(_.first(array, n), array);
      });
    });

    test('should return `undefined` when querying empty arrays', 1, function() {
      strictEqual(_.first([]), undefined);
    });

    test('should work when used as `callback` for `_.map`', 1, function() {
      var array = [[1, 2, 3], [4, 5, 6], [7, 8, 9]],
          actual = _.map(array, _.first);

      deepEqual(actual, [1, 4, 7]);
    });

    test('should work with a `callback`', 1, function() {
      var actual = _.first(array, function(num) {
        return num < 3;
      });

      deepEqual(actual, [1, 2]);
    });

    test('should pass the correct `callback` arguments', 1, function() {
      var args;

      _.first(array, function() {
        args || (args = slice.call(arguments));
      });

      deepEqual(args, [1, 0, array]);
    });

    test('should support the `thisArg` argument', 1, function() {
      var actual = _.first(array, function(num, index) {
        return this[index] < 3;
      }, array);

      deepEqual(actual, [1, 2]);
    });

    test('should chain when passing `n`, `callback`, or `thisArg`', 3, function() {
      if (!isNpm) {
        var actual = _(array).first(2);

        ok(actual instanceof _);

        actual = _(array).first(function(num) {
          return num < 3;
        });

        ok(actual instanceof _);

        actual = _(array).first(function(num, index) {
          return this[index] < 3;
        }, array);

        ok(actual instanceof _);
      }
      else {
        skipTest(3);
      }
    });

    test('should not chain when arguments are not provided', 1, function() {
      if (!isNpm) {
        var actual = _(array).first();
        strictEqual(actual, 1);
      }
      else {
        skipTest();
      }
    });

    test('should work with an object for `callback`', 1, function() {
      deepEqual(_.first(objects, { 'b': 2 }), objects.slice(0, 1));
    });

    test('should work with a string for `callback`', 1, function() {
      deepEqual(_.first(objects, 'b'), objects.slice(0, 2));
    });

    test('should be aliased', 2, function() {
      strictEqual(_.head, _.first);
      strictEqual(_.take, _.first);
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.flatten');

  (function() {
    var args = arguments,
        array = [{ 'a': [1, [2]] }, { 'a': [3] }];

    test('should flatten `arguments` objects', 1, function() {
      var actual = _.flatten([args, args]);
      deepEqual(actual, [1, 2, 3, 1, 2, 3]);
    });

    test('should work with a `callback`', 1, function() {
      var actual = _.flatten(array, function(object) {
        return object.a;
      });

      deepEqual(actual, [1, 2, 3]);
    });

    test('should work with `isShallow` and `callback`', 1, function() {
      var actual = _.flatten(array, true, function(object) {
        return object.a;
      });

      deepEqual(actual, [1, [2], 3]);
    });

    test('should pass the correct `callback` arguments', 1, function() {
      var args;

      _.flatten(array, function() {
        args || (args = slice.call(arguments));
      });

      deepEqual(args, [{ 'a': [1, [2]] }, 0, array]);
    });

    test('should support the `thisArg` argument', 1, function() {
      var actual = _.flatten(array, function(object, index) {
        return this[index].a;
      }, array);

      deepEqual(actual, [1, 2, 3]);
    });

    test('should work with a string for `callback`', 1, function() {
      deepEqual(_.flatten(array, 'a'), [1, 2, 3]);
    });

    test('should perform a deep flatten when used as `callback` for `_.map`', 1, function() {
      var array = [[[['a']]], [[['b']]]],
          actual = _.map(array, _.flatten);

      deepEqual(actual, [['a'], ['b']]);
    });

    test('should treat sparse arrays as dense', 4, function() {
      var array = [[1, 2, 3], Array(3)],
          expected = [1, 2, 3],
          actual1 = _.flatten(array),
          actual2 = _.flatten(array, true);

      expected.push(undefined, undefined, undefined);

      deepEqual(actual1, expected);
      ok(4 in actual1);

      deepEqual(actual2, expected);
      ok(4 in actual2);
    });

    test('should work with extremely large arrays', 1, function() {
      var expected = Array(5e5),
          pass = true;

      if (freeze) {
        try {
          var actual = _.flatten([expected]);
        } catch(e) {
          pass = false;
        }
        if (pass) {
          deepEqual(actual, expected);
        } else {
          ok(pass);
        }
      } else {
        skipTest();
      }
    });

    test('should work with empty arrays', 1, function() {
      var actual = _.flatten([[], [[]], [[], [[[]]]]]);
      deepEqual(actual, []);
    });

    test('should flatten nested arrays', 1, function() {
      var array = [1, [2], [3, [[4]]]],
          expected = [1, 2, 3, 4];

      deepEqual(_.flatten(array), expected);
    });

    test('should support shallow flattening nested arrays', 1, function() {
      var array = [1, [2], [3, [4]]],
          expected = [1, 2, 3, [4]];

      deepEqual(_.flatten(array, true), expected);
    });

    test('should support shallow flattening arrays of other arrays', 1, function() {
      var array = [[1], [2], [3], [[4]]],
          expected = [1, 2, 3, [4]];

      deepEqual(_.flatten(array, true), expected);
    });
  }(1, 2, 3));

  /*--------------------------------------------------------------------------*/

  QUnit.module('forEach methods');

  _.forEach(['forEach', 'forEachRight'], function(methodName) {
    var func = _[methodName];

    _.forEach({
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

        if (methodName == 'forEach') {
          deepEqual(args, ['a', 0, collection]);
          deepEqual(values, ['a', 'b', 'c']);
        } else {
          deepEqual(args, ['c', 2, collection]);
          deepEqual(values, ['c', 'b', 'a']);
        }
      });
    });

    test('`_.' + methodName + '` should be aliased', 1, function() {
      if (methodName == 'forEach') {
        strictEqual(_.each, _.forEach);
      } else {
        strictEqual(_.eachRight, _.forEachRight);
      }
    });
  });

  /*--------------------------------------------------------------------------*/

  QUnit.module('forIn methods');

  _.forEach(['forIn', 'forInRight'], function(methodName) {
    var func = _[methodName];

    test('`_.' + methodName + '` iterates over inherited properties', 1, function() {
      function Foo() { this.a = 1; }
      Foo.prototype.b = 2;

      var keys = [];
      func(new Foo, function(value, key) { keys.push(key); });
      deepEqual(keys.sort(), ['a', 'b']);
    });

    test('`_.' + methodName + '` fixes the JScript [[DontEnum]] bug with inherited properties (test in IE < 9)', 1, function() {
      function Foo() {}
      Foo.prototype = shadowedObject;

      function Bar() {}
      Bar.prototype = new Foo;
      Bar.prototype.constructor = Bar;

      var keys = [];
      func(shadowedObject, function(value, key) { keys.push(key); });
      deepEqual(keys.sort(), shadowedProps);
    });
  });

  /*--------------------------------------------------------------------------*/

  QUnit.module('forOwn methods');

  _.forEach(['forOwn', 'forOwnRight'], function(methodName) {
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
      'every',
      'filter',
      'forEach',
      'forEachRight',
      'forIn',
      'forInRight',
      'forOwn',
      'forOwnRight',
      'map',
      'reject',
      'some'
    ];

    var boolMethods = [
      'every',
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

    _.forEach(methods, function(methodName) {
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
        equal(actual, 2);

        func({ 'a': 1 }, callback, { 'a': 2 });
        equal(actual, 2);
      });
    });

    _.forEach(_.difference(methods, boolMethods), function(methodName) {
      var array = [1, 2, 3],
          func = _[methodName];

      test('`_.' + methodName + '` should return a wrapped value when chaining', 1, function() {
        if (!isNpm) {
          var actual = _(array)[methodName](noop);
          ok(actual instanceof _);
        }
        else {
          skipTest();
        }
      });
    });

    _.forEach(_.difference(methods, forInMethods), function(methodName) {
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

    _.forEach(iterationMethods, function(methodName) {
      var array = [1, 2, 3],
          func = _[methodName];

      test('`_.' + methodName + '` should return the collection', 1, function() {
        equal(func(array, Boolean), array);
      });

      test('`_.' + methodName + '` should return the existing wrapper when chaining', 1, function() {
        if (!isNpm) {
          var wrapper = _(array);
          equal(wrapper[methodName](noop), wrapper);
        }
        else {
          skipTest();
        }
      });
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('collection iteration bugs');

  _.forEach(['forEach', 'forEachRight', 'forIn', 'forInRight', 'forOwn', 'forOwnRight'], function(methodName) {
    var func = _[methodName];

    test('`_.' + methodName + '` fixes the JScript [[DontEnum]] bug (test in IE < 9)', 1, function() {
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
      function(object, builtin) {
        var message = 'non-enumerable properties on ' + builtin + '.prototype',
            props = [];

        func(object, function(value, prop) { props.push(prop); });

        if (/Error/.test(builtin)) {
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

  _.forEach(['assign', 'defaults', 'merge'], function(methodName) {
    var func = _[methodName];

    test('`_.' + methodName + '` should return the existing wrapper when chaining', 1, function() {
      if (!isNpm) {
        var wrapper = _({ 'a': 1 });
        equal(wrapper[methodName]({ 'b': 2 }), wrapper);
      }
      else {
        skipTest();
      }
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
      Foo.prototype.c = 3;

      Foo.a = 1;
      Foo.b = 2;

      var expected = { 'a': 1, 'b': 2 };
      deepEqual(func({}, Foo), expected);

      Foo.prototype = { 'c': 3 };
      deepEqual(func({}, Foo), expected);
    });

    test('`_.' + methodName + '` should work with `_.reduce`', 1, function() {
      var actual = { 'a': 1},
          array = [{ 'b': 2 }, { 'c': 3 }];

      _.reduce(array, func, actual);
      deepEqual(actual, { 'a': 1, 'b': 2, 'c': 3});
    });
  });

  _.forEach(['assign', 'merge'], function(methodName) {
    var func = _[methodName];

    test('`_.' + methodName + '` should pass the correct `callback` arguments', 2, function() {
      var args;

      func({ 'a': 1 }, { 'a': 2 }, function() {
        args || (args = slice.call(arguments));
      });

      deepEqual(args, [1, 2], 'primitive property values');

      var array = [1, 2],
          object = { 'b': 2 };

      args = null;
      func({ 'a': array }, { 'a': object }, function() {
        args || (args = slice.call(arguments));
      });

      deepEqual(args, [array, object], 'non-primitive property values');
    });

    test('`_.' + methodName + '`should support the `thisArg` argument', 1, function() {
      var actual = func({}, { 'a': 0 }, function(a, b) {
        return this[b];
      }, [2]);

      deepEqual(actual, { 'a': 2 });
    });

    test('`_.' + methodName + '` should not treat the second argument as a `callback`', 2, function() {
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

  _.forEach(['forEach', 'forEachRight', 'forIn', 'forInRight', 'forOwn', 'forOwnRight'], function(methodName) {
    var func = _[methodName];

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
      equal(values.length, 1);
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

    test('lodash.memoize should memoize values resolved to the `__proto__` key', 1, function() {
      var count = 0,
          memoized = _.memoize(function() { return ++count; });

      memoized('__proto__');
      memoized('__proto__');
      strictEqual(count, 1);
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.functions');

  (function() {
    test('should return the function names of an object', 1, function() {
      var object = { 'a': 'a', 'b': _.identity, 'c': /x/, 'd': _.each };
      deepEqual(_.functions(object), ['b', 'd']);
    });

    test('should include inherited functions', 1, function() {
      function Foo() {
        this.a = _.identity;
        this.b = 'b'
      }

      Foo.prototype.c = noop;
      deepEqual(_.functions(new Foo), ['a', 'c']);
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
          expected = _.map(values, function() { return false; });

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
  }())

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
      equal(_.indexOf(array, 3), 2);
    });

    test('should return `-1` for an unmatched value', 1, function() {
      equal(_.indexOf(array, 4), -1);
    });

    test('should work with a positive `fromIndex`', 1, function() {
      equal(_.indexOf(array, 1, 2), 3);
    });

    test('should work with `fromIndex` >= `array.length`', 4, function() {
      equal(_.indexOf(array, 1, 6), -1);
      equal(_.indexOf(array, undefined, 6), -1);
      equal(_.indexOf(array, 1, 8), -1);
      equal(_.indexOf(array, undefined, 8), -1);
    });

    test('should work with a negative `fromIndex`', 1, function() {
      equal(_.indexOf(array, 2, -3), 4);
    });

    test('should work with a negative `fromIndex` <= `-array.length`', 2, function() {
      strictEqual(_.indexOf(array, 1, -6), 0);
      strictEqual(_.indexOf(array, 2, -8), 1);
    });

    test('should ignore non-number `fromIndex` values', 1, function() {
      strictEqual(_.indexOf([1, 2, 3], 1, '1'), 0);
    });

    test('should work with `isSorted`', 1, function() {
      strictEqual(_.indexOf([1, 2, 3], 1, true), 0);
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('custom `_.indexOf` methods');

  (function() {
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

    function Foo() {}

    var array = [1, new Foo, 3, new Foo],
        indexOf = _.indexOf;

    test('`_.contains` should work with a custom `_.indexOf` method', 1, function() {
      if (!isModularize) {
        _.indexOf = custom;
        ok(_.contains(array, new Foo));
        _.indexOf = indexOf;
      }
      else {
        skipTest();
      }
    });

    test('`_.difference` should work with a custom `_.indexOf` method', 1, function() {
      if (!isModularize) {
        _.indexOf = custom;
        deepEqual(_.difference(array, [new Foo]), [1, 3]);
        _.indexOf = indexOf;
      }
      else {
        skipTest();
      }
    });

    test('`_.intersection` should work with a custom `_.indexOf` method', 1, function() {
      if (!isModularize) {
        _.indexOf = custom;
        deepEqual(_.intersection(array, [new Foo]), [array[1]]);
        _.indexOf = indexOf;
      }
      else {
        skipTest();
      }
    });

    test('`_.uniq` should work with a custom `_.indexOf` method', 2, function() {
      if (!isModularize) {
        _.indexOf = custom;
        deepEqual(_.uniq(array), array.slice(0, 3));

        var largeArray = _.times(largeArraySize, function() {
          return new Foo;
        });

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

    var objects = [
      { 'a': 0, 'b': 0 },
      { 'a': 1, 'b': 1 },
      { 'a': 2, 'b': 2 }
    ];

    test('should accept a falsey `array` argument', 1, function() {
      var expected = _.map(falsey, function() { return []; });

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

    test('should exclude the last two elements', 1, function() {
      deepEqual(_.initial(array, 2), [1]);
    });

    test('should return an empty when querying empty arrays', 1, function() {
      deepEqual(_.initial([]), []);
    });

    test('should return all elements when `n` < `1`', 3, function() {
      _.forEach([0, -1, -2], function(n) {
        deepEqual(_.initial(array, n), array);
      });
    });

    test('should return an empty array when `n` >= `array.length`', 2, function() {
      _.forEach([3, 4], function(n) {
        deepEqual(_.initial(array, n), []);
      });
    });

    test('should work when used as `callback` for `_.map`', 1, function() {
      var array = [[1, 2, 3], [4, 5, 6], [7, 8, 9]],
          actual = _.map(array, _.initial);

      deepEqual(actual, [[1, 2], [4, 5], [7, 8]]);
    });

    test('should work with a `callback`', 1, function() {
      var actual = _.initial(array, function(num) {
        return num > 1;
      });

      deepEqual(actual, [1]);
    });

    test('should pass the correct `callback` arguments', 1, function() {
      var args;

      _.initial(array, function() {
        args || (args = slice.call(arguments));
      });

      deepEqual(args, [3, 2, array]);
    });

    test('should support the `thisArg` argument', 1, function() {
      var actual = _.initial(array, function(num, index) {
        return this[index] > 1;
      }, array);

      deepEqual(actual, [1]);
    });

    test('should work with an object for `callback`', 1, function() {
      deepEqual(_.initial(objects, { 'b': 2 }), objects.slice(0, 2));
    });

    test('should work with a string for `callback`', 1, function() {
      deepEqual(_.initial(objects, 'b'), objects.slice(0, 1));
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.intersection');

  (function() {
    test('should return the intersection of the given arrays', 1, function() {
      var actual = _.intersection([1, 3, 2], [5, 2, 1, 4], [2, 1]);
      deepEqual(actual, [1, 2]);
    });

    test('should return an array of unique values', 1, function() {
      var actual = _.intersection([1, 1, 3, 2, 2], [5, 2, 2, 1, 4], [2, 1, 1]);
      deepEqual(actual, [1, 2]);
    });

    test('should work with large arrays of objects', 1, function() {
      var object = {},
          expected = [object];

      var largeArray = _.times(largeArraySize, function() {
        return object;
      });

      deepEqual(_.intersection(expected, largeArray), expected);
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

    test('should ignore individual secondary values', 1, function() {
      deepEqual(_.intersection([1, null, 3], 3, null), []);
    });
  }());

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
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.invoke');

  (function() {
    test('should invoke a methods on each element of a collection', 1, function() {
      var actual = _.invoke(['a', 'b', 'c'], 'toUpperCase');
      deepEqual(actual, ['A', 'B', 'C']);
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
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.isArguments');

  (function() {
    var args = arguments;

    test('should return `true` for `arguments` objects', 1, function() {
      strictEqual(_.isArguments(args), true);
    });

    test('should return `false` for non `arguments` objects', 9, function() {
      var expected = _.map(falsey, function() { return false; });

      var actual = _.map(falsey, function(value, index) {
        return index ? _.isArguments(value) : _.isArguments();
      });

      strictEqual(_.isArguments([1, 2, 3]), false);
      strictEqual(_.isArguments(true), false);
      strictEqual(_.isArguments(new Date), false);
      strictEqual(_.isArguments(_), false);
      strictEqual(_.isArguments({ '0': 1, 'callee': noop, 'length': 1 }), false);
      strictEqual(_.isArguments(0), false);
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

    test('should return `false` for non arrays', 9, function() {
      var expected = _.map(falsey, function() { return false; });

      var actual = _.map(falsey, function(value, index) {
        return index ? _.isArray(value) : _.isArray();
      });

      strictEqual(_.isArray(args), false);
      strictEqual(_.isArray(true), false);
      strictEqual(_.isArray(new Date), false);
      strictEqual(_.isArray(_), false);
      strictEqual(_.isArray({ '0': 1, 'length': 1 }), false);
      strictEqual(_.isArray(0), false);
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
      strictEqual(_.isBoolean(new Boolean(true)), true);
      strictEqual(_.isBoolean(new Boolean(false)), true);
    });

    test('should return `false` for non booleans', 9, function() {
      var expected = _.map(falsey, function(value) { return value === false; });

      var actual = _.map(falsey, function(value, index) {
        return index ? _.isBoolean(value) : _.isBoolean();
      });

      strictEqual(_.isBoolean(args), false);
      strictEqual(_.isBoolean([1, 2, 3]), false);
      strictEqual(_.isBoolean(new Date), false);
      strictEqual(_.isBoolean(_), false);
      strictEqual(_.isBoolean({ 'a': 1 }), false);
      strictEqual(_.isBoolean(0), false);
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

    test('should return `false` for non dates', 9, function() {
      var expected = _.map(falsey, function() { return false; });

      var actual = _.map(falsey, function(value, index) {
        return index ? _.isDate(value) : _.isDate();
      });

      strictEqual(_.isDate(args), false);
      strictEqual(_.isDate([1, 2, 3]), false);
      strictEqual(_.isDate(true), false);
      strictEqual(_.isDate(_), false);
      strictEqual(_.isDate({ 'a': 1 }), false);
      strictEqual(_.isDate(0), false);
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
    test('should use strict equality in its duck type check', 6, function() {
      var element = body || { 'nodeType': 1 };

      strictEqual(_.isElement(element), true);
      strictEqual(_.isElement({ 'nodeType': new Number(1) }), false);
      strictEqual(_.isElement({ 'nodeType': true }), false);
      strictEqual(_.isElement({ 'nodeType': [1] }), false);
      strictEqual(_.isElement({ 'nodeType': '1' }), false);
      strictEqual(_.isElement({ 'nodeType': '001' }), false);
    });

    test('should work with elements from another realm', 1, function() {
      if (_._element) {
        strictEqual(_.isElement(_._element), true);
      }
      else {
        skipTest();
      }
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.isEmpty');

  (function() {
    var args = arguments;

    test('should return `true` for empty or falsey values', 3, function() {
      var expected = _.map(empties, function() { return true; });

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

    test('fixes the JScript [[DontEnum]] bug (test in IE < 9)', 1, function() {
      equal(_.isEmpty(shadowedObject), false);
    });

    test('skips the prototype property of functions (test in Firefox < 3.6, Opera > 9.50 - Opera < 11.60, and Safari < 5.1)', 2, function() {
      function Foo() {}
      Foo.prototype.a = 1;
      strictEqual(_.isEmpty(Foo), true);

      Foo.prototype = { 'a': 1 };
      strictEqual(_.isEmpty(Foo), true);
    });

    test('should work with an object that has a `length` property', 1, function() {
      strictEqual(_.isEmpty({ 'length': 0 }), false);
    });

    test('should work with jQuery/MooTools DOM query collections', 1, function() {
      function Foo(elements) { push.apply(this, elements); }
      Foo.prototype = { 'length': 0, 'splice': Array.prototype.splice };

      strictEqual(_.isEmpty(new Foo([])), true);
    });

    test('should work with `arguments` objects (test in IE < 9)', 1, function() {
      if (!isPhantomPage) {
        strictEqual(_.isEmpty(args), false);
      } else {
        skipTest();
      }
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
        [1, 1, true], [1, new Number(1), true], [1, '1', false], [1, 2, false],
        [-0, -0, true], [0, 0, true], [0, new Number(0), true], [new Number(0), new Number(0), true], [-0, 0, false], [0, '0', false], [0, null, false],
        [NaN, NaN, true], [NaN, new Number(NaN), true], [new Number(NaN), new Number(NaN), true], [NaN, 'a', false], [NaN, Infinity, false],
        ['a', 'a', true], ['a', new String('a'), true], [new String('a'), new String('a'), true], ['a', 'b', false], ['a', ['a'], false],
        [true, true, true], [true, new Boolean(true), true], [new Boolean(true), new Boolean(true), true], [true, 1, false], [true, 'a', false],
        [false, false, true], [false, new Boolean(false), true], [new Boolean(false), new Boolean(false), true], [false, 0, false], [false, '', false],
        [null, null, true], [null, undefined, false], [null, {}, false], [null, '', false],
        [undefined, undefined, true], [undefined, null, false], [undefined, '', false]
      ];

      var expected = _.map(pairs, function(pair) {
        return pair[2];
      });

      var actual = _.map(pairs, function(pair) {
        return _.isEqual(pair[0], pair[1]);
      })

      deepEqual(actual, expected);
    });

    test('should return `false` for objects with custom `toString` methods', 1, function() {
      var primitive,
          object = { 'toString': function() { return primitive; } },
          values = [true, null, 1, 'a', undefined],
          expected = _.map(values, function() { return false; });

      var actual = _.map(values, function(value) {
        primitive = value;
        return _.isEqual(object, value);
      });

      ok(actual, expected);
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

      array1 = [new Number(1), false, new String('a'), /x/, new Date(2012, 4, 23), ['a', 'b', [new String('c')]], { 'a': 1 }];
      array2 = [1, new Boolean(false), 'a', /x/, new Date(2012, 4, 23), ['a', new String('b'), ['c']], { 'a': 1 }];

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

    test('should perform comparisons between date objects', 4, function() {
      strictEqual(_.isEqual(new Date(2012, 4, 23), new Date(2012, 4, 23)), true);
      strictEqual(_.isEqual(new Date(2012, 4, 23), new Date(2013, 3, 25)), false);
      strictEqual(_.isEqual(new Date(2012, 4, 23), { 'getTime': function() { return 1337756400000; } }), false);
      strictEqual(_.isEqual(new Date('a'), new Date('a')), false);
    });

    test('should perform comparisons between functions', 2, function() {
      function a() { return 1 + 2; }
      function b() { return 1 + 2; }

      strictEqual(_.isEqual(a, a), true);
      strictEqual(_.isEqual(a, b), false);
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
        'c': new Number(1),
        'd': 'a',
        'e': {
          'f': ['a', new String('b'), 'c'],
          'g': new Boolean(false),
          'h': new Date(2012, 4, 23),
          'i': noop,
          'j': 'a'
        }
      };

      var object2 = {
        'a': [1, new Number(2), 3],
        'b': new Boolean(true),
        'c': 1,
        'd': new String('a'),
        'e': {
          'f': ['a', 'b', 'c'],
          'g': false,
          'h': new Date(2012, 4, 23),
          'i': noop,
          'j': 'a'
        }
      };

      strictEqual(_.isEqual(object1, object2), true);
    });

    test('should perform comparisons between object instances', 4, function() {
      function Foo() {
        this.value = 1;
      }
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

    test('should perform comparisons between regexes', 4, function() {
      strictEqual(_.isEqual(/x/gim, /x/gim), true);
      strictEqual(_.isEqual(/x/gi, /x/g), false);
      strictEqual(_.isEqual(/x/, /y/), false);
      strictEqual(_.isEqual(/x/g, { 'global': true, 'ignoreCase': false, 'multiline': false, 'source': 'x' }), false);
    });

    test('should avoid common type coercions', 9, function() {
      strictEqual(_.isEqual(true, new Boolean(false)), false);
      strictEqual(_.isEqual(new Boolean(false), new Number(0)), false);
      strictEqual(_.isEqual(false, new String('')), false);
      strictEqual(_.isEqual(new Number(36), new String(36)), false);
      strictEqual(_.isEqual(0, ''), false);
      strictEqual(_.isEqual(1, true), false);
      strictEqual(_.isEqual(1337756400000, new Date(2012, 4, 23)), false);
      strictEqual(_.isEqual('36', 36), false);
      strictEqual(_.isEqual(36, '36'), false);
    });

    test('should work with sparse arrays', 2, function() {
      strictEqual(_.isEqual(Array(3), Array(3)), true);
      strictEqual(_.isEqual(Array(3), Array(6)), false);
    });

    test('should work with `arguments` objects (test in IE < 9)', 2, function() {
      var args1 = (function() { return arguments; }(1, 2, 3)),
          args2 = (function() { return arguments; }(1, 2, 3)),
          args3 = (function() { return arguments; }(1, 2));

      if (!isPhantomPage) {
        strictEqual(_.isEqual(args1, args2), true);
        strictEqual(_.isEqual(args1, args3), false);
      } else {
        skipTest(2);
      }
    });

    test('fixes the JScript [[DontEnum]] bug (test in IE < 9)', 1, function() {
      strictEqual(_.isEqual(shadowedObject, {}), false);
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
      object2.b = new Number(0);

      strictEqual(_.isEqual(object1, object2), true);

      object1.c = new Number(1);
      object2.c = new Number(2);

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
      array2[0].b = new Number(0);

      strictEqual(_.isEqual(array1, array2), true);

      array1[0].c = new Number(1);
      array2[0].c = new Number(2);

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

    test('should perform comparisons between objects with shared property values', function() {
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

    test('should pass the correct `callback` arguments', 1, function() {
      var args;

      _.isEqual('a', 'b', function() {
        args || (args = slice.call(arguments));
      });

      deepEqual(args, ['a', 'b']);
    });

    test('should correctly set the `this` binding', 1, function() {
      var actual = _.isEqual('a', 'b', function(a, b) {
        return this[a] == this[b];
      }, { 'a': 1, 'b': 1 });

      strictEqual(actual, true);
    });

    test('should handle comparisons if `callback` returns `undefined`', 1, function() {
      var actual = _.isEqual('a', 'a', function() {});
      strictEqual(actual, true);
    });

    test('should return a boolean value even if `callback` does not', 2, function() {
      var actual = _.isEqual('a', 'a', function() { return 'a'; });
      strictEqual(actual, true);

      var expected = _.map(falsey, function() { return false; });
      actual = [];

      _.forEach(falsey, function(value) {
        actual.push(_.isEqual('a', 'b', function() { return value; }));
      });

      deepEqual(actual, expected);
    });

    test('should ensure `callback` is a function', 1, function() {
      var array = [1, 2, 3],
          eq = _.partial(_.isEqual, array),
          actual = _.every([array, [1, 0, 3]], eq);

      strictEqual(actual, false);
    });

    test('should treat objects created by `Object.create(null)` like any other plain object', 2, function() {
      function Foo() { this.a = 1; }
      Foo.prototype.constructor = null;

      var other = { 'a': 1 };
      strictEqual(_.isEqual(new Foo, other), false);

      if (create)  {
        var object = Object.create(null);
        object.a = 1;
        strictEqual(_.isEqual(object, other), true);
      }
      else {
        skipTest();
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
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.isFinite');

  (function() {
    test('should return `true` for finite values', 5, function() {
      strictEqual(_.isFinite(0), true);
      strictEqual(_.isFinite(1), true);
      strictEqual(_.isFinite(3.14), true);
      strictEqual(_.isFinite(-1), true);
      strictEqual(_.isFinite(new Number(0)), true);
    });

    test('should return `false` for non-finite values', 3, function() {
      strictEqual(_.isFinite(NaN), false);
      strictEqual(_.isFinite(Infinity), false);
      strictEqual(_.isFinite(-Infinity), false);
    });

    test('should return `false` for non-numeric values', 8, function() {
      strictEqual(_.isFinite(null), false);
      strictEqual(_.isFinite(undefined), false);
      strictEqual(_.isFinite([]), false);
      strictEqual(_.isFinite(true), false);
      strictEqual(_.isFinite(new Date), false);
      strictEqual(_.isFinite(''), false);
      strictEqual(_.isFinite(' '), false);
      strictEqual(_.isFinite('2px'), false);
    });

    test('should return `true` for numeric string values', 3, function() {
      strictEqual(_.isFinite('2'), true);
      strictEqual(_.isFinite('0'), true);
      strictEqual(_.isFinite('08'), true);
    });

    test('should work with numbers from another realm', 1, function() {
      if (_._object) {
        strictEqual(_.isFinite(_._number), true);
      }
      else {
        skipTest();
      }
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.isFunction');

  (function() {
    var args = arguments;

    test('should return `true` for functions', 1, function() {
      strictEqual(_.isFunction(_), true);
    });

    test('should return `false` for non functions', 9, function() {
      var expected = _.map(falsey, function() { return false; });

      var actual = _.map(falsey, function(value, index) {
        return index ? _.isFunction(value) : _.isFunction();
      });

      strictEqual(_.isFunction(args), false);
      strictEqual(_.isFunction([1, 2, 3]), false);
      strictEqual(_.isFunction(true), false);
      strictEqual(_.isFunction(new Date), false);
      strictEqual(_.isFunction({ 'a': 1 }), false);
      strictEqual(_.isFunction(0), false);
      strictEqual(_.isFunction(/x/), false);
      strictEqual(_.isFunction('a'), false);

      deepEqual(actual, expected);
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
      strictEqual(_.isNaN(new Number(NaN)), true);
    });

    test('should return `false` for non NaNs', 10, function() {
      var expected = _.map(falsey, function(value) { return value !== value; });

      var actual = _.map(falsey, function(value, index) {
        return index ? _.isNaN(value) : _.isNaN();
      });

      strictEqual(_.isNaN(args), false);
      strictEqual(_.isNaN([1, 2, 3]), false);
      strictEqual(_.isNaN(true), false);
      strictEqual(_.isNaN(new Date), false);
      strictEqual(_.isNaN(_), false);
      strictEqual(_.isNaN({ 'a': 1 }), false);
      strictEqual(_.isNaN(0), false);
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

    test('should return `false` for non nulls', 10, function() {
      var expected = _.map(falsey, function(value) { return value === null; });

      var actual = _.map(falsey, function(value, index) {
        return index ? _.isNull(value) : _.isNull();
      });

      strictEqual(_.isNull(args), false);
      strictEqual(_.isNull([1, 2, 3]), false);
      strictEqual(_.isNull(true), false);
      strictEqual(_.isNull(new Date), false);
      strictEqual(_.isNull(_), false);
      strictEqual(_.isNull({ 'a': 1 }), false);
      strictEqual(_.isNull(0), false);
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
      strictEqual(_.isNumber(new Number(0)), true);
    });

    test('should return `false` for non numbers', 9, function() {
      var expected = _.map(falsey, function(value) { return typeof value == 'number'; });

      var actual = _.map(falsey, function(value, index) {
        return index ? _.isNumber(value) : _.isNumber();
      });

      strictEqual(_.isNumber(args), false);
      strictEqual(_.isNumber([1, 2, 3]), false);
      strictEqual(_.isNumber(true), false);
      strictEqual(_.isNumber(new Date), false);
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

    test('should return `true` for objects', 10, function() {
      strictEqual(_.isObject(args), true);
      strictEqual(_.isObject([1, 2, 3]), true);
      strictEqual(_.isObject(new Boolean(false)), true);
      strictEqual(_.isObject(new Date), true);
      strictEqual(_.isObject(_), true);
      strictEqual(_.isObject({ 'a': 1 }), true);
      strictEqual(_.isObject(new Number(0)), true);
      strictEqual(_.isObject(/x/), true);
      strictEqual(_.isObject(new String('a')), true);

      if (document) {
        strictEqual(_.isObject(body), true);
      } else {
        skipTest(1);
      }
    });

    test('should return `false` for non objects', 1, function() {
      var values = falsey.concat('a', true),
          expected = _.map(values, function() { return false; });

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

    test('should avoid V8 bug #2291', 1, function() {
      // trigger V8 bug
      // http://code.google.com/p/v8/issues/detail?id=2291
      var obj = {},
          str = 'foo';

      // 1: Useless comparison statement, this is half the trigger
      obj == obj;
      // 2: Initial check with object, this is the other half of the trigger
      _.isObject(obj);

      equal(_.isObject(str), false);
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

      strictEqual(_.isPlainObject(new Foo(1)), false);
      strictEqual(_.isPlainObject([1, 2, 3]), false);
      strictEqual(_.isPlainObject({ 'a': 1 }), true);

      if (create) {
        strictEqual(_.isPlainObject(create(null)), true);
      } else {
        skipTest();
      }
      if (element) {
        strictEqual(_.isPlainObject(element), false);
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

    test('should return `true` for empty objects', 1, function() {
      strictEqual(_.isPlainObject({}), true);
    });

    test('should return `false` for Object objects without a [[Class]] of "Object"', 4, function() {
      strictEqual(_.isPlainObject(arguments), false);
      strictEqual(_.isPlainObject(Error), false);
      strictEqual(_.isPlainObject(Math), false);
      strictEqual(_.isPlainObject(root), false);
    });

    test('should return `false` for non objects', 3, function() {
      var expected = _.map(falsey, function() { return false; });

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

    test('should return `false` for non regexes', 9, function() {
      var expected = _.map(falsey, function(value) { return false; });

      var actual = _.map(falsey, function(value, index) {
        return index ? _.isRegExp(value) : _.isRegExp();
      });

      strictEqual(_.isRegExp(args), false);
      strictEqual(_.isRegExp([1, 2, 3]), false);
      strictEqual(_.isRegExp(true), false);
      strictEqual(_.isRegExp(new Date), false);
      strictEqual(_.isRegExp(_), false);
      strictEqual(_.isRegExp({ 'a': 1 }), false);
      strictEqual(_.isRegExp(0), false);
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
      strictEqual(_.isString(new String('a')), true);
    });

    test('should return `false` for non strings', 9, function() {
      var expected = _.map(falsey, function(value) { return value === ''; });

      var actual = _.map(falsey, function(value, index) {
        return index ? _.isString(value) : _.isString();
      });

      strictEqual(_.isString(args), false);
      strictEqual(_.isString([1, 2, 3]), false);
      strictEqual(_.isString(true), false);
      strictEqual(_.isString(new Date), false);
      strictEqual(_.isString(_), false);
      strictEqual(_.isString({ '0': 1, 'length': 1 }), false);
      strictEqual(_.isString(0), false);
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

    test('should return `false` for non `undefined` values', 10, function() {
      var expected = _.map(falsey, function(value) { return value === undefined; });

      var actual = _.map(falsey, function(value, index) {
        return _.isUndefined(value);
      });

      strictEqual(_.isUndefined(args), false);
      strictEqual(_.isUndefined([1, 2, 3]), false);
      strictEqual(_.isUndefined(true), false);
      strictEqual(_.isUndefined(new Date), false);
      strictEqual(_.isUndefined(_), false);
      strictEqual(_.isUndefined({ 'a': 1 }), false);
      strictEqual(_.isUndefined(0), false);
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
    test('should return `false` for subclassed values', 7, function() {
      var funcs = [
        'isArray', 'isBoolean', 'isDate', 'isFunction',
        'isNumber', 'isRegExp', 'isString'
      ];

      _.forEach(funcs, function(methodName) {
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
      try {
        var xml = new ActiveXObject('Microsoft.XMLDOM');
      } catch(e) { }

      if (xml) {
        var funcs = [
          'isArray', 'isArguments', 'isBoolean', 'isDate', 'isElement', 'isFunction',
          'isObject', 'isNull', 'isNumber', 'isRegExp', 'isString', 'isUndefined'
        ];

        _.forEach(funcs, function(methodName) {
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
        skipTest(12)
      }
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.keys');

  (function() {
    var args = arguments;

    test('should return the keys of an object', 1, function() {
      var object = { 'a': 1, 'b': 1 };
      deepEqual(_.keys(object), ['a', 'b']);
    });

    test('should work with sparse arrays', 1, function() {
      var array = [1];
      array[2] = 3;
      deepEqual(_.keys(array), ['0', '2']);
    });

    test('should work with `arguments` objects (test in IE < 9)', 1, function() {
      if (!isPhantomPage) {
        deepEqual(_.keys(args), ['0', '1', '2']);
      } else {
        skipTest();
      }
    });

    test('fixes the JScript [[DontEnum]] bug (test in IE < 9)', 2, function() {
      function Foo() {}
      Foo.prototype.a = 1;

      deepEqual(_.keys(Foo.prototype), ['a']);
      deepEqual(_.keys(shadowedObject).sort(), shadowedProps);
    });

    test('skips the prototype property of functions (test in Firefox < 3.6, Opera > 9.50 - Opera < 11.60, and Safari < 5.1)', 2, function() {
      function Foo() {}
      Foo.prototype.c = 3;

      Foo.a = 1;
      Foo.b = 2;

      var expected = ['a', 'b'];
      deepEqual(_.keys(Foo), expected);

      Foo.prototype = { 'c': 3 };
      deepEqual(_.keys(Foo), expected);
    });
  }(1, 2, 3));

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.last');

  (function() {
    var array = [1, 2, 3];

    var objects = [
      { 'a': 0, 'b': 0 },
      { 'a': 1, 'b': 1 },
      { 'a': 2, 'b': 2 }
    ];

    test('should return the last element', 1, function() {
      equal(_.last(array), 3);
    });

    test('should return the last two elements', 1, function() {
      deepEqual(_.last(array, 2), [2, 3]);
    });

    test('should return an empty array when `n` < `1`', 3, function() {
      _.forEach([0, -1, -2], function(n) {
        deepEqual(_.last(array, n), []);
      });
    });

    test('should return all elements when `n` >= `array.length`', 2, function() {
      _.forEach([3, 4], function(n) {
        deepEqual(_.last(array, n), array);
      });
    });

    test('should return `undefined` when querying empty arrays', 1, function() {
      strictEqual(_.last([]), undefined);
    });

    test('should work when used as `callback` for `_.map`', 1, function() {
      var array = [[1, 2, 3], [4, 5, 6], [7, 8, 9]],
          actual = _.map(array, _.last);

      deepEqual(actual, [3, 6, 9]);
    });

    test('should work with a `callback`', 1, function() {
      var actual = _.last(array, function(num) {
        return num > 1;
      });

      deepEqual(actual, [2, 3]);
    });

    test('should pass the correct `callback` arguments', 1, function() {
      var args;

      _.last(array, function() {
        args || (args = slice.call(arguments));
      });

      deepEqual(args, [3, 2, array]);
    });

    test('should support the `thisArg` argument', 1, function() {
      var actual = _.last(array, function(num, index) {
        return this[index] > 1;
      }, array);

      deepEqual(actual, [2, 3]);
    });

    test('should chain when passing `n`, `callback`, or `thisArg`', 3, function() {
      if (!isNpm) {
        var actual = _(array).last(2);

        ok(actual instanceof _);

        actual = _(array).last(function(num) {
          return num > 1;
        });

        ok(actual instanceof _);

        actual = _(array).last(function(num, index) {
          return this[index] > 1;
        }, array);

        ok(actual instanceof _);
      }
      else {
        skipTest(3);
      }
    });

    test('should not chain when arguments are not provided', 1, function() {
      if (!isNpm) {
        var actual = _(array).last();
        equal(actual, 3);
      }
      else {
        skipTest();
      }
    });

    test('should work with an object for `callback`', 1, function() {
      deepEqual(_.last(objects, { 'b': 2 }), objects.slice(-1));
    });

    test('should work with a string for `callback`', 1, function() {
      deepEqual(_.last(objects, 'b'), objects.slice(-2));
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.lastIndexOf');

  (function() {
    var array = [1, 2, 3, 1, 2, 3];

    test('should return the index of the last matched value', 1, function() {
      equal(_.lastIndexOf(array, 3), 5);
    });

    test('should return `-1` for an unmatched value', 1, function() {
      equal(_.lastIndexOf(array, 4), -1);
    });

    test('should work with a positive `fromIndex`', 1, function() {
      strictEqual(_.lastIndexOf(array, 1, 2), 0);
    });

    test('should work with `fromIndex` >= `array.length`', 4, function() {
      equal(_.lastIndexOf(array, undefined, 6), -1);
      equal(_.lastIndexOf(array, 1, 6), 3);
      equal(_.lastIndexOf(array, undefined, 8), -1);
      equal(_.lastIndexOf(array, 1, 8), 3);
    });

    test('should work with a negative `fromIndex`', 1, function() {
      strictEqual(_.lastIndexOf(array, 2, -3), 1);
    });

    test('should work with a negative `fromIndex` <= `-array.length`', 2, function() {
      strictEqual(_.lastIndexOf(array, 1, -6), 0);
      equal(_.lastIndexOf(array, 2, -8), -1);
    });

    test('should ignore non-number `fromIndex` values', 2, function() {
      equal(_.lastIndexOf([1, 2, 3], 3, '1'), 2);
      equal(_.lastIndexOf([1, 2, 3], 3, true), 2);
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('indexOf methods');

  (function() {
    _.forEach(['indexOf', 'lastIndexOf'], function(methodName) {
      var func = _[methodName];

      test('`_.' + methodName + '` should accept a falsey `array` argument', 1, function() {
        var expected = _.map(falsey, function() { return -1; });

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

    test('should return a wrapped value when chaining', 1, function() {
      if (!isNpm) {
        ok(_(array).map(noop) instanceof _);
      }
      else {
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

    test('should accept a falsey `array` argument', 1, function() {
      var expected = _.map(falsey, function() { return []; });

      var actual = _.map(falsey, function(value, index) {
        try {
          return index ? _.map(value) : _.map();
        } catch(e) { }
      });

      deepEqual(actual, expected);
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

    test('should return a wrapped value when chaining', 1, function() {
      if (!isNpm) {
        ok(_(object).mapValues(noop) instanceof _);
      }
      else {
        skipTest();
      }
    });

    test('should accept a falsey `object` argument', 1, function() {
      var expected = _.map(falsey, function() { return {}; });

      var actual = _.map(falsey, function(value, index) {
        try {
          return index ? _.mapValues(value) : _.mapValues();
        } catch(e) { }
      });

      deepEqual(actual, expected);
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.max');

  (function() {
    test('should return the largest value from a collection', 1, function() {
      equal(3, _.max([1, 2, 3]));
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
    test('should memoize results based on the first argument passed', 2, function() {
      var memoized = _.memoize(function(a, b, c) {
        return a + b + c;
      });

      equal(memoized(1, 2, 3), 6);
      equal(memoized(1, 3, 5), 6);
    });

    test('should support a `resolver` argument', 2, function() {
      function func(a, b, c) {
        return a + b + c;
      }

      var memoized = _.memoize(func, func);
      equal(memoized(1, 2, 3), 6);
      equal(memoized(1, 3, 5), 9);
    });

    test('should not set a `this` binding', 2, function() {
      var memoized = _.memoize(function(a, b, c) {
        return a + this.b + this.c;
      });

      var object = { 'b': 2, 'c': 3, 'memoized': memoized };
      equal(object.memoized(1), 6);
      equal(object.memoized(2), 7);
    });

    test('should check cache for own properties', 1, function() {
      var actual = [],
          memoized = _.memoize(_.identity);

      _.forEach(shadowedProps, function(value) {
        actual.push(memoized(value));
      });

      deepEqual(actual, shadowedProps);
    });

    test('should expose a `cache` object on the `memoized` function', 2, function() {
      var memoized = _.memoize(_.identity, _.identity);

      memoized('x');
      equal(memoized.cache.x, 'x');

      memoized.cache.x = 'y';
      equal(memoized('x'), 'y');
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

    test('should not treat `arguments` objects as plain objects', 1, function() {
      var object = {
        'args': args
      };

      var source = {
        'args': { '3': 4 }
      };

      var actual = _.merge(object, source);
      equal(_.isArguments(actual.args), false);
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
      var actual = _.merge({ 'a': 1 }, { 'a': undefined });
      strictEqual(actual.a, 1);
    });

    test('should handle merging if `callback` returns `undefined`', 1, function() {
      var actual = _.merge({ 'a': { 'b': [1, 1] } }, { 'a': { 'b': [0] } }, function() {});
      deepEqual(actual, { 'a': { 'b': [0, 1] } });
    });

    test('should defer to `callback` when it returns a value other than `undefined`', 1, function() {
      var actual = _.merge({ 'a': { 'b': [0, 1] } }, { 'a': { 'b': [2] } }, function(a, b) {
        return _.isArray(a) ? a.concat(b) : undefined;
      });
      deepEqual(actual, { 'a': { 'b': [0, 1, 2] } });
    });

    test('should pass the correct values to `callback`', 1, function() {
      var argsList = [],
          array = [1, 2],
          object = { 'b': 2 };

      _.merge({ 'a': array }, { 'a': object }, function(a, b) {
        argsList.push(slice.call(arguments));
      });

      deepEqual(argsList, [[array, object], [undefined, 2]]);
    });
  }(1, 2, 3));

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.min');

  (function() {
    test('should return the smallest value from a collection', 1, function() {
      equal(1, _.min([1, 2, 3]));
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

  _.forEach(['max', 'min'], function(methodName) {
    var array = [1, 2, 3],
        func = _[methodName];

    test('`_.' + methodName + '` should work with Date objects', 1, function() {
      var now = new Date,
          past = new Date(0);

      equal(func([now, past]), methodName == 'max' ? now : past);
    });

    test('`_.' + methodName + '` should work with a `callback` argument', 1, function() {
      var actual = func(array, function(num) {
        return -num;
      });

      equal(actual, methodName == 'max' ? 1 : 3);
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

      equal(actual, methodName == 'max' ? 1 : 3);
    });

    test('`_.' + methodName + '` should work when used as `callback` for `_.map`', 1, function() {
      var array = [[2, 3, 1], [5, 6, 4], [8, 9, 7]],
          actual = _.map(array, func);

      deepEqual(actual, methodName == 'max' ? [3, 6, 9] : [1, 4, 7]);
    });

    test('`_.' + methodName + '` should iterate an object', 1, function() {
      var actual = func({ 'a': 1, 'b': 2, 'c': 3 });
      equal(actual, methodName == 'max' ? 3 : 1);
    });

    test('`_.' + methodName + '` should iterate a string', 2, function() {
      _.forEach(['abc', Object('abc')], function(value) {
        var actual = func(value);
        equal(actual, methodName == 'max' ? 'c' : 'a');
      });
    });

    test('`_.' + methodName + '` should resolve the correct value when provided an array containing only one value', 1, function() {
      if (!isNpm) {
        var actual = _([40])[methodName]().value();
        strictEqual(actual, 40);
      }
      else {
        skipTest();
      }
    });

    test('`_.' + methodName + '` should work with extremely large arrays', 1, function() {
      var array = _.range(0, 5e5);
      equal(func(array), methodName == 'max' ? 499999 : 0);
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
        source = { 'a': function(array) { return array[0]; } };

    test('should accept an `object` argument', 1, function() {
      var lodash = {};
      _.mixin(lodash, source);
      strictEqual(lodash.a(value), 'a');
    });

    test('should accept a function `object` argument', 2, function() {
      _.mixin(wrapper, source);

      var wrapped = wrapper(value),
          actual = wrapped.a();

      strictEqual(actual.__wrapped__, 'a');
      ok(actual instanceof wrapper);

      delete wrapper.a;
      delete wrapper.prototype.a;
    });

    test('should mixin `source` methods into lodash', 4, function() {
      if (!isNpm) {
        _.mixin({
          'a': 'a',
          'A': function(string) { return string.toUpperCase(); }
        });

        equal('a' in _, false);
        equal('a' in _.prototype, false);

        delete _.a;
        delete _.prototype.a;

        equal(_.A('a'), 'A');
        equal(_('a').A().value(), 'A');

        delete _.A;
        delete _.prototype.A;
      }
      else {
        skipTest(4);
      }
    });

    test('should accept an `options` argument', 16, function() {
      function message(func, chain) {
        return (func === _ ? 'lodash' : 'provided') + ' function should ' + (chain ? '' : 'not ') + 'chain';
      }

      _.forEach([_, wrapper], function(func) {
        _.forEach([false, true, { 'chain': false }, { 'chain': true }], function(options) {
          if (func === _) {
            _.mixin(source, options);
          } else {
            _.mixin(func, source, options);
          }
          var wrapped = func(value),
              actual = wrapped.a();

          if (options && (options === true || options.chain)) {
            strictEqual(actual.__wrapped__, 'a', message(func, true));
            ok(actual instanceof func, message(func, true));
          } else {
            strictEqual(actual, 'a', message(func, false));
            equal(actual instanceof func, false, message(func, false));
          }
          delete func.a;
          delete func.prototype.a;
        });
      });
    });

    test('should not error when passed non-object `options` values', 2, function() {
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

      ok(pass);
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.noop');

  (function() {
    test('should always return `undefined`', 1, function() {
      var values = falsey.concat([], true, new Date, _, {}, /x/, 'a'),
          expected = _.map(values, function() { return undefined; });

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

    test('should work with a `callback` argument', 1, function() {
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
  }('a', 'c'));

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.once');

  (function() {
    test('should execute `func` once', 1, function() {
      var count = 0,
          func = _.once(function() { count++; });

      func();
      func();
      strictEqual(count, 1);
    });

    test('should not set a `this` binding', 1, function() {
      var func = _.once(function() { this.count++; }),
          object = { 'count': 0, 'once': func };

      object.once();
      object.once();
      strictEqual(object.count, 1);
    });

    test('should ignore recursive calls', 1, function() {
      var count = 0;

      var func = _.once(function() {
        count++;
        func();
      });

      func();
      strictEqual(count, 1);
    });

    test('should not throw more than once', 2, function() {
      var pass = true;

      var func = _.once(function() {
        throw new Error;
      });

      raises(function() { func(); }, Error);

      try {
        func();
      } catch(e) {
        pass = false;
      }
      ok(pass);
    });
  }());

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
    test('should parse strings with leading whitespace and zeros with a `radix` of 10 by default (test in Chrome, Firefox, and Opera)', 2, function() {
      var whitespace = ' \x09\x0B\x0C\xA0\ufeff\x0A\x0D\u2028\u2029\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000';
      equal(_.parseInt('08'), 8);
      equal(_.parseInt(whitespace + '08'), 8);
    });

    test('should use a radix of `10`, for non-hexadecimals, if `radix` is `undefined` or `0`', 3, function() {
      equal(_.parseInt('10', 0), 10);
      equal(_.parseInt('10'), 10);
      equal(_.parseInt('10', undefined), 10);
    });

    test('should use a radix of `16`, for hexadecimals, if `radix` is `undefined` or `0`', 3, function() {
      equal(_.parseInt('0x20', 0), 32);
      equal(_.parseInt('0x20'), 32);
      equal(_.parseInt('0x20', undefined), 32);
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('partial methods');

  _.forEach(['partial', 'partialRight'], function(methodName) {
    var func = _[methodName],
        isPartial = methodName == 'partial';

    test('`_.' + methodName + '` partially applies without additional arguments', 1, function() {
      var arg = 'a',
          fn = function(x) { return x; };

      equal(func(fn, arg)(), arg);
    });

    test('`_.' + methodName + '` partially applies with additional arguments', 1, function() {
      var arg1 = 'a',
          arg2 = 'b',
          expected = [arg1, arg2],
          fn = function(x, y) { return [x, y]; };

      if (!isPartial) {
        expected.reverse();
      }
      deepEqual(func(fn, arg1)(arg2), expected);
    });

    test('`_.' + methodName + '` works without partially applying arguments, without additional arguments', 1, function() {
      var fn = function() { return arguments.length; };
      strictEqual(func(fn)(), 0);
    });

    test('`_.' + methodName + '` works without partially applying arguments, with additional arguments', 1, function() {
      var arg = 'a',
          fn = function(x) { return x; };

      equal(func(fn)(arg), arg);
    });

    test('`_.' + methodName + '` should not alter the `this` binding', 3, function() {
      var object = { 'a': 1 },
          fn = function() { return this.a; };

      strictEqual(func(_.bind(fn, object))(), object.a);
      strictEqual(_.bind(func(fn), object)(), object.a);

      object.fn = func(fn);
      strictEqual(object.fn(), object.a);
    });

    test('`_.' + methodName + '` returns a function with a `length` of `0`', 1, function() {
      var fn = function(a, b, c) {},
          actual = func(fn, 'a');

      strictEqual(actual.length, 0);
    });

    test('ensure `new bound` is an instance of `func`', 2, function() {
      function Foo(value) {
        return value && object;
      }
      var bound = func(Foo),
          object = {};

      ok(new bound instanceof Foo);
      strictEqual(new bound(true), object);
    });

    test('`_.' + methodName + '` should clone `__bindData__` for created functions', 3, function() {
      function greet(greeting, name) {
        return greeting + ' ' + name;
      }
      var par1 = func(greet, 'hi'),
          par2 = func(par1, 'barney'),
          par3 = func(par1, 'pebbles');

      equal(par1('fred'), isPartial ? 'hi fred' : 'fred hi')
      equal(par2(), isPartial ? 'hi barney'  : 'barney hi');
      equal(par3(), isPartial ? 'hi pebbles' : 'pebbles hi');
    });
  });

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.partialRight');

  (function() {
    test('should work as a deep `_.defaults`', 1, function() {
      var object = { 'a': { 'b': 1 } },
          source = { 'a': { 'b': 2, 'c': 3 } },
          expected = { 'a': { 'b': 1, 'c': 3 } };

      var deepDefaults = _.partialRight(_.merge, _.defaults);
      deepEqual(deepDefaults(object, source), expected);
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('methods using `createWrapper`');

  (function() {
    test('combinations of partial functions should work', 1, function() {
      function func() {
        return slice.call(arguments);
      }
      var a = _.partial(func),
          b = _.partialRight(a, 3),
          c = _.partial(b, 1);

      deepEqual(c(2), [1, 2, 3]);
    });

    test('combinations of bound and partial functions should work', 3, function() {
      function func() {
        var result = [this.x];
        push.apply(result, arguments);
        return result;
      }
      var expected = [1, 2, 3, 4],
          object = { 'func': func, 'x': 1 };

      var a = _.bindKey(object, 'func'),
          b = _.partialRight(a, 4),
          c = _.partial(b, 2);

      deepEqual(c(3), expected);

      a = _.bind(func, object);
      b = _.partialRight(a, 4);
      c = _.partial(b, 2);

      deepEqual(c(3), expected);

      a = _.partial(func, 2);
      b = _.bind(a, object);
      c = _.partialRight(b, 4);

      deepEqual(c(3), expected);
    });

    test('recursively bound functions should work', 1, function() {
      function func() {
        return this.x;
      }
      var a = _.bind(func, { 'x': 1 }),
          b = _.bind(a, { 'x': 2 }),
          c = _.bind(b, { 'x': 3 });

      strictEqual(c(), 1);
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

    test('should work with a `callback` argument', 1, function() {
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
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.property');

  (function() {
    test('should create a function that plucks a property value of a given object', 3, function() {
      var object = { 'a': 1, 'b': 2 },
          actual = _.property('a');

      equal(actual.length, 1);
      strictEqual(actual(object), 1);

      actual =  _.property('b');
      strictEqual(actual(object), 2);
    });

    test('should work with non-string `prop` arguments', 1, function() {
      var array = [1, 2, 3],
          actual = _.property(1);

      equal(actual(array), 2);
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
      equal(0 in array, false);
      equal(2 in array, false);
    });

    test('should treat holes as `undefined`', 1, function() {
      var array = [1, 2, 3];
      delete array[1];

      _.pull(array, undefined);
      deepEqual(array, [1, 3]);
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.random');

  (function() {
    var array = Array(1000);

    test('should return `0` or `1` when arguments are not provided', 1, function() {
      var actual = _.random();
      ok(actual === 0 || actual === 1);
    });

    test('supports not passing a `max` argument', 1, function() {
      var actual = _.random(5);
      ok(_.some(array, function() {
        return _.random(5) != 5;
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

    test('supports passing a `floating` argument', 3, function() {
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
    var func = _.range;

    test('should work when passing a single `end` argument', 1, function() {
      deepEqual(_.range(4), [0, 1, 2, 3]);
    });

    test('should work when passing `start` and `end` arguments', 1, function() {
      deepEqual(_.range(1, 5), [1, 2, 3, 4]);
    });

    test('should work when passing `start`, `end`, and `step` arguments', 1, function() {
      deepEqual(_.range(0, 20, 5), [0, 5, 10, 15]);
    });

    test('should support a `step` of `0`', 1, function() {
      deepEqual(_.range(1, 4, 0), [1, 1, 1]);
    });

    test('should work when passing `step` larger than `end`', 1, function() {
      deepEqual(_.range(1, 5, 20), [1]);
    });

    test('should work when passing a negative `step` argument', 2, function() {
      deepEqual(_.range(0, -4, -1), [0, -1, -2, -3]);
      deepEqual(_.range(21, 10, -3), [21, 18, 15, 12]);
    });

    test('should treat falsey `start` arguments as `0`', 13, function() {
      _.forEach(falsey, function(value, index) {
        if (index) {
          deepEqual(_.range(value), []);
          deepEqual(_.range(value, 1), [0]);
        } else {
          deepEqual(_.range(), []);
        }
      });
    });

    test('should coerce arguments to numbers', 1, function() {
      var actual = [func('0',1), func('1'), func(0, 1, '1')];
      deepEqual(actual, [[0], [0], [0]]);
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

    _.forEach({
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
        equal(actual, 'abc');
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
      equal(_.reduceRight(array), 3);
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

    _.forEach({
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
        equal(actual, 'cba');
      });
    });

    test('should be aliased', 1, function() {
      strictEqual(_.foldr, _.reduceRight);
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('reduce methods');

  _.forEach(['reduce', 'reduceRight'], function(methodName) {
    var array = [1, 2, 3],
        func = _[methodName];

    test('`_.' + methodName + '` should reduce a collection to a single value', 1, function() {
      var actual = func(['a', 'b', 'c'], function(accumulator, value) {
        return accumulator + value;
      }, '');

      equal(actual, methodName == 'reduce' ? 'abc' : 'cba');
    });

    test('`_.' + methodName + '` should support the `thisArg` argument', 1, function() {
      var actual = func(array, function(sum, num, index) {
        return sum + this[index];
      }, 0, array);

      deepEqual(actual, 6);
    });

    test('`_.' + methodName + '` should return an unwrapped value when chaining', 1, function() {
      if (!isNpm) {
        var actual = _(array)[methodName](function(sum, num) {
          return sum + num;
        });

        equal(actual, 6);
      }
      else {
        skipTest();
      }
    });

    test('`_.' + methodName + '` should support empty or falsey collections without an initial `accumulator` value', 1, function() {
      var actual = [],
          expected = _.map(empties, function() { return undefined; });

      _.forEach(empties, function(value) {
        try {
          actual.push(func(value, noop));
        } catch(e) { }
      });

      deepEqual(actual, expected);
    });

    test('`_.' + methodName + '` should support empty or falsey collections with an initial `accumulator` value', 1, function() {
      var expected = _.map(empties, function() { return 'x'; });

      var actual = _.map(empties, function(value) {
        try {
          return func(value, noop, 'x');
        } catch(e) { }
      });

      deepEqual(actual, expected);
    });

    test('`_.' + methodName + '` should handle an initial `accumulator` value of `undefined`', 1, function() {
      var actual = func([], noop, undefined);
      strictEqual(actual, undefined);
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

  _.forEach(['filter', 'reject'], function(methodNames) {
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

    test('should pass the correct `callback` arguments', 1, function() {
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
      equal(0 in array, false);
      equal(2 in array, false);
    });

    test('should treat holes as `undefined`', 1, function() {
      var array = [1, 2, 3];
      delete array[1];

      _.remove(array, function(num) { return num == null; });
      deepEqual(array, [1, 3]);
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.result');

  (function() {
    test('should resolve property values', 4, function() {
      var object = {
        'a': 1,
        'b': 2,
        'c': function(){ return this.b; }
      };

      strictEqual(_.result(object, 'a'), 1);
      strictEqual(_.result(object, 'b'), 2);
      strictEqual(_.result(object, 'c'), 2);
      strictEqual(_.result(object, 'd'), undefined);
    });

    test('should return `undefined` when provided a falsey `object` argument', 1, function() {
      var actual = [],
          expected = _.map(falsey, function() { return undefined; });

      _.forEach(falsey, function(value, index) {
        try {
          actual.push(index ? _.result(value) : _.result());
        } catch(e) { }
      });

      deepEqual(actual, expected);
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.rest');

  (function() {
    var array = [1, 2, 3];

    var objects = [
      { 'a': 2, 'b': 2 },
      { 'a': 1, 'b': 1 },
      { 'a': 0, 'b': 0 }
    ];

    test('should accept a falsey `array` argument', 1, function() {
      var expected = _.map(falsey, function() { return []; });

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

    test('should exclude the first two elements', 1, function() {
      deepEqual(_.rest(array, 2), [3]);
    });

    test('should return all elements when `n` < `1`', 3, function() {
      _.forEach([0, -1, -2], function(n) {
        deepEqual(_.rest(array, n), [1, 2, 3]);
      });
    });

    test('should return an empty array when `n` >= `array.length`', 2, function() {
      _.forEach([3, 4], function(n) {
        deepEqual(_.rest(array, n), []);
      });
    });

    test('should return an empty when querying empty arrays', 1, function() {
      deepEqual(_.rest([]), []);
    });

    test('should work when used as `callback` for `_.map`', 1, function() {
      var array = [[1, 2, 3], [4, 5, 6], [7, 8, 9]],
          actual = _.map(array, _.rest);

      deepEqual(actual, [[2, 3], [5, 6], [8, 9]]);
    });

    test('should work with a `callback`', 1, function() {
      var actual = _.rest(array, function(num) {
        return num < 3;
      });

      deepEqual(actual, [3]);
    });

    test('should pass the correct `callback` arguments', 1, function() {
      var args;

      _.rest(array, function() {
        args || (args = slice.call(arguments));
      });

      deepEqual(args, [1, 0, array]);
    });

    test('supports the `thisArg` argument', 1, function() {
      var actual = _.rest(array, function(num, index) {
        return this[index] < 3;
      }, array);

      deepEqual(actual, [3]);
    });

    test('should work with an object for `callback`', 1, function() {
      deepEqual(_.rest(objects, { 'b': 2 }), objects.slice(-2));
    });

    test('should work with a string for `callback`', 1, function() {
      deepEqual(_.rest(objects, 'b'), objects.slice(-1));
    });

    test('should be aliased', 2, function() {
      strictEqual(_.drop, _.rest);
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

    test('should return an empty array when `n` < `1`', 3, function() {
      _.forEach([0, -1, -2], function(n) {
        deepEqual(_.sample(array, n), []);
      });
    });

    test('should return all elements when `n` >= `array.length`', 2, function() {
      _.forEach([3, 4], function(n) {
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

      _.forEach(empties, function(value) {
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

    test('should work when used as `callback` for `_.map`', 1, function() {
      var a = [1, 2, 3],
          b = [4, 5, 6],
          c = [7, 8, 9],
          actual = _.map([a, b, c], _.sample);

      ok(_.contains(a, actual[0]) && _.contains(b, actual[1]) && _.contains(c, actual[2]));
    });

    test('should chain when passing `n`', 1, function() {
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

    _.forEach({
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

    _.forEach({
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
      equal(_.size({ 'one': 1, 'two': 2, 'three': 3 }), 3);
    });

    test('should return the length of an array', 1, function() {
      equal(_.size(array), 3);
    });

    test('should accept a falsey `object` argument', 1, function() {
      var expected = _.map(falsey, function() { return 0; });

      var actual = _.map(falsey, function(value, index) {
        try {
          return index ? _.size(value) : _.size();
        } catch(e) { }
      });

      deepEqual(actual, expected);
    });

    test('should work with jQuery/MooTools DOM query collections', 1, function() {
      function Foo(elements) { push.apply(this, elements); }
      Foo.prototype = { 'length': 0, 'splice': Array.prototype.splice };

      equal(_.size(new Foo(array)), 3);
    });

    test('should work with `arguments` objects (test in IE < 9)', 1, function() {
      if (!isPhantomPage) {
        equal(_.size(args), 3);
      } else {
        skipTest();
      }
    });

    test('fixes the JScript [[DontEnum]] bug (test in IE < 9)', 1, function() {
      equal(_.size(shadowedObject), 7);
    });

    _.forEach({
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

  QUnit.module('lodash.some');

  (function() {
    test('should return `false` for empty or falsey collections', 1, function() {
      var expected = _.map(empties, function() { return false; });

      var actual = _.map(empties, function(value) {
        try {
          return _.some(value, _.identity);
        } catch(e) { }
      });

      deepEqual(actual, expected);
    });

    test('should return `true` if the callback returns truey for any element in the collection', 2, function() {
      strictEqual(_.some([false, 1, ''], _.identity), true);
      strictEqual(_.some([null, 'x', 0], _.identity), true);
    });

    test('should return `false` if the callback returns falsey for all elements in the collection', 2, function() {
      strictEqual(_.some([false, false, false], _.identity), false);
      strictEqual(_.some([null, 0, ''], _.identity), false);
    });

    test('should return `true` as soon as the `callback` result is truey', 1, function() {
      strictEqual(_.some([null, true, null], _.identity), true);
    });

    test('should use `_.identity` when no callback is provided', 2, function() {
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
    var objects = [
      { 'a': 'x', 'b': 3 },
      { 'a': 'y', 'b': 4 },
      { 'a': 'x', 'b': 1 },
      { 'a': 'y', 'b': 2 }
    ];

    test('should sort in ascending order', 1, function() {
      var actual = _.pluck(_.sortBy(objects, function(object) {
        return object.b;
      }), 'b');

      deepEqual(actual, [1, 2, 3, 4]);
    });

    test('should perform a stable sort (test in IE > 8, Opera, and V8)', 1, function() {
      function Pair(x, y) {
        this.x = x;
        this.y = y;
      }

      var collection = [
        new Pair(1, 1), new Pair(1, 2),
        new Pair(1, 3), new Pair(1, 4),
        new Pair(1, 5), new Pair(1, 6),
        new Pair(2, 1), new Pair(2, 2),
        new Pair(2, 3), new Pair(2, 4),
        new Pair(2, 5), new Pair(2, 6),
        new Pair(undefined, 1), new Pair(undefined, 2),
        new Pair(undefined, 3), new Pair(undefined, 4),
        new Pair(undefined, 5), new Pair(undefined, 6)
      ];

      var actual = _.sortBy(collection, function(pair) {
        return pair.x;
      });

      deepEqual(actual, collection);
    });

    test('should work with `undefined` values', 1, function() {
      var array = [undefined, 4, 1, undefined, 3, 2];
      deepEqual(_.sortBy(array, _.identity), [1, 2, 3, 4, undefined, undefined]);
    });

    test('should use `_.identity` when no `callback` is provided', 1, function() {
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

    test('should work with an array for `callback`', 1, function() {
      var actual = _.sortBy(objects, ['a', 'b']);
      deepEqual(actual, [objects[2], objects[0], objects[3], objects[1]]);
    });

    test('should coerce arrays returned from a `callback`', 1, function() {
      var actual = _.sortBy(objects, function(object) {
        var result = [object.a, object.b];
        result.toString = function() { return String(this[0]); };
        return result;
      });

      deepEqual(actual, [objects[0], objects[2], objects[1], objects[3]]);
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
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.sortedIndex');

  (function() {
    var array = [20, 30, 50],
        objects = [{ 'x': 20 }, { 'x': 30 }, { 'x': 50 }];

    test('should return the insert index of a given value', 2, function() {
      equal(_.sortedIndex(array, 40), 2);
      equal(_.sortedIndex(array, 30), 1);
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
      equal(actual, 2);
    });

    test('supports arrays with lengths larger than `Math.pow(2, 31) - 1`', 1, function() {
      var length = Math.pow(2, 32) - 1,
          index = length - 1,
          array = Array(length),
          steps = 0;

      if (array.length == length) {
        array[index] = index;
        _.sortedIndex(array, index, function() { steps++; });
        equal(steps, 33);
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
      ok(_.every(_.values(_.support), _.isBoolean));
    });

    test('should not contain minified properties (test production builds)', 1, function() {
      var props = [
        'argsClass',
        'argsObject',
        'enumErrorProps',
        'enumPrototypes',
        'fastBind',
        'funcDecomp',
        'funcNames',
        'nodeClass',
        'nonEnumArgs',
        'nonEnumShadows',
        'ownLast',
        'spliceObjects',
        'unindexedChars'
      ];

      ok(!_.size(_.difference(_.keys(_.support), props)));
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.tap');

  (function() {
    test('should intercept and return the given value', 2, function() {
      if (!isNpm) {
        var intercepted;

        var actual = _.tap('a', function(value) {
          intercepted = value;
        });

        equal(actual, 'a');
        equal(intercepted, 'a');
      }
      else {
        skipTest(2);
      }
    });

    test('should return intercept unwrapped values and return wrapped values when chaining', 2, function() {
      if (!isNpm) {
        var intercepted,
            array = [1, 2, 3, 4];

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
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.template');

  (function() {
    test('should use a `with` statement by default', 1, function() {
      var compiled = _.template('<%= index %><%= collection[index] %><% _.each(collection, function(value, index) { %><%= index %><% }); %>'),
          actual = compiled({ 'index': 1, 'collection': ['a', 'b', 'c'] });

      equal(actual, '1b012');
    });

    test('should interpolate data object properties', 1, function() {
      var compiled = _.template('<%= a %>BC');
      equal(compiled({ 'a': 'A' }), 'ABC');
    });

    test('should work correctly with `this` references', 2, function() {
      var compiled = _.template('a<%= this.String("b") %>c');
      equal(compiled(), 'abc');

      var object = { 'b': 'B' };
      object.compiled = _.template('A<%= this.b %>C', null, { 'variable': 'obj' });
      equal(object.compiled(), 'ABC');
    });

    test('should work with backslashes', 1, function() {
      var compiled = _.template('<%= a %> \\b');
      equal(compiled({ 'a': 'A' }), 'A \\b');
    });

    test('should support escaped values in "interpolation" delimiters', 1, function() {
      var compiled = _.template('<%= a ? "a=\\"A\\"" : "" %>');
      equal(compiled({ 'a': true }), 'a="A"');
    });

    test('should evaluate JavaScript in "evaluate" delimiters', 1, function() {
      var compiled = _.template(
        '<ul><%\
        for (var key in collection) {\
          %><li><%= collection[key] %></li><%\
        } %></ul>'
      );

      var actual = compiled({ 'collection': { 'a': 'A', 'b': 'B' } });
      equal(actual, '<ul><li>A</li><li>B</li></ul>');
    });

    test('should work with escaped characters in string literals', 2, function() {
      var compiled = _.template('<% print("\'\\n\\r\\t\\u2028\\u2029\\\\") %>');
      equal(compiled(), "'\n\r\t\u2028\u2029\\");

      compiled = _.template('\'\n\r\t<%= a %>\u2028\u2029\\"');
      equal(compiled({ 'a': 'A' }), '\'\n\r\tA\u2028\u2029\\"');
    });

    test('should work with no delimiters', 1, function() {
      var expected = 'abc';
      equal(_.template(expected, {}), expected);
    });

    test('should work with statements containing quotes', 1, function() {
      var compiled = _.template("<%\
        if (a == 'A' || a == \"a\") {\
          %>'a',\"A\"<%\
        } %>"
      );

      equal(compiled({ 'a': 'A' }), "'a',\"A\"");
    });

    test('should escape values in "escape" delimiters', 1, function() {
      var escaped = '<p>&amp;&lt;&gt;&quot;&#39;\/</p>',
          unescaped = '&<>"\'\/';

      var compiled = _.template('<p><%- value %></p>');
      equal(compiled({ 'value': unescaped }), escaped);
    });

    test('should work with templates containing newlines and comments', 1, function() {
      var compiled = _.template('<%\n\
	// comment\n\
	if (value) { value += 3; }\n\
        %><p><%= value %></p>'
      );

      equal(compiled({ 'value': 3 }), '<p>6</p>');
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

      equal(compiled({ 'collection': ['a & A', 'b & B'] }), expected);
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

      equal(compiled({ 'collection': ['a & A', 'b & B'] }), expected);
      _.assign(_.templateSettings, settings);
    });

    test('supports recursive calls', 1, function() {
      var compiled = _.template('<%= a %><% a = _.template(c, obj) %><%= a %>'),
          data = { 'a': 'A', 'b': 'B', 'c': '<%= b %>' };

      equal(compiled(data), 'AB');
    });

    test('should not modify `_.templateSettings` when `options` are provided', 2, function() {
      equal('a' in _.templateSettings, false);

      _.template('', {}, { 'a': 1 });
      equal('a' in _.templateSettings, false);

      delete _.templateSettings.a;
    });

    test('should not augment the `options` object', 1, function() {
      var options = {};
      _.template('', {}, options);
      deepEqual(options, {});
    });

    test('should provide the template source when a SyntaxError occurs', 1, function() {
      try {
        _.template('<% if x %>');
      } catch(e) {
        var source = e.source;
      }
      ok(/__p/.test(source));
    });

    test('should work with complex "interpolate" delimiters', 22, function() {
      _.forEach({
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

        equal(compiled(data), value, key);
      });
    });

    test('should allow referencing variables declared in "evaluate" delimiters from other delimiters', 1, function() {
      var compiled = _.template('<% var b = a; %><%= b.value %>'),
          data = { 'a': { 'value': 1 } };

      strictEqual(compiled(data), '1');
    });

    test('should work when passing `options.variable`', 1, function() {
      var compiled = _.template(
        '<% _.forEach( data.a, function( value ) { %>' +
            '<%= value.valueOf() %>' +
        '<% }) %>', null, { 'variable': 'data' }
      );

      try {
        var data = { 'a': [1, 2, 3] };
        strictEqual(compiled(data), '123');
      } catch(e) {
        ok(false);
      }
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

      equal(compiled(data), '<span class="icon-12"></span>');
    });

    test('should work with "interpolate" delimiters containing ternary operators', 1, function() {
      var compiled = _.template('<%= value ? value : "b" %>'),
          data = { 'value': 'a' };

      equal(compiled(data), 'a');
    });

    test('should work with "interpolate" delimiters containing global values', 1, function() {
      var compiled = _.template('<%= typeof Math.abs %>');

      try {
        var actual = compiled();
      } catch(e) { }

      equal(actual, 'function');
    });

    test('should evaluate delimiters once', 1, function() {
      var actual = [],
          compiled = _.template('<%= func("a") %><%- func("b") %><% func("c") %>');

      compiled({ 'func': function(value) { actual.push(value); } });
      deepEqual(actual, ['a', 'b', 'c']);
    });

    test('should parse delimiters with newlines', 1, function() {
      var expected = '<<\nprint("<p>" + (value ? "yes" : "no") + "</p>")\n>>',
          compiled = _.template(expected, null, { 'evaluate': /<<(.+?)>>/g }),
          data = { 'value': true };

      equal(compiled(data), expected);
    });

    test('should parse ES6 template delimiters', 2, function() {
      var data = { 'value': 2 };
      strictEqual(_.template('1${value}3', data), '123');
      equal(_.template('${"{" + value + "\\}"}', data), '{2}');
    });

    test('supports the "imports" option', 1, function() {
      var options = { 'imports': { 'a': 1 } },
          compiled = _.template('<%= a %>', null, options);

      strictEqual(compiled({}), '1');
    });

    test('should coerce `text` argument to a string', 1, function() {
      var data = { 'a': 1 },
          object = { 'toString': function() { return '<%= a %>'; } };

      strictEqual(_.template(object, data), '1');
    });

    test('should handle \\u2028 & \\u2029 characters', 1, function() {
      var compiled = _.template('\u2028<%= "\\u2028\\u2029" %>\u2029');
      strictEqual(compiled(), '\u2028\u2028\u2029\u2029');
    });

    test('should resolve `null` and `undefined` values to empty strings', 4, function() {
      var compiled = _.template('<%= a %><%- a %>');
      strictEqual(compiled({ 'a': null }), '');
      strictEqual(compiled({ 'a': undefined }), '');

      compiled = _.template('<%= a.b %><%- a.b %>');
      strictEqual(compiled({ 'a': {} }), '');
      strictEqual(compiled({ 'a': {} }), '');
    });

    test('should support single line comments in "evaluate" delimiters (test production builds)', 1, function() {
      var compiled = _.template('<% // comment %><% if (value) { %>yap<% } else { %>nope<% } %>');
      equal(compiled({ 'value': true }), 'yap');
    });

    test('should match delimiters before escaping text', 1, function() {
      var compiled = _.template('<<\n a \n>>', null, { 'evaluate': /<<(.*?)>>/g });
      equal(compiled(), '<<\n a \n>>');
    });

    test('should not error when passed non-object `data` and `options` values', 2, function() {
      var pass = true;

      try {
        _.template('', 1);
      } catch(e) {
        pass = false;
      }
      ok(pass);

      pass = true;

      try {
        _.template('', 1, 1);
      } catch(e) {
        pass = false;
      }
      ok(pass);
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
        var throttled = _.throttle(function(value) { return value; }, 32),
            result = [throttled('x'), throttled('y')];

        deepEqual(result, ['x', 'x']);

        setTimeout(function() {
          var result = [throttled('a'), throttled('b')];

          notEqual(result[0], 'x');
          notStrictEqual(result[0], undefined);

          notEqual(result[1], 'b');
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
          equal(callCount, 2);
          QUnit.start();
        }, 64);
      }
      else {
        skipTest();
        QUnit.start();
      }
    });

    asyncTest('supports recursive calls', 3, function() {
      if (!(isRhino && isModularize)) {
        var args,
            count = 0,
            object = {};

        var throttled = _.throttle(function(value) {
          count++;
          args = [this];
          push.apply(args, arguments);
          if (count < 10) {
            throttled.call(this, value);
          }
        }, 32);

        throttled.call(object, 'a');
        equal(count, 1);

        setTimeout(function() {
          ok(count < 3);
          deepEqual(args, [object, 'a']);
          QUnit.start();
        }, 32);
      }
      else {
        skipTest(3);
        QUnit.start();
      }
    });

    asyncTest('should not trigger a trailing call when invoked once', 2, function() {
      if (!(isRhino && isModularize)) {
        var count = 0,
            throttled = _.throttle(function() { count++; }, 32);

        throttled();
        equal(count, 1);

        setTimeout(function() {
          equal(count, 1);
          QUnit.start();
        }, 64);
      }
      else {
        skipTest(2);
        QUnit.start();
      }
    });

    _.times(2, function(index) {
      test('should trigger a call when invoked repeatedly' + (index ? ' and `leading` is `false`' : ''), 1, function() {
        if (!(isRhino && isModularize)) {
          var count = 0,
              limit = 500,
              options = index ? { 'leading': false } : {};

          var throttled = _.throttle(function() {
            count++;
          }, 32, options);

          var start = +new Date;
          while ((new Date - start) < limit) {
            throttled();
          }
          ok(count > 1);
        }
        else {
          skipTest(1);
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

        equal(throttled('x'), 'x');
        equal(throttled('y'), 'x');

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

    test('should work with `leading` option', 4, function() {
      if (!(isRhino && isModularize)) {
        _.forEach([true, { 'leading': true }], function(options) {
          var withLeading = _.throttle(_.identity, 32, options);
          equal(withLeading('x'), 'x');
        });

        _.forEach([false, { 'leading': false }], function(options) {
          var withoutLeading = _.throttle(_.identity, 32, options);
          strictEqual(withoutLeading('x'), undefined);
        });
      }
      else {
        skipTest(4);
      }
    });

    asyncTest('should work with `trailing` option', 6, function() {
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

        equal(withTrailing('x'), 'x');
        equal(withTrailing('y'), 'x');

        equal(withoutTrailing('x'), 'x');
        equal(withoutTrailing('y'), 'x');

        setTimeout(function() {
          equal(withCount, 2);
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

  _.forEach(['debounce', 'throttle'], function(methodName) {
    var func = _[methodName];

    test('_.' + methodName + ' should not error when passed non-object `options` values', 1, function() {
      var pass = true;

      try {
        func(noop, 32, 1);
      } catch(e) {
        pass = false;
      }
      ok(pass);
    });

    asyncTest('_.' + methodName + ' should call `func` with the correct `this` binding', 1, function() {
      if (!(isRhino && isModularize)) {
        var actual = [];

        var object = {
          'func': func(function() { actual.push(this); }, 32)
        };

        object.func();
        if (methodName == 'throttle') {
          object.func();
        }
        setTimeout(function() {
          deepEqual(actual, methodName == 'throttle' ? [object, object] : [object]);
          QUnit.start();
        }, 64);
      }
      else {
        skipTest(1);
        QUnit.start();
      }
    });
  });

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.toArray');

  (function() {
    var args = arguments,
        array = [1, 2, 3];

    test('should return a dense array', 3, function() {
      var sparse = Array(3);
      sparse[1] = 2;

      var actual = _.toArray(sparse);

      ok(0 in actual);
      ok(2 in actual);
      deepEqual(actual, sparse);
    });

    test('should treat array-like objects like arrays', 2, function() {
      var object = { '0': 'a', '1': 'b', '2': 'c', 'length': 3 };
      deepEqual(_.toArray(object), ['a', 'b', 'c']);
      deepEqual(_.toArray(args), array);
    });

    test('should return a shallow clone of arrays', 2, function() {
      var actual = _.toArray(array);
      notStrictEqual(actual, array);
      deepEqual(_.toArray(array), array);
    });

    test('should return the values of objects', 1, function() {
      var object = { 'a': 1, 'b': 2, 'c': 3 };
      deepEqual(_.toArray(object), array);
    });

    test('should work with a string for `collection` (test in Opera < 10.52)', 2, function() {
      deepEqual(_.toArray('abc'), ['a', 'b', 'c']);
      deepEqual(_.toArray(Object('abc')), ['a', 'b', 'c']);
    });

    test('should work with a node list for `collection` (test in IE < 9)', 1, function() {
      if (document) {
        try {
          var nodeList = document.getElementsByTagName('body'),
              actual = _.toArray(nodeList);
        } catch(e) { }
        deepEqual(actual, [body]);
      } else {
        skipTest();
      }
    });
  }(1, 2, 3));

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.times');

  (function() {
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
          expected = _.map(values, function() { return []; });

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

    test('should work without a `callback` argument', 1, function() {
      function Foo() {}
      ok(_.transform(new Foo) instanceof Foo);
    });

    _.forEach({
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
          ok(first != object && _.isArray(first));
          deepEqual(args, [first, 1, 0, object]);
        } else {
          ok(first != object && _.isPlainObject(first));
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

  QUnit.module('lodash.unescape');

  (function() {
    var escaped = '&amp;&lt;&gt;&quot;&#39;\/',
        unescaped = '&<>"\'\/';

    test('should unescape entities in the correct order', 1, function() {
      equal(_.unescape('&amp;lt;'), '&lt;');
    });

    test('should unescape the proper entities', 1, function() {
      equal(_.unescape(escaped), unescaped);
    });

    test('should unescape the same characters escaped by `_.escape`', 1, function() {
      equal(_.unescape(_.escape(unescaped)), unescaped);
    });

    test('should return an empty string when provided `null` or `undefined`', 2, function() {
      equal(_.unescape(null), '');
      equal(_.unescape(undefined), '');
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.union');

  (function() {
    test('should return the union of the given arrays', 1, function() {
      var actual = _.union([1, 2, 3], [5, 2, 1, 4], [2, 1]);
      deepEqual(actual, [1, 2, 3, 5, 4]);
    });

    test('should not flatten nested arrays', 1, function() {
      var actual = _.union([1, 2, 3], [1, [5]], [2, [4]]);
      deepEqual(actual, [1, 2, 3, [5], [4]]);
    });

    test('should produce correct results when provided a falsey `array` argument', 1, function() {
      var expected = [1, 2, 3],
          actual = _.union(null, expected);

      deepEqual(actual, expected);
    });

    test('should ignore individual secondary values', 1, function() {
      var array = [1];
      deepEqual(_.union(array, 1, 2, 3), array);
    });
  }());

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

    test('should work with a `callback`', 1, function() {
      var actual = _.uniq(objects, false, function(object) {
        return object.a;
      });

      deepEqual(actual, objects.slice(0, 3));
    });

    test('should work with a `callback` without specifying `isSorted`', 1, function() {
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

    test('should perform an unsorted uniq operation when used as `callback` for `_.map`', 1, function() {
      var array = [[2, 1, 2], [1, 2, 1]],
          actual = _.map(array, _.uniq);

      deepEqual(actual, [[2, 1], [1, 2]]);
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

    _.forEach({
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

      equal(_.uniq(actual).length, actual.length);
    });

    test('should return a string value when not passing a prefix argument', 1, function() {
      equal(typeof _.uniqueId(), 'string');
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

  QUnit.module('lodash.where');

  (function() {
    var array = [
      { 'a': 1 },
      { 'a': 1 },
      { 'a': 1, 'b': 2 },
      { 'a': 2, 'b': 2 },
      { 'a': 3 }
    ];

    test('should filter by properties', 6, function() {
      deepEqual(_.where(array, { 'a': 1 }), [{ 'a': 1 }, { 'a': 1 }, { 'a': 1, 'b': 2 }]);
      deepEqual(_.where(array, { 'a': 2 }), [{ 'a': 2, 'b': 2 }]);
      deepEqual(_.where(array, { 'a': 3 }), [{ 'a': 3 }]);
      deepEqual(_.where(array, { 'b': 1 }), []);
      deepEqual(_.where(array, { 'b': 2 }), [{ 'a': 1, 'b': 2 }, { 'a': 2, 'b': 2 }]);
      deepEqual(_.where(array, { 'a': 1, 'b': 2 }), [{ 'a': 1, 'b': 2 }]);
    });

    test('should not filter by inherited properties', 1, function() {
      function Foo() {}
      Foo.prototype = { 'a': 2 };

      var properties = new Foo;
      properties.b = 2;
      deepEqual(_.where(array, properties), [{ 'a': 1, 'b': 2 }, { 'a': 2, 'b': 2 }]);
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

      deepEqual(_.where(collection, { 'a': 1 }), [{ 'a': 1 }, { 'a': 1, 'b': 2 }]);
    });

    test('should return an empty array when provided an empty `properties` object', 1, function() {
      deepEqual(_.where(array, {}), []);
    });

    test('should deep compare `properties` values', 1, function() {
      var collection = [{ 'a': { 'b': { 'c': 1, 'd': 2 }, 'e': 3 }, 'f': 4 }],
          expected = _.cloneDeep(collection);

      deepEqual(_.where(collection, { 'a': { 'b': { 'c': 1 } } }), expected);
    });

    test('should search of arrays for values', 2, function() {
      var collection = [{ 'a': [1, 2] }],
          expected = _.cloneDeep(collection);

      deepEqual(_.where(collection, { 'a': [] }), []);
      deepEqual(_.where(collection, { 'a': [2] }), expected);
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

      equal(p('Fred, Wilma, & Pebbles'), '<p>Fred, Wilma, &amp; Pebbles</p>');
    });

    test('should pass the correct `wrapper` arguments', 1, function() {
      var args;

      var wrapped = _.wrap(noop, function() {
        args || (args = slice.call(arguments));
      });

      wrapped(1, 2, 3);
      deepEqual(args, [noop, 1, 2, 3]);
    });

    test('should not set a `this` binding', 1, function() {
      var p = _.wrap(_.escape, function(func) {
        return '<p>' + func(this.text) + '</p>';
      });

      var object = { 'p': p, 'text': 'Fred, Wilma, & Pebbles' };
      equal(object.p(), '<p>Fred, Wilma, &amp; Pebbles</p>');
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.xor');

  (function() {
    test('should return the symmetric difference of the given arrays', 1, function() {
      var actual = _.xor([1, 2, 5], [2, 3, 5], [3, 4, 5]);
      deepEqual(actual, [1, 4, 5]);
    });

    test('should return an array of unique values', 1, function() {
      var actual = _.xor([1, 1, 2, 5], [2, 2, 3, 5], [3, 4, 5, 5]);
      deepEqual(actual, [1, 4, 5]);
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

    test('should ignore individual secondary values', 1, function() {
      var array = [1, null, 3];
      deepEqual(_.xor(array, 3, null), array);
    });
  }());

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
      ok(0 in actual[2]);
      deepEqual(actual, pair[1]);

      actual = _.zip.apply(_, actual);
      ok(2 in actual[0]);
      deepEqual(actual, [['barney', 36, undefined], ['fred', 40, false]]);
    });

    test('should support consuming it\'s return value', 1, function() {
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

    test('should accept a two dimensional array', 1, function() {
      var actual = _.zipObject(array);
      deepEqual(actual, object);
    });

    test('should not assume `keys` is two dimensional if `values` is not provided', 1, function() {
      var actual = _.zipObject(['barney', 'fred']);
      deepEqual(actual, { 'barney': undefined, 'fred': undefined });
    });

    test('should accept a falsey `array` argument', 1, function() {
      var expected = _.map(falsey, function() { return {}; });

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
        equal(wrapped.first(), undefined);
      }
      else {
        skipTest(2);
      }
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash(...).splice');

  (function() {
    test('should remove the value at index `0` when length is `0` (test in IE < 9, and in compatibility mode for IE9)', 2, function() {
      if (!isNpm) {
        var wrapped = _({ '0': 1, 'length': 1 });
        wrapped.splice(0, 1);

        deepEqual(wrapped.keys().value(), ['length']);
        equal(wrapped.first(), undefined);
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
        equal(String(wrapped), '1,2,3');
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
        equal(Number(wrapped), 123);
      }
      else {
        skipTest();
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

    _.forEach(funcs, function(methodName) {
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

    _.forEach(funcs, function(methodName) {
      test('`_(...).' + methodName + '` should return a new wrapped value', 1, function() {
        if (!isNpm) {
          ok(wrapped[methodName]() instanceof _);
        }
        else {
          skipTest();
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
      'pop',
      'shift',
      'reduce',
      'reduceRight',
      'some'
    ];

    _.forEach(funcs, function(methodName) {
      test('`_(...).' + methodName + '` should return an unwrapped value', 1, function() {
        if (!isNpm) {
          var actual = methodName == 'reduceRight'
            ? wrapped[methodName](_.identity)
            : wrapped[methodName]();

          equal(actual instanceof _, false);
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
      'first',
      'last',
      'sample'
    ];

    _.forEach(funcs, function(methodName) {
      test('`_(...).' + methodName + '` called without an `n` argument should return an unwrapped value', 1, function() {
        if (!isNpm) {
          equal(typeof wrapped[methodName](), 'number');
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
              expected = _.map(falsey, function() { return undefined; }),
              func = _[methodName];

          _.forEach(falsey, function(value, index) {
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
          var expected = _.map(falsey, function() { return []; }),
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

    test('should work with `arguments` objects', 23, function() {
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
      deepEqual(_.findIndex(args, _.identity), 0, message('findIndex'));
      deepEqual(_.findLastIndex(args, _.identity), 4, message('findLastIndex'));
      deepEqual(_.first(args), 1, message('first'));
      deepEqual(_.flatten(args), [1, null, 3, null, 5], message('flatten'));
      deepEqual(_.indexOf(args, 5), 4, message('indexOf'));
      deepEqual(_.initial(args, 4), [1], message('initial'));
      deepEqual(_.intersection(args, [1]), [1], message('intersection'));
      deepEqual(_.last(args), 5, message('last'));
      deepEqual(_.lastIndexOf(args, 1), 0, message('lastIndexOf'));
      deepEqual(_.rest(args, 4), [5], message('rest'));
      deepEqual(_.sortedIndex(args, 6), 5, message('sortedIndex'));
      deepEqual(_.uniq(args), [1, null, [3], 5], message('uniq'));
      deepEqual(_.without(args, null), [1, [3], 5], message('without'));
      deepEqual(_.zip(args, args), [[1, 1], [null, null], [[3], [3]], [null, null], [5, 5]], message('zip'));

      if (_.support.argsClass && _.support.argsObject && !_.support.nonEnumArgs) {
        _.pull(args, null);
        deepEqual([args[0], args[1], args[2]], [1, [3], 5], message('pull'));

        _.remove(args, function(value) { return typeof value == 'number'; });
        ok(args.length == 1 && _.isEqual(args[0], [3]), message('remove'));
      }
      else {
        skipTest(2)
      }
    });

    test('should accept falsey primary arguments', 3, function() {
      function message(methodName) {
        return '`_.' + methodName + '` should accept falsey primary arguments';
      }

      deepEqual(_.difference(null, array), [], message('difference'));
      deepEqual(_.intersection(null, array), [], message('intersection'));
      deepEqual(_.union(null, array), array, message('union'));
    });

    test('should accept falsey secondary arguments', 3, function() {
      function message(methodName) {
        return '`_.' + methodName + '` should accept falsey secondary arguments';
      }

      deepEqual(_.difference(array, null), array, message('difference'));
      deepEqual(_.intersection(array, null), [], message('intersection'));
      deepEqual(_.union(array, null), array, message('union'));
    });
  }(1, null, [3], null, 5));

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash methods');

  (function() {
    var allMethods = _.reject(_.functions(_), function(methodName) {
      return /^_/.test(methodName);
    });

    var returnArrays = [
      'at',
      'compact',
      'difference',
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
      'range',
      'reject',
      'rest',
      'shuffle',
      'sortBy',
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
      'once',
      'partial',
      'partialRight',
      'tap',
      'throttle',
      'wrap'
    ];

    var acceptFalsey = _.difference(allMethods, rejectFalsey);

    test('should accept falsey arguments', 155, function() {
      var isExported = '_' in root,
          oldDash = root._;


      _.forEach(acceptFalsey, function(methodName) {
        var expected = _.map(falsey, function() { return []; }),
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
          if (isExported) {
            root._ = oldDash;
          } else {
            delete root._;
          }
        }
        if (_.indexOf(returnArrays, methodName) > -1) {
          deepEqual(actual, expected, '_.' + methodName + ' returns an array');
        }
        ok(pass, '`_.' + methodName + '` accepts falsey arguments');
      });

      // skip tests for missing methods of modularized builds
      _.forEach(['noConflict', 'runInContext', 'tap'], function(methodName) {
        if (!_[methodName]) {
          skipTest();
        }
      });
    });

    test('should reject falsey arguments', 14, function() {
      _.forEach(rejectFalsey, function(methodName) {
        var expected = _.map(falsey, function() { return true; }),
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

    test('should handle `null` `thisArg` arguments', 30, function() {
      var thisArg,
          callback = function() { thisArg = this; },
          expected = (function() { return this; }).call(null);

      var funcs = [
        'countBy',
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
        'map',
        'max',
        'min',
        'omit',
        'pick',
        'reduce',
        'reduceRight',
        'reject',
        'remove',
        'some',
        'sortBy',
        'sortedIndex',
        'times',
        'uniq'
      ];

      _.forEach(funcs, function(methodName) {
        var array = ['a'],
            func = _[methodName],
            message = '`_.' + methodName + '` handles `null` `thisArg` arguments';

        thisArg = undefined;

        if (/^reduce/.test(methodName)) {
          func(array, callback, 0, null);
        } else if (methodName == 'sortedIndex') {
          func(array, 'a', callback, null);
        } else if (methodName == 'times') {
          func(1, callback, null);
        } else {
          func(array, callback, null);
        }

        if (expected === null) {
          strictEqual(thisArg, null, message);
        } else {
          equal(thisArg, expected, message);
        }
      });
    });

    test('should not contain minified method names (test production builds)', 1, function() {
      ok(_.every(_.functions(_), function(methodName) {
        return methodName.length > 2 || methodName == 'at';
      }));
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.config.asyncRetries = 10;

  if (!document) {
    QUnit.config.noglobals = true;
    QUnit.start();
  }
}(typeof global == 'object' && global || this));
