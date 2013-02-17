;(function(window, undefined) {
  'use strict';

  /** Use a single "load" function */
  var load = typeof require == 'function' ? require : window.load;

  /** The file path of the Lo-Dash file to test */
  var filePath = (function() {
    var min = 0;
    var result = window.phantom
      ? phantom.args
      : (window.system
          ? (min = 1, system.args)
          : (window.process ? (min = 2, process.argv) : (window.arguments || []))
        );

    var last = result[result.length - 1];
    result = (result.length > min && last != 'test.js') ? last : '../lodash.js';

    try {
      result = require('fs').realpathSync(result);
    } catch(e) { }

    return result;
  }());

  /** The basename of the Lo-Dash file to test */
  var basename = /[\w.-]+$/.exec(filePath)[0];

  /** The `platform` object to check */
  var platform =
    window.platform ||
    load('../vendor/platform.js/platform.js') ||
    window.platform;

  /** The unit testing framework */
  var QUnit =
    window.QUnit || (
      window.addEventListener || (window.addEventListener = Function.prototype),
      window.setTimeout || (window.setTimeout = Function.prototype),
      window.QUnit = load('../vendor/qunit/qunit/qunit.js') || window.QUnit,
      load('../vendor/qunit-clib/qunit-clib.js'),
      window.addEventListener === Function.prototype && delete window.addEventListener,
      window.QUnit
    );

  /** The `lodash` function to test */
  var _ = window._ || (
    _ = load(filePath) || window._,
    _._ || _
  );

  /** Used to pass falsey values to methods */
  var falsey = [
    ,
    '',
    0,
    false,
    NaN,
    null,
    undefined
  ];

  /** Shortcut used to make object properties immutable */
  var freeze = Object.freeze;

  /** Used to set property descriptors */
  var setDescriptor = (function(fn) {
    try {
      var o = {};
      return fn(o, o, o) && fn;
    } catch(e) { }
  }(Object.defineProperty));

  /** Shortcut used to convert array-like objects to arrays */
  var slice = [].slice;

  /** Used to check problem JScript properties (a.k.a. the [[DontEnum]] bug) */
  var shadowed = {
    'constructor': 1,
    'hasOwnProperty': 2,
    'isPrototypeOf': 3,
    'propertyIsEnumerable': 4,
    'toLocaleString': 5,
    'toString': 6,
    'valueOf': 7
  };

  /** Used to check problem JScript properties too */
  var shadowedKeys = [
    'constructor',
    'hasOwnProperty',
    'isPrototypeOf',
    'propertyIsEnumerable',
    'toLocaleString',
    'toString',
    'valueOf'
  ];

  /*--------------------------------------------------------------------------*/

  /**
   * Skips a given number of tests with a passing result.
   *
   * @private
   * @param {Number} [count=1] The number of tests to skip.
   */
  function skipTest(count) {
    count || (count = 1);
    while (count--) {
      ok(true, 'test skipped');
    }
  }

  /*--------------------------------------------------------------------------*/

  // add object from iframe
  (function() {
    if (!window.document || window.phantom) {
      return;
    }
    var body = document.body,
        iframe = document.createElement('iframe');

    iframe.frameBorder = iframe.height = iframe.width = 0;
    body.appendChild(iframe);
    var idoc = (idoc = iframe.contentDocument || iframe.contentWindow).document || idoc;
    idoc.write("<script>parent._._object = { 'a': 1, 'b': 2, 'c': 3 };<\/script>");
    idoc.close();
  }());

  /*--------------------------------------------------------------------------*/

  // explicitly call `QUnit.module()` instead of `module()`
  // in case we are in a CLI environment
  QUnit.module(basename);

  (function() {
    test('supports loading ' + basename + ' as the "lodash" module', function() {
      if (window.define && define.amd) {
        equal((lodashModule || {}).moduleName, 'lodash');
      } else {
        skipTest();
      }
    });

    test('supports loading ' + basename + ' with the Require.js "shim" configuration option', function() {
      if (window.define && define.amd) {
        equal((shimmedModule || {}).moduleName, 'shimmed');
      } else {
        skipTest();
      }
    });

    test('supports loading ' + basename + ' as the "underscore" module', function() {
      if (window.define && define.amd) {
        equal((underscoreModule || {}).moduleName, 'underscore');
      } else {
        skipTest();
      }
    });

    test('avoids overwritten native methods', function() {
      if (window.document && !window.phantom) {
        notDeepEqual(lodashBadShim.keys({ 'a': 1 }), []);
      } else {
        skipTest();
      }
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash constructor');

  (function() {
    test('creates a new instance when called without the `new` operator', function() {
      ok(_() instanceof _);
    });

    test('should return passed LoDash instances', function() {
      var wrapped = _([]);
      equal(_(wrapped), wrapped);
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.assign');

  (function() {
    test('should not error on `null` or `undefined` sources (test in IE < 9)', function() {
      try {
        deepEqual(_.assign({}, null, undefined, { 'a': 1 }), { 'a': 1 });
      } catch(e) {
        ok(false);
      }
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.at');

  (function() {
    test('should return `undefined` for nonexistent keys', function() {
      var actual = _.at(['a', 'b',  'c'], [0, 2, 4]);
      deepEqual(actual, ['a', 'c', undefined]);
    });

    test('should return an empty array when no keys are passed', function() {
      deepEqual(_.at(['a', 'b', 'c']), []);
    });

    test('should accept multiple key arguments', function() {
      var actual = _.at(['a', 'b', 'c', 'd'], 0, 2, 3);
      deepEqual(actual, ['a', 'c', 'd']);
    });

    test('should work with an object for `collection`', function() {
      var actual = _.at({ 'a': 1, 'b': 2, 'c': 3 }, ['a', 'c']);
      deepEqual(actual, [1, 3]);
    });

    _.each({
      'literal': 'abc',
      'object': Object('abc')
    },
    function(collection, key) {
      test('should work with a string ' + key + ' for `collection`', function() {
        deepEqual(_.at(collection, [0, 2]), ['a', 'c']);
      });
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.bind');

  (function() {
    test('should append array arguments to partially applied arguments (test in IE < 9)', function() {
      var args,
          bound = _.bind(function() { args = slice.call(arguments); }, {}, 'a');

      bound(['b'], 'c');
      deepEqual(args, ['a', ['b'], 'c']);
    });

    test('ensure `new bound` is an instance of `func`', function() {
      var func = function() {},
          bound = _.bind(func, {});

      ok(new bound instanceof func);
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.bindAll');

  (function() {
    test('should bind all methods of `object`', function() {
      function Foo() {
        this._a = 1;
        this._b = 2;
        this.a = function() { return this._a; };
      };

      Foo.prototype.b = function() {return this._b; };

      var object = new Foo;
      _.bindAll(object);

      var actual = _.map(_.functions(object), function(methodName) {
        return object[methodName].call({});
      });

      deepEqual(actual, [1, 2]);
    });

    test('should accept arrays of method names', function() {
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
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.bindKey');

  (function() {
    test('should work when the target function is overwritten', function() {
      var object = {
        'name': 'moe',
        'greet': function(greeting) {
          return greeting + ': ' + this.name;
        }
      };

      var func = _.bindKey(object, 'greet', 'hi');
      equal(func(), 'hi: moe');

      object.greet = function(greeting) {
        return greeting + ' ' + this.name + '!';
      };
      equal(func(), 'hi moe!');
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('cloning');

  (function() {
    function Klass() { this.a = 1; }
    Klass.prototype = { 'b': 1 };

    var nonCloneable = {
      'an element': window.document && document.body,
      'a function': Klass
    };

    var objects = {
      'an arguments object': arguments,
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

    _.forOwn(objects, function(object, key) {
      test('should deep clone ' + key, function() {
        var clone = _.cloneDeep(object);
        strictEqual(_.isEqual(object, clone), true);

        if (_.isObject(object)) {
          notEqual(clone, object);
        } else {
          skipTest();
        }
      });
    });

    _.forOwn(nonCloneable, function(object, key) {
      test('should not clone ' + key, function() {
        strictEqual(_.clone(object), object);
        strictEqual(_.cloneDeep(object), object);
      });
    });

    test('should shallow clone when used as `callback` for `_.map`', function() {
      var expected = [{ 'a': [0] }, { 'b': [1] }],
          actual = _.map(expected, _.clone);

      ok(actual != expected && actual.a == expected.a && actual.b == expected.b);
    });

    test('should deep clone `index` and `input` array properties', function() {
      var array = /x/.exec('x'),
          actual = _.cloneDeep(array);

      strictEqual(actual.index, 0);
      equal(actual.input, 'x');
    });

    test('should deep clone objects with circular references', function() {
      var object = {
        'foo': { 'b': { 'foo': { 'c': { } } } },
        'bar': { }
      };

      object.foo.b.foo.c = object;
      object.bar.b = object.foo.b;

      var clone = _.cloneDeep(object);
      ok(clone.bar.b === clone.foo.b && clone === clone.foo.b.foo.c && clone !== object);
    });

    test('should clone problem JScript properties (test in IE < 9)', function() {
      deepEqual(_.clone(shadowed), shadowed);
      notEqual(_.clone(shadowed), shadowed);
      deepEqual(_.cloneDeep(shadowed), shadowed);
      notEqual(_.cloneDeep(shadowed), shadowed);
    });

    _.each([
      'clone',
      'cloneDeep'
    ],
    function(methodName) {
      var func = _[methodName],
          klass = new Klass;

      test('_.' + methodName + ' should pass the correct `callback` arguments', function() {
        var args;

        func(klass, function() {
          args || (args = slice.call(arguments));
        });

        deepEqual(args, [klass]);
      });

      test('_.' + methodName + ' should correct set the `this` binding', function() {
        var actual = func('a', function(value) {
          return this[value];
        }, { 'a': 'A' });

        equal(actual, 'A');
      });

      test('_.' + methodName + ' should handle cloning if `callback` returns `undefined`', function() {
        var actual = _.clone({ 'a': { 'b': 'c' } }, function() { });
        deepEqual(actual, { 'a': { 'b': 'c' } });
      });
    });
  }(1, 2, 3));

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.contains');

  (function() {
    _.each({
      'an array': [1, 2, 3, 1, 2, 3],
      'an object': { 'a': 1, 'b': 2, 'c': 3, 'd': 1, 'e': 2, 'f': 3 },
      'a string': '123123'
    },
    function(collection, key) {
      test('should work with ' + key + ' and a positive `fromIndex`', function() {
        strictEqual(_.contains(collection, 1, 2), true);
      });

      test('should work with ' + key + ' and a `fromIndex` >= collection\'s length', function() {
        strictEqual(_.contains(collection, 1, 6), false);
        strictEqual(_.contains(collection, undefined, 6), false);
        strictEqual(_.contains(collection, 1, 8), false);
        strictEqual(_.contains(collection, undefined, 8), false);
      });

      test('should work with ' + key + ' and a negative `fromIndex`', function() {
        strictEqual(_.contains(collection, 2, -3), true);
      });

      test('should work with ' + key + ' and a negative `fromIndex` <= negative collection\'s length', function() {
        strictEqual(_.contains(collection, 1, -6), true);
        strictEqual(_.contains(collection, 2, -8), true);
      });
    });

    _.each({
      'literal': 'abc',
      'object': Object('abc')
    },
    function(collection, key) {
      test('should work with a string ' + key + ' for `collection`', function() {
        strictEqual(_.contains(collection, 'bc'), true);
        strictEqual(_.contains(collection, 'd'), false);
      });
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.countBy');

  (function() {
    test('should only add values to own, not inherited, properties', function() {
      var actual = _.countBy([4.2, 6.1, 6.4], function(num) {
        return Math.floor(num) > 4 ? 'hasOwnProperty' : 'constructor';
      });

      strictEqual(actual.constructor, 1);
      equal(actual.hasOwnProperty, 2);
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.debounce');

  (function() {
    test('subsequent "immediate" debounced calls return the last `func` result', function() {
      var debounced = _.debounce(function(value) { return value; }, 32, true),
          result = [debounced('x'), debounced('y')];

      deepEqual(result, ['x', 'x']);
    });

    asyncTest('subsequent debounced calls return the last `func` result', function() {
      var debounced = _.debounce(function(value) { return value; }, 32);
      debounced('x');

      setTimeout(function() {
        equal(debounced('y'), 'x');
        QUnit.start();
      }, 64);
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.defaults');

  (function() {
    test('should not overwrite `null` values', function() {
      var actual = _.defaults({ 'a': null }, { 'a': 1 });
      strictEqual(actual.a, null);
    });

    test('should overwrite `undefined` values', function() {
      var actual = _.defaults({ 'a': undefined }, { 'a': 1 });
      strictEqual(actual.a, 1);
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.defer');

  (function() {
    asyncTest('should accept additional arguments', function() {
      _.defer(function() {
        deepEqual(slice.call(arguments), [1, 2, 3]);
        QUnit.start();
      }, 1, 2, 3);
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.difference');

  (function() {
    test('should work when using `cachedContains`', function() {
      var array1 = _.range(27),
          array2 = array1.slice(),
          a = {},
          b = {},
          c = {};

      array1.push(a, b, c);
      array2.push(b, c, a);

      deepEqual(_.difference(array1, array2), []);
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.escape');

  (function() {
    test('should not escape the "/" character', function() {
      equal(_.escape('/'), '/');
    });

    test('should escape "\'" to "&#39;"', function() {
      equal(_.escape("'"), "&#39;");
    });

    test('should return an empty string when passed `null` or `undefined`', function() {
      equal(_.escape(null), '');
      equal(_.escape(undefined), '');
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.every');

  (function() {
    test('should return `false` as soon as the `callback` result is falsey', function() {
      strictEqual(_.every([true, null, true], _.identity), false);
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('source property checks');

  _.each(['assign', 'defaults', 'merge'], function(methodName) {
    var func = _[methodName];

    test('lodash.' + methodName + ' should not assign inherited `source` properties', function() {
      function Foo() {}
      Foo.prototype = { 'a': 1 };
      deepEqual(func({}, new Foo), {});
    });

    test('lodash.' + methodName + ' should treat sparse arrays as dense', function() {
      var array = Array(3);
      array[0] = 1;
      array[2] = 3;

      var actual = func([], array),
          expected = array.slice();

      expected[1] = undefined;

      ok(1 in actual);
      deepEqual(actual, expected);
    });
  });

  /*--------------------------------------------------------------------------*/

  QUnit.module('strict mode checks');

  _.each(['assign', 'bindAll', 'defaults'], function(methodName) {
    var func = _[methodName];

    test('lodash.' + methodName + ' should not throw strict mode errors', function() {
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
    test('should not modify the resulting value from within `callback`', function() {
      var actual = _.filter([0], function(value, index, array) {
        return (array[index] = 1);
      });

      deepEqual(actual, [0]);
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.find');

  (function() {
    var objects = [
      { 'a': 0, 'b': 0 },
      { 'a': 1, 'b': 1 },
      { 'a': 2, 'b': 2 }
    ];

    test('should return found `value`', function() {
      equal(_.find(objects, function(object) { return object.a == 1; }), objects[1]);
    });

    test('should return `undefined` if `value` is not found', function() {
      equal(_.find(objects, function(object) { return object.a == 3; }), undefined);
    });

    test('should work with an object for `callback`', function() {
      equal(_.find(objects, { 'b': 2 }), objects[2]);
    });

    test('should work with a string for `callback`', function() {
      equal(_.find(objects, 'b'), objects[1]);
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

    test('should return the first element', function() {
      strictEqual(_.first(array), 1);
    });

    test('should return the first two elements', function() {
      deepEqual(_.first(array, 2), [1, 2]);
    });

    test('should work with a `callback`', function() {
      var actual = _.first(array, function(num) {
        return num < 3;
      });

      deepEqual(actual, [1, 2]);
    });

    test('should pass the correct `callback` arguments', function() {
      var args;

      _.first(array, function() {
        args || (args = slice.call(arguments));
      });

      deepEqual(args, [1, 0, array]);
    });

    test('supports the `thisArg` argument', function() {
      var actual = _.first(array, function(value, index) {
        return this[index] < 3;
      }, array);

      deepEqual(actual, [1, 2]);
    });

    test('should chain when passing `n`, `callback`, or `thisArg`', function() {
      var actual = _(array).first(2);

      ok(actual instanceof _);

      actual = _(array).first(function(num) {
        return num < 3;
      });

      ok(actual instanceof _);

      actual = _(array).first(function(value, index) {
        return this[index] < 3;
      }, array);

      ok(actual instanceof _);
    });

    test('should not chain when no arguments are passed', function() {
      var actual = _(array).first();
      strictEqual(actual, 1);
    });

    test('should work with an object for `callback`', function() {
      deepEqual(_.first(objects, { 'b': 2 }), objects.slice(0, 1));
    });

    test('should work with a string for `callback`', function() {
      deepEqual(_.first(objects, 'b'), objects.slice(0, 2));
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.flatten');

  (function() {
    test('should treat sparse arrays as dense', function() {
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
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.forEach');

  (function() {
    test('returns the collection', function() {
      var collection = [1, 2, 3];
      equal(_.forEach(collection, Boolean), collection);
    });

    _.each({
      'literal': 'abc',
      'object': Object('abc')
    },
    function(collection, key) {
      test('should work with a string ' + key + ' for `collection` (test in IE < 9)', function() {
        var args,
            values = [];

        _.forEach(collection, function(value) {
          args || (args = slice.call(arguments));
          values.push(value);
        });

        deepEqual(args, ['a', 0, collection]);
        deepEqual(values, ['a', 'b', 'c']);
      });
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.forIn');

  (function() {
    test('iterates over inherited properties', function() {
      function Dog(name) { this.name = name; }
      Dog.prototype.bark = function() { /* Woof, woof! */ };

      var keys = [];
      _.forIn(new Dog('Dagny'), function(value, key) { keys.push(key); });
      deepEqual(keys.sort(), ['bark', 'name']);
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.forOwn');

  (function() {
    test('iterates over the `length` property', function() {
      var keys = [],
          object = { '0': 'zero', '1': 'one', 'length': 2 };

      _.forOwn(object, function(value, key) { keys.push(key); });
      deepEqual(keys.sort(), ['0', '1', 'length']);
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('collection iteration bugs');

  _.each(['forEach', 'forIn', 'forOwn'], function(methodName) {
    var func = _[methodName];

    test('lodash.' + methodName + ' fixes the JScript [[DontEnum]] bug (test in IE < 9)', function() {
      var keys = [];
      func(shadowed, function(value, key) { keys.push(key); });
      deepEqual(keys.sort(), shadowedKeys);
    });

    test('lodash.' + methodName + ' skips the prototype property of functions (test in Firefox < 3.6, Opera > 9.50 - Opera < 11.60, and Safari < 5.1)', function() {
      function Foo() {}
      Foo.prototype.a = 1;

      var keys = [];
      function callback(value, key) { keys.push(key); }

      func(Foo, callback);
      deepEqual(keys, []);
      keys.length = 0;

      Foo.prototype = { 'a': 1 };
      func(Foo, callback);
      deepEqual(keys, []);
    });
  });

  /*--------------------------------------------------------------------------*/

  QUnit.module('object assignments');

  _.each(['assign', 'defaults', 'merge'], function(methodName) {
    var func = _[methodName];

    test('lodash.' + methodName + ' should assign problem JScript properties (test in IE < 9)', function() {
      var object = {
        'constructor': 1,
        'hasOwnProperty': 2,
        'isPrototypeOf': 3,
        'propertyIsEnumerable': undefined,
        'toLocaleString': undefined,
        'toString': undefined,
        'valueOf': undefined
      };

      var source = {
        'propertyIsEnumerable': 4,
        'toLocaleString': 5,
        'toString': 6,
        'valueOf': 7
      };

      deepEqual(func(object, source), shadowed);
    });

    test('lodash.' + methodName + ' skips the prototype property of functions (test in Firefox < 3.6, Opera > 9.50 - Opera < 11.60, and Safari < 5.1)', function() {
      function Foo() {}
      Foo.prototype.c = 3;

      Foo.a = 1;
      Foo.b = 2;

      var expected = { 'a': 1, 'b': 2 };
      deepEqual(func({}, Foo), expected);

      Foo.prototype = { 'c': 3 };
      deepEqual(func({}, Foo), expected);
    });

    test('lodash.' + methodName + ' should work with `_.reduce`', function() {
      var actual = { 'a': 1},
          array = [{ 'b': 2 }, { 'c': 3 }];

      _.reduce(array, func, actual);
      deepEqual(actual, { 'a': 1, 'b': 2, 'c': 3});
    });
  });

  _.each(['assign', 'merge'], function(methodName) {
    var func = _[methodName];

    test('lodash.' + methodName + ' should pass the correct `callback` arguments', function() {
      var args;

      func({ 'a': 1 }, { 'a': 2 }, function() {
        args || (args = slice.call(arguments));
      });

      deepEqual(args, [1, 2]);
    });

    test('lodash.' + methodName + ' should correct set the `this` binding', function() {
      var actual = func({}, { 'a': 0 }, function(a, b) {
        return this[b];
      }, [2]);

      deepEqual(actual, { 'a': 2 });
    });

    test('lodash.' + methodName + ' should not treat the second argument as a `callback`', function() {
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

  _.each(['forEach', 'forIn', 'forOwn'], function(methodName) {
    var func = _[methodName];

    test('lodash.' + methodName + ' can exit early when iterating arrays', function() {
      var array = [1, 2, 3],
          values = [];

      func(array, function(value) { values.push(value); return false; });
      deepEqual(values, [1]);
    });

    test('lodash.' + methodName + ' can exit early when iterating objects', function() {
      var object = { 'a': 1, 'b': 2, 'c': 3 },
          values = [];

      func(object, function(value) { values.push(value); return false; });
      equal(values.length, 1);
    });
  });

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.groupBy');

  (function() {
    test('supports the `thisArg` argument', function() {
      var actual = _.groupBy([4.2, 6.1, 6.4], function(num) {
        return this.floor(num);
      }, Math);

      deepEqual(actual, { '4': [4.2], '6': [6.1, 6.4] });
    });

    test('should only add values to own, not inherited, properties', function() {
      var actual = _.groupBy([4.2, 6.1, 6.4], function(num) {
        return Math.floor(num) > 4 ? 'hasOwnProperty' : 'constructor';
      });

      deepEqual(actual.constructor, [4.2]);
      deepEqual(actual.hasOwnProperty, [6.1, 6.4]);
    });

    test('should work with an object for `collection`', function() {
      var actual = _.groupBy({ 'a': 4.2, 'b': 6.1, 'c': 6.4 }, function(num) {
        return Math.floor(num);
      });

      deepEqual(actual, { '4': [4.2], '6': [6.1, 6.4] });
    });

    test('should work with a number for `callback`', function() {
      var array = [
        [1, 'a'],
        [2, 'a'],
        [2, 'b']
      ];

      deepEqual(_.groupBy(array, 0), { '1': [[1 , 'a']], '2': [[2, 'a'], [2, 'b']] });
      deepEqual(_.groupBy(array, 1), { 'a': [[1 , 'a'], [2, 'a']], 'b': [[2, 'b']] });
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.indexOf');

  (function() {
    var array = [1, 2, 3, 1, 2, 3];

    test('should work with a positive `fromIndex`', function() {
      equal(_.indexOf(array, 1, 2), 3);
    });

    test('should work with `fromIndex` >= `array.length`', function() {
      equal(_.indexOf(array, 1, 6), -1);
      equal(_.indexOf(array, undefined, 6), -1);
      equal(_.indexOf(array, 1, 8), -1);
      equal(_.indexOf(array, undefined, 8), -1);
    });

    test('should work with a negative `fromIndex`', function() {
      equal(_.indexOf(array, 2, -3), 4);
    });

    test('should work with a negative `fromIndex` <= `-array.length`', function() {
      strictEqual(_.indexOf(array, 1, -6), 0);
      strictEqual(_.indexOf(array, 2, -8), 1);
    });

    test('should ignore non-number `fromIndex` values', function() {
      strictEqual(_.indexOf([1, 2, 3], 1, '1'), 0);
    });

    test('should work with `isSorted`', function() {
      strictEqual(_.indexOf([1, 2, 3], 1, true), 0);
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

    test('returns all elements for `n` of `0`', function() {
      deepEqual(_.initial(array, 0), [1, 2, 3]);
    });

    test('should allow a falsey `array` argument', function() {
      _.each(falsey, function(index, value) {
        try {
          var actual = index ? _.initial(value) : _.initial();
        } catch(e) { }
        deepEqual(actual, []);
      })
    });

    test('should exclude last element', function() {
      deepEqual(_.initial(array), [1, 2]);
    });

    test('should exlcude the last two elements', function() {
      deepEqual(_.initial(array, 2), [1]);
    });

    test('should work with a `callback`', function() {
      var actual = _.initial(array, function(num) {
        return num > 1;
      });

      deepEqual(actual, [1]);
    });

    test('should pass the correct `callback` arguments', function() {
      var args;

      _.initial(array, function() {
        args || (args = slice.call(arguments));
      });

      deepEqual(args, [3, 2, array]);
    });

    test('supports the `thisArg` argument', function() {
      var actual = _.initial(array, function(value, index) {
        return this[index] > 1;
      }, array);

      deepEqual(actual, [1]);
    });

    test('should work with an object for `callback`', function() {
      deepEqual(_.initial(objects, { 'b': 2 }), objects.slice(0, 2));
    });

    test('should work with a string for `callback`', function() {
      deepEqual(_.initial(objects, 'b'), objects.slice(0, 1));
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.invoke');

  (function() {
    test('should work with an object for `collection`', function() {
      var object = { 'a': 1, 'b': 2, 'c': 3 };
      deepEqual(_.invoke(object, 'toFixed', 1), ['1.0', '2.0', '3.0']);
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.isElement');

  (function() {
    test('should use strict equality in its duck type check', function() {
      var element = window.document ? document.body : { 'nodeType': 1 };
      strictEqual(_.isElement(element), true);

      strictEqual(_.isElement({ 'nodeType': new Number(1) }), false);
      strictEqual(_.isElement({ 'nodeType': true }), false);
      strictEqual(_.isElement({ 'nodeType': [1] }), false);
      strictEqual(_.isElement({ 'nodeType': '1' }), false);
      strictEqual(_.isElement({ 'nodeType': '001' }), false);
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.isEmpty');

  (function() {
    var args = arguments;

    test('fixes the JScript [[DontEnum]] bug (test in IE < 9)', function() {
      equal(_.isEmpty(shadowed), false);
    });

    test('skips the prototype property of functions (test in Firefox < 3.6, Opera > 9.50 - Opera < 11.60, and Safari < 5.1)', function() {
      function Foo() {}
      Foo.prototype.a = 1;
      strictEqual(_.isEmpty(Foo), true);

      Foo.prototype = { 'a': 1 };
      strictEqual(_.isEmpty(Foo), true);
    });

    test('should work with an object that has a `length` property', function() {
      strictEqual(_.isEmpty({ 'length': 0 }), false);
    });

    test('should work with jQuery/MooTools DOM query collections', function() {
      function Foo(elements) { Array.prototype.push.apply(this, elements); }
      Foo.prototype = { 'length': 0, 'splice': Array.prototype.splice };

      strictEqual(_.isEmpty(new Foo([])), true);
    });

    test('should work with `arguments` objects (test in IE < 9)', function() {
      strictEqual(_.isEmpty(args), false);
    });
  }(1, 2, 3));

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.isEqual');

  (function() {
    test('should work with `arguments` objects (test in IE < 9)', function() {
      var args1 = (function() { return arguments; }(1, 2, 3)),
          args2 = (function() { return arguments; }(1, 2, 3)),
          args3 = (function() { return arguments; }(1, 2));

      strictEqual(_.isEqual(args1, args2), true);
      strictEqual(_.isEqual(args1, args3), false);
    });

    test('fixes the JScript [[DontEnum]] bug (test in IE < 9)', function() {
      strictEqual(_.isEqual(shadowed, {}), false);
    });

    test('should return `true` for like-objects from different documents', function() {
      // ensure `_._object` is assigned (unassigned in Opera 10.00)
      if (_._object) {
        var object = { 'a': 1, 'b': 2, 'c': 3 };
        strictEqual(_.isEqual(object, _._object), true);
      } else {
        skipTest();
      }
    });

    test('should return `false` when comparing values with circular references to unlike values', function() {
      var array1 = ['a', null, 'c'],
          array2 = ['a', [], 'c'],
          object1 = { 'a': 1, 'b': null, 'c': 3 },
          object2 = { 'a': 1, 'b': {}, 'c': 3 };

      array1[1] = array1;
      strictEqual(_.isEqual(array1, array2), false);

      object1.b = object1;
      strictEqual(_.isEqual(object1, object2), false);
    });

    test('should pass the correct `callback` arguments', function() {
      var args;

      _.isEqual('a', 'b', function() {
        args || (args = slice.call(arguments));
      });

      deepEqual(args, ['a', 'b']);
    });

    test('should correct set the `this` binding', function() {
      var actual = _.isEqual('a', 'b', function(a, b) {
        return this[a] == this[b];
      }, { 'a': 1, 'b': 1 });

      strictEqual(actual, true);
    });

    test('should handle comparisons if `callback` returns `undefined`', function() {
      var actual = _.isEqual('a', 'a', function() { });
      strictEqual(actual, true);
    });

    test('should return a boolean value even if `callback` does not', function() {
      var actual = _.isEqual('a', 'a', function() { return 'a'; });
      strictEqual(actual, true);

      _.each(falsey, function(value) {
        var actual = _.isEqual('a', 'b', function() { return value; });
        strictEqual(actual, false);
      });
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.isFinite');

  (function() {
    test('should return `false` for non-numeric values', function() {
      strictEqual(_.isFinite(null), false);
      strictEqual(_.isFinite([]), false);
      strictEqual(_.isFinite(true), false);
      strictEqual(_.isFinite(''), false);
      strictEqual(_.isFinite(' '), false);
      strictEqual(_.isFinite('2px'), false);
    });

    test('should return `true` for numeric string values', function() {
      strictEqual(_.isFinite('2'), true);
      strictEqual(_.isFinite('0'), true);
      strictEqual(_.isFinite('08'), true);
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.isObject');

  (function() {
    test('should avoid V8 bug #2291', function() {
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
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.isNaN');

  (function() {
    test('returns `true` for `new Number(NaN)`', function() {
      strictEqual(_.isNaN(new Number(NaN)), true);
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.isNumber');

  (function() {
    test('should avoid `[xpconnect wrapped native prototype]` in Firefox', function() {
      strictEqual(_.isNumber(+"2"), true);
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.isPlainObject');

  (function() {
    test('should detect plain objects', function() {
      function Foo(a) {
        this.a = 1;
      }

      strictEqual(_.isPlainObject(new Foo(1)), false);
      strictEqual(_.isPlainObject([1, 2, 3]), false);
      strictEqual(_.isPlainObject({ 'a': 1 }), true);
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('isType checks');

  _.each([
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
    'isRegExp',
    'isString',
    'isUndefined'
  ],
  function(methodName) {
    var func = _[methodName];

    test('lodash.' + methodName + ' should return a boolean', function() {
      var expected = 'boolean';

      equal(typeof func(arguments), expected);
      equal(typeof func([]), expected);
      equal(typeof func(true), expected);
      equal(typeof func(false), expected);
      equal(typeof func(new Date), expected);
      equal(typeof func(window.document && document.body), expected);
      equal(typeof func({}), expected);
      equal(typeof func(undefined), expected);
      equal(typeof func(Infinity), expected);
      equal(typeof func(_), expected);
      equal(typeof func(NaN), expected);
      equal(typeof func(null), expected);
      equal(typeof func(0), expected);
      equal(typeof func({ 'a': 1 }), expected);
      equal(typeof func('a'), expected);
    });
  });

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.keys');

  (function() {
    var args = arguments;

    test('should work with `arguments` objects (test in IE < 9)', function() {
      deepEqual(_.keys(args), ['0', '1', '2']);
    });

    test('fixes the JScript [[DontEnum]] bug (test in IE < 9)', function() {
      function Foo() {}
      Foo.prototype.a = 1;

      deepEqual(_.keys(Foo.prototype), ['a']);
      deepEqual(_.keys(shadowed).sort(), shadowedKeys);
    });

    test('skips the prototype property of functions (test in Firefox < 3.6, Opera > 9.50 - Opera < 11.60, and Safari < 5.1)', function() {
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

    test('should return the last element', function() {
      equal(_.last(array), 3);
    });

    test('should return the last two elements', function() {
      deepEqual(_.last(array, 2), [2, 3]);
    });

    test('should work with a `callback`', function() {
      var actual = _.last(array, function(num) {
        return num > 1;
      });

      deepEqual(actual, [2, 3]);
    });

    test('should pass the correct `callback` arguments', function() {
      var args;

      _.last(array, function() {
        args || (args = slice.call(arguments));
      });

      deepEqual(args, [3, 2, array]);
    });

    test('supports the `thisArg` argument', function() {
      var actual = _.last(array, function(value, index) {
        return this[index] > 1;
      }, array);

      deepEqual(actual, [2, 3]);
    });

    test('should chain when passing `n`, `callback`, or `thisArg`', function() {
      var actual = _(array).last(2);

      ok(actual instanceof _);

      actual = _(array).last(function(num) {
        return num > 1;
      });

      ok(actual instanceof _);

      actual = _(array).last(function(value, index) {
        return this[index] > 1;
      }, array);

      ok(actual instanceof _);
    });

    test('should not chain when no arguments are passed', function() {
      var actual = _(array).last();
      equal(actual, 3);
    });

    test('should work with an object for `callback`', function() {
      deepEqual(_.last(objects, { 'b': 2 }), objects.slice(-1));
    });

    test('should work with a string for `callback`', function() {
      deepEqual(_.last(objects, 'b'), objects.slice(-2));
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.lastIndexOf');

  (function() {
    var array = [1, 2, 3, 1, 2, 3];

    test('should work with a positive `fromIndex`', function() {
      strictEqual(_.lastIndexOf(array, 1, 2), 0);
    });

    test('should work with `fromIndex` >= `array.length`', function() {
      equal(_.lastIndexOf(array, undefined, 6), -1);
      equal(_.lastIndexOf(array, 1, 6), 3);
      equal(_.lastIndexOf(array, undefined, 8), -1);
      equal(_.lastIndexOf(array, 1, 8), 3);
    });

    test('should work with a negative `fromIndex`', function() {
      strictEqual(_.lastIndexOf(array, 2, -3), 1);
    });

    test('should work with a negative `fromIndex` <= `-array.length`', function() {
      strictEqual(_.lastIndexOf(array, 1, -6), 0);
      equal(_.lastIndexOf(array, 2, -8), -1);
    });

    test('should ignore non-number `fromIndex` values', function() {
      equal(_.lastIndexOf([1, 2, 3], 3, '1'), 2);
      equal(_.lastIndexOf([1, 2, 3], 3, true), 2);
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.map');

  (function() {
    test('should return the correct result when iterating an object', function() {
      var actual = _.map({ 'a': 1, 'b': 2, 'c': 3 }, function(value) {
        return value;
      });
      deepEqual(actual, [1, 2, 3]);
    });

    test('should handle object arguments with non-numeric length properties', function() {
      if (setDescriptor) {
        var object = {};
        setDescriptor(object, 'length', { 'value': 'x' });
        deepEqual(_.map(object, _.identity), []);
      } else {
        skipTest();
      }
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.max and lodash.min object iteration');

  _.each(['max', 'min'], function(methodName) {
    var func = _[methodName];

    test('lodash.' + methodName + ' should iterate an object', function() {
      var actual = func({ 'a': 1, 'b': 2, 'c': 3 });
      equal(actual, methodName == 'max' ? 3 : 1);
    });
  });

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.max and lodash.min string iteration');

  _.each(['max', 'min'], function(methodName) {
    var func = _[methodName];

    test('lodash.' + methodName + ' should iterate a string', function() {
      _.each(['abc', Object('abc')], function(value) {
        var actual = func(value);
        equal(actual, methodName == 'max' ? 'c' : 'a');
      });
    });
  });

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.merge');

  (function() {
    var args = arguments;

    test('should merge `source` into the destination object', function() {
      var names = {
        'stooges': [
          { 'name': 'moe' },
          { 'name': 'larry' }
        ]
      };

      var ages = {
        'stooges': [
          { 'age': 40 },
          { 'age': 50 }
        ]
      };

      var heights = {
        'stooges': [
          { 'height': '5\'4"' },
          { 'height': '5\'5"' }
        ]
      };

      var expected = {
        'stooges': [
          { 'name': 'moe', 'age': 40, 'height': '5\'4"' },
          { 'name': 'larry', 'age': 50, 'height': '5\'5"' }
        ]
      };

      deepEqual(_.merge(names, ages, heights), expected);
    });

    test('should merge sources containing circular references', function() {
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

    test('should not treat `arguments` objects as plain objects', function() {
      var object = {
        'args': args
      };

      var source = {
        'args': { '3': 4 }
      };

      var actual = _.merge(object, source);
      equal(_.isArguments(actual.args), false);
    });

    test('should work with four arguments', function() {
      var expected = { 'a': 4 };
      deepEqual(_.merge({ 'a': 1 }, { 'a': 2 }, { 'a': 3 }, expected), expected);
    });

    test('should assign `null` values', function() {
      var actual = _.merge({ 'a': 1 }, { 'a': null });
      strictEqual(actual.a, null);
    });

    test('should not assign `undefined` values', function() {
      var actual = _.merge({ 'a': 1 }, { 'a': undefined });
      strictEqual(actual.a, 1);
    });

    test('should handle merging if `callback` returns `undefined`', function() {
      var actual = _.merge({ 'a': 1 }, { 'a': 2 }, function() { });
      deepEqual(actual, { 'a': 2 });
    });
  }(1, 2, 3));

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.omit');

  (function() {
    var object = { 'a': 1, 'b': 2 },
        expected = { 'b': 2 };

    test('should accept individual property names', function() {
      deepEqual(_.omit(object, 'a'), expected);
    });

    test('should accept an array of property names', function() {
      deepEqual(_.omit(object, ['a', 'c']), expected);
    });

    test('should accept mixes of individual and arrays of property names', function() {
      deepEqual(_.omit(object, ['a'], 'c'), expected);
    });

    test('should iterate over inherited properties', function() {
      function Foo() {}
      Foo.prototype = object;

      deepEqual(_.omit(new Foo, 'a'), expected);
    });

    test('should work with a `callback` argument', function() {
      var actual = _.omit(object, function(value) {
        return value == 1;
      });

      deepEqual(actual, expected);
    });

    test('should pass the correct `callback` arguments', function() {
      var args,
          lastKey = _.keys(object).pop();

      var expected = lastKey == 'b'
        ? [1, 'a', object]
        : [2, 'b', object];

      _.omit(object, function() {
        args || (args = slice.call(arguments));
      });

      deepEqual(args, expected);
    });

    test('should correct set the `this` binding', function() {
      var actual = _.omit(object, function(value) {
        return value == this.a;
      }, { 'a': 1 });

      deepEqual(actual, expected);
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('partial methods');

  _.each(['partial', 'partialRight'], function(methodName) {
    var func = _[methodName];

    test('lodash.' + methodName + ' partially applies an argument, without additional arguments', function() {
      var arg = 'a',
          fn = function(x) { return x; };

      equal(func(fn, arg)(), arg);
    });

    test('lodash.' + methodName + ' partially applies an argument, with additional arguments', function() {
      var arg1 = 'a',
          arg2 = 'b',
          expected = [arg1, arg2],
          fn = function(x, y) { return [x, y]; };

      if (methodName == 'partialRight') {
        expected.reverse();
      }
      deepEqual(func(fn, arg1)(arg2), expected);
    });

    test('lodash.' + methodName + ' works without partially applying arguments, without additional arguments', function() {
      var fn = function() { return arguments.length; };
      strictEqual(func(fn)(), 0);
    });

    test('lodash.' + methodName + ' works without partially applying arguments, with additional arguments', function() {
      var arg = 'a',
          fn = function(x) { return x; };

      equal(func(fn)(arg), arg);
    });

    test('lodash.' + methodName + ' should not alter the `this` binding of either function', function() {
      var object = { 'a': 1 },
          fn = function() { return this.a; };

      strictEqual(func(_.bind(fn, object))(), object.a);
      strictEqual(_.bind(func(fn), object)(), object.a);
    });
  });

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.partialRight');

  (function() {
    test('should work as a deep `_.defaults`', function() {
      var object = { 'a': { 'b': 1 } },
          source = { 'a': { 'b': 2, 'c': 3 } },
          expected = { 'a': { 'b': 1, 'c': 3 } };

      var deepDefaults = _.partialRight(_.merge, _.defaults);
      deepEqual(deepDefaults(object, source), expected);
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.pick');

  (function() {
    var object = { 'a': 1, 'b': 2 };

    test('should iterate over inherited properties', function() {
      function Foo() {}
      Foo.prototype = object;

      deepEqual(_.pick(new Foo, 'b'), { 'b': 2 });
    });

    test('should work with a `callback` argument', function() {
      var actual = _.pick(object, function(value) {
        return value == 2;
      });

      deepEqual(actual, { 'b': 2 });
    });

    test('should pass the correct `callback` arguments', function() {
      var args,
          lastKey = _.keys(object).pop();

      var expected = lastKey == 'b'
        ? [1, 'a', object]
        : [2, 'b', object];

      _.pick(object, function() {
        args || (args = slice.call(arguments));
      });

      deepEqual(args, expected);
    });

    test('should correct set the `this` binding', function() {
      var actual = _.pick(object, function(value) {
        return value == this.b;
      }, { 'b': 2 });

      deepEqual(actual, { 'b': 2 });
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.pluck');

  (function() {
    test('should work with an object for `collection`', function() {
      var object = { 'a': [1], 'b': [1, 2], 'c': [1, 2, 3] };
      deepEqual(_.pluck(object, 'length'), [1, 2, 3]);
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.random');

  (function() {
    test('should return `0` or `1` when no arguments are passed', function() {
      var actual = _.random();
      ok(actual === 0 || actual === 1);
    });

    test('supports not passing a `max` argument', function() {
      var actual = _.random(5),
          start = new Date;

      while ((new Date - start) < 50 && actual == 5) {
        actual = _.random(5);
      }
      notEqual(actual, 5);
    });

    test('supports large integer values', function() {
      var array = Array(1000),
          min = Math.pow(2, 31),
          max = Math.pow(2, 62);

      strictEqual(_.every(array, function() {
        return _.random(min, max) >= min;
      }), true);

      strictEqual(_.some(array, function() {
        return _.random(Number.MAX_VALUE) > 0;
      }), true);
    });

    test('should coerce arguments to numbers', function() {
      strictEqual(_.random('1', '1'), 1);
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.range');

  (function() {
    var func = _.range;

    test('should treat falsey `start` arguments as `0`', function() {
      _.each(falsey, function(value, index) {
        if (index) {
          deepEqual(_.range(value), []);
          deepEqual(_.range(value, 1), [0]);
        } else {
          deepEqual(_.range(), []);
        }
      });
    });

    test('should coerce arguments to numbers', function() {
      var actual = [func('0',1), func('1'), func(0, 1, '1')];
      deepEqual(actual, [[0], [0], [0]]);
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.reduce');

  (function() {
    test('should pass the correct `callback` arguments', function() {
      var args,
          array = [1, 2, 3];

      _.reduce(array, function() {
        args || (args = slice.call(arguments));
      });

      deepEqual(args, [1, 2, 1, array]);
    });

    _.each({
      'literal': 'abc',
      'object': Object('abc')
    },
    function(collection, key) {
      test('should work with a string ' + key + ' for `collection` (test in IE < 9)', function() {
        var args;

        var actual = _.reduce(collection, function(accumulator, value) {
          args || (args = slice.call(arguments));
          return accumulator + value;
        });

        deepEqual(args, ['a', 'b', 1, collection]);
        equal(actual, 'abc');
      });
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.reduceRight');

  (function() {
    test('should pass the correct `callback` arguments when iterating an array', function() {
      var args,
          array = [1, 2, 3];

      _.reduceRight(array, function() {
        args || (args = slice.call(arguments));
      });

      deepEqual(args, [3, 2, 1, array]);
    });

    test('should pass the correct `callback` arguments when iterating an object', function() {
      var args,
          object = { 'a': 1, 'b': 2 },
          lastKey = _.keys(object).pop();

      var expected = lastKey == 'b'
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
      test('should work with a string ' + key + ' for `collection` (test in IE < 9)', function() {
        var args;

        var actual = _.reduceRight(collection, function(accumulator, value) {
          args || (args = slice.call(arguments));
          return accumulator + value;
        });

        deepEqual(args, ['c', 'b', 1, collection]);
        equal(actual, 'cba');
      });
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.result');

  (function() {
    test('should return `undefined` when passed a falsey `object` argument', function() {
      strictEqual(_.result(), undefined);
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

    test('returns all elements for `n` of `0`', function() {
      deepEqual(_.rest(array, 0), [1, 2, 3]);
    });

    test('should allow a falsey `array` argument', function() {
      _.each(falsey, function(index, value) {
        try {
          var actual = index ? _.rest(value) : _.rest();
        } catch(e) { }
        deepEqual(actual, []);
      })
    });

    test('should exclude the first element', function() {
      deepEqual(_.rest(array), [2, 3]);
    });

    test('should exclude the first two elements', function() {
      deepEqual(_.rest(array, 2), [3]);
    });

    test('should work with a `callback`', function() {
      var actual = _.rest(array, function(num) {
        return num < 3;
      });

      deepEqual(actual, [3]);
    });

    test('should pass the correct `callback` arguments', function() {
      var args;

      _.rest(array, function() {
        args || (args = slice.call(arguments));
      });

      deepEqual(args, [1, 0, array]);
    });

    test('supports the `thisArg` argument', function() {
      var actual = _.rest(array, function(value, index) {
        return this[index] < 3;
      }, array);

      deepEqual(actual, [3]);
    });

    test('should work with an object for `callback`', function() {
      deepEqual(_.rest(objects, { 'b': 2 }), objects.slice(-2));
    });

    test('should work with a string for `callback`', function() {
      deepEqual(_.rest(objects, 'b'), objects.slice(-1));
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.shuffle');

  (function() {
    test('should shuffle an object', function() {
      var actual = _.shuffle({ 'a': 1, 'b': 2, 'c': 3 });
      deepEqual(actual.sort(), [1, 2, 3]);
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.size');

  (function() {
    var args = arguments;

    test('should allow a falsey `object` argument', function() {
      _.each(falsey, function(index, value) {
        try {
          var actual = index ? _.size(value) : _.size();
        } catch(e) { }
        strictEqual(actual, 0);
      })
    });

    test('should work with jQuery/MooTools DOM query collections', function() {
      function Foo(elements) { Array.prototype.push.apply(this, elements); }
      Foo.prototype = { 'length': 0, 'splice': Array.prototype.splice };

      equal(_.size(new Foo([1, 2, 3])), 3);
    });

    test('should work with `arguments` objects (test in IE < 9)', function() {
      equal(_.size(args), 3);
    });

    test('fixes the JScript [[DontEnum]] bug (test in IE < 9)', function() {
      equal(_.size(shadowed), 7);
    });

    _.each({
      'literal': 'abc',
      'object': Object('abc')
    },
    function(collection, key) {
      test('should work with a string ' + key + ' for `collection`', function() {
        deepEqual(_.size(collection), 3);
      });
    });
  }(1, 2, 3));


  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.some');

  (function() {
    test('should return `true` as soon as the `callback` result is truthy', function() {
      strictEqual(_.some([null, true, null], _.identity), true);
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.sortBy');

  (function() {
    test('should perform a stable sort (test in IE > 8, Opera, and V8)', function() {
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

    test('supports the `thisArg` argument', function() {
      var actual = _.sortBy([1, 2, 3], function(num) {
        return this.sin(num);
      }, Math);

      deepEqual(actual, [3, 1, 2]);
    });

    test('should work with an object for `collection`', function() {
      var actual = _.sortBy({ 'a': 1, 'b': 2, 'c': 3 }, function(num) {
        return Math.sin(num);
      });

      deepEqual(actual, [3, 1, 2]);
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.sortedIndex');

  (function() {
    test('supports the `thisArg` argument', function() {
      var actual = _.sortedIndex([1, 2, 3], 4, function(num) {
        return this.sin(num);
      }, Math);

      strictEqual(actual, 0);
    });

    test('supports arrays with lengths larger than `Math.pow(2, 31) - 1`', function() {
      var length = Math.pow(2, 32) - 1,
          index = length - 1,
          array = Array(length),
          steps = 0;

      array[index] = index;
      _.sortedIndex(array, index, function() { steps++; });
      equal(steps, 33);
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.template');

  (function() {
    test('supports recursive calls', function() {
      var compiled = _.template('<%= a %><% a = _.template(c, obj) %><%= a %>'),
          data = { 'a': 'A', 'b': 'B', 'c': '<%= b %>' };

      equal(compiled(data), 'AB');
    });

    test('should not augment the `options` object', function() {
      var options = {};
      _.template('', null, options);
      deepEqual(options, {});
    });

    test('should provide the template source when a SyntaxError occurs', function() {
      try {
        _.template('<% if x %>');
      } catch(e) {
        var source = e.source;
      }
      ok(/__p/.test(source));
    });

    test('should work with complex "interpolate" delimiters', function() {
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

        equal(compiled(data), value, key);
      });
    });

    test('should allow referencing variables declared in "evaluate" delimiters from other delimiters', function() {
      var compiled = _.template('<% var b = a; %><%= b.value %>'),
          data = { 'a': { 'value': 1 } };

      equal(compiled(data), '1');
    });

    test('should work when passing `options.variable`', function() {
      var compiled = _.template(
        '<% _.forEach( data.a, function( value ) { %>' +
            '<%= value.valueOf() %>' +
        '<% }) %>', null, { 'variable': 'data' }
      );

      var data = { 'a': [1, 2, 3] };

      try {
        equal(compiled(data), '123');
      } catch(e) {
        ok(false);
      }
    });

    test('should not error with IE conditional comments enabled (test with development build)', function() {
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

    test('should tokenize delimiters', function() {
      var compiled = _.template('<span class="icon-<%= type %>2"></span>'),
          data = { 'type': 1 };

      equal(compiled(data), '<span class="icon-12"></span>');
    });

    test('should work with "interpolate" delimiters containing ternary operators', function() {
      var compiled = _.template('<%= value ? value : "b" %>'),
          data = { 'value': 'a' };

      equal(compiled(data), 'a');
    });

    test('should work with "interpolate" delimiters containing global values', function() {
      var compiled = _.template('<%= typeof QUnit.init %>');

      try {
        var actual = compiled();
      } catch(e) { }

      equal(actual, 'function');
    });

    test('should parse delimiters with newlines', function() {
      var expected = '<<\nprint("<p>" + (value ? "yes" : "no") + "</p>")\n>>',
          compiled = _.template(expected, null, { 'evaluate': /<<(.+?)>>/g }),
          data = { 'value': true };

      equal(compiled(data), expected);
    });

    test('should parse ES6 template delimiters', function() {
      var data = { 'value': 2 };
      equal(_.template('1${value}3', data), '123');
      equal(_.template('${"{" + value + "\\}"}', data), '{2}');
    });

    test('supports the "imports" option', function() {
      var options = { 'imports': { 'a': 1 } },
          compiled = _.template('<%= a %>', null, options);

      equal(compiled({}), '1');
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.throttle');

  (function() {
    test('subsequent calls should return the result of the first call', function() {
      var throttled = _.throttle(function(value) { return value; }, 32),
          result = [throttled('x'), throttled('y')];

      deepEqual(result, ['x', 'x']);
    });

    test('should clear timeout when `func` is called', function() {
      var counter = 0,
          oldDate = Date,
          throttled = _.throttle(function() { counter++; }, 32);

      throttled();
      throttled();

      window.Date = function() { return Object(Infinity); };
      throttled();
      window.Date = oldDate;

      equal(counter, 2);
    });

    asyncTest('supports recursive calls', function() {
      var counter = 0;
      var throttled = _.throttle(function() {
        counter++;
        if (counter < 10) {
          throttled();
        }
      }, 32);

      throttled();
      equal(counter, 1);

      setTimeout(function() {
        ok(counter < 3)
        QUnit.start();
      }, 32);
    });

    asyncTest('should not trigger a trailing call when invoked once', function() {
      var counter = 0,
          throttled = _.throttle(function() { counter++; }, 32);

      throttled();
      equal(counter, 1);

      setTimeout(function() {
        equal(counter, 1);
        QUnit.start();
      }, 96);
    });

    asyncTest('should trigger trailing call when invoked repeatedly', function() {
      var counter = 0,
          limit = 48,
          throttled = _.throttle(function() { counter++; }, 32),
          start = new Date;

      while ((new Date - start) < limit) {
        throttled();
      }
      var lastCount = counter;
      ok(lastCount > 1);

      setTimeout(function() {
        ok(counter > lastCount);
        QUnit.start();
      }, 96);
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.toArray');

  (function() {
    var args = arguments;

    test('should return a dense array', function() {
      var array = Array(3);
      array[1] = 2;

      var actual = _.toArray(array);

      ok(0 in actual);
      ok(2 in actual);
      deepEqual(actual, array);
    });

    test('should treat array-like objects like arrays', function() {
      var object = { '0': 'a', '1': 'b', '2': 'c', 'length': 3 };
      deepEqual(_.toArray(object), ['a', 'b', 'c']);
      deepEqual(_.toArray(args), [1, 2, 3]);
    });

    test('should work with a string for `collection` (test in Opera < 10.52)', function() {
      deepEqual(_.toArray('abc'), ['a', 'b', 'c']);
      deepEqual(_.toArray(Object('abc')), ['a', 'b', 'c']);
    });

    test('should work with a node list for `collection` (test in IE < 9)', function() {
      if (window.document) {
        try {
          var nodeList = document.getElementsByTagName('body'),
              body = nodeList[0],
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
    test('should return an array of the results of each `callback` execution', function() {
      deepEqual(_.times(3, function(n) { return n * 2; }), [0, 2, 4]);
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.unescape');

  (function() {
    var escaped = '&amp;&lt;&gt;&quot;&#39;\/',
        unescaped = '&<>"\'\/';

    test('should unescape entities in the correct order', function() {
      equal(_.unescape('&amp;lt;'), '&lt;');
    });

    test('should unescape the proper entities', function() {
      equal(_.unescape(escaped), unescaped);
    });

    test('should unescape the same characters escaped by `_.escape`', function() {
      equal(_.unescape(_.escape(unescaped)), unescaped);
    });

    test('should return an empty string when passed `null` or `undefined`', function() {
      equal(_.unescape(null), '');
      equal(_.unescape(undefined), '');
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.uniq');

  (function() {
    test('supports the `thisArg` argument', function() {
      var actual = _.uniq([1, 2, 1.5, 3, 2.5], function(num) {
        return this.floor(num);
      }, Math);

      deepEqual(actual, [1, 2, 3]);
    });

    test('should distinguish between numbers and numeric strings', function() {
      var expected = ['2', 2, Object('2'), Object(2)],
          actual = _.uniq(expected);

      deepEqual(actual, expected);
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.uniqueId');

  (function() {
    test('should return a string value when not passing a prefix argument', function() {
      equal(typeof _.uniqueId(), 'string');
    });

    test('should coerce the prefix argument to a string', function() {
      var actual = [_.uniqueId(3), _.uniqueId(2), _.uniqueId(1)];
      ok(/3\d+,2\d+,1\d+/.test(actual));
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.where');

  (function() {
    var array = [
      { 'a': 1 },
      { 'a': 1 },
      { 'a': 1, 'b': 2 },
      { 'a': 2, 'b': 2 },
      { 'a': 3 }
    ];

    test('should filter by properties', function() {
      deepEqual(_.where(array, { 'a': 1 }), [{ 'a': 1 }, { 'a': 1 }, { 'a': 1, 'b': 2 }]);
      deepEqual(_.where(array, { 'a': 2 }), [{ 'a': 2, 'b': 2 }]);
      deepEqual(_.where(array, { 'a': 3 }), [{ 'a': 3 }]);
      deepEqual(_.where(array, { 'b': 1 }), []);
      deepEqual(_.where(array, { 'b': 2 }), [{ 'a': 1, 'b': 2 }, { 'a': 2, 'b': 2 }]);
      deepEqual(_.where(array, { 'a': 1, 'b': 2 }), [{ 'a': 1, 'b': 2 }]);
    });

    test('should not filter by inherited properties', function() {
      function Foo() {}
      Foo.prototype = { 'a': 2 };

      var properties = new Foo;
      properties.b = 2;
      deepEqual(_.where(array, properties), [{ 'a': 1, 'b': 2 }, { 'a': 2, 'b': 2 }]);
    });

    test('should filter by problem JScript properties (test in IE < 9)', function() {
      var collection = [shadowed];
      deepEqual(_.where(collection, shadowed), [shadowed]);
    });

    test('should work with an object for `collection`', function() {
      var collection = {
        'x': { 'a': 1 },
        'y': { 'a': 3 },
        'z': { 'a': 1, 'b': 2 }
      };

      deepEqual(_.where(collection, { 'a': 1 }), [{ 'a': 1 }, { 'a': 1, 'b': 2 }]);
    });

    test('should return an empty array when passed an empty `properties` object', function() {
      deepEqual(_.where(array, {}), []);
    });

    test('should deep compare `properties` values', function() {
      var collection = [{ 'a': { 'b': { 'c': 1, 'd': 2 }, 'e': 3 }, 'f': 4 }],
          expected = _.cloneDeep(collection);

      deepEqual(_.where(collection, { 'a': { 'b': { 'c': 1 } } }), expected);
    });

    test('should search of arrays for values', function() {
      var collection = [{ 'a': [1, 2] }],
          expected = _.cloneDeep(collection);

      deepEqual(_.where(collection, { 'a': [] }), []);
      deepEqual(_.where(collection, { 'a': [2] }), expected);
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash(...).shift');

  (function() {
    test('should remove the value at index `0` when length is `0` (test in IE 8 compatibility mode)', function() {
      var wrapped = _({ '0': 1, 'length': 1 });
      wrapped.shift();

      deepEqual(wrapped.keys().value(), ['length']);
      equal(wrapped.first(), undefined);
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash(...).splice');

  (function() {
    test('should remove the value at index `0` when length is `0` (test in IE < 9, and in compatibility mode for IE9)', function() {
      var wrapped = _({ '0': 1, 'length': 1 });
      wrapped.splice(0, 1);

      deepEqual(wrapped.keys().value(), ['length']);
      equal(wrapped.first(), undefined);
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash(...).toString');

  (function() {
    test('should return the `toString` result of the wrapped value', function() {
      var wrapped = _([1, 2, 3]);
      equal(String(wrapped), '1,2,3');
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash(...).valueOf');

  (function() {
    test('should return the `valueOf` result of the wrapped value', function() {
      var wrapped = _(123);
      equal(Number(wrapped), 123);
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash(...) methods that return wrapped values');

  (function() {
    var array = [1, 2, 3],
        wrapped = _(array);

    var funcs = [
      'concat',
      'splice'
    ];

    _.each(funcs, function(methodName) {
      test('_.' + methodName + ' should return a wrapped value', function() {
        ok(wrapped[methodName]() instanceof _);
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

    _.each(funcs, function(methodName) {
      test('_.' + methodName + ' should return an unwrapped value', function() {
        var result = methodName == 'reduceRight'
          ? wrapped[methodName](_.identity)
          : wrapped[methodName]();

        equal(result instanceof _, false);
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
      'last'
    ];

    _.each(funcs, function(methodName) {
      test('_.' + methodName + ' should return an unwrapped value', function() {
        equal(typeof wrapped[methodName](), 'number');
      });

      test('_.' + methodName + ' should return a wrapped value', function() {
        ok(wrapped[methodName](1) instanceof _);
      });
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash methods');

  (function() {
    test('should allow falsey arguments', function() {
      var isExported = '_' in window,
          oldDash = window._;

      var returnArrays = [
        'filter',
        'invoke',
        'map',
        'pluck',
        'reject',
        'shuffle',
        'sortBy',
        'toArray',
        'where'
      ];

      var funcs = _.without.apply(_, [_.functions(_)].concat([
        '_',
        '_each',
        '_iteratorTemplate',
        'after',
        'bind',
        'bindAll',
        'compose',
        'debounce',
        'defer',
        'delay',
        'functions',
        'memoize',
        'once',
        'partial',
        'tap',
        'throttle',
        'wrap'
      ]));

      _.each(funcs, function(methodName) {
        var actual = [],
            expected = _.times(falsey.length, function() { return []; }),
            func = _[methodName],
            pass = true;

        _.each(falsey, function(value, index) {
          try {
            actual.push(index ? func(value) : func());
          } catch(e) {
            pass = false;
          }
        });

        if (methodName == 'noConflict') {
          if (isExported) {
            window._ = oldDash;
          } else {
            delete window._;
          }
        }
        if (_.indexOf(returnArrays, methodName) > -1) {
          deepEqual(actual, expected, '_.' + methodName + ' returns an array');
        }
        ok(pass, '_.' + methodName + ' allows falsey arguments');
      });
    });

    test('should handle `null` `thisArg` arguments', function() {
      var thisArg,
          array = ['a'],
          callback = function() { thisArg = this; },
          expected = (function() { return this; }).call(null);

      var funcs = [
        'countBy',
        'every',
        'filter',
        'find',
        'forEach',
        'forIn',
        'forOwn',
        'groupBy',
        'map',
        'max',
        'min',
        'omit',
        'pick',
        'reduce',
        'reduceRight',
        'reject',
        'some',
        'sortBy',
        'sortedIndex',
        'times',
        'uniq'
      ];

      _.each(funcs, function(methodName) {
        var func = _[methodName],
            message = '_.' + methodName + ' handles `null` `thisArg` arguments';

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
  }());

  /*--------------------------------------------------------------------------*/

  // configure QUnit and call `QUnit.start()` for Narwhal, Node.js, PhantomJS, Rhino, and RingoJS
  if (!window.document || window.phantom) {
    QUnit.config.noglobals = true;
    QUnit.start();
  }
}(typeof global == 'object' && global || this));
