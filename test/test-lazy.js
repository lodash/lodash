;
(
  function () {

    /** Used as a safe reference for `undefined` in pre ES5 environments */
    var undefined;

    /** Used as the size to cover large array optimizations */
    var LARGE_ARRAY_SIZE = 200;

    /** Used as the maximum length an array-like object */
    var MAX_SAFE_INTEGER = Math.pow(2, 53) - 1;

    /** Used as a reference to the global object */
    var root = (typeof global == 'object' && global) || this;

    /** Used to store Lo-Dash to test for bad extensions/shims */
    var lodashBizarro = root.lodashBizarro;

    /** Used for native method references */
    var arrayProto = Array.prototype,
      errorProto = Error.prototype,
      funcProto = Function.prototype,
      objectProto = Object.prototype,
      stringProto = String.prototype;

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
      noop = function () {
      },
      params = root.arguments,
      push = arrayProto.push,
      slice = arrayProto.slice,
      system = root.system,
      toString = objectProto.toString,
      Uint8Array = root.Uint8Array;

    /** The file path of the Lo-Dash file to test */
    var filePath = (function () {
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
        } catch (e) {
        }

        try {
          result = require.resolve(result);
        } catch (e) {
        }
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
    var Worker = !(ui.isForeign || ui.isSauceLabs || isModularize) && document && root.Worker;

    /** Used to test host objects in IE */
    try {
      var xml = new ActiveXObject('Microsoft.XMLDOM');
    } catch (e) {
    }

    /** Use a single "load" function */
    var load = (typeof require == 'function' && !amd)
      ? require
      : (isJava && root.load) || noop;

    /** The unit testing framework */
    var QUnit = (function () {
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
      page.open(filePath, function (status) {
        if (status != 'success') {
          console.log('PhantomJS failed to load page: ' + filePath);
          phantom.exit(1);
        }
      });

      page.onCallback = function (details) {
        var coverage = details.coverage;
        if (coverage) {
          var fs = require('fs'),
            cwd = fs.workingDirectory,
            sep = fs.separator;

          fs.write([cwd, 'coverage', 'coverage.json'].join(sep), JSON.stringify(coverage));
        }
        phantom.exit(details.failed ? 1 : 0);
      };

      page.onConsoleMessage = function (message) {
        console.log(message);
      };

      page.onInitialized = function () {
        page.evaluate(function () {
          document.addEventListener('DOMContentLoaded', function () {
            QUnit.done(function (details) {
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
        _ = _._ || (isStrict = ui.isStrict = isStrict || 'default' in _, _['default']) || _,
        (_.runInContext ? _.runInContext(root) : _)
      ));

    /** Used as the property name for wrapper metadata */
    var EXPANDO = '__lodash@' + _.VERSION + '__';

    /** Used to provide falsey values to methods */
    var falsey = [, '', 0, false, NaN, null, undefined];

    /** Used to provide empty values to methods */
    var empties = [
      [],
      {}
    ].concat(falsey.slice(1));

    /** Used to test error objects */
    var errors = [
      new Error,
      new EvalError,
      new RangeError,
      new ReferenceError,
      new SyntaxError,
      new TypeError,
      new URIError
    ];

    /** Used to set property descriptors */
    var defineProperty = (function () {
      try {
        var o = {},
          func = Object.defineProperty,
          result = func(o, o, o) && func;
      } catch (e) {
      }
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
      _.forOwn(object, function (value, key, object) {
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
      } catch (e) {
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
    (function () {
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
      catch (e) {
        if (!phantom) {
          return;
        }
      }
      var fnToString = funcProto.toString,
        nativeString = fnToString.call(toString),
        reToString = /toString/g;

      function createToString(funcName) {
        return _.constant(nativeString.replace(reToString, funcName));
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
      setProperty(funcProto, 'toString', function wrapper() {
        setProperty(funcProto, 'toString', fnToString);
        var result = _.has(this, 'toString') ? this.toString() : fnToString.call(this);
        setProperty(funcProto, 'toString', wrapper);
        return result;
      });

      // add extensions
      funcProto._method = _.noop;

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

      var _hasOwnProperty = objectProto.hasOwnProperty;
      setProperty(objectProto, 'hasOwnProperty', function (key) {
        if (key == '1' && _.isArguments(this) && _.isEqual(_.values(this), [0, 0])) {
          throw new Error;
        }
        return _.has(this, key);
      });

      var _isFinite = Number.isFinite;
      setProperty(Number, 'isFinite', _.noop);

      var _contains = stringProto.contains;
      setProperty(stringProto, 'contains', _contains ? _.noop : Boolean);

      var _ArrayBuffer = ArrayBuffer;
      setProperty(root, 'ArrayBuffer', (function () {
        function ArrayBuffer(byteLength) {
          var buffer = new _ArrayBuffer(byteLength);
          if (!byteLength) {
            setProperty(buffer, 'slice', buffer.slice ? null : bufferSlice);
          }
          return buffer;
        }

        function bufferSlice() {
          var newBuffer = new _ArrayBuffer(this.byteLength),
            view = new Uint8Array(newBuffer);

          view.set(new Uint8Array(this));
          return newBuffer;
        }

        setProperty(ArrayBuffer, 'toString', createToString('ArrayBuffer'));
        setProperty(bufferSlice, 'toString', createToString('slice'));
        return ArrayBuffer;
      }()));

      if (!root.Float64Array) {
        setProperty(root, 'Float64Array', (function () {
          function Float64Array(buffer, byteOffset, length) {
            return arguments.length == 1
              ? new Uint8Array(buffer)
              : new Uint8Array(buffer, byteOffset || 0, length || buffer.byteLength);
          }

          setProperty(Float64Array, 'BYTES_PER_ELEMENT', 8);
          setProperty(Float64Array, 'toString', createToString('Float64Array'));
          return Float64Array;
        }()));
      }
      // fake `WinRTError`
      setProperty(root, 'WinRTError', Error);

      // fake DOM
      setProperty(root, 'window', {});
      setProperty(root.window, 'document', {});
      setProperty(root.window.document, 'createDocumentFragment', function () {
        return { 'nodeType': 11 };
      });

      // clear cache so Lo-Dash can be reloaded
      emptyObject(require.cache);

      // load Lo-Dash and expose it to the bad extensions/shims
      lodashBizarro = (lodashBizarro = require(filePath))._ || lodashBizarro['default'] || lodashBizarro;

      // restore native methods
      setProperty(Array, 'isArray', _isArray);
      setProperty(Date, 'now', _now);
      setProperty(Object, 'create', _create);
      setProperty(Object, 'defineProperty', _defineProperty);
      setProperty(Object, 'getPrototypeOf', _getPrototypeOf);
      setProperty(Object, 'keys', _keys);

      setProperty(objectProto, 'hasOwnProperty', _hasOwnProperty);

      if (_isFinite) {
        setProperty(Number, 'isFinite', _isFinite);
      } else {
        delete Number.isFinite;
      }
      if (_contains) {
        setProperty(stringProto, 'contains', _contains);
      } else {
        delete stringProto.contains;
      }
      if (_ArrayBuffer) {
        setProperty(root, 'ArrayBuffer', _ArrayBuffer);
      } else {
        delete root.ArrayBuffer;
      }
      delete root.WinRTError;
      delete root.window;
      delete funcProto._method;
    }());

    // add values from an iframe
    (function () {
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
    (function () {
      if (!Worker) {
        return;
      }
      var worker = new Worker('./asset/worker.js?t=' + (+new Date));
      worker.addEventListener('message', function (e) {
        _._VERSION = e.data || '';
      }, false);

      worker.postMessage(ui.buildPath);
    }());

    /*--------------------------------------------------------------------------*/

    // explicitly call `QUnit.module()` instead of `module()`
    // in case we are in a CLI environment
    QUnit.module(basename);

    (function () {
      var allMethods = _.reject(_.functions(_).sort(), function (methodName) {
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
        'before',
        'bind',
        'compose',
        'curry',
        'curryRight',
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

    }());

    /*--------------------------------------------------------------------------*/

    QUnit.module('lodash.lazy');

    (function() {

      function isEven(x) { return x % 2 == 0 }
      function inc(x) { return x + 1; }

      test("should return an Object", 1, function() {
        var actual = _.lazy([]);
        ok(actual instanceof Object);
      });

      test("should compute chained methods properly", 1, function () {
        var collection = [1,2,3,4];

        var actual = _.lazy(collection).map(inc).filter(isEven).map(inc).value();
        var expected = [3, 5];

        deepEqual(actual, expected);
      });

      test("computes minimal number of elements required", 1, function () {
        var spy = {
          toString: function() { throw new Error('this object should never be called')}
        };

        var collection = [1, 2, 1, spy, spy];

        var actual = _.lazy(collection).map(inc).filter(isEven).map(inc).take(2).value();
        var expected = [3, 3];

        deepEqual(actual, expected);
      });

    })();

    /*--------------------------------------------------------------------------*/

    QUnit.module('lodash.lazy.value');

    (function() {
      function isEven(x) { return x % 2 == 0; }

      test("should return original collection", 1, function() {
        var collection = [1, 2, 3];

        deepEqual(_.lazy(collection).value(), collection);
      });

      test("complex case 1", 1, function() {
        var collection = [0, 1, 2, 3, 4, 5, 6, 7, 8];

        var actual = _.lazy(collection).reverse().take(8).filter(isEven)
          .takeRight(3).take(2).reverse().take(1).value();

        deepEqual(actual, [4]);
      });

      test("should be limited by source array length", 1, function () {
        var collection = [1, 2, 3];

        var actual = _.lazy(collection).take(4).value();

        deepEqual(actual, [1, 2, 3]);
      });

      test("should be limited by source array length (when input is reversed)", 1, function () {
        var collection = [1, 2, 3];

        var actual = _.lazy(collection).reverse().take(4).value();

        deepEqual(actual, [3, 2, 1]);
      });


      test("should be limited by dropRight(1).take(3) subset", 1, function () {
        var collection = [1, 2, 3];

        var actual = _.lazy(collection).dropRight(1).take(3).value();

        deepEqual(actual, [1, 2]);
      });

      test("should be limited by limited by take(2).dropRight(2) subset", 1, function () {
        var collection = [1, 2, 3];

        var actual = _.lazy(collection).take(2).dropRight(2).value();

        deepEqual(actual, []);
      });

      test("should be limited by dropRight(2).take(2) subset", 1, function () {
        var collection = [1, 2, 3];

        var actual = _.lazy(collection).dropRight(2).take(2).value();

        deepEqual(actual, [1]);
      });

      test("should ignore subsequent take as in take(x).take(x+1) sequence", 1, function () {
        var collection = [1, 2, 3];

        var actual = _.lazy(collection).take(2).take(3).value();

        deepEqual(actual, [1, 2]);
      });

      test("should ignore subsequent take as in takeRight(x).takeRight(x+1) sequence", 1, function () {
        var collection = [1, 2, 3];

        var actual = _.lazy(collection).takeRight(2).takeRight(3).value();

        deepEqual(actual, [2, 3]);
      });

    })();

    /*--------------------------------------------------------------------------*/

    QUnit.module('lodash.lazy.map');

    function inc(val) {
      return val + 1;
    }

    (function() {
      test("should return existing wrapped values", 1, function () {
        var wrapped = _.lazy([]);
        strictEqual(wrapped.map(), wrapped);
      });

      test("should map collection using specified function", 1, function () {
        var collection = [1, 2, 3, 4];

        var actual = _.lazy(collection).map(inc).value();

        deepEqual(actual, [2, 3, 4, 5]);
      });

      test('should provide the correct `predicate` arguments', 1, function() {
        var args = [],
            array = [1, 2];

        _.lazy(array).map(function() {
          args.push(slice.call(arguments));
        }).value();

        deepEqual(args, [[1, 0, array], [2, 1, array]]);
      });
    })();


    /*--------------------------------------------------------------------------*/

    QUnit.module('lodash.lazy.filter');

    function isEven(x) {
      return x % 2 == 0;
    }
    (function() {
      test("should return existing wrapped values", 1, function () {
        var wrapped = _.lazy([]);
        strictEqual(wrapped.filter(), wrapped);
      });

      test("should filter collection using specified function", 1, function () {
        var collection = [1, 2, 3, 4];

        var actual = _.lazy(collection).filter(isEven).value();

        deepEqual(actual, [2, 4]);
      });

      test("should filter already limited collection", 1, function () {
        var collection = [1, 2, 3, 4];

        var actual = _.lazy(collection).take(2).filter(isEven).value()

        deepEqual(actual, [2]);
      });

      test('should provide the correct `predicate` arguments', 1, function() {
        var args = [],
            array = [1, 2];

        _.lazy(array).filter(function() {
          args.push(slice.call(arguments));
        }).value();

        deepEqual(args, [[1, 0, array], [2, 1, array]]);
      });
    })();


    /*--------------------------------------------------------------------------*/

    QUnit.module('lodash.lazy.first');

    (function () {

      test("should return first element", 1, function () {
        var collection = [1, 2, 3];

        var actual = _.lazy(collection).first();

        strictEqual(actual, 1);
      });

    })();


    /*--------------------------------------------------------------------------*/

    QUnit.module('lodash.lazy.last');

    (function () {

      test("should return last element", 1, function () {
        var collection = [1, 2, 3];

        var actual = _.lazy(collection).last();

        deepEqual(actual, 3);
      });

    })();

    /*--------------------------------------------------------------------------*/

    QUnit.module('lodash.lazy.reverse');

    (function() {
      test("should return existing wrapped values", 1, function () {
        var wrapped = _.lazy([]);
        strictEqual(wrapped.reverse(), wrapped);
      });

      test("should return reversed collection", 1, function () {
        var collection = [1, 2, 3, 4];

        var actual = _.lazy(collection).reverse().value();

        deepEqual(actual, [4, 3, 2, 1]);
      });

      test("should respect the sequence in which it was called", 1, function () {
        var collection = [1, 2, 3, 4];

        var actual = _.lazy(collection).take(3).reverse().take(2).value();

        deepEqual(actual, [3, 2]);
      });

    })();
    /*--------------------------------------------------------------------------*/

    QUnit.module('lodash.lazy.initial');

    (function () {

      test("should return existing wrapped values", 1, function () {
        var wrapped = _.lazy([]);

        strictEqual(wrapped.initial(), wrapped);
      });

      test("should return all elements except last", 1, function () {
        var collection = [1, 2, 3];

        var actual = _.lazy(collection).initial().value();

        deepEqual(actual, [1, 2]);
      });

      test("should work with reverse", 1, function () {
        var collection = [1, 2, 3];

        var actual = _.lazy(collection).reverse().initial().value();

        deepEqual(actual, [3, 2]);
      });

      test("should work with take", 1, function () {
        var collection = [1, 2, 3];

        var actual = _.lazy(collection).take(2).initial().value();

        deepEqual(actual, [1]);
      });

      test("should work with filter", 1, function () {
        var collection = [1, 0, 2, 0, 3, 0, 4];

        var actual = _.lazy(collection).filter(_.identity).initial().value();

        deepEqual(actual, [1, 2, 3]);
      });

    })();

    /*--------------------------------------------------------------------------*/

    QUnit.module('lodash.lazy.rest');

    (function () {

      test("should return existing wrapped values", 1, function () {
        var wrapped = _.lazy([]);

        strictEqual(wrapped.rest(), wrapped);
      });

      test("should return all elements except first", 1, function () {
        var collection = [1, 2, 3];

        var actual = _.lazy(collection).rest().value();

        deepEqual(actual, [2, 3]);
      });

      test("should work with reverse", 1, function () {
        var collection = [1, 2, 3];

        var actual = _.lazy(collection).reverse().rest().value();

        deepEqual(actual, [2, 1]);
      });

      test("should work with take", 1, function () {
        var collection = [1, 2, 3];

        var actual = _.lazy(collection).take(2).rest().value();

        deepEqual(actual, [2]);
      });

      test("should work with filter", 1, function () {
        var collection = [1, 0, 2, 0, 3, 0, 4];

        var actual = _.lazy(collection).filter(_.identity).rest().value();

        deepEqual(actual, [2, 3, 4]);
      });

    })();

    /*--------------------------------------------------------------------------*/

    QUnit.module('lodash.lazy.drop');

    (function() {
      var array = [1, 2, 3];


      test("should return existing wrapped values", 1, function () {
        var wrapped = _.lazy([]);

        strictEqual(wrapped.drop(), wrapped);
      });

      test('should drop the first two elements', 1, function() {
        deepEqual(_.lazy(array).drop(2).value(), [3]);
      });

      test('should drop the first two elements when reversed', 1, function() {
        deepEqual(_.lazy(array).reverse().drop(2).value(), [1]);
      });

      test('should drop the first two elements when filtered', 1, function() {
        deepEqual(_.lazy([1, 0, 2, 0, 3, 0]).filter(_.identity).drop(2).value(), [3]);
      });

      test('should drop the first two elements when filtered and reversed', 1, function() {
        deepEqual(_.lazy([1, 0, 2, 0, 3, 0]).filter(_.identity).reverse().drop(1).reverse().drop(1).value(), [2]);
      });

    }());

    /*--------------------------------------------------------------------------*/

    QUnit.module('lodash.lazy.dropRight');

    (function() {
      var array = [1, 2, 3];

      test("should return existing wrapped values", 1, function () {
        var wrapped = _.lazy([]);

        strictEqual(wrapped.dropRight(), wrapped);
      });

      test('should drop the first two elements', 1, function() {
        deepEqual(_.lazy(array).dropRight(2).value(), [1]);
      });

      test('should drop the first two elements when reversed', 1, function() {
        deepEqual(_.lazy(array).reverse().dropRight(2).value(), [3]);
      });

      test('should drop the first two elements when filtered', 1, function() {
        deepEqual(_.lazy([1, 0, 2, 0, 3, 0]).filter(_.identity).dropRight(2).value(), [1]);
      });

      test('should drop the first two elements when filtered and reversed', 1, function() {
        deepEqual(_.lazy([1, 0, 2, 0, 3, 0]).filter(_.identity).reverse().dropRight(1).reverse().dropRight(1).value(), [2]);
      });
    })();


      /*--------------------------------------------------------------------------*/

    QUnit.module('lodash.lazy.dropWhile');

    (function () {

      var array = [1, 2, 3];

      var objects = [
        { 'a': 2, 'b': 2 },
        { 'a': 1, 'b': 1 },
        { 'a': 0, 'b': 0 }
      ];

      function lt3(num) {
        return num < 3;
      }

      test("should return existing wrapped values", 1, function () {
        var wrapped = _.lazy([]);

        strictEqual(wrapped.dropWhile(), wrapped);
      });

      test('should drop elements while `predicate` returns truthy', 1, function() {
        var actual = _.lazy(array).dropWhile(lt3).value();

        deepEqual(actual, [3]);
      });

      test('should provide the correct `predicate` arguments', 1, function() {
        var args;

        _.lazy(array).dropWhile(function() {
          args = slice.call(arguments);
        }).value();

        deepEqual(args, [1, 0, array]);
      });

      test('should support the `thisArg` argument', 1, function() {
        var actual = _.lazy(array).dropWhile(function(num, index) {
          return this[index] < 3;
        }, array).value();

        deepEqual(actual, [3]);
      });

      test('should work with an object for `predicate`', 1, function() {
        deepEqual(_.lazy(objects).dropWhile({ 'b': 2 }).value(), objects.slice(1));
      });

      test('should work with a "_.pluck" style `predicate`', 1, function() {
        deepEqual(_.lazy(objects).dropWhile('b').value(), objects.slice(2));
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

    })();

    /*--------------------------------------------------------------------------*/

    QUnit.config.asyncRetries = 10;
    QUnit.config.hidepassed = true;

    if (!document) {
      QUnit.config.noglobals = true;
      QUnit.start();
    }

  }.call(this));


