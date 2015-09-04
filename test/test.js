;(function() {

  /** Used as a safe reference for `undefined` in pre-ES5 environments. */
  var undefined;

  /** Used to detect when a function becomes hot. */
  var HOT_COUNT = 150;

  /** Used as the size to cover large array optimizations. */
  var LARGE_ARRAY_SIZE = 200;

  /** Used as the `TypeError` message for "Functions" methods. */
  var FUNC_ERROR_TEXT = 'Expected a function';

  /** Used as references for the max length and index of an array. */
  var MAX_ARRAY_LENGTH = Math.pow(2, 32) - 1,
      MAX_ARRAY_INDEX =  MAX_ARRAY_LENGTH - 1;

  /** Used as the maximum length an array-like object. */
  var MAX_SAFE_INTEGER = Math.pow(2, 53) - 1;

  /** `Object#toString` result references. */
  var funcTag = '[object Function]',
      numberTag = '[object Number]',
      objectTag = '[object Object]';

  /** Used as a reference to the global object. */
  var root = (typeof global == 'object' && global) || this;

  /** Used to store lodash to test for bad extensions/shims. */
  var lodashBizarro = root.lodashBizarro;

  /** Used for native method references. */
  var arrayProto = Array.prototype,
      errorProto = Error.prototype,
      funcProto = Function.prototype,
      objectProto = Object.prototype,
      numberProto = Number.prototype,
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
      JSON = root.JSON,
      Map = root.Map,
      noop = function() {},
      objToString = objectProto.toString,
      params = root.arguments,
      push = arrayProto.push,
      Set = root.Set,
      slice = arrayProto.slice,
      Symbol = root.Symbol,
      system = root.system,
      Uint8Array = root.Uint8Array,
      WeakMap = root.WeakMap;

  /** Math helpers. */
  var add = function(x, y) { return x + y; },
      doubled = function(n) { return n * 2; },
      isEven = function(n) { return n % 2 == 0; },
      square = function(n) { return n * n; };

  /** Used to set property descriptors. */
  var defineProperty = (function() {
    try {
      var o = {},
          func = Object.defineProperty,
          result = func(o, o, o) && func;
    } catch (e) {}
    return result;
  }());

  /** The file path of the lodash file to test. */
  var filePath = (function() {
    var min = 0,
        result = [];

    if (phantom) {
      result = params = phantom.args || require('system').args;
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
      } catch (e) {}

      try {
        result = require.resolve(result);
      } catch (e) {}
    }
    return result;
  }());

  /** The `ui` object. */
  var ui = root.ui || (root.ui = {
    'buildPath': filePath,
    'loaderPath': '',
    'isModularize': /\b(?:amd|commonjs|es6?|node|npm|(index|main)\.js)\b/.test(filePath),
    'isStrict': /\bes6?\b/.test(filePath),
    'urlParams': {}
  });

  /** The basename of the lodash file to test. */
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

  /** Detect if lodash is in strict mode. */
  var isStrict = ui.isStrict;

  /*--------------------------------------------------------------------------*/

  // Exit early if going to run tests in a PhantomJS web page.
  if (phantom && isModularize) {
    var page = require('webpage').create();

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

    page.open(filePath, function(status) {
      if (status != 'success') {
        console.log('PhantomJS failed to load page: ' + filePath);
        phantom.exit(1);
      }
    });

    console.log('test.js invoked with arguments: ' + JSON.stringify(slice.call(params)));
    return;
  }

  /*--------------------------------------------------------------------------*/

  /** Used to test Web Workers. */
  var Worker = !(ui.isForeign || ui.isSauceLabs || isModularize) && (document && document.origin != 'null') && root.Worker;

  /** Used to test host objects in IE. */
  try {
    var xml = new ActiveXObject('Microsoft.XMLDOM');
  } catch (e) {}

  /** Poison the free variable `root` in Node.js */
  try {
    Object.defineProperty(global.root, 'root', {
      'configurable': true,
      'enumerable': false,
      'get': function() { throw new ReferenceError; }
    });
  } catch (e) {}

  /** Use a single "load" function. */
  var load = (!amd && typeof require == 'function')
    ? require
    : (isJava ? root.load : noop);

  /** The unit testing framework. */
  var QUnit = root.QUnit || (root.QUnit = (
    QUnit = load('../node_modules/qunitjs/qunit/qunit.js') || root.QUnit,
    QUnit = QUnit.QUnit || QUnit
  ));

  /** Load QUnit Extras and ES6 Set/WeakMap shims. */
  (function() {
    var paths = [
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

  /** The `lodash` function to test. */
  var _ = root._ || (root._ = (
    _ = load(filePath) || root._,
    _ = _._ || (isStrict = ui.isStrict = isStrict || 'default' in _, _['default']) || _,
    (_.runInContext ? _.runInContext(root) : _)
  ));

  /** Used to restore the `_` reference. */
  var oldDash = root._;

  /** List of latin-1 supplementary letters to basic latin letters. */
  var burredLetters = [
    '\xc0', '\xc1', '\xc2', '\xc3', '\xc4', '\xc5', '\xc6', '\xc7', '\xc8', '\xc9', '\xca', '\xcb', '\xcc', '\xcd', '\xce',
    '\xcf', '\xd0', '\xd1', '\xd2', '\xd3', '\xd4', '\xd5', '\xd6', '\xd8', '\xd9', '\xda', '\xdb', '\xdc', '\xdd', '\xde',
    '\xdf', '\xe0', '\xe1', '\xe2', '\xe3', '\xe4', '\xe5', '\xe6', '\xe7', '\xe8', '\xe9', '\xea', '\xeb', '\xec', '\xed', '\xee',
    '\xef', '\xf0', '\xf1', '\xf2', '\xf3', '\xf4', '\xf5', '\xf6', '\xf8', '\xf9', '\xfa', '\xfb', '\xfc', '\xfd', '\xfe', '\xff'
  ];

  /** List of combining diacritical marks for spanning multiple characters. */
  var comboHalfs = [
    '\ufe20', '\ufe21', '\ufe22', '\ufe23'
  ];

  /** List of common combining diacritical marks. */
  var comboMarks = [
    '\u0300', '\u0301', '\u0302', '\u0303', '\u0304', '\u0305', '\u0306', '\u0307', '\u0308', '\u0309', '\u030a', '\u030b', '\u030c', '\u030d', '\u030e', '\u030f',
    '\u0310', '\u0311', '\u0312', '\u0313', '\u0314', '\u0315', '\u0316', '\u0317', '\u0318', '\u0319', '\u031a', '\u031b', '\u031c', '\u031d', '\u031e', '\u031f',
    '\u0320', '\u0321', '\u0322', '\u0323', '\u0324', '\u0325', '\u0326', '\u0327', '\u0328', '\u0329', '\u032a', '\u032b', '\u032c', '\u032d', '\u032e', '\u032f',
    '\u0330', '\u0331', '\u0332', '\u0333', '\u0334', '\u0335', '\u0336', '\u0337', '\u0338', '\u0339', '\u033a', '\u033b', '\u033c', '\u033d', '\u033e', '\u033f',
    '\u0340', '\u0341', '\u0342', '\u0343', '\u0344', '\u0345', '\u0346', '\u0347', '\u0348', '\u0349', '\u034a', '\u034b', '\u034c', '\u034d', '\u034e', '\u034f',
    '\u0350', '\u0351', '\u0352', '\u0353', '\u0354', '\u0355', '\u0356', '\u0357', '\u0358', '\u0359', '\u035a', '\u035b', '\u035c', '\u035d', '\u035e', '\u035f',
    '\u0360', '\u0361', '\u0362', '\u0363', '\u0364', '\u0365', '\u0366', '\u0367', '\u0368', '\u0369', '\u036a', '\u036b', '\u036c', '\u036d', '\u036e', '\u036f'
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
   * Used to check for problems removing whitespace. For a whitespace reference,
   * see [V8's unit test](https://code.google.com/p/v8/source/browse/branches/bleeding_edge/test/mjsunit/whitespaces.js).
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
          action = actions[index];

      push.apply(args, action.args);
      result = action.func.apply(action.thisArg, args);
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
   * @param {Object} object The object modify.
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

  // Add bizarro values.
  (function() {
    if (document || typeof require != 'function') {
      return;
    }
    var nativeString = fnToString.call(toString),
        reToString = /toString/g;

    function createToString(funcName) {
      return _.constant(nativeString.replace(reToString, funcName));
    }

    // Allow bypassing native checks.
    setProperty(funcProto, 'toString', function wrapper() {
      setProperty(funcProto, 'toString', fnToString);
      var result = _.has(this, 'toString') ? this.toString() : fnToString.call(this);
      setProperty(funcProto, 'toString', wrapper);
      return result;
    });

    // Add prototype extensions.
    funcProto._method = _.noop;

    // Set bad shims.
    var _propertyIsEnumerable = objectProto.propertyIsEnumerable;
    setProperty(objectProto, 'propertyIsEnumerable', function(key) {
      return !(key == 'valueOf' && this && this.valueOf === 1) && _propertyIsEnumerable.call(this, key);
    });

    var _Set = root.Set;
    setProperty(root, 'Set', _.noop);

    var _WeakMap = root.WeakMap;
    setProperty(root, 'WeakMap', _.noop);

    // Fake `WinRTError`.
    setProperty(root, 'WinRTError', Error);

    // Clear cache so lodash can be reloaded.
    emptyObject(require.cache);

    // Load lodash and expose it to the bad extensions/shims.
    lodashBizarro = (lodashBizarro = require(filePath))._ || lodashBizarro['default'] || lodashBizarro;
    root._ = oldDash;

    // Restore built-in methods.
    setProperty(objectProto, 'propertyIsEnumerable', _propertyIsEnumerable);

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
    delete funcProto._method;
  }());

  // Add other realm values from the `vm` module.
  _.attempt(function() {
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
  });

  // Add other realm values from an iframe.
  _.attempt(function() {
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
  });

  // Add a web worker.
  _.attempt(function() {
    var worker = new Worker('./asset/worker.js?t=' + (+new Date));
    worker.addEventListener('message', function(e) {
      _._VERSION = e.data || '';
    }, false);

    worker.postMessage(ui.buildPath);
  });

  // Expose internal modules for better code coverage.
  _.attempt(function() {
    if (isModularize && !(amd || isNpm)) {
      _.each(['internal/baseEach', 'internal/isIndex', 'internal/isIterateeCall',
              'internal/isLength', 'function/flow', 'function/flowRight'], function(id) {
        var func = require(id),
            funcName = _.last(id.split('/'));

        _['_' + funcName] = func[funcName] || func['default'] || func;
      });
    }
  });

  /*--------------------------------------------------------------------------*/

  if (params) {
    console.log('test.js invoked with arguments: ' + JSON.stringify(slice.call(params)));
  }

  QUnit.module(basename);

  (function() {
    test('should support loading ' + basename + ' as the "lodash" module', 1, function() {
      if (amd) {
        strictEqual((lodashModule || {}).moduleName, 'lodash');
      }
      else {
        skipTest();
      }
    });

    test('should support loading ' + basename + ' with the Require.js "shim" configuration option', 1, function() {
      if (amd && _.includes(ui.loaderPath, 'requirejs')) {
        strictEqual((shimmedModule || {}).moduleName, 'shimmed');
      } else {
        skipTest();
      }
    });

    test('should support loading ' + basename + ' as the "underscore" module', 1, function() {
      if (amd) {
        strictEqual((underscoreModule || {}).moduleName, 'underscore');
      }
      else {
        skipTest();
      }
    });

    asyncTest('should support loading ' + basename + ' in a web worker', 1, function() {
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

    test('should avoid overwritten native methods', 2, function() {
      function message(lodashMethod, nativeMethod) {
        return '`' + lodashMethod + '` should avoid overwritten native `' + nativeMethod + '`';
      }

      function Foo() { this.a = 1; }
      Foo.prototype.b = 2;

      var object = { 'a': 1 },
          otherObject = { 'b': 2 },
          largeArray = _.times(LARGE_ARRAY_SIZE, _.constant(object));

      if (lodashBizarro) {
        try {
          var actual = _.keysIn(new Foo).sort();
        } catch (e) {
          actual = null;
        }
        deepEqual(actual, ['a', 'b'], message('_.keysIn', 'Object#propertyIsEnumerable'));

        try {
          actual = [
            lodashBizarro.difference([object, otherObject], largeArray),
            lodashBizarro.intersection(largeArray, [object]),
            lodashBizarro.uniq(largeArray)
          ];
        } catch (e) {
          actual = null;
        }
        deepEqual(actual, [[otherObject], [object], [object]], message('_.difference`, `_.intersection`, and `_.uniq', 'Set'));
      }
      else {
        skipTest(2);
      }
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('isIndex');

  (function() {
    var func = _._isIndex;

    test('should return `true` for indexes', 4, function() {
      if (func) {
        strictEqual(func(0), true);
        strictEqual(func('1'), true);
        strictEqual(func(3, 4), true);
        strictEqual(func(MAX_SAFE_INTEGER - 1), true);
      }
      else {
        skipTest(4);
      }
    });

    test('should return `false` for non-indexes', 5, function() {
      if (func) {
        strictEqual(func('1abc'), false);
        strictEqual(func(-1), false);
        strictEqual(func(3, 3), false);
        strictEqual(func(1.1), false);
        strictEqual(func(MAX_SAFE_INTEGER), false);
      }
      else {
        skipTest(5);
      }
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('isIterateeCall');

  (function() {
    var array = [1],
        func = _._isIterateeCall,
        object =  { 'a': 1 };

    test('should return `true` for iteratee calls', 3, function() {
      function Foo() {}
      Foo.prototype.a = 1;

      if (func) {
        strictEqual(func(1, 0, array), true);
        strictEqual(func(1, 'a', object), true);
        strictEqual(func(1, 'a', new Foo), true);
      }
      else {
        skipTest(3);
      }
    });

    test('should return `false` for non-iteratee calls', 4, function() {
      if (func) {
        strictEqual(func(2, 0, array), false);
        strictEqual(func(1, 1.1, array), false);
        strictEqual(func(1, 0, { 'length': MAX_SAFE_INTEGER + 1 }), false);
        strictEqual(func(1, 'b', object), false);
      }
      else {
        skipTest(4);
      }
    });

    test('should work with `NaN` values', 2, function() {
      if (func) {
        strictEqual(func(NaN, 0, [NaN]), true);
        strictEqual(func(NaN, 'a', { 'a': NaN }), true);
      }
      else {
        skipTest(2);
      }
    });

    test('should not error when `index` is an object without a `toString` method', 1, function() {
      if (func) {
        try {
          var actual = func(1, { 'toString': null }, [1]);
        } catch (e) {
          var message = e.message;
        }
        strictEqual(actual, false, message || '');
      }
      else {
        skipTest();
      }
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('isLength');

  (function() {
    var func = _._isLength;

    test('should return `true` for lengths', 3, function() {
      if (func) {
        strictEqual(func(0), true);
        strictEqual(func(3), true);
        strictEqual(func(MAX_SAFE_INTEGER), true);
      }
      else {
        skipTest(3);
      }
    });

    test('should return `false` for non-lengths', 4, function() {
      if (func) {
        strictEqual(func(-1), false);
        strictEqual(func('1'), false);
        strictEqual(func(1.1), false);
        strictEqual(func(MAX_SAFE_INTEGER + 1), false);
      }
      else {
        skipTest(4);
      }
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash constructor');

  (function() {
    var values = empties.concat(true, 1, 'a'),
        expected = _.map(values, _.constant(true));

    test('should create a new instance when called without the `new` operator', 1, function() {
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
              unwrapped = wrapped.value();

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

  QUnit.module('lodash.add');

  (function() {
    test('should add two numbers together', 1, function() {
      strictEqual(_.add(6, 4), 10);
    });

    test('should coerce params to numbers', 3, function() {
      strictEqual(_.add('6', '4'), 10);
      strictEqual(_.add('6', 'y'), 6);
      strictEqual(_.add('x', 'y'), 0);
    });

    test('should return an unwrapped value when implicitly chaining', 1, function() {
      if (!isNpm) {
        strictEqual(_(1).add(2), 3);
      }
      else {
        skipTest();
      }
    });

    test('should return a wrapped value when explicitly chaining', 1, function() {
      if (!isNpm) {
        ok(_(1).chain().add(2) instanceof _);
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

    test('should coerce `n` values of `NaN` to `0`', 1, function() {
      strictEqual(after(NaN, 1), 1);
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

    test('should cap the number of params provided to `func`', 2, function() {
      var actual = _.map(['6', '8', '10'], _.ary(parseInt, 1));
      deepEqual(actual, [6, 8, 10]);

      var capped = _.ary(fn, 2);
      deepEqual(capped('a', 'b', 'c', 'd'), ['a', 'b']);
    });

    test('should use `func.length` if `n` is not provided', 1, function() {
      var capped = _.ary(fn);
      deepEqual(capped('a', 'b', 'c', 'd'), ['a', 'b', 'c']);
    });

    test('should treat a negative `n` as `0`', 1, function() {
      var capped = _.ary(fn, -1);

      try {
        var actual = capped('a');
      } catch (e) {}

      deepEqual(actual, []);
    });

    test('should coerce `n` to an integer', 1, function() {
      var values = ['1', 1.6, 'xyz'],
          expected = [['a'], ['a'], []];

      var actual = _.map(values, function(n) {
        var capped = _.ary(fn, n);
        return capped('a', 'b');
      });

      deepEqual(actual, expected);
    });

    test('should work when provided less than the capped numer of arguments', 1, function() {
      var capped = _.ary(fn, 3);
      deepEqual(capped('a'), ['a']);
    });

    test('should work as an iteratee for methods like `_.map`', 1, function() {
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

  QUnit.module('lodash.assign and lodash.extend');

  _.each(['assign', 'extend'], function(methodName) {
    var func = _[methodName];

    test('`_.' + methodName + '` should assign properties of a source object to the destination object', 1, function() {
      deepEqual(func({ 'a': 1 }, { 'b': 2 }), { 'a': 1, 'b': 2 });
    });

    test('`_.' + methodName + '` should accept multiple source objects', 2, function() {
      var expected = { 'a': 1, 'b': 2, 'c': 3 };
      deepEqual(func({ 'a': 1 }, { 'b': 2 }, { 'c': 3 }), expected);
      deepEqual(func({ 'a': 1 }, { 'b': 2, 'c': 2 }, { 'c': 3 }), expected);
    });

    test('`_.' + methodName + '` should overwrite destination properties', 1, function() {
      var expected = { 'a': 3, 'b': 2, 'c': 1 };
      deepEqual(func({ 'a': 1, 'b': 2 }, expected), expected);
    });

    test('`_.' + methodName + '` should assign source properties with nullish values', 1, function() {
      var expected = { 'a': null, 'b': undefined, 'c': null };
      deepEqual(func({ 'a': 1, 'b': 2 }, expected), expected);
    });
  });

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.assignWith and lodash.extendWith');

  _.each(['assignWith', 'extendWith'], function(methodName) {
    var func = _[methodName];

    test('`_.' + methodName + '` should work with a `customizer` callback', 1, function() {
      var actual = func({ 'a': 1, 'b': 2 }, { 'a': 3, 'c': 3 }, function(a, b) {
        return a === undefined ? b : a;
      });

      deepEqual(actual, { 'a': 1, 'b': 2, 'c': 3 });
    });

    test('`_.' + methodName + '` should work with a `customizer` that returns `undefined`', 1, function() {
      var expected = { 'a': undefined };
      deepEqual(func({}, expected, _.constant(undefined)), expected);
    });
  });

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.at');

  (function() {
    var args = arguments,
        array = ['a', 'b', 'c'];

    test('should return the elements corresponding to the specified keys', 1, function() {
      var actual = _.at(array, [0, 2]);
      deepEqual(actual, ['a', 'c']);
    });

    test('should return `undefined` for nonexistent keys', 1, function() {
      var actual = _.at(array, [2, 4, 0]);
      deepEqual(actual, ['c', undefined, 'a']);
    });

    test('should work with non-index keys on array values', 1, function() {
      var values = _.reject(empties, function(value) {
        return value === 0 || _.isArray(value);
      }).concat(-1, 1.1);

      var array = _.transform(values, function(result, value) {
        result[value] = 1;
      }, []);

      var expected = _.map(values, _.constant(1)),
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

    test('should work with a falsey `object` argument when keys are provided', 1, function() {
      var expected = _.map(falsey, _.constant(Array(4)));

      var actual = _.map(falsey, function(object) {
        try {
          return _.at(object, 0, 1, 'pop', 'push');
        } catch (e) {}
      });

      deepEqual(actual, expected);
    });

    test('should work with an `arguments` object for `object`', 1, function() {
      var actual = _.at(args, [2, 0]);
      deepEqual(actual, [3, 1]);
    });

    test('should work with `arguments` object as secondary arguments', 1, function() {
      var actual = _.at([1, 2, 3, 4, 5], args);
      deepEqual(actual, [2, 3, 4]);
    });

    test('should work with an object for `object`', 1, function() {
      var actual = _.at({ 'a': 1, 'b': 2, 'c': 3 }, ['c', 'a']);
      deepEqual(actual, [3, 1]);
    });

    test('should pluck inherited property values', 1, function() {
      function Foo() { this.a = 1; }
      Foo.prototype.b = 2;

      var actual = _.at(new Foo, 'b');
      deepEqual(actual, [2]);
    });
  }(1, 2, 3));

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.attempt');

  (function() {
    test('should return the result of `func`', 1, function() {
      strictEqual(_.attempt(_.constant('x')), 'x');
    });

    test('should provide additional arguments to `func`', 1, function() {
      var actual = _.attempt(function() { return slice.call(arguments); }, 1, 2);
      deepEqual(actual, [1, 2]);
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

    test('should return an unwrapped value when implicitly chaining', 1, function() {
      if (!isNpm) {
        strictEqual(_(_.constant('x')).attempt(), 'x');
      }
      else {
        skipTest();
      }
    });

    test('should return a wrapped value when explicitly chaining', 1, function() {
      if (!isNpm) {
        ok(_(_.constant('x')).chain().attempt() instanceof _);
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

    test('should coerce `n` values of `NaN` to `0`', 1, function() {
      strictEqual(before(NaN, 1), 0);
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
        } catch (e) {}
      });

      ok(_.every(actual, function(value, index) {
        return _.isEqual(value, expected[index]);
      }));
    });

    test('should bind a function to nullish values', 6, function() {
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

      strictEqual(bound().a, 1);
      strictEqual(newBound.a, undefined);
      ok(newBound instanceof Foo);
    });

    test('should handle a number of arguments when called with the `new` operator', 1, function() {
      function Foo() {
        return this;
      }

      var bound = _.bind(Foo, { 'a': 1 }),
          count = 9,
          expected = _.times(count, _.constant(undefined));

      var actual = _.times(count, function(index) {
        try {
          switch (index) {
            case 0: return (new bound).a;
            case 1: return (new bound(1)).a;
            case 2: return (new bound(1, 2)).a;
            case 3: return (new bound(1, 2, 3)).a;
            case 4: return (new bound(1, 2, 3, 4)).a;
            case 5: return (new bound(1, 2, 3, 4, 5)).a;
            case 6: return (new bound(1, 2, 3, 4, 5, 6)).a;
            case 7: return (new bound(1, 2, 3, 4, 5, 6, 7)).a;
            case 8: return (new bound(1, 2, 3, 4, 5, 6, 7, 8)).a;
          }
        } catch (e) {}
      });

      deepEqual(actual, expected);
    });

    test('should ensure `new bound` is an instance of `func`', 2, function() {
      function Foo(value) {
        return value && object;
      }

      var bound = _.bind(Foo),
          object = {};

      ok(new bound instanceof Foo);
      strictEqual(new bound(true), object);
    });

    test('should append array arguments to partially applied arguments', 1, function() {
      var object = {},
          bound = _.bind(fn, object, 'a');

      deepEqual(bound(['b'], 'c'), [object, 'a', ['b'], 'c']);
    });

    test('should not rebind functions', 3, function() {
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

    test('should not error when instantiating bound built-ins', 2, function() {
      var Ctor = _.bind(Date, null),
          expected = new Date(2012, 4, 23, 0, 0, 0, 0);

      try {
        var actual = new Ctor(2012, 4, 23, 0, 0, 0, 0);
      } catch (e) {}

      deepEqual(actual, expected);

      Ctor = _.bind(Date, null, 2012, 4, 23);

      try {
        actual = new Ctor(0, 0, 0, 0);
      } catch (e) {}

      deepEqual(actual, expected);
    });

    test('should not error when calling bound class constructors with the `new` operator', 1, function() {
      var createCtor = _.attempt(Function, '"use strict";return class A{}');

      if (typeof createCtor == 'function') {
        var bound = _.bind(createCtor()),
            count = 8,
            expected = _.times(count, _.constant(true));

        var actual = _.times(count, function(index) {
          try {
            switch (index) {
              case 0: return !!(new bound);
              case 1: return !!(new bound(1));
              case 2: return !!(new bound(1, 2));
              case 3: return !!(new bound(1, 2, 3));
              case 4: return !!(new bound(1, 2, 3, 4));
              case 5: return !!(new bound(1, 2, 3, 4, 5));
              case 6: return !!(new bound(1, 2, 3, 4, 5, 6));
              case 7: return !!(new bound(1, 2, 3, 4, 5, 6, 7));
            }
          } catch (e) {}
        });

        deepEqual(actual, expected);
      }
      else {
        skipTest();
      }
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
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.bindAll');

  (function() {
    var args = arguments;

    var source = {
      '_a': 1,
      '_b': 2,
      '_c': 3,
      '_d': 4,
      'a': function() { return this._a; },
      'b': function() { return this._b; },
      'c': function() { return this._c; },
      'd': function() { return this._d; }
    };

    test('should accept individual method names', 1, function() {
      var object = _.clone(source);
      _.bindAll(object, 'a', 'b');

      var actual = _.map(['a', 'b', 'c'], function(methodName) {
        return object[methodName].call({});
      });

      deepEqual(actual, [1, 2, undefined]);
    });

    test('should accept arrays of method names', 1, function() {
      var object = _.clone(source);
      _.bindAll(object, ['a', 'b'], ['c']);

      var actual = _.map(['a', 'b', 'c', 'd'], function(methodName) {
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
      var object = _.clone(source);
      _.bindAll(object, args);

      var actual = _.map(args, function(methodName) {
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

  _.each(['camel', 'kebab', 'snake', 'start'], function(caseName) {
    var methodName = caseName + 'Case',
        func = _[methodName];

    var strings = [
      'foo bar', 'Foo bar', 'foo Bar', 'Foo Bar',
      'FOO BAR', 'fooBar', '--foo-bar', '__foo_bar__'
    ];

    var converted = (function() {
      switch (caseName) {
        case 'camel': return 'fooBar';
        case 'kebab': return 'foo-bar';
        case 'snake': return 'foo_bar';
        case 'start': return 'Foo Bar';
      }
    }());

    test('`_.' + methodName + '` should convert `string` to ' + caseName + ' case', 1, function() {
      var actual = _.map(strings, function(string) {
        var expected = (caseName === 'start' && string === 'FOO BAR') ? string : converted;
        return func(string) === expected;
      });

      deepEqual(actual, _.map(strings, _.constant(true)));
    });

    test('`_.' + methodName + '` should handle double-converting strings', 1, function() {
      var actual = _.map(strings, function(string) {
        var expected = (caseName === 'start' && string === 'FOO BAR') ? string : converted;
        return func(func(string)) === expected;
      });

      deepEqual(actual, _.map(strings, _.constant(true)));
    });

    test('`_.' + methodName + '` should deburr letters', 1, function() {
      var actual = _.map(burredLetters, function(burred, index) {
        var letter = deburredLetters[index];
        letter = caseName == 'start' ? _.capitalize(letter) : letter.toLowerCase();
        return func(burred) === letter;
      });

      deepEqual(actual, _.map(burredLetters, _.constant(true)));
    });

    test('`_.' + methodName + '` should trim latin-1 mathematical operators', 1, function() {
      var actual = _.map(['\xd7', '\xf7'], func);
      deepEqual(actual, ['', '']);
    });

    test('`_.' + methodName + '` should coerce `string` to a string', 2, function() {
      var string = 'foo bar';
      strictEqual(func(Object(string)), converted);
      strictEqual(func({ 'toString': _.constant(string) }), converted);
    });

    test('`_.' + methodName + '` should return an unwrapped value implicitly when chaining', 1, function() {
      if (!isNpm) {
        strictEqual(_('foo bar')[methodName](), converted);
      }
      else {
        skipTest();
      }
    });

    test('`_.' + methodName + '` should return a wrapped value when explicitly chaining', 1, function() {
      if (!isNpm) {
        ok(_('foo bar').chain()[methodName]() instanceof _);
      }
      else {
        skipTest();
      }
    });
  });

  (function() {
    test('should get the original value after cycling through all case methods', 1, function() {
      var funcs = [_.camelCase, _.kebabCase, _.snakeCase, _.startCase, _.camelCase];

      var actual = _.reduce(funcs, function(result, func) {
        return func(result);
      }, 'enable 24h format');

      strictEqual(actual, 'enable24HFormat');
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.camelCase');

  (function() {
    test('should work with numbers', 4, function() {
      strictEqual(_.camelCase('enable 24h format'), 'enable24HFormat');
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

    test('should return an unwrapped value when implicitly chaining', 1, function() {
      if (!isNpm) {
        strictEqual(_('fred').capitalize(), 'Fred');
      }
      else {
        skipTest();
      }
    });

    test('should return a wrapped value when explicitly chaining', 1, function() {
      if (!isNpm) {
        ok(_('fred').chain().capitalize() instanceof _);
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
            .filter(function(n) { return n % 2 != 0; })
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
            .map(square)
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

    test('should ensure the minimum `size` is `0`', 1, function() {
      var values = falsey.concat(-1, -Infinity),
          expected = _.map(values, _.constant([]));

      var actual = _.map(values, function(value, index) {
        return index ? _.chunk(array, value) : _.chunk(array);
      });

      deepEqual(actual, expected);
    });

    test('should coerce `size` to an integer', 1, function() {
      deepEqual(_.chunk(array, array.length / 4), [[0], [1], [2], [3], [4], [5]]);
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('clone methods');

  (function() {
    function Foo() { this.a = 1; }
    Foo.prototype = { 'b': 1 };
    Foo.c = function() {};

    if (Map) {
      var map = new Map;
      map.set('a', 1);
      map.set('b', 2);
    }
    if (Set) {
      var set = new Set;
      set.add(1);
      set.add(2);
    }

    var objects = {
      '`arguments` objects': arguments,
      'arrays': ['a', ''],
      'array-like-objects': { '0': 'a', '1': '', 'length': 3 },
      'booleans': false,
      'boolean objects': Object(false),
      'Foo instances': new Foo,
      'objects': { 'a': 0, 'b': 1, 'c': 3 },
      'objects with object values': { 'a': /a/, 'b': ['B'], 'c': { 'C': 1 } },
      'objects from another document': _._object || {},
      'maps': map,
      'null values': null,
      'numbers': 3,
      'number objects': Object(3),
      'regexes': /a/gim,
      'sets': set,
      'strings': 'a',
      'string objects': Object('a'),
      'undefined values': undefined
    };

    objects['arrays'].length = 3;

    var uncloneable = {
      'DOM elements': body,
      'functions': Foo
    };

    _.each(errors, function(error) {
      uncloneable[error.name + 's'] = error;
    });

    test('`_.clone` should perform a shallow clone', 2, function() {
      var array = [{ 'a': 0 }, { 'b': 1 }],
          actual = _.clone(array);

      deepEqual(actual, array);
      ok(actual !== array && actual[0] === array[0]);
    });

    test('`_.cloneDeep` should deep clone objects with circular references', 1, function() {
      var object = {
        'foo': { 'b': { 'c': { 'd': {} } } },
        'bar': {}
      };

      object.foo.b.c.d = object;
      object.bar.b = object.foo.b;

      var actual = _.cloneDeep(object);
      ok(actual.bar.b === actual.foo.b && actual === actual.foo.b.c.d && actual !== object);
    });

    _.each(['clone', 'cloneDeep'], function(methodName) {
      var func = _[methodName],
          isDeep = methodName == 'cloneDeep';

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

      _.forOwn(uncloneable, function(value, key) {
        test('`_.' + methodName + '` should not clone ' + key, 3, function() {
          var object = { 'a': value, 'b': { 'c': value } },
              actual = func(object);

          deepEqual(actual, object);
          notStrictEqual(actual, object);

          var expected = typeof value == 'function' ? { 'c': Foo.c } : (value && {});
          deepEqual(func(value), expected);
        });
      });

      test('`_.' + methodName + '` should clone array buffers', 2, function() {
        if (ArrayBuffer) {
          var buffer = new ArrayBuffer(10),
              actual = func(buffer);

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

          _.times(2, function(index) {
            if (Ctor) {
              var buffer = new ArrayBuffer(24),
                  array = index ? new Ctor(buffer, 8, 1) : new Ctor(buffer),
                  actual = func(array);

              deepEqual(actual, array);
              notStrictEqual(actual, array);
              strictEqual(actual.buffer === array.buffer, !isDeep);
              strictEqual(actual.byteOffset, array.byteOffset);
              strictEqual(actual.length, array.length);
            }
            else {
              skipTest(5);
            }
          });
        });
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
          } catch (e) {
            ok(false, e.message);
          }
        }
        else {
          skipTest();
        }
      });

      test('`_.' + methodName + '` should perform a ' + (isDeep ? 'deep' : 'shallow') + ' clone when used as an iteratee for methods like `_.map`', 2, function() {
        var expected = [{ 'a': [0] }, { 'b': [1] }],
            actual = _.map(expected, func);

        deepEqual(actual, expected);

        if (isDeep) {
          ok(actual[0] !== expected[0] && actual[0].a !== expected[0].a && actual[1].b !== expected[1].b);
        } else {
          ok(actual[0] !== expected[0] && actual[0].a === expected[0].a && actual[1].b === expected[1].b);
        }
      });

      test('`_.' + methodName + '` should create an object from the same realm as `value`', 1, function() {
        var props = [];

        var objects = _.transform(_, function(result, value, key) {
          if (_.startsWith(key, '_') && _.isObject(value) && !_.isArguments(value) && !_.isElement(value) && !_.isFunction(value)) {
            props.push(_.capitalize(_.camelCase(key)));
            result.push(value);
          }
        }, []);

        var expected = _.times(objects.length, _.constant(true));

        var actual = _.map(objects, function(object) {
          var Ctor = object.constructor,
              result = func(object);

          return result !== object && (result instanceof Ctor || !(new Ctor instanceof Ctor));
        });

        deepEqual(actual, expected, props.join(', '));
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

    _.each(['cloneWith', 'cloneDeepWith'], function(methodName) {
      var func = _[methodName],
          isDeepWith = methodName == 'cloneDeepWith';

      test('`_.' + methodName + '` should provide the correct `customizer` arguments', 1, function() {
        var argsList = [],
            foo = new Foo;

        func(foo, function() {
          argsList.push(slice.call(arguments));
        });

        deepEqual(argsList, isDeepWith ? [[foo], [1, 'a', foo, [foo], [{ 'a': 1 }]]] : [[foo]]);
      });

      test('`_.' + methodName + '` should handle cloning if `customizer` returns `undefined`', 1, function() {
        var actual = func({ 'a': { 'b': 'c' } }, _.noop);
        deepEqual(actual, { 'a': { 'b': 'c' } });
      });

      _.forOwn(uncloneable, function(value, key) {
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
    });
  }(1, 2, 3));

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.compact');

  (function() {
    test('should filter falsey values', 1, function() {
      var array = ['0', '1', '2'];
      deepEqual(_.compact(falsey.concat(array)), array);
    });

    test('should work when in between lazy operators', 2, function() {
      if (!isNpm) {
        var actual = _(falsey).thru(_.slice).compact().thru(_.slice).value();
        deepEqual(actual, []);

        actual = _(falsey).thru(_.slice).push(true, 1).compact().push('a').value();
        deepEqual(actual, [true, 1, 'a']);
      }
      else {
        skipTest(2);
      }
    });

    test('should work in a lazy chain sequence', 1, function() {
      if (!isNpm) {
        var array = _.range(LARGE_ARRAY_SIZE).concat(null),
            actual = _(array).slice(1).compact().reverse().take().value();

        deepEqual(actual, _.take(_.compact(_.slice(array, 1)).reverse()));
      }
      else {
        skipTest();
      }
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('flow methods');

  _.each(['flow', 'flowRight'], function(methodName) {
    var func = _[methodName],
        isFlow = methodName == 'flow';

    test('`_.' + methodName + '` should supply each function with the return value of the previous', 1, function() {
      var fixed = function(n) { return n.toFixed(1); },
          combined = isFlow ? func(add, square, fixed) : func(fixed, square, add);

      strictEqual(combined(1, 2), '9.0');
    });

    test('`_.' + methodName + '` should return a new function', 1, function() {
      notStrictEqual(func(_.noop), _.noop);
    });

    test('`_.' + methodName + '` should return an identity function when no arguments are provided', 3, function() {
      var combined = func();

      try {
        strictEqual(combined('a'), 'a');
      } catch (e) {
        ok(false, e.message);
      }
      strictEqual(combined.length, 0);
      notStrictEqual(combined, _.identity);
    });

    test('`_.' + methodName + '` should work with a curried function and `_.first`', 1, function() {
      var curried = _.curry(_.identity);

      var combined = isFlow
        ? func(_.first, curried)
        : func(curried, _.first);

      strictEqual(combined([1]), 1);
    });

    test('`_.' + methodName + '` should support shortcut fusion', 12, function() {
      var filterCount,
          mapCount,
          array = _.range(LARGE_ARRAY_SIZE),
          iteratee = function(value) { mapCount++; return square(value); },
          predicate = function(value) { filterCount++; return isEven(value); };

      _.times(2, function(index) {
        var filter1 = _.filter,
            filter2 = _.curry(_.rearg(_.ary(_.filter, 2), 1, 0), 2),
            filter3 = (_.filter = index ? filter2 : filter1, filter2(predicate));

        var map1 = _.map,
            map2 = _.curry(_.rearg(_.ary(_.map, 2), 1, 0), 2),
            map3 = (_.map = index ? map2 : map1, map2(iteratee));

        var take1 = _.take,
            take2 = _.curry(_.rearg(_.ary(_.take, 2), 1, 0), 2),
            take3 = (_.take = index ? take2 : take1, take2(2));

        _.times(2, function(index) {
          var fn = index ? _['_' + methodName] : func;
          if (!fn) {
            skipTest(3);
            return;
          }
          var combined = isFlow
            ? fn(map3, filter3, _.compact, take3)
            : fn(take3, _.compact, filter3, map3);

          filterCount = mapCount = 0;
          deepEqual(combined(array), [4, 16]);

          if (!isNpm && WeakMap && WeakMap.name) {
            strictEqual(filterCount, 5, 'filterCount');
            strictEqual(mapCount, 5, 'mapCount');
          }
          else {
            skipTest(2);
          }
        });

        _.filter = filter1;
        _.map = map1;
        _.take = take1;
      });
    });

    test('`_.' + methodName + '` should work with curried functions with placeholders', 1, function() {
      var curried = _.curry(_.ary(_.map, 2), 2),
          getProp = curried(curried.placeholder, 'a'),
          objects = [{ 'a': 1 }, { 'a': 2 }, { 'a': 1 }];

      var combined = isFlow
        ? func(getProp, _.uniq)
        : func(_.uniq, getProp);

      deepEqual(combined(objects), [1, 2]);
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

    test('should work with a "_.property" style `iteratee`', 1, function() {
      var actual = _.countBy(['one', 'two', 'three'], 'length');
      deepEqual(actual, { '3': 2, '5': 1 });
    });

    test('should only add values to own, not inherited, properties', 2, function() {
      var actual = _.countBy([4.2, 6.1, 6.4], function(num) {
        return Math.floor(num) > 4 ? 'hasOwnProperty' : 'constructor';
      });

      deepEqual(actual.constructor, 1);
      deepEqual(actual.hasOwnProperty, 2);
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

    test('should work with an object for `collection`', 1, function() {
      var actual = _.countBy({ 'a': 4.2, 'b': 6.1, 'c': 6.4 }, function(num) {
        return Math.floor(num);
      });

      deepEqual(actual, { '4': 1, '6': 2 });
    });

    test('should work in a lazy chain sequence', 1, function() {
      if (!isNpm) {
        var array = _.range(LARGE_ARRAY_SIZE).concat(
          _.range(Math.floor(LARGE_ARRAY_SIZE / 2), LARGE_ARRAY_SIZE),
          _.range(Math.floor(LARGE_ARRAY_SIZE / 1.5), LARGE_ARRAY_SIZE)
        );

        var actual = _(array).countBy().map(square).filter(isEven).take().value();

        deepEqual(actual, _.take(_.filter(_.map(_.countBy(array), square), isEven)));
      }
      else {
        skipTest();
      }
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.create');

  (function() {
    function Shape() {
      this.x = 0;
      this.y = 0;
    }

    function Circle() {
      Shape.call(this);
    }

    test('should create an object that inherits from the given `prototype` object', 3, function() {
      Circle.prototype = _.create(Shape.prototype);
      Circle.prototype.constructor = Circle;

      var actual = new Circle;

      ok(actual instanceof Circle);
      ok(actual instanceof Shape);
      notStrictEqual(Circle.prototype, Shape.prototype);
    });

    test('should assign `properties` to the created object', 3, function() {
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

      var actual = _.map(falsey, function(prototype, index) {
        return index ? _.create(prototype) : _.create();
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

    test('should work as an iteratee for methods like `_.map`', 1, function() {
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

    test('should coerce `arity` to an integer', 2, function() {
      var values = ['0', 0.6, 'xyz'],
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

    test('should ensure `new curried` is an instance of `func`', 2, function() {
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

    test('should coerce `arity` to an integer', 2, function() {
      var values = ['0', 0.6, 'xyz'],
          expected = _.map(values, _.constant([]));

      var actual = _.map(values, function(arity) {
        return _.curryRight(fn, arity)();
      });

      deepEqual(actual, expected);
      deepEqual(_.curryRight(fn, '2')(1)(2), [2, 1]);
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

    test('should ensure `new curried` is an instance of `func`', 2, function() {
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
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('curry methods');

  _.each(['curry', 'curryRight'], function(methodName) {
    var func = _[methodName],
        fn = function(a, b) { return slice.call(arguments); },
        isCurry = methodName == 'curry';

    test('`_.' + methodName + '` should not error on functions with the same name as lodash methods', 1, function() {
      function run(a, b) {
        return a + b;
      }

      var curried = func(run);

      try {
        var actual = curried(1)(2);
      } catch (e) {}

      strictEqual(actual, 3);
    });

    test('`_.' + methodName + '` should work as an iteratee for methods like `_.map`', 2, function() {
      var array = [fn, fn, fn],
          object = { 'a': fn, 'b': fn, 'c': fn };

      _.each([array, object], function(collection) {
        var curries = _.map(collection, func),
            expected = _.map(collection, _.constant(isCurry ? ['a', 'b'] : ['b', 'a']));

        var actual = _.map(curries, function(curried) {
          return curried('a')('b');
        });

        deepEqual(actual, expected);
      });
    });
  });

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.debounce');

  (function() {
    asyncTest('should debounce a function', 2, function() {
      if (!(isRhino && isModularize)) {
        var callCount = 0,
            debounced = _.debounce(function() { callCount++; }, 32);

        debounced();
        debounced();
        debounced();

        strictEqual(callCount, 0);

        setTimeout(function() {
          strictEqual(callCount, 1);
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
        var debounced = _.debounce(_.identity, 32, { 'leading': true, 'trailing': false }),
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

    asyncTest('should apply default options', 2, function() {
      if (!(isRhino && isModularize)) {
        var callCount = 0;

        var debounced = _.debounce(function(value) {
          callCount++;
          return value;
        }, 32, {});

        strictEqual(debounced('x'), undefined);

        setTimeout(function() {
          strictEqual(callCount, 1);
          QUnit.start();
        }, 64);
      }
      else {
        skipTest(2);
        QUnit.start();
      }
    });

    asyncTest('should support a `leading` option', 5, function() {
      if (!(isRhino && isModularize)) {
        var callCounts = [0, 0];

        var withLeading = _.debounce(function(value) {
          callCounts[0]++;
          return value;
        }, 32, { 'leading': true });

        strictEqual(withLeading('x'), 'x');

        var withoutLeading = _.debounce(_.identity, 32, { 'leading': false });
        strictEqual(withoutLeading('x'), undefined);

        var withLeadingAndTrailing = _.debounce(function() {
          callCounts[1]++;
        }, 32, { 'leading': true });

        withLeadingAndTrailing();
        withLeadingAndTrailing();

        strictEqual(callCounts[1], 1);

        setTimeout(function() {
          deepEqual(callCounts, [1, 2]);

          withLeading('x');
          strictEqual(callCounts[0], 2);

          QUnit.start();
        }, 64);
      }
      else {
        skipTest(5);
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
        var callCount = 0;

        var debounced = _.debounce(function() {
          callCount++;
        }, 32, { 'maxWait': 64 });

        debounced();

        setTimeout(function() {
          strictEqual(callCount, 1);
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
            callCount = 0,
            object = {};

        var debounced = _.debounce(function(value) {
          actual = [this];
          push.apply(actual, arguments);
          return ++callCount != 2;
        }, 32, { 'leading': true, 'maxWait': 64 });

        while (true) {
          if (!debounced.call(object, 'a')) {
            break;
          }
        }
        setTimeout(function() {
          strictEqual(callCount, 2);
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

    test('should deburr combining diacritical marks', 1, function() {
      var values = comboMarks.concat(comboHalfs),
          expected = _.map(values, _.constant('ei'));

      var actual = _.map(values, function(chr) {
        return _.deburr('e' + chr + 'i');
      });

      deepEqual(actual, expected);
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

  QUnit.module('lodash.defaultsDeep');

  (function() {
    test('should deep assign properties of a source object if missing on the destination object', 1, function() {
      var object = { 'a': { 'b': 2 }, 'd': 4 },
          source = { 'a': { 'b': 1, 'c': 3 }, 'e': 5 },
          expected = { 'a': { 'b': 2, 'c': 3 }, 'd': 4, 'e': 5 };

      deepEqual(_.defaultsDeep(object, source), expected);
    });

    test('should accept multiple source objects', 2, function() {
      var source1 = { 'a': { 'b': 3 } },
          source2 = { 'a': { 'c': 3 } },
          source3 = { 'a': { 'b': 3, 'c': 3 } },
          source4 = { 'a': { 'c': 4 } },
          expected = { 'a': { 'b': 2, 'c': 3 } };

      deepEqual(_.defaultsDeep({ 'a': { 'b': 2 } }, source1, source2), expected);
      deepEqual(_.defaultsDeep({ 'a': { 'b': 2 } }, source3, source4), expected);
    });

    test('should not overwrite `null` values', 1, function() {
      var object = { 'a': { 'b': null } },
          source = { 'a': { 'b': 2 } },
          actual = _.defaultsDeep(object, source);

      strictEqual(actual.a.b, null);
    });

    test('should overwrite `undefined` values', 1, function() {
      var object = { 'a': { 'b': undefined } },
          source = { 'a': { 'b': 2 } },
          actual = _.defaultsDeep(object, source);

      strictEqual(actual.a.b, 2);
    });

    test('should merge sources containing circular references', 1, function() {
      var object = {
        'foo': { 'b': { 'c': { 'd': {} } } },
        'bar': { 'a': 2 }
      };

      var source = {
        'foo': { 'b': { 'c': { 'd': {} } } },
        'bar': {}
      };

      object.foo.b.c.d = object;
      source.foo.b.c.d = source;
      source.bar.b = source.foo.b;

      var actual = _.defaultsDeep(object, source);
      ok(actual.bar.b === source.foo.b && actual.foo.b.c.d === actual.foo.b.c.d.foo.b.c.d);
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
        }, 32);
      }
      else {
        skipTest();
        QUnit.start();
      }
    });

    asyncTest('should provide additional arguments to `func`', 1, function() {
      if (!(isRhino && isModularize)) {
        var args;

        _.defer(function() {
          args = slice.call(arguments);
        }, 1, 2);

        setTimeout(function() {
          deepEqual(args, [1, 2]);
          QUnit.start();
        }, 32);
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
        }, 32);
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
        _.delay(function() { pass = true; }, 32);

        setTimeout(function() {
          ok(!pass);
        }, 1);

        setTimeout(function() {
          ok(pass);
          QUnit.start();
        }, 64);
      }
      else {
        skipTest(2);
        QUnit.start();
      }
    });

    asyncTest('should provide additional arguments to `func`', 1, function() {
      if (!(isRhino && isModularize)) {
        var args;

        _.delay(function() {
          args = slice.call(arguments);
        }, 32, 1, 2);

        setTimeout(function() {
          deepEqual(args, [1, 2]);
          QUnit.start();
        }, 64);
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
        }, 64);
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

    test('should ignore values that are not array-like', 3, function() {
      var array = [1, null, 3];
      deepEqual(_.difference(args, 3, { '0': 1 }), [1, 2, 3]);
      deepEqual(_.difference(null, array, 1), []);
      deepEqual(_.difference(array, args, null), [null]);
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

    test('should coerce `n` to an integer', 1, function() {
      deepEqual(_.drop(array, 1.2), [2, 3]);
    });

    test('should work as an iteratee for methods like `_.map`', 1, function() {
      var array = [[1, 2, 3], [4, 5, 6], [7, 8, 9]],
          actual = _.map(array, _.drop);

      deepEqual(actual, [[2, 3], [5, 6], [8, 9]]);
    });

    test('should work in a lazy chain sequence', 6, function() {
      if (!isNpm) {
        var array = _.range(1, LARGE_ARRAY_SIZE + 1),
            predicate = function(value) { values.push(value); return isEven(value); },
            values = [],
            actual = _(array).drop(2).drop().value();

        deepEqual(actual, array.slice(3));

        actual = _(array).filter(predicate).drop(2).drop().value();
        deepEqual(values, array);
        deepEqual(actual, _.drop(_.drop(_.filter(array, predicate), 2)));

        actual = _(array).drop(2).dropRight().drop().dropRight(2).value();
        deepEqual(actual, _.dropRight(_.drop(_.dropRight(_.drop(array, 2))), 2));

        values = [];

        actual = _(array).drop().filter(predicate).drop(2).dropRight().drop().dropRight(2).value();
        deepEqual(values, array.slice(1));
        deepEqual(actual, _.dropRight(_.drop(_.dropRight(_.drop(_.filter(_.drop(array), predicate), 2))), 2));
      }
      else {
        skipTest(6);
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

    test('should coerce `n` to an integer', 1, function() {
      deepEqual(_.dropRight(array, 1.2), [1, 2]);
    });

    test('should work as an iteratee for methods like `_.map`', 1, function() {
      var array = [[1, 2, 3], [4, 5, 6], [7, 8, 9]],
          actual = _.map(array, _.dropRight);

      deepEqual(actual, [[1, 2], [4, 5], [7, 8]]);
    });

    test('should work in a lazy chain sequence', 6, function() {
      if (!isNpm) {
        var array = _.range(1, LARGE_ARRAY_SIZE + 1),
            predicate = function(value) { values.push(value); return isEven(value); },
            values = [],
            actual = _(array).dropRight(2).dropRight().value();

        deepEqual(actual, array.slice(0, -3));

        actual = _(array).filter(predicate).dropRight(2).dropRight().value();
        deepEqual(values, array);
        deepEqual(actual, _.dropRight(_.dropRight(_.filter(array, predicate), 2)));

        actual = _(array).dropRight(2).drop().dropRight().drop(2).value();
        deepEqual(actual, _.drop(_.dropRight(_.drop(_.dropRight(array, 2))), 2));

        values = [];

        actual = _(array).dropRight().filter(predicate).dropRight(2).drop().dropRight().drop(2).value();
        deepEqual(values, array.slice(0, -1));
        deepEqual(actual, _.drop(_.dropRight(_.drop(_.dropRight(_.filter(_.dropRight(array), predicate), 2))), 2));
      }
      else {
        skipTest(6);
      }
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.dropRightWhile');

  (function() {
    var array = [1, 2, 3, 4];

    var objects = [
      { 'a': 0, 'b': 0 },
      { 'a': 1, 'b': 1 },
      { 'a': 2, 'b': 2 }
    ];

    test('should drop elements while `predicate` returns truthy', 1, function() {
      var actual = _.dropRightWhile(array, function(num) {
        return num > 2;
      });

      deepEqual(actual, [1, 2]);
    });

    test('should provide the correct `predicate` arguments', 1, function() {
      var args;

      _.dropRightWhile(array, function() {
        args = slice.call(arguments);
      });

      deepEqual(args, [4, 3, array]);
    });

    test('should work with a "_.matches" style `predicate`', 1, function() {
      deepEqual(_.dropRightWhile(objects, { 'b': 2 }), objects.slice(0, 2));
    });

    test('should work with a "_.matchesProperty" style `predicate`', 1, function() {
      deepEqual(_.dropRightWhile(objects, ['b', 2]), objects.slice(0, 2));
    });

    test('should work with a "_.property" style `predicate`', 1, function() {
      deepEqual(_.dropRightWhile(objects, 'b'), objects.slice(0, 1));
    });

    test('should return a wrapped value when chaining', 2, function() {
      if (!isNpm) {
        var wrapped = _(array).dropRightWhile(function(num) {
          return num > 2;
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

  QUnit.module('lodash.dropWhile');

  (function() {
    var array = [1, 2, 3, 4];

    var objects = [
      { 'a': 2, 'b': 2 },
      { 'a': 1, 'b': 1 },
      { 'a': 0, 'b': 0 }
    ];

    test('should drop elements while `predicate` returns truthy', 1, function() {
      var actual = _.dropWhile(array, function(num) {
        return num < 3;
      });

      deepEqual(actual, [3, 4]);
    });

    test('should provide the correct `predicate` arguments', 1, function() {
      var args;

      _.dropWhile(array, function() {
        args = slice.call(arguments);
      });

      deepEqual(args, [1, 0, array]);
    });

    test('should work with a "_.matches" style `predicate`', 1, function() {
      deepEqual(_.dropWhile(objects, { 'b': 2 }), objects.slice(1));
    });

    test('should work with a "_.matchesProperty" style `predicate`', 1, function() {
      deepEqual(_.dropWhile(objects, ['b', 2]), objects.slice(1));
    });

    test('should work with a "_.property" style `predicate`', 1, function() {
      deepEqual(_.dropWhile(objects, 'b'), objects.slice(2));
    });

    test('should work in a lazy chain sequence', 3, function() {
      if (!isNpm) {
        var array = _.range(1, LARGE_ARRAY_SIZE + 3),
            predicate = function(num) { return num < 3; },
            expected = _.dropWhile(array, predicate),
            wrapped = _(array).dropWhile(predicate);

        deepEqual(wrapped.value(), expected);
        deepEqual(wrapped.reverse().value(), expected.slice().reverse());
        strictEqual(wrapped.last(), _.last(expected));
      }
      else {
        skipTest(3);
      }
    });

    test('should work in a lazy chain sequence with `drop`', 1, function() {
      if (!isNpm) {
        var array = _.range(1, LARGE_ARRAY_SIZE + 3);

        var actual = _(array)
          .dropWhile(function(num) { return num == 1; })
          .drop()
          .dropWhile(function(num) { return num == 3; })
          .value();

        deepEqual(actual, array.slice(3));
      }
      else {
        skipTest();
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

    test('should coerce `position` to an integer', 1, function() {
      strictEqual(_.endsWith(string, 'ab', 2.2), true);
    });

    test('should return `true` when `target` is an empty string regardless of `position`', 1, function() {
      ok(_.every([-Infinity, NaN, -3, -1, 0, 1, 2, 3, 5, MAX_SAFE_INTEGER, Infinity], function(position) {
        return _.endsWith(string, '', position, true);
      }));
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.eq');

  (function() {
    test('should perform a `SameValueZero` comparison of two values', 11, function() {
      strictEqual(_.eq(), true);
      strictEqual(_.eq(undefined), true);
      strictEqual(_.eq(0, -0), true);
      strictEqual(_.eq(NaN, NaN), true);
      strictEqual(_.eq(1, 1), true);

      strictEqual(_.eq(null, undefined), false);
      strictEqual(_.eq(1, Object(1)), false);
      strictEqual(_.eq(1, '1'), false);
      strictEqual(_.eq(1, '1'), false);

      var object = { 'a': 1 };
      strictEqual(_.eq(object, object), true);
      strictEqual(_.eq(object, { 'a': 1 }), false);
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
    var escaped = '\\^\\$\\.\\*\\+\\?\\(\\)\\[\\]\\{\\}\\|\\\\',
        unescaped = '^$.*+?()[]{}|\\';

    test('should escape values', 1, function() {
      strictEqual(_.escapeRegExp(unescaped + unescaped), escaped + escaped);
    });

    test('should handle strings with nothing to escape', 1, function() {
      strictEqual(_.escapeRegExp('ghi'), 'ghi');
    });

    test('should return an empty string for empty values', 1, function() {
      var values = [, null, undefined, ''],
          expected = _.map(values, _.constant(''));

      var actual = _.map(values, function(value, index) {
        return index ? _.escapeRegExp(value) : _.escapeRegExp();
      });

      deepEqual(actual, expected);
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
        } catch (e) {}
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

    test('should work with a "_.property" style `predicate`', 2, function() {
      var objects = [{ 'a': 0, 'b': 1 }, { 'a': 1, 'b': 2 }];
      strictEqual(_.every(objects, 'a'), false);
      strictEqual(_.every(objects, 'b'), true);
    });

    test('should work with a "_.matches" style `predicate`', 2, function() {
      var objects = [{ 'a': 0, 'b': 0 }, { 'a': 0, 'b': 1 }];
      strictEqual(_.every(objects, { 'a': 0 }), true);
      strictEqual(_.every(objects, { 'b': 1 }), false);
    });

    test('should work as an iteratee for methods like `_.map`', 1, function() {
      var actual = _.map([[1]], _.every);
      deepEqual(actual, [true]);
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('strict mode checks');

  _.each(['assign', 'extend', 'bindAll', 'defaults'], function(methodName) {
    var func = _[methodName],
        isBindAll = methodName == 'bindAll';

    test('`_.' + methodName + '` should ' + (isStrict ? '' : 'not ') + 'throw strict mode errors', 1, function() {
      if (freeze) {
        var object = freeze({ 'a': undefined, 'b': function() {} }),
            pass = !isStrict;

        try {
          func(object, isBindAll ? 'b' : { 'a': 1 });
        } catch (e) {
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

  QUnit.module('lodash.fill');

  (function() {
    test('should use a default `start` of `0` and a default `end` of `array.length`', 1, function() {
      var array = [1, 2, 3];
      deepEqual(_.fill(array, 'a'), ['a', 'a', 'a']);
    });

    test('should use `undefined` for `value` if not provided', 2, function() {
      var array = [1, 2, 3],
          actual = _.fill(array);

      deepEqual(actual, Array(3));
      ok(_.every(actual, function(value, index) { return index in actual; }));
    });

    test('should work with a positive `start`', 1, function() {
      var array = [1, 2, 3];
      deepEqual(_.fill(array, 'a', 1), [1, 'a', 'a']);
    });

    test('should work with a `start` >= `array.length`', 4, function() {
      _.each([3, 4, Math.pow(2, 32), Infinity], function(start) {
        var array = [1, 2, 3];
        deepEqual(_.fill(array, 'a', start), [1, 2, 3]);
      });
    });

    test('should treat falsey `start` values as `0`', 1, function() {
      var expected = _.map(falsey, _.constant(['a', 'a', 'a']));

      var actual = _.map(falsey, function(start) {
        var array = [1, 2, 3];
        return _.fill(array, 'a', start);
      });

      deepEqual(actual, expected);
    });

    test('should work with a negative `start`', 1, function() {
      var array = [1, 2, 3];
      deepEqual(_.fill(array, 'a', -1), [1, 2, 'a']);
    });

    test('should work with a negative `start` <= negative `array.length`', 3, function() {
      _.each([-3, -4, -Infinity], function(start) {
        var array = [1, 2, 3];
        deepEqual(_.fill(array, 'a', start), ['a', 'a', 'a']);
      });
    });

    test('should work with `start` >= `end`', 2, function() {
      _.each([2, 3], function(start) {
        var array = [1, 2, 3];
        deepEqual(_.fill(array, 'a', start, 2), [1, 2, 3]);
      });
    });

    test('should work with a positive `end`', 1, function() {
      var array = [1, 2, 3];
      deepEqual(_.fill(array, 'a', 0, 1), ['a', 2, 3]);
    });

    test('should work with a `end` >= `array.length`', 4, function() {
      _.each([3, 4, Math.pow(2, 32), Infinity], function(end) {
        var array = [1, 2, 3];
        deepEqual(_.fill(array, 'a', 0, end), ['a', 'a', 'a']);
      });
    });

    test('should treat falsey `end` values, except `undefined`, as `0`', 1, function() {
      var expected = _.map(falsey, function(value) {
        return value === undefined ? ['a', 'a', 'a'] : [1, 2, 3];
      });

      var actual = _.map(falsey, function(end) {
        var array = [1, 2, 3];
        return _.fill(array, 'a', 0, end);
      });

      deepEqual(actual, expected);
    });

    test('should work with a negative `end`', 1, function() {
      var array = [1, 2, 3];
      deepEqual(_.fill(array, 'a', 0, -1), ['a', 'a', 3]);
    });

    test('should work with a negative `end` <= negative `array.length`', 3, function() {
      _.each([-3, -4, -Infinity], function(end) {
        var array = [1, 2, 3];
        deepEqual(_.fill(array, 'a', 0, end), [1, 2, 3]);
      });
    });

    test('should coerce `start` and `end` to integers', 1, function() {
      var positions = [[0.1, 1.6], ['0', 1], [0, '1'], ['1'], [NaN, 1], [1, NaN]];

      var actual = _.map(positions, function(pos) {
        var array = [1, 2, 3];
        return _.fill.apply(_, [array, 'a'].concat(pos));
      });

      deepEqual(actual, [['a', 2, 3], ['a', 2, 3], ['a', 2, 3], [1, 'a', 'a'], ['a', 2, 3], [1, 2, 3]]);
    });

    test('should work as an iteratee for methods like `_.map`', 1, function() {
      var array = [[1, 2], [3, 4]],
          actual = _.map(array, _.fill);

      deepEqual(actual, [[0, 0], [1, 1]]);
    });

    test('should return a wrapped value when chaining', 3, function() {
      if (!isNpm) {
        var array = [1, 2, 3],
            wrapped = _(array).fill('a'),
            actual = wrapped.value();

        ok(wrapped instanceof _);
        deepEqual(actual, ['a', 'a', 'a']);
        strictEqual(actual, array);
      }
      else {
        skipTest(3);
      }
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.filter');

  (function() {
    var array = [1, 2, 3];

    test('should return elements `predicate` returns truthy for', 1, function() {
      deepEqual(_.filter(array, isEven), [2]);
    });

    test('should iterate over an object with numeric keys (test in Mobile Safari 8)', 1, function() {
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
  }());

  /*--------------------------------------------------------------------------*/

  _.each(['find', 'findLast', 'findIndex', 'findLastIndex', 'findKey', 'findLastKey'], function(methodName) {
    QUnit.module('lodash.' + methodName);

    var func = _[methodName],
        isFindKey = /Key$/.test(methodName);

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

      test('should return the found value', 1, function() {
        strictEqual(func(objects, function(object) { return object.a; }), expected[0]);
      });

      test('should return `' + expected[1] + '` if value is not found', 1, function() {
        strictEqual(func(objects, function(object) { return object.a === 3; }), expected[1]);
      });

      test('should work with a "_.matches" style `predicate`', 1, function() {
        strictEqual(func(objects, { 'b': 2 }), expected[2]);
      });

      test('should work with a "_.matchesProperty" style `predicate`', 1, function() {
        strictEqual(func(objects, ['b', 2]), expected[2]);
      });

      test('should work with a "_.property" style `predicate`', 1, function() {
        strictEqual(func(objects, 'b'), expected[3]);
      });

      test('should return `' + expected[1] + '` for empty collections', 1, function() {
        var emptyValues = _.endsWith(methodName, 'Index') ? _.reject(empties, _.isPlainObject) : empties,
            expecting = _.map(emptyValues, _.constant(expected[1]));

        var actual = _.map(emptyValues, function(value) {
          try {
            return func(value, { 'a': 3 });
          } catch (e) {}
        });

        deepEqual(actual, expecting);
      });
    }());

    (function() {
      var array = [1, 2, 3, 4];

      var expected = ({
        'find': 1,
        'findLast': 4,
        'findIndex': 0,
        'findLastIndex': 3,
        'findKey': '0',
        'findLastKey': '3'
      })[methodName];

      test('should return an unwrapped value when implicitly chaining', 1, function() {
        if (!isNpm) {
          strictEqual(_(array)[methodName](), expected);
        }
        else {
          skipTest();
        }
      });

      test('should return a wrapped value when explicitly chaining', 1, function() {
        if (!isNpm) {
          ok(_(array).chain()[methodName]() instanceof _);
        }
        else {
          skipTest();
        }
      });

      test('should not execute immediately when explicitly chaining', 1, function() {
        if (!isNpm) {
          var wrapped = _(array).chain()[methodName]();
          strictEqual(wrapped.__wrapped__, array);
        }
        else {
          skipTest();
        }
      });

      test('should work in a lazy chain sequence', 2, function() {
        if (!isNpm) {
          var largeArray = _.range(1, LARGE_ARRAY_SIZE + 1),
              smallArray = array;

          _.times(2, function(index) {
            var array = index ? largeArray : smallArray,
                wrapped = _(array).filter(isEven);

            strictEqual(wrapped[methodName](), func(_.filter(array, isEven)));
          });
        }
        else {
          skipTest(2);
        }
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
  });

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.find and lodash.findLast');

  _.each(['find', 'findLast'], function(methodName) {
    var isFind = methodName == 'find';

    test('`_.' + methodName + '` should support shortcut fusion', 3, function() {
      if (!isNpm) {
        var findCount = 0,
            mapCount = 0,
            array = _.range(1, LARGE_ARRAY_SIZE + 1),
            iteratee = function(value) { mapCount++; return square(value); },
            predicate = function(value) { findCount++; return isEven(value); },
            actual = _(array).map(iteratee)[methodName](predicate);

        strictEqual(findCount, isFind ? 2 : 1);
        strictEqual(mapCount, isFind ? 2 : 1);
        strictEqual(actual, isFind ? 4 : square(LARGE_ARRAY_SIZE));
      }
      else {
        skipTest(3);
      }
    });
  });

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.first');

  (function() {
    var array = [1, 2, 3, 4];

    test('should return the first element', 1, function() {
      strictEqual(_.first(array), 1);
    });

    test('should return `undefined` when querying empty arrays', 1, function() {
      var array = [];
      array['-1'] = 1;

      strictEqual(_.first(array), undefined);
    });

    test('should work as an iteratee for methods like `_.map`', 1, function() {
      var array = [[1, 2, 3], [4, 5, 6], [7, 8, 9]],
          actual = _.map(array, _.first);

      deepEqual(actual, [1, 4, 7]);
    });

    test('should return an unwrapped value when implicitly chaining', 1, function() {
      if (!isNpm) {
        strictEqual(_(array).first(), 1);
      }
      else {
        skipTest();
      }
    });

    test('should return a wrapped value when explicitly chaining', 1, function() {
      if (!isNpm) {
        ok(_(array).chain().first() instanceof _);
      }
      else {
        skipTest();
      }
    });

    test('should not execute immediately when explicitly chaining', 1, function() {
      if (!isNpm) {
        var wrapped = _(array).chain().first();
        strictEqual(wrapped.__wrapped__, array);
      }
      else {
        skipTest();
      }
    });

    test('should work in a lazy chain sequence', 2, function() {
      if (!isNpm) {
        var largeArray = _.range(LARGE_ARRAY_SIZE),
            smallArray = array;

        _.times(2, function(index) {
          var array = index ? largeArray : smallArray,
              wrapped = _(array).filter(isEven);

          strictEqual(wrapped.first(), _.first(_.filter(array, isEven)));
        });
      }
      else {
        skipTest(2);
      }
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

    test('should work as an iteratee for methods like `_.map`', 1, function() {
      var array = [[1, 2, 3], [4, 5, 6], [7, 8, 9]],
          actual = _.map(array, _.take);

      deepEqual(actual, [[1], [4], [7]]);
    });

    test('should work in a lazy chain sequence', 6, function() {
      if (!isNpm) {
        var array = _.range(1, LARGE_ARRAY_SIZE + 1),
            predicate = function(value) { values.push(value); return isEven(value); },
            values = [],
            actual = _(array).take(2).take().value();

        deepEqual(actual, _.take(_.take(array, 2)));

        actual = _(array).filter(predicate).take(2).take().value();
        deepEqual(values, [1, 2]);
        deepEqual(actual, _.take(_.take(_.filter(array, predicate), 2)));

        actual = _(array).take(6).takeRight(4).take(2).takeRight().value();
        deepEqual(actual, _.takeRight(_.take(_.takeRight(_.take(array, 6), 4), 2)));

        values = [];

        actual = _(array).take(array.length - 1).filter(predicate).take(6).takeRight(4).take(2).takeRight().value();
        deepEqual(values, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
        deepEqual(actual, _.takeRight(_.take(_.takeRight(_.take(_.filter(_.take(array, array.length - 1), predicate), 6), 4), 2)));
      }
      else {
        skipTest(6);
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

    test('should work as an iteratee for methods like `_.map`', 1, function() {
      var array = [[1, 2, 3], [4, 5, 6], [7, 8, 9]],
          actual = _.map(array, _.takeRight);

      deepEqual(actual, [[3], [6], [9]]);
    });

    test('should work in a lazy chain sequence', 6, function() {
      if (!isNpm) {
        var array = _.range(LARGE_ARRAY_SIZE),
            predicate = function(value) { values.push(value); return isEven(value); },
            values = [],
            actual = _(array).takeRight(2).takeRight().value();

        deepEqual(actual, _.takeRight(_.takeRight(array)));

        actual = _(array).filter(predicate).takeRight(2).takeRight().value();
        deepEqual(values, array);
        deepEqual(actual, _.takeRight(_.takeRight(_.filter(array, predicate), 2)));

        actual = _(array).takeRight(6).take(4).takeRight(2).take().value();
        deepEqual(actual, _.take(_.takeRight(_.take(_.takeRight(array, 6), 4), 2)));

        values = [];

        actual = _(array).filter(predicate).takeRight(6).take(4).takeRight(2).take().value();
        deepEqual(values, array);
        deepEqual(actual, _.take(_.takeRight(_.take(_.takeRight(_.filter(array, predicate), 6), 4), 2)));
      }
      else {
        skipTest(6);
      }
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.takeRightWhile');

  (function() {
    var array = [1, 2, 3, 4];

    var objects = [
      { 'a': 0, 'b': 0 },
      { 'a': 1, 'b': 1 },
      { 'a': 2, 'b': 2 }
    ];

    test('should take elements while `predicate` returns truthy', 1, function() {
      var actual = _.takeRightWhile(array, function(num) {
        return num > 2;
      });

      deepEqual(actual, [3, 4]);
    });

    test('should provide the correct `predicate` arguments', 1, function() {
      var args;

      _.takeRightWhile(array, function() {
        args = slice.call(arguments);
      });

      deepEqual(args, [4, 3, array]);
    });

    test('should work with a "_.matches" style `predicate`', 1, function() {
      deepEqual(_.takeRightWhile(objects, { 'b': 2 }), objects.slice(2));
    });

    test('should work with a "_.matchesProperty" style `predicate`', 1, function() {
      deepEqual(_.takeRightWhile(objects, ['b', 2]), objects.slice(2));
    });

    test('should work with a "_.property" style `predicate`', 1, function() {
      deepEqual(_.takeRightWhile(objects, 'b'), objects.slice(1));
    });

    test('should work in a lazy chain sequence', 3, function() {
      if (!isNpm) {
        var array = _.range(LARGE_ARRAY_SIZE),
            predicate = function(num) { return num > 2; },
            expected = _.takeRightWhile(array, predicate),
            wrapped = _(array).takeRightWhile(predicate);

        deepEqual(wrapped.value(), expected);
        deepEqual(wrapped.reverse().value(), expected.slice().reverse());
        strictEqual(wrapped.last(), _.last(expected));
      }
      else {
        skipTest(3);
      }
    });

    test('should provide the correct `predicate` arguments in a lazy chain sequence', 5, function() {
      if (!isNpm) {
        var args,
            array = _.range(LARGE_ARRAY_SIZE + 1),
            expected = [square(LARGE_ARRAY_SIZE), LARGE_ARRAY_SIZE - 1, _.map(array.slice(1), square)];

        _(array).slice(1).takeRightWhile(function(value, index, array) {
          args = slice.call(arguments);
        }).value();

        deepEqual(args, [LARGE_ARRAY_SIZE, LARGE_ARRAY_SIZE - 1, array.slice(1)]);

        _(array).slice(1).map(square).takeRightWhile(function(value, index, array) {
          args = slice.call(arguments);
        }).value();

        deepEqual(args, expected);

        _(array).slice(1).map(square).takeRightWhile(function(value, index) {
          args = slice.call(arguments);
        }).value();

        deepEqual(args, expected);

        _(array).slice(1).map(square).takeRightWhile(function(index) {
          args = slice.call(arguments);
        }).value();

        deepEqual(args, [square(LARGE_ARRAY_SIZE)]);

        _(array).slice(1).map(square).takeRightWhile(function() {
          args = slice.call(arguments);
        }).value();

        deepEqual(args, expected);
      }
      else {
        skipTest(5);
      }
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.takeWhile');

  (function() {
    var array = [1, 2, 3, 4];

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

    test('should work with a "_.matches" style `predicate`', 1, function() {
      deepEqual(_.takeWhile(objects, { 'b': 2 }), objects.slice(0, 1));
    });

    test('should work with a "_.matchesProperty" style `predicate`', 1, function() {
      deepEqual(_.takeWhile(objects, ['b', 2]), objects.slice(0, 1));
    });
    test('should work with a "_.property" style `predicate`', 1, function() {
      deepEqual(_.takeWhile(objects, 'b'), objects.slice(0, 2));
    });

    test('should work in a lazy chain sequence', 3, function() {
      if (!isNpm) {
        var array = _.range(LARGE_ARRAY_SIZE),
            predicate = function(num) { return num < 3; },
            expected = _.takeWhile(array, predicate),
            wrapped = _(array).takeWhile(predicate);

        deepEqual(wrapped.value(), expected);
        deepEqual(wrapped.reverse().value(), expected.slice().reverse());
        strictEqual(wrapped.last(), _.last(expected));
      }
      else {
        skipTest(3);
      }
    });

    test('should work in a lazy chain sequence with `take`', 1, function() {
      if (!isNpm) {
        var array = _.range(LARGE_ARRAY_SIZE);

        var actual = _(array)
          .takeWhile(function(num) { return num < 4; })
          .take(2)
          .takeWhile(function(num) { return num == 0; })
          .value();

        deepEqual(actual, [0]);
      }
      else {
        skipTest();
      }
    });

    test('should provide the correct `predicate` arguments in a lazy chain sequence', 5, function() {
      if (!isNpm) {
        var args,
            array = _.range(LARGE_ARRAY_SIZE + 1),
            expected = [1, 0, _.map(array.slice(1), square)];

        _(array).slice(1).takeWhile(function(value, index, array) {
          args = slice.call(arguments);
        }).value();

        deepEqual(args, [1, 0, array.slice(1)]);

        _(array).slice(1).map(square).takeWhile(function(value, index, array) {
          args = slice.call(arguments);
        }).value();

        deepEqual(args, expected);

        _(array).slice(1).map(square).takeWhile(function(value, index) {
          args = slice.call(arguments);
        }).value();

        deepEqual(args, expected);

        _(array).slice(1).map(square).takeWhile(function(value) {
          args = slice.call(arguments);
        }).value();

        deepEqual(args, [1]);

        _(array).slice(1).map(square).takeWhile(function() {
          args = slice.call(arguments);
        }).value();

        deepEqual(args, expected);
      }
      else {
        skipTest(5);
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

    test('should flatten `arguments` objects', 2, function() {
      var array = [args, [args]];

      deepEqual(_.flatten(array), [1, 2, 3, args]);
      deepEqual(_.flattenDeep(array), [1, 2, 3, 1, 2, 3]);
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
      _.times(3, function(index) {
        if (freeze) {
          var expected = Array(5e5);

          try {
            if (index) {
              var actual = actual == 1 ? _.flatten([expected], true) : _.flattenDeep([expected]);
            } else {
              actual = _.flatten(expected);
            }
            deepEqual(actual, expected);
          } catch (e) {
            ok(false, e.message);
          }
        }
        else {
          skipTest();
        }
      });
    });

    test('should work with empty arrays', 2, function() {
      var array = [[], [[]], [[], [[[]]]]];

      deepEqual(_.flatten(array), [[], [], [[[]]]]);
      deepEqual(_.flattenDeep(array), []);
    });

    test('should support flattening of nested arrays', 2, function() {
      var array = [1, [2, 3], 4, [[5]]];

      deepEqual(_.flatten(array), [1, 2, 3, 4, [5]]);
      deepEqual(_.flattenDeep(array), [1, 2, 3, 4, 5]);
    });

    test('should return an empty array for non array-like objects', 3, function() {
      var expected = [];

      deepEqual(_.flatten({ 'a': 1 }), expected);
      deepEqual(_.flatten({ 'a': 1 }, true), expected);
      deepEqual(_.flattenDeep({ 'a': 1 }), expected);
    });

    test('should return a wrapped value when chaining', 4, function() {
      if (!isNpm) {
        var wrapped = _([1, [2], [3, [4]]]),
            actual = wrapped.flatten();

        ok(actual instanceof _);
        deepEqual(actual.value(), [1, 2, 3, [4]]);

        actual = wrapped.flattenDeep();

        ok(actual instanceof _);
        deepEqual(actual.value(), [1, 2, 3, 4]);
      }
      else {
        skipTest(4);
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

    test('should iterate over `length` properties', 1, function() {
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
      '_baseEach',
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
      'keyBy',
      'map',
      'mapKeys',
      'mapValues',
      'maxBy',
      'minBy',
      'omitBy',
      'partition',
      'pickBy',
      'reject',
      'some'
    ];

    var arrayMethods = [
      'findIndex',
      'findLastIndex',
      'maxBy',
      'minBy'
    ];

    var collectionMethods = [
      '_baseEach',
      'countBy',
      'every',
      'filter',
      'find',
      'findLast',
      'forEach',
      'forEachRight',
      'groupBy',
      'keyBy',
      'map',
      'partition',
      'reduce',
      'reduceRight',
      'reject',
      'some'
    ];

    var forInMethods = [
      'forIn',
      'forInRight',
      'omitBy',
      'pickBy'
    ];

    var iterationMethods = [
      '_baseEach',
      'forEach',
      'forEachRight',
      'forIn',
      'forInRight',
      'forOwn',
      'forOwnRight'
    ];

    var objectMethods = [
      'findKey',
      'findLastKey',
      'forIn',
      'forInRight',
      'forOwn',
      'forOwnRight',
      'mapKeys',
      'mapValues',
      'omitBy',
      'pickBy'
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
      'forEach',
      'forEachRight',
      'forIn',
      'forInRight',
      'forOwn',
      'forOwnRight',
      'max',
      'maxBy',
      'min',
      'minBy',
      'some'
    ];

    _.each(methods, function(methodName) {
      var array = [1, 2, 3],
          func = _[methodName],
          isBy = /(^partition|By)$/.test(methodName),
          isFind = /^find/.test(methodName),
          isSome = methodName == 'some';

      test('`_.' + methodName + '` should provide the correct iteratee arguments', 1, function() {
        if (func) {
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
          if (isBy) {
            expected.length = 1;
          }
          deepEqual(args, expected);
        }
        else {
          skipTest();
        }
      });

      test('`_.' + methodName + '` should treat sparse arrays as dense', 1, function() {
        if (func) {
          var array = [1];
          array[2] = 3;

          var expected = [[1, 0, array], [undefined, 1, array], [3, 2, array]];

          if (isBy) {
            expected = _.map(expected, function(args) {
              return args.slice(0, 1);
            });
          }
          else if (_.includes(objectMethods, methodName)) {
            expected = _.map(expected, function(args) {
              args[1] += '';
              return args;
            });
          }
          if (_.includes(rightMethods, methodName)) {
            expected.reverse();
          }
          var argsList = [];
          func(array, function() {
            argsList.push(slice.call(arguments));
            return !(isFind || isSome);
          });

          deepEqual(argsList, expected);
        }
        else {
          skipTest();
        }
      });
    });

    _.each(_.difference(methods, objectMethods), function(methodName) {
      var array = [1, 2, 3],
          func = _[methodName],
          isEvery = methodName == 'every';

      array.a = 1;

      test('`_.' + methodName + '` should not iterate custom properties on arrays', 1, function() {
        if (func) {
          var keys = [];
          func(array, function(value, key) {
            keys.push(key);
            return isEvery;
          });

          ok(!_.includes(keys, 'a'));
        }
        else {
          skipTest();
        }
      });
    });

    _.each(_.difference(methods, unwrappedMethods), function(methodName) {
      var array = [1, 2, 3],
          func = _[methodName],
          isBaseEach = methodName == '_baseEach';

      test('`_.' + methodName + '` should return a wrapped value when implicitly chaining', 1, function() {
        if (!(isBaseEach || isNpm)) {
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

      test('`_.' + methodName + '` should return an unwrapped value when implicitly chaining', 1, function() {
        if (!isNpm) {
          var actual = _(array)[methodName](_.noop);
          ok(!(actual instanceof _));
        }
        else {
          skipTest();
        }
      });

      test('`_.' + methodName + '` should return a wrapped value when explicitly chaining', 2, function() {
        if (!isNpm) {
          var wrapped = _(array).chain(),
              actual = wrapped[methodName](_.noop);

          ok(actual instanceof _);
          notStrictEqual(actual, wrapped);
        }
        else {
          skipTest(2);
        }
      });
    });

    _.each(_.difference(methods, arrayMethods, forInMethods), function(methodName) {
      var array = [1, 2, 3],
          func = _[methodName];

      test('`_.' + methodName + '` iterates over own properties of objects', 1, function() {
        function Foo() { this.a = 1; }
        Foo.prototype.b = 2;

        if (func) {
          var values = [];
          func(new Foo, function(value) { values.push(value); });
          deepEqual(values, [1]);
        }
        else {
          skipTest();
        }
      });
    });

    _.each(iterationMethods, function(methodName) {
      var array = [1, 2, 3],
          func = _[methodName];

      test('`_.' + methodName + '` should return the collection', 1, function() {
        if (func) {
          strictEqual(func(array, Boolean), array);
        }
        else {
          skipTest();
        }
      });
    });

    _.each(collectionMethods, function(methodName) {
      var func = _[methodName];

      test('`_.' + methodName + '` should use `isArrayLike` to determine whether a value is array-like', 3, function() {
        if (func) {
          var isIteratedAsObject = function(object) {
            var result = false;
            func(object, function() { result = true; }, 0);
            return result;
          };

          var values = [-1, '1', 1.1, Object(1), MAX_SAFE_INTEGER + 1],
              expected = _.map(values, _.constant(true));

          var actual = _.map(values, function(length) {
            return isIteratedAsObject({ 'length': length });
          });

          var Foo = function(a) {};
          Foo.a = 1;

          deepEqual(actual, expected);
          ok(isIteratedAsObject(Foo));
          ok(!isIteratedAsObject({ 'length': 0 }));
        }
        else {
          skipTest(3);
        }
      });
    });

    _.each(methods, function(methodName) {
      var array = [1, 2, 3],
          func = _[methodName],
          isFind = /^find/.test(methodName),
          isSome = methodName == 'some',
          isReduce = /^reduce/.test(methodName);

      test('`_.' + methodName + '` should ignore changes to `array.length`', 1, function() {
        if (func) {
          var count = 0,
              array = [1];

          func(array, function() {
            if (++count == 1) {
              array.push(2);
            }
            return !(isFind || isSome);
          }, isReduce ? array : null);

          strictEqual(count, 1);
        }
        else {
          skipTest();
        }
      });
    });

    _.each(_.difference(_.union(methods, collectionMethods), arrayMethods), function(methodName) {
      var func = _[methodName],
          isFind = /^find/.test(methodName),
          isSome = methodName == 'some',
          isReduce = /^reduce/.test(methodName);

      test('`_.' + methodName + '` should ignore added `object` properties', 1, function() {
        if (func) {
          var count = 0,
              object = { 'a': 1 };

          func(object, function() {
            if (++count == 1) {
              object.b = 2;
            }
            return !(isFind || isSome);
          }, isReduce ? object : null);

          strictEqual(count, 1);
        }
        else {
          skipTest();
        }
      });
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('object assignments');

  _.each(['assign', 'defaults', 'extend', 'merge'], function(methodName) {
    var func = _[methodName],
        isAssign = methodName == 'assign',
        isDefaults = methodName == 'defaults';

    test('`_.' + methodName + '` should coerce primitives to objects', 1, function() {
      var expected = _.map(falsey, _.constant(true));

      var actual = _.map(falsey, function(object, index) {
        var result = index ? func(object) : func();
        return _.isEqual(result, Object(object));
      });

      deepEqual(actual, expected);
    });

    test('`_.' + methodName + '` should assign own ' + (isAssign ? '' : 'and inherited ') + 'source properties', 1, function() {
      function Foo() { this.a = 1; }
      Foo.prototype.b = 2;

      var expected = isAssign ? { 'a': 1 } : { 'a': 1, 'b': 2 };
      deepEqual(func({}, new Foo), expected);
    });

    test('`_.' + methodName + '` should not error on nullish sources', 1, function() {
      try {
        deepEqual(func({ 'a': 1 }, undefined, { 'b': 2 }, null), { 'a': 1, 'b': 2 });
      } catch (e) {
        ok(false, e.message);
      }
    });

    test('`_.' + methodName + '` should not error when `object` is nullish and source objects are provided', 1, function() {
      var expected = _.times(2, _.constant(true));

      var actual = _.map([null, undefined], function(value) {
        try {
          return _.isEqual(func(value, { 'a': 1 }), {});
        } catch (e) {
          return false;
        }
      });

      deepEqual(actual, expected);
    });

    test('`_.' + methodName + '` should work as an iteratee for methods like `_.reduce`', 1, function() {
      var array = [{ 'a': 1 }, { 'b': 2 }, { 'c': 3 }],
          expected = { 'a': 1, 'b': 2, 'c': 3 };

      expected.a = isDefaults ? 0 : 1;
      deepEqual(_.reduce(array, func, { 'a': 0 }), expected);
    });

    test('`_.' + methodName + '` should not return the existing wrapped value when chaining', 1, function() {
      if (!isNpm) {
        var wrapped = _({ 'a': 1 }),
            actual = wrapped[methodName]({ 'b': 2 });

        notStrictEqual(actual, wrapped);
      }
      else {
        skipTest();
      }
    });
  });

  _.each(['assign', 'extend', 'merge'], function(methodName) {
    var func = _[methodName];

    test('`_.' + methodName + '` should not treat `object` as `source`', 1, function() {
      function Foo() {}
      Foo.prototype.a = 1;

      var actual = func(new Foo, { 'b': 2 });
      ok(!_.has(actual, 'a'));
    });
  });

  _.each(['assign', 'assignWith', 'defaults', 'extend', 'extendWith', 'merge', 'mergeWith'], function(methodName) {
    var func = _[methodName];

    test('`_.' + methodName + '` should not assign values that are the same as their destinations', 4, function() {
      _.each(['a', ['a'], { 'a': 1 }, NaN], function(value) {
        if (defineProperty) {
          var object = {},
              pass = true;

          defineProperty(object, 'a', {
            'get': _.constant(value),
            'set': function() { pass = false; }
          });

          func(object, { 'a': value });
          ok(pass, value);
        }
        else {
          skipTest();
        }
      });
    });
  });

  _.each(['assignWith', 'extendWith', 'mergeWith'], function(methodName) {
    var func = _[methodName],
        isMergeWith = methodName == 'mergeWith';

    test('`_.' + methodName + '` should provide the correct `customizer` arguments', 3, function() {
      var args,
          object = { 'a': 1 },
          source = { 'a': 2 },
          expected = _.map([1, 2, 'a', object, source], _.clone);

      if (isMergeWith) {
        expected.push(undefined, undefined);
      }
      func(object, source, function() {
        args || (args = _.map(arguments, _.clone));
      });

      deepEqual(args, expected, 'primitive property values');

      args = null;
      object = { 'a': 1 };
      source = { 'b': 2 };
      expected = _.map([undefined, 2, 'b', object, source], _.clone);

      if (isMergeWith) {
        expected.push(undefined, undefined);
      }
      func(object, source, function() {
        args || (args = _.map(arguments, _.clone));
      });

      deepEqual(args, expected, 'missing destination property');

      var argsList = [],
          objectValue = [1, 2],
          sourceValue = { 'b': 2 };

      object = { 'a': objectValue };
      source = { 'a': sourceValue };
      expected = [_.map([objectValue, sourceValue, 'a', object, source], _.cloneDeep)];

      if (isMergeWith) {
        expected[0].push([], []);
        expected.push(_.map([undefined, 2, 'b', objectValue, sourceValue, [sourceValue], [objectValue]], _.cloneDeep));
      }
      func(object, source, function() {
        argsList.push(_.map(arguments, _.cloneDeep));
      });

      deepEqual(argsList, expected, 'object property values');
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

  _.each(['_baseEach', 'forEach', 'forEachRight', 'forIn', 'forInRight', 'forOwn', 'forOwnRight', 'transform'], function(methodName) {
    var func = _[methodName];

    test('`_.' + methodName + '` can exit early when iterating arrays', 1, function() {
      if (func) {
        var array = [1, 2, 3],
            values = [];

        func(array, function(value, other) {
          values.push(_.isArray(value) ? other : value);
          return false;
        });

        deepEqual(values, [_.endsWith(methodName, 'Right') ? 3 : 1]);
      }
      else {
        skipTest();
      }
    });

    test('`_.' + methodName + '` can exit early when iterating objects', 1, function() {
      if (func) {
        var object = { 'a': 1, 'b': 2, 'c': 3 },
            values = [];

        func(object, function(value, other) {
          values.push(_.isArray(value) ? other : value);
          return false;
        });

        strictEqual(values.length, 1);
      }
      else {
        skipTest();
      }
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
        return isEven(count) ? stringLiteral : stringObject;
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

    test('should work with a "_.property" style `iteratee`', 1, function() {
      var actual = _.groupBy(['one', 'two', 'three'], 'length');
      deepEqual(actual, { '3': ['one', 'two'], '5': ['three'] });
    });

    test('should only add values to own, not inherited, properties', 2, function() {
      var actual = _.groupBy([4.2, 6.1, 6.4], function(num) {
        return Math.floor(num) > 4 ? 'hasOwnProperty' : 'constructor';
      });

      deepEqual(actual.constructor, [4.2]);
      deepEqual(actual.hasOwnProperty, [6.1, 6.4]);
    });

    test('should work with a number for `iteratee`', 2, function() {
      var array = [
        [1, 'a'],
        [2, 'a'],
        [2, 'b']
      ];

      deepEqual(_.groupBy(array, 0), { '1': [[1, 'a']], '2': [[2, 'a'], [2, 'b']] });
      deepEqual(_.groupBy(array, 1), { 'a': [[1, 'a'], [2, 'a']], 'b': [[2, 'b']] });
    });

    test('should work with an object for `collection`', 1, function() {
      var actual = _.groupBy({ 'a': 4.2, 'b': 6.1, 'c': 6.4 }, function(num) {
        return Math.floor(num);
      });

      deepEqual(actual, { '4': [4.2], '6': [6.1, 6.4] });
    });

    test('should work in a lazy chain sequence', 1, function() {
      if (!isNpm) {
        var array = _.range(LARGE_ARRAY_SIZE).concat(
          _.range(Math.floor(LARGE_ARRAY_SIZE / 2), LARGE_ARRAY_SIZE),
          _.range(Math.floor(LARGE_ARRAY_SIZE / 1.5), LARGE_ARRAY_SIZE)
        );

        var iteratee = function(value) { value.push(value[0]); return value; },
            predicate = function(value) { return isEven(value[0]); },
            actual = _(array).groupBy().map(iteratee).filter(predicate).take().value();

        deepEqual(actual, _.take(_.filter(_.map(_.groupBy(array), iteratee), predicate)));
      }
      else {
        skipTest();
      }
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.gt');

  (function() {
    test('should return `true` if `value` is greater than `other`', 2, function() {
      strictEqual(_.gt(3, 1), true);
      strictEqual(_.gt('def', 'abc'), true);
    });

    test('should return `false` if `value` is less than or equal to `other`', 4, function() {
      strictEqual(_.gt(1, 3), false);
      strictEqual(_.gt(3, 3), false);
      strictEqual(_.gt('abc', 'def'), false);
      strictEqual(_.gt('def', 'def'), false);
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.gte');

  (function() {
    test('should return `true` if `value` is greater than or equal to `other`', 4, function() {
      strictEqual(_.gte(3, 1), true);
      strictEqual(_.gte(3, 3), true);
      strictEqual(_.gte('def', 'abc'), true);
      strictEqual(_.gte('def', 'def'), true);
    });

    test('should return `false` if `value` is less than `other`', 2, function() {
      strictEqual(_.gte(1, 3), false);
      strictEqual(_.gte('abc', 'def'), false);
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('has methods');

  _.each(['has', 'hasIn'], function(methodName) {
    var args = (function() { return arguments; }(1, 2, 3)),
        func = _[methodName],
        isHas = methodName == 'has';

    test('`_.' + methodName + '` should check for own properties', 2, function() {
      var object = { 'a': 1 };

      _.each(['a', ['a']], function(path) {
        strictEqual(func(object, path), true);
      });
    });

    test('`_.' + methodName + '` should not use the `hasOwnProperty` method of the object', 1, function() {
      var object = { 'hasOwnProperty': null, 'a': 1 };
      strictEqual(func(object, 'a'), true);
    });

    test('`_.' + methodName + '` should support deep paths', 2, function() {
      var object = { 'a': { 'b': { 'c': 3 } } };

      _.each(['a.b.c', ['a', 'b', 'c']], function(path) {
        strictEqual(func(object, path), true);
      });
    });

    test('`_.' + methodName + '` should work with non-string `path` arguments', 2, function() {
      var array = [1, 2, 3];

      _.each([1, [1]], function(path) {
        strictEqual(func(array, path), true);
      });
    });

    test('`_.' + methodName + '` should coerce key to a string', 1, function() {
      function fn() {}
      fn.toString = _.constant('fn');

      var expected = [1, 1, 2, 2, 3, 3, 4, 4],
          objects = [{ 'null': 1 }, { 'undefined': 2 }, { 'fn': 3 }, { '[object Object]': 4 }],
          values = [null, undefined, fn, {}];

      var actual = _.transform(objects, function(result, object, index) {
        var key = values[index];
        _.each([key, [key]], function(path) {
          var prop = _.property(key);
          result.push(prop(object));
        });
      });

      deepEqual(actual, expected);
    });

    test('`_.' + methodName + '` should return `' + (isHas ? 'false' : 'true') + '` for inherited properties', 2, function() {
      function Foo() {}
      Foo.prototype.a = 1;

      _.each(['a', ['a']], function(path) {
        strictEqual(func(new Foo, path), !isHas);
      });
    });

    test('`_.' + methodName + '` should treat sparse arrays as dense', 1, function() {
      strictEqual(func(Array(1), 0), true);
    });

    test('`_.' + methodName + '` should work with `arguments` objects', 1, function() {
      strictEqual(func(args, 1), true);
    });

    test('`_.' + methodName + '` should check for a key over a path', 2, function() {
      var object = { 'a.b.c': 3, 'a': { 'b': { 'c': 4 } } };

      _.each(['a.b.c', ['a.b.c']], function(path) {
        strictEqual(func(object, path), true);
      });
    });

    test('`_.' + methodName + '` should return `false` when `object` is nullish', 2, function() {
      var values = [null, undefined],
          expected = _.map(values, _.constant(false));

      _.each(['constructor', ['constructor']], function(path) {
        var actual = _.map(values, function(value) {
          return func(value, path);
        });

        deepEqual(actual, expected);
      });
    });

    test('`_.' + methodName + '` should return `false` with deep paths when `object` is nullish', 2, function() {
      var values = [null, undefined],
          expected = _.map(values, _.constant(false));

      _.each(['constructor.prototype.valueOf', ['constructor', 'prototype', 'valueOf']], function(path) {
        var actual = _.map(values, function(value) {
          return func(value, path);
        });

        deepEqual(actual, expected);
      });
    });

    test('`_.' + methodName + '` should return `false` if parts of `path` are missing', 4, function() {
      var object = {};

      _.each(['a', 'a[1].b.c', ['a'], ['a', '1', 'b', 'c']], function(path) {
        strictEqual(func(object, path), false);
      });
    });
  });

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
      var isStr = typeof collection == 'string',
          values = _.toArray(collection),
          length = values.length;

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
          strictEqual(_.includes(collection, '', fromIndex), (isStr && fromIndex == length));
        });
      });

      test('should work with ' + key + ' and treat falsey `fromIndex` values as `0`', 1, function() {
        var expected = _.map(falsey, _.constant(true));

        var actual = _.map(falsey, function(fromIndex) {
          return _.includes(collection, values[0], fromIndex);
        });

        deepEqual(actual, expected);
      });

      test('should work with ' + key + ' and coerce non-integer `fromIndex` values to integers', 3, function() {
        strictEqual(_.includes(collection, values[0], '1'), false);
        strictEqual(_.includes(collection, values[0], 0.1), true);
        strictEqual(_.includes(collection, values[0], NaN), true);
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

      test('should work with ' + key + ' and floor `position` values', 1, function() {
        strictEqual(_.includes(collection, 2, 1.2), true);
      });

      test('should work with ' + key + ' and return an unwrapped value implicitly when chaining', 1, function() {
        if (!isNpm) {
          strictEqual(_(collection).includes(3), true);
        }
        else {
          skipTest();
        }
      });

      test('should work with ' + key + ' and return a wrapped value when explicitly chaining', 1, function() {
        if (!isNpm) {
          ok(_(collection).chain().includes(3) instanceof _);
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
        } catch (e) {}
      });

      deepEqual(actual, expected);
    });

    test('should match `NaN`', 1, function() {
      strictEqual(_.includes([1, NaN, 3], NaN), true);
    });

    test('should match `-0` as `0`', 2, function() {
      strictEqual(_.includes([-0], 0), true);
      strictEqual(_.includes([0], -0), true);
    });

    test('should work as an iteratee for methods like `_.reduce`', 1, function() {
      var array1 = [1, 2, 3],
          array2 = [2, 3, 1];

      ok(_.every(array1, _.partial(_.includes, array2)));
    });
  }(1, 2, 3, 4));

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

    test('should treat falsey `fromIndex` values as `0`', 1, function() {
      var expected = _.map(falsey, _.constant(0));

      var actual = _.map(falsey, function(fromIndex) {
        return _.indexOf(array, 1, fromIndex);
      });

      deepEqual(actual, expected);
    });

    test('should coerce `fromIndex` to an integer', 1, function() {
      strictEqual(_.indexOf(array, 2, 1.2), 1);
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
        sorted = [1, 3, new Foo, new Foo],
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

    test('`_.uniqBy` should work with a custom `_.indexOf` method', 2, function() {
      if (!isModularize) {
        _.indexOf = custom;
        deepEqual(_.uniqBy(array, _.identity), array.slice(0, 3));
        deepEqual(_.uniqBy(largeArray, _.identity), [largeArray[0]]);
        _.indexOf = indexOf;
      }
      else {
        skipTest(2);
      }
    });

    test('`_.sortedUniq` should work with a custom `_.indexOf` method', 2, function() {
      if (!isModularize) {
        _.indexOf = custom;
        deepEqual(_.sortedUniq(sorted), sorted.slice(0, 3));
        deepEqual(_.sortedUniq(largeArray), [largeArray[0]]);
        _.indexOf = indexOf;
      }
      else {
        skipTest(2);
      }
    });

    test('`_.sortedUniqBy` should work with a custom `_.indexOf` method', 2, function() {
      if (!isModularize) {
        _.indexOf = custom;
        deepEqual(_.sortedUniqBy(sorted, _.identity), sorted.slice(0, 3));
        deepEqual(_.sortedUniqBy(largeArray, _.identity), [largeArray[0]]);
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

      var actual = _.map(falsey, function(array, index) {
        try {
          return index ? _.initial(array) : _.initial();
        } catch (e) {}
      });

      deepEqual(actual, expected);
    });

    test('should exclude last element', 1, function() {
      deepEqual(_.initial(array), [1, 2]);
    });

    test('should return an empty when querying empty arrays', 1, function() {
      deepEqual(_.initial([]), []);
    });

    test('should work as an iteratee for methods like `_.map`', 1, function() {
      var array = [[1, 2, 3], [4, 5, 6], [7, 8, 9]],
          actual = _.map(array, _.initial);

      deepEqual(actual, [[1, 2], [4, 5], [7, 8]]);
    });

    test('should work in a lazy chain sequence', 4, function() {
      if (!isNpm) {
        var array = _.range(LARGE_ARRAY_SIZE),
            values = [];

        var actual = _(array).initial().filter(function(value) {
          values.push(value);
          return false;
        })
        .value();

        deepEqual(actual, []);
        deepEqual(values, _.initial(array));

        values = [];

        actual = _(array).filter(function(value) {
          values.push(value);
          return isEven(value);
        })
        .initial()
        .value();

        deepEqual(actual, _.initial(_.filter(array, isEven)));
        deepEqual(values, array);
      }
      else {
        skipTest(4);
      }
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.inRange');

  (function() {
    test('should work with an `end` argument', 3, function() {
      strictEqual(_.inRange(3, 5), true);
      strictEqual(_.inRange(5, 5), false);
      strictEqual(_.inRange(6, 5), false);
    });

    test('should work with `start` and `end` arguments', 4, function() {
      strictEqual(_.inRange(1, 1, 5), true);
      strictEqual(_.inRange(3, 1, 5), true);
      strictEqual(_.inRange(0, 1, 5), false);
      strictEqual(_.inRange(5, 1, 5), false);
    });

    test('should treat falsey `start` arguments as `0`', 13, function() {
      _.each(falsey, function(value, index) {
        if (index) {
          strictEqual(_.inRange(0, value), false);
          strictEqual(_.inRange(0, value, 1), true);
        } else {
          strictEqual(_.inRange(0), false);
        }
      });
    });

    test('should swap `start` and `end` when `start` is greater than `end`', 2, function() {
      strictEqual(_.inRange(2, 5, 1), true);
      strictEqual(_.inRange(-3, -2, -6), true);
    });

    test('should work with a floating point `n` value', 4, function() {
      strictEqual(_.inRange(0.5, 5), true);
      strictEqual(_.inRange(1.2, 1, 5), true);
      strictEqual(_.inRange(5.2, 5), false);
      strictEqual(_.inRange(0.5, 1, 5), false);
    });

    test('should coerce arguments to finite numbers', 1, function() {
      var actual = [_.inRange(0, '0', 1), _.inRange(0, '1'), _.inRange(0, 0, '1'), _.inRange(0, NaN, 1), _.inRange(-1, -1, NaN)],
          expected = _.map(actual, _.constant(true));

      deepEqual(actual, expected);
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

    test('should return an array of unique values', 1, function() {
      var actual = _.intersection([1, 1, 3, 2, 2], [5, 2, 2, 1, 4], [2, 1, 1]);
      deepEqual(actual, [1, 2]);
    });

    test('should match `NaN`', 1, function() {
      var actual = _.intersection([1, NaN, 3], [NaN, 5, NaN]);
      deepEqual(actual, [NaN]);
    });

    test('should work with large arrays of objects', 2, function() {
      var object = {},
          largeArray = _.times(LARGE_ARRAY_SIZE, _.constant(object));

      deepEqual(_.intersection([object], largeArray), [object]);
      deepEqual(_.intersection(_.range(LARGE_ARRAY_SIZE), [1]), [1]);
    });

    test('should work with large arrays of `NaN`', 1, function() {
      var largeArray = _.times(LARGE_ARRAY_SIZE, _.constant(NaN));
      deepEqual(_.intersection([1, NaN, 3], largeArray), [NaN]);
    });

    test('should work with `arguments` objects', 2, function() {
      var array = [0, 1, null, 3],
          expected = [1, 3];

      deepEqual(_.intersection(array, args), expected);
      deepEqual(_.intersection(args, array), expected);
    });

    test('should work with a single array', 1, function() {
      var actual = _.intersection([1, 1, 3, 2, 2]);
      deepEqual(actual, [1, 3, 2]);
    });

    test('should treat values that are not arrays or `arguments` objects as empty', 3, function() {
      var array = [0, 1, null, 3],
          values = [3, null, { '0': 1 }];

      _.each(values, function(value) {
        deepEqual(_.intersection(array, value), []);
      });
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

    test('should work as an iteratee for methods like `_.map`', 2, function() {
      var regular = { 'a': 1, 'b': 2, 'c': 1 },
          inverted = { '1': 'c', '2': 'b' };

      var array = [regular, regular, regular],
          object = { 'a': regular, 'b': regular, 'c': regular },
          expected = _.map(array, _.constant(inverted));

      _.each([array, object], function(collection) {
        var actual = _.map(collection, _.invert);
        deepEqual(actual, expected);
      });
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

    test('should work with a function for `methodName`', 1, function() {
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

    test('should not error on nullish elements', 1, function() {
      var array = ['a', null, undefined, 'd'];

      try {
        var actual = _.invoke(array, 'toUpperCase');
      } catch (e) {}

      deepEqual(_.invoke(array, 'toUpperCase'), ['A', undefined, undefined, 'D']);
    });

    test('should not error on elements with missing properties', 1, function() {
      var objects = _.map([null, undefined, _.constant(1)], function(value) {
        return { 'a': value };
      });

      var expected = _.times(objects.length - 1, _.constant(undefined)).concat(1);

      try {
        var actual = _.invoke(objects, 'a');
      } catch (e) {}

      deepEqual(actual, expected);
    });

    test('should invoke deep property methods with the correct `this` binding', 2, function() {
      var object = { 'a': { 'b': function() { return this.c; }, 'c': 1 } };

      _.each(['a.b', ['a', 'b']], function(path) {
        deepEqual(_.invoke([object], path), [1]);
      });
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.isArguments');

  (function() {
    var args = (function() { return arguments; }(1, 2, 3)),
        strictArgs = (function() { 'use strict'; return arguments; }(1, 2, 3));

    test('should return `true` for `arguments` objects', 2, function() {
      strictEqual(_.isArguments(args), true);
      strictEqual(_.isArguments(strictArgs), true);
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
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.isArray');

  (function() {
    var args = arguments;

    test('should return `true` for arrays', 1, function() {
      strictEqual(_.isArray([1, 2, 3]), true);
    });

    test('should return `false` for non-arrays', 12, function() {
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

  QUnit.module('lodash.isArrayLike');

  (function() {
    var args = arguments;

    test('should return `true` for array-like values', 1, function() {
      var values = [args, [1, 2, 3], { '0': 1, 'length': 1 }, 'a'],
          expected = _.map(values, _.constant(true)),
          actual = _.map(values, _.isArrayLike);

      deepEqual(actual, expected);
    });

    test('should return `false` for non-arrays', 10, function() {
      var expected = _.map(falsey, function(value) { return value === ''; });

      var actual = _.map(falsey, function(value, index) {
        return index ? _.isArrayLike(value) : _.isArrayLike();
      });

      deepEqual(actual, expected);

      strictEqual(_.isArrayLike(true), false);
      strictEqual(_.isArrayLike(new Date), false);
      strictEqual(_.isArrayLike(new Error), false);
      strictEqual(_.isArrayLike(_), false);
      strictEqual(_.isArrayLike(slice), false);
      strictEqual(_.isArrayLike(), false);
      strictEqual(_.isArrayLike(1), false);
      strictEqual(_.isArrayLike(NaN), false);
      strictEqual(_.isArrayLike(/x/), false);
    });

    test('should work with an array from another realm', 1, function() {
      if (_._object) {
        var values = [_._arguments, _._array, _._string],
            expected = _.map(values, _.constant(true)),
            actual = _.map(values, _.isArrayLike);

        deepEqual(actual, expected);
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

    test('should return `false` for non-booleans', 12, function() {
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

    test('should return `false` for non-dates', 12, function() {
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

    test('should return `false` for plain objects', 7, function() {
      var element = body || new Element;

      strictEqual(_.isElement(element), true);
      strictEqual(_.isElement({ 'nodeType': 1 }), false);
      strictEqual(_.isElement({ 'nodeType': Object(1) }), false);
      strictEqual(_.isElement({ 'nodeType': true }), false);
      strictEqual(_.isElement({ 'nodeType': [1] }), false);
      strictEqual(_.isElement({ 'nodeType': '1' }), false);
      strictEqual(_.isElement({ 'nodeType': '001' }), false);
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

    test('should work with `arguments` objects', 1, function() {
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

    test('should return an unwrapped value when implicitly chaining', 1, function() {
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
    test('should compare primitives', 1, function() {
      var pairs = [
        [1, 1, true], [1, Object(1), true], [1, '1', false], [1, 2, false],
        [-0, -0, true], [0, 0, true], [0, Object(0), true], [Object(0), Object(0), true], [-0, 0, true], [0, '0', false], [0, null, false],
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

    test('should compare arrays', 6, function() {
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

    test('should treat arrays with identical values but different non-index properties as equal', 3, function() {
      var array1 = [1, 2, 3],
          array2 = [1, 2, 3];

      array1.every = array1.filter = array1.forEach =
      array1.indexOf = array1.lastIndexOf = array1.map =
      array1.some = array1.reduce = array1.reduceRight = null;

      array2.concat = array2.join = array2.pop =
      array2.reverse = array2.shift = array2.slice =
      array2.sort = array2.splice = array2.unshift = null;

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

    test('should compare sparse arrays', 3, function() {
      var array = Array(1);

      strictEqual(_.isEqual(array, Array(1)), true);
      strictEqual(_.isEqual(array, [undefined]), true);
      strictEqual(_.isEqual(array, Array(2)), false);
    });

    test('should compare plain objects', 5, function() {
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

    test('should compare nested objects', 1, function() {
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

    test('should compare object instances', 4, function() {
      function Foo() { this.a = 1; }
      Foo.prototype.a = 1;

      function Bar() { this.a = 1; }
      Bar.prototype.a = 2;

      strictEqual(_.isEqual(new Foo, new Foo), true);
      strictEqual(_.isEqual(new Foo, new Bar), false);
      strictEqual(_.isEqual({ 'a': 1 }, new Foo), false);
      strictEqual(_.isEqual({ 'a': 2 }, new Bar), false);
    });

    test('should compare objects with constructor properties', 5, function() {
      strictEqual(_.isEqual({ 'constructor': 1 },   { 'constructor': 1 }), true);
      strictEqual(_.isEqual({ 'constructor': 1 },   { 'constructor': '1' }), false);
      strictEqual(_.isEqual({ 'constructor': [1] }, { 'constructor': [1] }), true);
      strictEqual(_.isEqual({ 'constructor': [1] }, { 'constructor': ['1'] }), false);
      strictEqual(_.isEqual({ 'constructor': Object }, {}), false);
    });

    test('should compare arrays with circular references', 4, function() {
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

    test('should compare objects with circular references', 4, function() {
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

    test('should compare objects with multiple circular references', 3, function() {
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

    test('should compare objects with complex circular references', 1, function() {
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

    test('should compare objects with shared property values', 1, function() {
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

    test('should treat objects created by `Object.create(null)` like a plain object', 2, function() {
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

    test('should compare `arguments` objects', 2, function() {
      var args1 = (function() { return arguments; }(1, 2, 3)),
          args2 = (function() { return arguments; }(1, 2, 3)),
          args3 = (function() { return arguments; }(1, 2));

      strictEqual(_.isEqual(args1, args2), true);
      strictEqual(_.isEqual(args1, args3), false);
    });

    test('should treat `arguments` objects like `Object` objects', 4, function() {
      var args = (function() { return arguments; }(1, 2, 3)),
          object = { '0': 1, '1': 2, '2': 3 };

      function Foo() {}
      Foo.prototype = object;

      strictEqual(_.isEqual(args, object), true);
      strictEqual(_.isEqual(object, args), true);

      strictEqual(_.isEqual(args, new Foo), false);
      strictEqual(_.isEqual(new Foo, args), false);
    });

    test('should compare date objects', 4, function() {
      strictEqual(_.isEqual(new Date(2012, 4, 23), new Date(2012, 4, 23)), true);
      strictEqual(_.isEqual(new Date(2012, 4, 23), new Date(2013, 3, 25)), false);
      strictEqual(_.isEqual(new Date(2012, 4, 23), { 'getTime': _.constant(1337756400000) }), false);
      strictEqual(_.isEqual(new Date('a'), new Date('a')), false);
    });

    test('should compare error objects', 1, function() {
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

    test('should compare functions', 2, function() {
      function a() { return 1 + 2; }
      function b() { return 1 + 2; }

      strictEqual(_.isEqual(a, a), true);
      strictEqual(_.isEqual(a, b), false);
    });

    test('should compare maps', 4, function() {
      if (Map) {
        var map1 = new Map,
            map2 = new Map;

        map1.set('a', 1);
        map2.set('b', 2);
        strictEqual(_.isEqual(map1, map2), false);

        map1.set('b', 2);
        map2.set('a', 1);
        strictEqual(_.isEqual(map1, map2), true);

        map1['delete']('a');
        map1.set('a', 1);
        strictEqual(_.isEqual(map1, map2), true);

        map2['delete']('a');
        strictEqual(_.isEqual(map1, map2), false);
      }
      else {
        skipTest(4);
      }
    });

    test('should compare regexes', 5, function() {
      strictEqual(_.isEqual(/x/gim, /x/gim), true);
      strictEqual(_.isEqual(/x/gim, /x/mgi), true);
      strictEqual(_.isEqual(/x/gi, /x/g), false);
      strictEqual(_.isEqual(/x/, /y/), false);
      strictEqual(_.isEqual(/x/g, { 'global': true, 'ignoreCase': false, 'multiline': false, 'source': 'x' }), false);
    });

    test('should compare sets', 4, function() {
      if (Set) {
        var set1 = new Set,
            set2 = new Set;

        set1.add(1);
        set2.add(2);
        strictEqual(_.isEqual(set1, set2), false);

        set1.add(2);
        set2.add(1);
        strictEqual(_.isEqual(set1, set2), true);

        set1['delete'](1);
        set1.add(1);
        strictEqual(_.isEqual(set1, set2), true);

        set2['delete'](1);
        strictEqual(_.isEqual(set1, set2), false);
      }
      else {
        skipTest(4);
      }
    });

    test('should compare typed arrays', 1, function() {
      var pairs = _.map(typedArrays, function(type, index) {
        var otherType = typedArrays[(index + 1) % typedArrays.length],
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

    test('should work as an iteratee for `_.every`', 1, function() {
      var actual = _.every([1, 1, 1], _.partial(_.isEqual, 1));
      ok(actual);
    });

    test('should return `true` for like-objects from different documents', 4, function() {
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
        } catch (e) {
          ok(false, e.message);
        }
      }
      else {
        skipTest();
      }
    });

    test('should compare wrapped values', 32, function() {
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

    test('should compare wrapped and non-wrapped values', 4, function() {
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

    test('should return an unwrapped value when implicitly chaining', 1, function() {
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

  QUnit.module('lodash.isEqualWith');

  (function() {
    test('should provide the correct `customizer` arguments', 1, function() {
      var argsList = [],
          object1 = { 'a': [1, 2], 'b': null },
          object2 = { 'a': [1, 2], 'b': null };

      object1.b = object2;
      object2.b = object1;

      var expected = [
        [object1, object2],
        [object1.a, object2.a, 'a', object1, object2, [], []],
        [object1.a[0], object2.a[0], 0, object1.a, object2.a, [], []],
        [object1.a[1], object2.a[1], 1, object1.a, object2.a, [], []],
        [object1.b, object2.b, 'b', object1.b, object2.b, [], []],
        [object1.b.a, object2.b.a, 'a', object1.b, object2.b, [], []],
        [object1.b.a[0], object2.b.a[0], 0, object1.b.a, object2.b.a, [], []],
        [object1.b.a[1], object2.b.a[1], 1, object1.b.a, object2.b.a, [], []],
        [object1.b.b, object2.b.b, 'b', object1.b.b, object2.b.b, [], []]
      ];

      _.isEqualWith(object1, object2, function() {
        argsList.push(slice.call(arguments));
      });

      deepEqual(argsList, expected);
    });

    test('should handle comparisons if `customizer` returns `undefined`', 3, function() {
      strictEqual(_.isEqualWith('a', 'a', _.noop), true);
      strictEqual(_.isEqualWith(['a'], ['a'], _.noop), true);
      strictEqual(_.isEqualWith({ '0': 'a' }, { '0': 'a' }, _.noop), true);
    });

    test('should not handle comparisons if `customizer` returns `true`', 3, function() {
      var customizer = function(value) {
        return _.isString(value) || undefined;
      };

      strictEqual(_.isEqualWith('a', 'b', customizer), true);
      strictEqual(_.isEqualWith(['a'], ['b'], customizer), true);
      strictEqual(_.isEqualWith({ '0': 'a' }, { '0': 'b' }, customizer), true);
    });

    test('should not handle comparisons if `customizer` returns `false`', 3, function() {
      var customizer = function(value) {
        return _.isString(value) ? false : undefined;
      };

      strictEqual(_.isEqualWith('a', 'a', customizer), false);
      strictEqual(_.isEqualWith(['a'], ['a'], customizer), false);
      strictEqual(_.isEqualWith({ '0': 'a' }, { '0': 'a' }, customizer), false);
    });

    test('should return a boolean value even if `customizer` does not', 2, function() {
      var actual = _.isEqualWith('a', 'b', _.constant('c'));
      strictEqual(actual, true);

      var values = _.without(falsey, undefined),
          expected = _.map(values, _.constant(false));

      actual = [];
      _.each(values, function(value) {
        actual.push(_.isEqualWith('a', 'a', _.constant(value)));
      });

      deepEqual(actual, expected);
    });

    test('should ensure `customizer` is a function', 1, function() {
      var array = [1, 2, 3],
          eq = _.partial(_.isEqualWith, array),
          actual = _.map([array, [1, 0, 3]], eq);

      deepEqual(actual, [true, false]);
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

    test('should return `false` for non error objects', 12, function() {
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
    var args = arguments;

    test('should return `true` for functions', 2, function() {
      strictEqual(_.isFunction(_), true);
      strictEqual(_.isFunction(slice), true);
    });

    test('should return `true` for typed array constructors', 1, function() {
      var expected = _.map(typedArrays, function(type) {
        return objToString.call(root[type]) == funcTag;
      });

      var actual = _.map(typedArrays, function(type) {
        return _.isFunction(root[type]);
      });

      deepEqual(actual, expected);
    });

    test('should return `false` for non-functions', 12, function() {
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

      if (document) {
        strictEqual(_.isFunction(document.getElementsByTagName('body')), false);
      } else {
        skipTest();
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

    test('should match inherited `object` properties', 1, function() {
      function Foo() { this.a = 1; }
      Foo.prototype.b = 2;

      strictEqual(_.isMatch({ 'a': new Foo }, { 'a': { 'b': 2 } }), true);
    });

    test('should match `-0` as `0`', 2, function() {
      var object1 = { 'a': -0 },
          object2 = { 'a': 0 };

      strictEqual(_.isMatch(object1, object2), true);
      strictEqual(_.isMatch(object2, object1), true);
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

    test('should return `false` when `object` is nullish', 1, function() {
      var values = [null, undefined],
          expected = _.map(values, _.constant(false)),
          source = { 'a': 1 };

      var actual = _.map(values, function(value) {
        try {
          return _.isMatch(value, source);
        } catch (e) {}
      });

      deepEqual(actual, expected);
    });

    test('should return `true` when comparing an empty `source`', 1, function() {
      var object = { 'a': 1 },
          expected = _.map(empties, _.constant(true));

      var actual = _.map(empties, function(value) {
        return _.isMatch(object, value);
      });

      deepEqual(actual, expected);
    });

    test('should compare a variety of `source` property values', 2, function() {
      var object1 = { 'a': false, 'b': true, 'c': '3', 'd': 4, 'e': [5], 'f': { 'g': 6 } },
          object2 = { 'a': 0, 'b': 1, 'c': 3, 'd': '4', 'e': ['5'], 'f': { 'g': '6' } };

      strictEqual(_.isMatch(object1, object1), true);
      strictEqual(_.isMatch(object1, object2), false);
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

    test('should return `true` when comparing a `source` of empty arrays and objects', 1, function() {
      var objects = [{ 'a': [1], 'b': { 'c': 1 } }, { 'a': [2, 3], 'b': { 'd': 2 } }],
          source = { 'a': [], 'b': {} };

      var actual = _.filter(objects, function(object) {
        return _.isMatch(object, source);
      });

      deepEqual(actual, objects);
    });

    test('should return `true` when comparing an empty `source` to a nullish `object`', 1, function() {
      var values = [null, undefined],
          expected = _.map(values, _.constant(true)),
          source = {};

      var actual = _.map(values, function(value) {
        try {
          return _.isMatch(value, source);
        } catch (e) {}
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

    test('should handle a `source` with `undefined` values', 3, function() {
      var objects = [{ 'a': 1 }, { 'a': 1, 'b': 1 }, { 'a': 1, 'b': undefined }],
          source = { 'b': undefined },
          predicate = function(object) { return _.isMatch(object, source); },
          actual = _.map(objects, predicate),
          expected = [false, false, true];

      deepEqual(actual, expected);

      source = { 'a': 1, 'b': undefined };
      actual = _.map(objects, predicate);

      deepEqual(actual, expected);

      objects = [{ 'a': { 'b': 1 } }, { 'a':{ 'b':1, 'c': 1 } }, { 'a': { 'b': 1, 'c': undefined } }];
      source = { 'a': { 'c': undefined } };
      actual = _.map(objects, predicate);

      deepEqual(actual, expected);
    });

    test('should match properties when `value` is a function', 1, function() {
      function Foo() {}
      Foo.a = { 'b': 1, 'c': 2 };

      var matches = _.matches({ 'a': { 'b': 1 } });
      strictEqual(matches(Foo), true);
    });

    test('should match properties when `value` is not a plain object', 1, function() {
      function Foo(object) { _.assign(this, object); }

      var object = new Foo({ 'a': new Foo({ 'b': 1, 'c': 2 }) }),
          matches = _.matches({ 'a': { 'b': 1 } });

      strictEqual(matches(object), true);
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.isMatchWith');

  (function() {
    test('should provide the correct `customizer` arguments', 1, function() {
      var argsList = [],
          object1 = { 'a': [1, 2], 'b': null },
          object2 = { 'a': [1, 2], 'b': null };

      object1.b = object2;
      object2.b = object1;

      var expected = [
        [object1.a, object2.a, 'a', object1, object2, [], []],
        [object1.a[0], object2.a[0], 0, object1.a, object2.a, [], []],
        [object1.a[1], object2.a[1], 1, object1.a, object2.a, [], []],
        [object1.b, object2.b, 'b', object1, object2, [], []],
        [object1.b.a, object2.b.a, 'a', object1.b, object2.b, [], []],
        [object1.b.a[0], object2.b.a[0], 0, object1.b.a, object2.b.a, [], []],
        [object1.b.a[1], object2.b.a[1], 1, object1.b.a, object2.b.a, [], []],
        [object1.b.b, object2.b.b, 'b', object1.b, object2.b, [], []],
        [object1.b.b.a, object2.b.b.a, 'a', object1.b.b, object2.b.b, [], []],
        [object1.b.b.a[0], object2.b.b.a[0], 0, object1.b.b.a, object2.b.b.a, [], []],
        [object1.b.b.a[1], object2.b.b.a[1], 1, object1.b.b.a, object2.b.b.a, [], []],
        [object1.b.b.b, object2.b.b.b, 'b', object1.b.b, object2.b.b, [], []]
      ];

      _.isMatchWith(object1, object2, function() {
        argsList.push(slice.call(arguments));
      });

      deepEqual(argsList, expected);
    });

    test('should handle comparisons if `customizer` returns `undefined`', 1, function() {
      strictEqual(_.isMatchWith({ 'a': 1 }, { 'a': 1 }, _.noop), true);
    });

    test('should return a boolean value even if `customizer` does not', 2, function() {
      var object = { 'a': 1 },
          actual = _.isMatchWith(object, { 'a': 1 }, _.constant('a'));

      strictEqual(actual, true);

      var expected = _.map(falsey, _.constant(false));

      actual = [];
      _.each(falsey, function(value) {
        actual.push(_.isMatchWith(object, { 'a': 2 }, _.constant(value)));
      });

      deepEqual(actual, expected);
    });

    test('should ensure `customizer` is a function', 1, function() {
      var object = { 'a': 1 },
          matches = _.partial(_.isMatchWith, object),
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

    test('should return `false` for non-NaNs', 13, function() {
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
      strictEqual(_.isNaN(Object(1)), false);
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

    test('should return `false` for non-native methods', 12, function() {
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

    test('should return `true` for `null` values', 1, function() {
      strictEqual(_.isNull(null), true);
    });

    test('should return `false` for non `null` values', 13, function() {
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

  QUnit.module('lodash.isNil');

  (function() {
    var args = arguments;

    test('should return `true` for nullish values', 3, function() {
      strictEqual(_.isNil(null), true);
      strictEqual(_.isNil(), true);
      strictEqual(_.isNil(undefined), true);
    });

    test('should return `false` for non-nullish values', 13, function() {
      var expected = _.map(falsey, function(value) {
        return value == null;
      });

      var actual = _.map(falsey, function(value, index) {
        return index ? _.isNil(value) : _.isNil();
      });

      deepEqual(actual, expected);

      strictEqual(_.isNil(args), false);
      strictEqual(_.isNil([1, 2, 3]), false);
      strictEqual(_.isNil(true), false);
      strictEqual(_.isNil(new Date), false);
      strictEqual(_.isNil(new Error), false);
      strictEqual(_.isNil(_), false);
      strictEqual(_.isNil(slice), false);
      strictEqual(_.isNil({ 'a': 1 }), false);
      strictEqual(_.isNil(1), false);
      strictEqual(_.isNil(NaN), false);
      strictEqual(_.isNil(/x/), false);
      strictEqual(_.isNil('a'), false);
    });

    test('should work with nulls from another realm', 2, function() {
      if (_._object) {
        strictEqual(_.isNil(_._null), true);
        strictEqual(_.isNil(_._undefined), true);
      }
      else {
        skipTest(2);
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

    test('should return `false` for non-numbers', 11, function() {
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
      strictEqual(_.isNumber(+'2'), true);
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

    test('should return `false` for non-objects', 1, function() {
      var symbol = (Symbol || noop)(),
          values = falsey.concat(true, 1, 'a', symbol),
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
      // See https://code.google.com/p/v8/issues/detail?id=2291.
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

    test('should return `true` for objects with a `[[Prototype]]` of `null`', 2, function() {
      if (create) {
        var object = create(null);
        strictEqual(_.isPlainObject(object), true);

        object.constructor = objectProto.constructor;
        strictEqual(_.isPlainObject(object), true);
      }
      else {
        skipTest(2);
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

    test('should return `false` for Object objects without a `toStringTag` of "Object"', 3, function() {
      strictEqual(_.isPlainObject(arguments), false);
      strictEqual(_.isPlainObject(Error), false);
      strictEqual(_.isPlainObject(Math), false);
    });

    test('should return `false` for non-objects', 3, function() {
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

    test('should return `false` for non-regexes', 12, function() {
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

    test('should return `false` for non-strings', 12, function() {
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

  QUnit.module('lodash.isTypedArray');

  (function() {
    var args = arguments;

    test('should return `true` for typed arrays', 1, function() {
      var expected = _.map(typedArrays, function(type) {
        return type in root;
      });

      var actual = _.map(typedArrays, function(type) {
        var Ctor = root[type];
        return Ctor ? _.isTypedArray(new Ctor(new ArrayBuffer(8))) : false;
      });

      deepEqual(actual, expected);
    });

    test('should return `false` for non typed arrays', 13, function() {
      var expected = _.map(falsey, _.constant(false));

      var actual = _.map(falsey, function(value, index) {
        return index ? _.isTypedArray(value) : _.isTypedArray();
      });

      deepEqual(actual, expected);

      strictEqual(_.isTypedArray(args), false);
      strictEqual(_.isTypedArray([1, 2, 3]), false);
      strictEqual(_.isTypedArray(true), false);
      strictEqual(_.isTypedArray(new Date), false);
      strictEqual(_.isTypedArray(new Error), false);
      strictEqual(_.isTypedArray(_), false);
      strictEqual(_.isTypedArray(slice), false);
      strictEqual(_.isTypedArray({ 'a': 1 }), false);
      strictEqual(_.isTypedArray(1), false);
      strictEqual(_.isTypedArray(NaN), false);
      strictEqual(_.isTypedArray(/x/), false);
      strictEqual(_.isTypedArray('a'), false);
    });

    test('should work with typed arrays from another realm', 1, function() {
      if (_._object) {
        var props = _.map(typedArrays, function(type) {
          return '_' + type.toLowerCase();
        });

        var expected = _.map(props, function(key) {
          return key in _;
        });

        var actual = _.map(props, function(key) {
          var value = _[key];
          return value ? _.isTypedArray(value) : false;
        });

        deepEqual(actual, expected);
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
        if (objToString.call(object) == objectTag) {
          strictEqual(_[methodName](object), false, '`_.' + methodName + '` returns `false`');
        } else {
          skipTest();
        }
      });
    });

    test('should not error on host objects (test in IE)', 18, function() {
      var funcs = [
        'isArguments', 'isArray', 'isArrayLike', 'isBoolean', 'isDate', 'isElement',
        'isError', 'isFinite', 'isFunction', 'isNaN', 'isNil', 'isNull', 'isNumber',
        'isObject', 'isObjectLike', 'isRegExp', 'isString', 'isUndefined'
      ];

      _.each(funcs, function(methodName) {
        if (xml) {
          var pass = true;

          try {
            _[methodName](xml);
          } catch (e) {
            pass = false;
          }
          ok(pass, '`_.' + methodName + '` should not error');
        }
        else {
          skipTest();
        }
      });
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.iteratee');

  (function() {
    test('should provide arguments to `func`', 1, function() {
      var fn = function() { return slice.call(arguments); },
          iteratee = _.iteratee(fn),
          actual = iteratee('a', 'b', 'c', 'd', 'e', 'f');

      deepEqual(actual, ['a', 'b', 'c', 'd', 'e', 'f']);
    });

    test('should return `_.identity` when `func` is nullish', 1, function() {
      var object = {},
          values = [, null, undefined],
          expected = _.map(values, _.constant([!isNpm && _.identity, object]));

      var actual = _.map(values, function(value, index) {
        var identity = index ? _.iteratee(value) : _.iteratee();
        return [!isNpm && identity, identity(object)];
      });

      deepEqual(actual, expected);
    });

    test('should return an iteratee created by `_.matches` when `func` is an object', 2, function() {
      var matches = _.iteratee({ 'a': 1, 'b': 2 });
      strictEqual(matches({ 'a': 1, 'b': 2, 'c': 3 }), true);
      strictEqual(matches({ 'b': 2 }), false);
    });

    test('should not change match behavior if `source` is modified', 9, function() {
      var sources = [
        { 'a': { 'b': 2, 'c': 3 } },
        { 'a': 1, 'b': 2 },
        { 'a': 1 }
      ];

      _.each(sources, function(source, index) {
        var object = _.cloneDeep(source),
            matches = _.iteratee(source);

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

    test('should return an iteratee created by `_.matchesProperty` when `func` is a number or string and a value is provided', 3, function() {
      var array = ['a', undefined],
          matches = _.iteratee([0, 'a']);

      strictEqual(matches(array), true);

      matches = _.iteratee(['0', 'a']);
      strictEqual(matches(array), true);

      matches = _.iteratee([1, undefined]);
      strictEqual(matches(array), true);
    });

    test('should support deep paths for "_.matchesProperty" shorthands', 1, function() {
      var object = { 'a': { 'b': { 'c': { 'd': 1, 'e': 2 } } } },
          matches = _.iteratee(['a.b.c', { 'e': 2 }]);

      strictEqual(matches(object), true);
    });

    test('should return an iteratee created by `_.property` when `func` is a number or string', 2, function() {
      var array = ['a'],
          prop = _.iteratee(0);

      strictEqual(prop(array), 'a');

      prop = _.iteratee('0');
      strictEqual(prop(array), 'a');
    });

    test('should support deep paths for "_.property" shorthands', 1, function() {
      var object = { 'a': { 'b': { 'c': 3 } } },
          prop = _.iteratee('a.b.c');

      strictEqual(prop(object), 3);
    });

    test('should work with functions created by `_.partial` and `_.partialRight`', 2, function() {
      var fn = function() {
        var result = [this.a];
        push.apply(result, arguments);
        return result;
      };

      var expected = [1, 2, 3],
          object = { 'a': 1 , 'iteratee': _.iteratee(_.partial(fn, 2)) };

      deepEqual(object.iteratee(3), expected);

      object.iteratee = _.iteratee(_.partialRight(fn, 3));
      deepEqual(object.iteratee(2), expected);
    });

    test('should work as an iteratee for methods like `_.map`', 1, function() {
      var fn = function() { return this instanceof Number; },
          array = [fn, fn, fn],
          iteratees = _.map(array, _.iteratee),
          expected = _.map(array, _.constant(false));

      var actual = _.map(iteratees, function(iteratee) {
        return iteratee();
      });

      deepEqual(actual, expected);
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('custom `_.iteratee` methods');

  (function() {
    var array = ['one', 'two', 'three'],
        getPropA = _.partial(_.property, 'a'),
        getPropB = _.partial(_.property, 'b'),
        getLength = _.partial(_.property, 'length'),
        iteratee = _.iteratee;

    var getSum = function() {
      return function(result, object) {
        return result + object.a;
      };
    };

    var objects = [
      { 'a': 0, 'b': 0 },
      { 'a': 1, 'b': 0 },
      { 'a': 1, 'b': 1 }
    ];

    test('`_.countBy` should use `_.iteratee` internally', 1, function() {
      if (!isModularize) {
        _.iteratee = getLength;
        deepEqual(_.countBy(array), { '3': 2, '5': 1 });
        _.iteratee = iteratee;
      }
      else {
        skipTest();
      }
    });

    test('`_.dropRightWhile` should use `_.iteratee` internally', 1, function() {
      if (!isModularize) {
        _.iteratee = getPropB;
        deepEqual(_.dropRightWhile(objects), objects.slice(0, 2));
        _.iteratee = iteratee;
      }
      else {
        skipTest();
      }
    });

    test('`_.dropWhile` should use `_.iteratee` internally', 1, function() {
      if (!isModularize) {
        _.iteratee = getPropB;
        deepEqual(_.dropWhile(objects.reverse()).reverse(), objects.reverse().slice(0, 2));
        _.iteratee = iteratee;
      }
      else {
        skipTest();
      }
    });

    test('`_.every` should use `_.iteratee` internally', 1, function() {
      if (!isModularize) {
        _.iteratee = getPropA;
        strictEqual(_.every(objects.slice(1)), true);
        _.iteratee = iteratee;
      }
      else {
        skipTest();
      }
    });

    test('`_.filter` should use `_.iteratee` internally', 1, function() {
      if (!isModularize) {
        var objects = [{ 'a': 0 }, { 'a': 1 }];

        _.iteratee = getPropA;
        deepEqual(_.filter(objects), [objects[1]]);
        _.iteratee = iteratee;
      }
      else {
        skipTest();
      }
    });

    test('`_.find` should use `_.iteratee` internally', 1, function() {
      if (!isModularize) {
        _.iteratee = getPropA;
        strictEqual(_.find(objects), objects[1]);
        _.iteratee = iteratee;
      }
      else {
        skipTest();
      }
    });

    test('`_.findIndex` should use `_.iteratee` internally', 1, function() {
      if (!isModularize) {
        _.iteratee = getPropA;
        strictEqual(_.findIndex(objects), 1);
        _.iteratee = iteratee;
      }
      else {
        skipTest();
      }
    });

    test('`_.findLast` should use `_.iteratee` internally', 1, function() {
      if (!isModularize) {
        _.iteratee = getPropA;
        strictEqual(_.findLast(objects), objects[2]);
        _.iteratee = iteratee;
      }
      else {
        skipTest();
      }
    });

    test('`_.findLastIndex` should use `_.iteratee` internally', 1, function() {
      if (!isModularize) {
        _.iteratee = getPropA;
        strictEqual(_.findLastIndex(objects), 2);
        _.iteratee = iteratee;
      }
      else {
        skipTest();
      }
    });

    test('`_.findLastKey` should use `_.iteratee` internally', 1, function() {
      if (!isModularize) {
        _.iteratee = getPropB;
        strictEqual(_.findKey(objects), '2');
        _.iteratee = iteratee;
      }
      else {
        skipTest();
      }
    });

    test('`_.findKey` should use `_.iteratee` internally', 1, function() {
      if (!isModularize) {
        _.iteratee = getPropB;
        strictEqual(_.findLastKey(objects), '2');
        _.iteratee = iteratee;
      }
      else {
        skipTest();
      }
    });

    test('`_.groupBy` should use `_.iteratee` internally', 1, function() {
      if (!isModularize) {
        _.iteratee = getLength;
        deepEqual(_.groupBy(array), { '3': ['one', 'two'], '5': ['three'] });
        _.iteratee = iteratee;
      }
      else {
        skipTest();
      }
    });

    test('`_.keyBy` should use `_.iteratee` internally', 1, function() {
      if (!isModularize) {
        _.iteratee = getLength;
        deepEqual(_.keyBy(array), { '3': 'two', '5': 'three' });
        _.iteratee = iteratee;
      }
      else {
        skipTest();
      }
    });

    test('`_.map` should use `_.iteratee` internally', 1, function() {
      if (!isModularize) {
        _.iteratee = getPropA;
        deepEqual(_.map(objects), [0, 1, 1]);
        _.iteratee = iteratee;
      }
      else {
        skipTest();
      }
    });

    test('`_.mapKeys` should use `_.iteratee` internally', 1, function() {
      if (!isModularize) {
        _.iteratee = getPropB;
        deepEqual(_.mapKeys({ 'a': { 'b': 1 } }), { '1':  { 'b': 1 } });
        _.iteratee = iteratee;
      }
      else {
        skipTest();
      }
    });

    test('`_.mapValues` should use `_.iteratee` internally', 1, function() {
      if (!isModularize) {
        _.iteratee = getPropB;
        deepEqual(_.mapValues({ 'a': { 'b': 1 } }), { 'a': 1 });
        _.iteratee = iteratee;
      }
      else {
        skipTest();
      }
    });

    test('`_.maxBy` should use `_.iteratee` internally', 1, function() {
      if (!isModularize) {
        _.iteratee = getPropB;
        deepEqual(_.maxBy(objects), objects[2]);
        _.iteratee = iteratee;
      }
      else {
        skipTest();
      }
    });

    test('`_.minBy` should use `_.iteratee` internally', 1, function() {
      if (!isModularize) {
        _.iteratee = getPropB;
        deepEqual(_.minBy(objects), objects[0]);
        _.iteratee = iteratee;
      }
      else {
        skipTest();
      }
    });

    test('`_.partition` should use `_.iteratee` internally', 1, function() {
      if (!isModularize) {
        var objects = [{ 'a': 1 }, { 'a': 1 }, { 'b': 2 }];

        _.iteratee = getPropA;
        deepEqual(_.partition(objects), [objects.slice(0, 2), objects.slice(2)]);
        _.iteratee = iteratee;
      }
      else {
        skipTest();
      }
    });

    test('`_.reduce` should use `_.iteratee` internally', 1, function() {
      if (!isModularize) {
        _.iteratee = getSum;
        strictEqual(_.reduce(objects, undefined, 0), 2);
        _.iteratee = iteratee;
      }
      else {
        skipTest();
      }
    });

    test('`_.reduceRight` should use `_.iteratee` internally', 1, function() {
      if (!isModularize) {
        _.iteratee = getSum;
        strictEqual(_.reduceRight(objects, undefined, 0), 2);
        _.iteratee = iteratee;
      }
      else {
        skipTest();
      }
    });

    test('`_.reject` should use `_.iteratee` internally', 1, function() {
      if (!isModularize) {
        var objects = [{ 'a': 0 }, { 'a': 1 }];

        _.iteratee = getPropA;
        deepEqual(_.reject(objects), [objects[0]]);
        _.iteratee = iteratee;
      }
      else {
        skipTest();
      }
    });

    test('`_.remove` should use `_.iteratee` internally', 1, function() {
      if (!isModularize) {
        var objects = [{ 'a': 0 }, { 'a': 1 }];

        _.iteratee = getPropA;
        _.remove(objects);
        deepEqual(objects, [{ 'a': 0 }]);
        _.iteratee = iteratee;
      }
      else {
        skipTest();
      }
    });

    test('`_.some` should use `_.iteratee` internally', 1, function() {
      if (!isModularize) {
        _.iteratee = getPropB;
        strictEqual(_.some(objects), true);
        _.iteratee = iteratee;
      }
      else {
        skipTest();
      }
    });

    test('`_.sortBy` should use `_.iteratee` internally', 1, function() {
      if (!isModularize) {
        _.iteratee = getPropA;
        deepEqual(_.sortBy(objects.slice().reverse()), [objects[0], objects[2], objects[1]]);
        _.iteratee = iteratee;
      }
      else {
        skipTest();
      }
    });

    test('`_.sortedIndexBy` should use `_.iteratee` internally', 1, function() {
      if (!isModularize) {
        var objects = [{ 'a': 30 }, { 'a': 50 }];

        _.iteratee = getPropA;
        strictEqual(_.sortedIndexBy(objects, { 'a': 40 }), 1);
        _.iteratee = iteratee;
      }
      else {
        skipTest();
      }
    });

    test('`_.sortedLastIndexBy` should use `_.iteratee` internally', 1, function() {
      if (!isModularize) {
        var objects = [{ 'a': 30 }, { 'a': 50 }];

        _.iteratee = getPropA;
        strictEqual(_.sortedLastIndexBy(objects, { 'a': 40 }), 1);
        _.iteratee = iteratee;
      }
      else {
        skipTest();
      }
    });

    test('`_.sumBy` should use `_.iteratee` internally', 1, function() {
      if (!isModularize) {
        _.iteratee = getPropB;
        strictEqual(_.sumBy(objects), 1);
        _.iteratee = iteratee;
      }
      else {
        skipTest();
      }
    });

    test('`_.takeRightWhile` should use `_.iteratee` internally', 1, function() {
      if (!isModularize) {
        _.iteratee = getPropB;
        deepEqual(_.takeRightWhile(objects), objects.slice(2));
        _.iteratee = iteratee;
      }
      else {
        skipTest();
      }
    });

    test('`_.takeWhile` should use `_.iteratee` internally', 1, function() {
      if (!isModularize) {
        _.iteratee = getPropB;
        deepEqual(_.takeWhile(objects.reverse()), objects.reverse().slice(2));
        _.iteratee = iteratee;
      }
      else {
        skipTest();
      }
    });

    test('`_.transform` should use `_.iteratee` internally', 1, function() {
      if (!isModularize) {
        _.iteratee = function() {
          return function(result, object) {
            result.sum += object.a;
          };
        };

        deepEqual(_.transform(objects, undefined, { 'sum': 0 }), { 'sum': 2 });
        _.iteratee = iteratee;
      }
      else {
        skipTest();
      }
    });

    test('`_.uniqBy` should use `_.iteratee` internally', 1, function() {
      if (!isModularize) {
        _.iteratee = getPropB;
        deepEqual(_.uniqBy(objects), [objects[0], objects[2]]);
        _.iteratee = iteratee;
      }
      else {
        skipTest();
      }
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.keyBy');

  (function() {
    test('should use `_.identity` when `iteratee` is nullish', 1, function() {
      var array = [4, 6, 6],
          values = [, null, undefined],
          expected = _.map(values, _.constant({ '4': 4, '6': 6 }));

      var actual = _.map(values, function(value, index) {
        return index ? _.keyBy(array, value) : _.keyBy(array);
      });

      deepEqual(actual, expected);
    });

    test('should work with a "_.property" style `iteratee`', 1, function() {
      var actual = _.keyBy(['one', 'two', 'three'], 'length');
      deepEqual(actual, { '3': 'two', '5': 'three' });
    });

    test('should only add values to own, not inherited, properties', 2, function() {
      var actual = _.keyBy([4.2, 6.1, 6.4], function(num) {
        return Math.floor(num) > 4 ? 'hasOwnProperty' : 'constructor';
      });

      deepEqual(actual.constructor, 4.2);
      deepEqual(actual.hasOwnProperty, 6.4);
    });

    test('should work with a number for `iteratee`', 2, function() {
      var array = [
        [1, 'a'],
        [2, 'a'],
        [2, 'b']
      ];

      deepEqual(_.keyBy(array, 0), { '1': [1, 'a'], '2': [2, 'b'] });
      deepEqual(_.keyBy(array, 1), { 'a': [2, 'a'], 'b': [2, 'b'] });
    });

    test('should work with an object for `collection`', 1, function() {
      var actual = _.keyBy({ 'a': 4.2, 'b': 6.1, 'c': 6.4 }, function(num) {
        return Math.floor(num);
      });

      deepEqual(actual, { '4': 4.2, '6': 6.4 });
    });

    test('should work in a lazy chain sequence', 1, function() {
      if (!isNpm) {
        var array = _.range(LARGE_ARRAY_SIZE).concat(
          _.range(Math.floor(LARGE_ARRAY_SIZE / 2), LARGE_ARRAY_SIZE),
          _.range(Math.floor(LARGE_ARRAY_SIZE / 1.5), LARGE_ARRAY_SIZE)
        );

        var actual = _(array).keyBy().map(square).filter(isEven).take().value();

        deepEqual(actual, _.take(_.filter(_.map(_.keyBy(array), square), isEven)));
      }
      else {
        skipTest();
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
      deepEqual(func({ 'a': 1, 'b': 1 }).sort(), ['a', 'b']);
    });

    test('`_.' + methodName + '` should coerce primitives to objects (test in IE 9)', 2, function() {
      deepEqual(func('abc').sort(), ['0', '1', '2']);

      // IE 9 doesn't box numbers in for-in loops.
      numberProto.a = 1;
      deepEqual(func(0), isKeys ? [] : ['a']);
      delete numberProto.a;
    });

    test('`_.' + methodName + '` should treat sparse arrays as dense', 1, function() {
      var array = [1];
      array[2] = 3;

      deepEqual(func(array).sort(), ['0', '1', '2']);
    });

    test('`_.' + methodName + '` should not coerce nullish values to objects', 2, function() {
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

    test('`_.' + methodName + '` should work with `arguments` objects', 1, function() {
      deepEqual(func(args).sort(), ['0', '1', '2']);
    });

    test('`_.' + methodName + '` should return keys for custom properties on `arguments` objects', 1, function() {
      args.a = 1;
      deepEqual(func(args).sort(), ['0', '1', '2', 'a']);
      delete args.a;
    });

    test('`_.' + methodName + '` should ' + (isKeys ? 'not' : '') + ' include inherited properties of `arguments` objects', 1, function() {
      var expected = isKeys ? ['0', '1', '2'] : ['0', '1', '2', 'a'];

      objectProto.a = 1;
      deepEqual(func(args).sort(), expected);
      delete objectProto.a;
    });

    test('`_.' + methodName + '` should work with string objects', 1, function() {
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

    test('`_.' + methodName + '` skips the `constructor` property on prototype objects', 3, function() {
      function Foo() {}
      Foo.prototype.a = 1;

      var expected = ['a'];
      deepEqual(func(Foo.prototype), expected);

      Foo.prototype = { 'constructor': Foo, 'a': 1 };
      deepEqual(func(Foo.prototype), expected);

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
    var array = [1, 2, 3, 4];

    test('should return the last element', 1, function() {
      strictEqual(_.last(array), 4);
    });

    test('should return `undefined` when querying empty arrays', 1, function() {
      var array = [];
      array['-1'] = 1;

      strictEqual(_.last([]), undefined);
    });

    test('should work as an iteratee for methods like `_.map`', 1, function() {
      var array = [[1, 2, 3], [4, 5, 6], [7, 8, 9]],
          actual = _.map(array, _.last);

      deepEqual(actual, [3, 6, 9]);
    });

    test('should return an unwrapped value when implicitly chaining', 1, function() {
      if (!isNpm) {
        strictEqual(_(array).last(), 4);
      }
      else {
        skipTest();
      }
    });

    test('should return a wrapped value when explicitly chaining', 1, function() {
      if (!isNpm) {
        ok(_(array).chain().last() instanceof _);
      }
      else {
        skipTest();
      }
    });

    test('should not execute immediately when explicitly chaining', 1, function() {
      if (!isNpm) {
        var wrapped = _(array).chain().last();
        strictEqual(wrapped.__wrapped__, array);
      }
      else {
        skipTest();
      }
    });

    test('should work in a lazy chain sequence', 2, function() {
      if (!isNpm) {
        var largeArray = _.range(LARGE_ARRAY_SIZE),
            smallArray = array;

        _.times(2, function(index) {
          var array = index ? largeArray : smallArray,
              wrapped = _(array).filter(isEven);

          strictEqual(wrapped.last(), _.last(_.filter(array, isEven)));
        });
      }
      else {
        skipTest(2);
      }
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.lt');

  (function() {
    test('should return `true` if `value` is less than `other`', 2, function() {
      strictEqual(_.lt(1, 3), true);
      strictEqual(_.lt('abc', 'def'), true);
    });

    test('should return `false` if `value` is greater than or equal to `other`', 4, function() {
      strictEqual(_.lt(3, 1), false);
      strictEqual(_.lt(3, 3), false);
      strictEqual(_.lt('def', 'abc'), false);
      strictEqual(_.lt('def', 'def'), false);
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.lte');

  (function() {
    test('should return `true` if `value` is less than or equal to `other`', 4, function() {
      strictEqual(_.lte(1, 3), true);
      strictEqual(_.lte(3, 3), true);
      strictEqual(_.lte('abc', 'def'), true);
      strictEqual(_.lte('def', 'def'), true);
    });

    test('should return `false` if `value` is greater than `other`', 2, function() {
      strictEqual(_.lt(3, 1), false);
      strictEqual(_.lt('def', 'abc'), false);
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

    test('should treat falsey `fromIndex` values correctly', 1, function() {
      var expected = _.map(falsey, function(value) {
        return value === undefined ? 5 : -1;
      });

      var actual = _.map(falsey, function(fromIndex) {
        return _.lastIndexOf(array, 3, fromIndex);
      });

      deepEqual(actual, expected);
    });

    test('should coerce `fromIndex` to an integer', 1, function() {
      strictEqual(_.lastIndexOf(array, 2, 4.2), 4);
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('indexOf methods');

  _.each(['indexOf', 'lastIndexOf', 'sortedIndexOf', 'sortedLastIndexOf'], function(methodName) {
    var func = _[methodName],
        isIndexOf = !/last/i.test(methodName),
        isSorted = /^sorted/.test(methodName);

    test('`_.' + methodName + '` should accept a falsey `array` argument', 1, function() {
      var expected = _.map(falsey, _.constant(-1));

      var actual = _.map(falsey, function(array, index) {
        try {
          return index ? func(array) : func();
        } catch (e) {}
      });

      deepEqual(actual, expected);
    });

    test('`_.' + methodName + '` should return `-1` for an unmatched value', 5, function() {
      var array = [1, 2, 3],
          empty = [];

      strictEqual(func(array, 4), -1);
      strictEqual(func(array, 4, true), -1);
      strictEqual(func(array, undefined, true), -1);

      strictEqual(func(empty, undefined), -1);
      strictEqual(func(empty, undefined, true), -1);
    });

    test('`_.' + methodName + '` should not match values on empty arrays', 2, function() {
      var array = [];
      array[-1] = 0;

      strictEqual(func(array, undefined), -1);
      strictEqual(func(array, 0, true), -1);
    });

    test('`_.' + methodName + '` should match `NaN`', 4, function() {
      var array = isSorted
        ? [1, 2, NaN, NaN]
        : [1, NaN, 3, NaN, 5, NaN];

      if (isSorted) {
        strictEqual(func(array, NaN, true), isIndexOf ? 2 : 3);
        skipTest(3);
      }
      else {
        strictEqual(func(array, NaN), isIndexOf ? 1 : 5);
        strictEqual(func(array, NaN, 2), isIndexOf ? 3 : 1);
        strictEqual(func(array, NaN, -2), isIndexOf ? 5 : 3);
        skipTest();
      }
    });

    test('`_.' + methodName + '` should match `-0` as `0`', 2, function() {
      strictEqual(func([-0], 0), 0);
      strictEqual(func([0], -0), 0);
    });
  });

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.map');

  (function() {
    var array = [1, 2, 3];

    test('should map values in `collection` to a new array', 2, function() {
      var object = { 'a': 1, 'b': 2, 'c': 3 },
          expected = ['1', '2', '3'];

      deepEqual(_.map(array, String), expected);
      deepEqual(_.map(object, String), expected);
    });

    test('should work with a "_.property" style `iteratee`', 1, function() {
      var objects = [{ 'a': 'x' }, { 'a': 'y' }];
      deepEqual(_.map(objects, 'a'), ['x', 'y']);
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

    test('should handle object arguments with non-number length properties', 1, function() {
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

      var actual = _.map(falsey, function(collection, index) {
        try {
          return index ? _.map(collection) : _.map();
        } catch (e) {}
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

    test('should provide the correct `predicate` arguments in a lazy chain sequence', 5, function() {
      if (!isNpm) {
        var args,
            array = _.range(LARGE_ARRAY_SIZE + 1),
            expected = [1, 0, _.map(array.slice(1), square)];

        _(array).slice(1).map(function(value, index, array) {
          args || (args = slice.call(arguments));
        }).value();

        deepEqual(args, [1, 0, array.slice(1)]);

        args = null;
        _(array).slice(1).map(square).map(function(value, index, array) {
          args || (args = slice.call(arguments));
        }).value();

        deepEqual(args, expected);

        args = null;
        _(array).slice(1).map(square).map(function(value, index) {
          args || (args = slice.call(arguments));
        }).value();

        deepEqual(args, expected);

        args = null;
        _(array).slice(1).map(square).map(function(value) {
          args || (args = slice.call(arguments));
        }).value();

        deepEqual(args, [1]);

        args = null;
        _(array).slice(1).map(square).map(function() {
          args || (args = slice.call(arguments));
        }).value();

        deepEqual(args, expected);
      }
      else {
        skipTest(5);
      }
    });
  }());
  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.mapKeys');

  (function() {
    var array = [1, 2],
        object = { 'a': 1, 'b': 2, 'c': 3 };

    test('should map keys in `object` to a new object', 1, function() {
      var actual = _.mapKeys(object, String);
      deepEqual(actual, { '1': 1, '2': 2, '3': 3 });
    });

    test('should treat arrays like objects', 1, function() {
      var actual = _.mapKeys(array, String);
      deepEqual(actual, { '1': 1, '2': 2 });
    });

    test('should work with a "_.property" style `iteratee`', 1, function() {
      var actual = _.mapKeys({ 'a': { 'b': 'c' } }, 'b');
      deepEqual(actual, { 'c': { 'b': 'c' } });
    });

    test('should work on an object with no `iteratee`', 1, function() {
      var actual = _.mapKeys({ 'a': 1, 'b': 2, 'c': 3 });
      deepEqual(actual, { '1': 1, '2': 2, '3': 3 });
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.mapValues');

  (function() {
    var array = [1, 2],
        object = { 'a': 1, 'b': 2, 'c': 3 };

    test('should map values in `object` to a new object', 1, function() {
      var actual = _.mapValues(object, String);
      deepEqual(actual, { 'a': '1', 'b': '2', 'c': '3' });
    });

    test('should treat arrays like objects', 1, function() {
      var actual = _.mapValues(array, String);
      deepEqual(actual, { '0': '1', '1': '2' });
    });

    test('should work with a "_.property" style `iteratee`', 1, function() {
      var actual = _.mapValues({ 'a': { 'b': 1 } }, 'b');
      deepEqual(actual, { 'a': 1 });
    });

    test('should work on an object with no `iteratee`', 2, function() {
      var actual = _.mapValues({ 'a': 1, 'b': 2, 'c': 3 });
      deepEqual(actual, object);
      notStrictEqual(actual, object);
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.mapKeys and lodash.mapValues');

  _.each(['mapKeys', 'mapValues'], function(methodName) {
    var array = [1, 2],
        func = _[methodName],
        object = { 'a': 1, 'b': 2, 'c': 3 };

    test('should iterate over own properties of objects', 1, function() {
      function Foo() { this.a = 'a'; }
      Foo.prototype.b = 'b';

      var actual = func(new Foo, function(value, key) { return key; });
      deepEqual(actual, { 'a': 'a' });
    });

    test('should accept a falsey `object` argument', 1, function() {
      var expected = _.map(falsey, _.constant({}));

      var actual = _.map(falsey, function(object, index) {
        try {
          return index ? func(object) : func();
        } catch (e) {}
      });

      deepEqual(actual, expected);
    });

    test('should return a wrapped value when chaining', 1, function() {
      if (!isNpm) {
        ok(_(object)[methodName](_.noop) instanceof _);
      }
      else {
        skipTest();
      }
    });
  });

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

    test('should match inherited `value` properties', 1, function() {
      function Foo() { this.a = 1; }
      Foo.prototype.b = 2;

      var object = { 'a': new Foo },
          matches = _.matches({ 'a': { 'b': 2 } });

      strictEqual(matches(object), true);
    });

    test('should match `-0` as `0`', 2, function() {
      var object1 = { 'a': -0 },
          object2 = { 'a': 0 },
          matches = _.matches(object1);

      strictEqual(matches(object2), true);

      matches = _.matches(object2);
      strictEqual(matches(object1), true);
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

    test('should return `false` when `object` is nullish', 1, function() {
      var values = [, null, undefined],
          expected = _.map(values, _.constant(false)),
          matches = _.matches({ 'a': 1 });

      var actual = _.map(values, function(value, index) {
        try {
          return index ? matches(value) : matches();
        } catch (e) {}
      });

      deepEqual(actual, expected);
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

    test('should compare a variety of `source` property values', 2, function() {
      var object1 = { 'a': false, 'b': true, 'c': '3', 'd': 4, 'e': [5], 'f': { 'g': 6 } },
          object2 = { 'a': 0, 'b': 1, 'c': 3, 'd': '4', 'e': ['5'], 'f': { 'g': '6' } },
          matches = _.matches(object1);

      strictEqual(matches(object1), true);
      strictEqual(matches(object2), false);
    });

    test('should compare functions by reference', 3, function() {
      var object1 = { 'a': _.noop },
          object2 = { 'a': noop },
          object3 = { 'a': {} },
          matches = _.matches(object1);

      strictEqual(matches(object1), true);
      strictEqual(matches(object2), false);
      strictEqual(matches(object3), false);
    });

    test('should not change match behavior if `source` is modified', 9, function() {
      var sources = [
        { 'a': { 'b': 2, 'c': 3 } },
        { 'a': 1, 'b': 2 },
        { 'a': 1 }
      ];

      _.each(sources, function(source, index) {
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

    test('should return `true` when comparing a `source` of empty arrays and objects', 1, function() {
      var objects = [{ 'a': [1], 'b': { 'c': 1 } }, { 'a': [2, 3], 'b': { 'd': 2 } }],
          matches = _.matches({ 'a': [], 'b': {} }),
          actual = _.filter(objects, matches);

      deepEqual(actual, objects);
    });

    test('should return `true` when comparing an empty `source` to a nullish `object`', 1, function() {
      var values = [, null, undefined],
          expected = _.map(values, _.constant(true)),
          matches = _.matches({});

      var actual = _.map(values, function(value, index) {
        try {
          return index ? matches(value) : matches();
        } catch (e) {}
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

    test('should handle a `source` with `undefined` values', 3, function() {
      var objects = [{ 'a': 1 }, { 'a': 1, 'b': 1 }, { 'a': 1, 'b': undefined }],
          matches = _.matches({ 'b': undefined }),
          actual = _.map(objects, matches),
          expected = [false, false, true];

      deepEqual(actual, expected);

      matches = _.matches({ 'a': 1, 'b': undefined });
      actual = _.map(objects, matches);

      deepEqual(actual, expected);

      objects = [{ 'a': { 'b': 1 } }, { 'a': { 'b':1, 'c': 1 } }, { 'a': { 'b': 1, 'c': undefined } }];
      matches = _.matches({ 'a': { 'c': undefined } });
      actual = _.map(objects, matches);

      deepEqual(actual, expected);
    });

    test('should handle a primitive `object` and a `source` with `undefined` values', 3, function() {
      numberProto.a = 1;
      numberProto.b = undefined;

      try {
        var matches = _.matches({ 'b': undefined });
        strictEqual(matches(1), true);
      } catch (e) {
        ok(false, e.message);
      }
      try {
        matches = _.matches({ 'a': 1, 'b': undefined });
        strictEqual(matches(1), true);
      } catch (e) {
        ok(false, e.message);
      }
      numberProto.a = { 'b': 1, 'c': undefined };
      try {
        matches = _.matches({ 'a': { 'c': undefined } });
        strictEqual(matches(1), true);
      } catch (e) {
        ok(false, e.message);
      }
      delete numberProto.a;
      delete numberProto.b;
    });

    test('should match properties when `value` is a function', 1, function() {
      function Foo() {}
      Foo.a = { 'b': 1, 'c': 2 };

      var matches = _.matches({ 'a': { 'b': 1 } });
      strictEqual(matches(Foo), true);
    });

    test('should match properties when `value` is not a plain object', 1, function() {
      function Foo(object) { _.assign(this, object); }

      var object = new Foo({ 'a': new Foo({ 'b': 1, 'c': 2 }) }),
          matches = _.matches({ 'a': { 'b': 1 } });

      strictEqual(matches(object), true);
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
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.matchesProperty');

  (function() {
    test('should create a function that performs a deep comparison between a property value and `value`', 6, function() {
      var object = { 'a': 1, 'b': 2, 'c': 3 },
          matches = _.matchesProperty('a', 1);

      strictEqual(matches.length, 1);
      strictEqual(matches(object), true);

      matches = _.matchesProperty('b', 3);
      strictEqual(matches(object), false);

      matches = _.matchesProperty('a', { 'a': 1, 'c': 3 });
      strictEqual(matches({ 'a': object }), true);

      matches = _.matchesProperty('a', { 'c': 3, 'd': 4 });
      strictEqual(matches(object), false);

      object = { 'a': { 'b': { 'c': 1, 'd': 2 }, 'e': 3 }, 'f': 4 };
      matches = _.matchesProperty('a', { 'b': { 'c': 1 } });

      strictEqual(matches(object), true);
    });

    test('should support deep paths', 2, function() {
      var object = { 'a': { 'b': { 'c': 3 } } };

      _.each(['a.b.c', ['a', 'b', 'c']], function(path) {
        var matches = _.matchesProperty(path, 3);
        strictEqual(matches(object), true);
      });
    });

    test('should coerce key to a string', 1, function() {
      function fn() {}
      fn.toString = _.constant('fn');

      var objects = [{ 'null': 1 }, { 'undefined': 2 }, { 'fn': 3 }, { '[object Object]': 4 }],
          values = [null, undefined, fn, {}];

      var expected = _.transform(values, function(result) {
        result.push(true, true);
      });

      var actual = _.transform(objects, function(result, object, index) {
        var key = values[index];
        _.each([key, [key]], function(path) {
          var matches = _.matchesProperty(path, object[key]);
          result.push(matches(object));
        });
      });

      deepEqual(actual, expected);
    });

    test('should match a key over a path', 2, function() {
      var object = { 'a.b.c': 3, 'a': { 'b': { 'c': 4 } } };

      _.each(['a.b.c', ['a.b.c']], function(path) {
        var matches = _.matchesProperty(path, 3);
        strictEqual(matches(object), true);
      });
    });

    test('should work with non-string `path` arguments', 2, function() {
      var array = [1, 2, 3];

      _.each([1, [1]], function(path) {
        var matches = _.matchesProperty(path, 2);
        strictEqual(matches(array), true);
      });
    });

    test('should return `false` if parts of `path` are missing', 4, function() {
      var object = {};

      _.each(['a', 'a[1].b.c', ['a'], ['a', '1', 'b', 'c']], function(path) {
        var matches = _.matchesProperty(path, 1);
        strictEqual(matches(object), false);
      });
    });

    test('should match inherited `value` properties', 2, function() {
      function Foo() {}
      Foo.prototype.b = 2;

      var object = { 'a': new Foo };

      _.each(['a', ['a']], function(path) {
        var matches = _.matchesProperty(path, { 'b': 2 });
        strictEqual(matches(object), true);
      });
    });

    test('should match `-0` as `0`', 2, function() {
      var matches = _.matchesProperty('a', -0);
      strictEqual(matches({ 'a': 0 }), true);

      matches = _.matchesProperty('a', 0);
      strictEqual(matches({ 'a': -0 }), true);
    });

    test('should not match by inherited `source` properties', 2, function() {
      function Foo() { this.a = 1; }
      Foo.prototype.b = 2;

      var objects = [{ 'a': { 'a': 1 } }, { 'a': { 'a': 1, 'b': 2 } }],
          expected = _.map(objects, _.constant(true));

      _.each(['a', ['a']], function(path) {
        var matches = _.matchesProperty(path, new Foo);
        deepEqual(_.map(objects, matches), expected);
      });
    });

    test('should return `false` when `object` is nullish', 2, function() {
      var values = [, null, undefined],
          expected = _.map(values, _.constant(false));

      _.each(['constructor', ['constructor']], function(path) {
        var matches = _.matchesProperty(path, 1);

        var actual = _.map(values, function(value, index) {
          try {
            return index ? matches(value) : matches();
          } catch (e) {}
        });

        deepEqual(actual, expected);
      });
    });

    test('should return `false` with deep paths when `object` is nullish', 2, function() {
      var values = [, null, undefined],
          expected = _.map(values, _.constant(false));

      _.each(['constructor.prototype.valueOf', ['constructor', 'prototype', 'valueOf']], function(path) {
        var matches = _.matchesProperty(path, 1);

        var actual = _.map(values, function(value, index) {
          try {
            return index ? matches(value) : matches();
          } catch (e) {}
        });

        deepEqual(actual, expected);
      });
    });

    test('should compare a variety of values', 2, function() {
      var object1 = { 'a': false, 'b': true, 'c': '3', 'd': 4, 'e': [5], 'f': { 'g': 6 } },
          object2 = { 'a': 0, 'b': 1, 'c': 3, 'd': '4', 'e': ['5'], 'f': { 'g': '6' } },
          matches = _.matchesProperty('a', object1);

      strictEqual(matches({ 'a': object1 }), true);
      strictEqual(matches({ 'a': object2 }), false);
    });

    test('should compare functions by reference', 3, function() {
      var object1 = { 'a': _.noop },
          object2 = { 'a': noop },
          object3 = { 'a': {} },
          matches = _.matchesProperty('a', object1);

      strictEqual(matches({ 'a': object1 }), true);
      strictEqual(matches({ 'a': object2 }), false);
      strictEqual(matches({ 'a': object3 }), false);
    });

    test('should not change match behavior if `value` is modified', 9, function() {
      _.each([{ 'a': { 'b': 2, 'c': 3 } }, { 'a': 1, 'b': 2 }, { 'a': 1 }], function(source, index) {
        var object = _.cloneDeep(source),
            matches = _.matchesProperty('a', source);

        strictEqual(matches({ 'a': object }), true);

        if (index) {
          source.a = 2;
          source.b = 1;
          source.c = 3;
        } else {
          source.a.b = 1;
          source.a.c = 2;
          source.a.d = 3;
        }
        strictEqual(matches({ 'a': object }), true);
        strictEqual(matches({ 'a': source }), false);
      });
    });

    test('should return `true` when comparing a `value` of empty arrays and objects', 1, function() {
      var objects = [{ 'a': [1], 'b': { 'c': 1 } }, { 'a': [2, 3], 'b': { 'd': 2 } }],
          matches = _.matchesProperty('a', { 'a': [], 'b': {} });

      var actual = _.filter(objects, function(object) {
        return matches({ 'a': object });
      });

      deepEqual(actual, objects);
    });

    test('should search arrays of `value` for values', 3, function() {
      var objects = [{ 'a': ['b'] }, { 'a': ['c', 'd'] }],
          matches = _.matchesProperty('a', ['d']),
          actual = _.filter(objects, matches);

      deepEqual(actual, [objects[1]]);

      matches = _.matchesProperty('a', ['b', 'd']);
      actual = _.filter(objects, matches);
      deepEqual(actual, []);

      matches = _.matchesProperty('a', ['d', 'b']);
      actual = _.filter(objects, matches);
      deepEqual(actual, []);
    });

    test('should perform a partial comparison of all objects within arrays of `value`', 1, function() {
      var objects = [
        { 'a': [{ 'a': 1, 'b': 2 }, { 'a': 4, 'b': 5, 'c': 6 }] },
        { 'a': [{ 'a': 1, 'b': 2 }, { 'a': 4, 'b': 6, 'c': 7 }] }
      ];

      var matches = _.matchesProperty('a', [{ 'a': 1 }, { 'a': 4, 'b': 5 }]),
          actual = _.filter(objects, matches);

      deepEqual(actual, [objects[0]]);
    });

    test('should handle a `value` with `undefined` values', 2, function() {
      var objects = [{ 'a': 1 }, { 'a': 1, 'b': 1 }, { 'a': 1, 'b': undefined }],
          matches = _.matchesProperty('b', undefined),
          actual = _.map(objects, matches),
          expected = [false, false, true];

      deepEqual(actual, expected);

      objects = [{ 'a': { 'a': 1 } }, { 'a': { 'a': 1, 'b': 1 } }, { 'a': { 'a': 1, 'b': undefined } }];
      matches = _.matchesProperty('a', { 'b': undefined });
      actual = _.map(objects, matches);

      deepEqual(actual, expected);
    });

    test('should handle a primitive `object` and a `source` with `undefined` values', 2, function() {
      numberProto.a = 1;
      numberProto.b = undefined;

      try {
        var matches = _.matchesProperty('b', undefined);
        strictEqual(matches(1), true);
      } catch (e) {
        ok(false, e.message);
      }
      numberProto.a = { 'b': 1, 'c': undefined };
      try {
        matches = _.matchesProperty('a', { 'c': undefined });
        strictEqual(matches(1), true);
      } catch (e) {
        ok(false, e.message);
      }
      delete numberProto.a;
      delete numberProto.b;
    });

    test('should work with a function for `value`', 1, function() {
      function source() {}
      source.a = 1;
      source.b = function() {};
      source.c = 3;

      var matches = _.matchesProperty('a', source),
          objects = [{ 'a': { 'a': 1 } }, { 'a': { 'a': 1, 'b': source.b, 'c': 3 } }],
          actual = _.map(objects, matches);

      deepEqual(actual, [false, true]);
    });

    test('should match properties when `value` is not a plain object', 1, function() {
      function Foo(object) { _.assign(this, object); }

      var object = new Foo({ 'a': new Foo({ 'b': 1, 'c': 2 }) }),
          matches = _.matchesProperty('a', { 'b': 1 });

      strictEqual(matches(object), true);
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.max');

  (function() {
    test('should return the largest value from a collection', 1, function() {
      strictEqual(_.max([1, 2, 3]), 3);
    });

    test('should return `-Infinity` for empty collections', 1, function() {
      var values = falsey.concat([[]]),
          expected = _.map(values, _.constant(-Infinity));

      var actual = _.map(values, function(value, index) {
        try {
          return index ? _.max(value) : _.max();
        } catch (e) {}
      });

      deepEqual(actual, expected);
    });

    test('should return `-Infinity` for non-numeric collection values', 1, function() {
      strictEqual(_.max(['a', 'b']), -Infinity);
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

    test('should throw a TypeError if `resolve` is truthy and not a function', function() {
      raises(function() { _.memoize(_.noop, {}); }, TypeError);
    });

    test('should not error if `resolver` is falsey', function() {
      var expected = _.map(falsey, _.constant(true));

      var actual = _.map(falsey, function(resolver, index) {
        try {
          return _.isFunction(index ? _.memoize(_.noop, resolver) : _.memoize(_.noop));
        } catch (e) {}
      });

      deepEqual(actual, expected);
    });

    test('should not set a `this` binding', 2, function() {
      var memoized = _.memoize(function(a, b, c) {
        return a + this.b + this.c;
      });

      var object = { 'b': 2, 'c': 3, 'memoized': memoized };
      strictEqual(object.memoized(1), 6);
      strictEqual(object.memoized(2), 7);
    });

    test('should check cache for own properties', 1, function() {
      var props = [
        'constructor',
        'hasOwnProperty',
        'isPrototypeOf',
        'propertyIsEnumerable',
        'toLocaleString',
        'toString',
        'valueOf'
      ];

      var memoized = _.memoize(_.identity);

      var actual = _.map(props, function(value) {
        return memoized(value);
      });

      deepEqual(actual, props);
    });

    test('should expose a `cache` object on the `memoized` function which implements `Map` interface', 18, function() {
      _.times(2, function(index) {
        var resolver = index ? _.identity : null;

        var memoized = _.memoize(function(value) {
          return 'value:' + value;
        }, resolver);

        var cache = memoized.cache;

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

    test('should allow `_.memoize.Cache` to be customized', 5, function() {
      var oldCache = _.memoize.Cache;

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
          return this;
        }
      };

      _.memoize.Cache = Cache;

      var memoized = _.memoize(function(object) {
        return 'value:' + object.id;
      });

      var cache = memoized.cache,
          key1 = { 'id': 'a' },
          key2 = { 'id': 'b' };

      strictEqual(memoized(key1), 'value:a');
      strictEqual(cache.has(key1), true);

      strictEqual(memoized(key2), 'value:b');
      strictEqual(cache.has(key2), true);

      cache['delete'](key2);
      strictEqual(cache.has(key2), false);

      _.memoize.Cache = oldCache;
    });

    test('should works with an immutable `_.memoize.Cache` ', 2, function() {
      var oldCache = _.memoize.Cache;

      function Cache() {
        this.__data__ = [];
      }

      Cache.prototype = {
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
          var result = new Cache;
          result.__data__ = this.__data__.concat({ 'key': key, 'value': value });
          return result;
        }
      };

      _.memoize.Cache = Cache;

      var memoized = _.memoize(function(object) {
        return object.id;
      });

      var key1 = { 'id': 'a' },
          key2 = { 'id': 'b' };

      memoized(key1);
      memoized(key2);

      var cache = memoized.cache;
      strictEqual(cache.has(key1), true);
      strictEqual(cache.has(key2), true);

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

    test('should skip `undefined` values in arrays if a destination value exists', 2, function() {
      var array = Array(3);
      array[0] = 1;
      array[2] = 3;

      var actual = _.merge([4, 5, 6], array),
          expected = [1, 5, 3];

      deepEqual(actual, expected);

      array = [1, , 3];
      array[1] = undefined;

      actual = _.merge([4, 5, 6], array);
      deepEqual(actual, expected);
    });

    test('should merge `arguments` objects', 3, function() {
      var object1 = { 'value': args },
          object2 = { 'value': { '3': 4 } },
          expected = { '0': 1, '1': 2, '2': 3, '3': 4 },
          actual = _.merge(object1, object2);

      ok(!_.isArguments(actual.value));
      deepEqual(actual.value, expected);
      delete object1.value[3];

      actual = _.merge(object2, object1);
      deepEqual(actual.value, expected);
    });

    test('should merge typed arrays', 4, function() {
      var array1 = [0],
          array2 = [0, 0],
          array3 = [0, 0, 0, 0],
          array4 = _.range(0, 8, 0);

      var arrays = [array2, array1, array4, array3, array2, array4, array4, array3, array2],
          buffer = ArrayBuffer && new ArrayBuffer(8);

      // juggle for `Float64Array` shim
      if (root.Float64Array && (new Float64Array(buffer)).length == 8) {
        arrays[1] = array4;
      }
      var expected = _.map(typedArrays, function(type, index) {
        var array = arrays[index].slice();
        array[0] = 1;
        return root[type] ? { 'value': array } : false;
      });

      var actual = _.map(typedArrays, function(type) {
        var Ctor = root[type];
        return Ctor ? _.merge({ 'value': new Ctor(buffer) }, { 'value': [1] }) : false;
      });

      ok(_.isArray(actual));
      deepEqual(actual, expected);

      expected = _.map(typedArrays, function(type, index) {
        var array = arrays[index].slice();
        array.push(1);
        return root[type] ? { 'value': array } : false;
      });

      actual = _.map(typedArrays, function(type, index) {
        var Ctor = root[type],
            array = _.range(arrays[index].length);

        array.push(1);
        return Ctor ? _.merge({ 'value': array }, { 'value': new Ctor(buffer) }) : false;
      });

      ok(_.isArray(actual));
      deepEqual(actual, expected);
    });

    test('should work with four arguments', 1, function() {
      var expected = { 'a': 4 },
          actual = _.merge({ 'a': 1 }, { 'a': 2 }, { 'a': 3 }, expected);

      deepEqual(actual, expected);
    });

    test('should assign `null` values', 1, function() {
      var actual = _.merge({ 'a': 1 }, { 'a': null });
      strictEqual(actual.a, null);
    });

    test('should not assign `undefined` values', 1, function() {
      var actual = _.merge({ 'a': 1 }, { 'a': undefined, 'b': undefined });
      deepEqual(actual, { 'a': 1 });
    });

    test('should not error on DOM elements', 1, function() {
      var object1 = { 'el': document && document.createElement('div') },
          object2 = { 'el': document && document.createElement('div') },
          pairs = [[{}, object1], [object1, object2]],
          expected = _.map(pairs, _.constant(true));

      var actual = _.map(pairs, function(pair) {
        try {
          return _.merge(pair[0], pair[1]).el === pair[1].el;
        } catch (e) {}
      });

      deepEqual(actual, expected);
    });

    test('should assign non array/plain-object values directly', 1, function() {
      function Foo() {}

      var values = [new Foo, new Boolean, new Date, Foo, new Number, new String, new RegExp],
          expected = _.map(values, _.constant(true));

      var actual = _.map(values, function(value) {
        var object = _.merge({}, { 'a': value });
        return object.a === value;
      });

      deepEqual(actual, expected);
    });

    test('should merge plain-objects onto non plain-objects', 4, function() {
      function Foo(object) {
        _.assign(this, object);
      }

      var object = { 'a': 1 },
          actual = _.merge(new Foo, object);

      ok(actual instanceof Foo);
      deepEqual(actual, new Foo(object));

      actual = _.merge([new Foo], [object]);

      ok(actual[0] instanceof Foo);
      deepEqual(actual, [new Foo(object)]);
    });

    test('should convert values to arrays when merging with arrays of `source`', 2, function() {
      var object = { 'a': { '1': 'y', 'b': 'z', 'length': 2 } },
          actual = _.merge(object, { 'a': ['x'] });

      deepEqual(actual, { 'a': ['x', 'y'] });

      actual = _.merge({ 'a': {} }, { 'a': [] });
      deepEqual(actual, { 'a': [] });
    });

    test('should not convert strings to arrays when merging with arrays of `source`', 1, function() {
      var object = { 'a': 'abcdef' },
          actual = _.merge(object, { 'a': ['x', 'y', 'z'] });

      deepEqual(actual, { 'a': ['x', 'y', 'z'] });
    });

    test('should work with a function for `object`', 2, function() {
      function Foo() {}

      var source = { 'a': 1 },
          actual = _.merge(Foo, source);

      strictEqual(actual, Foo);
      strictEqual(Foo.a, 1);
    });

    test('should work with a non-plain `object` value', 2, function() {
      function Foo() {}

      var object = new Foo,
          source = { 'a': 1 },
          actual = _.merge(object, source);

      strictEqual(actual, object);
      strictEqual(object.a, 1);
    });

    test('should pass thru primitive `object` values', 1, function() {
      var values = [true, 1, '1'];

      var actual = _.map(values, function(value) {
        return _.merge(value, { 'a': 1 });
      });

      deepEqual(actual, values);
    });
  }(1, 2, 3));

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.mergeWith');

  (function() {
    test('should handle merging if `customizer` returns `undefined`', 2, function() {
      var actual = _.mergeWith({ 'a': { 'b': [1, 1] } }, { 'a': { 'b': [0] } }, _.noop);
      deepEqual(actual, { 'a': { 'b': [0, 1] } });

      actual = _.mergeWith([], [undefined], _.identity);
      deepEqual(actual, [undefined]);
    });

    test('should defer to `customizer` when it returns a value other than `undefined`', 1, function() {
      var actual = _.mergeWith({ 'a': { 'b': [0, 1] } }, { 'a': { 'b': [2] } }, function(a, b) {
        return _.isArray(a) ? a.concat(b) : undefined;
      });

      deepEqual(actual, { 'a': { 'b': [0, 1, 2] } });
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.method');

  (function() {
    test('should create a function that calls a method of a given object', 4, function() {
      var object = { 'a': _.constant(1) };

      _.each(['a', ['a']], function(path) {
        var method = _.method(path);
        strictEqual(method.length, 1);
        strictEqual(method(object), 1);
      });
    });

    test('should work with deep property values', 2, function() {
      var object = { 'a': { 'b': { 'c': _.constant(3) } } };

      _.each(['a.b.c', ['a', 'b', 'c']], function(path) {
        var method = _.method(path);
        strictEqual(method(object), 3);
      });
    });

    test('should work with non-string `path` arguments', 2, function() {
      var array = _.times(3, _.constant);

      _.each([1, [1]], function(path) {
        var method = _.method(path);
        strictEqual(method(array), 1);
      });
    });

    test('should coerce key to a string', 1, function() {
      function fn() {}
      fn.toString = _.constant('fn');

      var expected = [1, 1, 2, 2, 3, 3, 4, 4],
          objects = [{ 'null': _.constant(1) }, { 'undefined': _.constant(2) }, { 'fn': _.constant(3) }, { '[object Object]': _.constant(4) }],
          values = [null, undefined, fn, {}];

      var actual = _.transform(objects, function(result, object, index) {
        var key = values[index];
        _.each([key, [key]], function(path) {
          var method = _.method(key);
          result.push(method(object));
        });
      });

      deepEqual(actual, expected);
    });

    test('should work with inherited property values', 2, function() {
      function Foo() {}
      Foo.prototype.a = _.constant(1);

      _.each(['a', ['a']], function(path) {
        var method = _.method(path);
        strictEqual(method(new Foo), 1);
      });
    });

    test('should use a key over a path', 2, function() {
      var object = { 'a.b.c': _.constant(3), 'a': { 'b': { 'c': _.constant(4) } } };

      _.each(['a.b.c', ['a.b.c']], function(path) {
        var method = _.method(path);
        strictEqual(method(object), 3);
      });
    });

    test('should return `undefined` when `object` is nullish', 2, function() {
      var values = [, null, undefined],
          expected = _.map(values, _.constant(undefined));

      _.each(['constructor', ['constructor']], function(path) {
        var method = _.method(path);

        var actual = _.map(values, function(value, index) {
          return index ? method(value) : method();
        });

        deepEqual(actual, expected);
      });
    });

    test('should return `undefined` with deep paths when `object` is nullish', 2, function() {
      var values = [, null, undefined],
          expected = _.map(values, _.constant(undefined));

      _.each(['constructor.prototype.valueOf', ['constructor', 'prototype', 'valueOf']], function(path) {
        var method = _.method(path);

        var actual = _.map(values, function(value, index) {
          return index ? method(value) : method();
        });

        deepEqual(actual, expected);
      });
    });

    test('should return `undefined` if parts of `path` are missing', 4, function() {
      var object = {};

      _.each(['a', 'a[1].b.c', ['a'], ['a', '1', 'b', 'c']], function(path) {
        var method = _.method(path);
        strictEqual(method(object), undefined);
      });
    });

    test('should apply partial arguments to function', 2, function() {
      var object = {
        'fn': function() {
          return slice.call(arguments);
        }
      };

      _.each(['fn', ['fn']], function(path) {
        var method = _.method(path, 1, 2, 3);
        deepEqual(method(object), [1, 2, 3]);
      });
    });

    test('should invoke deep property methods with the correct `this` binding', 2, function() {
      var object = { 'a': { 'b': function() { return this.c; }, 'c': 1 } };

      _.each(['a.b', ['a', 'b']], function(path) {
        var method = _.method(path);
        strictEqual(method(object), 1);
      });
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.methodOf');

  (function() {
    test('should create a function that calls a method of a given key', 4, function() {
      var object = { 'a': _.constant(1) };

      _.each(['a', ['a']], function(path) {
        var methodOf = _.methodOf(object);
        strictEqual(methodOf.length, 1);
        strictEqual(methodOf(path), 1);
      });
    });

    test('should work with deep property values', 2, function() {
      var object = { 'a': { 'b': { 'c': _.constant(3) } } };

      _.each(['a.b.c', ['a', 'b', 'c']], function(path) {
        var methodOf = _.methodOf(object);
        strictEqual(methodOf(path), 3);
      });
    });

    test('should work with non-string `path` arguments', 2, function() {
      var array = _.times(3, _.constant);

      _.each([1, [1]], function(path) {
        var methodOf = _.methodOf(array);
        strictEqual(methodOf(path), 1);
      });
    });

    test('should coerce key to a string', 1, function() {
      function fn() {}
      fn.toString = _.constant('fn');

      var expected = [1, 1, 2, 2, 3, 3, 4, 4],
          objects = [{ 'null': _.constant(1) }, { 'undefined': _.constant(2) }, { 'fn': _.constant(3) }, { '[object Object]': _.constant(4) }],
          values = [null, undefined, fn, {}];

      var actual = _.transform(objects, function(result, object, index) {
        var key = values[index];
        _.each([key, [key]], function(path) {
          var methodOf = _.methodOf(object);
          result.push(methodOf(key));
        });
      });

      deepEqual(actual, expected);
    });

    test('should work with inherited property values', 2, function() {
      function Foo() {}
      Foo.prototype.a = _.constant(1);

      _.each(['a', ['a']], function(path) {
        var methodOf = _.methodOf(new Foo);
        strictEqual(methodOf(path), 1);
      });
    });

    test('should use a key over a path', 2, function() {
      var object = { 'a.b.c': _.constant(3), 'a': { 'b': { 'c': _.constant(4) } } };

      _.each(['a.b.c', ['a.b.c']], function(path) {
        var methodOf = _.methodOf(object);
        strictEqual(methodOf(path), 3);
      });
    });

    test('should return `undefined` when `object` is nullish', 2, function() {
      var values = [, null, undefined],
          expected = _.map(values, _.constant(undefined));

      _.each(['constructor', ['constructor']], function(path) {
        var actual = _.map(values, function(value, index) {
          var methodOf = index ? _.methodOf() : _.methodOf(value);
          return methodOf(path);
        });

        deepEqual(actual, expected);
      });
    });

    test('should return `undefined` with deep paths when `object` is nullish', 2, function() {
      var values = [, null, undefined],
          expected = _.map(values, _.constant(undefined));

      _.each(['constructor.prototype.valueOf', ['constructor', 'prototype', 'valueOf']], function(path) {
        var actual = _.map(values, function(value, index) {
          var methodOf = index ? _.methodOf() : _.methodOf(value);
          return methodOf(path);
        });

        deepEqual(actual, expected);
      });
    });

    test('should return `undefined` if parts of `path` are missing', 4, function() {
      var object = {},
          methodOf = _.methodOf(object);

      _.each(['a', 'a[1].b.c', ['a'], ['a', '1', 'b', 'c']], function(path) {
        strictEqual(methodOf(path), undefined);
      });
    });

    test('should apply partial arguments to function', 2, function() {
      var object = {
        'fn': function() {
          return slice.call(arguments);
        }
      };

      var methodOf = _.methodOf(object, 1, 2, 3);

      _.each(['fn', ['fn']], function(path) {
        deepEqual(methodOf(path), [1, 2, 3]);
      });
    });

    test('should invoke deep property methods with the correct `this` binding', 2, function() {
      var object = { 'a': { 'b': function() { return this.c; }, 'c': 1 } },
          methodOf = _.methodOf(object);

      _.each(['a.b', ['a', 'b']], function(path) {
        strictEqual(methodOf(path), 1);
      });
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.min');

  (function() {
    test('should return the smallest value from a collection', 1, function() {
      strictEqual(_.min([1, 2, 3]), 1);
    });

    test('should return `Infinity` for empty collections', 1, function() {
      var values = falsey.concat([[]]),
          expected = _.map(values, _.constant(Infinity));

      var actual = _.map(values, function(value, index) {
        try {
          return index ? _.min(value) : _.min();
        } catch (e) {}
      });

      deepEqual(actual, expected);
    });

    test('should return `Infinity` for non-numeric collection values', 1, function() {
      strictEqual(_.min(['a', 'b']), Infinity);
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('extremum methods');

  _.each(['max', 'maxBy', 'min', 'minBy'], function(methodName) {
    var array = [1, 2, 3],
        func = _[methodName],
        isMax = /^max/.test(methodName);

    test('`_.' + methodName + '` should work with Date objects', 1, function() {
      var curr = new Date,
          past = new Date(0);

      strictEqual(func([curr, past]), isMax ? curr : past);
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

  _.each(['maxBy', 'minBy'], function(methodName) {
    var array = [1, 2, 3],
        func = _[methodName],
        isMax = methodName == 'maxBy';

    test('`_.' + methodName + '` should work with an `iteratee` argument', 1, function() {
      var actual = func(array, function(num) {
        return -num;
      });

      strictEqual(actual, isMax ? 1 : 3);
    });

    test('should work with a "_.property" style `iteratee`', 2, function() {
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

    var array = ['a'],
        source = { 'a': function(array) { return array[0]; }, 'b': 'B' };

    test('should mixin `source` methods into lodash', 4, function() {
      if (!isNpm) {
        _.mixin(source);

        strictEqual(_.a(array), 'a');
        strictEqual(_(array).a().value(), 'a');

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

    test('should mixin chaining methods by reference', 2, function() {
      if (!isNpm) {
        _.mixin(source);
        _.a = _.constant('b');

        strictEqual(_.a(array), 'b');
        strictEqual(_(array).a().value(), 'a');

        delete _.a;
        delete _.prototype.a;
      }
      else {
        skipTest(2);
      }
    });

    test('should use `this` as the default `object` value', 3, function() {
      var object = _.create(_);
      object.mixin(source);

      strictEqual(object.a(array), 'a');

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
      strictEqual(object.a(array), 'a');
    });

    test('should return `object`', 2, function() {
      var object = {};
      strictEqual(_.mixin(object, source), object);
      strictEqual(_.mixin(), _);
    });

    test('should work with a function for `object`', 2, function() {
      _.mixin(Wrapper, source);

      var wrapped = Wrapper(array),
          actual = wrapped.a();

      strictEqual(actual.value(), 'a');
      ok(actual instanceof Wrapper);

      delete Wrapper.a;
      delete Wrapper.prototype.a;
      delete Wrapper.b;
      delete Wrapper.prototype.b;
    });

    test('should not assign inherited `source` methods', 1, function() {
      function Foo() {}
      Foo.prototype.a = _.noop;

      var object = {};
      strictEqual(_.mixin(object, new Foo), object);
    });

    test('should accept an `options` argument', 8, function() {
      function message(func, chain) {
        return (func === _ ? 'lodash' : 'provided') + ' function should ' + (chain ? '' : 'not ') + 'chain';
      }

      _.each([_, Wrapper], function(func) {
        _.each([{ 'chain': false }, { 'chain': true }], function(options) {
          if (!isNpm) {
            if (func === _) {
              _.mixin(source, options);
            } else {
              _.mixin(func, source, options);
            }
            var wrapped = func(array),
                actual = wrapped.a();

            if (options.chain) {
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
      } catch (e) {
        pass = false;
      }
      ok(pass);

      pass = true;

      try {
        _.mixin(source, 1);
      } catch (e) {
        pass = false;
      }
      delete _.a;
      delete _.prototype.a;
      delete _.b;
      delete _.prototype.b;

      ok(pass);
    });

    test('should not return the existing wrapped value when chaining', 2, function() {
      _.each([_, Wrapper], function(func) {
        if (!isNpm) {
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
        }
        else {
          skipTest();
        }
      });
    });

    test('should produce methods that work in a lazy chain sequence', 1, function() {
      if (!isNpm) {
        _.mixin({ 'a': _.countBy, 'b': _.filter });

        var array = _.range(LARGE_ARRAY_SIZE),
            actual = _(array).a().map(square).b(isEven).take().value();

        deepEqual(actual, _.take(_.b(_.map(_.a(array), square), isEven)));

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

  QUnit.module('lodash.modArgs');

  (function() {
    function fn() {
      return slice.call(arguments);
    }

    test('should transform each argument', 1, function() {
      var modded = _.modArgs(fn, doubled, square);
      deepEqual(modded(5, 10), [10, 100]);
    });

    test('should flatten `transforms`', 1, function() {
      var modded = _.modArgs(fn, [doubled, square], String);
      deepEqual(modded(5, 10, 15), [10, 100, '15']);
    });

    test('should not transform any argument greater than the number of transforms', 1, function() {
      var modded = _.modArgs(fn, doubled, square);
      deepEqual(modded(5, 10, 18), [10, 100, 18]);
    });

    test('should not transform any arguments if no transforms are provided', 1, function() {
      var modded = _.modArgs(fn);
      deepEqual(modded(5, 10, 18), [5, 10, 18]);
    });

    test('should not pass `undefined` if there are more `transforms` than `arguments`', 1, function() {
      var modded = _.modArgs(fn, doubled, _.identity);
      deepEqual(modded(5), [10]);
    });

    test('should not set a `this` binding', 1, function() {
      var modded = _.modArgs(function(x) {
        return this[x];
      }, function(x) {
        return this === x;
      });

      var object = { 'modded': modded, 'false': 1 };
      strictEqual(object.modded(object), 1);
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.negate');

  (function() {
    test('should create a function that negates the result of `func`', 2, function() {
      var negate = _.negate(isEven);

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
    test('should return the `lodash` function', 2, function() {
      if (!isModularize) {
        strictEqual(_.noConflict(), oldDash);

        if (!(isRhino && typeof require == 'function')) {
          notStrictEqual(root._, oldDash);
        }
        else {
          skipTest();
        }
        root._ = oldDash;
      }
      else {
        skipTest(2);
      }
    });

    test('should work with a `root` of `this`', 2, function() {
      if (!isModularize && !document && _._object) {
        var fs = require('fs'),
            vm = require('vm'),
            expected = {},
            context = vm.createContext({ '_': expected, 'console': console }),
            source = fs.readFileSync(filePath);

        vm.runInContext(source + '\nthis.lodash = this._.noConflict()', context);

        strictEqual(context._, expected);
        ok(!!context.lodash);
      }
      else {
        skipTest(2);
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
        object = { 'a': 1, 'b': 2, 'c': 3, 'd': 4 };

    test('should flatten `props`', 2, function() {
      deepEqual(_.omit(object, 'a', 'c'), { 'b': 2, 'd': 4 });
      deepEqual(_.omit(object, ['a', 'd'], 'c'), { 'b': 2 });
    });

    test('should work with a primitive `object` argument', 1, function() {
      stringProto.a = 1;
      stringProto.b = 2;

      deepEqual(_.omit('', 'b'), { 'a': 1 });

      delete stringProto.a;
      delete stringProto.b;
    });

    test('should return an empty object when `object` is nullish', 2, function() {
      objectProto.a = 1;
      _.each([null, undefined], function(value) {
        deepEqual(_.omit(value, 'valueOf'), {});
      });
      delete objectProto.a;
    });

    test('should work with `arguments` objects as secondary arguments', 1, function() {
      deepEqual(_.omit(object, args), { 'b': 2, 'd': 4 });
    });

    test('should coerce property names to strings', 1, function() {
      deepEqual(_.omit({ '0': 'a' }, 0), {});
    });
  }('a', 'c'));

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.omitBy');

  (function() {
    test('should work with a predicate argument', 1, function() {
      var object = { 'a': 1, 'b': 2, 'c': 3, 'd': 4 };

      var actual = _.omitBy(object, function(num) {
        return num != 2 && num != 4;
      });

      deepEqual(actual, { 'b': 2, 'd': 4 });
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('omit methods');

  _.each(['omit', 'omitBy'], function(methodName) {
    var expected = { 'b': 2, 'd': 4 },
        func = _[methodName],
        object = { 'a': 1, 'b': 2, 'c': 3, 'd': 4 },
        prop = function(object, props) { return props; };

    if (methodName == 'omitBy') {
      prop = function(object, props) {
        props = typeof props == 'string' ? [props] : props;
        return function(value) {
          return _.some(props, function(key) { return object[key] === value; });
        };
      };
    }
    test('`_.' + methodName + '` should create an object with omitted properties', 2, function() {
      deepEqual(func(object, prop(object, 'a')), { 'b': 2, 'c': 3, 'd': 4 });
      deepEqual(func(object, prop(object, ['a', 'c'])), expected);
    });

    test('`_.' + methodName + '` should iterate over inherited properties', 1, function() {
      function Foo() {}
      Foo.prototype = object;

      var foo = new Foo;
      deepEqual(func(foo, prop(object, ['a', 'c'])), expected);
    });

    test('`_.' + methodName + '` should work with an array `object` argument', 1, function() {
      var array = [1, 2, 3];
      deepEqual(func(array, prop(array, ['0', '2'])), { '1': 2 });
    });
  });

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
      } catch (e) {
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
        isPad = methodName == 'pad',
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

    test('`_.' + methodName + '` should treat nullish values as empty strings', 6, function() {
      _.each([undefined, '_-'], function(chars) {
        var expected = chars ? (isPad ? '__' : chars) : '  ';
        strictEqual(func(null, 2, chars), expected);
        strictEqual(func(undefined, 2, chars), expected);
        strictEqual(func('', 2, chars), expected);
      });
    });

    test('`_.' + methodName + '` should work with nullish or empty string values for `chars`', 3, function() {
      notStrictEqual(func('abc', 6, null), 'abc');
      notStrictEqual(func('abc', 6, undefined), 'abc');
      strictEqual(func('abc', 6, ''), 'abc');
    });
  });

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.pairs');

  (function() {
    test('should create a two dimensional array of key-value pairs', 1, function() {
      var object = { 'a': 1, 'b': 2 };
      deepEqual(_.pairs(object), [['a', 1], ['b', 2]]);
    });

    test('should work with an object that has a `length` property', 1, function() {
      var object = { '0': 'a', '1': 'b', 'length': 2 };
      deepEqual(_.pairs(object), [['0', 'a'], ['1', 'b'], ['length', 2]]);
    });

    test('should work with strings', 2, function() {
      _.each(['xo', Object('xo')], function(string) {
        deepEqual(_.pairs(string), [['0', 'x'], ['1', 'o']]);
      });
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
      var object = { 'valueOf': _.constant(0) };
      strictEqual(_.parseInt('08', object), 8);
      strictEqual(_.parseInt('0x20', object), 32);
    });

    test('should work as an iteratee for methods like `_.map`', 2, function() {
      var strings = _.map(['6', '08', '10'], Object),
          actual = _.map(strings, _.parseInt);

      deepEqual(actual, [6, 8, 10]);

      actual = _.map('123', _.parseInt);
      deepEqual(actual, [1, 2, 3]);
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('partial methods');

  _.each(['partial', 'partialRight'], function(methodName) {
    var func = _[methodName],
        isPartial = methodName == 'partial',
        ph = func.placeholder;

    test('`_.' + methodName + '` partially applies arguments', 1, function() {
      var par = func(_.identity, 'a');
      strictEqual(par(), 'a');
    });

    test('`_.' + methodName + '` creates a function that can be invoked with additional arguments', 1, function() {
      var fn = function(a, b) { return [a, b]; },
          par = func(fn, 'a'),
          expected = ['a', 'b'];

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

    test('`_.' + methodName + '` should work with curried functions', 2, function() {
      var fn = function(a, b, c) { return a + b + c; },
          curried = _.curry(func(fn, 1), 2);

      strictEqual(curried(2, 3), 6);
      strictEqual(curried(2)(3), 6);
    });

    test('should work with placeholders and curried functions', 1, function() {
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

      var defaultsDeep = _.partialRight(_.mergeWith, function deep(value, other) {
        return _.isObject(value) ? _.mergeWith(value, other, deep) : value;
      });

      deepEqual(defaultsDeep(object, source), expected);
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('methods using `createWrapper`');

  (function() {
    function fn() {
      return slice.call(arguments);
    }

    var ph1 = _.bind.placeholder,
        ph2 = _.bindKey.placeholder,
        ph3 = _.partial.placeholder,
        ph4 = _.partialRight.placeholder;

    test('should work with combinations of partial functions', 1, function() {
      var a = _.partial(fn),
          b = _.partialRight(a, 3),
          c = _.partial(b, 1);

      deepEqual(c(2), [1, 2, 3]);
    });

    test('should work with combinations of bound and partial functions', 3, function() {
      var fn = function() {
        var result = [this.a];
        push.apply(result, arguments);
        return result;
      };

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

    test('should work with combinations of functions with placeholders', 3, function() {
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

      a = _.partial(fn, ph3, 2);
      b = _.bind(a, object, 1, ph1, 4);
      c = _.partialRight(b, ph4, 6);

      deepEqual(c(3, 5), expected);
    });

    test('should work with combinations of functions with overlaping placeholders', 3, function() {
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

      a = _.partial(fn, ph3, 2);
      b = _.bind(a, object, ph1, 3);
      c = _.partialRight(b, ph4, 4);

      deepEqual(c(1), expected);
    });

    test('should work with recursively bound functions', 1, function() {
      var fn = function() {
        return this.a;
      };

      var a = _.bind(fn, { 'a': 1 }),
          b = _.bind(a,  { 'a': 2 }),
          c = _.bind(b,  { 'a': 3 });

      strictEqual(c(), 1);
    });

    test('should work when hot', 12, function() {
      _.times(2, function(index) {
        var fn = function() {
          var result = [this];
          push.apply(result, arguments);
          return result;
        };

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
        var fn = function(a, b, c) { return [a, b, c]; },
            curried = _[methodName](fn),
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
        var func = _[methodName],
            fn = function() { return slice.call(arguments); },
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

    test('should work with a "_.property" style `predicate`', 1, function() {
      var objects = [{ 'a': 1 }, { 'a': 1 }, { 'b': 2 }],
          actual = _.partition(objects, 'a');

      deepEqual(actual, [objects.slice(0, 2), objects.slice(2)]);
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

    test('should work with an object for `collection`', 1, function() {
      var actual = _.partition({ 'a': 1.1, 'b': 0.2, 'c': 1.3 }, function(num) {
        return Math.floor(num);
      });

      deepEqual(actual, [[1.1, 1.3], [0.2]]);
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.pick');

  (function() {
    var args = arguments,
        object = { 'a': 1, 'b': 2, 'c': 3, 'd': 4 };

    test('should flatten `props`', 2, function() {
      deepEqual(_.pick(object, 'a', 'c'), { 'a': 1, 'c': 3 });
      deepEqual(_.pick(object, ['a', 'd'], 'c'), { 'a': 1, 'c': 3, 'd': 4 });
    });

    test('should work with a primitive `object` argument', 1, function() {
      deepEqual(_.pick('', 'slice'), { 'slice': ''.slice });
    });

    test('should return an empty object when `object` is nullish', 2, function() {
      _.each([null, undefined], function(value) {
        deepEqual(_.pick(value, 'valueOf'), {});
      });
    });

    test('should work with `arguments` objects as secondary arguments', 1, function() {
      deepEqual(_.pick(object, args), { 'a': 1, 'c': 3 });
    });

    test('should coerce property names to strings', 1, function() {
      deepEqual(_.pick({ '0': 'a', '1': 'b' }, 0), { '0': 'a' });
    });
  }('a', 'c'));

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.pickBy');

  (function() {
    test('should work with a predicate argument', 1, function() {
      var object = { 'a': 1, 'b': 2, 'c': 3, 'd': 4 };

      var actual = _.pickBy(object, function(num) {
        return num == 1 || num == 3;
      });

      deepEqual(actual, { 'a': 1, 'c': 3 });
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('pick methods');

  _.each(['pick', 'pickBy'], function(methodName) {
    var expected = { 'a': 1, 'c': 3 },
        func = _[methodName],
        object = { 'a': 1, 'b': 2, 'c': 3, 'd': 4 },
        prop = function(object, props) { return props; };

    if (methodName == 'pickBy') {
      prop = function(object, props) {
        props = typeof props == 'string' ? [props] : props;
        return function(value) {
          return _.some(props, function(key) { return object[key] === value; });
        };
      };
    }
    test('`_.' + methodName + '` should create an object of picked properties', 2, function() {
      deepEqual(func(object, prop(object, 'a')), { 'a': 1 });
      deepEqual(func(object, prop(object, ['a', 'c'])), expected);
    });

    test('`_.' + methodName + '` should iterate over inherited properties', 1, function() {
      function Foo() {}
      Foo.prototype = object;

      var foo = new Foo;
      deepEqual(func(foo, prop(foo, ['a', 'c'])), expected);
    });

    test('`_.' + methodName + '` should work with an array `object` argument', 1, function() {
      var array = [1, 2, 3];
      deepEqual(func(array, prop(array, '1')), { '1': 2 });
    });
  });

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.property');

  (function() {
    test('should create a function that plucks a property value of a given object', 4, function() {
      var object = { 'a': 1 };

      _.each(['a', ['a']], function(path) {
        var prop = _.property(path);
        strictEqual(prop.length, 1);
        strictEqual(prop(object), 1);
      });
    });

    test('should pluck deep property values', 2, function() {
      var object = { 'a': { 'b': { 'c': 3 } } };

      _.each(['a.b.c', ['a', 'b', 'c']], function(path) {
        var prop = _.property(path);
        strictEqual(prop(object), 3);
      });
    });

    test('should work with non-string `path` arguments', 2, function() {
      var array = [1, 2, 3];

      _.each([1, [1]], function(path) {
        var prop = _.property(path);
        strictEqual(prop(array), 2);
      });
    });

    test('should coerce key to a string', 1, function() {
      function fn() {}
      fn.toString = _.constant('fn');

      var expected = [1, 1, 2, 2, 3, 3, 4, 4],
          objects = [{ 'null': 1 }, { 'undefined': 2 }, { 'fn': 3 }, { '[object Object]': 4 }],
          values = [null, undefined, fn, {}];

      var actual = _.transform(objects, function(result, object, index) {
        var key = values[index];
        _.each([key, [key]], function(path) {
          var prop = _.property(key);
          result.push(prop(object));
        });
      });

      deepEqual(actual, expected);
    });

    test('should pluck inherited property values', 2, function() {
      function Foo() {}
      Foo.prototype.a = 1;

      _.each(['a', ['a']], function(path) {
        var prop = _.property(path);
        strictEqual(prop(new Foo), 1);
      });
    });

    test('should pluck a key over a path', 2, function() {
      var object = { 'a.b.c': 3, 'a': { 'b': { 'c': 4 } } };

      _.each(['a.b.c', ['a.b.c']], function(path) {
        var prop = _.property(path);
        strictEqual(prop(object), 3);
      });
    });

    test('should return `undefined` when `object` is nullish', 2, function() {
      var values = [, null, undefined],
          expected = _.map(values, _.constant(undefined));

      _.each(['constructor', ['constructor']], function(path) {
        var prop = _.property(path);

        var actual = _.map(values, function(value, index) {
          return index ? prop(value) : prop();
        });

        deepEqual(actual, expected);
      });
    });

    test('should return `undefined` with deep paths when `object` is nullish', 2, function() {
      var values = [, null, undefined],
          expected = _.map(values, _.constant(undefined));

      _.each(['constructor.prototype.valueOf', ['constructor', 'prototype', 'valueOf']], function(path) {
        var prop = _.property(path);

        var actual = _.map(values, function(value, index) {
          return index ? prop(value) : prop();
        });

        deepEqual(actual, expected);
      });
    });

    test('should return `undefined` if parts of `path` are missing', 4, function() {
      var object = {};

      _.each(['a', 'a[1].b.c', ['a'], ['a', '1', 'b', 'c']], function(path) {
        var prop = _.property(path);
        strictEqual(prop(object), undefined);
      });
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.propertyOf');

  (function() {
    test('should create a function that plucks a property value of a given key', 3, function() {
      var object = { 'a': 1 },
          propOf = _.propertyOf(object);

      strictEqual(propOf.length, 1);
      _.each(['a', ['a']], function(path) {
        strictEqual(propOf(path), 1);
      });
    });

    test('should pluck deep property values', 2, function() {
      var object = { 'a': { 'b': { 'c': 3 } } },
          propOf = _.propertyOf(object);

      _.each(['a.b.c', ['a', 'b', 'c']], function(path) {
        strictEqual(propOf(path), 3);
      });
    });

    test('should work with non-string `path` arguments', 2, function() {
      var array = [1, 2, 3],
          propOf = _.propertyOf(array);

      _.each([1, [1]], function(path) {
        strictEqual(propOf(path), 2);
      });
    });

    test('should coerce key to a string', 1, function() {
      function fn() {}
      fn.toString = _.constant('fn');

      var expected = [1, 1, 2, 2, 3, 3, 4, 4],
          objects = [{ 'null': 1 }, { 'undefined': 2 }, { 'fn': 3 }, { '[object Object]': 4 }],
          values = [null, undefined, fn, {}];

      var actual = _.transform(objects, function(result, object, index) {
        var key = values[index];
        _.each([key, [key]], function(path) {
          var propOf = _.propertyOf(object);
          result.push(propOf(key));
        });
      });

      deepEqual(actual, expected);
    });

    test('should pluck inherited property values', 2, function() {
      function Foo() { this.a = 1; }
      Foo.prototype.b = 2;

      var propOf = _.propertyOf(new Foo);

      _.each(['b', ['b']], function(path) {
        strictEqual(propOf(path), 2);
      });
    });

    test('should pluck a key over a path', 2, function() {
      var object = { 'a.b.c': 3, 'a': { 'b': { 'c': 4 } } },
          propOf = _.propertyOf(object);

      _.each(['a.b.c', ['a.b.c']], function(path) {
        strictEqual(propOf(path), 3);
      });
    });

    test('should return `undefined` when `object` is nullish', 2, function() {
      var values = [, null, undefined],
          expected = _.map(values, _.constant(undefined));

      _.each(['constructor', ['constructor']], function(path) {
        var actual = _.map(values, function(value, index) {
          var propOf = index ? _.propertyOf(value) : _.propertyOf();
          return propOf(path);
        });

        deepEqual(actual, expected);
      });
    });

    test('should return `undefined` with deep paths when `object` is nullish', 2, function() {
      var values = [, null, undefined],
          expected = _.map(values, _.constant(undefined));

      _.each(['constructor.prototype.valueOf', ['constructor', 'prototype', 'valueOf']], function(path) {
        var actual = _.map(values, function(value, index) {
          var propOf = index ? _.propertyOf(value) : _.propertyOf();
          return propOf(path);
        });

        deepEqual(actual, expected);
      });
    });

    test('should return `undefined` if parts of `path` are missing', 4, function() {
      var propOf = _.propertyOf({});

      _.each(['a', 'a[1].b.c', ['a'], ['a', '1', 'b', 'c']], function(path) {
        strictEqual(propOf(path), undefined);
      });
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

    test('should flatten `indexes`', 4, function() {
      var array = ['a', 'b', 'c'];
      deepEqual(_.pullAt(array, 2, 0), ['c', 'a']);
      deepEqual(array, ['b']);

      array = ['a', 'b', 'c', 'd'];
      deepEqual(_.pullAt(array, [3, 0], 2), ['d', 'a', 'c']);
      deepEqual(array, ['b']);
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

    test('should work with non-index paths', 2, function() {
      var values = _.reject(empties, function(value) {
        return value === 0 || _.isArray(value);
      }).concat(-1, 1.1);

      var array = _.transform(values, function(result, value) {
        result[value] = 1;
      }, []);

      var expected = _.map(values, _.constant(1)),
          actual = _.pullAt(array, values);

      deepEqual(actual, expected);

      expected = _.map(values, _.constant(undefined)),
      actual = _.at(array, values);

      deepEqual(actual, expected);
    });

    test('should work with deep paths', 2, function() {
      var array = [];
      array.a = { 'b': { 'c': 3 } };

      var actual = _.pullAt(array, 'a.b.c');

      deepEqual(actual, [3]);
      deepEqual(array.a, { 'b': {} });
    });

    test('should work with a falsey `array` argument when keys are provided', 1, function() {
      var values = falsey.slice(),
          expected = _.map(values, _.constant(Array(4)));

      var actual = _.map(values, function(array) {
        try {
          return _.pullAt(array, 0, 1, 'pop', 'push');
        } catch (e) {}
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

    test('should support a `min` and `max` argument', 1, function() {
      var min = 5,
          max = 10;

      ok(_.some(array, function() {
        var result = _.random(min, max);
        return result >= min && result <= max;
      }));
    });

    test('should support not providing a `max` argument', 1, function() {
      var min = 0,
          max = 5;

      ok(_.some(array, function() {
        var result = _.random(max);
        return result >= min && result <= max;
      }));
    });

    test('should support large integer values', 2, function() {
      var min = Math.pow(2, 31),
          max = Math.pow(2, 62);

      ok(_.every(array, function() {
        var result = _.random(min, max);
        return result >= min && result <= max;
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

    test('should support providing a `floating` argument', 3, function() {
      var actual = _.random(true);
      ok(actual % 1 && actual >= 0 && actual <= 1);

      actual = _.random(2, true);
      ok(actual % 1 && actual >= 0 && actual <= 2);

      actual = _.random(2, 4, true);
      ok(actual % 1 && actual >= 2 && actual <= 4);
    });

    test('should work as an iteratee for methods like `_.map`', 1, function() {
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
    test('should work with an `end` argument', 1, function() {
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

    test('should work as an iteratee for methods like `_.map`', 2, function() {
      var array = [1, 2, 3],
          object = { 'a': 1, 'b': 2, 'c': 3 },
          expected = [[0], [0, 1], [0, 1, 2]];

      _.each([array, object], function(collection) {
        var actual = _.map(collection, _.range);
        deepEqual(actual, expected);
      });
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
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('reduce methods');

  _.each(['reduce', 'reduceRight'], function(methodName) {
    var func = _[methodName],
        array = [1, 2, 3],
        isReduce = methodName == 'reduce';

    test('`_.' + methodName + '` should reduce a collection to a single value', 1, function() {
      var actual = func(['a', 'b', 'c'], function(accumulator, value) {
        return accumulator + value;
      }, '');

      strictEqual(actual, isReduce ? 'abc' : 'cba');
    });

    test('`_.' + methodName + '` should support empty collections without an initial `accumulator` value', 1, function() {
      var actual = [],
          expected = _.map(empties, _.constant());

      _.each(empties, function(value) {
        try {
          actual.push(func(value, _.noop));
        } catch (e) {}
      });

      deepEqual(actual, expected);
    });

    test('`_.' + methodName + '` should support empty collections with an initial `accumulator` value', 1, function() {
      var expected = _.map(empties, _.constant('x'));

      var actual = _.map(empties, function(value) {
        try {
          return func(value, _.noop, 'x');
        } catch (e) {}
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

    test('`_.' + methodName + '` should return an unwrapped value when implicityly chaining', 1, function() {
      if (!isNpm) {
        strictEqual(_(array)[methodName](add), 6);
      }
      else {
        skipTest();
      }
    });

    test('`_.' + methodName + '` should return a wrapped value when explicitly chaining', 1, function() {
      if (!isNpm) {
        ok(_(array).chain()[methodName](add) instanceof _);
      }
      else {
        skipTest();
      }
    });
  });

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.reject');

  (function() {
    var array = [1, 2, 3];

    test('should return elements the `predicate` returns falsey for', 1, function() {
      deepEqual(_.reject(array, isEven), [1, 3]);
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('filter methods');

  _.each(['filter', 'reject'], function(methodName) {
    var array = [1, 2, 3, 4],
        func = _[methodName],
        isFilter = methodName == 'filter',
        objects = [{ 'a': 0 }, { 'a': 1 }];

    test('`_.' + methodName + '` should not modify the resulting value from within `predicate`', 1, function() {
      var actual = func([0], function(num, index, array) {
        array[index] = 1;
        return isFilter;
      });

      deepEqual(actual, [0]);
    });

    test('`_.' + methodName + '` should work with a "_.property" style `predicate`', 1, function() {
      deepEqual(func(objects, 'a'), [objects[isFilter ? 1 : 0]]);
    });

    test('`_.' + methodName + '` should work with a "_.matches" style `predicate`', 1, function() {
      deepEqual(func(objects, objects[1]), [objects[isFilter ? 1 : 0]]);
    });

    test('`_.' + methodName + '` should not modify wrapped values', 2, function() {
      if (!isNpm) {
        var wrapped = _(array);

        var actual = wrapped[methodName](function(num) {
          return num < 3;
        });

        deepEqual(actual.value(), isFilter ? [1, 2] : [3, 4]);

        actual = wrapped[methodName](function(num) {
          return num > 2;
        });

        deepEqual(actual.value(), isFilter ? [3, 4] : [1, 2]);
      }
      else {
        skipTest(2);
      }
    });

    test('`_.' + methodName + '` should work in a lazy chain sequence', 2, function() {
      if (!isNpm) {
        var array = _.range(LARGE_ARRAY_SIZE + 1),
            predicate = function(value) { return isFilter ? isEven(value) : !isEven(value); },
            actual = _(array).slice(1).map(square)[methodName](predicate).value();

        deepEqual(actual, _[methodName](_.map(array.slice(1), square), predicate));

        var object = _.zipObject(_.times(LARGE_ARRAY_SIZE, function(index) {
          return ['key' + index, index];
        }));

        actual = _(object).mapValues(square)[methodName](predicate).value();
        deepEqual(actual, _[methodName](_.mapValues(object, square), predicate));
      }
      else {
        skipTest(2);
      }
    });

    test('`_.' + methodName + '` should provide the correct `predicate` arguments in a lazy chain sequence', 5, function() {
      if (!isNpm) {
        var args,
            array = _.range(LARGE_ARRAY_SIZE + 1),
            expected = [1, 0, _.map(array.slice(1), square)];

        _(array).slice(1)[methodName](function(value, index, array) {
          args || (args = slice.call(arguments));
        }).value();

        deepEqual(args, [1, 0, array.slice(1)]);

        args = null;
        _(array).slice(1).map(square)[methodName](function(value, index, array) {
          args || (args = slice.call(arguments));
        }).value();

        deepEqual(args, expected);

        args = null;
        _(array).slice(1).map(square)[methodName](function(value, index) {
          args || (args = slice.call(arguments));
        }).value();

        deepEqual(args, expected);

        args = null;
        _(array).slice(1).map(square)[methodName](function(value) {
          args || (args = slice.call(arguments));
        }).value();

        deepEqual(args, [1]);

        args = null;
        _(array).slice(1).map(square)[methodName](function() {
          args || (args = slice.call(arguments));
        }).value();

        deepEqual(args, expected);
      }
      else {
        skipTest(5);
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
      var argsList = [],
          array = [1, 2, 3],
          clone = array.slice();

      _.remove(array, function(value, index) {
        var args = slice.call(arguments);
        args[2] = args[2].slice();
        argsList.push(args);
        return isEven(index);
      });

      deepEqual(argsList, [[1, 0, clone], [2, 1, clone], [3, 2, clone]]);
    });

    test('should work with a "_.matches" style `predicate`', 1, function() {
      var objects = [{ 'a': 0, 'b': 1 }, { 'a': 1, 'b': 2 }];
      _.remove(objects, { 'a': 1 });
      deepEqual(objects, [{ 'a': 0, 'b': 1 }]);
    });

    test('should work with a "_.matchesProperty" style `predicate`', 1, function() {
      var objects = [{ 'a': 0, 'b': 1 }, { 'a': 1, 'b': 2 }];
      _.remove(objects, ['a', 1]);
      deepEqual(objects, [{ 'a': 0, 'b': 1 }]);
    });

    test('should work with a "_.property" style `predicate`', 1, function() {
      var objects = [{ 'a': 0 }, { 'a': 1 }];
      _.remove(objects, 'a');
      deepEqual(objects, [{ 'a': 0 }]);
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

    test('should not mutate the array until all elements to remove are determined', 1, function() {
      var array = [1, 2, 3];
      _.remove(array, function(num, index) { return isEven(index); });
      deepEqual(array, [2]);
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
      'b': function() { return this.a; }
    };

    test('should invoke function values', 1, function() {
      strictEqual(_.result(object, 'b'), 1);
    });

    test('should invoke default function values', 1, function() {
      var actual = _.result(object, 'c', object.b);
      strictEqual(actual, 1);
    });

    test('should invoke deep property methods with the correct `this` binding', 2, function() {
      var value = { 'a': object };

      _.each(['a.b', ['a', 'b']], function(path) {
        strictEqual(_.result(value, path), 1);
      });
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.get and lodash.result');

  _.each(['get', 'result'], function(methodName) {
    var func = _[methodName];

    test('`_.' + methodName + '` should get property values', 2, function() {
      var object = { 'a': 1 };

      _.each(['a', ['a']], function(path) {
        strictEqual(func(object, path), 1);
      });
    });

    test('`_.' + methodName + '` should get deep property values', 2, function() {
      var object = { 'a': { 'b': { 'c': 3 } } };

      _.each(['a.b.c', ['a', 'b', 'c']], function(path) {
        strictEqual(func(object, path), 3);
      });
    });

    test('`_.' + methodName + '` should get a key over a path', 2, function() {
      var object = { 'a.b.c': 3, 'a': { 'b': { 'c': 4 } } };

      _.each(['a.b.c', ['a.b.c']], function(path) {
        strictEqual(func(object, path), 3);
      });
    });

    test('`_.' + methodName + '` should not coerce array paths to strings', 1, function() {
      var object = { 'a,b,c': 3, 'a': { 'b': { 'c': 4 } } };
      strictEqual(func(object, ['a', 'b', 'c']), 4);
    });

    test('`_.' + methodName + '` should ignore empty brackets', 1, function() {
      var object = { 'a': 1 };
      strictEqual(func(object, 'a[]'), 1);
    });

    test('`_.' + methodName + '` should handle empty paths', 4, function() {
      _.each([['', ''], [[], ['']]], function(pair) {
        strictEqual(func({}, pair[0]), undefined);
        strictEqual(func({ '': 3 }, pair[1]), 3);
      });
    });

    test('`_.' + methodName + '` should handle complex paths', 2, function() {
      var object = { 'a': { '-1.23': { '["b"]': { 'c': { "['d']": { '\ne\n': { 'f': { 'g': 8 } } } } } } } };

      var paths = [
        'a[-1.23]["[\\"b\\"]"].c[\'[\\\'d\\\']\'][\ne\n][f].g',
        ['a', '-1.23', '["b"]', 'c', "['d']", '\ne\n', 'f', 'g']
      ];

      _.each(paths, function(path) {
        strictEqual(func(object, path), 8);
      });
    });

    test('`_.' + methodName + '` should return `undefined` when `object` is nullish', 4, function() {
      _.each(['constructor', ['constructor']], function(path) {
        strictEqual(func(null, path), undefined);
        strictEqual(func(undefined, path), undefined);
      });
    });

    test('`_.' + methodName + '` should return `undefined` with deep paths when `object` is nullish', 2, function() {
      var values = [null, undefined],
          expected = _.map(values, _.constant(undefined)),
          paths = ['constructor.prototype.valueOf', ['constructor', 'prototype', 'valueOf']];

      _.each(paths, function(path) {
        var actual = _.map(values, function(value) {
          return func(value, path);
        });

        deepEqual(actual, expected);
      });
    });

    test('`_.' + methodName + '` should return `undefined` if parts of `path` are missing', 2, function() {
      var object = { 'a': [, null] };

      _.each(['a[1].b.c', ['a', '1', 'b', 'c']], function(path) {
        strictEqual(func(object, path), undefined);
      });
    });

    test('`_.' + methodName + '` should be able to return `null` values', 2, function() {
      var object = { 'a': { 'b': null } };

      _.each(['a.b', ['a', 'b']], function(path) {
        strictEqual(func(object, path), null);
      });
    });

    test('`_.' + methodName + '` should follow `path` over non-plain objects', 4, function() {
      var object = { 'a': '' },
          paths = ['constructor.prototype.a', ['constructor', 'prototype', 'a']];

      _.each(paths, function(path) {
        numberProto.a = 1;

        var actual = func(0, path);
        strictEqual(actual, 1);

        delete numberProto.a;
      });

      _.each(['a.replace.b', ['a', 'replace', 'b']], function(path) {
        stringProto.replace.b = 1;

        var actual = func(object, path);
        strictEqual(actual, 1);

        delete stringProto.replace.b;
      });
    });

    test('`_.' + methodName + '` should return the specified default value for `undefined` values', 1, function() {
      var object = { 'a': {} },
          values = empties.concat(true, new Date, 1, /x/, 'a');

      var expected = _.transform(values, function(result, value) {
        result.push(value, value, value, value);
      });

      var actual = _.transform(values, function(result, value) {
        _.each(['a.b.c', ['a', 'b', 'c']], function(path) {
          result.push(
            func(object, path, value),
            func(null, path, value)
          );
        });
      });

      deepEqual(actual, expected);
    });
  });

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.rest');

  (function() {
    var array = [1, 2, 3];

    test('should accept a falsey `array` argument', 1, function() {
      var expected = _.map(falsey, _.constant([]));

      var actual = _.map(falsey, function(array, index) {
        try {
          return index ? _.rest(array) : _.rest();
        } catch (e) {}
      });

      deepEqual(actual, expected);
    });

    test('should exclude the first element', 1, function() {
      deepEqual(_.rest(array), [2, 3]);
    });

    test('should return an empty when querying empty arrays', 1, function() {
      deepEqual(_.rest([]), []);
    });

    test('should work as an iteratee for methods like `_.map`', 1, function() {
      var array = [[1, 2, 3], [4, 5, 6], [7, 8, 9]],
          actual = _.map(array, _.rest);

      deepEqual(actual, [[2, 3], [5, 6], [8, 9]]);
    });

    test('should work in a lazy chain sequence', 4, function() {
      if (!isNpm) {
        var array = _.range(LARGE_ARRAY_SIZE),
            values = [];

        var actual = _(array).rest().filter(function(value) {
          values.push(value);
          return false;
        })
        .value();

        deepEqual(actual, []);
        deepEqual(values, array.slice(1));

        values = [];

        actual = _(array).filter(function(value) {
          values.push(value);
          return isEven(value);
        })
        .rest()
        .value();

        deepEqual(actual, _.rest(_.filter(array, isEven)));
        deepEqual(values, array);
      }
      else {
        skipTest(4);
      }
    });

    test('should not execute subsequent iteratees on an empty array in a lazy chain sequence', 4, function() {
      if (!isNpm) {
        var array = _.range(LARGE_ARRAY_SIZE),
            iteratee = function() { pass = false; },
            pass = true,
            actual = _(array).slice(0, 1).rest().map(iteratee).value();

        ok(pass);
        deepEqual(actual, []);

        pass = true;
        actual = _(array).filter().slice(0, 1).rest().map(iteratee).value();

        ok(pass);
        deepEqual(actual, []);
      }
      else {
        skipTest(4);
      }
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.restParam');

  (function() {
    function fn(a, b, c) {
      return slice.call(arguments);
    }

    test('should apply a rest parameter to `func`', 1, function() {
      var rp = _.restParam(fn);
      deepEqual(rp(1, 2, 3, 4), [1, 2, [3, 4]]);
    });

    test('should work with `start`', 1, function() {
      var rp = _.restParam(fn, 1);
      deepEqual(rp(1, 2, 3, 4), [1, [2, 3, 4]]);
    });

    test('should treat `start` as `0` for negative or `NaN` values', 1, function() {
      var values = [-1, NaN, 'x'],
          expected = _.map(values, _.constant([[1, 2, 3, 4]]));

      var actual = _.map(values, function(value) {
        var rp = _.restParam(fn, value);
        return rp(1, 2, 3, 4);
      });

      deepEqual(actual, expected);
    });

    test('should coerce `start` to an integer', 1, function() {
      var rp = _.restParam(fn, 1.6);
      deepEqual(rp(1, 2, 3), [1, [2, 3]]);
    });

    test('should use an empty array when `start` is not reached', 1, function() {
      var rp = _.restParam(fn);
      deepEqual(rp(1), [1, undefined, []]);
    });

    test('should work on functions with more than three params', 1, function() {
      var rp = _.restParam(function(a, b, c, d) {
        return slice.call(arguments);
      });

      deepEqual(rp(1, 2, 3, 4, 5), [1, 2, 3, [4, 5]]);
    });

    test('should not set a `this` binding', 1, function() {
      var rp = _.restParam(function(x, y) {
        return this[x] + this[y[0]];
      });

      var object = { 'rp': rp, 'x': 4, 'y': 2 };
      strictEqual(object.rp('x', 'y'), 6);
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('round methods');

  _.each(['ceil', 'floor', 'round'], function(methodName) {
    var func = _[methodName],
        isCeil = methodName == 'ceil',
        isFloor = methodName == 'floor';

    test('`_.' + methodName + '` should return a rounded number without a precision', 1, function() {
      var actual = func(4.006);
      strictEqual(actual, isCeil ? 5 : 4);
    });

    test('`_.' + methodName + '` should return a rounded number with a precision of `0`', 1, function() {
      var actual = func(4.006, 0);
      strictEqual(actual, isCeil ? 5 : 4);
    });

    test('`_.' + methodName + '` should coerce `precision` to an integer', 3, function() {
      var actual = func(4.006, NaN);
      strictEqual(actual, isCeil ? 5 : 4);

      var expected = isFloor ? 4.01 : 4.02;

      actual = func(4.016, 2.6);
      strictEqual(actual, expected);

      actual = func(4.016, '+2');
      strictEqual(actual, expected);
    });

    test('`_.' + methodName + '` should return a rounded number with a positive precision', 1, function() {
      var actual = func(4.016, 2);
      strictEqual(actual, isFloor ? 4.01 : 4.02);
    });

    test('`_.' + methodName + '` should return a rounded number with a negative precision', 1, function() {
      var actual = func(4160, -2);
      strictEqual(actual, isFloor ? 4100 : 4200);
    });
  });

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

    test('should use a zeroed `_.uniqueId` counter', 3, function() {
      if (!isModularize) {
        _.times(2, _.uniqueId);

        var oldId = Number(_.uniqueId()),
            lodash = _.runInContext();

        ok(_.uniqueId() > oldId);

        var id = lodash.uniqueId();
        strictEqual(id, '1');
        ok(id < oldId);
      }
      else {
        skipTest(3);
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

    test('should coerce `n` to an integer', 1, function() {
      var actual = _.sample(array, 1.6);
      strictEqual(actual.length, 1);
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
        } catch (e) {}
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

    test('should work as an iteratee for methods like `_.map`', 2, function() {
      var array1 = [[1, 2, 3], [4, 5, 6], [7, 8, 9]],
          array2 = ['abc', 'def', 'ghi'];

      _.each([array1, array2], function(values) {
        var a = values[0],
            b = values[1],
            c = values[2],
            actual = _.map(values, _.sample);

        ok(_.includes(a, actual[0]) && _.includes(b, actual[1]) && _.includes(c, actual[2]));
      });
    });

    test('should return a wrapped value when chaining and `n` is provided', 2, function() {
      if (!isNpm) {
        var wrapped = _(array).sample(2),
            actual = wrapped.value();

        ok(wrapped instanceof _);
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

    test('should return a wrapped value when explicitly chaining', 1, function() {
      if (!isNpm) {
        ok(_(array).chain().sample() instanceof _);
      }
      else {
        skipTest();
      }
    });

    test('should use a stored reference to `_.sample` when chaining', 2, function() {
      if (!isNpm) {
        var sample = _.sample;
        _.sample = _.noop;

        var wrapped = _(array);
        notStrictEqual(wrapped.sample(), undefined);
        notStrictEqual(wrapped.sample(2).value(), undefined);
        _.sample = sample;
      }
      else {
        skipTest(2);
      }
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.setWith');

  (function() {
    test('should work with a `customizer` callback', 1, function() {
      var actual = _.setWith({ '0': { 'length': 2 } }, '[0][1][2]', 3, function(value) {
        if (!_.isObject(value)) {
          return {};
        }
      });

      deepEqual(actual, { '0': { '1': { '2': 3 }, 'length': 2 } });
    });

    test('should work with a `customizer` that returns `undefined`', 1, function() {
      var actual = _.setWith({}, 'a[0].b.c', 4, _.constant(undefined));
      deepEqual(actual, { 'a': [{ 'b': { 'c': 4 } }] });
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('set methods');

  _.each(['set', 'setWith'], function(methodName) {
    var func = _[methodName];

    test('`_.' + methodName + '` should set property values', 4, function() {
      var object = { 'a': 1 };

      _.each(['a', ['a']], function(path) {
        var actual = func(object, path, 2);

        strictEqual(actual, object);
        strictEqual(object.a, 2);

        object.a = 1;
      });
    });

    test('`_.' + methodName + '` should set deep property values', 4, function() {
      var object = { 'a': { 'b': { 'c': 3 } } };

      _.each(['a.b.c', ['a', 'b', 'c']], function(path) {
        var actual = func(object, path, 4);

        strictEqual(actual, object);
        strictEqual(object.a.b.c, 4);

        object.a.b.c = 3;
      });
    });

    test('`_.' + methodName + '` should set a key over a path', 4, function() {
      var object = { 'a.b.c': 3 };

      _.each(['a.b.c', ['a.b.c']], function(path) {
        var actual = func(object, path, 4);

        strictEqual(actual, object);
        deepEqual(object, { 'a.b.c': 4 });

        object['a.b.c'] = 3;
      });
    });

    test('`_.' + methodName + '` should not coerce array paths to strings', 1, function() {
      var object = { 'a,b,c': 3, 'a': { 'b': { 'c': 3 } } };
      func(object, ['a', 'b', 'c'], 4);
      strictEqual(object.a.b.c, 4);
    });

    test('`_.' + methodName + '` should ignore empty brackets', 1, function() {
      var object = {};
      func(object, 'a[]', 1);
      deepEqual(object, { 'a': 1 });
    });

    test('`_.' + methodName + '` should handle empty paths', 4, function() {
      _.each([['', ''], [[], ['']]], function(pair, index) {
        var object = {};

        func(object, pair[0], 1);
        deepEqual(object, index ? {} : { '': 1 });

        func(object, pair[1], 2);
        deepEqual(object, { '': 2 });
      });
    });

    test('`_.' + methodName + '` should handle complex paths', 2, function() {
      var object = { 'a': { '1.23': { '["b"]': { 'c': { "['d']": { '\ne\n': { 'f': { 'g': 8 } } } } } } } };

      var paths = [
        'a[-1.23]["[\\"b\\"]"].c[\'[\\\'d\\\']\'][\ne\n][f].g',
        ['a', '-1.23', '["b"]', 'c', "['d']", '\ne\n', 'f', 'g']
      ];

      _.each(paths, function(path) {
        func(object, path, 10);
        strictEqual(object.a[-1.23]['["b"]'].c["['d']"]['\ne\n'].f.g, 10);
        object.a[-1.23]['["b"]'].c["['d']"]['\ne\n'].f.g = 8;
      });
    });

    test('`_.' + methodName + '` should create parts of `path` that are missing', 6, function() {
      var object = {};

      _.each(['a[1].b.c', ['a', '1', 'b', 'c']], function(path) {
        var actual = func(object, path, 4);

        strictEqual(actual, object);
        deepEqual(actual, { 'a': [undefined, { 'b': { 'c': 4 } }] });
        ok(!(0 in object.a));

        delete object.a;
      });
    });

    test('`_.' + methodName + '` should not error when `object` is nullish', 1, function() {
      var values = [null, undefined],
          expected = [[null, null], [undefined, undefined]];

      var actual = _.map(values, function(value) {
        try {
          return [func(value, 'a.b', 1), func(value, ['a', 'b'], 1)];
        } catch (e) {
          return e.message;
        }
      });

      deepEqual(actual, expected);
    });

    test('`_.' + methodName + '` should follow `path` over non-plain objects', 4, function() {
      var object = { 'a': '' },
          paths = ['constructor.prototype.a', ['constructor', 'prototype', 'a']];

      _.each(paths, function(path) {
        func(0, path, 1);
        strictEqual(0..a, 1);
        delete numberProto.a;
      });

      _.each(['a.replace.b', ['a', 'replace', 'b']], function(path) {
        func(object, path, 1);
        strictEqual(stringProto.replace.b, 1);
        delete stringProto.replace.b;
      });
    });

    test('`_.' + methodName + '` should not error on paths over primitives in strict mode', 2, function() {
      numberProto.a = 0;

      _.each(['a', 'a.a.a'], function(path) {
        try {
          func(0, path, 1);
          strictEqual(0..a, 0);
        } catch (e) {
          ok(false, e.message);
        }
        numberProto.a = 0;
      });

      delete numberProto.a;
    });

    test('`_.' + methodName + '` should not create an array for missing non-index property names that start with numbers', 1, function() {
      var object = {};

      func(object, ['1a', '2b', '3c'], 1);
      deepEqual(object, { '1a': { '2b': { '3c': 1 } } });
    });

    test('`_.' + methodName + '` should not assign values that are the same as their destinations', 4, function() {
      _.each(['a', ['a'], { 'a': 1 }, NaN], function(value) {
        if (defineProperty) {
          var object = {},
              pass = true;

          defineProperty(object, 'a', {
            'get': _.constant(value),
            'set': function() { pass = false; }
          });

          func(object, 'a', value);
          ok(pass, value);
        }
        else {
          skipTest();
        }
      });
    });
  });

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

      deepEqual(_.sortBy(_.uniqBy(actual, String), '0'), [[1, 2], [2, 1]]);
    });

    test('should treat number values for `collection` as empty', 1, function() {
      deepEqual(_.shuffle(1), []);
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

      var actual = _.map(falsey, function(object, index) {
        try {
          return index ? _.size(object) : _.size();
        } catch (e) {}
      });

      deepEqual(actual, expected);
    });

    test('should work with `arguments` objects', 1, function() {
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
  }(1, 2, 3));

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.slice');

  (function() {
    var array = [1, 2, 3];

    test('should use a default `start` of `0` and a default `end` of `array.length`', 2, function() {
      var actual = _.slice(array);
      deepEqual(actual, array);
      notStrictEqual(actual, array);
    });

    test('should work with a positive `start`', 2, function() {
      deepEqual(_.slice(array, 1), [2, 3]);
      deepEqual(_.slice(array, 1, 3), [2, 3]);
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

    test('should coerce `start` and `end` to integers', 1, function() {
      var positions = [[0.1, 1.6], ['0', 1], [0, '1'], ['1'], [NaN, 1], [1, NaN]];

      var actual = _.map(positions, function(pos) {
        return _.slice.apply(_, [array].concat(pos));
      });

      deepEqual(actual, [[1], [1], [1], [2, 3], [1], []]);
    });

    test('should work as an iteratee for methods like `_.map`', 2, function() {
      var array = [[1], [2, 3]],
          actual = _.map(array, _.slice);

      deepEqual(actual, array);
      notStrictEqual(actual, array);
    });

    test('should work in a lazy chain sequence', 38, function() {
      if (!isNpm) {
        var array = _.range(1, LARGE_ARRAY_SIZE + 1),
            length = array.length,
            wrapped = _(array);

        _.each(['map', 'filter'], function(methodName) {
          deepEqual(wrapped[methodName]().slice(0, -1).value(), array.slice(0, -1));
          deepEqual(wrapped[methodName]().slice(1).value(), array.slice(1));
          deepEqual(wrapped[methodName]().slice(1, 3).value(), array.slice(1, 3));
          deepEqual(wrapped[methodName]().slice(-1).value(), array.slice(-1));

          deepEqual(wrapped[methodName]().slice(length).value(), array.slice(length));
          deepEqual(wrapped[methodName]().slice(3, 2).value(), array.slice(3, 2));
          deepEqual(wrapped[methodName]().slice(0, -length).value(), array.slice(0, -length));
          deepEqual(wrapped[methodName]().slice(0, null).value(), array.slice(0, null));

          deepEqual(wrapped[methodName]().slice(0, length).value(), array.slice(0, length));
          deepEqual(wrapped[methodName]().slice(-length).value(), array.slice(-length));
          deepEqual(wrapped[methodName]().slice(null).value(), array.slice(null));

          deepEqual(wrapped[methodName]().slice(0, 1).value(), array.slice(0, 1));
          deepEqual(wrapped[methodName]().slice(NaN, '1').value(), array.slice(NaN, '1'));

          deepEqual(wrapped[methodName]().slice(0.1, 1.1).value(), array.slice(0.1, 1.1));
          deepEqual(wrapped[methodName]().slice('0', 1).value(), array.slice('0', 1));
          deepEqual(wrapped[methodName]().slice(0, '1').value(), array.slice(0, '1'));
          deepEqual(wrapped[methodName]().slice('1').value(), array.slice('1'));
          deepEqual(wrapped[methodName]().slice(NaN, 1).value(), array.slice(NaN, 1));
          deepEqual(wrapped[methodName]().slice(1, NaN).value(), array.slice(1, NaN));
        });
      }
      else {
        skipTest(38);
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
        } catch (e) {}
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

    test('should work with a "_.property" style `predicate`', 2, function() {
      var objects = [{ 'a': 0, 'b': 0 }, { 'a': 0, 'b': 1 }];
      strictEqual(_.some(objects, 'a'), false);
      strictEqual(_.some(objects, 'b'), true);
    });

    test('should work with a "_.matches" style `predicate`', 2, function() {
      var objects = [{ 'a': 0, 'b': 0 }, { 'a': 1, 'b': 1}];
      strictEqual(_.some(objects, { 'a': 0 }), true);
      strictEqual(_.some(objects, { 'b': 2 }), false);
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

    test('should work as an iteratee for methods like `_.map`', 1, function() {
      var actual = _.map([[1]], _.some);
      deepEqual(actual, [true]);
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
      var actual = _.map(_.sortBy(objects, function(object) {
        return object.b;
      }), 'b');

      deepEqual(actual, [1, 2, 3, 4]);
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

    test('should work with a "_.property" style `iteratee`', 1, function() {
      var actual = _.map(_.sortBy(objects.concat(undefined), 'b'), 'b');
      deepEqual(actual, [1, 2, 3, 4, undefined]);
    });

    test('should work with an object for `collection`', 1, function() {
      var actual = _.sortBy({ 'a': 1, 'b': 2, 'c': 3 }, function(num) {
        return Math.sin(num);
      });

      deepEqual(actual, [3, 1, 2]);
    });

    test('should move `null`, `undefined`, and `NaN` values to the end', 2, function() {
      var array = [NaN, undefined, null, 4, null, 1, undefined, 3, NaN, 2];
      deepEqual(_.sortBy(array), [1, 2, 3, 4, null, null, undefined, undefined, NaN, NaN]);

      array = [NaN, undefined, null, 'd', null, 'a', undefined, 'c', NaN, 'b'];
      deepEqual(_.sortBy(array), ['a', 'b', 'c', 'd', null, null, undefined, undefined, NaN, NaN]);
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

    test('should work as an iteratee for methods like `_.map`', 1, function() {
      var actual = _.map([[2, 1, 3], [3, 2, 1]], _.sortBy);
      deepEqual(actual, [[1, 2, 3], [1, 2, 3]]);
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.sortByOrder');

  (function() {
    var objects = [
      { 'a': 'x', 'b': 3 },
      { 'a': 'y', 'b': 4 },
      { 'a': 'x', 'b': 1 },
      { 'a': 'y', 'b': 2 }
    ];

    test('should sort multiple properties by specified orders', 1, function() {
      var actual = _.sortByOrder(objects, ['a', 'b'], ['desc', 'asc']);
      deepEqual(actual, [objects[3], objects[1], objects[2], objects[0]]);
    });

    test('should sort a property in ascending order when its order is not specified', 1, function() {
      var actual = _.sortByOrder(objects, ['a', 'b'], ['desc']);
      deepEqual(actual, [objects[3], objects[1], objects[2], objects[0]]);
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('sortBy methods');

  _.each(['sortBy', 'sortByOrder'], function(methodName) {
    var func = _[methodName];

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

    var stableArray = [
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

    var stableObject = _.zipObject('abcdefghijklmnopqrst'.split(''), stableArray);

    test('`_.' + methodName + '` should sort mutliple properties in ascending order', 1, function() {
      var actual = func(objects, ['a', 'b']);
      deepEqual(actual, [objects[2], objects[0], objects[3], objects[1]]);
    });

    test('`_.' + methodName + '` should support iteratees', 1, function() {
      var actual = func(objects, ['a', function(object) { return object.b; }]);
      deepEqual(actual, [objects[2], objects[0], objects[3], objects[1]]);
    });

    test('`_.' + methodName + '` should perform a stable sort (test in IE > 8, Opera, and V8)', 2, function() {
      _.each([stableArray, stableObject], function(value, index) {
        var actual = func(value, ['a', 'c']);
        deepEqual(actual, stableArray, index ? 'object' : 'array');
      });
    });

    test('`_.' + methodName + '` should not error on nullish elements', 1, function() {
      try {
        var actual = func(objects.concat(null, undefined), ['a', 'b']);
      } catch (e) {}

      deepEqual(actual, [objects[2], objects[0], objects[3], objects[1], null, undefined]);
    });

    test('`_.' + methodName + '` should work as an iteratee for methods like `_.reduce`', 3, function() {
      var objects = [
        { 'a': 'x', '0': 3 },
        { 'a': 'y', '0': 4 },
        { 'a': 'x', '0': 1 },
        { 'a': 'y', '0': 2 }
      ];

      var funcs = [func, _.partialRight(func, 'bogus')];

      _.each(['a', 0, [0]], function(props, index) {
        var expected = _.map(funcs, _.constant(index
          ? [objects[2], objects[3], objects[0], objects[1]]
          : [objects[0], objects[2], objects[1], objects[3]]
        ));

        var actual = _.map(funcs, function(func) {
          return _.reduce([props], func, objects);
        });

        deepEqual(actual, expected);
      });
    });
  });

  /*--------------------------------------------------------------------------*/

  QUnit.module('sortedIndex methods');

  _.each(['sortedIndex', 'sortedLastIndex'], function(methodName) {
    var func = _[methodName],
        isSortedIndex = methodName == 'sortedIndex';

    test('`_.' + methodName + '` should return the insert index', 1, function() {
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

    test('`_.' + methodName + '` should align with `_.sortBy`', 10, function() {
      var expected = [1, '2', {}, null, undefined, NaN, NaN];

      _.each([
        [NaN, null, 1, '2', {}, NaN, undefined],
        ['2', null, 1, NaN, {}, NaN, undefined]
      ], function(array) {
        deepEqual(_.sortBy(array), expected);
        strictEqual(func(expected, 3), 2);
        strictEqual(func(expected, null), isSortedIndex ? 3 : 4);
        strictEqual(func(expected, undefined), isSortedIndex ? 4 : 5);
        strictEqual(func(expected, NaN), isSortedIndex ? 5 : 7);
      });
    });
  });

  /*--------------------------------------------------------------------------*/

  QUnit.module('sortedIndexBy methods');

  _.each(['sortedIndexBy', 'sortedLastIndexBy'], function(methodName) {
    var func = _[methodName],
        isSortedIndexBy = methodName == 'sortedIndexBy';

    test('`_.' + methodName + '` should provide the correct `iteratee` arguments', 1, function() {
      var args;

      func([30, 50], 40, function() {
        args || (args = slice.call(arguments));
      });

      deepEqual(args, [40]);
    });

    test('`_.' + methodName + '` should work with a "_.property" style `iteratee`', 1, function() {
      var objects = [{ 'x': 30 }, { 'x': 50 }],
          actual = func(objects, { 'x': 40 }, 'x');

      strictEqual(actual, 1);
    });

    test('`_.' + methodName + '` should support arrays larger than `MAX_ARRAY_LENGTH / 2`', 12, function() {
      _.each([Math.ceil(MAX_ARRAY_LENGTH / 2), MAX_ARRAY_LENGTH], function(length) {
        var array = [],
            values = [MAX_ARRAY_LENGTH, NaN, undefined];

        array.length = length;

        _.each(values, function(value) {
          var steps = 0,
              actual = func(array, value, function(value) { steps++; return value; });

          var expected = (isSortedIndexBy ? !_.isNaN(value) : _.isFinite(value))
            ? 0
            : Math.min(length, MAX_ARRAY_INDEX);

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

  QUnit.module('sortedIndexOf methods');

  _.each(['sortedIndexOf', 'sortedLastIndexOf'], function(methodName) {
    var func = _[methodName],
        isSortedIndexOf = methodName == 'sortedIndexOf';

    test('should perform a binary search', 1, function() {
      var sorted = [4, 4, 5, 5, 6, 6];
      deepEqual(func(sorted, 5), isSortedIndexOf ? 2 : 3);
    });
  });

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.sortedUniq');

  (function() {
    test('should return unique values of a sorted array', 3, function() {
      var expected = [1, 2, 3];

      _.each([[1, 2, 3], [1, 1, 2, 2, 3], [1, 2, 3, 3, 3, 3, 3]], function(array) {
        deepEqual(_.sortedUniq(array), expected);
      });
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.spread');

  (function() {
    test('should spread arguments to `func`', 1, function() {
      var spread = _.spread(add);
      strictEqual(spread([4, 2]), 6);
    });

    test('should throw a TypeError when receiving a non-array `array` argument', 1, function() {
      raises(function() { _.spread(4, 2); }, TypeError);
    });

    test('should provide the correct `func` arguments', 1, function() {
      var args;

      var spread = _.spread(function() {
        args = slice.call(arguments);
      });

      spread([4, 2], 'ignored');
      deepEqual(args, [4, 2]);
    });

    test('should not set a `this` binding', 1, function() {
      var spread = _.spread(function(x, y) {
        return this[x] + this[y];
      });

      var object = { 'spread': spread, 'x': 4, 'y': 2 };
      strictEqual(object.spread(['x', 'y']), 6);
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

    test('should coerce `position` to an integer', 1, function() {
      strictEqual(_.startsWith(string, 'bc', 1.2), true);
    });

    test('should return `true` when `target` is an empty string regardless of `position`', 1, function() {
      ok(_.every([-Infinity, NaN, -3, -1, 0, 1, 2, 3, 5, MAX_SAFE_INTEGER, Infinity], function(position) {
        return _.startsWith(string, '', position, true);
      }));
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.startsWith and lodash.endsWith');

  _.each(['startsWith', 'endsWith'], function(methodName) {
    var func = _[methodName],
        isStartsWith = methodName == 'startsWith';

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

  QUnit.module('lodash.sum');

  (function() {
    var array = [6, 4, 2];

    test('should return the sum of an array of numbers', 1, function() {
      strictEqual(_.sum(array), 12);
    });

    test('should return `0` when passing empty `array` values', 1, function() {
      var expected = _.map(empties, _.constant(0));

      var actual = _.map(empties, function(value) {
        return _.sum(value);
      });

      deepEqual(actual, expected);
    });

    test('should coerce values to numbers and `NaN` to `0`', 1, function() {
      strictEqual(_.sum(['1', NaN, '2']), 3);
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.sumBy');

  (function() {
    var array = [6, 4, 2],
        objects = [{ 'a': 2 }, { 'a': 3 }, { 'a': 1 }];

    test('should work with an `iteratee` argument', 1, function() {
      var actual = _.sumBy(objects, function(object) {
        return object.a;
      });

      deepEqual(actual, 6);
    });

    test('should provide the correct `iteratee` arguments', 1, function() {
      var args;

      _.sumBy(array, function() {
        args || (args = slice.call(arguments));
      });

      deepEqual(args, [6]);
    });

    test('should work with a "_.property" style `iteratee`', 2, function() {
      var arrays = [[2], [3], [1]];
      strictEqual(_.sumBy(arrays, 0), 6);
      strictEqual(_.sumBy(objects, 'a'), 6);
    });
  }());

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
      } catch (e) {}

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
        '<%= {}.toString.call(0) %>': numberTag,
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
      } catch (e) {
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

    test('should work with `this` references', 2, function() {
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
      compiled = _.template('\'\n\r\t<%= a %>\u2028\u2029\\"');
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
      } catch (e) {
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

    test('should resolve nullish values to an empty string', 3, function() {
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
      var object = { 'toString': _.constant('<%= a %>') },
          data = { 'a': 1 };

      strictEqual(_.template(object)(data), '1');
    });

    test('should not modify the `options` object', 1, function() {
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
      } catch (e) {
        pass = false;
      }
      ok(pass, '`data` value');

      pass = true;

      try {
        _.template('', 1)(1);
      } catch (e) {
        pass = false;
      }
      ok(pass, '`options` value');
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
      } catch (e) {
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
      } catch (e) {
        values[1] = e.source;
      }
      var expected = _.map(values, _.constant(false));

      var actual = _.map(values, function(value) {
        return _.includes(value, 'sourceURL');
      });

      deepEqual(actual, expected);
    });

    test('should work as an iteratee for methods like `_.map`', 1, function() {
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
      strictEqual(_.trunc(string, { 'length': string.length }), string);
      strictEqual(_.trunc(string, { 'length': string.length + 2 }), string);
    });

    test('should truncate string the given length', 1, function() {
      strictEqual(_.trunc(string, { 'length': 24 }), 'hi-diddly-ho there, n...');
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

    test('should treat negative `length` as `0`', 2, function() {
      _.each([0, -2], function(length) {
        strictEqual(_.trunc(string, { 'length': length }), '...');
      });
    });

    test('should coerce `length` to an integer', 4, function() {
      _.each(['', NaN, 4.6, '4'], function(length, index) {
        var actual = index > 1 ? 'h...' : '...';
        strictEqual(_.trunc(string, { 'length': { 'valueOf': _.constant(length) } }), actual);
      });
    });

    test('should coerce `string` to a string', 2, function() {
      strictEqual(_.trunc(Object(string), { 'length': 4 }), 'h...');
      strictEqual(_.trunc({ 'toString': _.constant(string) }, { 'length': 5 }), 'hi...');
    });

    test('should work as an iteratee for methods like `_.map`', 1, function() {
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
        var callCount = 0,
            throttled = _.throttle(function() { callCount++; }, 32);

        throttled();
        throttled();
        throttled();

        var lastCount = callCount;
        ok(callCount > 0);

        setTimeout(function() {
          ok(callCount > lastCount);
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
          'Date': _.assign(function() {
            return { 'getTime': getTime };
          }, {
            'now': Date.now
          })
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
        var callCount = 0,
            throttled = _.throttle(function() { callCount++; }, 32);

        throttled();
        strictEqual(callCount, 1);

        setTimeout(function() {
          strictEqual(callCount, 1);
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
          var callCount = 0,
              limit = (argv || isPhantom) ? 1000 : 320,
              options = index ? { 'leading': false } : {};

          var throttled = _.throttle(function() {
            callCount++;
          }, 32, options);

          var start = +new Date;
          while ((new Date - start) < limit) {
            throttled();
          }
          var actual = callCount > 1;

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

    asyncTest('should apply default options', 3, function() {
      if (!(isRhino && isModularize)) {
        var callCount = 0;

        var throttled = _.throttle(function(value) {
          callCount++;
          return value;
        }, 32, {});

        strictEqual(throttled('a'), 'a');
        strictEqual(throttled('b'), 'a');

        setTimeout(function() {
          strictEqual(callCount, 2);
          QUnit.start();
        }, 128);
      }
      else {
        skipTest(3);
        QUnit.start();
      }
    });

    test('should support a `leading` option', 2, function() {
      if (!(isRhino && isModularize)) {
        var withLeading = _.throttle(_.identity, 32, { 'leading': true });
        strictEqual(withLeading('a'), 'a');

        var withoutLeading = _.throttle(_.identity, 32, { 'leading': false });
        strictEqual(withoutLeading('a'), undefined);
      }
      else {
        skipTest(2);
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
        var callCount = 0;

        var throttled = _.throttle(function() {
          callCount++;
        }, 64, { 'trailing': false });

        throttled();
        throttled();

        setTimeout(function() {
          throttled();
          throttled();
        }, 96);

        setTimeout(function() {
          ok(callCount > 1);
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
        isDebounce = methodName == 'debounce';

    test('_.' + methodName + ' should not error for non-object `options` values', 1, function() {
      var pass = true;

      try {
        func(_.noop, 32, 1);
      } catch (e) {
        pass = false;
      }
      ok(pass);
    });

    asyncTest('_.' + methodName + ' should have a default `wait` of `0`', 1, function() {
      if (!(isRhino && isModularize)) {
        var callCount = 0;

        var funced = func(function() {
          callCount++;
        });

        funced();

        setTimeout(function() {
          funced();
          strictEqual(callCount, isDebounce ? 1 : 2);
          QUnit.start();
        }, 32);
      }
      else {
        skipTest();
        QUnit.start();
      }
    });

    asyncTest('_.' + methodName + ' should invoke `func` with the correct `this` binding', 1, function() {
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
            expected = args.slice(),
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
        deepEqual(actual, expected.slice(0, isDebounce ? 0 : 1));

        setTimeout(function() {
          deepEqual(actual, expected.slice(0, actual.length));
          QUnit.start();
        }, 256);
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
          'Date': _.assign(function() {
            return { 'getTime': getTime, 'valueOf': getTime };
          }, {
            'now': Date.now
          })
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

    asyncTest('_.' + methodName + ' should reset `lastCalled` after cancelling', 3, function() {
      if (!(isRhino && isModularize)) {
        var callCount = 0;

        var funced = func(function() {
          return ++callCount;
        }, 32, { 'leading': true });

        strictEqual(funced(), 1);
        funced.cancel();
        strictEqual(funced(), 2);

        setTimeout(function() {
          strictEqual(callCount, 2);
          QUnit.start();
        }, 64);
      }
      else {
        skipTest(3);
        QUnit.start();
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

    test('should coerce `n` to an integer', 1, function() {
      var actual = _.times(2.4, _.indentify);
      deepEqual(actual, [0, 1]);
    });

    test('should provide the correct `iteratee` arguments', 1, function() {
      var args;

      _.times(1, function() {
        args || (args = slice.call(arguments));
      });

      deepEqual(args, [0]);
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

  QUnit.module('lodash.toArray');

  (function() {
    test('should convert objects to arrays', 1, function() {
      deepEqual(_.toArray({ 'a': 1, 'b': 2 }), [1, 2]);
    });

    test('should convert strings to arrays', 2, function() {
      deepEqual(_.toArray('ab'), ['a', 'b']);
      deepEqual(_.toArray(Object('ab')), ['a', 'b']);
    });

    test('should convert iterables to arrays', 1, function() {
      if (!isNpm && Symbol && Symbol.iterator) {
        var object = { '0': 'a', 'length': 1 };
        object[Symbol.iterator] = arrayProto[Symbol.iterator];

        deepEqual(_.toArray(object), ['a']);
      }
      else {
        skipTest();
      }
    });

    test('should work in a lazy chain sequence', 2, function() {
      if (!isNpm) {
        var array = _.range(LARGE_ARRAY_SIZE + 1),
            actual = _(array).slice(1).map(String).toArray().value();

        deepEqual(actual, _.map(array.slice(1), String));

        var object = _.zipObject(_.times(LARGE_ARRAY_SIZE, function(index) {
          return ['key' + index, index];
        }));

        actual = _(object).toArray().slice(1).map(String).value();
        deepEqual(actual, _.map(_.toArray(object).slice(1), String));
      }
      else {
        skipTest(2);
      }
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
      deepEqual(actual, array);
      notStrictEqual(actual, array);
    });

    test('should work with a node list for `collection`', 1, function() {
      if (document) {
        try {
          var actual = func(document.getElementsByTagName('body'));
        } catch (e) {}

        deepEqual(actual, [body]);
      }
      else {
        skipTest();
      }
    });
  });

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.toPlainObject');

  (function() {
    var args = arguments;

    test('should flatten inherited properties', 1, function() {
      function Foo() { this.b = 2; }
      Foo.prototype.c = 3;

      var actual = _.assign({ 'a': 1 }, _.toPlainObject(new Foo));
      deepEqual(actual, { 'a': 1, 'b': 2, 'c': 3 });
    });

    test('should convert `arguments` objects to plain objects', 1, function() {
      var actual = _.toPlainObject(args),
          expected = { '0': 1, '1': 2, '2': 3 };

      deepEqual(actual, expected);
    });

    test('should convert arrays to plain objects', 1, function() {
      var actual = _.toPlainObject(['a', 'b', 'c']),
          expected = { '0': 'a', '1': 'b', '2': 'c' };

      deepEqual(actual, expected);
    });
  }(1, 2, 3));

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.transform');

  (function() {
    function Foo() {
      this.a = 1;
      this.b = 2;
      this.c = 3;
    }

    test('should create an object with the same `[[Prototype]]` as `object` when `accumulator` is nullish', 4, function() {
      var accumulators = [, null, undefined],
          expected = _.map(accumulators, _.constant(true)),
          object = new Foo;

      var iteratee = function(result, value, key) {
        result[key] = square(value);
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

    test('should support an `accumulator` value', 4, function() {
      var values = [new Foo, [1, 2, 3], { 'a': 1, 'b': 2, 'c': 3 }],
          expected = _.map(values, _.constant([0, 1, 4, 9]));

      var actual = _.map(values, function(value) {
        return _.transform(value, function(result, value) {
          result.push(square(value));
        }, [0]);
      });

      deepEqual(actual, expected);

      var object = { '_': 0, 'a': 1, 'b': 4, 'c': 9 };
      expected = [object, { '_': 0, '0': 1, '1': 4, '2': 9 }, object];
      actual = _.map(values, function(value) {
        return _.transform(value, function(result, value, key) {
          result[key] = square(value);
        }, { '_': 0 });
      });

      deepEqual(actual, expected);

      object = {};
      expected = _.map(values, _.constant(object));
      actual = _.map(values, function(value) {
        return _.transform(value, _.noop, object);
      });

      deepEqual(actual, expected);

      actual = _.map(values, function(value) {
        return _.transform(null, null, object);
      });

      deepEqual(actual, expected);
    });

    test('should treat sparse arrays as dense', 1, function() {
      var actual = _.transform(Array(1), function(result, value, index) {
        result[index] = String(value);
      });

      deepEqual(actual, ['undefined']);
    });

    test('should work without an `iteratee` argument', 1, function() {
      ok(_.transform(new Foo) instanceof Foo);
    });

    test('should check that `object` is an object before using its `[[Prototype]]`', 2, function() {
      var Ctors = [Boolean, Boolean, Number, Number, Number, String, String],
          values = [true, false, 0, 1, NaN, '', 'a'],
          expected = _.map(values, _.constant({}));

      var results = _.map(values, function(value) {
        return _.transform(value);
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

      var actual = _.map(falsey, function(object, index) {
        return index ? _.transform(object) : _.transform();
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
        if (_.isTypedArray(object)) {
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
      var object = { 'toString': _.constant(whitespace + 'a b c' + whitespace) },
          expected = (index == 2 ? whitespace : '') + 'a b c' + (index == 1 ? whitespace : '');

      strictEqual(func(object), expected);
    });

    test('`_.' + methodName + '` should remove ' + parts + ' `chars`', 1, function() {
      var string = '-_-a-b-c-_-',
          expected = (index == 2 ? '-_-' : '') + 'a-b-c' + (index == 1 ? '-_-' : '');

      strictEqual(func(string, '_-'), expected);
    });

    test('`_.' + methodName + '` should coerce `chars` to a string', 1, function() {
      var object = { 'toString': _.constant('_-') },
          string = '-_-a-b-c-_-',
          expected = (index == 2 ? '-_-' : '') + 'a-b-c' + (index == 1 ? '-_-' : '');

      strictEqual(func(string, object), expected);
    });

    test('`_.' + methodName + '` should return an empty string for empty values and `chars`', 6, function() {
      _.each([null, '_-'], function(chars) {
        strictEqual(func(null, chars), '');
        strictEqual(func(undefined, chars), '');
        strictEqual(func('', chars), '');
      });
    });

    test('`_.' + methodName + '` should work with `undefined` or empty string values for `chars`', 2, function() {
      var string = whitespace + 'a b c' + whitespace,
          expected = (index == 2 ? whitespace : '') + 'a b c' + (index == 1 ? whitespace : '');

      strictEqual(func(string, undefined), expected);
      strictEqual(func(string, ''), string);
    });

    test('`_.' + methodName + '` should work as an iteratee for methods like `_.map`', 1, function() {
      var string = Object(whitespace + 'a b c' + whitespace),
          trimmed = (index == 2 ? whitespace : '') + 'a b c' + (index == 1 ? whitespace : ''),
          actual = _.map([string, string, string], func);

      deepEqual(actual, [trimmed, trimmed, trimmed]);
    });

    test('`_.' + methodName + '` should return an unwrapped value when implicitly chaining', 1, function() {
      if (!isNpm) {
        var string = whitespace + 'a b c' + whitespace,
            expected = (index == 2 ? whitespace : '') + 'a b c' + (index == 1 ? whitespace : '');

        strictEqual(_(string)[methodName](), expected);
      }
      else {
        skipTest();
      }
    });

    test('`_.' + methodName + '` should return a wrapped value when explicitly chaining', 1, function() {
      if (!isNpm) {
        var string = whitespace + 'a b c' + whitespace;
        ok(_(string).chain()[methodName]() instanceof _);
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

    test('should unescape entities in order', 1, function() {
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
      deepEqual(_.union(array, null, args, null), [0, 1, 2, 3]);
    });
  }(1, 2, 3));

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.uniq');

  (function() {
    test('should perform an unsorted uniq when used as an iteratee for methods like `_.map`', 1, function() {
      var array = [[2, 1, 2], [1, 2, 1]],
          actual = _.map(array, _.uniq);

      deepEqual(actual, [[2, 1], [1, 2]]);
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('uniq methods');

  _.each(['uniq', 'uniqBy', 'sortedUniq', 'sortedUniqBy'], function(methodName) {
    var func = _[methodName],
        isSorted = /^sorted/.test(methodName);
        objects = [{ 'a': 2 }, { 'a': 3 }, { 'a': 1 }, { 'a': 2 }, { 'a': 3 }, { 'a': 1 }];

    if (isSorted) {
      objects = _.sortBy(objects, 'a');
    }
    else {
      test('`_.' + methodName + '` should return unique values of an unsorted array', 1, function() {
        var array = [2, 3, 1, 2, 3, 1];
        deepEqual(func(array), [2, 3, 1]);
      });
    }
    test('`_.' + methodName + '` should return unique values of a sorted array', 1, function() {
      var array = [1, 1, 2, 2, 3];
      deepEqual(func(array), [1, 2, 3]);
    });

    test('`_.' + methodName + '` should treat object instances as unique', 1, function() {
      deepEqual(func(objects), objects);
    });

    test('`_.' + methodName + '` should not treat `NaN` as unique', 1, function() {
      deepEqual(func([1, 3, NaN, NaN]), [1, 3, NaN]);
    });

    test('`_.' + methodName + '` should work with large arrays', 1, function() {
      var largeArray = [],
          expected = [0, {}, 'a'],
          count = Math.ceil(LARGE_ARRAY_SIZE / expected.length);

      _.each(expected, function(value) {
        _.times(count, function() {
          largeArray.push(value);
        });
      });

      deepEqual(func(largeArray), expected);
    });

    test('`_.' + methodName + '` should work with large arrays of boolean, `NaN`, and nullish values', 1, function() {
      var largeArray = [],
          expected = [false, true, null, undefined, NaN],
          count = Math.ceil(LARGE_ARRAY_SIZE / expected.length);

      _.each(expected, function(value) {
        _.times(count, function() {
          largeArray.push(value);
        });
      });

      deepEqual(func(largeArray), expected);
    });

    test('`_.' + methodName + '` should work with large arrays of symbols', 1, function() {
      if (Symbol) {
        var largeArray = _.times(LARGE_ARRAY_SIZE, function() {
          return Symbol();
        });

        deepEqual(func(largeArray), largeArray);
      }
      else {
        skipTest();
      }
    });

    test('`_.' + methodName + '` should work with large arrays of well-known symbols', 1, function() {
      // See http://www.ecma-international.org/ecma-262/6.0/#sec-well-known-symbols.
      if (Symbol) {
        var expected = [
          Symbol.hasInstance, Symbol.isConcatSpreadable, Symbol.iterator,
          Symbol.match, Symbol.replace, Symbol.search, Symbol.species,
          Symbol.split, Symbol.toPrimitive, Symbol.toStringTag, Symbol.unscopables
        ];

        var largeArray = [],
            count = Math.ceil(LARGE_ARRAY_SIZE / expected.length);

        expected = _.map(expected, function(symbol) {
          return symbol || {};
        });

        _.each(expected, function(value) {
          _.times(count, function() {
            largeArray.push(value);
          });
        });

        deepEqual(func(largeArray), expected);
      }
      else {
        skipTest();
      }
    });

    test('`_.' + methodName + '` should distinguish between numbers and numeric strings', 1, function() {
      var largeArray = [],
          expected = ['2', 2, Object('2'), Object(2)],
          count = Math.ceil(LARGE_ARRAY_SIZE / expected.length);

      _.each(expected, function(value) {
        _.times(count, function() {
          largeArray.push(value);
        });
      });

      deepEqual(func(largeArray), expected);
    });
  });

  /*--------------------------------------------------------------------------*/

  QUnit.module('uniqBy methods');

  _.each(['uniqBy', 'sortedUniqBy'], function(methodName) {
    var func = _[methodName],
        isSortedUniqBy = methodName == 'sortedUniqBy',
        objects = [{ 'a': 2 }, { 'a': 3 }, { 'a': 1 }, { 'a': 2 }, { 'a': 3 }, { 'a': 1 }];

    if (isSortedUniqBy) {
      objects = _.sortBy(objects, 'a');
    }
    test('`_.' + methodName + '` should work with an `iteratee` argument', 1, function() {
      var expected = isSortedUniqBy ? [{ 'a': 1 }, { 'a': 2 }, { 'a': 3 }] : objects.slice(0, 3);

      var actual = func(objects, function(object) {
        return object.a;
      });

      deepEqual(actual, expected);
    });

    test('`_.' + methodName + '` should provide the correct `iteratee` arguments', 1, function() {
      var args;

      func(objects, function() {
        args || (args = slice.call(arguments));
      });

      deepEqual(args, [objects[0]]);
    });

    test('`_.' + methodName + '` should work with a "_.property" style `iteratee`', 2, function() {
      var expected = isSortedUniqBy ? [{ 'a': 1 }, { 'a': 2 }, { 'a': 3 }] : objects.slice(0, 3),
          actual = func(objects, 'a');

      deepEqual(actual, expected);

      var arrays = [[2], [3], [1], [2], [3], [1]];
      if (isSortedUniqBy) {
        arrays = _.sortBy(arrays, 0);
      }
      expected = isSortedUniqBy ? [[1], [2], [3]] : arrays.slice(0, 3);
      actual = func(arrays, 0);

      deepEqual(actual, expected);
    });

    _.each({
      'an array': [0, 'a'],
      'an object': { '0': 'a' },
      'a number': 0,
      'a string': '0'
    },
    function(iteratee, key) {
      test('`_.' + methodName + '` should work with ' + key + ' for `iteratee`', 1, function() {
        var actual = func([['a'], ['a'], ['b']], iteratee);
        deepEqual(actual, [['a'], ['b']]);
      });
    });
  });

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.uniqueId');

  (function() {
    test('should generate unique ids', 1, function() {
      var actual = _.times(1000, function() {
        return _.uniqueId();
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

  QUnit.module('lodash.unset');

  (function() {
    test('should unset property values', 4, function() {
      _.each(['a', ['a']], function(path) {
        var object = { 'a': 1, 'c': 2 };
        strictEqual(_.unset(object, path), true);
        deepEqual(object, { 'c': 2 });
      });
    });

    test('should unset deep property values', 4, function() {
      _.each(['a.b.c', ['a', 'b', 'c']], function(path) {
        var object = { 'a': { 'b': { 'c': null } } };
        strictEqual(_.unset(object, path), true);
        deepEqual(object, { 'a': { 'b': {} } });
      });
    });

    test('should handle complex paths', 4, function() {
      var paths = [
        'a[-1.23]["[\\"b\\"]"].c[\'[\\\'d\\\']\'][\ne\n][f].g',
        ['a', '-1.23', '["b"]', 'c', "['d']", '\ne\n', 'f', 'g']
      ];

      _.each(paths, function(path) {
        var object = { 'a': { '-1.23': { '["b"]': { 'c': { "['d']": { '\ne\n': { 'f': { 'g': 8 } } } } } } } };
        strictEqual(_.unset(object, path), true);
        ok(!('g' in object.a[-1.23]['["b"]'].c["['d']"]['\ne\n'].f));
      });
    });

    test('should return `true` for nonexistent paths', 5, function() {
      var object = { 'a': { 'b': { 'c': null } } };

      _.each(['z', 'a.z', 'a.b.z', 'a.b.c.z'], function(path) {
        strictEqual(_.unset(object, path), true);
      });

      deepEqual(object, { 'a': { 'b': { 'c': null } } });
    });

    test('should not error when `object` is nullish', 1, function() {
      var values = [null, undefined],
          expected = [[true, true], [true, true]];

      var actual = _.map(values, function(value) {
        try {
          return [_.unset(value, 'a.b'), _.unset(value, ['a', 'b'])];
        } catch(e) {
          return e.message;
        }
      });

      deepEqual(actual, expected);
    });

    test('should follow `path` over non-plain objects', 8, function() {
      var object = { 'a': '' },
          paths = ['constructor.prototype.a', ['constructor', 'prototype', 'a']];

      _.each(paths, function(path) {
        numberProto.a = 1;

        var actual = _.unset(0, path);
        strictEqual(actual, true);
        ok(!('a' in numberProto));

        delete numberProto.a;
      });

      _.each(['a.replace.b', ['a', 'replace', 'b']], function(path) {
        stringProto.replace.b = 1;

        var actual = _.unset(object, path);
        strictEqual(actual, true);
        ok(!('a' in stringProto.replace));

        delete stringProto.replace.b;
      });
    });

    test('should return `false` for non-configurable properties', 1, function() {
      var object = {};

      if (!isStrict && defineProperty) {
        defineProperty(object, 'a', {
          'configurable': false,
          'value': 1
        });
        strictEqual(_.unset(object, 'a'), false);
      }
      else {
        skipTest();
      }
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.unzipWith');

  (function() {
    test('should unzip arrays combining regrouped elements with `iteratee`', 1, function() {
      var array = [[1, 4], [2, 5], [3, 6]];
      deepEqual(_.unzipWith(array, _.add), [6, 15]);
    });

    test('should provide the correct `iteratee` arguments', 1, function() {
      var args;

      _.unzipWith([[1, 3, 5], [2, 4, 6]], function() {
        args || (args = slice.call(arguments));
      });

      deepEqual(args, [1, 2, 1, [1, 2]]);
    });

    test('should perform a basic unzip when `iteratee` is nullish', 1, function() {
      var array = [[1, 3], [2, 4]],
          values = [, null, undefined],
          expected = _.map(values, _.constant(_.unzip(array)));

      var actual = _.map(values, function(value, index) {
        return index ? _.unzipWith(array, value) : _.unzipWith(array);
      });

      deepEqual(actual, expected);
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
  }(1, 2, 3));

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

    test('should work as an iteratee for methods like `_.map`', 1, function() {
      var strings = _.map(['a', 'b', 'c'], Object),
          actual = _.map(strings, _.words);

      deepEqual(actual, [['a'], ['b'], ['c']]);
    });

    test('should work with compound words', 6, function() {
      deepEqual(_.words('aeiouAreVowels'), ['aeiou', 'Are', 'Vowels']);
      deepEqual(_.words('enable 24h format'), ['enable', '24', 'h', 'format']);
      deepEqual(_.words('LETTERSAeiouAreVowels'), ['LETTERS', 'Aeiou', 'Are', 'Vowels']);
      deepEqual(_.words('tooLegit2Quit'), ['too', 'Legit', '2', 'Quit']);
      deepEqual(_.words('walk500Miles'), ['walk', '500', 'Miles']);
      deepEqual(_.words('xhr2Request'), ['xhr', '2', 'Request']);
    });

    test('should work with compound words containing diacritical marks', 3, function() {
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

    test('should use `_.identity` when `wrapper` is nullish', 1, function() {
      var values = [, null, undefined],
          expected = _.map(values, _.constant('a'));

      var actual = _.map(values, function(value, index) {
        var wrapped = index ? _.wrap('a', value) : _.wrap('a');
        return wrapped('b', 'c');
      });

      deepEqual(actual, expected);
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
      deepEqual(_.xor(array, null, args, null), [3]);
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
        var array = _.range(LARGE_ARRAY_SIZE + 1),
            wrapped = _(array).slice(1).xor([LARGE_ARRAY_SIZE, LARGE_ARRAY_SIZE + 1]);

        var actual = _.map(['first', 'last'], function(methodName) {
          return wrapped[methodName]();
        });

        deepEqual(actual, [1, LARGE_ARRAY_SIZE + 1]);
      }
      else {
        skipTest();
      }
    });
  }(1, 2, 3));

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

      var actual = _.map(falsey, function(array, index) {
        try {
          return index ? _.zipObject(array) : _.zipObject();
        } catch (e) {}
      });

      deepEqual(actual, expected);
    });

    test('should support consuming the return value of `_.pairs`', 1, function() {
      deepEqual(_.zipObject(_.pairs(object)), object);
    });

    test('should work in a lazy chain sequence', 1, function() {
      if (!isNpm) {
        var array = _.times(LARGE_ARRAY_SIZE, function(index) {
          return ['key' + index, index];
        });

        var actual = _(array).zipObject().map(square).filter(isEven).take().value();

        deepEqual(actual, _.take(_.filter(_.map(_.zipObject(array), square), isEven)));
      }
      else {
        skipTest();
      }
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.zipWith');

  (function() {
    test('should zip arrays combining grouped elements with `iteratee`', 2, function() {
      var array1 = [1, 2, 3],
          array2 = [4, 5, 6];

      deepEqual(_.zipWith(array1, array2, _.add), [5, 7, 9]);
      deepEqual(_.zipWith(array1, [], _.add), [1, 2, 3]);
    });

    test('should provide the correct `iteratee` arguments', 1, function() {
      var args;

      _.zipWith([1, 2], [3, 4], [5, 6], function() {
        args || (args = slice.call(arguments));
      });

      deepEqual(args, [1, 3, 1, [1, 3, 5]]);
    });

    test('should perform a basic zip when `iteratee` is nullish', 1, function() {
      var array1 = [1, 2],
          array2 = [3, 4],
          values = [, null, undefined],
          expected = _.map(values, _.constant(_.zip(array1, array2)));

      var actual = _.map(values, function(value, index) {
        return index ? _.zipWith(array1, array2, value) : _.zipWith(array1, array2);
      });

      deepEqual(actual, expected);
    });
  }());

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

    test('`_.' + methodName + '` should ignore values that are not arrays or `arguments` objects', 1, function() {
      var array = [[1, 2], [3, 4], null, undefined, { '0': 1 }];
      deepEqual(func(array), [[1, 3], [2, 4]]);
    });

    test('`_.' + methodName + '` should support consuming its return value', 1, function() {
      var expected = [['barney', 'fred'], [36, 40]];
      deepEqual(func(func(func(func(expected)))), expected);
    });
  });

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash(...).commit');

  (function() {
    test('should execute the chained sequence and returns the wrapped result', 4, function() {
      if (!isNpm) {
        var array = [1],
            wrapped = _(array).push(2).push(3);

        deepEqual(array, [1]);

        var otherWrapper = wrapped.commit();
        ok(otherWrapper instanceof _);
        deepEqual(otherWrapper.value(), [1, 2, 3]);
        deepEqual(wrapped.value(), [1, 2, 3, 2, 3]);
      }
      else {
        skipTest(4);
      }
    });

    test('should track the `__chain__` value of a wrapper', 2, function() {
      if (!isNpm) {
        var wrapped = _([1]).chain().commit().first();
        ok(wrapped instanceof _);
        strictEqual(wrapped.value(), 1);
      }
      else {
        skipTest(2);
      }
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash(...).concat');

  (function() {
    test('should concat arrays and values', 2, function() {
      if (!isNpm) {
        var array = [1],
            wrapped = _(array).concat(2, [3], [[4]]);

        deepEqual(wrapped.value(), [1, 2, 3, [4]]);
        deepEqual(array, [1]);
      }
      else {
        skipTest(2);
      }
    });

    test('should treat sparse arrays as dense', 3, function() {
      if (!isNpm) {
        var expected = [],
            wrapped = _(Array(1)).concat(Array(1)),
            actual = wrapped.value();

        expected.push(undefined, undefined);

        ok('0'in actual);
        ok('1' in actual);
        deepEqual(actual, expected);
      }
      else {
        skipTest(3);
      }
    });

    test('should return a new wrapped array', 3, function() {
      if (!isNpm) {
        var array = [1],
            wrapped = _(array).concat([2, 3]),
            actual = wrapped.value();

        deepEqual(array, [1]);
        deepEqual(actual, [1, 2, 3]);
        notStrictEqual(actual, array);
      }
      else {
        skipTest(3);
      }
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash(...).join');

  (function() {
    var array = [1, 2, 3];

    test('should return join all array elements into a string', 2, function() {
      if (!isNpm) {
        var wrapped = _(array);
        strictEqual(wrapped.join('.'), '1.2.3');
        strictEqual(wrapped.value(), array);
      }
      else {
        skipTest(2);
      }
    });

    test('should return a wrapped value when explicitly chaining', 1, function() {
      if (!isNpm) {
        ok(_(array).chain().join('.') instanceof _);
      }
      else {
        skipTest();
      }
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash(...).next');

  _.each([true, false], function(implict) {
    function chain(value) {
      return implict ? _(value) : _.chain(value);
    }

    var chainType = 'in an ' + (implict ? 'implict' : 'explict') + ' chain';

    test('should follow the iterator protocol ' + chainType, 3, function() {
      if (!isNpm) {
        var wrapped = chain([1, 2]);

        deepEqual(wrapped.next(), { 'done': false, 'value': 1 });
        deepEqual(wrapped.next(), { 'done': false, 'value': 2 });
        deepEqual(wrapped.next(), { 'done': true,  'value': undefined });
      }
      else {
        skipTest(3);
      }
    });

    test('should act as an iterable ' + chainType, 2, function() {
      if (!isNpm && Symbol && Symbol.iterator) {
        var array = [1, 2],
            wrapped = chain(array);

        ok(wrapped[Symbol.iterator]() === wrapped);
        deepEqual(_.toArray(wrapped), array);
      }
      else {
        skipTest(2);
      }
    });

    test('should reset the iterator correctly ' + chainType, 4, function() {
      if (!isNpm && Symbol && Symbol.iterator) {
        var array = [1, 2],
            wrapped = chain(array);

        deepEqual(_.toArray(wrapped), array);
        deepEqual(_.toArray(wrapped), [], 'produces an empty array for exhausted iterator');

        var other = wrapped.filter();
        deepEqual(_.toArray(other), array, 'reset for new chain segments');
        deepEqual(_.toArray(wrapped), [], 'iterator is still exhausted');
      }
      else {
        skipTest(4);
      }
    });

    test('should work in a lazy sequence ' + chainType, 3, function() {
      if (!isNpm && Symbol && Symbol.iterator) {
        var array = _.range(LARGE_ARRAY_SIZE),
            predicate = function(value) { values.push(value); return isEven(value); },
            values = [],
            wrapped = chain(array);

        deepEqual(_.toArray(wrapped), array);

        wrapped = wrapped.filter(predicate);
        deepEqual(_.toArray(wrapped), _.filter(array, isEven), 'reset for new lazy chain segments');
        deepEqual(values, array, 'memoizes iterator values');
      }
      else {
        skipTest(3);
      }
    });
  });

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash(...).plant');

  (function() {
    test('should clone the chained sequence planting `value` as the wrapped value', 2, function() {
      if (!isNpm) {
        var array1 = [5, null, 3, null, 1],
            array2 = [10, null, 8, null, 6],
            wrapped1 = _(array1).thru(_.compact).map(square).takeRight(2).sort(),
            wrapped2 = wrapped1.plant(array2);

        deepEqual(wrapped2.value(), [36, 64]);
        deepEqual(wrapped1.value(), [1, 9]);
      }
      else {
        skipTest(2);
      }
    });

    test('should clone `chainAll` settings', 1, function() {
      if (!isNpm) {
        var array1 = [2, 4],
            array2 = [6, 8],
            wrapped1 = _(array1).chain().map(square),
            wrapped2 = wrapped1.plant(array2);

        deepEqual(wrapped2.first().value(), 36);
      }
      else {
        skipTest();
      }
    });

    test('should reset iterator data on cloned sequences', 3, function() {
      if (!isNpm && Symbol && Symbol.iterator) {
        var array1 = [2, 4],
            array2 = [6, 8],
            wrapped1 = _(array1).map(square);

        deepEqual(_.toArray(wrapped1), [4, 16]);
        deepEqual(_.toArray(wrapped1), []);

        var wrapped2 = wrapped1.plant(array2);
        deepEqual(_.toArray(wrapped2), [36, 64]);
      }
      else {
        skipTest(3);
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
        deepEqual(actual, []);
        strictEqual(actual, array);
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

  QUnit.module('lodash(...).replace');

  (function() {
      test('should replace the matched pattern', 2, function() {
      if (!isNpm) {
        var wrapped = _('abcdef');
        strictEqual(wrapped.replace('def', '123'), 'abc123');
        strictEqual(wrapped.replace(/[bdf]/g, '-'), 'a-c-e-');
      }
      else {
        skipTest(2);
      }
    });

    test('should return a wrapped value when explicitly chaining', 1, function() {
      if (!isNpm) {
        ok(_('abc').chain().replace('b', '_') instanceof _);
      }
      else {
        skipTest();
      }
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash(...).reverse');

  (function() {
    var largeArray = _.range(LARGE_ARRAY_SIZE).concat(null),
        smallArray = [0, 1, 2, null];

    test('should return the wrapped reversed `array`', 6, function() {
      if (!isNpm) {
        _.times(2, function(index) {
          var array = (index ? largeArray : smallArray).slice(),
              clone = array.slice(),
              wrapped = _(array).reverse(),
              actual = wrapped.value();

          ok(wrapped instanceof _);
          strictEqual(actual, array);
          deepEqual(actual, clone.slice().reverse());
        });
      }
      else {
        skipTest(6);
      }
    });

    test('should work in a lazy chain sequence', 4, function() {
      if (!isNpm) {
        _.times(2, function(index) {
          var array = (index ? largeArray : smallArray).slice(),
              expected = array.slice(),
              actual = _(array).slice(1).reverse().value();

          deepEqual(actual, expected.slice(1).reverse());
          deepEqual(array, expected);
        });
      }
      else {
        skipTest(4);
      }
    });

    test('should be lazy when in a lazy chain sequence', 3, function() {
      if (!isNpm) {
        var spy = {
          'toString': function() {
            throw new Error('spy was revealed');
          }
        };

        var array = largeArray.concat(spy),
            expected = array.slice();

        try {
          var wrapped = _(array).slice(1).map(String).reverse(),
              actual = wrapped.last();
        } catch (e) {}

        ok(wrapped instanceof _);
        strictEqual(actual, '1');
        deepEqual(array, expected);
      }
      else {
        skipTest(3);
      }
    });

    test('should work in a hybrid chain sequence', 8, function() {
      if (!isNpm) {
        _.times(2, function(index) {
          var clone = (index ? largeArray : smallArray).slice();

          _.each(['map', 'filter'], function(methodName) {
            var array = clone.slice(),
                expected = clone.slice(1, -1).reverse(),
                actual = _(array)[methodName](_.identity).thru(_.compact).reverse().value();

            deepEqual(actual, expected);

            array = clone.slice();
            actual = _(array).thru(_.compact)[methodName](_.identity).pull(1).push(3).reverse().value();

            deepEqual(actual, [3].concat(expected.slice(0, -1)));
          });
        });
      }
      else {
        skipTest(8);
      }
    });

    test('should track the `__chain__` value of a wrapper', 6, function() {
      if (!isNpm) {
        _.times(2, function(index) {
          var array = (index ? largeArray : smallArray).slice(),
              expected = array.slice().reverse(),
              wrapped = _(array).chain().reverse().first();

          ok(wrapped instanceof _);
          strictEqual(wrapped.value(), _.first(expected));
          deepEqual(array, expected);
        });
      }
      else {
        skipTest(6);
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
        deepEqual(actual, []);
        strictEqual(actual, array);
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

        deepEqual(array, [1, 2, 3]);
        deepEqual(actual, [1, 2]);
        notStrictEqual(actual, array);
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
        deepEqual(actual, []);
        strictEqual(actual, array);
      }
      else {
        skipTest(5);
      }
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash(...).split');

  (function() {
    test('should support string split', 2, function() {
      if (!isNpm) {
        var wrapped = _('abcde');
        deepEqual(wrapped.split('c').value(), ['ab', 'de']);
        deepEqual(wrapped.split(/[bd]/).value(), ['a', 'c', 'e']);
      }
      else {
        skipTest(2);
      }
    });

    test('should allow mixed string and array prototype methods', 1, function() {
      if (!isNpm) {
        var wrapped = _('abc');
        strictEqual(wrapped.split('b').join(','), 'a,c');
      }
      else {
        skipTest();
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

  QUnit.module('lodash(...).value');

  (function() {
    test('should execute the chained sequence and extract the unwrapped value', 4, function() {
      if (!isNpm) {
        var array = [1],
            wrapped = _(array).push(2).push(3);

        deepEqual(array, [1]);
        deepEqual(wrapped.value(), [1, 2, 3]);
        deepEqual(wrapped.value(), [1, 2, 3, 2, 3]);
        deepEqual(array, [1, 2, 3, 2, 3]);
      }
      else {
        skipTest(4);
      }
    });

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

    test('should be aliased', 3, function() {
      if (!isNpm) {
        var expected = _.prototype.value;
        strictEqual(_.prototype.run, expected);
        strictEqual(_.prototype.toJSON, expected);
        strictEqual(_.prototype.valueOf, expected);
      }
      else {
        skipTest(3);
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
      'every',
      'find',
      'first',
      'has',
      'hasIn',
      'includes',
      'isArguments',
      'isArray',
      'isArrayLike',
      'isBoolean',
      'isDate',
      'isElement',
      'isEmpty',
      'isEqual',
      'isError',
      'isFinite',
      'isFunction',
      'isNaN',
      'isNative',
      'isNil',
      'isNull',
      'isNumber',
      'isObject',
      'isObjectLike',
      'isPlainObject',
      'isRegExp',
      'isString',
      'isUndefined',
      'join',
      'last',
      'max',
      'maxBy',
      'min',
      'minBy',
      'parseInt',
      'pop',
      'shift',
      'sum',
      'random',
      'reduce',
      'reduceRight',
      'some',
      'toInteger'
    ];

    _.each(funcs, function(methodName) {
      test('`_(...).' + methodName + '` should return an unwrapped value when implicitly chaining', 1, function() {
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
    var args = (function() { return arguments; }(1, null, [3], null, 5)),
        sortedArgs = (function() { return arguments; }(1, [3], 5, null, null)),
        array = [1, 2, 3, 4, 5, 6];

    test('should work with `arguments` objects', 30, function() {
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
      deepEqual(_.sortedIndex(sortedArgs, 6), 3, message('sortedIndex'));
      deepEqual(_.sortedIndexOf(sortedArgs, 5), 2, message('sortedIndexOf'));
      deepEqual(_.sortedLastIndex(sortedArgs, 5), 3, message('sortedLastIndex'));
      deepEqual(_.sortedLastIndexOf(sortedArgs, 1), 0, message('sortedLastIndexOf'));
      deepEqual(_.take(args, 2), [1, null], message('take'));
      deepEqual(_.takeRight(args, 1), [5], message('takeRight'));
      deepEqual(_.takeRightWhile(args, _.identity), [5], message('takeRightWhile'));
      deepEqual(_.takeWhile(args, _.identity), [1], message('takeWhile'));
      deepEqual(_.uniq(args), [1, null, [3], 5], message('uniq'));
      deepEqual(_.without(args, null), [1, [3], 5], message('without'));
      deepEqual(_.zip(args, args), [[1, 1], [null, null], [[3], [3]], [null, null], [5, 5]], message('zip'));
    });

    test('should accept falsey primary arguments', 4, function() {
      function message(methodName) {
        return '`_.' + methodName + '` should accept falsey primary arguments';
      }

      deepEqual(_.difference(null, array), [], message('difference'));
      deepEqual(_.intersection(null, array), [], message('intersection'));
      deepEqual(_.union(null, array), array, message('union'));
      deepEqual(_.xor(null, array), array, message('xor'));
    });

    test('should accept falsey secondary arguments', 3, function() {
      function message(methodName) {
        return '`_.' + methodName + '` should accept falsey secondary arguments';
      }

      deepEqual(_.difference(array, null), array, message('difference'));
      deepEqual(_.intersection(array, null), [], message('intersection'));
      deepEqual(_.union(array, null), array, message('union'));
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('"Strings" category methods');

 (function() {
    var stringMethods = [
      'camelCase',
      'capitalize',
      'escape',
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

      test('`_.' + methodName + '` should return an empty string for empty values', 3, function() {
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

    var checkFuncs = [
      'after',
      'ary',
      'before',
      'bind',
      'curry',
      'curryRight',
      'debounce',
      'defer',
      'delay',
      'memoize',
      'modArgs',
      'negate',
      'once',
      'partial',
      'partialRight',
      'rearg',
      'restParam',
      'spread',
      'throttle'
    ];

    var rejectFalsey = [
      'flow',
      'flowRight',
      'tap',
      'thru'
    ].concat(checkFuncs);

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
      'pull',
      'pullAt',
      'range',
      'reject',
      'remove',
      'rest',
      'sample',
      'shuffle',
      'sortBy',
      'sortByOrder',
      'take',
      'times',
      'toArray',
      'union',
      'uniq',
      'values',
      'without',
      'xor',
      'zip'
    ];

    var acceptFalsey = _.difference(allMethods, rejectFalsey);

    test('should accept falsey arguments', 233, function() {
      var emptyArrays = _.map(falsey, _.constant([]));

      _.each(acceptFalsey, function(methodName) {
        var expected = emptyArrays,
            func = _[methodName],
            pass = true;

        var actual = _.map(falsey, function(value, index) {
          try {
            return index ? func(value) : func();
          } catch (e) {
            pass = false;
          }
        });

        if (methodName == 'noConflict') {
          root._ = oldDash;
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

    test('should return an array', 66, function() {
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

    test('should throw an error for falsey arguments', 23, function() {
      _.each(rejectFalsey, function(methodName) {
        var expected = _.map(falsey, _.constant(true)),
            func = _[methodName];

        var actual = _.map(falsey, function(value, index) {
          var pass = !index && /^(?:backflow|compose|flow(Right)?)$/.test(methodName);

          try {
            index ? func(value) : func();
          } catch (e) {
            pass = _.includes(checkFuncs, methodName)
              ? e.message == FUNC_ERROR_TEXT
              : !pass;
          }
          return pass;
        });

        deepEqual(actual, expected, '`_.' + methodName + '` rejects falsey arguments');
      });
    });

    test('should not contain minified method names (test production builds)', 1, function() {
      var shortNames = ['at', 'eq', 'gt', 'lt'];
      ok(_.every(_.functions(_), function(methodName) {
        return methodName.length > 2 || _.includes(shortNames, methodName);
      }));
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.config.asyncRetries = 10;
  QUnit.config.hidepassed = true;

  if (!document) {
    QUnit.config.noglobals = true;
    QUnit.load();
  }
}.call(this));
