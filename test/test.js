;(function(window, undefined) {
  'use strict';

  /** Use a single load function */
  var load = typeof require == 'function' ? require : window.load;

  /** The `platform` object to check */
  var platform =
    window.platform ||
    load('../vendor/platform.js/platform.js') ||
    window.platform;

  /** The unit testing framework */
  var QUnit =
    window.QUnit || (
      window.setTimeout || (window.addEventListener = window.setTimeout = / /),
      window.QUnit = load('../vendor/qunit/qunit/qunit' + (platform.name == 'Narwhal' ? '-1.8.0' : '') + '.js') || window.QUnit,
      load('../vendor/qunit-clib/qunit-clib.js'),
      (window.addEventListener || 0).test && delete window.addEventListener,
      window.QUnit
    );

  /** The `lodash` function to test */
  var _ =
    window._ || (
      _ = load('../lodash.js') || window._,
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
    if (!window.document) {
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
  QUnit.module('lodash');

  (function() {
    // ensure this test is executed before any other template tests to avoid false positives
    test('should initialize `reEvaluateDelimiter` (test with production build)', function() {
      var data = { 'a': [1, 2] },
          settings = _.templateSettings;

      _.templateSettings = { 'interpolate': /\{\{(.+?)\}\}/g };
      equal(_.template('{{ a.join(",") }}', data), '1,2');
      _.templateSettings = settings;
    });

    test('supports loading lodash.js as the "lodash" module', function() {
      if (window.document && window.require) {
        equal((lodashModule || {}).moduleName, 'lodash');
      } else {
        skipTest();
      }
    });

    test('supports loading lodash.js with the Require.js "shim" configuration option', function() {
      if (window.document && window.require) {
        equal((shimmedModule || {}).moduleName, 'shimmed');
      } else {
        skipTest();
      }
    });

    test('supports loading lodash.js as the "underscore" module', function() {
      if (window.document && window.require) {
        equal((underscoreModule || {}).moduleName, 'underscore');
      } else {
        skipTest();
      }
    });

    test('avoids overwritten native methods', function() {
      if (window.document) {
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

  QUnit.module('lodash.bind');

  (function() {
    test('should append array arguments to partially applied arguments (test in IE < 9)', function() {
      var args,
          bound = _.bind(function() { args = slice.call(arguments); }, {}, 'a');

      bound(['b'], 'c');
      deepEqual(args, ['a', ['b'], 'c']);
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.clone');

  (function() {
    function Klass() { this.a = 1; }
    Klass.prototype = { 'b': 1 };

    var nonCloneable = {
      'an arguments object': arguments,
      'an element': window.document && document.body,
      'a function': Klass,
      'a Klass instance': new Klass
    };

    var objects = {
      'an array': ['a', 'b', 'c', ''],
      'an array-like-object': { '0': 'a', '1': 'b', '2': 'c',  '3': '', 'length': 5 },
      'boolean': false,
      'boolean object': Object(false),
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
        var clone = _.clone(object, true);
        ok(_.isEqual(object, clone));

        if (_.isObject(object)) {
          ok(clone !== object);
        } else {
          skipTest();
        }
      });
    });

    _.forOwn(nonCloneable, function(object, key) {
      test('should not clone ' + key, function() {
        ok(_.clone(object) === object);
        ok(_.clone(object, true) === object);
      });
    });

    test('should shallow clone when used as `callback` for `_.map`', function() {
      var expected = [{ 'a': [0] }, { 'b': [1] }],
          actual = _.map(expected, _.clone);

      ok(actual != expected && actual.a == expected.a && actual.b == expected.b);
    });

    test('should deep clone objects with circular references', function() {
      var object = {
        'foo': { 'b': { 'foo': { 'c': { } } } },
        'bar': { }
      };

      object.foo.b.foo.c = object;
      object.bar.b = object.foo.b;

      var clone = _.clone(object, true);
      ok(clone.bar.b === clone.foo.b && clone === clone.foo.b.foo.c && clone !== object);
    });

    test('should clone problem JScript properties (test in IE < 9)', function() {
      deepEqual(_.clone(shadowed), shadowed);
      ok(_.clone(shadowed) != shadowed);
      deepEqual(_.clone(shadowed, true), shadowed);
      ok(_.clone(shadowed, true) != shadowed);
    });
  }(1, 2, 3));

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.contains');

  (function() {
    _.each({
      'literal': 'abc',
      'object': Object('abc')
    },
    function(collection, key) {
      test('should work with a string ' + key + ' for `collection`', function() {
        equal(_.contains(collection, 'bc'), true);
        equal(_.contains(collection, 'd'), false);
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

      equal(actual.constructor, 1);
      equal(actual.hasOwnProperty, 2);
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.debounce');

  (function() {
    asyncTest('subsequent debounced calls return the last `func` result', function() {
      var debounced = _.debounce(function(value) { return value; }, 100);
      debounced('x');

      setTimeout(function() {
        equal(debounced('y'), 'x');
        QUnit.start();
      }, 220);
    });

    test('subsequent "immediate" debounced calls return the last `func` result', function() {
      var debounced = _.debounce(function(value) { return value; }, 100, true),
          result = [debounced('x'), debounced('y')];

      deepEqual(result, ['x', 'x']);
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

    test('should return an empty string when passed `null` or `undefined`', function() {
      equal(_.escape(null), '');
      equal(_.escape(undefined), '');
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.extend');

  (function() {
    test('should not error on `null` or `undefined` sources (test in IE < 9)', function() {
      try {
        deepEqual(_.extend({}, null, undefined, { 'a': 1 }), { 'a': 1 });
      } catch(e) {
        ok(false);
      }
    });

    test('skips the prototype property of functions (test in Firefox < 3.6, Opera > 9.50 - Opera < 11.60, and Safari < 5.1)', function() {
      function Foo() {}
      Foo.prototype.c = 3;

      Foo.a = 1;
      Foo.b = 2;

      var expected = { 'a': 1, 'b': 2 };
      deepEqual(_.extend({}, Foo), expected);

      Foo.prototype = { 'c': 3 };
      deepEqual(_.extend({}, Foo), expected);
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('strict mode checks');

  _.each(['bindAll', 'defaults', 'extend'], function(methodName) {
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
    var array = [1, 2, 3];

    test('should return found `value`', function() {
      equal(_.find(array, function(n) { return n > 2; }), 3);
    });

    test('should return `undefined` if `value` is not found', function() {
      equal(_.find(array, function(n) { return n == 4; }), undefined);
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
      ok('4' in actual1);

      deepEqual(actual2, expected);
      ok('4' in actual2);
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

  QUnit.module('object iteration bugs');

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
      equal(_.indexOf(array, 1, -6), 0);
      equal(_.indexOf(array, 2, -8), 1);
    });

    test('should ignore non-number `fromIndex` values', function() {
      equal(_.indexOf([1, 2, 3], 1, '1'), 0);
    });

    test('should work with `isSorted`', function() {
      equal(_.indexOf([1, 2, 3], 1, true), 0);
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.initial');

  (function() {
    test('returns an empty collection for `n` of `0`', function() {
      var array = [1, 2, 3];
      deepEqual(_.initial(array, 0), []);
    });

    test('should allow a falsey `array` argument', function() {
      _.each(falsey, function(index, value) {
        try {
          var actual = index ? _.initial(value) : _.initial();
        } catch(e) { }
        deepEqual(actual, []);
      })
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
      equal(_.isElement(element), true);

      equal(_.isElement({ 'nodeType': new Number(1) }), false);
      equal(_.isElement({ 'nodeType': true }), false);
      equal(_.isElement({ 'nodeType': [1] }), false);
      equal(_.isElement({ 'nodeType': '1' }), false);
      equal(_.isElement({ 'nodeType': '001' }), false);
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
      equal(_.isEmpty(Foo), true);

      Foo.prototype = { 'a': 1 };
      equal(_.isEmpty(Foo), true);
    });

    test('should work with an object that has a `length` property', function() {
      equal(_.isEmpty({ 'length': 0 }), false);
    });

    test('should work with jQuery/MooTools DOM query collections', function() {
      function Foo(elements) { Array.prototype.push.apply(this, elements); }
      Foo.prototype = { 'length': 0, 'splice': Array.prototype.splice };

      equal(_.isEmpty(new Foo([])), true);
    });

    test('should work with `arguments` objects (test in IE < 9)', function() {
      equal(_.isEmpty(args), false);
    });
  }(1, 2, 3));

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.isEqual');

  (function() {
    test('should work with `arguments` objects (test in IE < 9)', function() {
      var args1 = (function() { return arguments; }(1, 2, 3)),
          args2 = (function() { return arguments; }(1, 2, 3)),
          args3 = (function() { return arguments; }(1, 2));

      equal(_.isEqual(args1, args2), true);
      equal(_.isEqual(args1, args3), false);
    });

    test('fixes the JScript [[DontEnum]] bug (test in IE < 9)', function() {
      equal(_.isEqual(shadowed, {}), false);
    });

    test('should return `true` for like-objects from different documents', function() {
      // ensure `_._object` is assigned (unassigned in Opera 10.00)
      if (_._object) {
        var object = { 'a': 1, 'b': 2, 'c': 3 };
        equal(_.isEqual(object, _._object), true);
      }
      else {
        skipTest();
      }
    });

    test('should return `false` when comparing values with circular references to unlike values', function() {
      var array1 = ['a', null, 'c'],
          array2 = ['a', [], 'c'],
          object1 = { 'a': 1, 'b': null, 'c': 3 },
          object2 = { 'a': 1, 'b': {}, 'c': 3 };

      array1[1] = array1;
      equal(_.isEqual(array1, array2), false);

      object1.b = object1;
      equal(_.isEqual(object1, object2), false);
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
      equal(_.isNaN(new Number(NaN)), true)
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.isPlainObject');

  (function() {
    test('should detect plain objects', function() {
      function Foo(a) {
        this.a = 1;
      }

      equal(_.isPlainObject(new Foo(1)), false);
      equal(_.isPlainObject([1, 2, 3]), false);
      equal(_.isPlainObject({ 'a': 1 }), true);
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
  ], function(methodName) {
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

  QUnit.module('lodash.lastIndexOf');

  (function() {
    var array = [1, 2, 3, 1, 2, 3];

    test('should work with a positive `fromIndex`', function() {
      equal(_.lastIndexOf(array, 1, 2), 0);
    });

    test('should work with `fromIndex` >= `array.length`', function() {
      equal(_.lastIndexOf(array, undefined, 6), -1);
      equal(_.lastIndexOf(array, 1, 6), 3);
      equal(_.lastIndexOf(array, undefined, 8), -1);
      equal(_.lastIndexOf(array, 1, 8), 3);
    });

    test('should work with a negative `fromIndex`', function() {
      equal(_.lastIndexOf(array, 2, -3), 1);
    });

    test('should work with a negative `fromIndex` <= `-array.length`', function() {
      equal(_.lastIndexOf(array, 1, -6), 0);
      equal(_.lastIndexOf(array, 2, -8), -1);
    });

    test('should ignore non-number `fromIndex` values', function() {
      equal(_.lastIndexOf([1, 2, 3], 3, '1'), 2);
      equal(_.lastIndexOf([1, 2, 3], 3, true), 2);
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.lateBind');

  (function() {
    test('should work when the target function is overwritten', function() {
      var object = {
        'name': 'moe',
        'greet': function(greeting) {
          return greeting + ': ' + this.name;
        }
      };

      var func = _.lateBind(object, 'greet', 'hi');
      equal(func(), 'hi: moe');

      object.greet = function(greeting) {
        return greeting + ' ' + this.name + '!';
      };
      equal(func(), 'hi moe!');
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

  QUnit.module('lodash.merge');

  (function() {
    var args = arguments;

    test('should merge `source` into the destination object', function() {
      var stooges = [
        { 'name': 'moe' },
        { 'name': 'larry' }
      ];

      var ages = [
        { 'age': 40 },
        { 'age': 50 }
      ];

      var heights = [
        { 'height': '5\'4"' },
        { 'height': '5\'5"' },
      ];

      var expected = [
        { 'name': 'moe', 'age': 40, 'height': '5\'4"' },
        { 'name': 'larry', 'age': 50, 'height': '5\'5"' }
      ];

      deepEqual(_.merge(stooges, ages, heights), expected);
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

    test('should merge problem JScript properties (test in IE < 9)', function() {
      var object = [{
        'constructor': 1,
        'hasOwnProperty': 2,
        'isPrototypeOf': 3
      }];

      var source = [{
        'propertyIsEnumerable': 4,
        'toLocaleString': 5,
        'toString': 6,
        'valueOf': 7
      }];

      deepEqual(_.merge(object, source), [shadowed]);
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
  }(1, 2, 3));

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.omit');

  (function() {
    var object = { 'a': 1, 'b': 2 },
        actual = { 'b': 2 };

    test('should accept individual property names', function() {
      deepEqual(_.omit(object, 'a'), actual);
    });

    test('should accept an array of property names', function() {
      deepEqual(_.omit(object, ['a', 'c']), actual);
    });

    test('should accept mixes of individual and arrays of property names', function() {
      deepEqual(_.omit(object, ['a'], 'c'), actual);
    });

    test('should iterate over inherited properties', function() {
      function Foo() {}
      Foo.prototype = object;

      deepEqual(_.omit(new Foo, 'a'), actual);
    });

    test('should work with a `callback` argument', function() {
      var actual = _.omit(object, function(value) {
        return value == 1;
      });

      deepEqual(actual, { 'b': 2 });
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

      deepEqual(actual, { 'b': 2 });
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.partial');

  (function() {
    test('partially applies an argument, without additional arguments', function() {
      var arg = 'catnip',
          func = function(x) { return x; };

      equal(_.partial(func, arg)(), arg);
    });

    test('partially applies an argument, with additional arguments', function() {
      var arg1 = 'catnip',
          arg2 = 'cheese',
          func = function(x, y) { return [x, y]; };

      deepEqual(_.partial(func, arg1)(arg2), [arg1, arg2]);
    });

    test('works without partially applying arguments, without additional arguments', function() {
      var func = function() { return arguments.length; };

      equal(_.partial(func)(), 0);
    });

    test('works without partially applying arguments, with additional arguments', function() {
      var arg = 'catnip',
          func = function(x) { return x; };

      equal(_.partial(func)(arg), arg);
    });

    test('should not alter the `this` binding of either function', function() {
      var object = { 'cat': 'nip' },
          func = function() { return this.cat; };

      equal(_.partial(_.bind(func, object))(), object.cat);
      equal(_.bind(_.partial(func), object)(), object.cat);
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
      ok(actual != 5);
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

  QUnit.module('lodash.rest');

  (function() {
    test('should allow a falsey `array` argument', function() {
      _.each(falsey, function(index, value) {
        try {
          var actual = index ? _.rest(value) : _.rest();
        } catch(e) { }
        deepEqual(actual, []);
      })
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

    test('should detect the size of a string value', function() {
      equal(_.size('abc'), 3);
    });

    test('should allow a falsey `object` argument', function() {
      _.each(falsey, function(index, value) {
        try {
          var actual = index ? _.size(value) : _.size();
        } catch(e) { }
        equal(actual, 0);
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
  }(1, 2, 3));

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

      equal(actual, 0);
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
      ok((source + '').indexOf('__p') > -1);
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
      }, function(value, key) {
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
      var compiled = _.template('<span class="icon-<%= type %>2"></span>');
      equal(compiled({ 'type': 1 }), '<span class="icon-12"></span>');
    });

    test('should work with "interpolate" delimiters containing ternary operators', function() {
      var compiled = _.template('<%= value ? value : "b" %>');
      equal(compiled({ 'value': 'a' }), 'a');
    });

    test('should parse delimiters with newlines', function() {
      var expected = '<<\nprint("<p>" + (value ? "yes" : "no") + "</p>")\n>>',
          compiled = _.template(expected, null, { 'evaluate': /<<(.+?)>>/g });

      equal(compiled({ 'value': true }), expected);
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.throttle');

  (function() {
    test('subsequent calls should return the result of the first call', function() {
      var throttled = _.throttle(function(value) { return value; }, 100),
          result = [throttled('x'), throttled('y')];

      deepEqual(result, ['x', 'x']);
    });

    test('supports calls in a loop', function() {
      var counter = 0,
          throttled = _.throttle(function() { counter++; }, 100),
          start = new Date,
          limit = 220;

      while ((new Date - start) < limit) {
        throttled();
      }
      ok(counter > 1);
    });

    asyncTest('supports recursive calls', function() {
      var counter = 0;
      var throttled = _.throttle(function() {
        counter++;
        if (counter < 4) {
          throttled();
        }
      }, 100);

      setTimeout(function() {
        ok(counter > 1);
        QUnit.start();
      }, 220);

      throttled();
    });

    asyncTest('should clear timeout when `func` is called', function() {
      var now = new Date,
          times = [];

      var throttled = _.throttle(function() {
        times.push(new Date - now);
      }, 20);

      setTimeout(throttled, 20);
      setTimeout(throttled, 20);
      setTimeout(throttled, 40);
      setTimeout(throttled, 40);

      setTimeout(function() {
        var actual = _.every(times, function(value, index) {
          return index
            ? (value - times[index - 1]) > 2
            : true;
        });

        ok(actual);
        QUnit.start();
      }, 120);
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.toArray');

  (function() {
    var args = arguments;

    test('should treat array-like objects like arrays', function() {
      var object = { '0': 'a', '1': 'b', '2': 'c', 'length': 3 };
      deepEqual(_.toArray(object), ['a', 'b', 'c']);
      deepEqual(_.toArray(args), [1, 2, 3]);
    });

    test('should work with a string for `collection` (test in Opera < 10.52)', function() {
      deepEqual(_.toArray('abc'), ['a', 'b', 'c']);
      deepEqual(_.toArray(Object('abc')), ['a', 'b', 'c']);
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
    var escaped = '&lt;h1&gt;Moe&#x27;s famous &quot;death by chocolate&quot; brownies &amp; cake&lt;\/h1&gt;',
        unescaped = '<h1>Moe\'s famous "death by chocolate" brownies & cake<\/h1>';

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

    test('should filter by inherited properties', function() {
      function Foo() {}
      Foo.prototype = { 'b': 2 };

      var properties = new Foo;
      properties.a = 1;

      deepEqual(_.where(array, properties), [{ 'a': 1, 'b': 2 }]);
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
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash(...).shift');

  (function() {
    test('should remove the value at index `0` when length is `0` (test in IE 8 compatibility mode)', function() {
      var wrapped = _({ '0': 1, 'length': 1 });
      wrapped.shift();

      deepEqual(wrapped.keys(), ['length']);
      equal(wrapped.first(), undefined);
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash(...).splice');

  (function() {
    test('should remove the value at index `0` when length is `0` (test in IE < 9, and in compatibility mode for IE9)', function() {
      var wrapped = _({ '0': 1, 'length': 1 });
      wrapped.splice(0, 1);

      deepEqual(wrapped.keys(), ['length']);
      equal(wrapped.first(), undefined);
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash methods');

  (function() {
    test('should allow falsey arguments', function() {
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
        '_iteratorTemplate',
        '_shimKeys',
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

        if (_.indexOf(returnArrays, methodName) > -1) {
          deepEqual(actual, expected, '_.' + methodName + ' returns an array');
        } else {
          skipTest(falsey.length);
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
          deepEqual(thisArg, null, message);
        } else {
          equal(thisArg, expected, message);
        }
      });
    });
  }());

  /*--------------------------------------------------------------------------*/

  // explicitly call `QUnit.start()` for Narwhal, Rhino, and RingoJS
  if (!window.document) {
    QUnit.start();
  }
}(typeof global == 'object' && global || this));
