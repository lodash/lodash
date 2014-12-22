;(function() {

  /** Used as a safe reference for `undefined` in pre ES5 environments. */
  var undefined;

  /** Used to detect when a function becomes hot. */
  var HOT_COUNT = 150;

  /** Used as the size to cover large array optimizations. */
  var LARGE_ARRAY_SIZE = 200;

  /** Used as references for the max length and index of an array. */
  var MAX_ARRAY_LENGTH = Math.pow(2, 32) - 1,
      MAX_ARRAY_INDEX =  MAX_ARRAY_LENGTH - 1;

  /** Used as the maximum length an array-like object. */
  var MAX_SAFE_INTEGER = Math.pow(2, 53) - 1;

  /** Used as a reference to the global object. */
  var root = (typeof global == 'object' && global) || this;

  /** Used to store Lo-Dash to test for bad extensions/shims. */
  var lodashBizarro = root.lodashBizarro;

  /** Used for native method references. */
  var arrayProto = Array.prototype,
      errorProto = Error.prototype,
      funcProto = Function.prototype,
      objectProto = Object.prototype,
      stringProto = String.prototype;

  /** Method and object shortcuts. */
  var phantom = root.phantom,
      amd = root.define && define.amd,
      argv = root.process && process.argv,
      ArrayBuffer = root.ArrayBuffer,
      document = !phantom && root.document,
      body = root.document && root.document.body,
      create = Object.create,
      fnToString = funcProto.toString,
      freeze = Object.freeze,
      hasOwnProperty = objectProto.hasOwnProperty,
      JSON = root.JSON,
      noop = function() {},
      params = root.arguments,
      push = arrayProto.push,
      slice = arrayProto.slice,
      system = root.system,
      toString = objectProto.toString,
      Uint8Array = root.Uint8Array;

  /** Used to set property descriptors. */
  var defineProperty = (function() {
    try {
      var o = {},
          func = Object.defineProperty,
          result = func(o, o, o) && func;
    } catch(e) {}
    return result;
  }());

  /** The file path of the Lo-Dash file to test. */
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
      } catch(e) {}

      try {
        result = require.resolve(result);
      } catch(e) {}
    }
    return result;
  }());

  /** The `ui` object. */
  var ui = root.ui || (root.ui = {
    'buildPath': filePath,
    'loaderPath': '',
    'isModularize': /\b(?:commonjs|(index|main)\.js|lodash-(?:amd|es6|node)|modularize|npm|transpiled)\b/.test(filePath),
    'isStrict': /\b(?:lodash-es6|transpiled)\b/.test(filePath),
    'urlParams': {}
  });

  /** The basename of the Lo-Dash file to test. */
  var basename = /[\w.-]+$/.exec(filePath)[0];

  /** Detect if in a Java environment. */
  var isJava = !document && !!root.java;

  /** Used to indicate testing a modularized build. */
  var isModularize = ui.isModularize;

  /** Detect if testing `npm` modules. */
  var isNpm = isModularize && /\bnpm\b/.test([ui.buildPath, ui.urlParams.build]);

  /** Detect if running in PhantomJS. */
  var isPhantom = phantom || typeof callPhantom == 'function';

  /** Detect if running in Rhino. */
  var isRhino = isJava && typeof global == 'function' && global().Array === root.Array;

  /** Detect if Lo-Dash is in strict mode. */
  var isStrict = ui.isStrict;

  /** Used to test Web Workers. */
  var Worker = !(ui.isForeign || ui.isSauceLabs || isModularize) && document && root.Worker;

  /** Used to test host objects in IE. */
  try {
    var xml = new ActiveXObject('Microsoft.XMLDOM');
  } catch(e) {}

  /** Use a single "load" function. */
  var load = (typeof require == 'function' && !amd)
    ? require
    : (isJava ? root.load : noop);

  /** The unit testing framework. */
  var QUnit = root.QUnit || (root.QUnit = (
    QUnit = load('../node_modules/qunitjs/qunit/qunit.js') || root.QUnit,
    QUnit = QUnit.QUnit || QUnit
  ));

  /** Load and install QUnit Extras and ES6 Set/WeakMap shims. */
  (function() {
    var paths = [
      './asset/set.js',
      './asset/weakmap.js',
      '../node_modules/qunit-extras/qunit-extras.js'
    ];

    var index = -1,
        length = paths.length;

    while (++index < length) {
      var object = load(paths[index]);
      if (object) {
        object.runInContext(root);
      }
    }
  }());

  /*--------------------------------------------------------------------------*/

  // Log params provided to `test.js`.
  if (params) {
    console.log('test.js invoked with arguments: ' + JSON.stringify(slice.call(params)));
  }
  // Exit early if going to run tests in a PhantomJS web page.
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

  /** The `lodash` function to test. */
  var _ = root._ || (root._ = (
    _ = load(filePath) || root._,
    _ = _._ || (isStrict = ui.isStrict = isStrict || 'default' in _, _['default']) || _,
    (_.runInContext ? _.runInContext(root) : _)
  ));

  /** List of latin-1 supplementary letters to basic latin letters. */
  var burredLetters = [
    '\xc0', '\xc1', '\xc2', '\xc3', '\xc4', '\xc5', '\xc6', '\xc7', '\xc8', '\xc9', '\xca', '\xcb', '\xcc', '\xcd', '\xce',
    '\xcf', '\xd0', '\xd1', '\xd2', '\xd3', '\xd4', '\xd5', '\xd6', '\xd8', '\xd9', '\xda', '\xdb', '\xdc', '\xdd', '\xde',
    '\xdf', '\xe0', '\xe1', '\xe2', '\xe3', '\xe4', '\xe5', '\xe6', '\xe7', '\xe8', '\xe9', '\xea', '\xeb', '\xec', '\xed', '\xee',
    '\xef', '\xf0', '\xf1', '\xf2', '\xf3', '\xf4', '\xf5', '\xf6', '\xf8', '\xf9', '\xfa', '\xfb', '\xfc', '\xfd', '\xfe', '\xff'
  ];

  /** List of `burredLetters` translated to basic latin letters. */
  var deburredLetters = [
    'A',  'A', 'A', 'A', 'A', 'A', 'Ae', 'C',  'E', 'E', 'E', 'E', 'I', 'I', 'I',
    'I',  'D', 'N', 'O', 'O', 'O', 'O',  'O',  'O', 'U', 'U', 'U', 'U', 'Y', 'Th',
    'ss', 'a', 'a', 'a', 'a', 'a', 'a',  'ae', 'c', 'e', 'e', 'e', 'e', 'i', 'i',  'i',
    'i',  'd', 'n', 'o', 'o', 'o', 'o',  'o',  'o', 'u', 'u', 'u', 'u', 'y', 'th', 'y'
  ];

  /** Used to provide falsey values to methods. */
  var falsey = [, '', 0, false, NaN, null, undefined];

  /** Used to provide empty values to methods. */
  var empties = [[], {}].concat(falsey.slice(1));

  /** Used to test error objects. */
  var errors = [
    new Error,
    new EvalError,
    new RangeError,
    new ReferenceError,
    new SyntaxError,
    new TypeError,
    new URIError
  ];

  /** Used to check problem JScript properties (a.k.a. the `[[DontEnum]]` bug). */
  var shadowProps = [
    'constructor',
    'hasOwnProperty',
    'isPrototypeOf',
    'propertyIsEnumerable',
    'toLocaleString',
    'toString',
    'valueOf'
  ];

  /** Used to check problem JScript properties too. */
  var shadowObject = _.invert(shadowProps);

  /** Used to check whether methods support typed arrays. */
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

  /**
   * Used to check for problems removing whitespace. For a whitespace reference
   * see V8's unit test https://code.google.com/p/v8/source/browse/branches/bleeding_edge/test/mjsunit/whitespaces.js.
   */
  var whitespace = ' \t\x0b\f\xa0\ufeff\n\r\u2028\u2029\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000';

  /**
   * Extracts the unwrapped value from its wrapper.
   *
   * @private
   * @param {Object} wrapper The wrapper to unwrap.
   * @returns {*} Returns the unwrapped value.
   */
  function getUnwrappedValue(wrapper) {
    var index = -1,
        actions = wrapper.__actions__,
        length = actions.length,
        result = wrapper.__wrapped__;

    while (++index < length) {
      var args = [result],
          action = actions[index],
          object = action.object;

      push.apply(args, action.args);
      result = object[action.name].apply(object, args);
    }
    return result;
  }

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

  // Setup values for Node.js.
  (function() {
    if (amd) {
      return;
    }
    try {
      // Add values from a different realm.
      _.extend(_, require('vm').runInNewContext([
        '(function() {',
        ' var object = {',
        "  '_arguments': (function() { return arguments; }(1, 2, 3)),",
        "  '_array': [1, 2, 3],",
        "  '_boolean': Object(false),",
        "  '_date': new Date,",
        "  '_errors': [new Error, new EvalError, new RangeError, new ReferenceError, new SyntaxError, new TypeError, new URIError],",
        "  '_function': function() {},",
        "  '_nan': NaN,",
        "  '_null': null,",
        "  '_number': Object(0),",
        "  '_object': { 'a': 1, 'b': 2, 'c': 3 },",
        "  '_regexp': /x/,",
        "  '_string': Object('a'),",
        "  '_undefined': undefined",
        '  };',
        '',
        "  ['" + typedArrays.join("', '") + "'].forEach(function(type) {",
        "    var Ctor = Function('return typeof ' + type + \" != 'undefined' && \" + type)()",
        '    if (Ctor) {',
        "      object['_' + type.toLowerCase()] = new Ctor(new ArrayBuffer(24));",
        '    }',
        "  });",
        '',
        '  return object;',
        '}())'
      ].join('\n')));
    }
    catch(e) {
      if (!phantom) {
        return;
      }
    }
    var nativeString = fnToString.call(toString),
        reToString = /toString/g;

    function createToString(funcName) {
      return _.constant(nativeString.replace(reToString, funcName));
    }

    // Expose `baseEach` for better code coverage.
    if (isModularize && !isNpm) {
      var path = require('path'),
          baseEach = require(path.join(path.dirname(filePath), 'internal', 'baseEach.js'));

      _._baseEach = baseEach.baseEach || baseEach['default'] || baseEach;
    }
    // Allow bypassing native checks.
    setProperty(funcProto, 'toString', function wrapper() {
      setProperty(funcProto, 'toString', fnToString);
      var result = _.has(this, 'toString') ? this.toString() : fnToString.call(this);
      setProperty(funcProto, 'toString', wrapper);
      return result;
    });

    // Add extensions.
    funcProto._method = _.noop;

    // Set bad shims.
    var _isArray = Array.isArray;
    setProperty(Array, 'isArray', _.noop);

    var _now = Date.now;
    setProperty(Date, 'now', _.noop);

    var _create = create;
    setProperty(Object, 'create', _.noop);

    var _getPrototypeOf = Object.getPrototypeOf;
    setProperty(Object, 'getPrototypeOf', _.noop);

    var _keys = Object.keys;
    setProperty(Object, 'keys', _.noop);

    var _propertyIsEnumerable = objectProto.propertyIsEnumerable;
    setProperty(objectProto, 'propertyIsEnumerable', function(key) {
      if (key == '1' && _.isArguments(this) && _.isEqual(_.values(this), [0, 0])) {
        throw new Error;
      }
      return _.has(this, key);
    });

    var _isFinite = Number.isFinite;
    setProperty(Number, 'isFinite', _.noop);

    var _ArrayBuffer = ArrayBuffer;
    setProperty(root, 'ArrayBuffer', (function() {
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
      setProperty(root, 'Float64Array', (function() {
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
    var _parseInt = parseInt;
    setProperty(root, 'parseInt', (function() {
      var checkStr = whitespace + '08',
          isFaked = _parseInt(checkStr) != 8,
          reHexPrefix = /^0[xX]/,
          reTrim = RegExp('^[' + whitespace + ']+|[' + whitespace + ']+$');

      return function(value, radix) {
        if (value == checkStr && !isFaked) {
          isFaked = true;
          return 0;
        }
        value = String(value == null ? '' : value).replace(reTrim, '');
        return _parseInt(value, +radix || (reHexPrefix.test(value) ? 16 : 10));
      };
    }()));

    var _Set = root.Set;
    setProperty(root, 'Set', _.noop);

    var _WeakMap = root.WeakMap;
    setProperty(root, 'WeakMap', _.noop);

    // Fake the DOM
    setProperty(root, 'window', {});
    setProperty(root.window, 'document', {});
    setProperty(root.window.document, 'createDocumentFragment', function() {
      return { 'nodeType': 11 };
    });

    // Fake `WinRTError`.
    setProperty(root, 'WinRTError', Error);

    // Clear cache so Lo-Dash can be reloaded.
    emptyObject(require.cache);

    // Load Lo-Dash and expose it to the bad extensions/shims.
    lodashBizarro = (lodashBizarro = require(filePath))._ || lodashBizarro['default'] || lodashBizarro;

    // Restore native methods.
    setProperty(Array,  'isArray', _isArray);
    setProperty(Date,   'now', _now);
    setProperty(Object, 'create', _create);
    setProperty(Object, 'getPrototypeOf', _getPrototypeOf);
    setProperty(Object, 'keys', _keys);

    setProperty(objectProto, 'propertyIsEnumerable', _propertyIsEnumerable);
    setProperty(root, 'parseInt', _parseInt);

    if (_isFinite) {
      setProperty(Number, 'isFinite', _isFinite);
    } else {
      delete Number.isFinite;
    }
    if (_ArrayBuffer) {
      setProperty(root, 'ArrayBuffer', _ArrayBuffer);
    } else {
      delete root.ArrayBuffer;
    }
    if (_Set) {
      setProperty(root, 'Set', Set);
    } else {
      delete root.Set;
    }
    if (_WeakMap) {
      setProperty(root, 'WeakMap', WeakMap);
    } else {
      delete root.WeakMap;
    }
    delete root.WinRTError;
    delete root.window;
    delete funcProto._method;
  }());

  // Add values from an iframe.
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
      '',
      'var root = this;',
      "parent._.each(['" + typedArrays.join("', '") + "'], function(type) {",
      '  var Ctor = root[type];',
      '  if (Ctor) {',
      "    parent._['_' + type.toLowerCase()] = new Ctor(new ArrayBuffer(24));",
      '  }',
      '});',
      '<\/script>'
    ].join('\n'));
    idoc.close();
  }());

  // Add a web worker.
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

  // Explicitly call `QUnit.module()` instead of `module()` in case we are
  // in a CLI environment.
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
      if (amd && _.includes(ui.loaderPath, 'requirejs')) {
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

    test('should avoid overwritten native methods', 14, function() {
      function Foo() {}

      function message(lodashMethod, nativeMethod) {
        return '`' + lodashMethod + '` should avoid overwritten native `' + nativeMethod + '`';
      }

      var object = { 'a': 1 },
          otherObject = { 'b': 2 },
          largeArray = _.times(LARGE_ARRAY_SIZE, _.constant(object));

      if (lodashBizarro) {
        try {
          var actual = [lodashBizarro.isArray([]), lodashBizarro.isArray({ 'length': 0 })];
        } catch(e) {
          actual = null;
        }
        deepEqual(actual, [true, false], message('_.isArray', 'Array.isArray'));

        try {
          actual = lodashBizarro.now();
        } catch(e) {
          actual = null;
        }
        ok(typeof actual == 'number', message('_.now', 'Date.now'));

        try {
          actual = [lodashBizarro.create(Foo.prototype, object), lodashBizarro.create()];
        } catch(e) {
          actual = null;
        }
        ok(actual[0] instanceof Foo, message('_.create', 'Object.create'));
        deepEqual(actual[1], {}, message('_.create', 'Object.create'));

        try {
          actual = [lodashBizarro.isPlainObject({}), lodashBizarro.isPlainObject([])];
        } catch(e) {
          actual = null;
        }
        deepEqual(actual, [true, false], message('_.isPlainObject', 'Object.getPrototypeOf'));

        try {
          actual = [lodashBizarro.keys(object), lodashBizarro.keys()];
        } catch(e) {
          actual = null;
        }
        deepEqual(actual, [['a'], []], message('_.keys', 'Object.keys'));

        try {
          actual = [lodashBizarro.isFinite(1), lodashBizarro.isFinite(NaN)];
        } catch(e) {
          actual = null;
        }
        deepEqual(actual, [true, false], message('_.isFinite', 'Number.isFinite'));

        try {
          actual = [
            lodashBizarro.difference([object, otherObject], largeArray),
            lodashBizarro.intersection(largeArray, [object]),
            lodashBizarro.uniq(largeArray)
          ];
        } catch(e) {
          actual = null;
        }
        deepEqual(actual, [[otherObject], [object], [object]], message('_.difference`, `_.intersection`, and `_.uniq', 'Set'));

        try {
          actual = _.map(['6', '08', '10'], lodashBizarro.parseInt);
        } catch(e) {
          actual = null;
        }
        deepEqual(actual, [6, 8, 10], '`_.parseInt` should work in its bizarro form');

        if (ArrayBuffer) {
          try {
            var buffer = new ArrayBuffer(10);
            actual = lodashBizarro.clone(buffer);
          } catch(e) {
            actual = null;
          }
          deepEqual(actual, buffer, message('_.clone', 'ArrayBuffer#slice'));
          notStrictEqual(actual, buffer, message('_.clone', 'ArrayBuffer#slice'));
        }
        else {
          skipTest(2);
        }
        if (ArrayBuffer && Uint8Array) {
          try {
            var array = new Uint8Array(new ArrayBuffer(10));
            actual = lodashBizarro.cloneDeep(array);
          } catch(e) {
            actual = null;
          }
          deepEqual(actual, array, message('_.cloneDeep', 'Float64Array'));
          notStrictEqual(actual && actual.buffer, array.buffer, message('_.cloneDeep', 'Float64Array'));
          notStrictEqual(actual, array, message('_.cloneDeep', 'Float64Array'));
        }
        else {
          skipTest(3);
        }
      }
      else {
        skipTest(14);
      }
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash constructor');

  (function() {
    var values = empties.concat(true, 1, 'a'),
        expected = _.map(values, _.constant(true));

    test('creates a new instance when called without the `new` operator', 1, function() {
      if (!isNpm) {
        var actual = _.map(values, function(value) {
          return _(value) instanceof _;
        });

        deepEqual(actual, expected);
      }
      else {
        skipTest();
      }
    });

    test('should return provided `lodash` instances', 1, function() {
      if (!isNpm) {
        var actual = _.map(values, function(value) {
          var wrapped = _(value);
          return _(wrapped) === wrapped;
        });

        deepEqual(actual, expected);
      }
      else {
        skipTest();
      }
    });

    test('should convert foreign wrapped values to `lodash` instances', 1, function() {
      if (!isNpm && lodashBizarro) {
        var actual = _.map(values, function(value) {
          var wrapped = _(lodashBizarro(value)),
              unwrapped = getUnwrappedValue(wrapped);

          return wrapped instanceof _ &&
            (unwrapped === value || (_.isNaN(unwrapped) && _.isNaN(value)));
        });

        deepEqual(actual, expected);
      }
      else {
        skipTest();
      }
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
    test('should create a function that invokes `func` after `n` calls', 4, function() {
      strictEqual(after(5, 5), 1, 'after(n) should invoke `func` after being called `n` times');
      strictEqual(after(5, 4), 0, 'after(n) should not invoke `func` before being called `n` times');
      strictEqual(after(0, 0), 0, 'after(0) should not invoke `func` immediately');
      strictEqual(after(0, 1), 1, 'after(0) should invoke `func` when called once');
    });

    test('should coerce non-finite `n` values to `0`', 1, function() {
      var values = [-Infinity, NaN, Infinity],
          expected = _.map(values, _.constant(1));

      var actual = _.map(values, function(n) {
        return after(n, 1);
      });

      deepEqual(actual, expected);
    });

    test('should allow `func` as the first argument', 1, function() {
      var count = 0;

      try {
        var after = _.after(function() { count++; }, 1);
        after();
        after();
      } catch(e) {}

      strictEqual(count, 2);
    });

    test('should not set a `this` binding', 2, function() {
      var after = _.after(1, function() { return ++this.count; }),
          object = { 'count': 0, 'after': after };

      object.after();
      strictEqual(object.after(), 2);
      strictEqual(object.count, 2);
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.ary');

  (function() {
    function fn(a, b, c) {
      return slice.call(arguments);
    }

    test('should cap the numer of params provided to `func`', 2, function() {
      var actual = _.map(['6', '8', '10'], _.ary(parseInt, 1));
      deepEqual(actual, [6, 8, 10]);

      var capped = _.ary(fn, 2);
      deepEqual(capped('a', 'b', 'c', 'd'), ['a', 'b']);
    });

    test('should use `func.length` if `n` is not provided', 1, function() {
      var capped = _.ary(fn);
      deepEqual(capped('a', 'b', 'c', 'd'), ['a', 'b', 'c']);
    });

    test('should work when provided less than the capped numer of arguments', 1, function() {
      var capped = _.ary(fn, 3);
      deepEqual(capped('a'), ['a']);
    });

    test('should work as an iteratee for `_.map`', 1, function() {
      var funcs = _.map([fn], _.ary),
          actual = funcs[0]('a', 'b', 'c');

      deepEqual(actual, ['a', 'b', 'c']);
    });

    test('should work when combined with other methods that use metadata', 2, function() {
      var array = ['a', 'b', 'c'],
          includes = _.curry(_.rearg(_.ary(_.includes, 2), 1, 0), 2);

      strictEqual(includes('b')(array, 2), true);

      if (!isNpm) {
        includes = _(_.includes).ary(2).rearg(1, 0).curry(2).value();
        strictEqual(includes('b')(array, 2), true);
      }
      else {
        skipTest();
      }
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.assign');

  (function() {
    test('should assign properties of a source object to the destination object', 1, function() {
      deepEqual(_.assign({ 'a': 1 }, { 'b': 2 }), { 'a': 1, 'b': 2 });
    });

    test('should accept multiple source objects', 2, function() {
      var expected = { 'a': 1, 'b': 2, 'c': 3 };
      deepEqual(_.assign({ 'a': 1 }, { 'b': 2 }, { 'c': 3 }), expected);
      deepEqual(_.assign({ 'a': 1 }, { 'b': 2, 'c': 2 }, { 'c': 3 }), expected);
    });

    test('should overwrite destination properties', 1, function() {
      var expected = { 'a': 3, 'b': 2, 'c': 1 };
      deepEqual(_.assign({ 'a': 1, 'b': 2 }, expected), expected);
    });

    test('should assign source properties with `null` and `undefined` values', 1, function() {
      var expected = { 'a': null, 'b': undefined, 'c': null };
      deepEqual(_.assign({ 'a': 1, 'b': 2 }, expected), expected);
    });

    test('should work with a `customizer` callback', 1, function() {
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
    var args = arguments,
        array = ['a', 'b', 'c'];

    array['1.1'] = array['-1'] = 1;

    test('should return the elements corresponding to the specified keys', 1, function() {
      var actual = _.at(array, [0, 2]);
      deepEqual(actual, ['a', 'c']);
    });

    test('should return `undefined` for nonexistent keys', 1, function() {
      var actual = _.at(array, [2, 4, 0]);
      deepEqual(actual, ['c', undefined, 'a']);
    });

    test('should use `undefined` for non-index keys on array-like values', 1, function() {
      var values = _.reject(empties, function(value) {
        return value === 0 || _.isArray(value);
      }).concat(-1, 1.1);

      var expected = _.map(values, _.constant(undefined)),
          actual = _.at(array, values);

      deepEqual(actual, expected);
    });

    test('should return an empty array when no keys are provided', 2, function() {
      deepEqual(_.at(array), []);
      deepEqual(_.at(array, [], []), []);
    });

    test('should accept multiple key arguments', 1, function() {
      var actual = _.at(['a', 'b', 'c', 'd'], 3, 0, 2);
      deepEqual(actual, ['d', 'a', 'c']);
    });

    test('should work with a falsey `collection` argument when keys are provided', 1, function() {
      var expected = _.map(falsey, _.constant([undefined, undefined]));

      var actual = _.map(falsey, function(value) {
        try {
          return _.at(value, 0, 1);
        } catch(e) {}
      });

      deepEqual(actual, expected);
    });

    test('should work with an `arguments` object for `collection`', 1, function() {
      var actual = _.at(args, [2, 0]);
      deepEqual(actual, [3, 1]);
    });

    test('should work with `arguments` object as secondary arguments', 1, function() {
      var actual = _.at([1, 2, 3, 4, 5], args);
      deepEqual(actual, [2, 3, 4]);
    });

    test('should work with an object for `collection`', 1, function() {
      var actual = _.at({ 'a': 1, 'b': 2, 'c': 3 }, ['c', 'a']);
      deepEqual(actual, [3, 1]);
    });

    test('should pluck inherited property values', 1, function() {
      function Foo() { this.a = 1; }
      Foo.prototype.b = 2;

      var actual = _.at(new Foo, 'b');
      deepEqual(actual, [2]);
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
  }(1, 2, 3));

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.attempt');

  (function() {
    test('should return the result of `func`', 1, function() {
      strictEqual(_.attempt(_.constant('x')), 'x');
    });

    test('should return the caught error', 1, function() {
      var expected = _.map(errors, _.constant(true));

      var actual = _.map(errors, function(error) {
        return _.attempt(function() { throw error; }) === error;
      });

      deepEqual(actual, expected);
    });

    test('should coerce errors to error objects', 1, function() {
      var actual = _.attempt(function() { throw 'x'; });
      ok(_.isEqual(actual, Error('x')));
    });

    test('should work with an error object from another realm', 1, function() {
      if (_._object) {
        var expected = _.map(_._errors, _.constant(true));

        var actual = _.map(_._errors, function(error) {
          return _.attempt(function() { throw error; }) === error;
        });

        deepEqual(actual, expected);
      }
      else {
        skipTest();
      }
    });

    test('should return an unwrapped value when chaining', 1, function() {
      if (!isNpm) {
        strictEqual(_(_.constant('x')).attempt(), 'x');
      }
      else {
        skipTest();
      }
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.before');

  (function() {
    function before(n, times) {
      var count = 0;
      _.times(times, _.before(n, function() { count++; }));
      return count;
    }
    test('should create a function that invokes `func` after `n` calls', 4, function() {
      strictEqual(before(5, 4), 4, 'before(n) should invoke `func` before being called `n` times');
      strictEqual(before(5, 6), 4, 'before(n) should not invoke `func` after being called `n - 1` times');
      strictEqual(before(0, 0), 0, 'before(0) should not invoke `func` immediately');
      strictEqual(before(0, 1), 0, 'before(0) should not invoke `func` when called');
    });

    test('should coerce non-finite `n` values to `0`', 1, function() {
      var values = [-Infinity, NaN, Infinity],
          expected = _.map(values, _.constant(0));

      var actual = _.map(values, function(n) {
        return before(n);
      });

      deepEqual(actual, expected);
    });

    test('should allow `func` as the first argument', 1, function() {
      var count = 0;

      try {
        var before = _.before(function() { count++; }, 2);
        before();
        before();
      } catch(e) {}

      strictEqual(count, 1);
    });

    test('should not set a `this` binding', 2, function() {
      var before = _.before(2, function() { return ++this.count; }),
          object = { 'count': 0, 'before': before };

      object.before();
      strictEqual(object.before(), 1);
      strictEqual(object.count, 1);
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.bind');

  (function() {
    function fn() {
      var result = [this];
      push.apply(result, arguments);
      return result;
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
        } catch(e) {}
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
      var object = {},
          ph = _.bind.placeholder,
          bound = _.bind(fn, object, ph, 'b', ph);

      deepEqual(bound('a', 'c'), [object, 'a', 'b', 'c']);
      deepEqual(bound('a'), [object, 'a', 'b', undefined]);
      deepEqual(bound('a', 'c', 'd'), [object, 'a', 'b', 'c', 'd']);
      deepEqual(bound(), [object, undefined, 'b', undefined]);
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
      strictEqual(array.pop, arrayProto.pop);
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
        'user': 'fred',
        'greet': function(greeting) {
          return this.user + ' says: ' + greeting;
        }
      };

      var bound = _.bindKey(object, 'greet', 'hi');
      strictEqual(bound(), 'fred says: hi');

      object.greet = function(greeting) {
        return this.user + ' says: ' + greeting + '!';
      };

      strictEqual(bound(), 'fred says: hi!');
    });

    test('should support placeholders', 4, function() {
      var object = {
        'fn': function() {
          return slice.call(arguments);
        }
      };

      var ph = _.bindKey.placeholder,
          bound = _.bindKey(object, 'fn', ph, 'b', ph);

      deepEqual(bound('a', 'c'), ['a', 'b', 'c']);
      deepEqual(bound('a'), ['a', 'b', undefined]);
      deepEqual(bound('a', 'c', 'd'), ['a', 'b', 'c', 'd']);
      deepEqual(bound(), [undefined, 'b', undefined]);
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('case methods');

  _.each(['camel', 'kebab', 'snake'], function(caseName) {
    var methodName = caseName + 'Case',
        func = _[methodName];

    var strings = [
      'hello world', 'Hello world', 'HELLO WORLD',
      'helloWorld', '--hello-world', '__hello_world__'
    ];

    var expected = (function() {
      switch (caseName) {
        case 'camel': return 'helloWorld';
        case 'kebab': return 'hello-world';
        case 'snake': return 'hello_world';
      }
    }());

    test('`_.' + methodName + '` should convert `string` to ' + caseName + ' case', 1, function() {
      var actual = _.map(strings, function(string) {
        return func(string) === expected;
      });

      deepEqual(actual, _.map(strings, _.constant(true)));
    });

    test('`_.' + methodName + '` should handle double-converting strings', 1, function() {
      var actual = _.map(strings, function(string) {
        return func(func(string)) === expected;
      });

      deepEqual(actual, _.map(strings, _.constant(true)));
    });

    test('`_.' + methodName + '` should deburr letters', 1, function() {
      var actual = _.map(burredLetters, function(burred, index) {
        return func(burred) === deburredLetters[index].toLowerCase();
      });

      deepEqual(actual, _.map(burredLetters, _.constant(true)));
    });

    test('should trim latin-1 mathematical operators', 1, function() {
      var actual = _.map(['\xd7', '\xf7'], func);
      deepEqual(actual, ['', '']);
    });

    test('`_.' + methodName + '` should coerce `string` to a string', 2, function() {
      var string = 'Hello world';
      strictEqual(func(Object(string)), expected);
      strictEqual(func({ 'toString': _.constant(string) }), expected);
    });

    test('`_.' + methodName + '` should return an unwrapped value when chaining', 1, function() {
      if (!isNpm) {
        strictEqual(_('hello world')[methodName](), expected);
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

    test('should handle acronyms', 6, function() {
      _.each(['safe HTML', 'safeHTML'], function(string) {
        strictEqual(_.camelCase(string), 'safeHtml');
      });

      _.each(['escape HTML entities', 'escapeHTMLEntities'], function(string) {
        strictEqual(_.camelCase(string), 'escapeHtmlEntities');
      });

      _.each(['XMLHttpRequest', 'XmlHTTPRequest'], function(string) {
        strictEqual(_.camelCase(string), 'xmlHttpRequest');
      });
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
        strictEqual(_('fred').capitalize(), 'Fred');
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

    test('should return existing wrapped values', 2, function() {
      if (!isNpm) {
        var wrapped = _({ 'a': 0 });
        strictEqual(_.chain(wrapped), wrapped);
        strictEqual(wrapped.chain(), wrapped);
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
              wrapped = index ? _(array).chain() : _.chain(array);

          var actual = wrapped
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
          wrapped = index ? _(array).chain() : _.chain(array);
          actual = wrapped
            .chain()
            .filter(function(n) { return n % 2; })
            .reject(function(n) { return n % 3 == 0; })
            .sortBy(function(n) { return -n; })
            .value();

          deepEqual(actual, [5, 1]);

          array = [3, 4];
          wrapped = index ? _(array).chain() : _.chain(array);
          actual = wrapped
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
      var values = falsey.concat(-1, -Infinity),
          expected = _.map(values, _.constant([[0], [1], [2], [3], [4], [5]]));

      var actual = _.map(values, function(value, index) {
        return index ? _.chunk(array, value) : _.chunk(array);
      });

      deepEqual(actual, expected);
    });

    test('should work as an iteratee for `_.map`', 1, function() {
      var actual = _.map([[1, 2], [3, 4]], _.chunk);
      deepEqual(actual, [[[1], [2]], [[3], [4]]]);
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('clone methods');

  (function() {
    function Klass() { this.a = 1; }
    Klass.prototype = { 'b': 1 };

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

    var nonCloneable = {
      'DOM elements': body,
      'functions': Klass
    };

    _.each(errors, function(error) {
      nonCloneable[error.name + 's'] = error;
    });

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
        'foo': { 'b': { 'c': { 'd': {} } } },
        'bar': {}
      };

      object.foo.b.c.d = object;
      object.bar.b = object.foo.b;

      var clone = _.cloneDeep(object);
      ok(clone.bar.b === clone.foo.b && clone === clone.foo.b.c.d && clone !== object);
    });

    _.each(['clone', 'cloneDeep'], function(methodName, index) {
      var func = _[methodName],
          isDeep = !!index;

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

      _.forOwn(nonCloneable, function(value, key) {
        test('`_.' + methodName + '` should not clone ' + key, 2, function() {
          var object = { 'a': value, 'b': { 'c': value } },
              expected = value && {};

          deepEqual(func(value), expected);

          expected = isDeep
            ? { 'a': expected, 'b': { 'c': expected } }
            : { 'a': value,    'b': { 'c': value } }

          deepEqual(func(object), expected);
        });

        test('`_.' + methodName + '` should work with a `customizer` callback and ' + key, 4, function() {
          var customizer = function(value) {
            return _.isPlainObject(value) ? undefined : value;
          };

          var actual = func(value, customizer);

          deepEqual(actual, value);
          strictEqual(actual, value);

          var object = { 'a': value, 'b': { 'c': value } };
          actual = func(object, customizer);

          deepEqual(actual, object);
          notStrictEqual(actual, object);
        });
      });

      test('`_.' + methodName + '` should clone array buffers', 2, function() {
        var buffer = ArrayBuffer && new ArrayBuffer(10);
        if (buffer) {
          var actual = func(buffer);
          strictEqual(actual.byteLength, buffer.byteLength);
          notStrictEqual(actual, buffer);
        }
        else {
          skipTest(2);
        }
      });

      _.each(typedArrays, function(type) {
        test('`_.' + methodName + '` should clone ' + type + ' arrays', 10, function() {
          var Ctor = root[type];
          if (Ctor) {
            _.times(2, function(index) {
              var buffer = new ArrayBuffer(24),
                  array = index ? new Ctor(buffer, 8, 1) : new Ctor(buffer),
                  actual = func(array);

              deepEqual(actual, array);
              notStrictEqual(actual, array);
              strictEqual(actual.buffer === array.buffer, !isDeep);
              strictEqual(actual.byteOffset, array.byteOffset);
              strictEqual(actual.length, array.length);
            });
          }
          else {
            skipTest(10);
          }
        });
      });

      test('`_.' + methodName + '` should clone problem JScript properties (test in IE < 9)', 2, function() {
        var actual = func(shadowObject);
        deepEqual(actual, shadowObject);
        notStrictEqual(actual, shadowObject);
      });

      test('`_.' + methodName + '` should provide the correct `customizer` arguments', 1, function() {
        var argsList = [],
            klass = new Klass;

        func(klass, function() {
          argsList.push(slice.call(arguments));
        });

        deepEqual(argsList, isDeep ? [[klass], [1, 'a', klass]] : [[klass]]);
      });

      test('`_.' + methodName + '` should support the `thisArg` argument', 1, function() {
        var actual = func('a', function(value) {
          return this[value];
        }, { 'a': 'A' });

        strictEqual(actual, 'A');
      });

      test('`_.' + methodName + '` should handle cloning if `customizer` returns `undefined`', 1, function() {
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
        // Avoid a regexp literal for older Opera and use `exec` for older Safari.
        var regexp = RegExp('x', 'g');
        regexp.exec('vwxyz');

        var actual = func(regexp);
        strictEqual(actual.lastIndex, 3);
      });

      test('`_.' + methodName + '` should not error on DOM elements', 1, function() {
        if (document) {
          var element = document.createElement('div');
          try {
            deepEqual(func(element), {});
          } catch(e) {
            ok(false, e.message);
          }
        }
        else {
          skipTest();
        }
      });

      test('`_.' + methodName + '` should perform a ' + (isDeep ? 'deep' : 'shallow') + ' clone when used as an iteratee for `_.map`', 3, function() {
        var expected = [{ 'a': [0] }, { 'b': [1] }],
            actual = _.map(expected, func);

        deepEqual(actual, expected);

        if (isDeep) {
          ok(actual[0] !== expected[0] && actual[0].a !== expected[0].a && actual[1].b !== expected[1].b);
        } else {
          ok(actual[0] !== expected[0] && actual[0].a === expected[0].a && actual[1].b === expected[1].b);
        }
        actual = _.map(isDeep ? Object('abc') : 'abc', func);
        deepEqual(actual, ['a', 'b', 'c']);
      });

      test('`_.' + methodName + '` should create an object from the same realm as `value`', 1, function() {
        var objects = _.transform(_, function(result, value, key) {
          if (_.startsWith(key, '_') && _.isObject(value) && !_.isArguments(value) && !_.isElement(value) && !_.isFunction(value)) {
            result.push(value);
          }
        }, []);

        var expected = _.times(objects.length, _.constant(true));

        var actual = _.map(objects, function(object) {
          var Ctor = object.constructor,
              result = func(object);

          return result !== object && (result instanceof Ctor || !(new Ctor instanceof Ctor));
        });

        deepEqual(actual, expected);
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
        var wrapped = _(falsey).compact();
        ok(wrapped instanceof _);
        deepEqual(wrapped.value(), []);
      }
      else {
        skipTest(2);
      }
    });

    test('should work when in between lazy operators', 2, function() {
      if (!isNpm) {
        var actual = _(falsey).slice().compact().slice().value();
        deepEqual(actual, []);

        actual = _(falsey).slice().push(true, 1).compact().push('a').slice().value();
        deepEqual(actual, [true, 1, 'a']);
      }
      else {
        skipTest(2);
      }
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.flowRight');

  (function() {
    test('should be aliased', 2, function() {
      strictEqual(_.backflow, _.flowRight);
      strictEqual(_.compose, _.flowRight);
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('flow methods');

  _.each(['flow', 'flowRight'], function(methodName, index) {
    var func = _[methodName],
        isFlow = !index;

    test('`_.' + methodName + '` should supply each function with the return value of the previous', 1, function() {
      function add(x, y) {
        return x + y;
      }

      function square(n) {
        return n * n;
      }

      function fixed(n) {
        return n.toFixed(1);
      }

      var combined = isFlow ? func(add, square, fixed) : func(fixed, square, add);
      strictEqual(combined(1, 2), '9.0');
    });

    test('`_.' + methodName + '` should return a new function', 1, function() {
      notStrictEqual(func(_.noop), _.noop);
    });

    test('`_.' + methodName + '` should return a noop function when no arguments are provided', 2, function() {
      var combined = func();

      try {
        strictEqual(combined(), undefined);
      } catch(e) {
        ok(false, e.message);
      }
      notStrictEqual(combined, _.noop);
    });

    test('`_.' + methodName + '` should return a wrapped value when chaining', 1, function() {
      if (!isNpm) {
        var wrapped = _(_.noop)[methodName]();
        ok(wrapped instanceof _);
      }
      else {
        skipTest();
      }
    });
  });

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.constant');

  (function() {
    test('should create a function that returns `value`', 1, function() {
      var object = { 'a': 1 },
          values = Array(2).concat(empties, true, 1, 'a'),
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
        var constant = index ? _.constant(value) : _.constant(),
            result = constant();

        return result === value || (_.isNaN(result) && _.isNaN(value));
      });

      deepEqual(actual, expected);
    });

    test('should return a wrapped value when chaining', 1, function() {
      if (!isNpm) {
        var wrapped = _(true).constant();
        ok(wrapped instanceof _);
      }
      else {
        skipTest();
      }
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.countBy');

  (function() {
    var array = [4.2, 6.1, 6.4];

    test('should work with an iteratee', 1, function() {
      var actual = _.countBy(array, function(num) {
        return Math.floor(num);
      }, Math);

      deepEqual(actual, { '4': 1, '6': 2 });
    });

    test('should use `_.identity` when `iteratee` is nullish', 1, function() {
      var array = [4, 6, 6],
          values = [, null, undefined],
          expected = _.map(values, _.constant({ '4': 1, '6':  2 }));

      var actual = _.map(values, function(value, index) {
        return index ? _.countBy(array, value) : _.countBy(array);
      });

      deepEqual(actual, expected);
    });

    test('should provide the correct `iteratee` arguments', 1, function() {
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

    test('should work with a "_.pluck" style `iteratee`', 1, function() {
      var actual = _.countBy(['one', 'two', 'three'], 'length');
      deepEqual(actual, { '3': 2, '5': 1 });
    });

    test('should work with an object for `collection`', 1, function() {
      var actual = _.countBy({ 'a': 4.2, 'b': 6.1, 'c': 6.4 }, function(num) {
        return Math.floor(num);
      });

      deepEqual(actual, { '4': 1, '6': 2 });
    });

    test('should work with a number for `iteratee`', 2, function() {
      var array = [
        [1, 'a'],
        [2, 'a'],
        [2, 'b']
      ];

      deepEqual(_.countBy(array, 0), { '1': 1, '2': 2 });
      deepEqual(_.countBy(array, 1), { 'a': 2, 'b': 1 });
    });

    test('should work in a lazy chain sequence', 1, function() {
      if (!isNpm) {
        var array = [1, 2, 1, 3],
            predicate = function(value) { return value > 1; },
            actual = _(array).countBy(_.identity).map(String).filter(predicate).take().value();

        deepEqual(actual, ['2']);
      }
      else {
        skipTest();
      }
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

    test('should assign own properties', 1, function() {
      function Foo() {
        this.a = 1;
        this.c = 3;
      }
      Foo.prototype.b = 2;

      deepEqual(_.create({}, new Foo), { 'a': 1, 'c': 3 });
    });

    test('should accept a falsey `prototype` argument', 1, function() {
      var expected = _.map(falsey, _.constant({}));

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

    test('should work as an iteratee for `_.map`', 1, function() {
      var array = [{ 'a': 1 }, { 'a': 1 }, { 'a': 1 }],
          expected = _.map(array, _.constant(true)),
          objects = _.map(array, _.create);

      var actual = _.map(objects, function(object) {
        return object.a === 1 && !_.keys(object).length;
      });

      deepEqual(actual, expected);
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.callback');

  (function() {
    test('should provide arguments to `func`', 3, function() {
      function fn() {
        var result = [this];
        push.apply(result, arguments);
        return result;
      }

      var callback = _.callback(fn),
          actual = callback('a', 'b', 'c', 'd', 'e', 'f');

      ok(actual[0] === null || actual[0] && actual[0].Array);
      deepEqual(actual.slice(1), ['a', 'b', 'c', 'd', 'e', 'f']);

      var object = {};
      callback = _.callback(fn, object);
      actual = callback('a', 'b');

      deepEqual(actual, [object, 'a', 'b']);
    });

    test('should return `_.identity` when `func` is nullish', 1, function() {
      var object = {},
          values = [, null, undefined],
          expected = _.map(values, _.constant(object));

      var actual = _.map(values, function(value, index) {
        var callback = index ? _.callback(value) : _.callback();
        return callback(object);
      });

      deepEqual(actual, expected);
    });

    test('should not error when `func` is nullish and a `thisArg` is provided', 2, function() {
      var object = {};
      _.each([null, undefined], function(value) {
        try {
          var callback = _.callback(value, {});
          strictEqual(callback(object), object);
        } catch(e) {
          ok(false, e.message);
        }
      });
    });

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
          callback = _.callback(hasOwnProperty, object);

      strictEqual(callback('a'), true);

      var fn = function() {},
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

    test('should work with bizarro `_.support.funcNames`', 6, function() {
      function a() {}

      var b = function() {};

      function c() {
        return this;
      }

      var object = {},
          supportBizarro = lodashBizarro ? lodashBizarro.support : {},
          funcDecomp = supportBizarro.funcDecomp,
          funcNames = supportBizarro.funcNames;

      supportBizarro.funcNames = !supportBizarro.funcNames;
      supportBizarro.funcDecomp = true;

      _.each([a, b, c], function(fn) {
        if (lodashBizarro && _.support.funcDecomp) {
          var callback = lodashBizarro.callback(fn, object);
          strictEqual(callback(), fn === c ? object : undefined);
          strictEqual(callback === fn, _.support.funcNames && fn === a);
        }
        else {
          skipTest(2);
        }
      });

      supportBizarro.funcDecomp = funcDecomp;
      supportBizarro.funcNames = funcNames;
    });

    test('should work as an iteratee for `_.map`', 1, function() {
      var fn = function() { return this instanceof Number; },
          array = [fn, fn, fn],
          expected = _.map(array, _.constant(false)),
          callbacks = _.map(array, _.callback);

      var actual = _.map(callbacks, function(callback) {
        return callback();
      });

      deepEqual(actual, expected);
    });

    test('should be aliased', 1, function() {
      strictEqual(_.iteratee, _.callback);
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

    test('should allow specifying `arity`', 3, function() {
      var curried = _.curry(fn, 3),
          expected = [1, 2, 3];

      deepEqual(curried(1)(2, 3), expected);
      deepEqual(curried(1, 2)(3), expected);
      deepEqual(curried(1, 2, 3), expected);
    });

    test('should coerce `arity` to a number', 2, function() {
      var values = ['0', 'xyz'],
          expected = _.map(values, _.constant([]));

      var actual = _.map(values, function(arity) {
        return _.curry(fn, arity)();
      });

      deepEqual(actual, expected);
      deepEqual(_.curry(fn, '2')(1)(2), [1, 2]);
    });

    test('should support placeholders', 4, function() {
      var curried = _.curry(fn),
          ph = curried.placeholder;

      deepEqual(curried(1)(ph, 3)(ph, 4)(2), [1, 2, 3, 4]);
      deepEqual(curried(ph, 2)(1)(ph, 4)(3), [1, 2, 3, 4]);
      deepEqual(curried(ph, ph, 3)(ph, 2)(ph, 4)(1), [1, 2, 3, 4]);
      deepEqual(curried(ph, ph, ph, 4)(ph, ph, 3)(ph, 2)(1), [1, 2, 3, 4]);
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

    test('should provide additional arguments after reaching the target arity', 3, function() {
      var curried = _.curry(fn, 3);
      deepEqual(curried(1)(2, 3, 4), [1, 2, 3, 4]);
      deepEqual(curried(1, 2)(3, 4, 5), [1, 2, 3, 4, 5]);
      deepEqual(curried(1, 2, 3, 4, 5, 6), [1, 2, 3, 4, 5, 6]);
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
      var Foo = function(value) {
        return value && object;
      };

      var curried = _.curry(Foo),
          object = {};

      ok(new curried(false) instanceof Foo);
      strictEqual(new curried(true), object);
    });

    test('should not set a `this` binding', 9, function() {
      var fn = function(a, b, c) {
        var value = this || {};
        return [value[a], value[b], value[c]];
      };

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

  QUnit.module('lodash.curryRight');

  (function() {
    function fn(a, b, c, d) {
      return slice.call(arguments);
    }

    test('should curry based on the number of arguments provided', 3, function() {
      var curried = _.curryRight(fn),
          expected = [1, 2, 3, 4];

      deepEqual(curried(4)(3)(2)(1), expected);
      deepEqual(curried(3, 4)(1, 2), expected);
      deepEqual(curried(1, 2, 3, 4), expected);
    });

    test('should allow specifying `arity`', 3, function() {
      var curried = _.curryRight(fn, 3),
          expected = [1, 2, 3];

      deepEqual(curried(3)(1, 2), expected);
      deepEqual(curried(2, 3)(1), expected);
      deepEqual(curried(1, 2, 3), expected);
    });

    test('should work with partialed methods', 2, function() {
      var curried = _.curryRight(fn),
          expected = [1, 2, 3, 4];

      var a = _.partialRight(curried, 4),
          b = _.partialRight(a, 3),
          c = _.bind(b, null, 1),
          d = _.partial(b(2), 1);

      deepEqual(c(2), expected);
      deepEqual(d(), expected);
    });

    test('should support placeholders', 4, function() {
      var curried = _.curryRight(fn),
          expected = [1, 2, 3, 4],
          ph = curried.placeholder;

      deepEqual(curried(4)(2, ph)(1, ph)(3), expected);
      deepEqual(curried(3, ph)(4)(1, ph)(2), expected);
      deepEqual(curried(ph, ph, 4)(ph, 3)(ph, 2)(1), expected);
      deepEqual(curried(ph, ph, ph, 4)(ph, ph, 3)(ph, 2)(1), expected);
    });

    test('should provide additional arguments after reaching the target arity', 3, function() {
      var curried = _.curryRight(fn, 3);
      deepEqual(curried(4)(1, 2, 3), [1, 2, 3, 4]);
      deepEqual(curried(4, 5)(1, 2, 3), [1, 2, 3, 4, 5]);
      deepEqual(curried(1, 2, 3, 4, 5, 6), [1, 2, 3, 4, 5, 6]);
    });

    test('should return a function with a `length` of `0`', 6, function() {
      _.times(2, function(index) {
        var curried = index ? _.curryRight(fn, 4) : _.curryRight(fn);
        strictEqual(curried.length, 0);
        strictEqual(curried(4).length, 0);
        strictEqual(curried(3, 4).length, 0);
      });
    });

    test('ensure `new curried` is an instance of `func`', 2, function() {
      var Foo = function(value) {
        return value && object;
      };

      var curried = _.curryRight(Foo),
          object = {};

      ok(new curried(false) instanceof Foo);
      strictEqual(new curried(true), object);
    });

    test('should not set a `this` binding', 9, function() {
      var fn = function(a, b, c) {
        var value = this || {};
        return [value[a], value[b], value[c]];
      };

      var object = { 'a': 1, 'b': 2, 'c': 3 },
          expected = [1, 2, 3];

      deepEqual(_.curryRight(_.bind(fn, object), 3)('c')('b')('a'), expected);
      deepEqual(_.curryRight(_.bind(fn, object), 3)('b', 'c')('a'), expected);
      deepEqual(_.curryRight(_.bind(fn, object), 3)('a', 'b', 'c'), expected);

      deepEqual(_.bind(_.curryRight(fn), object)('c')('b')('a'), Array(3));
      deepEqual(_.bind(_.curryRight(fn), object)('b', 'c')('a'), Array(3));
      deepEqual(_.bind(_.curryRight(fn), object)('a', 'b', 'c'), expected);

      object.curried = _.curryRight(fn);
      deepEqual(object.curried('c')('b')('a'), Array(3));
      deepEqual(object.curried('b', 'c')('a'), Array(3));
      deepEqual(object.curried('a', 'b', 'c'), expected);
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('curry methods');

  _.each(['curry', 'curryRight'], function(methodName) {
    var func = _[methodName];

    test('`_.' + methodName + '` should work as an iteratee for `_.map`', 1, function() {
      var array = [_.identity, _.identity, _.identity],
          curries = _.map(array, func);

      var actual = _.map(curries, function(curried, index) {
        return curried(index);
      });

      deepEqual(actual, [0, 1, 2]);
    });
  });

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

    asyncTest('should cancel `maxDelayed` when `delayed` is invoked', 1, function() {
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

    asyncTest('should invoke the `trailing` call with the correct arguments and `this` binding', 2, function() {
      if (!(isRhino && isModularize)) {
        var actual,
            count = 0,
            object = {};

        var debounced = _.debounce(function(value) {
          actual = [this];
          push.apply(actual, arguments);
          return ++count != 2;
        }, 32, { 'leading': true, 'maxWait': 64 });

        while (true) {
          if (!debounced.call(object, 'a')) {
            break;
          }
        }
        setTimeout(function() {
          strictEqual(count, 2);
          deepEqual(actual, [object, 'a']);
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

  QUnit.module('lodash.deburr');

  (function() {
    test('should convert latin-1 supplementary letters to basic latin', 1, function() {
      var actual = _.map(burredLetters, _.deburr);
      deepEqual(actual, deburredLetters);
    });

    test('should not deburr latin-1 mathematical operators', 1, function() {
      var operators = ['\xd7', '\xf7'],
          actual = _.map(operators, _.deburr);

      deepEqual(actual, operators);
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.defaults');

  (function() {
    test('should assign properties of a source object if missing on the destination object', 1, function() {
      deepEqual(_.defaults({ 'a': 1 }, { 'a': 2, 'b': 2 }), { 'a': 1, 'b': 2 });
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
        _.defer(function() { pass = true; });

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
        _.delay(function() { pass = true; }, 96);

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

    test('should match `NaN`', 1, function() {
      deepEqual(_.difference([1, NaN, 3], [NaN, 5, NaN]), [1, 3]);
    });

    test('should work with large arrays', 1, function() {
      var array1 = _.range(LARGE_ARRAY_SIZE + 1),
          array2 = _.range(LARGE_ARRAY_SIZE),
          a = {},
          b = {},
          c = {};

      array1.push(a, b, c);
      array2.push(b, c, a);

      deepEqual(_.difference(array1, array2), [LARGE_ARRAY_SIZE]);
    });

    test('should work with large arrays of objects', 1, function() {
      var object1 = {},
          object2 = {},
          largeArray = _.times(LARGE_ARRAY_SIZE, _.constant(object1));

      deepEqual(_.difference([object1, object2], largeArray), [object2]);
    });

    test('should work with large arrays of `NaN`', 1, function() {
      var largeArray = _.times(LARGE_ARRAY_SIZE, _.constant(NaN));
      deepEqual(_.difference([1, NaN, 3], largeArray), [1, 3]);
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

    test('should work as an iteratee for `_.map`', 1, function() {
      var array = [[1, 2, 3], [4, 5, 6], [7, 8, 9]],
          actual = _.map(array, _.drop);

      deepEqual(actual, [[2, 3], [5, 6], [8, 9]]);
    });

    test('should return a wrapped value when chaining', 2, function() {
      if (!isNpm) {
        var wrapped = _(array).drop(2);
        ok(wrapped instanceof _);
        deepEqual(wrapped.value(), [3]);
      }
      else {
        skipTest(2);
      }
    });

    test('should work in a lazy chain sequence', 4, function() {
      if (!isNpm) {
        var array = [1, 2, 3, 4, 5, 6, 7, 8],
            predicate = function(value) { return value > 1; },
            actual = _(array).drop(2).drop().value();

        deepEqual(actual, [4, 5, 6, 7, 8]);

        actual = _(array).filter(predicate).drop(2).drop().value();
        deepEqual(actual, [5, 6, 7, 8]);

        actual = _(array).drop(2).dropRight().drop().dropRight(2).value();
        deepEqual(actual, [4, 5]);

        actual = _(array).filter(predicate).drop(2).dropRight().drop().dropRight(2).value();
        deepEqual(actual, [5]);
      }
      else {
        skipTest(4);
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

    test('should work as an iteratee for `_.map`', 1, function() {
      var array = [[1, 2, 3], [4, 5, 6], [7, 8, 9]],
          actual = _.map(array, _.dropRight);

      deepEqual(actual, [[1, 2], [4, 5], [7, 8]]);
    });

    test('should return a wrapped value when chaining', 2, function() {
      if (!isNpm) {
        var wrapped = _(array).dropRight(2);
        ok(wrapped instanceof _);
        deepEqual(wrapped.value(), [1]);
      }
      else {
        skipTest(2);
      }
    });

    test('should work in a lazy chain sequence', 4, function() {
      if (!isNpm) {
        var array = [1, 2, 3, 4, 5, 6, 7, 8],
            predicate = function(value) { return value < 8; },
            actual = _(array).dropRight(2).dropRight().value();

        deepEqual(actual, [1, 2, 3, 4, 5]);

        actual = _(array).filter(predicate).dropRight(2).dropRight().value();
        deepEqual(actual, [1, 2, 3, 4]);

        actual = _(array).dropRight(2).drop().dropRight().drop(2).value();
        deepEqual(actual, [4, 5]);

        actual = _(array).filter(predicate).dropRight(2).drop().dropRight().drop(2).value();
        deepEqual(actual, [4]);
      }
      else {
        skipTest(4);
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

    test('should provide the correct `predicate` arguments', 1, function() {
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

    test('should work with a "_.pluck" style `predicate`', 1, function() {
      deepEqual(_.dropRightWhile(objects, 'b'), objects.slice(0, 1));
    });

    test('should work with a "_.where" style `predicate`', 1, function() {
      deepEqual(_.dropRightWhile(objects, { 'b': 2 }), objects.slice(0, 2));
    });

    test('should return a wrapped value when chaining', 2, function() {
      if (!isNpm) {
        var wrapped = _(array).dropRightWhile(function(num) {
          return num > 1;
        });

        ok(wrapped instanceof _);
        deepEqual(wrapped.value(), [1]);
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

    test('should provide the correct `predicate` arguments', 1, function() {
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

    test('should work with a "_.pluck" style `predicate`', 1, function() {
      deepEqual(_.dropWhile(objects, 'b'), objects.slice(2));
    });

    test('should work with a "_.where" style `predicate`', 1, function() {
      deepEqual(_.dropWhile(objects, { 'b': 2 }), objects.slice(1));
    });

    test('should return a wrapped value when chaining', 2, function() {
      if (!isNpm) {
        var wrapped = _(array).dropWhile(function(num) {
          return num < 3;
        });

        ok(wrapped instanceof _);
        deepEqual(wrapped.value(), [3]);
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
      _.each([3, 5, MAX_SAFE_INTEGER, Infinity], function(position) {
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

    test('should return `true` when `target` is an empty string regardless of `position`', 1, function() {
      ok(_.every([-Infinity, NaN, -3, -1, 0, 1, 2, 3, 5, MAX_SAFE_INTEGER, Infinity], function(position) {
        return _.endsWith(string, '', position, true);
      }));
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.escape');

  (function() {
    var escaped = '&amp;&lt;&gt;&quot;&#39;&#96;\/',
        unescaped = '&<>"\'`\/';

    escaped += escaped;
    unescaped += unescaped;

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
    var escaped = '\\.\\*\\+\\?\\^\\$\\{\\}\\(\\)\\|\\[\\]\\/\\\\',
        unescaped = '.*+?^${}()|[\]\/\\';

    escaped += escaped;
    unescaped += unescaped;

    test('should escape values', 1, function() {
      strictEqual(_.escapeRegExp(unescaped), escaped);
    });

    test('should handle strings with nothing to escape', 1, function() {
      strictEqual(_.escapeRegExp('abc'), 'abc');
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.every');

  (function() {
    test('should return `true` for empty collections', 1, function() {
      var expected = _.map(empties, _.constant(true));

      var actual = _.map(empties, function(value) {
        try {
          return _.every(value, _.identity);
        } catch(e) {}
      });

      deepEqual(actual, expected);
    });

    test('should return `true` if `predicate` returns truthy for all elements in the collection', 1, function() {
      strictEqual(_.every([true, 1, 'a'], _.identity), true);
    });

    test('should return `false` as soon as `predicate` returns falsey', 1, function() {
      strictEqual(_.every([true, null, true], _.identity), false);
    });

    test('should work with collections of `undefined` values (test in IE < 9)', 1, function() {
      strictEqual(_.every([undefined, undefined, undefined], _.identity), false);
    });

    test('should use `_.identity` when `predicate` is nullish', 2, function() {
      var values = [, null, undefined],
          expected = _.map(values, _.constant(false));

      var actual = _.map(values, function(value, index) {
        var array = [0];
        return index ? _.every(array, value) : _.every(array);
      });

      deepEqual(actual, expected);

      expected = _.map(values, _.constant(true));
      actual = _.map(values, function(value, index) {
        var array = [1];
        return index ? _.every(array, value) : _.every(array);
      });

      deepEqual(actual, expected);
    });

    test('should be aliased', 1, function() {
      strictEqual(_.all, _.every);
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('strict mode checks');

  _.each(['assign', 'bindAll', 'defaults'], function(methodName) {
    var func = _[methodName];

    test('`_.' + methodName + '` should ' + (isStrict ? '' : 'not ') + 'throw strict mode errors', 1, function() {
      var object = { 'a': null, 'b': function() {} },
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

    test('should iterate correctly over an object with numeric keys (test in Mobile Safari 8)', 1, function() {
      // Trigger a Mobile Safari 8 JIT bug.
      // See https://github.com/lodash/lodash/issues/799.
      var counter = 0,
          object = { '1': 'foo', '8': 'bar', '50': 'baz' };

      _.times(1000, function() {
        _.filter([], _.constant(true));
      });

      _.filter(object, function() {
          counter++;
          return true;
      });

      strictEqual(counter, 3);
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

      test('should work with a "_.pluck" style `predicate`', 1, function() {
        strictEqual(func(objects, 'b'), expected[3]);
      });

      test('should work with a "_.where" style `predicate`', 1, function() {
        strictEqual(func(objects, { 'b': 2 }), expected[2]);
      });

      test('should return `' + expected[1] + '` for empty collections', 1, function() {
        var actual = [],
            emptyValues = _.endsWith(methodName, 'Index') ? _.reject(empties, _.isPlainObject) : empties,
            expecting = _.map(emptyValues, function() { return expected[1]; });

        _.each(emptyValues, function(value) {
          try {
            actual.push(func(value, { 'a': 3 }));
          } catch(e) {}
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
      var array = [];
      array['-1'] = 1;
      strictEqual(_.first(array), undefined);
    });

    test('should work as an iteratee for `_.map`', 1, function() {
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

    test('should work in a lazy chain sequence', 1, function() {
      if (!isNpm) {
        var array = [1, 2, 3, 4];

        var wrapped = _(array).filter(function(value) {
          return value % 2 == 0;
        });

        strictEqual(wrapped.first(), 2);
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

    test('should work as an iteratee for `_.map`', 1, function() {
      var array = [[1, 2, 3], [4, 5, 6], [7, 8, 9]],
          actual = _.map(array, _.take);

      deepEqual(actual, [[1], [4], [7]]);
    });

    test('should return a wrapped value when chaining', 2, function() {
      if (!isNpm) {
        var wrapped = _(array).take(2);
        ok(wrapped instanceof _);
        deepEqual(wrapped.value(), [1, 2]);
      }
      else {
        skipTest(2);
      }
    });

    test('should work in a lazy chain sequence', 4, function() {
      if (!isNpm) {
        var array = [1, 2, 3, 4, 5, 6, 7, 8],
            predicate = function(value) { return value > 1; },
            actual = _(array).take(2).take().value();

        deepEqual(actual, [1]);

        actual = _(array).filter(predicate).take(2).take().value();
        deepEqual(actual, [2]);

        actual = _(array).take(6).takeRight(4).take(2).takeRight().value();
        deepEqual(actual, [4]);

        actual = _(array).filter(predicate).take(6).takeRight(4).take(2).takeRight().value();
        deepEqual(actual, [5]);
      }
      else {
        skipTest(4);
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

    test('should work as an iteratee for `_.map`', 1, function() {
      var array = [[1, 2, 3], [4, 5, 6], [7, 8, 9]],
          actual = _.map(array, _.takeRight);

      deepEqual(actual, [[3], [6], [9]]);
    });

    test('should return a wrapped value when chaining', 2, function() {
      if (!isNpm) {
        var wrapped = _(array).takeRight(2);
        ok(wrapped instanceof _);
        deepEqual(wrapped.value(), [2, 3]);
      }
      else {
        skipTest(2);
      }
    });

    test('should work in a lazy chain sequence', 4, function() {
      if (!isNpm) {
        var array = [1, 2, 3, 4, 5, 6, 7, 8],
            predicate = function(value) { return value < 8; },
            actual = _(array).takeRight(2).takeRight().value();

        deepEqual(actual, [8]);

        actual = _(array).filter(predicate).takeRight(2).takeRight().value();
        deepEqual(actual, [7]);

        actual = _(array).takeRight(6).take(4).takeRight(2).take().value();
        deepEqual(actual, [5]);

        actual = _(array).filter(predicate).takeRight(6).take(4).takeRight(2).take().value();
        deepEqual(actual, [4]);
      }
      else {
        skipTest(4);
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

    test('should provide the correct `predicate` arguments', 1, function() {
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

    test('should work with a "_.pluck" style `predicate`', 1, function() {
      deepEqual(_.takeRightWhile(objects, 'b'), objects.slice(1));
    });

    test('should work with a "_.where" style `predicate`', 1, function() {
      deepEqual(_.takeRightWhile(objects, { 'b': 2 }), objects.slice(2));
    });

    test('should return a wrapped value when chaining', 2, function() {
      if (!isNpm) {
        var wrapped = _(array).takeRightWhile(function(num) {
          return num > 1;
        });

        ok(wrapped instanceof _);
        deepEqual(wrapped.value(), [2, 3]);
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

    test('should provide the correct `predicate` arguments', 1, function() {
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

    test('should work with a "_.pluck" style `predicate`', 1, function() {
      deepEqual(_.takeWhile(objects, 'b'), objects.slice(0, 2));
    });

    test('should work with a "_.where" style `predicate`', 1, function() {
      deepEqual(_.takeWhile(objects, { 'b': 2 }), objects.slice(0, 1));
    });

    test('should return a wrapped value when chaining', 2, function() {
      if (!isNpm) {
        var wrapped = _(array).takeWhile(function(num) {
          return num < 3;
        });

        ok(wrapped instanceof _);
        deepEqual(wrapped.value(), [1, 2]);
      }
      else {
        skipTest(2);
      }
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('flatten methods');

  (function() {
    var args = arguments;

    test('should perform a shallow flatten', 1, function() {
      var array = [[['a']], [['b']]];
      deepEqual(_.flatten(array), [['a'], ['b']]);
    });

    test('should work with `isDeep`', 2, function() {
      var array = [[['a']], [['b']]],
          expected = ['a', 'b'];

      deepEqual(_.flatten(array, true), expected);
      deepEqual(_.flattenDeep(array), expected);
    });

    test('should flatten `arguments` objects', 3, function() {
      var array = [args, [args]],
          expected = [1, 2, 3, args];

      deepEqual(_.flatten(array), expected);

      expected = [1, 2, 3, 1, 2, 3];
      deepEqual(_.flatten(array, true), expected);
      deepEqual(_.flattenDeep(array), expected);
    });

    test('should work as an iteratee for `_.map`', 2, function() {
      var array = [[[['a']]], [[['b']]]];

      deepEqual(_.map(array, _.flatten), [[['a']], [['b']]]);
      deepEqual(_.map(array, _.flattenDeep), [['a'], ['b']]);
    });

    test('should treat sparse arrays as dense', 6, function() {
      var array = [[1, 2, 3], Array(3)],
          expected = [1, 2, 3];

      expected.push(undefined, undefined, undefined);

      _.each([_.flatten(array), _.flatten(array, true), _.flattenDeep(array)], function(actual) {
        deepEqual(actual, expected);
        ok('4' in actual);
      });
    });

    test('should work with extremely large arrays', 3, function() {
      // Test in modern browsers only to avoid browser hangs.
      if (freeze) {
        var expected = Array(5e5);

        _.times(3, function(index) {
          try {
            if (index) {
              var actual = actual == 1 ? _.flatten([expected], true) : _.flattenDeep([expected]);
            } else {
              actual = _.flatten(expected);
            }
            deepEqual(actual, expected);
          } catch(e) {
            ok(false, e.message);
          }
        });
      }
      else {
        skipTest(3);
      }
    });

    test('should work with empty arrays', 3, function() {
      var array = [[], [[]], [[], [[[]]]]],
          expected = [[], [], [[[]]]];

      deepEqual(_.flatten(array), expected);

      expected = [];
      deepEqual(_.flatten(array, true), expected);
      deepEqual(_.flattenDeep(array), expected);
    });

    test('should support flattening of nested arrays', 3, function() {
      var array = [1, [2], [3, [4]]],
          expected = [1, 2, 3, [4]];

      deepEqual(_.flatten(array), expected);

      expected = [1, 2, 3, 4];
      deepEqual(_.flatten(array, true), expected);
      deepEqual(_.flattenDeep(array), expected);
    });

    test('should return an empty array for non array-like objects', 3, function() {
      var expected = [];

      deepEqual(_.flatten({ 'a': 1 }), expected);
      deepEqual(_.flatten({ 'a': 1 }, true), expected);
      deepEqual(_.flattenDeep({ 'a': 1 }), expected);
    });

    test('should return a wrapped value when chaining', 6, function() {
      if (!isNpm) {
        var wrapped = _([1, [2], [3, [4]]]),
            actual = wrapped.flatten(),
            expected = [1, 2, 3, [4]];

        ok(actual instanceof _);
        deepEqual(actual.value(), expected);

        expected = [1, 2, 3, 4];
        actual = wrapped.flatten(true);

        ok(actual instanceof _);
        deepEqual(actual.value(), expected);

        actual = wrapped.flattenDeep();

        ok(actual instanceof _);
        deepEqual(actual.value(), expected);
      }
      else {
        skipTest(6);
      }
    });
  }(1, 2, 3));

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.forEach');

  (function() {
    test('should be aliased', 1, function() {
      strictEqual(_.each, _.forEach);
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.forEachRight');

  (function() {
    test('should be aliased', 1, function() {
      strictEqual(_.eachRight, _.forEachRight);
    });
  }());

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
      'find',
      'findIndex',
      'findKey',
      'findLast',
      'findLastIndex',
      'findLastKey',
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

    var arrayMethods = [
      'findIndex',
      'findLastIndex'
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
      'findKey',
      'findLastKey',
      'forIn',
      'forInRight',
      'forOwn',
      'forOwnRight'
    ];

    var rightMethods = [
      'findLast',
      'findLastIndex',
      'findLastKey',
      'forEachRight',
      'forInRight',
      'forOwnRight'
    ];

    var unwrappedMethods = [
      'every',
      'find',
      'findIndex',
      'findKey',
      'findLast',
      'findLastIndex',
      'findLastKey',
      'max',
      'min',
      'some'
    ];

    _.each(methods, function(methodName) {
      var array = [1, 2, 3],
          func = _[methodName];

      test('`_.' + methodName + '` should provide the correct `iteratee` arguments', 1, function() {
        var args,
            expected = [1, 0, array];

        func(array, function() {
          args || (args = slice.call(arguments));
        });

        if (_.includes(rightMethods, methodName)) {
          expected[0] = 3;
          expected[1] = 2;
        }
        if (_.includes(objectMethods, methodName)) {
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

    _.each(_.difference(methods, objectMethods), function(methodName) {
      var array = [1, 2, 3],
          func = _[methodName],
          isEvery = methodName == 'every';

      array.a = 1;

      test('`_.' + methodName + '` should not iterate custom properties on arrays', 1, function() {
        var keys = [];
        func(array, function(value, key) {
          keys.push(key);
          return isEvery;
        });

        ok(!_.includes(keys, 'a'));
      });
    });

    _.each(_.difference(methods, unwrappedMethods), function(methodName) {
      var array = [1, 2, 3],
          func = _[methodName];

      test('`_.' + methodName + '` should return a wrapped value when chaining', 1, function() {
        if (!isNpm) {
          var wrapped = _(array)[methodName](_.noop);
          ok(wrapped instanceof _);
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
          var wrapped = _(array)[methodName](_.noop);
          ok(!(wrapped instanceof _));
        }
        else {
          skipTest();
        }
      });
    });

    _.each(_.difference(methods, arrayMethods, forInMethods), function(methodName) {
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
          func = _[methodName],
          isEach = !_.includes(objectMethods, methodName),
          isRight = _.includes(rightMethods, methodName);

      test('`_.' + methodName + '` should return the collection', 1, function() {
        strictEqual(func(array, Boolean), array);
      });

      test('`_.' + methodName + '` should not return the existing wrapped value when chaining', 1, function() {
        if (!isNpm) {
          var wrapped = _(array);
          notStrictEqual(wrapped[methodName](_.noop), wrapped);
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
        test('`_.' + methodName + '` should work with a string ' + key + ' for `collection` (test in IE < 9)', 6, function() {
          var args,
              values = [],
              expectedChars = ['a', 'b', 'c'];

          var expectedArgs = isEach
            ? (isRight ? ['c',  2,  collection] : ['a',  0,  collection])
            : (isRight ? ['c', '2', collection] : ['a', '0', collection])

          var actual = func(collection, function(value) {
            args || (args = slice.call(arguments));
            values.push(value);
          });

          var stringObject = args[2];

          ok(_.isString(stringObject));
          ok(_.isObject(stringObject));

          deepEqual([stringObject[0], stringObject[1], stringObject[2]], expectedChars);
          deepEqual(args, expectedArgs);
          deepEqual(values, isRight ? ['c', 'b', 'a'] : expectedChars);

          strictEqual(actual, collection);
        });
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

    _.each(collectionMethods.concat(objectMethods), function(methodName) {
      var func = _[methodName];

      test('`_.' + methodName + '` should compute length before iteration', 2, function() {
        _.each([[0], { 'a': 0 }], function(collection) {
          var count = 0;

          func(collection, function() {
            collection[++count] = count;
            if (count > 1) {
              return false;
            }
          }, 0);

          strictEqual(count, 1);
        });
      });
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('collection iteration bugs');

  _.each(['forEach', 'forEachRight', 'forIn', 'forInRight', 'forOwn', 'forOwnRight'], function(methodName) {
    var func = _[methodName];

    test('`_.' + methodName + '` fixes the JScript `[[DontEnum]]` bug (test in IE < 9)', 1, function() {
      var props = [];
      func(shadowObject, function(value, prop) { props.push(prop); });
      deepEqual(props.sort(), shadowProps);
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

    test('`_.' + methodName + '` should pass thru falsey `object` values', 1, function() {
      var actual = _.map(falsey, function(value, index) {
        return index ? func(value) : func();
      });

      deepEqual(actual, falsey);
    });

    test('`_.' + methodName + '` should assign own source properties', 1, function() {
      function Foo() {
        this.a = 1;
        this.c = 3;
      }
      Foo.prototype.b = 2;

      deepEqual(func({}, new Foo), { 'a': 1, 'c': 3 });
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

      deepEqual(func(object, source), shadowObject);
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

    test('`_.' + methodName + '` should not error on nullish sources (test in IE < 9)', 1, function() {
      try {
        deepEqual(func({ 'a': 1 }, undefined, { 'b': 2 }, null), { 'a': 1, 'b': 2 });
      } catch(e) {
        ok(false, e.message);
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

    test('`_.' + methodName + '` should work as an iteratee for `_.reduce`', 1, function() {
      var array = [{ 'b': 2 }, { 'c': 3 }];
      deepEqual(_.reduce(array, func, { 'a': 1}), { 'a': 1, 'b': 2, 'c': 3 });
    });

    test('`_.' + methodName + '` should not return the existing wrapped value when chaining', 1, function() {
      if (!isNpm) {
        var wrapped = _({ 'a': 1 });
        notStrictEqual(wrapped[methodName]({ 'b': 2 }), wrapped);
      }
      else {
        skipTest();
      }
    });
  });

  _.each(['assign', 'merge'], function(methodName, index) {
    var func = _[methodName],
        isMerge = !!index;

    test('`_.' + methodName + '` should provide the correct `customizer` arguments', 3, function() {
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

    test('`_.' + methodName + '` should not treat the second argument as a `customizer` callback', 2, function() {
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
      deepEqual(values, [_.endsWith(methodName, 'Right') ? 3 : 1]);
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

      var largeArray = _.times(LARGE_ARRAY_SIZE, function(count) {
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
        this.b = 'b';
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

    test('should use `_.identity` when `iteratee` is nullish', 1, function() {
      var array = [4, 6, 6],
          values = [, null, undefined],
          expected = _.map(values, _.constant({ '4': [4], '6':  [6, 6] }));

      var actual = _.map(values, function(value, index) {
        return index ? _.groupBy(array, value) : _.groupBy(array);
      });

      deepEqual(actual, expected);
    });

    test('should provide the correct `iteratee` arguments', 1, function() {
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

    test('should work with a number for `iteratee`', 2, function() {
      var array = [
        [1, 'a'],
        [2, 'a'],
        [2, 'b']
      ];

      deepEqual(_.groupBy(array, 0), { '1': [[1 , 'a']], '2': [[2, 'a'], [2, 'b']] });
      deepEqual(_.groupBy(array, 1), { 'a': [[1 , 'a'], [2, 'a']], 'b': [[2, 'b']] });
    });

    test('should work with a "_.pluck" style `iteratee`', 1, function() {
      var actual = _.groupBy(['one', 'two', 'three'], 'length');
      deepEqual(actual, { '3': ['one', 'two'], '5': ['three'] });
    });

    test('should work in a lazy chain sequence', 1, function() {
      if (!isNpm) {
        var array = [1, 2, 1, 3],
            iteratee = function(value) { value.push(value[0]); return value; },
            predicate = function(value, index) { return index; },
            actual = _(array).groupBy(_.identity).map(iteratee).filter(predicate).take().value();

        deepEqual(actual, [[2, 2]]);
      }
      else {
        skipTest();
      }
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
      var values = falsey.concat(true, 1, 'a'),
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

  QUnit.module('lodash.includes');

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
        strictEqual(_.includes(collection, 3), true);
      });

      test('should work with ' + key + ' and  return `false` for unmatched values', 1, function() {
        strictEqual(_.includes(collection, 5), false);
      });

      test('should work with ' + key + ' and a positive `fromIndex`', 2, function() {
        strictEqual(_.includes(collection, values[2], 2), true);
        strictEqual(_.includes(collection, values[1], 2), false);
      });

      test('should work with ' + key + ' and a `fromIndex` >= `collection.length`', 12, function() {
        _.each([4, 6, Math.pow(2, 32), Infinity], function(fromIndex) {
          strictEqual(_.includes(collection, 1, fromIndex), false);
          strictEqual(_.includes(collection, undefined, fromIndex), false);
          strictEqual(_.includes(collection, '', fromIndex), false);
        });
      });

      test('should work with ' + key + ' and treat falsey `fromIndex` values as `0`', 1, function() {
        var expected = _.map(falsey, _.constant(true));

        var actual = _.map(falsey, function(fromIndex) {
          return _.includes(collection, values[0], fromIndex);
        });

        deepEqual(actual, expected);
      });

      test('should work with ' + key + ' and treat non-number `fromIndex` values as `0`', 1, function() {
        strictEqual(_.includes(collection, values[0], '1'), true);
      });

      test('should work with ' + key + ' and a negative `fromIndex`', 2, function() {
        strictEqual(_.includes(collection, values[2], -2), true);
        strictEqual(_.includes(collection, values[1], -2), false);
      });

      test('should work with ' + key + ' and a negative `fromIndex` <= negative `collection.length`', 3, function() {
        _.each([-4, -6, -Infinity], function(fromIndex) {
          strictEqual(_.includes(collection, values[0], fromIndex), true);
        });
      });

      test('should work with ' + key + ' and return an unwrapped value when chaining', 1, function() {
        if (!isNpm) {
          strictEqual(_(collection).includes(3), true);
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
        strictEqual(_.includes(collection, 'bc'), true);
        strictEqual(_.includes(collection, 'd'), false);
      });
    });

    test('should return `false` for empty collections', 1, function() {
      var expected = _.map(empties, _.constant(false));

      var actual = _.map(empties, function(value) {
        try {
          return _.includes(value);
        } catch(e) {}
      });

      deepEqual(actual, expected);
    });

    test('should not be possible to perform a binary search', 1, function() {
      strictEqual(_.includes([3, 2, 1], 3, true), true);
    });

    test('should match `NaN`', 1, function() {
      strictEqual(_.includes([1, NaN, 3], NaN), true);
    });

    test('should be aliased', 2, function() {
      strictEqual(_.contains, _.includes);
      strictEqual(_.include, _.includes);
    });
  }(1, 2, 3, 4));

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.indexBy');

  (function() {
    test('should use `_.identity` when `iteratee` is nullish', 1, function() {
      var array = [4, 6, 6],
          values = [, null, undefined],
          expected = _.map(values, _.constant({ '4': 4, '6': 6 }));

      var actual = _.map(values, function(value, index) {
        return index ? _.indexBy(array, value) : _.indexBy(array);
      });

      deepEqual(actual, expected);
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

    test('should work with a number for `iteratee`', 2, function() {
      var array = [
        [1, 'a'],
        [2, 'a'],
        [2, 'b']
      ];

      deepEqual(_.indexBy(array, 0), { '1': [1 , 'a'], '2': [2, 'b'] });
      deepEqual(_.indexBy(array, 1), { 'a': [2, 'a'], 'b': [2, 'b'] });
    });

    test('should work in a lazy chain sequence', 1, function() {
      if (!isNpm) {
        var array = [1, 2, 1, 3],
            predicate = function(value) { return value > 1; },
            actual = _(array).indexBy(_.identity).map(String).filter(predicate).take().value();

        deepEqual(actual, ['2']);
      }
      else {
        skipTest();
      }
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.indexOf');

  (function() {
    var array = [1, 2, 3, 1, 2, 3];

    test('should return the index of the first matched value', 1, function() {
      strictEqual(_.indexOf(array, 3), 2);
    });

    test('should work with a positive `fromIndex`', 1, function() {
      strictEqual(_.indexOf(array, 1, 2), 3);
    });

    test('should work with `fromIndex` >= `array.length`', 1, function() {
      var values = [6, 8, Math.pow(2, 32), Infinity],
          expected = _.map(values, _.constant([-1, -1, -1]));

      var actual = _.map(values, function(fromIndex) {
        return [
          _.indexOf(array, undefined, fromIndex),
          _.indexOf(array, 1, fromIndex),
          _.indexOf(array, '', fromIndex)
        ];
      });

      deepEqual(actual, expected);
    });

    test('should treat falsey `fromIndex` values as `0`', 1, function() {
      var expected = _.map(falsey, _.constant(0));

      var actual = _.map(falsey, function(fromIndex) {
        return _.indexOf(array, 1, fromIndex);
      });

      deepEqual(actual, expected);
    });

    test('should perform a binary search when `fromIndex` is a non-number truthy value', 1, function() {
      var sorted = [4, 4, 5, 5, 6, 6],
          values = [true, '1', {}],
          expected = _.map(values, _.constant(2));

      var actual = _.map(values, function(value) {
        return _.indexOf(sorted, 5, value);
      });

      deepEqual(actual, expected);
    });

    test('should work with a negative `fromIndex`', 1, function() {
      strictEqual(_.indexOf(array, 2, -3), 4);
    });

    test('should work with a negative `fromIndex` <= `-array.length`', 1, function() {
      var values = [-6, -8, -Infinity],
          expected = _.map(values, _.constant(0));

      var actual = _.map(values, function(fromIndex) {
        return _.indexOf(array, 1, fromIndex);
      });

      deepEqual(actual, expected);
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

    var largeArray = _.times(LARGE_ARRAY_SIZE, function() {
      return new Foo;
    });

    test('`_.includes` should work with a custom `_.indexOf` method', 2, function() {
      if (!isModularize) {
        _.indexOf = custom;
        ok(_.includes(array, new Foo));
        ok(_.includes({ 'a': 1, 'b': new Foo, 'c': 3 }, new Foo));
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

    test('`_.uniq` should work with a custom `_.indexOf` method', 6, function() {
      if (!isModularize) {
        _.indexOf = custom;

        _.each([false, true, _.identity], function(param) {
          deepEqual(_.uniq(array, param), array.slice(0, 3));
          deepEqual(_.uniq(largeArray, param), [largeArray[0]]);
        });

        _.indexOf = indexOf;
      }
      else {
        skipTest(6);
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
        } catch(e) {}
      });

      deepEqual(actual, expected);
    });

    test('should exclude last element', 1, function() {
      deepEqual(_.initial(array), [1, 2]);
    });

    test('should return an empty when querying empty arrays', 1, function() {
      deepEqual(_.initial([]), []);
    });

    test('should work as an iteratee for `_.map`', 1, function() {
      var array = [[1, 2, 3], [4, 5, 6], [7, 8, 9]],
          actual = _.map(array, _.initial);

      deepEqual(actual, [[1, 2], [4, 5], [7, 8]]);
    });

    test('should return a wrapped value when chaining', 2, function() {
      if (!isNpm) {
        var wrapped = _(array).initial();
        ok(wrapped instanceof _);
        deepEqual(wrapped.value(), [1, 2]);
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

    test('should match `NaN`', 1, function() {
      deepEqual(_.intersection([1, NaN, 3], [NaN, 5, NaN]), [NaN]);
    });

    test('should work with large arrays of objects', 1, function() {
      var object = {},
          largeArray = _.times(LARGE_ARRAY_SIZE, _.constant(object));

      deepEqual(_.intersection([object], largeArray), [object]);
    });

    test('should work with large arrays of objects', 2, function() {
      var object = {},
          largeArray = _.times(LARGE_ARRAY_SIZE, _.constant(object));

      deepEqual(_.intersection([object], largeArray), [object]);
      deepEqual(_.intersection(_.range(LARGE_ARRAY_SIZE), null, [1]), [1]);
    });

    test('should work with large arrays of `NaN`', 1, function() {
      var largeArray = _.times(LARGE_ARRAY_SIZE, _.constant(NaN));
      deepEqual(_.intersection([1, NaN, 3], largeArray), [NaN]);
    });

    test('should ignore values that are not arrays or `arguments` objects', 3, function() {
      var array = [0, 1, null, 3];
      deepEqual(_.intersection(array, 3, null, { '0': 1 }), array);
      deepEqual(_.intersection(null, array, null, [2, 1]), [1]);
      deepEqual(_.intersection(null, array, null, args), [1, 3]);
    });

    test('should return a wrapped value when chaining', 2, function() {
      if (!isNpm) {
        var wrapped = _([1, 3, 2]).intersection([5, 2, 1, 4]);
        ok(wrapped instanceof _);
        deepEqual(wrapped.value(), [1, 2]);
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

    test('should work as an iteratee for `_.map`', 1, function() {
      var inverted = { '1': 'c', '2': 'b' },
          object = { 'a': 1, 'b': 2, 'c': 1 },
          actual = _.map([object, object, object], _.invert);

      deepEqual(actual, [inverted, inverted, inverted]);
    });

    test('should return a wrapped value when chaining', 2, function() {
      if (!isNpm) {
        var object = { 'a': 1, 'b': 2 },
            wrapped = _(object).invert();

        ok(wrapped instanceof _);
        deepEqual(wrapped.value(), { '1': 'a', '2': 'b' });
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
      deepEqual(_.invoke(array, 'toUpperCase'), ['A', 'B', 'C']);
    });

    test('should support invoking with arguments', 1, function() {
      var array = [function() { return slice.call(arguments); }],
          actual = _.invoke(array, 'call', null, 'a', 'b', 'c');

      deepEqual(actual, [['a', 'b', 'c']]);
    });

    test('should work with a function `methodName` argument', 1, function() {
      var array = ['a', 'b', 'c'];

      var actual = _.invoke(array, function(left, right) {
        return left + this.toUpperCase() + right;
      }, '(', ')');

      deepEqual(actual, ['(A)', '(B)', '(C)']);
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

    test('should return `false` for non `arguments` objects', 12, function() {
      var expected = _.map(falsey, _.constant(false));

      var actual = _.map(falsey, function(value, index) {
        return index ? _.isArguments(value) : _.isArguments();
      });

      deepEqual(actual, expected);

      strictEqual(_.isArguments([1, 2, 3]), false);
      strictEqual(_.isArguments(true), false);
      strictEqual(_.isArguments(new Date), false);
      strictEqual(_.isArguments(new Error), false);
      strictEqual(_.isArguments(_), false);
      strictEqual(_.isArguments(slice), false);
      strictEqual(_.isArguments({ '0': 1, 'callee': _.noop, 'length': 1 }), false);
      strictEqual(_.isArguments(1), false);
      strictEqual(_.isArguments(NaN), false);
      strictEqual(_.isArguments(/x/), false);
      strictEqual(_.isArguments('a'), false);
    });

    test('should work with an `arguments` object from another realm', 1, function() {
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

    test('should return `false` for non arrays', 12, function() {
      var expected = _.map(falsey, _.constant(false));

      var actual = _.map(falsey, function(value, index) {
        return index ? _.isArray(value) : _.isArray();
      });

      deepEqual(actual, expected);

      strictEqual(_.isArray(args), false);
      strictEqual(_.isArray(true), false);
      strictEqual(_.isArray(new Date), false);
      strictEqual(_.isArray(new Error), false);
      strictEqual(_.isArray(_), false);
      strictEqual(_.isArray(slice), false);
      strictEqual(_.isArray({ '0': 1, 'length': 1 }), false);
      strictEqual(_.isArray(1), false);
      strictEqual(_.isArray(NaN), false);
      strictEqual(_.isArray(/x/), false);
      strictEqual(_.isArray('a'), false);
    });

    test('should work with an array from another realm', 1, function() {
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

    test('should return `false` for non booleans', 12, function() {
      var expected = _.map(falsey, function(value) { return value === false; });

      var actual = _.map(falsey, function(value, index) {
        return index ? _.isBoolean(value) : _.isBoolean();
      });

      deepEqual(actual, expected);

      strictEqual(_.isBoolean(args), false);
      strictEqual(_.isBoolean([1, 2, 3]), false);
      strictEqual(_.isBoolean(new Date), false);
      strictEqual(_.isBoolean(new Error), false);
      strictEqual(_.isBoolean(_), false);
      strictEqual(_.isBoolean(slice), false);
      strictEqual(_.isBoolean({ 'a': 1 }), false);
      strictEqual(_.isBoolean(1), false);
      strictEqual(_.isBoolean(NaN), false);
      strictEqual(_.isBoolean(/x/), false);
      strictEqual(_.isBoolean('a'), false);
    });

    test('should work with a boolean from another realm', 1, function() {
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

    test('should return `false` for non dates', 12, function() {
      var expected = _.map(falsey, _.constant(false));

      var actual = _.map(falsey, function(value, index) {
        return index ? _.isDate(value) : _.isDate();
      });

      deepEqual(actual, expected);

      strictEqual(_.isDate(args), false);
      strictEqual(_.isDate([1, 2, 3]), false);
      strictEqual(_.isDate(true), false);
      strictEqual(_.isDate(new Error), false);
      strictEqual(_.isDate(_), false);
      strictEqual(_.isDate(slice), false);
      strictEqual(_.isDate({ 'a': 1 }), false);
      strictEqual(_.isDate(1), false);
      strictEqual(_.isDate(NaN), false);
      strictEqual(_.isDate(/x/), false);
      strictEqual(_.isDate('a'), false);
    });

    test('should work with a date object from another realm', 1, function() {
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
      var expected = !_.support.dom;

      strictEqual(_.isElement(new Element), expected);

      if (lodashBizarro) {
        expected = !lodashBizarro.support.dom;
        strictEqual(lodashBizarro.isElement(new Element), expected);
      }
      else {
        skipTest();
      }
    });

    test('should return `false` for non DOM elements', 13, function() {
      var expected = _.map(falsey, _.constant(false));

      var actual = _.map(falsey, function(value, index) {
        return index ? _.isElement(value) : _.isElement();
      });

      deepEqual(actual, expected);

      strictEqual(_.isElement(args), false);
      strictEqual(_.isElement([1, 2, 3]), false);
      strictEqual(_.isElement(true), false);
      strictEqual(_.isElement(new Date), false);
      strictEqual(_.isElement(new Error), false);
      strictEqual(_.isElement(_), false);
      strictEqual(_.isElement(slice), false);
      strictEqual(_.isElement({ 'a': 1 }), false);
      strictEqual(_.isElement(1), false);
      strictEqual(_.isElement(NaN), false);
      strictEqual(_.isElement(/x/), false);
      strictEqual(_.isElement('a'), false);
    });

    test('should work with a DOM element from another realm', 1, function() {
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

    test('should return `true` for empty values', 7, function() {
      var expected = _.map(empties, _.constant(true));

      var actual = _.map(empties, function(value) {
        return _.isEmpty(value);
      });

      deepEqual(actual, expected);

      strictEqual(_.isEmpty(true), true);
      strictEqual(_.isEmpty(slice), true);
      strictEqual(_.isEmpty(1), true);
      strictEqual(_.isEmpty(NaN), true);
      strictEqual(_.isEmpty(/x/), true);
      strictEqual(_.isEmpty(), true);
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
      Foo.prototype = { 'length': 0, 'splice': arrayProto.splice };

      strictEqual(_.isEmpty(new Foo([])), true);
    });

    test('should not treat objects with negative lengths as array-like', 1, function() {
      function Foo() {}
      Foo.prototype.length = -1;

      strictEqual(_.isEmpty(new Foo), true);
    });

    test('should not treat objects with lengths larger than `MAX_SAFE_INTEGER` as array-like', 1, function() {
      function Foo() {}
      Foo.prototype.length = MAX_SAFE_INTEGER + 1;

      strictEqual(_.isEmpty(new Foo), true);
    });

    test('should not treat objects with non-number lengths as array-like', 1, function() {
      strictEqual(_.isEmpty({ 'length': '0' }), false);
    });

    test('fixes the JScript `[[DontEnum]]` bug (test in IE < 9)', 1, function() {
      strictEqual(_.isEmpty(shadowObject), false);
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

      array1.push('b');
      array2.push('b');

      strictEqual(_.isEqual(array1, array2), true);

      array1.push('c');
      array2.push('d');

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
        'foo': { 'b': { 'c': { 'd': {} } } },
        'bar': { 'a': 2 }
      };

      var object2 = {
        'foo': { 'b': { 'c': { 'd': {} } } },
        'bar': { 'a': 2 }
      };

      object1.foo.b.c.d = object1;
      object1.bar.b = object1.foo.b;

      object2.foo.b.c.d = object2;
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
      var pairs = _.map([
        'Error',
        'EvalError',
        'RangeError',
        'ReferenceError',
        'SyntaxError',
        'TypeError',
        'URIError'
      ], function(type, index, errorTypes) {
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
      strictEqual(_.isEqual(shadowObject, {}), false);
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

    test('should provide the correct `customizer` arguments', 1, function() {
      var argsList = [],
          object1 = { 'a': [1, 2], 'b': null },
          object2 = { 'a': [1, 2], 'b': null };

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

    test('should handle comparisons if `customizer` returns `undefined`', 1, function() {
      strictEqual(_.isEqual('a', 'a', _.noop), true);
    });

    test('should return a boolean value even if `customizer` does not', 2, function() {
      var actual = _.isEqual('a', 'a', _.constant('a'));
      strictEqual(actual, true);

      var expected = _.map(falsey, _.constant(false));

      actual = [];
      _.each(falsey, function(value) {
        actual.push(_.isEqual('a', 'b', _.constant(value)));
      });

      deepEqual(actual, expected);
    });

    test('should ensure `customizer` is a function', 1, function() {
      var array = [1, 2, 3],
          eq = _.partial(_.isEqual, array),
          actual = _.map([array, [1, 0, 3]], eq);

      deepEqual(actual, [true, false]);
    });

    test('should work as an iteratee for `_.every`', 1, function() {
      var actual = _.every([1, 1, 1], _.partial(_.isEqual, 1));
      ok(actual);
    });

    test('should treat objects created by `Object.create(null)` like any other plain object', 2, function() {
      function Foo() { this.a = 1; }
      Foo.prototype.constructor = null;

      var object2 = { 'a': 1 };
      strictEqual(_.isEqual(new Foo, object2), false);

      if (create)  {
        var object1 = create(null);
        object1.a = 1;
        strictEqual(_.isEqual(object1, object2), true);
      }
      else {
        skipTest();
      }
    });

    test('should return `true` for like-objects from different documents', 4, function() {
      // Ensure `_._object` is assigned (unassigned in Opera 10.00).
      if (_._object) {
        strictEqual(_.isEqual({ 'a': 1, 'b': 2, 'c': 3 }, _._object), true);
        strictEqual(_.isEqual({ 'a': 1, 'b': 2, 'c': 2 }, _._object), false);
        strictEqual(_.isEqual([1, 2, 3], _._array), true);
        strictEqual(_.isEqual([1, 2, 2], _._array), false);
      }
      else {
        skipTest(4);
      }
    });

    test('should not error on DOM elements', 1, function() {
      if (document) {
        var element1 = document.createElement('div'),
            element2 = element1.cloneNode(true);

        try {
          strictEqual(_.isEqual(element1, element2), false);
        } catch(e) {
          ok(false, e.message);
        }
      }
      else {
        skipTest();
      }
    });

    test('should perform comparisons between wrapped values', 32, function() {
      var stamp = +new Date;

      var values = [
        [[1, 2], [1, 2], [1, 2, 3]],
        [true, true, false],
        [new Date(stamp), new Date(stamp), new Date(stamp - 100)],
        [{ 'a': 1, 'b': 2 }, { 'a': 1, 'b': 2 }, { 'a': 1, 'b': 1 }],
        [1, 1, 2],
        [NaN, NaN, Infinity],
        [/x/, /x/, /x/i],
        ['a', 'a', 'A']
      ];

      _.each(values, function(vals) {
        if (!isNpm) {
          var wrapped1 = _(vals[0]),
              wrapped2 = _(vals[1]),
              actual = wrapped1.isEqual(wrapped2);

          strictEqual(actual, true);
          strictEqual(_.isEqual(_(actual), _(true)), true);

          wrapped1 = _(vals[0]);
          wrapped2 = _(vals[2]);

          actual = wrapped1.isEqual(wrapped2);
          strictEqual(actual, false);
          strictEqual(_.isEqual(_(actual), _(false)), true);
        }
        else {
          skipTest(4);
        }
      });
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
      var expected = _.map(errors, _.constant(true));

      var actual = _.map(errors, function(error) {
        return _.isError(error) === true;
      });

      deepEqual(actual, expected);
    });

    test('should return `false` for non-error objects', 12, function() {
      var expected = _.map(falsey, _.constant(false));

      var actual = _.map(falsey, function(value, index) {
        return index ? _.isError(value) : _.isError();
      });

      deepEqual(actual, expected);

      strictEqual(_.isError(args), false);
      strictEqual(_.isError([1, 2, 3]), false);
      strictEqual(_.isError(true), false);
      strictEqual(_.isError(new Date), false);
      strictEqual(_.isError(_), false);
      strictEqual(_.isError(slice), false);
      strictEqual(_.isError({ 'a': 1 }), false);
      strictEqual(_.isError(1), false);
      strictEqual(_.isError(NaN), false);
      strictEqual(_.isError(/x/), false);
      strictEqual(_.isError('a'), false);
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
    var args = arguments;

    test('should return `true` for finite values', 1, function() {
      var values = [0, 1, 3.14, -1],
          expected = _.map(values, _.constant(true));

      var actual = _.map(values, function(value) {
        return _.isFinite(value);
      });

      deepEqual(actual, expected);
    });

    test('should return `false` for non-finite values', 9, function() {
      var values = [NaN, Infinity, -Infinity, Object(1)],
          expected = _.map(values, _.constant(false));

      var actual = _.map(values, function(value) {
        return _.isFinite(value);
      });

      deepEqual(actual, expected);

      strictEqual(_.isFinite(args), false);
      strictEqual(_.isFinite([1, 2, 3]), false);
      strictEqual(_.isFinite(true), false);
      strictEqual(_.isFinite(new Date), false);
      strictEqual(_.isFinite(new Error), false);
      strictEqual(_.isFinite({ 'a': 1 }), false);
      strictEqual(_.isFinite(/x/), false);
      strictEqual(_.isFinite('a'), false);
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
  }(1, 2, 3));

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.isFunction');

  (function() {
    var args = arguments,
        funcClass = '[object Function]';

    test('should return `true` for functions', 2, function() {
      strictEqual(_.isFunction(_), true);
      strictEqual(_.isFunction(slice), true);
    });

    test('should return `true` for typed array constructors', 1, function() {
      var expected = _.map(typedArrays, function(type) {
        return toString.call(root[type]) == funcClass;
      });

      var actual = _.map(typedArrays, function(type) {
        var Ctor = root[type];
        return Ctor ? _.isFunction(Ctor) : false;
      });

      deepEqual(actual, expected);
    });

    test('should return `false` for non functions', 11, function() {
      var expected = _.map(falsey, _.constant(false));

      var actual = _.map(falsey, function(value, index) {
        return index ? _.isFunction(value) : _.isFunction();
      });

      deepEqual(actual, expected);

      strictEqual(_.isFunction(args), false);
      strictEqual(_.isFunction([1, 2, 3]), false);
      strictEqual(_.isFunction(true), false);
      strictEqual(_.isFunction(new Date), false);
      strictEqual(_.isFunction(new Error), false);
      strictEqual(_.isFunction({ 'a': 1 }), false);
      strictEqual(_.isFunction(1), false);
      strictEqual(_.isFunction(NaN), false);
      strictEqual(_.isFunction(/x/), false);
      strictEqual(_.isFunction('a'), false);
    });

    test('should work using its fallback', 3, function() {
      if (!isModularize) {
        // Simulate native `Uint8Array` constructor with a `[[Class]]`
        // of 'Function' and a `typeof` result of 'object'.
        var lodash = _.runInContext({
          'Function': {
            'prototype': {
              'toString': function() {
                return _.has(this, 'toString') ? this.toString() : fnToString.call(this);
              }
            }
          },
          'Object': _.assign(function(value) {
            return Object(value);
          }, {
            'prototype': {
              'toString': _.assign(function() {
                return _.has(this, '[[Class]]') ? this['[[Class]]'] : toString.call(this);
              }, {
                'toString': function() {
                  return String(toString);
                }
              })
            }
          }),
          'Uint8Array': {
            '[[Class]]': funcClass,
            'toString': function() {
              return String(Uint8Array || Array);
            }
          }
        });

        strictEqual(lodash.isFunction(slice), true);
        strictEqual(lodash.isFunction(/x/), false);
        strictEqual(lodash.isFunction(Uint8Array), toString.call(Uint8Array) == funcClass);
      }
      else {
        skipTest(3);
      }
    });

    test('should work with host objects in IE 8 document mode (test in IE 11)', 2, function() {
      // Trigger a Chakra JIT bug.
      // See https://github.com/jashkenas/underscore/issues/1621.
      _.each([body, xml], function(object) {
        if (object) {
          _.times(100, _.isFunction);
          strictEqual(_.isFunction(object), false);
        }
        else {
          skipTest();
        }
      });
    });

    test('should work with a function from another realm', 1, function() {
      if (_._object) {
        strictEqual(_.isFunction(_._function), true);
      }
      else {
        skipTest();
      }
    });
  }(1, 2, 3));

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.isMatch');

  (function() {
    test('should perform a deep comparison between `object` and `source`', 5, function() {
      var object = { 'a': 1, 'b': 2, 'c': 3 };
      strictEqual(_.isMatch(object, { 'a': 1 }), true);
      strictEqual(_.isMatch(object, { 'b': 1 }), false);
      strictEqual(_.isMatch(object, { 'a': 1, 'c': 3 }), true);
      strictEqual(_.isMatch(object, { 'c': 3, 'd': 4 }), false);

      object = { 'a': { 'b': { 'c': 1, 'd': 2 }, 'e': 3 }, 'f': 4 };
      strictEqual(_.isMatch(object, { 'a': { 'b': { 'c': 1 } } }), true);
    });

    test('should compare a variety of `source` values', 2, function() {
      var object1 = { 'a': false, 'b': true, 'c': '3', 'd': 4, 'e': [5], 'f': { 'g': 6 } },
          object2 = { 'a': 0, 'b': 1, 'c': 3, 'd': '4', 'e': ['5'], 'f': { 'g': '6' } };

      strictEqual(_.isMatch(object1, object1), true);
      strictEqual(_.isMatch(object1, object2), false);
    });

    test('should return `true` when comparing an empty `source`', 1, function() {
      var object = { 'a': 1 },
          expected = _.map(empties, _.constant(true));

      var actual = _.map(empties, function(value) {
        return _.isMatch(object, value);
      });

      deepEqual(actual, expected);
    });

    test('should return `true` when comparing a `source` of empty arrays and objects', 1, function() {
      var objects = [{ 'a': [1], 'b': { 'c': 1 } }, { 'a': [2, 3], 'b': { 'd': 2 } }],
          source = { 'a': [], 'b': {} };

      var actual = _.filter(objects, function(object) {
        return _.isMatch(object, source);
      });

      deepEqual(actual, objects);
    });

    test('should not error for falsey `object` values', 1, function() {
      var values = falsey.slice(1),
          expected = _.map(values, _.constant(false)),
          source = { 'a': 1 };

      var actual = _.map(values, function(value) {
        try {
          return _.isMatch(value, source);
        } catch(e) {}
      });

      deepEqual(actual, expected);
    });

    test('should return `true` when comparing an empty `source` to a falsey `object`', 1, function() {
      var values = falsey.slice(1),
          expected = _.map(values, _.constant(true)),
          source = {};

      var actual = _.map(values, function(value) {
        try {
          return _.isMatch(value, source);
        } catch(e) {}
      });

      deepEqual(actual, expected);
    });

    test('should search arrays of `source` for values', 3, function() {
      var objects = [{ 'a': ['b'] }, { 'a': ['c', 'd'] }],
          source = { 'a': ['d'] },
          predicate = function(object) { return _.isMatch(object, source); },
          actual = _.filter(objects, predicate);

      deepEqual(actual, [objects[1]]);

      source = { 'a': ['b', 'd'] };
      actual = _.filter(objects, predicate);

      deepEqual(actual, []);

      source = { 'a': ['d', 'b'] };
      actual = _.filter(objects, predicate);
      deepEqual(actual, []);
    });

    test('should perform a partial comparison of all objects within arrays of `source`', 1, function() {
      var source = { 'a': [{ 'b': 1 }, { 'b': 4, 'c': 5 }] };

      var objects = [
        { 'a': [{ 'b': 1, 'c': 2 }, { 'b': 4, 'c': 5, 'd': 6 }] },
        { 'a': [{ 'b': 1, 'c': 2 }, { 'b': 4, 'c': 6, 'd': 7 }] }
      ];

      var actual = _.filter(objects, function(object) {
        return _.isMatch(object, source);
      });

      deepEqual(actual, [objects[0]]);
    });

    test('should handle a `source` with `undefined` values', 2, function() {
      var objects = [{ 'a': 1 }, { 'a': 1, 'b': 1 }, { 'a': 1, 'b': undefined }],
          source = { 'b': undefined },
          predicate = function(object) { return _.isMatch(object, source); },
          actual = _.map(objects, predicate),
          expected = [false, false, true];

      deepEqual(actual, expected);

      source = { 'a': { 'c': undefined } };
      objects = [{ 'a': { 'b': 1 } }, { 'a':{ 'b':1 , 'c': 1 } }, { 'a': { 'b': 1, 'c': undefined } }];
      actual = _.map(objects, predicate);

      deepEqual(actual, expected);
    });

    test('should not match by inherited `source` properties', 1, function() {
      function Foo() { this.a = 1; }
      Foo.prototype.b = 2;

      var objects = [{ 'a': 1 }, { 'a': 1, 'b': 2 }],
          source = new Foo,
          expected = _.map(objects, _.constant(true));

      var actual = _.map(objects, function(object) {
        return _.isMatch(object, source);
      });

      deepEqual(actual, expected);
    });

    test('should work with a function for `source`', 1, function() {
      function source() {}

      source.a = 1;
      source.b = function() {};
      source.c = 3;

      var objects = [{ 'a': 1 }, { 'a': 1, 'b': source.b, 'c': 3 }];

      var actual = _.map(objects, function(object) {
        return _.isMatch(object, source);
      });

      deepEqual(actual, [false, true]);
    });

    test('should match problem JScript properties (test in IE < 9)', 1, function() {
      var objects = [{}, shadowObject];

      var actual = _.map(objects, function(object) {
        return _.isMatch(object, shadowObject);
      });

      deepEqual(actual, [false, true]);
    });

    test('should provide the correct `customizer` arguments', 1, function() {
      var argsList = [],
          object1 = { 'a': [1, 2], 'b': null },
          object2 = { 'a': [1, 2], 'b': null };

      object1.b = object2;
      object2.b = object1;

      var expected = [
        [object1.a, object2.a, 'a'],
        [object1.a[0], object2.a[0], 0],
        [object1.a[1], object2.a[1], 1],
        [object1.b, object2.b, 'b'],
        [object1.b.a, object2.b.a, 'a'],
        [object1.b.a[0], object2.b.a[0], 0],
        [object1.b.a[1], object2.b.a[1], 1],
        [object1.b.b, object2.b.b, 'b'],
        [object1.b.b.a, object2.b.b.a, 'a'],
        [object1.b.b.a[0], object2.b.b.a[0], 0],
        [object1.b.b.a[1], object2.b.b.a[1], 1],
        [object1.b.b.b, object2.b.b.b, 'b']
      ];

      _.isMatch(object1, object2, function() {
        argsList.push(slice.call(arguments));
      });

      deepEqual(argsList, expected);
    });

    test('should correctly set the `this` binding', 1, function() {
      var actual = _.isMatch({ 'a': 1 }, { 'a': 2 }, function(a, b) {
        return this[a] == this[b];
      }, { 'a': 1, 'b': 1 });

      strictEqual(actual, true);
    });

    test('should handle comparisons if `customizer` returns `undefined`', 1, function() {
      strictEqual(_.isMatch({ 'a': 1 }, { 'a': 1 }, _.noop), true);
    });

    test('should return a boolean value even if `customizer` does not', 2, function() {
      var object = { 'a': 1 },
          actual = _.isMatch(object, { 'a': 1 }, _.constant('a'));

      strictEqual(actual, true);

      var expected = _.map(falsey, _.constant(false));

      actual = [];
      _.each(falsey, function(value) {
        actual.push(_.isMatch(object, { 'a': 2 }, _.constant(value)));
      });

      deepEqual(actual, expected);
    });

    test('should ensure `customizer` is a function', 1, function() {
      var object = { 'a': 1 },
          matches = _.partial(_.isMatch, object),
          actual = _.map([object, { 'a': 2 }], matches);

      deepEqual(actual, [true, false]);
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.isNaN');

  (function() {
    var args = arguments;

    test('should return `true` for NaNs', 2, function() {
      strictEqual(_.isNaN(NaN), true);
      strictEqual(_.isNaN(Object(NaN)), true);
    });

    test('should return `false` for non NaNs', 12, function() {
      var expected = _.map(falsey, function(value) { return value !== value; });

      var actual = _.map(falsey, function(value, index) {
        return index ? _.isNaN(value) : _.isNaN();
      });

      deepEqual(actual, expected);

      strictEqual(_.isNaN(args), false);
      strictEqual(_.isNaN([1, 2, 3]), false);
      strictEqual(_.isNaN(true), false);
      strictEqual(_.isNaN(new Date), false);
      strictEqual(_.isNaN(new Error), false);
      strictEqual(_.isNaN(_), false);
      strictEqual(_.isNaN(slice), false);
      strictEqual(_.isNaN({ 'a': 1 }), false);
      strictEqual(_.isNaN(1), false);
      strictEqual(_.isNaN(/x/), false);
      strictEqual(_.isNaN('a'), false);
    });

    test('should work with `NaN` from another realm', 1, function() {
      if (_._object) {
        strictEqual(_.isNaN(_._nan), true);
      }
      else {
        skipTest();
      }
    });
  }(1, 2, 3));

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.isNative');

  (function() {
    var args = arguments;

    test('should return `true` for native methods', 6, function() {
      _.each([Array, create, root.encodeURI, slice, Uint8Array], function(func) {
        if (func) {
          strictEqual(_.isNative(func), true);
        }
        else {
          skipTest();
        }
      });

      if (body) {
        strictEqual(_.isNative(body.cloneNode), true);
      }
      else {
        skipTest();
      }
    });

    test('should return `false` for non native methods', 12, function() {
      var expected = _.map(falsey, _.constant(false));

      var actual = _.map(falsey, function(value, index) {
        return index ? _.isNative(value) : _.isNative();
      });

      deepEqual(actual, expected);

      strictEqual(_.isNative(args), false);
      strictEqual(_.isNative([1, 2, 3]), false);
      strictEqual(_.isNative(true), false);
      strictEqual(_.isNative(new Date), false);
      strictEqual(_.isNative(new Error), false);
      strictEqual(_.isNative(_), false);
      strictEqual(_.isNative({ 'a': 1 }), false);
      strictEqual(_.isNative(1), false);
      strictEqual(_.isNative(NaN), false);
      strictEqual(_.isNative(/x/), false);
      strictEqual(_.isNative('a'), false);
    });

    test('should work with native functions from another realm', 2, function() {
      if (_._element) {
        strictEqual(_.isNative(_._element.cloneNode), true);
      }
      else {
        skipTest();
      }
      if (_._object) {
        strictEqual(_.isNative(_._object.valueOf), true);
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

    test('should return `false` for non nulls', 13, function() {
      var expected = _.map(falsey, function(value) { return value === null; });

      var actual = _.map(falsey, function(value, index) {
        return index ? _.isNull(value) : _.isNull();
      });

      deepEqual(actual, expected);

      strictEqual(_.isNull(args), false);
      strictEqual(_.isNull([1, 2, 3]), false);
      strictEqual(_.isNull(true), false);
      strictEqual(_.isNull(new Date), false);
      strictEqual(_.isNull(new Error), false);
      strictEqual(_.isNull(_), false);
      strictEqual(_.isNull(slice), false);
      strictEqual(_.isNull({ 'a': 1 }), false);
      strictEqual(_.isNull(1), false);
      strictEqual(_.isNull(NaN), false);
      strictEqual(_.isNull(/x/), false);
      strictEqual(_.isNull('a'), false);
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

    test('should return `true` for numbers', 3, function() {
      strictEqual(_.isNumber(0), true);
      strictEqual(_.isNumber(Object(0)), true);
      strictEqual(_.isNumber(NaN), true);
    });

    test('should return `false` for non numbers', 11, function() {
      var expected = _.map(falsey, function(value) { return typeof value == 'number'; });

      var actual = _.map(falsey, function(value, index) {
        return index ? _.isNumber(value) : _.isNumber();
      });

      deepEqual(actual, expected);

      strictEqual(_.isNumber(args), false);
      strictEqual(_.isNumber([1, 2, 3]), false);
      strictEqual(_.isNumber(true), false);
      strictEqual(_.isNumber(new Date), false);
      strictEqual(_.isNumber(new Error), false);
      strictEqual(_.isNumber(_), false);
      strictEqual(_.isNumber(slice), false);
      strictEqual(_.isNumber({ 'a': 1 }), false);
      strictEqual(_.isNumber(/x/), false);
      strictEqual(_.isNumber('a'), false);
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

    test('should return `true` for objects', 12, function() {
      strictEqual(_.isObject(args), true);
      strictEqual(_.isObject([1, 2, 3]), true);
      strictEqual(_.isObject(Object(false)), true);
      strictEqual(_.isObject(new Date), true);
      strictEqual(_.isObject(new Error), true);
      strictEqual(_.isObject(_), true);
      strictEqual(_.isObject(slice), true);
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
      var values = falsey.concat(true, 1, 'a'),
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
      // Trigger a V8 JIT bug.
      // See http://code.google.com/p/v8/issues/detail?id=2291.
      var object = {};

      // 1: Useless comparison statement, this is half the trigger.
      object == object;

      // 2: Initial check with object, this is the other half of the trigger.
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

      deepEqual(actual, expected);

      strictEqual(_.isPlainObject(true), false);
      strictEqual(_.isPlainObject('a'), false);
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

    test('should return `false` for non regexes', 12, function() {
      var expected = _.map(falsey, _.constant(false));

      var actual = _.map(falsey, function(value, index) {
        return index ? _.isRegExp(value) : _.isRegExp();
      });

      deepEqual(actual, expected);

      strictEqual(_.isRegExp(args), false);
      strictEqual(_.isRegExp([1, 2, 3]), false);
      strictEqual(_.isRegExp(true), false);
      strictEqual(_.isRegExp(new Date), false);
      strictEqual(_.isRegExp(new Error), false);
      strictEqual(_.isRegExp(_), false);
      strictEqual(_.isRegExp(slice), false);
      strictEqual(_.isRegExp({ 'a': 1 }), false);
      strictEqual(_.isRegExp(1), false);
      strictEqual(_.isRegExp(NaN), false);
      strictEqual(_.isRegExp('a'), false);
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

    test('should return `false` for non strings', 12, function() {
      var expected = _.map(falsey, function(value) { return value === ''; });

      var actual = _.map(falsey, function(value, index) {
        return index ? _.isString(value) : _.isString();
      });

      deepEqual(actual, expected);

      strictEqual(_.isString(args), false);
      strictEqual(_.isString([1, 2, 3]), false);
      strictEqual(_.isString(true), false);
      strictEqual(_.isString(new Date), false);
      strictEqual(_.isString(new Error), false);
      strictEqual(_.isString(_), false);
      strictEqual(_.isString(slice), false);
      strictEqual(_.isString({ '0': 1, 'length': 1 }), false);
      strictEqual(_.isString(1), false);
      strictEqual(_.isString(NaN), false);
      strictEqual(_.isString(/x/), false);
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

    test('should return `false` for non `undefined` values', 13, function() {
      var expected = _.map(falsey, function(value) { return value === undefined; });

      var actual = _.map(falsey, function(value, index) {
        return index ? _.isUndefined(value) : _.isUndefined();
      });

      deepEqual(actual, expected);

      strictEqual(_.isUndefined(args), false);
      strictEqual(_.isUndefined([1, 2, 3]), false);
      strictEqual(_.isUndefined(true), false);
      strictEqual(_.isUndefined(new Date), false);
      strictEqual(_.isUndefined(new Error), false);
      strictEqual(_.isUndefined(_), false);
      strictEqual(_.isUndefined(slice), false);
      strictEqual(_.isUndefined({ 'a': 1 }), false);
      strictEqual(_.isUndefined(1), false);
      strictEqual(_.isUndefined(NaN), false);
      strictEqual(_.isUndefined(/x/), false);
      strictEqual(_.isUndefined('a'), false);
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

    test('should not error on host objects (test in IE)', 15, function() {
      if (xml) {
        var funcs = [
          'isArguments', 'isArray', 'isBoolean', 'isDate', 'isElement',
          'isError', 'isFinite', 'isFunction', 'isNaN', 'isNull', 'isNumber',
          'isObject', 'isRegExp', 'isString', 'isUndefined'
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
        skipTest(15);
      }
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('keys methods');

  _.each(['keys', 'keysIn'], function(methodName, index) {
    var args = arguments,
        func = _[methodName],
        isKeys = !index;

    test('`_.' + methodName + '` should return the keys of an object', 1, function() {
      deepEqual(func({ 'a': 1, 'b': 1 }).sort(), ['a', 'b']);
    });

    test('`_.' + methodName + '` should coerce primitives to objects (test in IE 9)', 2, function() {
      deepEqual(func('abc').sort(), ['0', '1', '2']);

      if (!isKeys) {
        // IE 9 doesn't box numbers in for-in loops.
        Number.prototype.a = 1;
        deepEqual(func(0).sort(), ['a']);
        delete Number.prototype.a;
      }
      else {
        skipTest();
      }
    });

    test('`_.' + methodName + '` should treat sparse arrays as dense', 1, function() {
      var array = [1];
      array[2] = 3;

      deepEqual(func(array).sort(), ['0', '1', '2']);
    });

    test('`_.' + methodName + '` should return an empty array for `null` or `undefined` values', 2, function() {
      objectProto.a = 1;
      _.each([null, undefined], function(value) {
        deepEqual(func(value), []);
      });
      delete objectProto.a;
    });

    test('`_.' + methodName + '` should return keys for custom properties on arrays', 1, function() {
      var array = [1];
      array.a = 1;

      deepEqual(func(array).sort(), ['0', 'a']);
    });

    test('`_.' + methodName + '` should ' + (isKeys ? 'not' : '') + ' include inherited properties of arrays', 1, function() {
      var expected = isKeys ? ['0'] : ['0', 'a'];

      arrayProto.a = 1;
      deepEqual(func([1]).sort(), expected);
      delete arrayProto.a;
    });

    test('`_.' + methodName + '` should work with `arguments` objects (test in IE < 9)', 1, function() {
      if (!(isPhantom || isStrict)) {
        deepEqual(func(args).sort(), ['0', '1', '2']);
      }
      else {
        skipTest();
      }
    });

    test('`_.' + methodName + '` should return keys for custom properties on `arguments` objects', 1, function() {
      if (!(isPhantom || isStrict)) {
        args.a = 1;
        deepEqual(func(args).sort(), ['0', '1', '2', 'a']);
        delete args.a;
      }
      else {
        skipTest();
      }
    });

    test('`_.' + methodName + '` should ' + (isKeys ? 'not' : '') + ' include inherited properties of `arguments` objects', 1, function() {
      if (!(isPhantom || isStrict)) {
        var expected = isKeys ? ['0', '1', '2'] : ['0', '1', '2', 'a'];

        objectProto.a = 1;
        deepEqual(func(args).sort(), expected);
        delete objectProto.a;
      }
      else {
        skipTest();
      }
    });

    test('`_.' + methodName + '` should work with string objects (test in IE < 9)', 1, function() {
      deepEqual(func(Object('abc')).sort(), ['0', '1', '2']);
    });

    test('`_.' + methodName + '` should return keys for custom properties on string objects', 1, function() {
      var object = Object('a');
      object.a = 1;

      deepEqual(func(object).sort(), ['0', 'a']);
    });

    test('`_.' + methodName + '` should ' + (isKeys ? 'not' : '') + ' include inherited properties of string objects', 1, function() {
      var expected = isKeys ? ['0'] : ['0', 'a'];

      stringProto.a = 1;
      deepEqual(func(Object('a')).sort(), expected);
      delete stringProto.a;
    });

    test('`_.' + methodName + '` fixes the JScript `[[DontEnum]]` bug (test in IE < 9)', 3, function() {
      function Foo() {}
      Foo.prototype = _.create(shadowObject);

      deepEqual(func(shadowObject).sort(), shadowProps);

      var actual = isKeys ? [] : _.without(shadowProps, 'constructor');
      deepEqual(func(new Foo).sort(), actual);

      Foo.prototype.constructor = Foo;
      deepEqual(func(new Foo).sort(), actual);
    });

    test('`_.' + methodName + '` skips non-enumerable properties (test in IE < 9)', 50, function() {
      _.forOwn({
        'Array': arrayProto,
        'Boolean': Boolean.prototype,
        'Date': Date.prototype,
        'Error': errorProto,
        'Function': funcProto,
        'Object': objectProto,
        'Number': Number.prototype,
        'TypeError': TypeError.prototype,
        'RegExp': RegExp.prototype,
        'String': stringProto
      },
      function(proto, key) {
        _.each([proto, _.create(proto)], function(object, index) {
          var actual = func(proto),
              isErr = _.endsWith(key, 'Error'),
              message = 'enumerable properties ' + (index ? 'inherited from' : 'on') + ' `' + key + '.prototype`',
              props = isErr ? ['constructor', 'toString'] : ['constructor'];

          actual = isErr ? _.difference(props, actual) : actual;
          strictEqual(_.isEmpty(actual), !isErr, 'skips non-' + message);

          proto.a = 1;
          actual = func(object);
          delete proto.a;

          strictEqual(_.includes(actual, 'a'), !(isKeys && index), 'includes ' + message);

          if (index) {
            object.constructor = 1;
            if (isErr) {
              object.toString = 2;
            }
            actual = func(object);
            ok(_.isEmpty(_.difference(props, actual)), 'includes properties on objects that shadow those on `' + key + '.prototype`');
          }
        });
      });
    });

    test('`_.' + methodName + '` skips the prototype property of functions (test in Firefox < 3.6, Opera > 9.50 - Opera < 11.60, and Safari < 5.1)', 2, function() {
      function Foo() {}
      Foo.a = 1;
      Foo.b = 2;
      Foo.prototype.c = 3;

      var expected = ['a', 'b'];
      deepEqual(func(Foo).sort(), expected);

      Foo.prototype = { 'c': 3 };
      deepEqual(func(Foo).sort(), expected);
    });

    test('`_.' + methodName + '` skips the `constructor` property on prototype objects', 3, function() {
      function Foo() {}
      Foo.prototype.a = 1;

      var expected = ['a'];
      deepEqual(func(Foo.prototype), ['a']);

      Foo.prototype = { 'constructor': Foo, 'a': 1 };
      deepEqual(func(Foo.prototype), ['a']);

      var Fake = { 'prototype': {} };
      Fake.prototype.constructor = Fake;
      deepEqual(func(Fake.prototype), ['constructor']);
    });

    test('`_.' + methodName + '` should ' + (isKeys ? 'not' : '') + ' include inherited properties', 1, function() {
      function Foo() { this.a = 1; }
      Foo.prototype.b = 2;

      var expected = isKeys ? ['a'] : ['a', 'b'];
      deepEqual(func(new Foo).sort(), expected);
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
      var array = [];
      array['-1'] = 1;
      strictEqual(_.last([]), undefined);
    });

    test('should work as an iteratee for `_.map`', 1, function() {
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

    test('should work in a lazy chain sequence', 1, function() {
      if (!isNpm) {
        var array = [1, 2, 3, 4];

        var wrapped = _(array).filter(function(value) {
          return value % 2;
        });

        strictEqual(wrapped.last(), 3);
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

    test('should work with a positive `fromIndex`', 1, function() {
      strictEqual(_.lastIndexOf(array, 1, 2), 0);
    });

    test('should work with `fromIndex` >= `array.length`', 1, function() {
      var values = [6, 8, Math.pow(2, 32), Infinity],
          expected = _.map(values, _.constant([-1, 3, -1]));

      var actual = _.map(values, function(fromIndex) {
        return [
          _.lastIndexOf(array, undefined, fromIndex),
          _.lastIndexOf(array, 1, fromIndex),
          _.lastIndexOf(array, '', fromIndex)
        ];
      });

      deepEqual(actual, expected);
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

    test('should perform a binary search when `fromIndex` is a non-number truthy value', 1, function() {
      var sorted = [4, 4, 5, 5, 6, 6],
          values = [true, '1', {}],
          expected = _.map(values, _.constant(3));

      var actual = _.map(values, function(value) {
        return _.lastIndexOf(sorted, 5, value);
      });

      deepEqual(actual, expected);
    });

    test('should work with a negative `fromIndex`', 1, function() {
      strictEqual(_.lastIndexOf(array, 2, -3), 1);
    });

    test('should work with a negative `fromIndex` <= `-array.length`', 1, function() {
      var values = [-6, -8, -Infinity],
          expected = _.map(values, _.constant(0));

      var actual = _.map(values, function(fromIndex) {
        return _.lastIndexOf(array, 1, fromIndex);
      });

      deepEqual(actual, expected);
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('indexOf methods');

  _.each(['indexOf', 'lastIndexOf'], function(methodName) {
    var func = _[methodName];

    test('`_.' + methodName + '` should accept a falsey `array` argument', 1, function() {
      var expected = _.map(falsey, _.constant(-1));

      var actual = _.map(falsey, function(value, index) {
        try {
          return index ? func(value) : func();
        } catch(e) {}
      });

      deepEqual(actual, expected);
    });

    test('`_.' + methodName + '` should return `-1` for an unmatched value', 4, function() {
      var array = [1, 2, 3],
          empty = [];

      strictEqual(func(array, 4), -1);
      strictEqual(func(array, 4, true), -1);

      strictEqual(func(empty, undefined), -1);
      strictEqual(func(empty, undefined, true), -1);
    });

    test('`_.' + methodName + '` should not match values on empty arrays', 2, function() {
      var array = [];
      array[-1] = 0;

      strictEqual(func(array, undefined), -1);
      strictEqual(func(array, 0, true), -1);
    });

    test('`_.' + methodName + '` should match `NaN`', 2, function() {
      strictEqual(func([1, NaN, 3], NaN), 1);
      strictEqual(func([1, 3, NaN], NaN, true), 2);
    });
  });

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.map');

  (function() {
    var array = [1, 2, 3];

    test('should provide the correct `iteratee` arguments', 1, function() {
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

    test('should work on an object with no `iteratee`', 1, function() {
      var actual = _.map({ 'a': 1, 'b': 2, 'c': 3 });
      deepEqual(actual, array);
    });

    test('should handle object arguments with non-numeric length properties', 1, function() {
      var value = { 'value': 'x' },
          object = { 'length': { 'value': 'x' } };

      deepEqual(_.map(object, _.identity), [value]);
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
        } catch(e) {}
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

    test('should provide the correct `iteratee` arguments', 1, function() {
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

    test('should work on an object with no `iteratee`', 1, function() {
      var actual = _.mapValues({ 'a': 1, 'b': 2, 'c': 3 });
      deepEqual(actual, object);
    });

    test('should accept a falsey `object` argument', 1, function() {
      var expected = _.map(falsey, _.constant({}));

      var actual = _.map(falsey, function(value, index) {
        try {
          return index ? _.mapValues(value) : _.mapValues();
        } catch(e) {}
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
    test('should create a function that performs a deep comparison between a given object and `source`', 6, function() {
      var object = { 'a': 1, 'b': 2, 'c': 3 },
          matches = _.matches({ 'a': 1 });

      strictEqual(matches.length, 1);
      strictEqual(matches(object), true);

      matches = _.matches({ 'b': 1 });
      strictEqual(matches(object), false);

      matches = _.matches({ 'a': 1, 'c': 3 });
      strictEqual(matches(object), true);

      matches = _.matches({ 'c': 3, 'd': 4 });
      strictEqual(matches(object), false);

      object = { 'a': { 'b': { 'c': 1, 'd': 2 }, 'e': 3 }, 'f': 4 };
      matches = _.matches({ 'a': { 'b': { 'c': 1 } } });

      strictEqual(matches(object), true);
    });

    test('should compare a variety of `source` values', 2, function() {
      var object1 = { 'a': false, 'b': true, 'c': '3', 'd': 4, 'e': [5], 'f': { 'g': 6 } },
          object2 = { 'a': 0, 'b': 1, 'c': 3, 'd': '4', 'e': ['5'], 'f': { 'g': '6' } },
          matches = _.matches(object1);

      strictEqual(matches(object1), true);
      strictEqual(matches(object2), false);
    });

    test('should not change match behavior if `source` is augmented', 9, function() {
      _.each([{ 'a': { 'b': 2, 'c': 3 } }, { 'a': 1, 'b': 2 }, { 'a': 1 }], function(source, index) {
        var object = _.cloneDeep(source),
            matches = _.matches(source);

        strictEqual(matches(object), true);

        if (index) {
          source.a = 2;
          source.b = 1;
          source.c = 3;
        } else {
          source.a.b = 1;
          source.a.c = 2;
          source.a.d = 3;
        }
        strictEqual(matches(object), true);
        strictEqual(matches(source), false);
      });
    });

    test('should return `true` when comparing an empty `source`', 1, function() {
      var object = { 'a': 1 },
          expected = _.map(empties, _.constant(true));

      var actual = _.map(empties, function(value) {
        var matches = _.matches(value);
        return matches(object);
      });

      deepEqual(actual, expected);
    });

    test('should return `true` when comparing a `source` of empty arrays and objects', 1, function() {
      var objects = [{ 'a': [1], 'b': { 'c': 1 } }, { 'a': [2, 3], 'b': { 'd': 2 } }],
          matches = _.matches({ 'a': [], 'b': {} }),
          actual = _.filter(objects, matches);

      deepEqual(actual, objects);
    });

    test('should not error for falsey `object` values', 1, function() {
      var expected = _.map(falsey, _.constant(false)),
          matches = _.matches({ 'a': 1 });

      var actual = _.map(falsey, function(value, index) {
        try {
          return index ? matches(value) : matches();
        } catch(e) {}
      });

      deepEqual(actual, expected);
    });

    test('should return `true` when comparing an empty `source` to a falsey `object`', 1, function() {
      var expected = _.map(falsey, _.constant(true)),
          matches = _.matches({});

      var actual = _.map(falsey, function(value, index) {
        try {
          return index ? matches(value) : matches();
        } catch(e) {}
      });

      deepEqual(actual, expected);
    });

    test('should search arrays of `source` for values', 3, function() {
      var objects = [{ 'a': ['b'] }, { 'a': ['c', 'd'] }],
          matches = _.matches({ 'a': ['d'] }),
          actual = _.filter(objects, matches);

      deepEqual(actual, [objects[1]]);

      matches = _.matches({ 'a': ['b', 'd'] });
      actual = _.filter(objects, matches);
      deepEqual(actual, []);

      matches = _.matches({ 'a': ['d', 'b'] });
      actual = _.filter(objects, matches);
      deepEqual(actual, []);
    });

    test('should perform a partial comparison of all objects within arrays of `source`', 1, function() {
      var objects = [
        { 'a': [{ 'b': 1, 'c': 2 }, { 'b': 4, 'c': 5, 'd': 6 }] },
        { 'a': [{ 'b': 1, 'c': 2 }, { 'b': 4, 'c': 6, 'd': 7 }] }
      ];

      var matches = _.matches({ 'a': [{ 'b': 1 }, { 'b': 4, 'c': 5 }] }),
          actual = _.filter(objects, matches);

      deepEqual(actual, [objects[0]]);
    });

    test('should handle a `source` with `undefined` values', 2, function() {
      var matches = _.matches({ 'b': undefined }),
          objects = [{ 'a': 1 }, { 'a': 1, 'b': 1 }, { 'a': 1, 'b': undefined }],
          actual = _.map(objects, matches),
          expected = [false, false, true];

      deepEqual(actual, expected);

      matches = _.matches({ 'a': { 'c': undefined } });
      objects = [{ 'a': { 'b': 1 } }, { 'a':{ 'b':1 , 'c': 1 } }, { 'a': { 'b': 1, 'c': undefined } }];
      actual = _.map(objects, matches);

      deepEqual(actual, expected);
    });

    test('should not match by inherited `source` properties', 1, function() {
      function Foo() { this.a = 1; }
      Foo.prototype.b = 2;

      var objects = [{ 'a': 1 }, { 'a': 1, 'b': 2 }],
          source = new Foo,
          matches = _.matches(source),
          actual = _.map(objects, matches),
          expected = _.map(objects, _.constant(true));

      deepEqual(actual, expected);
    });

    test('should work with a function for `source`', 1, function() {
      function source() {}

      source.a = 1;
      source.b = function() {};
      source.c = 3;

      var matches = _.matches(source),
          objects = [{ 'a': 1 }, { 'a': 1, 'b': source.b, 'c': 3 }],
          actual = _.map(objects, matches);

      deepEqual(actual, [false, true]);
    });

    test('should match problem JScript properties (test in IE < 9)', 1, function() {
      var matches = _.matches(shadowObject),
          objects = [{}, shadowObject],
          actual = _.map(objects, matches);

      deepEqual(actual, [false, true]);
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
        } catch(e) {}
      });

      deepEqual(actual, expected);
    });

    test('should return `-Infinity` for non-numeric collection values', 1, function() {
      var collections = [['a', 'b'], { 'a': 'a', 'b': 'b' }],
          expected = _.map(collections, function() { return -Infinity; });

      var actual = _.map(collections, function(value) {
        try {
          return _.max(value);
        } catch(e) {}
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
        } catch(e) {}
      });

      deepEqual(actual, expected);
    });

    test('should check cache for own properties', 1, function() {
      var actual = [],
          memoized = _.memoize(_.identity);

      _.each(shadowProps, function(value) {
        actual.push(memoized(value));
      });

      deepEqual(actual, shadowProps);
    });

    test('should expose a `cache` object on the `memoized` function which implements `Map` interface', 18, function() {
      _.times(2, function(index) {
        var resolver = index ? _.identity : null,
            memoized = _.memoize(function(value) { return 'value:' + value; }, resolver),
            cache = memoized.cache;

        memoized('a');

        strictEqual(cache.has('a'), true);
        strictEqual(cache.get('a'), 'value:a');
        strictEqual(cache['delete']('a'), true);
        strictEqual(cache['delete']('b'), false);

        strictEqual(cache.set('b', 'value:b'), cache);
        strictEqual(cache.has('b'), true);
        strictEqual(cache.get('b'), 'value:b');
        strictEqual(cache['delete']('b'), true);
        strictEqual(cache['delete']('a'), false);
      });
    });

    test('should skip the `__proto__` key', 8, function() {
      _.times(2, function(index) {
        var count = 0,
            key = '__proto__',
            resolver = index && _.identity;

        var memoized = _.memoize(function() {
          count++;
          return [];
        }, resolver);

        var cache = memoized.cache;

        memoized(key);
        memoized(key);

        strictEqual(count, 2);
        strictEqual(cache.get(key), undefined);
        strictEqual(cache['delete'](key), false);
        ok(!(cache.__data__ instanceof Array));
      });
    });

    test('should allow `_.memoize.Cache` to be customized', 4, function() {
      var oldCache = _.memoize.Cache

      function Cache() {
        this.__data__ = [];
      }

      Cache.prototype = {
        'delete': function(key) {
          var data = this.__data__;

          var index = _.findIndex(data, function(entry) {
            return key === entry.key;
          });

          if (index < 0) {
            return false;
          }
          data.splice(index, 1);
          return true;
        },
        'get': function(key) {
          return _.find(this.__data__, function(entry) {
            return key === entry.key;
          }).value;
        },
        'has': function(key) {
          return _.some(this.__data__, function(entry) {
            return key === entry.key;
          });
        },
        'set': function(key, value) {
          this.__data__.push({ 'key': key, 'value': value });
        }
      };

      _.memoize.Cache = Cache;

      var memoized = _.memoize(function(object) {
        return '`id` is "' + object.id + '"';
      });

      var actual = memoized({ 'id': 'a' });
      strictEqual(actual, '`id` is "a"');

      var key = { 'id': 'b' };
      actual = memoized(key);
      strictEqual(actual, '`id` is "b"');

      var cache = memoized.cache;
      strictEqual(cache.has(key), true);

      cache['delete'](key);
      strictEqual(cache.has(key), false);

      _.memoize.Cache = oldCache;
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
        'foo': { 'b': { 'c': { 'd': {} } } },
        'bar': {}
      };

      source.foo.b.c.d = source;
      source.bar.b = source.foo.b;

      var actual = _.merge(object, source);
      ok(actual.bar.b === actual.foo.b && actual.foo.b.c.d === actual.foo.b.c.d.foo.b.c.d);
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

    test('should handle merging if `customizer` returns `undefined`', 1, function() {
      var actual = _.merge({ 'a': { 'b': [1, 1] } }, { 'a': { 'b': [0] } }, _.noop);
      deepEqual(actual, { 'a': { 'b': [0, 1] } });
    });

    test('should defer to `customizer` when it returns a value other than `undefined`', 1, function() {
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
        } catch(e) {}
      });

      deepEqual(actual, expected);
    });

    test('should return `Infinity` for non-numeric collection values', 1, function() {
      var collections = [['a', 'b'], { 'a': 'a', 'b': 'b' }],
          expected = _.map(collections, function() { return Infinity; });

      var actual = _.map(collections, function(value) {
        try {
          return _.min(value);
        } catch(e) {}
      });

      deepEqual(actual, expected);
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.max and lodash.min');

  _.each(['max', 'min'], function(methodName, index) {
    var array = [1, 2, 3],
        func = _[methodName],
        isMax = !index;

    test('`_.' + methodName + '` should work with Date objects', 1, function() {
      var curr = new Date,
          past = new Date(0);

      strictEqual(func([curr, past]), isMax ? curr : past);
    });

    test('`_.' + methodName + '` should work with a `iteratee` argument', 1, function() {
      var actual = func(array, function(num) {
        return -num;
      });

      strictEqual(actual, isMax ? 1 : 3);
    });

    test('`_.' + methodName + '` should provide the correct `iteratee` arguments when iterating an array', 1, function() {
      var args;

      func(array, function() {
        args || (args = slice.call(arguments));
      });

      deepEqual(args, [1, 0, array]);
    });

    test('`_.' + methodName + '` should provide the correct `iteratee` arguments when iterating an object', 1, function() {
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

    test('should work with a "_.pluck" style `iteratee`', 2, function() {
      var objects = [{ 'a': 2 }, { 'a': 3 }, { 'a': 1 }],
          actual = func(objects, 'a');

      deepEqual(actual, objects[isMax ? 1 : 2]);

      var arrays = [[2], [3], [1]];
      actual = func(arrays, 0);

      deepEqual(actual, arrays[isMax ? 1 : 2]);
    });

    test('`_.' + methodName + '` should work when `iteratee` returns +/-Infinity', 1, function() {
      var value = isMax ? -Infinity : Infinity,
          object = { 'a': value };

      var actual = func([object, { 'a': value }], function(object) {
        return object.a;
      });

      strictEqual(actual, object);
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

    test('`_.' + methodName + '` should work with extremely large arrays', 1, function() {
      var array = _.range(0, 5e5);
      strictEqual(func(array), isMax ? 499999 : 0);
    });

    test('`_.' + methodName + '` should work as an iteratee for `_.map`', 2, function() {
      var array = [[2, 3, 1], [5, 6, 4], [8, 9, 7]],
          actual = _.map(array, func);

      deepEqual(actual, isMax ? [3, 6, 9] : [1, 4, 7]);

      actual = _.map('abc', func);
      deepEqual(actual, ['a', 'b', 'c']);
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
    function Wrapper(value) {
      if (!(this instanceof Wrapper)) {
        return new Wrapper(value);
      }
      if (_.has(value, '__wrapped__')) {
        var actions = _.slice(value.__actions__),
            chain = value.__chain__;

        value = value.__wrapped__;
      }
      this.__actions__ = actions || [];
      this.__chain__ = chain || false;
      this.__wrapped__ = value;
    }

    Wrapper.prototype.value = function() {
      return getUnwrappedValue(this);
    };

    var value = ['a'],
        source = { 'a': function(array) { return array[0]; }, 'b': 'B' };

    test('should mixin `source` methods into lodash', 4, function() {
      if (!isNpm) {
        _.mixin(source);

        strictEqual(_.a(value), 'a');
        strictEqual(getUnwrappedValue(_(value).a()), 'a');

        delete _.a;
        delete _.prototype.a;

        ok(!('b' in _));
        ok(!('b' in _.prototype));

        delete _.b;
        delete _.prototype.b;
      }
      else {
        skipTest(4);
      }
    });

    test('should use `this` as the default `object` value', 3, function() {
      var object = _.create(_);
      object.mixin(source);

      strictEqual(object.a(value), 'a');

      ok(!('a' in _));
      ok(!('a' in _.prototype));

      delete Wrapper.a;
      delete Wrapper.prototype.a;
      delete Wrapper.b;
      delete Wrapper.prototype.b;
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
      _.mixin(Wrapper, source);

      var wrapped = Wrapper(value),
          actual = wrapped.a();

      strictEqual(actual.value(), 'a');
      ok(actual instanceof Wrapper);

      delete Wrapper.a;
      delete Wrapper.prototype.a;
      delete Wrapper.b;
      delete Wrapper.prototype.b;
    });

    test('should not assign inherited `source` properties', 1, function() {
      function Foo() {}
      Foo.prototype.a = _.noop;

      deepEqual(_.mixin({}, new Foo, {}), {});
    });

    test('should accept an `options` argument', 16, function() {
      function message(func, chain) {
        return (func === _ ? 'lodash' : 'provided') + ' function should ' + (chain ? '' : 'not ') + 'chain';
      }

      _.each([_, Wrapper], function(func) {
        _.each([false, true, { 'chain': false }, { 'chain': true }], function(options) {
          if (!isNpm) {
            if (func === _) {
              _.mixin(source, options);
            } else {
              _.mixin(func, source, options);
            }
            var wrapped = func(value),
                actual = wrapped.a();

            if (options === true || (options && options.chain)) {
              strictEqual(actual.value(), 'a', message(func, true));
              ok(actual instanceof func, message(func, true));
            } else {
              strictEqual(actual, 'a', message(func, false));
              ok(!(actual instanceof func), message(func, false));
            }
            delete func.a;
            delete func.prototype.a;
            delete func.b;
            delete func.prototype.b;
          }
          else {
            skipTest(2);
          }
        });
      });
    });

    test('should not extend lodash when an `object` is provided with an empty `options` object', 1, function() {
      _.mixin({ 'a': _.noop }, {});
      ok(!('a' in _));
      delete _.a;
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

    test('should not return the existing wrapped value when chaining', 2, function() {
      if (!isNpm) {
        _.each([_, Wrapper], function(func) {
          if (func === _) {
            var wrapped = _(source),
                actual = wrapped.mixin();

            strictEqual(actual.value(), _);
          }
          else {
            wrapped = _(func);
            actual = wrapped.mixin(source);
            notStrictEqual(actual, wrapped);
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

    test('should produce methods that work in a lazy chain sequence', 1, function() {
      if (!isNpm) {
        var array = [1, 2, 1, 3],
            predicate = function(value) { return value > 1; };

        _.mixin({ 'a': _.countBy, 'b': _.filter });

        var actual = _(array).a(_.identity).map(String).b(predicate).take().value();
        deepEqual(actual, ['2']);

        delete _.a;
        delete _.prototype.a;
        delete _.b;
        delete _.prototype.b;
      }
      else {
        skipTest();
      }
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.negate');

  (function() {
    test('should create a function that negates the result of `func`', 2, function() {
      var negate = _.negate(function(n) {
        return n % 2 == 0;
      });

      strictEqual(negate(1), true);
      strictEqual(negate(2), false);
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.noop');

  (function() {
    test('should return `undefined`', 1, function() {
      var values = empties.concat(true, new Date, _, 1, /x/, 'a'),
          expected = _.map(values, _.constant());

      var actual = _.map(values, function(value, index) {
        return index ? _.noop(value) : _.noop();
      });

      deepEqual(actual, expected);
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.noConflict');

  (function() {
    test('should return the `lodash` function', 1, function() {
      if (!isModularize) {
        var oldDash = root._;
        strictEqual(_.noConflict(), _);
        root._ = oldDash;
      }
      else {
        skipTest();
      }
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

    test('should return an empty object when `object` is `null` or `undefined`', 2, function() {
      objectProto.a = 1;
      _.each([null, undefined], function(value) {
        deepEqual(_.omit(value, 'valueOf'), {});
      });
      delete objectProto.a;
    });

    test('should work with `arguments` objects as secondary arguments', 1, function() {
      deepEqual(_.omit(object, args), expected);
    });

    test('should work with an array `object` argument', 1, function() {
      deepEqual(_.omit([1, 2, 3], '0', '2'), { '1': 2 });
    });

    test('should work with a primitive `object` argument', 1, function() {
      stringProto.a = 1;
      stringProto.b = 2;

      deepEqual(_.omit('', 'b'), { 'a': 1 });

      delete stringProto.a;
      delete stringProto.b;
    });

    test('should work with a `predicate` argument', 1, function() {
      var actual = _.omit(object, function(num) {
        return num != 2;
      });

      deepEqual(actual, expected);
    });

    test('should provide the correct `predicate` arguments', 1, function() {
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
    test('should invoke `func` once', 2, function() {
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

  _.each(['pad', 'padLeft', 'padRight'], function(methodName) {
    var func = _[methodName],
        isPadLeft = methodName == 'padLeft';

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
        var actual = length ? (isPadLeft ? ' abc' : 'abc ') : 'abc';
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

    test('should parse strings with leading whitespace (test in Chrome, Firefox, and Opera)', 2, function() {
      var expected = [8, 8, 10, 10, 32, 32, 32, 32];

      _.times(2, function(index) {
        var actual = [],
            func = (index ? (lodashBizarro || {}) : _).parseInt;

        if (func) {
          _.times(2, function(otherIndex) {
            var string = otherIndex ? '10' : '08';
            actual.push(
              func(whitespace + string, 10),
              func(whitespace + string)
            );
          });

          _.each(['0x20', '0X20'], function(string) {
            actual.push(
              func(whitespace + string),
              func(whitespace + string, 16)
            );
          });

          deepEqual(actual, expected);
        }
        else {
          skipTest();
        }
      });
    });

    test('should coerce `radix` to a number', 2, function() {
      var object = { 'valueOf': function() { return 0; } };
      strictEqual(_.parseInt('08', object), 8);
      strictEqual(_.parseInt('0x20', object), 32);
    });

    test('should work as an iteratee for `_.map`', 2, function() {
      var strings = _.map(['6', '08', '10'], Object),
          actual = _.map(strings, _.parseInt);

      deepEqual(actual, [6, 8, 10]);

      actual = _.map('123', _.parseInt);
      deepEqual(actual, [1, 2, 3]);
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('partial methods');

  _.each(['partial', 'partialRight'], function(methodName, index) {
    var func = _[methodName],
        isPartial = !index,
        ph = func.placeholder;

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
      var fn = function() { return slice.call(arguments); },
          par = func(fn, ph, 'b', ph);

      deepEqual(par('a', 'c'), ['a', 'b', 'c']);
      deepEqual(par('a'), ['a', 'b', undefined]);
      deepEqual(par(), [undefined, 'b', undefined]);

      if (isPartial) {
        deepEqual(par('a', 'c', 'd'), ['a', 'b', 'c', 'd']);
      } else {
        par = func(fn, ph, 'c', ph);
        deepEqual(par('a', 'b', 'd'), ['a', 'b', 'c', 'd']);
      }
    });

    test('`_.' + methodName + '` should not set a `this` binding', 3, function() {
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
      function greet(greeting, name) {
        return greeting + ' ' + name;
      }

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

    test('should work with placeholders and curried methods', 1, function() {
      var fn = function() { return slice.call(arguments); },
          curried = _.curry(fn),
          par = func(curried, ph, 'b', ph, 'd');

      deepEqual(par('a', 'c'), ['a', 'b', 'c', 'd']);
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
    var ph1 = _.bind.placeholder,
        ph2 = _.bindKey.placeholder,
        ph3 = _.partial.placeholder,
        ph4 = _.partialRight.placeholder;

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

    test('combinations of functions with placeholders should work', 3, function() {
      function fn() {
        return slice.call(arguments);
      }

      var expected = [1, 2, 3, 4, 5, 6],
          object = { 'fn': fn };

      var a = _.bindKey(object, 'fn', ph2, 2),
          b = _.partialRight(a, ph4, 6),
          c = _.partial(b, 1, ph3, 4);

      deepEqual(c(3, 5), expected);

      a = _.bind(fn, object, ph1, 2);
      b = _.partialRight(a, ph4, 6);
      c = _.partial(b, 1, ph3, 4);

      deepEqual(c(3, 5), expected);

      a = _.partial(fn, ph3, 2)
      b = _.bind(a, object, 1, ph1, 4);
      c = _.partialRight(b, ph4, 6);

      deepEqual(c(3, 5), expected);
    });

    test('combinations of functions with overlaping placeholders should work', 3, function() {
      function fn() {
        return slice.call(arguments);
      }

      var expected = [1, 2, 3, 4],
          object = { 'fn': fn };

      var a = _.bindKey(object, 'fn', ph2, 2),
          b = _.partialRight(a, ph4, 4),
          c = _.partial(b, ph3, 3);

      deepEqual(c(1), expected);

      a = _.bind(fn, object, ph1, 2);
      b = _.partialRight(a, ph4, 4);
      c = _.partial(b, ph3, 3);

      deepEqual(c(1), expected);

      a = _.partial(fn, ph3, 2)
      b = _.bind(a, object, ph1, 3);
      c = _.partialRight(b, ph4, 4);

      deepEqual(c(1), expected);
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

    test('should work when hot', 12, function() {
      _.times(2, function(index) {
        function fn() {
          var result = [this];
          push.apply(result, arguments);
          return result;
        }

        var object = {},
            bound1 = index ? _.bind(fn, object, 1) : _.bind(fn, object),
            expected = [object, 1, 2, 3];

        var actual = _.last(_.times(HOT_COUNT, function() {
          var bound2 = index ? _.bind(bound1, null, 2) : _.bind(bound1);
          return index ? bound2(3) : bound2(1, 2, 3);
        }));

        deepEqual(actual, expected);

        actual = _.last(_.times(HOT_COUNT, function() {
          var bound1 = index ? _.bind(fn, object, 1) : _.bind(fn, object),
              bound2 = index ? _.bind(bound1, null, 2) : _.bind(bound1);

          return index ? bound2(3) : bound2(1, 2, 3);
        }));

        deepEqual(actual, expected);
      });

      _.each(['curry', 'curryRight'], function(methodName, index) {
        function fn(a, b, c) {
          return [a, b, c];
        }

        var curried = _[methodName](fn),
            expected = index ? [3, 2, 1] :  [1, 2, 3];

        var actual = _.last(_.times(HOT_COUNT, function() {
          return curried(1)(2)(3);
        }));

        deepEqual(actual, expected);

        actual = _.last(_.times(HOT_COUNT, function() {
          var curried = _[methodName](fn);
          return curried(1)(2)(3);
        }));

        deepEqual(actual, expected);
      });

      _.each(['partial', 'partialRight'], function(methodName, index) {
        function fn() {
          return slice.call(arguments);
        }

        var func = _[methodName],
            par1 = func(fn, 1),
            expected = index ? [3, 2, 1] : [1, 2, 3];

        var actual = _.last(_.times(HOT_COUNT, function() {
          var par2 = func(par1, 2);
          return par2(3);
        }));

        deepEqual(actual, expected);

        actual = _.last(_.times(HOT_COUNT, function() {
          var par1 = func(fn, 1),
              par2 = func(par1, 2);

          return par2(3);
        }));

        deepEqual(actual, expected);
      });
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.partition');

  (function() {
    var array = [1, 0, 1];

    test('should return two groups of elements', 3, function() {
      deepEqual(_.partition([], _.identity), [[], []]);
      deepEqual(_.partition(array, _.constant(true)), [array, []]);
      deepEqual(_.partition(array, _.constant(false)), [[], array]);
    });

    test('should use `_.identity` when `predicate` is nullish', 1, function() {
      var values = [, null, undefined],
          expected = _.map(values, _.constant([[1, 1], [0]]));

      var actual = _.map(values, function(value, index) {
        return index ? _.partition(array, value) : _.partition(array);
      });

      deepEqual(actual, expected);
    });

    test('should provide the correct `predicate` arguments', 1, function() {
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

    test('should work with a number for `predicate`', 2, function() {
      var array = [
        [1, 0],
        [0, 1],
        [1, 0]
      ];

      deepEqual(_.partition(array, 0), [[array[0], array[2]], [array[1]]]);
      deepEqual(_.partition(array, 1), [[array[1]], [array[0], array[2]]]);
    });

    test('should work with a "_.pluck" style `predicate`', 1, function() {
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

    test('should return an empty object when `object` is `null` or `undefined`', 2, function() {
      _.each([null, undefined], function(value) {
        deepEqual(_.pick(value, 'valueOf'), {});
      });
    });

    test('should work with `arguments` objects as secondary arguments', 1, function() {
      deepEqual(_.pick(object, args), expected);
    });

    test('should work with an array `object` argument', 1, function() {
      deepEqual(_.pick([1, 2, 3], '1'), { '1': 2 });
    });

    test('should work with a primitive `object` argument', 1, function() {
      deepEqual(_.pick('', 'slice'), { 'slice': ''.slice });
    });

    test('should work with a `predicate` argument', 1, function() {
      var actual = _.pick(object, function(num) {
        return num != 2;
      });

      deepEqual(actual, expected);
    });

    test('should provide the correct `predicate` arguments', 1, function() {
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
      var objects = [{ 'name': 'barney', 'age': 36 }, { 'name': 'fred', 'age': 40 }];
      deepEqual(_.pluck(objects, 'name'), ['barney', 'fred']);
    });

    test('should pluck inherited property values', 1, function() {
      function Foo() { this.a = 1; }
      Foo.prototype.b = 2;

      deepEqual(_.pluck([new Foo], 'b'), [2]);
    });

    test('should work with an object for `collection`', 1, function() {
      var object = { 'a': [1], 'b': [1, 2], 'c': [1, 2, 3] };
      deepEqual(_.pluck(object, 'length'), [1, 2, 3]);
    });

    test('should return `undefined` for undefined properties', 1, function() {
      var array = [{ 'a': 1 }],
          actual = [_.pluck(array, 'b'), _.pluck(array, 'c')];

      deepEqual(actual, [[undefined], [undefined]]);
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

    test('should work in a lazy chain sequence', 2, function() {
      if (!isNpm) {
        var array = [{ 'a': 1 }, null, { 'a': 3 }, { 'a': 4 }],
            actual = _(array).pluck('a').value();

        deepEqual(actual, [1, undefined, 3, 4]);

        actual = _(array).filter(Boolean).pluck('a').value();
        deepEqual(actual, [1, 3, 4]);
      }
      else {
        skipTest(2);
      }
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.property');

  (function() {
    test('should create a function that plucks a property value of a given object', 3, function() {
      var object = { 'a': 1, 'b': 2 },
          prop = _.property('a');

      strictEqual(prop.length, 1);
      strictEqual(prop(object), 1);

      prop = _.property('b');
      strictEqual(prop(object), 2);
    });

    test('should work with non-string `prop` arguments', 1, function() {
      var prop = _.property(1);
      strictEqual(prop([1, 2, 3]), 2);
    });

    test('should coerce key to a string', 1, function() {
      function fn() {}
      fn.toString = _.constant('fn');

      var objects = [{ 'null': 1 }, { 'undefined': 2 }, { 'fn': 3 }, { '[object Object]': 4 }],
          values = [null, undefined, fn, {}]

      var actual = _.map(objects, function(object, index) {
        var prop = _.property(values[index]);
        return prop(object);
      });

      deepEqual(actual, [1, 2, 3, 4]);
    });

    test('should pluck inherited property values', 1, function() {
      function Foo() { this.a = 1; }
      Foo.prototype.b = 2;

      var prop = _.property('b');
      strictEqual(prop(new Foo), 2);
    });

    test('should work when `object` is nullish', 1, function() {
      var values = [, null, undefined],
          expected = _.map(values, _.constant(undefined));

      var actual = _.map(values, function(value, index) {
        var prop = _.property('a');
        return index ? prop(value) : prop();
      });

      deepEqual(actual, expected);
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.propertyOf');

  (function() {
    test('should create a function that plucks a property value of a given key', 3, function() {
      var object = { 'a': 1, 'b': 2 },
          propOf = _.propertyOf(object);

      strictEqual(propOf.length, 1);
      strictEqual(propOf('a'), 1);
      strictEqual(propOf('b'), 2);
    });

    test('should pluck inherited property values', 1, function() {
      function Foo() { this.a = 1; }
      Foo.prototype.b = 2;

      var propOf = _.propertyOf(new Foo);
      strictEqual(propOf('b'), 2);
    });

    test('should work when `object` is nullish', 1, function() {
      var values = [, null, undefined],
          expected = _.map(values, _.constant(undefined));

      var actual = _.map(values, function(value, index) {
        var propOf = index ? _.propertyOf(value) : _.propertyOf();
        return propOf('a');
      });

      deepEqual(actual, expected);
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

    test('should match `NaN`', 1, function() {
      var array = [1, NaN, 3, NaN];

      _.pull(array, NaN);
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

    test('should use `undefined` for nonexistent indexes', 2, function() {
      var array = ['a', 'b', 'c'],
          actual = _.pullAt(array, [2, 4, 0]);

      deepEqual(array, ['b']);
      deepEqual(actual, ['c', undefined, 'a']);
    });

    test('should ignore non-index keys', 2, function() {
      var array = ['a', 'b', 'c'],
          clone = array.slice();

      array['1.1'] = array['-1'] = 1;

      var values = _.reject(empties, function(value) {
        return value === 0 || _.isArray(value);
      }).concat(-1, 1.1);

      var expected = _.map(values, _.constant(undefined)),
          actual = _.pullAt(array, values);

      deepEqual(actual, expected);
      deepEqual(array, clone);
    });

    test('should return an empty array when no indexes are provided', 4, function() {
      var array = ['a', 'b', 'c'],
          actual = _.pullAt(array);

      deepEqual(array, ['a', 'b', 'c']);
      deepEqual(actual, []);

      actual = _.pullAt(array, [], []);

      deepEqual(array, ['a', 'b', 'c']);
      deepEqual(actual, []);
    });

    test('should accept multiple index arguments', 2, function() {
      var array = ['a', 'b', 'c', 'd'],
          actual = _.pullAt(array, 3, 0, 2);

      deepEqual(array, ['b']);
      deepEqual(actual, ['d', 'a', 'c']);
    });

    test('should accept multiple arrays of indexes', 2, function() {
      var array = ['a', 'b', 'c', 'd'],
          actual = _.pullAt(array, [3], [0, 2]);

      deepEqual(array, ['b']);
      deepEqual(actual, ['d', 'a', 'c']);
    });

    test('should work with a falsey `array` argument when keys are provided', 1, function() {
      var expected = _.map(falsey, _.constant([undefined, undefined]));

      var actual = _.map(falsey, function(value) {
        try {
          return _.pullAt(value, 0, 1);
        } catch(e) {}
      });

      deepEqual(actual, expected);
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

    test('should work as an iteratee for `_.map`', 1, function() {
      var array = [1, 2, 3],
          expected = _.map(array, _.constant(true)),
          randoms = _.map(array, _.random);

      var actual = _.map(randoms, function(result, index) {
        return result >= 0 && result <= array[index] && (result % 1) == 0;
      });

      deepEqual(actual, expected);
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

    test('should work as an iteratee for `_.map`', 1, function() {
      var actual = _.map([1, 2, 3], _.range);
      deepEqual(actual, [[0], [0, 1], [0, 1, 2]]);
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.rearg');

  (function() {
    function fn() {
      return slice.call(arguments);
    }

    test('should reorder arguments provided to `func`', 1, function() {
      var rearged = _.rearg(fn, [2, 0, 1]);
      deepEqual(rearged('b', 'c', 'a'), ['a', 'b', 'c']);
    });

    test('should work with repeated indexes', 1, function() {
      var rearged = _.rearg(fn, [1, 1, 1]);
      deepEqual(rearged('c', 'a', 'b'), ['a', 'a', 'a']);
    });

    test('should use `undefined` for nonexistent indexes', 1, function() {
      var rearged = _.rearg(fn, [1, 4]);
      deepEqual(rearged('b', 'a', 'c'), ['a', undefined, 'c']);
    });

    test('should use `undefined` for non-index values', 1, function() {
      var values = _.reject(empties, function(value) {
        return value === 0 || _.isArray(value);
      }).concat(-1, 1.1);

      var expected = _.map(values, _.constant([undefined, 'b', 'c']));

      var actual = _.map(values, function(value) {
        var rearged = _.rearg(fn, [value]);
        return rearged('a', 'b', 'c');
      });

      deepEqual(actual, expected);
    });

    test('should not rearrange arguments when no indexes are provided', 2, function() {
      var rearged = _.rearg(fn);
      deepEqual(rearged('a', 'b', 'c'), ['a', 'b', 'c']);

      rearged = _.rearg(fn, [], []);
      deepEqual(rearged('a', 'b', 'c'), ['a', 'b', 'c']);
    });

    test('should accept multiple index arguments', 1, function() {
      var rearged = _.rearg(fn, 2, 0, 1);
      deepEqual(rearged('b', 'c', 'a'), ['a', 'b', 'c']);
    });

    test('should accept multiple arrays of indexes', 1, function() {
      var rearged = _.rearg(fn, [2], [0, 1]);
      deepEqual(rearged('b', 'c', 'a'), ['a', 'b', 'c']);
    });

    test('should work with fewer indexes than arguments', 1, function() {
      var rearged = _.rearg(fn, [1, 0]);
      deepEqual(rearged('b', 'a', 'c'), ['a', 'b', 'c']);
    });

    test('should work on functions that have been rearged', 1, function() {
      var rearged1 = _.rearg(fn, 2, 1, 0),
          rearged2 = _.rearg(rearged1, 1, 0, 2);

      deepEqual(rearged2('b', 'c', 'a'), ['a', 'b', 'c']);
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.reduce');

  (function() {
    var array = [1, 2, 3];

    test('should use the first element of a collection as the default `accumulator`', 1, function() {
      strictEqual(_.reduce(array), 1);
    });

    test('should provide the correct `iteratee` arguments when iterating an array', 2, function() {
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

    test('should provide the correct `iteratee` arguments when iterating an object', 2, function() {
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

    test('should provide the correct `iteratee` arguments when iterating an array', 2, function() {
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

    test('should provide the correct `iteratee` arguments when iterating an object', 2, function() {
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

  _.each(['reduce', 'reduceRight'], function(methodName, index) {
    var array = [1, 2, 3],
        func = _[methodName];

    test('`_.' + methodName + '` should reduce a collection to a single value', 1, function() {
      var actual = func(['a', 'b', 'c'], function(accumulator, value) {
        return accumulator + value;
      }, '');

      strictEqual(actual, index ? 'cba' : 'abc');
    });

    test('`_.' + methodName + '` should support the `thisArg` argument', 1, function() {
      var actual = func(array, function(sum, num, index) {
        return sum + this[index];
      }, 0, array);

      deepEqual(actual, 6);
    });

    test('`_.' + methodName + '` should support empty collections without an initial `accumulator` value', 1, function() {
      var actual = [],
          expected = _.map(empties, _.constant());

      _.each(empties, function(value) {
        try {
          actual.push(func(value, _.noop));
        } catch(e) {}
      });

      deepEqual(actual, expected);
    });

    test('`_.' + methodName + '` should support empty collections with an initial `accumulator` value', 1, function() {
      var expected = _.map(empties, _.constant('x'));

      var actual = _.map(empties, function(value) {
        try {
          return func(value, _.noop, 'x');
        } catch(e) {}
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
    test('should return elements the `predicate` returns falsey for', 1, function() {
      var actual = _.reject([1, 2, 3], function(num) {
        return num % 2;
      });

      deepEqual(actual, [2]);
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('filter methods');

  _.each(['filter', 'reject'], function(methodName, index) {
    var func = _[methodName],
        isFilter = !index;

    test('`_.' + methodName + '` should not modify the resulting value from within `predicate`', 1, function() {
      var actual = func([0], function(num, index, array) {
        array[index] = 1;
        return isFilter;
      });

      deepEqual(actual, [0]);
    });

    test('`_.' + methodName + '` should work in a lazy chain sequence', 2, function() {
      if (!isNpm) {
        var array = [1, 2, 3],
            object = { 'a': 1, 'b': 2, 'c': 3 },
            doubled = function(value) { return value * 2; },
            predicate = function(value) { return isFilter ? (value > 3) : (value < 3); };

        var expected = [4, 6],
            actual = _(array).map(doubled)[methodName](predicate).value();

        deepEqual(actual, expected);

        actual = _(object).mapValues(doubled)[methodName](predicate).value();
        deepEqual(actual, expected);
      }
      else {
        skipTest(2);
      }
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

    test('should provide the correct `predicate` arguments', 1, function() {
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
      var values = empties.concat(true, new Date, 1, /x/, 'a');

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

    test('should execute default function values', 1, function() {
      var actual = _.result(object, 'd', object.c);
      strictEqual(actual, 1);
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
        } catch(e) {}
      });

      deepEqual(actual, expected);
    });

    test('should exclude the first element', 1, function() {
      deepEqual(_.rest(array), [2, 3]);
    });

    test('should return an empty when querying empty arrays', 1, function() {
      deepEqual(_.rest([]), []);
    });

    test('should work as an iteratee for `_.map`', 1, function() {
      var array = [[1, 2, 3], [4, 5, 6], [7, 8, 9]],
          actual = _.map(array, _.rest);

      deepEqual(actual, [[2, 3], [5, 6], [8, 9]]);
    });

    test('should return a wrapped value when chaining', 2, function() {
      if (!isNpm) {
        var wrapped = _(array).rest();
        ok(wrapped instanceof _);
        deepEqual(wrapped.value(), [2, 3]);
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
      ok(_.includes(array, actual));
    });

    test('should return two random elements', 1, function() {
      var actual = _.sample(array, 2);
      ok(actual.length == 2 && actual[0] !== actual[1] && _.includes(array, actual[0]) && _.includes(array, actual[1]));
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

    test('should return an empty array for empty collections', 1, function() {
      var expected = _.transform(empties, function(result) {
        result.push(undefined, []);
      });

      var actual = [];
      _.each(empties, function(value) {
        try {
          actual.push(_.sample(value), _.sample(value, 1));
        } catch(e) {}
      });

      deepEqual(actual, expected);
    });

    test('should sample an object', 2, function() {
      var object = { 'a': 1, 'b': 2, 'c': 3 },
          actual = _.sample(object);

      ok(_.includes(array, actual));

      actual = _.sample(object, 2);
      ok(actual.length == 2 && actual[0] !== actual[1] && _.includes(array, actual[0]) && _.includes(array, actual[1]));
    });

    test('should work as an iteratee for `_.map`', 2, function() {
      _.each([[[1, 2, 3], [4, 5, 6], [7, 8, 9]], ['abc', 'def', 'ghi']], function(values) {
        var a = values[0],
            b = values[1],
            c = values[2],
            actual = _.map(values, _.sample);

        ok(_.includes(a, actual[0]) && _.includes(b, actual[1]) && _.includes(c, actual[2]));
      });
    });

    test('should return a wrapped value when chaining and `n` is provided', 2, function() {
      if (!isNpm) {
        var wrapped = _(array).sample(2);
        ok(wrapped instanceof _);

        var actual = wrapped.value();
        ok(actual.length == 2 && actual[0] !== actual[1] && _.includes(array, actual[0]) && _.includes(array, actual[1]));
      }
      else {
        skipTest(2);
      }
    });

    test('should return an unwrapped value when chaining and `n` is not provided', 1, function() {
      if (!isNpm) {
        var actual = _(array).sample();
        ok(_.includes(array, actual));
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
        ok(_.includes(collection, actual));

        actual = _.sample(collection, 2);
        ok(actual.length == 2 && actual[0] !== actual[1] && _.includes(collection, actual[0]) && _.includes(collection, actual[1]));
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

    test('should shuffle small collections', 1, function() {
      var actual = _.times(1000, function() {
        return _.shuffle([1, 2]);
      });

      deepEqual(_.sortBy(_.uniq(actual, String), '0'), [[1, 2], [2, 1]]);
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
        } catch(e) {}
      });

      deepEqual(actual, expected);
    });

    test('should work with `arguments` objects (test in IE < 9)', 1, function() {
      strictEqual(_.size(args), 3);
    });

    test('should work with jQuery/MooTools DOM query collections', 1, function() {
      function Foo(elements) { push.apply(this, elements); }
      Foo.prototype = { 'length': 0, 'splice': arrayProto.splice };

      strictEqual(_.size(new Foo(array)), 3);
    });

    test('should not treat objects with negative lengths as array-like', 1, function() {
      strictEqual(_.size({ 'length': -1 }), 1);
    });

    test('should not treat objects with lengths larger than `MAX_SAFE_INTEGER` as array-like', 1, function() {
      strictEqual(_.size({ 'length': MAX_SAFE_INTEGER + 1 }), 1);
    });

    test('should not treat objects with non-number lengths as array-like', 1, function() {
      strictEqual(_.size({ 'length': '0' }), 1);
    });

    test('fixes the JScript `[[DontEnum]]` bug (test in IE < 9)', 1, function() {
      strictEqual(_.size(shadowObject), 7);
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
        deepEqual(_.slice(array, start), array);
      });
    });

    test('should work with `start` >= `end`', 2, function() {
      _.each([2, 3], function(start) {
        deepEqual(_.slice(array, start, 2), []);
      });
    });

    test('should work with a positive `end`', 1, function() {
      deepEqual(_.slice(array, 0, 1), [1]);
    });

    test('should work with a `end` >= `array.length`', 4, function() {
      _.each([3, 4, Math.pow(2, 32), Infinity], function(end) {
        deepEqual(_.slice(array, 0, end), array);
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

    test('should work as an iteratee for `_.map`', 2, function() {
      var array = [[1], [2, 3]],
          actual = _.map(array, _.slice);

      deepEqual(actual, array);
      notStrictEqual(actual, array)
    });

    test('should work in a lazy chain sequence', 12, function() {
      if (!isNpm) {
        var wrapped = _(array);

        deepEqual(wrapped.slice(0, -1).value(), [1, 2]);
        deepEqual(wrapped.slice(1).value(), [2, 3]);
        deepEqual(wrapped.slice(-1).value(), [3]);

        deepEqual(wrapped.slice(4).value(), []);
        deepEqual(wrapped.slice(3, 2).value(), []);
        deepEqual(wrapped.slice(0, -4).value(), []);
        deepEqual(wrapped.slice(0, null).value(), []);

        deepEqual(wrapped.slice(0, 4).value(), array);
        deepEqual(wrapped.slice(-4).value(), array);
        deepEqual(wrapped.slice(null).value(), array);

        deepEqual(wrapped.slice(0, 1).value(), [1]);
        deepEqual(wrapped.slice(NaN, '1').value(), [1]);
      }
      else {
        skipTest(12);
      }
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.some');

  (function() {
    test('should return `false` for empty collections', 1, function() {
      var expected = _.map(empties, _.constant(false));

      var actual = _.map(empties, function(value) {
        try {
          return _.some(value, _.identity);
        } catch(e) {}
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

    test('should use `_.identity` when `predicate` is nullish', 2, function() {
      var values = [, null, undefined],
          expected = _.map(values, _.constant(false));

      var actual = _.map(values, function(value, index) {
        var array = [0, 0];
        return index ? _.some(array, value) : _.some(array);
      });

      deepEqual(actual, expected);

      expected = _.map(values, _.constant(true));
      actual = _.map(values, function(value, index) {
        var array = [0, 1];
        return index ? _.some(array, value) : _.some(array);
      });

      deepEqual(actual, expected);
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

    test('should use `_.identity` when `iteratee` is nullish', 1, function() {
      var array = [3, 2, 1],
          values = [, null, undefined],
          expected = _.map(values, _.constant([1, 2, 3]));

      var actual = _.map(values, function(value, index) {
        return index ? _.sortBy(array, value) : _.sortBy(array);
      });

      deepEqual(actual, expected);
    });

    test('should move `undefined` and `NaN` values to the end', 1, function() {
      var array = [NaN, undefined, 4, 1, undefined, 3, NaN, 2];
      deepEqual(_.sortBy(array), [1, 2, 3, 4, undefined, undefined, NaN, NaN]);
    });

    test('should provide the correct `iteratee` arguments', 1, function() {
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

    test('should work with a "_.pluck" style `iteratee`', 1, function() {
      var actual = _.pluck(_.sortBy(objects.concat(undefined), 'b'), 'b');
      deepEqual(actual, [1, 2, 3, 4, undefined]);
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

    test('should coerce arrays returned from `iteratee`', 1, function() {
      var actual = _.sortBy(objects, function(object) {
        var result = [object.a, object.b];
        result.toString = function() { return String(this[0]); };
        return result;
      });

      deepEqual(actual, [objects[0], objects[2], objects[1], objects[3]]);
    });

    test('should work as an iteratee for `_.map`', 1, function() {
      var actual = _.map([[2, 1, 3], [3, 2, 1]], _.sortBy);
      deepEqual(actual, [[1, 2, 3], [1, 2, 3]]);
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.sortByAll');

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

    test('should sort mutliple properties in ascending order', 1, function() {
      var actual = _.sortByAll(objects, ['a', 'b']);
      deepEqual(actual, [objects[2], objects[0], objects[3], objects[1]]);
    });

    test('should perform a stable sort (test in IE > 8, Opera, and V8)', 1, function() {
      var actual = _.sortByAll(stableOrder, ['a', 'c']);
      deepEqual(actual, stableOrder);
    });

    test('should not error on nullish elements', 1, function() {
      var actual = _.sortByAll(objects.concat(undefined), ['a', 'b']);
      deepEqual(actual, [objects[2], objects[0], objects[3], objects[1], undefined]);
    });

    test('should work as an iteratee for `_.reduce`', 1, function() {
      var objects = [
        { 'a': 'x', '0': 3 },
        { 'a': 'y', '0': 4 },
        { 'a': 'x', '0': 1 },
        { 'a': 'y', '0': 2 }
      ];

      var actual = _.reduce([['a']], _.sortByAll, objects);
      deepEqual(actual, [objects[0], objects[2], objects[1], objects[3]]);
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('sortedIndex methods');

  _.each(['sortedIndex', 'sortedLastIndex'], function(methodName, index) {
    var array = [30, 50],
        func = _[methodName],
        isSortedIndex = !index,
        objects = [{ 'x': 30 }, { 'x': 50 }];

    test('`_.' + methodName + '` should return the correct insert index', 1, function() {
      var array = [30, 50],
          values = [30, 40, 50],
          expected = isSortedIndex ? [0, 1, 1] : [1, 1, 2];

      var actual = _.map(values, function(value) {
        return func(array, value);
      });

      deepEqual(actual, expected);
    });

    test('`_.' + methodName + '` should work with an array of strings', 1, function() {
      var array = ['a', 'c'],
          values = ['a', 'b', 'c'],
          expected = isSortedIndex ? [0, 1, 1] : [1, 1, 2];

      var actual = _.map(values, function(value) {
        return func(array, value);
      });

      deepEqual(actual, expected);
    });

    test('`_.' + methodName + '` should accept a falsey `array` argument and a `value`', 1, function() {
      var expected = _.map(falsey, _.constant([0, 0, 0]));

      var actual = _.map(falsey, function(array) {
        return [func(array, 1), func(array, undefined), func(array, NaN)];
      });

      deepEqual(actual, expected);
    });

    test('`_.' + methodName + '` should provide the correct `iteratee` arguments', 1, function() {
      var args;

      func(array, 40, function() {
        args || (args = slice.call(arguments));
      });

      deepEqual(args, [40]);
    });

    test('`_.' + methodName + '` should support the `thisArg` argument', 1, function() {
      var actual = func(array, 40, function(num) {
        return this[num];
      }, { '30': 30, '40': 40, '50': 50 });

      strictEqual(actual, 1);
    });

    test('`_.' + methodName + '` should work with a "_.pluck" style `iteratee`', 1, function() {
      var actual = func(objects, { 'x': 40 }, 'x');
      strictEqual(actual, 1);
    });

    test('`_.' + methodName + '` should align with `_.sortBy`', 8, function() {
      var expected = [1, '2', {}, undefined, NaN, NaN];

      _.each([
        [NaN, 1, '2', {}, NaN, undefined],
        ['2', 1, NaN, {}, NaN, undefined]
      ], function(array) {
        deepEqual(_.sortBy(array), expected);
        strictEqual(func(expected, 3), 2);
        strictEqual(func(expected, undefined), isSortedIndex ? 3 : 4);
        strictEqual(func(expected, NaN), isSortedIndex ? 4 : 6);
      });
    });

    test('`_.' + methodName + '` should support arrays larger than `MAX_ARRAY_LENGTH / 2`', 12, function() {
      _.each([Math.ceil(MAX_ARRAY_LENGTH / 2), MAX_ARRAY_LENGTH], function(length) {
        var array = [],
            values = [MAX_ARRAY_LENGTH, NaN, undefined];

        array.length = length;

        _.each(values, function(value) {
          var steps = 0,
              actual = func(array, value, function(value) { steps++; return value; });

          var expected = (isSortedIndex ? !_.isNaN(value) : _.isFinite(value))
            ? 0
            : Math.min(length, MAX_ARRAY_INDEX)

          // Avoid false fails in older Firefox.
          if (array.length == length) {
            ok(steps == 32 || steps == 33);
            strictEqual(actual, expected);
          }
          else {
            skipTest(2);
          }
        });
      });
    });
  });

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
        'hostObject',
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
      _.each([3, 5, MAX_SAFE_INTEGER, Infinity], function(position) {
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

    test('should return `true` when `target` is an empty string regardless of `position`', 1, function() {
      ok(_.every([-Infinity, NaN, -3, -1, 0, 1, 2, 3, 5, MAX_SAFE_INTEGER, Infinity], function(position) {
        return _.startsWith(string, '', position, true);
      }));
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.startsWith and lodash.endsWith');

  _.each(['startsWith', 'endsWith'], function(methodName, index) {
    var func = _[methodName],
        isStartsWith = !index;

    var string = 'abc',
        chr = isStartsWith ? 'a' : 'c';

    test('`_.' + methodName + '` should coerce `string` to a string', 2, function() {
      strictEqual(func(Object(string), chr), true);
      strictEqual(func({ 'toString': _.constant(string) }, chr), true);
    });

    test('`_.' + methodName + '` should coerce `target` to a string', 2, function() {
      strictEqual(func(string, Object(chr)), true);
      strictEqual(func(string, { 'toString': _.constant(chr) }), true);
    });

    test('`_.' + methodName + '` should coerce `position` to a number', 2, function() {
      var position = isStartsWith ? 1 : 2;
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

    test('should intercept unwrapped values and return wrapped values when chaining', 2, function() {
      if (!isNpm) {
        var intercepted,
            array = [1, 2, 3];

        var wrapped = _(array).tap(function(value) {
          intercepted = value;
          value.pop();
        });

        ok(wrapped instanceof _);

        wrapped.value();
        strictEqual(intercepted, array);
      }
      else {
        skipTest(2);
      }
    });

    test('should support the `thisArg` argument', 1, function() {
      if (!isNpm) {
        var array = [1, 2];

        var wrapped = _(array.slice()).tap(function(value) {
          value.push(this[0]);
        }, array);

        deepEqual(wrapped.value(), [1, 2, 1]);
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
      var strings = ['<p><%- value %></p>', '<p><%-value%></p>', '<p><%-\nvalue\n%></p>'],
          expected = _.map(strings, _.constant('<p>&amp;&lt;&gt;&quot;&#39;&#96;\/</p>')),
          data = { 'value': '&<>"\'`\/' };

      var actual = _.map(strings, function(string) {
        return _.template(string)(data);
      });

      deepEqual(actual, expected);
    });

    test('should evaluate JavaScript in "evaluate" delimiters', 1, function() {
      var compiled = _.template(
        '<ul><%\
        for (var key in collection) {\
          %><li><%= collection[key] %></li><%\
        } %></ul>'
      );

      var data = { 'collection': { 'a': 'A', 'b': 'B' } },
          actual = compiled(data);

      strictEqual(actual, '<ul><li>A</li><li>B</li></ul>');
    });

    test('should interpolate data object properties', 1, function() {
      var strings = ['<%= a %>BC', '<%=a%>BC', '<%=\na\n%>BC'],
          expected = _.map(strings, _.constant('ABC')),
          data = { 'a': 'A' };

      var actual = _.map(strings, function(string) {
        return _.template(string)(data);
      });

      deepEqual(actual, expected);
    });

    test('should support escaped values in "interpolation" delimiters', 1, function() {
      var compiled = _.template('<%= a ? "a=\\"A\\"" : "" %>'),
          data = { 'a': true };

      strictEqual(compiled(data), 'a="A"');
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
      } catch(e) {}

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
      var compiled = _.template('<% // A code comment. %><% if (value) { %>yap<% } else { %>nope<% } %>'),
          data = { 'value': true };

      strictEqual(compiled(data), 'yap');
    });

    test('should work with custom delimiters', 2, function() {
      _.times(2, function(index) {
        var settingsClone = _.clone(_.templateSettings);

        var settings = _.assign(index ? _.templateSettings : {}, {
          'escape': /\{\{-([\s\S]+?)\}\}/g,
          'evaluate': /\{\{([\s\S]+?)\}\}/g,
          'interpolate': /\{\{=([\s\S]+?)\}\}/g
        });

        var compiled = _.template('<ul>{{ _.each(collection, function(value, index) {}}<li>{{= index }}: {{- value }}</li>{{}); }}</ul>', index ? null : settings),
            expected = '<ul><li>0: a &amp; A</li><li>1: b &amp; B</li></ul>',
            data = { 'collection': ['a & A', 'b & B'] };

        strictEqual(compiled(data), expected);
        _.assign(_.templateSettings, settingsClone);
      });
    });

    test('should work with custom delimiters containing special characters', 2, function() {
      _.times(2, function(index) {
        var settingsClone = _.clone(_.templateSettings);

        var settings = _.assign(index ? _.templateSettings : {}, {
          'escape': /<\?-([\s\S]+?)\?>/g,
          'evaluate': /<\?([\s\S]+?)\?>/g,
          'interpolate': /<\?=([\s\S]+?)\?>/g
        });

        var compiled = _.template('<ul><? _.each(collection, function(value, index) { ?><li><?= index ?>: <?- value ?></li><? }); ?></ul>', index ? null : settings),
            expected = '<ul><li>0: a &amp; A</li><li>1: b &amp; B</li></ul>',
            data = { 'collection': ['a & A', 'b & B'] };

        strictEqual(compiled(data), expected);
        _.assign(_.templateSettings, settingsClone);
      });
    });

    test('should work with strings without delimiters', 1, function() {
      var expected = 'abc';
      strictEqual(_.template(expected)({}), expected);
    });

    test('should support the "imports" option', 1, function() {
      var compiled = _.template('<%= a %>', { 'imports': { 'a': 1 } });
      strictEqual(compiled({}), '1');
    });

    test('should support the "variable" options', 1, function() {
      var compiled = _.template(
        '<% _.each( data.a, function( value ) { %>' +
            '<%= value.valueOf() %>' +
        '<% }) %>', { 'variable': 'data' }
      );

      var data = { 'a': [1, 2, 3] };

      try {
        strictEqual(compiled(data), '123');
      } catch(e) {
        ok(false, e.message);
      }
    });

    test('should support the legacy `options` param signature', 1, function() {
      var compiled = _.template('<%= data.a %>', null, { 'variable': 'data' }),
          data = { 'a': 1 };

      strictEqual(compiled(data), '1');
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
      var compiled = _.template('<%= a %> \\b'),
          data = { 'a': 'A' };

      strictEqual(compiled(data), 'A \\b');
    });

    test('should work with escaped characters in string literals', 2, function() {
      var compiled = _.template('<% print("\'\\n\\r\\t\\u2028\\u2029\\\\") %>');
      strictEqual(compiled(), "'\n\r\t\u2028\u2029\\");

      var data = { 'a': 'A' };
      compiled = _.template('\'\n\r\t<%= a %>\u2028\u2029\\"')
      strictEqual(compiled(data), '\'\n\r\tA\u2028\u2029\\"');
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

      var data = { 'a': 'A' };
      strictEqual(compiled(data), "'a',\"A\"");
    });

    test('should work with templates containing newlines and comments', 1, function() {
      var compiled = _.template('<%\n\
        // A code comment.\n\
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
          compiled = _.template('<%= func("a") %><%- func("b") %><% func("c") %>'),
          data = { 'func': function(value) { actual.push(value); } };

      compiled(data);
      deepEqual(actual, ['a', 'b', 'c']);
    });

    test('should match delimiters before escaping text', 1, function() {
      var compiled = _.template('<<\n a \n>>', { 'evaluate': /<<(.*?)>>/g });
      strictEqual(compiled(), '<<\n a \n>>');
    });

    test('should resolve `null` and `undefined` values to an empty string', 3, function() {
      var compiled = _.template('<%= a %><%- a %>'),
          data = { 'a': null };

      strictEqual(compiled(data), '');

      data = { 'a': undefined };
      strictEqual(compiled(data), '');

      data = { 'a': {} };
      compiled = _.template('<%= a.b %><%- a.b %>');
      strictEqual(compiled(data), '');
    });

    test('should parse delimiters without newlines', 1, function() {
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
      var object = { 'toString': function() { return '<%= a %>'; } },
          data = { 'a': 1 };

      strictEqual(_.template(object)(data), '1');
    });

    test('should not augment the `options` object', 1, function() {
      var options = {};
      _.template('', options);
      deepEqual(options, {});
    });

    test('should not modify `_.templateSettings` when `options` are provided', 2, function() {
      var data = { 'a': 1 };

      ok(!('a' in _.templateSettings));
      _.template('', {}, data);
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

    test('should expose the source for compiled templates', 1, function() {
      var compiled = _.template('x'),
          values = [String(compiled), compiled.source],
          expected = _.map(values, _.constant(true));

      var actual = _.map(values, function(value) {
        return _.includes(value, '__p');
      });

      deepEqual(actual, expected);
    });

    test('should expose the source when a SyntaxError occurs', 1, function() {
      try {
        _.template('<% if x %>');
      } catch(e) {
        var source = e.source;
      }
      ok(_.includes(source, '__p'));
    });

    test('should not include sourceURLs in the source', 1, function() {
      var options = { 'sourceURL': '/a/b/c' },
          compiled = _.template('x', options),
          values = [compiled.source, undefined];

      try {
        _.template('<% if x %>', options);
      } catch(e) {
        values[1] = e.source;
      }
      var expected = _.map(values, _.constant(false));

      var actual = _.map(values, function(value) {
        return _.includes(value, 'sourceURL');
      });

      deepEqual(actual, expected);
    });

    test('should work as an iteratee for `_.map`', 1, function() {
      var array = ['<%= a %>', '<%- b %>', '<% print(c) %>'],
          compiles = _.map(array, _.template),
          data = { 'a': 'one', 'b': '`two`', 'c': 'three' };

      var actual = _.map(compiles, function(compiled) {
        return compiled(data);
      });

      deepEqual(actual, ['one', '&#96;two&#96;', 'three']);
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

    test('should work as an iteratee for `_.map`', 1, function() {
      var actual = _.map([string, string, string], _.trunc),
          truncated = 'hi-diddly-ho there, neighbo...';

      deepEqual(actual, [truncated, truncated, truncated]);
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
          return ++dateCount == 5 ? Infinity : +new Date;
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

  _.each(['debounce', 'throttle'], function(methodName, index) {
    var func = _[methodName],
        isDebounce = !index;

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
            expected = _.times(isDebounce ? 1 : 2, _.constant(object));

        object.funced();
        if (!isDebounce) {
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
            length = isDebounce ? 1 : 2,
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
        }, 64);

        var next = queue.shift();
        funced.call(next[0], next[1]);
        deepEqual(actual, expected.slice(0, length - 1));

        setTimeout(function() {
          deepEqual(actual, expected);
          QUnit.start();
        }, 96);
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
          return ++dateCount === 4 ? +new Date(2012, 3, 23, 23, 27, 18) : +new Date;
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
          strictEqual(callCount, isDebounce ? 1 : 2);
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
        } catch(e) {}

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
    test('should coerce non-finite `n` values to `0`', 3, function() {
      _.each([-Infinity, NaN, Infinity], function(n) {
        deepEqual(_.times(n), []);
      });
    });

    test('should provide the correct `iteratee` arguments', 1, function() {
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

    test('should use `_.identity` when `iteratee` is nullish', 1, function() {
      var values = [, null, undefined],
          expected = _.map(values, _.constant([0, 1, 2]));

      var actual = _.map(values, function(value, index) {
        return index ? _.times(3, value) : _.times(3);
      });

      deepEqual(actual, expected);
    });

    test('should return an array of the results of each `iteratee` execution', 1, function() {
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
        var wrapped = _(3).times();
        ok(wrapped instanceof _);
        deepEqual(wrapped.value(), [0, 1, 2]);
      }
      else {
        skipTest(2);
      }
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.transform');

  (function() {
    test('should create an object with the same `[[Prototype]]` as `object` when `accumulator` is `null` or `undefined`', 4, function() {
      function Foo() {
        this.a = 1;
        this.b = 2;
        this.c = 3;
      }

      var accumulators = [, null, undefined],
          expected = _.map(accumulators, _.constant(true)),
          object = new Foo;

      var iteratee = function(result, value, key) {
        result[key] = value * value;
      };

      var mapper = function(accumulator, index) {
        return index ? _.transform(object, iteratee, accumulator) : _.transform(object, iteratee);
      };

      var results = _.map(accumulators, mapper);

      var actual = _.map(results, function(result) {
        return result instanceof Foo;
      });

      deepEqual(actual, expected);

      expected = _.map(accumulators, _.constant({ 'a': 1, 'b': 4, 'c': 9 }));
      actual = _.map(results, _.clone);

      deepEqual(actual, expected);

      object = { 'a': 1, 'b': 2, 'c': 3 };
      actual = _.map(accumulators, mapper);

      deepEqual(actual, expected);

      object = [1, 2, 3];
      expected = _.map(accumulators, _.constant([1, 4, 9]));
      actual = _.map(accumulators, mapper);

      deepEqual(actual, expected);
    });

    test('should treat sparse arrays as dense', 1, function() {
      var actual = _.transform(Array(1), function(result, value, index) {
        result[index] = String(value);
      });

      deepEqual(actual, ['undefined']);
    });

    test('should work without an `iteratee` argument', 1, function() {
      function Foo() {}
      ok(_.transform(new Foo) instanceof Foo);
    });

    test('should check that `object` is an object before using its `[[Prototype]]`', 2, function() {
      var Ctors = [Boolean, Boolean, Number, Number, Number, String, String],
          values = [true, false, 0, 1, NaN, '', 'a'],
          expected = _.map(values, _.constant({}));

      var results = _.map(values, function(value, index) {
        return index ? _.transform(value) : _.transform();
      });

      deepEqual(results, expected);

      expected = _.map(values, _.constant(false));

      var actual = _.map(results, function(value, index) {
        return value instanceof Ctors[index];
      });

      deepEqual(actual, expected);
    });

    test('should create an empty object when provided a falsey `object` argument', 1, function() {
      var expected = _.map(falsey, _.constant({}));

      var actual = _.map(falsey, function(value, index) {
        return index ? _.transform(value) : _.transform();
      });

      deepEqual(actual, expected);
    });

    _.each({
      'array': [1, 2, 3],
      'object': { 'a': 1, 'b': 2, 'c': 3 }
    },
    function(object, key) {
      test('should provide the correct `iteratee` arguments when transforming an ' + key, 2, function() {
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

    test('should create an object from the same realm as `object`', 1, function() {
      var objects = _.transform(_, function(result, value, key) {
        if (_.startsWith(key, '_') && _.isObject(value) && !_.isElement(value)) {
          result.push(value);
        }
      }, []);

      var expected = _.times(objects.length, _.constant(true));

      var actual = _.map(objects, function(object) {
        var Ctor = object.constructor,
            result = _.transform(object);

        if (result === object) {
          return false;
        }
        if (typeof object.length == 'number' &&
            !_.isArray(object) && !_.isFunction(object) && !_.isString(object)) {
          return result instanceof Array;
        }
        return result instanceof Ctor || !(new Ctor instanceof Ctor);
      });

      deepEqual(actual, expected);
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
      // Zero-width space (zws), next line character (nel), and non-character (bom) are not whitespace.
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

    test('`_.' + methodName + '` should work as an iteratee for `_.map`', 1, function() {
      var string = Object(whitespace + 'a b c' + whitespace),
          trimmed = (index == 2 ? whitespace : '') + 'a b c' + (index == 1 ? whitespace : ''),
          actual = _.map([string, string, string], func);

      deepEqual(actual, [trimmed, trimmed, trimmed]);
    });

    test('`_.' + methodName + '` should return an unwrapped value when chaining', 1, function() {
      if (!isNpm) {
        var string = whitespace + 'a b c' + whitespace,
            expected = (index == 2 ? whitespace : '') + 'a b c' + (index == 1 ? whitespace : '');

        strictEqual(_(string)[methodName](), expected);
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

    escaped += escaped;
    unescaped += unescaped;

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

    test('should treat object instances as unique', 1, function() {
      deepEqual(_.uniq(objects), objects);
    });

    test('should not treat `NaN` as unique', 1, function() {
      deepEqual(_.uniq([1, NaN, 3, NaN]), [1, NaN, 3]);
    });

    test('should work with `isSorted`', 3, function() {
      var expected = [1, 2, 3];
      deepEqual(_.uniq([1, 2, 3], true), expected);
      deepEqual(_.uniq([1, 1, 2, 2, 3], true), expected);
      deepEqual(_.uniq([1, 2, 3, 3, 3, 3, 3], true), expected);
    });

    test('should work with `iteratee`', 2, function() {
      _.each([objects, _.sortBy(objects, 'a')], function(array, index) {
        var isSorted = !!index,
            expected = isSorted ? [objects[2], objects[0], objects[1]] : objects.slice(0, 3);

        var actual = _.uniq(array, isSorted, function(object) {
          return object.a;
        });

        deepEqual(actual, expected);
      });
    });

    test('should work with `iteratee` without specifying `isSorted`', 1, function() {
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

    test('should work with a "_.pluck" style `iteratee`', 2, function() {
      var actual = _.uniq(objects, 'a');

      deepEqual(actual, objects.slice(0, 3));

      var arrays = [[2], [3], [1], [2], [3], [1]];
      actual = _.uniq(arrays, 0);

      deepEqual(actual, arrays.slice(0, 3));
    });

    test('should perform an unsorted uniq when used as an iteratee for `_.map`', 1, function() {
      var array = [[2, 1, 2], [1, 2, 1]],
          actual = _.map(array, _.uniq);

      deepEqual(actual, [[2, 1], [1, 2]]);
    });

    test('should work with large arrays', 1, function() {
      var object = {};

      var largeArray = _.times(LARGE_ARRAY_SIZE, function(index) {
        switch (index % 3) {
          case 0: return 0;
          case 1: return 'a';
          case 2: return object;
        }
      });

      deepEqual(_.uniq(largeArray), [0, 'a', object]);
    });

    test('should work with large arrays of boolean, `NaN`, `null`, and `undefined` values', 1, function() {
      var array = [],
          expected = [true, false, NaN, null, undefined],
          count = Math.ceil(LARGE_ARRAY_SIZE / expected.length);

      _.times(count, function() {
        push.apply(array, expected);
      });

      deepEqual(_.uniq(array), expected);
    });

    test('should distinguish between numbers and numeric strings', 1, function() {
      var array = [],
          expected = ['2', 2, Object('2'), Object(2)],
          count = Math.ceil(LARGE_ARRAY_SIZE / expected.length);

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
      test('should work with ' + key + ' for `iteratee`', 1, function() {
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
    test('should filter by `source` properties', 12, function() {
      var objects = [
        { 'a': 1 },
        { 'a': 1 },
        { 'a': 1, 'b': 2 },
        { 'a': 2, 'b': 2 },
        { 'a': 3 }
      ];

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

    test('should work with an object for `collection`', 1, function() {
      var object = {
        'x': { 'a': 1 },
        'y': { 'a': 3 },
        'z': { 'a': 1, 'b': 2 }
      };

      var actual = _.where(object, { 'a': 1 }),
          expected = [object.x, object.z];

      deepEqual(actual, expected);
    });

    test('should work in a lazy chain sequence', 1, function() {
      if (!isNpm) {
        var array = [
          { 'a': 1 },
          { 'a': 3 },
          { 'a': 1, 'b': 2 }
        ];

        var actual = _(array).where({ 'a': 1 }).value();
        deepEqual(actual, [array[0], array[2]]);
      }
      else {
        skipTest();
      }
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

  QUnit.module('lodash.words');

  (function() {
    test('should treat latin-1 supplementary letters as words', 1, function() {
      var expected = _.map(burredLetters, function(letter) {
        return [letter];
      });

      var actual = _.map(burredLetters, function(letter) {
        return _.words(letter);
      });

      deepEqual(actual, expected);
    });

    test('should not treat mathematical operators as words', 1, function() {
      var operators = ['\xd7', '\xf7'],
          expected = _.map(operators, _.constant([])),
          actual = _.map(operators, _.words);

      deepEqual(actual, expected);
    });

    test('should work as an iteratee for `_.map`', 1, function() {
      var strings = _.map(['a', 'b', 'c'], Object),
          actual = _.map(strings, _.words);

      deepEqual(actual, [['a'], ['b'], ['c']]);
    });

    test('should work with compound words', 6, function() {
      deepEqual(_.words('LETTERSAeiouAreVowels'), ['LETTERS', 'Aeiou', 'Are', 'Vowels']);
      deepEqual(_.words('aeiouAreVowels'), ['aeiou', 'Are', 'Vowels']);
      deepEqual(_.words('aeiou2Consonants'), ['aeiou', '2', 'Consonants']);

      deepEqual(_.words('LETTERSÆiouAreVowels'), ['LETTERS', 'Æiou', 'Are', 'Vowels']);
      deepEqual(_.words('æiouAreVowels'), ['æiou', 'Are', 'Vowels']);
      deepEqual(_.words('æiou2Consonants'), ['æiou', '2', 'Consonants']);
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

    test('should provide the correct `wrapper` arguments', 1, function() {
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

    test('should use `_.identity` when `wrapper` is nullish', 1, function() {
      var values = [, null, undefined],
          expected = _.map(values, _.constant('a'));

      var actual = _.map(values, function(value, index) {
        var wrapped = index ? _.wrap('a', value) : _.wrap('a');
        return wrapped('b', 'c');
      });

      deepEqual(actual, expected);
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
        var wrapped = _([1, 2, 3]).xor([5, 2, 1, 4]);
        ok(wrapped instanceof _);
        deepEqual(wrapped.value(), [3, 5, 4]);
      }
      else {
        skipTest(2);
      }
    });

    test('should work when in a lazy chain sequence before `first` or `last`', 1, function() {
      if (!isNpm) {
        var wrapped = _([1, 2]).slice().xor([2, 3]);

        var actual = _.map(['first', 'last'], function(methodName) {
          return wrapped[methodName]();
        });

        deepEqual(actual, [1, 3]);
      }
      else {
        skipTest();
      }
    });
  }(1, 2, 3));

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.unzip and lodash.zip');

  _.each(['unzip', 'zip'], function(methodName, index) {
    var func = _[methodName];
    func = _.bind(index ? func.apply : func.call, func, null);

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
      test('`_.' + methodName + '` should work with ' + key, 2, function() {
        var actual = func(pair[0]);
        deepEqual(actual, pair[1]);
        deepEqual(func(actual), actual.length ? pair[0] : []);
      });
    });

    test('`_.' + methodName + '` should work with tuples of different lengths', 4, function() {
      var pair = [
        [['barney', 36], ['fred', 40, false]],
        [['barney', 'fred'], [36, 40], [undefined, false]]
      ];

      var actual = func(pair[0]);
      ok('0' in actual[2]);
      deepEqual(actual, pair[1]);

      actual = func(actual);
      ok('2' in actual[0]);
      deepEqual(actual, [['barney', 36, undefined], ['fred', 40, false]]);
    });

    test('`_.' + methodName + '` should treat falsey values as empty arrays', 1, function() {
      var expected = _.map(falsey, _.constant([]));

      var actual = _.map(falsey, function(value) {
        return func([value, value, value]);
      });

      deepEqual(actual, expected);
    });

    test('`_.' + methodName + '` should support consuming its return value', 1, function() {
      var expected = [['barney', 'fred'], [36, 40]];
      deepEqual(func(func(func(func(expected)))), expected);
    });
  });

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
        } catch(e) {}
      });

      deepEqual(actual, expected);
    });

    test('should support consuming the return value of `_.pairs`', 1, function() {
      deepEqual(_.zipObject(_.pairs(object)), object);
    });

    test('should work in a lazy chain sequence', 1, function() {
      if (!isNpm) {
        var array = [['a', 1], ['b', 2]],
            predicate = function(value) { return value > 1; },
            actual = _(array).zipObject().map(String).filter(predicate).take().value();

        deepEqual(actual, ['2']);
      }
      else {
        skipTest();
      }
    });

    test('should be aliased', 1, function() {
      strictEqual(_.object, _.zipObject);
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash(...).concat');

  (function() {
    test('should return a new wrapped array', 3, function() {
      if (!isNpm) {
        var array = [1],
            wrapped = _(array).concat([2, 3]),
            actual = wrapped.value();

        notStrictEqual(actual, array);
        deepEqual(actual, [1, 2, 3]);
        deepEqual(array, [1]);
      }
      else {
        skipTest(3);
      }
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash(...).join');

  (function() {
    test('should return join all array elements into a string', 2, function() {
      if (!isNpm) {
        var array = [1, 2, 3],
            wrapped = _(array),
            actual = wrapped.join('.');

        strictEqual(actual, '1.2.3');
        strictEqual(wrapped.value(), array);
      }
      else {
        skipTest(2);
      }
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash(...).pop');

  (function() {
    test('should remove elements from the end of `array`', 5, function() {
      if (!isNpm) {
        var array = [1, 2],
            wrapped = _(array);

        strictEqual(wrapped.pop(), 2);
        deepEqual(wrapped.value(), [1]);
        strictEqual(wrapped.pop(), 1);

        var actual = wrapped.value();
        strictEqual(actual, array);
        deepEqual(actual, []);
      }
      else {
        skipTest(5);
      }
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash(...).push');

  (function() {
      test('should append elements to `array`', 2, function() {
      if (!isNpm) {
        var array = [1],
            wrapped = _(array).push(2, 3),
            actual = wrapped.value();

        strictEqual(actual, array);
        deepEqual(actual, [1, 2, 3]);
      }
      else {
        skipTest(2);
      }
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash(...).reverse');

  (function() {
    test('should return the wrapped reversed `array`', 3, function() {
      if (!isNpm) {
        var array = [1, 2, 3],
            wrapped = _(array).reverse(),
            actual = wrapped.value();

        ok(wrapped instanceof _);
        strictEqual(actual, array);
        deepEqual(actual, [3, 2, 1]);
      }
      else {
        skipTest(3);
      }
    });

    test('should be lazy when in a lazy chain sequence', 2, function() {
      if (!isNpm) {
        var spy = {
          'toString': function() {
            throw new Error('Spy was revealed');
          }
        };

        try {
          var wrapped = _(['a', spy]).map(String).reverse(),
              actual = wrapped.last();
        } catch(e) {}

        ok(wrapped instanceof _);
        strictEqual(actual, 'a');
      }
      else {
        skipTest(2);
      }
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash(...).shift');

  (function() {
    test('should remove elements from the front of `array`', 5, function() {
      if (!isNpm) {
        var array = [1, 2],
            wrapped = _(array);

        strictEqual(wrapped.shift(), 1);
        deepEqual(wrapped.value(), [2]);
        strictEqual(wrapped.shift(), 2);

        var actual = wrapped.value();
        strictEqual(actual, array);
        deepEqual(actual, []);
      }
      else {
        skipTest(5);
      }
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash(...).slice');

  (function() {
    test('should return a slice of `array`', 3, function() {
      if (!isNpm) {
        var array = [1, 2, 3],
            wrapped = _(array).slice(0, 2),
            actual = wrapped.value();

        notStrictEqual(actual, array);
        deepEqual(actual, [1, 2]);
        deepEqual(array, [1, 2, 3]);
      }
      else {
        skipTest(3);
      }
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash(...).sort');

  (function() {
    test('should return the wrapped sorted `array`', 2, function() {
      if (!isNpm) {
        var array = [3, 1, 2],
            wrapped = _(array).sort(),
            actual = wrapped.value();

        strictEqual(actual, array);
        deepEqual(actual, [1, 2, 3]);
      }
      else {
        skipTest(2);
      }
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash(...).splice');

  (function() {
    test('should support removing and inserting elements', 5, function() {
      if (!isNpm) {
        var array = [1, 2],
            wrapped = _(array);

        deepEqual(wrapped.splice(1, 1, 3).value(), [2]);
        deepEqual(wrapped.value(), [1, 3]);

        deepEqual(wrapped.splice(0, 2).value(), [1, 3]);

        var actual = wrapped.value();
        strictEqual(actual, array);
        deepEqual(actual, []);
      }
      else {
        skipTest(5);
      }
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash(...).unshift');

  (function() {
    test('should prepend elements to `array`', 2, function() {
      if (!isNpm) {
        var array = [3],
            wrapped = _(array).unshift(1, 2),
            actual = wrapped.value();

        strictEqual(actual, array);
        deepEqual(actual, [1, 2, 3]);
      }
      else {
        skipTest(2);
      }
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('splice objects');

  _.each(['pop', 'shift', 'splice'], function(methodName) {
    test('`_(...).' + methodName + '` should remove the value at index `0` when length is `0` (test in IE 8 compatibility mode)', 2, function() {
      if (!isNpm) {
        var wrapped = _({ '0': 1, 'length': 1 });
        if (methodName == 'splice') {
          wrapped.splice(0, 1).value();
        } else {
          wrapped[methodName]();
        }
        deepEqual(wrapped.keys().value(), ['length']);
        strictEqual(wrapped.first(), undefined);
      }
      else {
        skipTest(2);
      }
    });
  });

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

    test('should stringify the wrapped value when used by `JSON.stringify`', 1, function() {
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

  QUnit.module('lodash(...) methods that return the wrapped modified array');

  (function() {
    var funcs = [
      'push',
      'reverse',
      'sort',
      'unshift'
    ];

    _.each(funcs, function(methodName) {
      test('`_(...).' + methodName + '` should return a new wrapper', 2, function() {

        if (!isNpm) {
          var array = [1, 2, 3],
              wrapped = _(array),
              actual = wrapped[methodName]();

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

  QUnit.module('lodash(...) methods that return new wrapped values');

  (function() {
    var funcs = [
      'concat',
      'slice',
      'splice'
    ];

    _.each(funcs, function(methodName) {
      test('`_(...).' + methodName + '` should return a new wrapped value', 2, function() {
        if (!isNpm) {
          var array = [1, 2, 3],
              wrapped = _(array),
              actual = wrapped[methodName]();

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
      'parseInt',
      'pop',
      'shift',
      'random',
      'reduce',
      'reduceRight',
      'some'
    ];

    _.each(funcs, function(methodName) {
      test('`_(...).' + methodName + '` should return an unwrapped value when intuitively chaining', 1, function() {
        if (!isNpm) {
          var array = [1, 2, 3],
              actual = _(array)[methodName]();

          ok(!(actual instanceof _));
        }
        else {
          skipTest();
        }
      });

      test('`_(...).' + methodName + '` should return a wrapped value when explicitly chaining', 1, function() {
        if (!isNpm) {
          var array = [1, 2, 3],
              actual = _(array).chain()[methodName]();

          ok(actual instanceof _);
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

    test('should work with `arguments` objects', 29, function() {
      function message(methodName) {
        return '`_.' + methodName + '` should work with `arguments` objects';
      }

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
      return _.startsWith(methodName, '_');
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
      'sortByAll',
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
      'ary',
      'backflow',
      'before',
      'bind',
      'compose',
      'curry',
      'curryRight',
      'debounce',
      'defer',
      'delay',
      'flow',
      'flowRight',
      'memoize',
      'negate',
      'once',
      'partial',
      'partialRight',
      'rearg',
      'tap',
      'throttle',
      'thru'
    ];

    var acceptFalsey = _.difference(allMethods, rejectFalsey);

    test('should accept falsey arguments', 203, function() {
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
        if (_.includes(returnArrays, methodName) && methodName != 'sample') {
          deepEqual(actual, expected, '_.' + methodName + ' returns an array');
        }
        ok(pass, '`_.' + methodName + '` accepts falsey arguments');
      });

      // Skip tests for missing methods of modularized builds.
      _.each(['chain', 'noConflict', 'runInContext'], function(methodName) {
        if (!_[methodName]) {
          skipTest();
        }
      });
    });

    test('should return an array', 70, function() {
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

    test('should throw a TypeError for falsey arguments', 22, function() {
      _.each(rejectFalsey, function(methodName) {
        var expected = _.map(falsey, _.constant(true)),
            func = _[methodName];

        var actual = _.map(falsey, function(value, index) {
          var pass = !index && /^(?:backflow|compose|flow(Right)?)$/.test(methodName);
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

    test('should handle `null` `thisArg` arguments', 44, function() {
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
        'thru',
        'uniq'
      ];

      _.each(funcs, function(methodName) {
        var actual,
            array = ['a'],
            callback = function() { actual = this; },
            func = _[methodName],
            message = '`_.' + methodName + '` handles `null` `thisArg` arguments';

        if (func) {
          if (_.startsWith(methodName, 'reduce') || methodName == 'transform') {
            func(array, callback, 0, null);
          } else if (_.includes(['assign', 'merge'], methodName)) {
            func(array, array, callback, null);
          } else if (_.includes(['isEqual', 'sortedIndex'], methodName)) {
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

  if (document) {
    QUnit.begin(function() {
      QUnit.config.hidepassed = true;
      document.getElementById('qunit-tests').className += ' hidepass';
      document.getElementById('qunit-urlconfig-hidepassed').checked = true;
    });
  } else {
    QUnit.config.hidepassed = true;
    QUnit.config.noglobals = true;
    QUnit.load();
  }
}.call(this));
