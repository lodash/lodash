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

  // explicitly call `QUnit.module()` instead of `module()`
  // in case we are in a CLI environment
  QUnit.module('lodash');

  (function() {
    test('supports loading lodash.js as the "lodash" module', function() {
      if (window.document && window.require) {
        equal((lodashModule || {}).moduleName, 'lodash');
      } else {
        skipTest()
      }
    });

    test('supports loading lodash.js as the "underscore" module', function() {
      if (window.document && window.require) {
        equal((underscoreModule || {}).moduleName, 'underscore');
      } else {
        skipTest()
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
    test('supports lazy bind', function() {
      var object = {
        'name': 'moe',
        'greet': function(greeting) {
          return greeting + ': ' + this.name;
        }
      };

      var func = _.bind(object, 'greet', 'hi');
      equal(func(), 'hi: moe');

      object.greet = function(greeting) {
        return greeting + ' ' + this.name + '!';
      };
      equal(func(), 'hi moe!');
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.contains');

  (function() {
    _.each([
      { 'kind': 'literal', 'value': 'abc' },
      { 'kind': 'object', 'value': Object('abc') }
    ],
    function(data) {
      test('should work with a string ' + data.kind + ' for `collection`', function() {
        equal(_.contains(data.value, 'bc'), true);
        equal(_.contains(data.value, 'd'), false);
      });
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.debounce');

  (function() {
    test('subsequent "immediate" debounced calls should return the result of the first call', function() {
      var debounced = _.debounce(function(value) { return value; }, 100, true),
          result = [debounced('x'), debounced('y')];

      deepEqual(result, ['x', 'x']);
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.difference');

  (function() {
    test('should work correctly when using `cachedContains`', function() {
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
    test('should not escape the ">" character', function() {
      equal(_.escape('>'), '>');
    });

    test('should not escape the "/" character', function() {
      equal(_.escape('/'), '/');
    });

    test('should return empty string when passed `null` or `undefined`', function() {
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

  _.each(['bindAll', 'defaults', 'extend'], function(methodName) {
    var func = _[methodName];
    QUnit.module('lodash.' + methodName + ' strict mode checks');

    test('should not throw strict mode errors', function() {
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

    test('should treat array-like object with invalid `length` as a regular object', function() {
      var keys = [],
          object = { 'length': -1 };

      _.forEach(object, function(value, key) { keys.push(key); });
      deepEqual(keys, ['length']);
    });

    _.each([
      { 'kind': 'literal', 'value': 'abc' },
      { 'kind': 'object', 'value': Object('abc') }
    ],
    function(data) {
      test('should work with a string ' + data.kind + ' for `collection` (test in IE < 9)', function() {
        var args,
            collection = data.value,
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

  _.each(['forEach', 'forIn', 'forOwn'], function(methodName) {
    var func = _[methodName];
    QUnit.module('lodash.' + methodName + ' iteration bugs');

    test('fixes the JScript [[DontEnum]] bug (test in IE < 9)', function() {
      var keys = [];
      func(shadowed, function(value, key) { keys.push(key); });
      deepEqual(keys.sort(), shadowedKeys);
    });

    test('skips the prototype property of functions (test in Firefox < 3.6, Opera > 9.50 - Opera < 11.60, and Safari < 5.1)', function() {
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

  QUnit.module('lodash.groupBy');

  (function() {
    test('supports the `thisArg` argument', function() {
      var actual = _.groupBy([1.3, 2.1, 2.4], function(num) {
        return this.floor(num);
      }, Math);

      deepEqual(actual, { '1': [1.3], '2': [2.1, 2.4] });
    });

    test('should only add elements to own, not inherited, properties', function() {
      var actual = _.groupBy([1.3, 2.1, 2.4], function(num) {
        return Math.floor(num) > 1 ? 'hasOwnProperty' : 'constructor';
      });

      deepEqual(actual.constructor, [1.3]);
      deepEqual(actual.hasOwnProperty, [2.1, 2.4]);
    });

    test('should work with an object for `collection`', function() {
      var actual = _.groupBy({ 'a': 1.3, 'b': 2.1, 'c': 2.4 }, function(num) {
        return Math.floor(num);
      });

      deepEqual(actual, { '1': [1.3], '2': [2.1, 2.4] });
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

  QUnit.module('lodash.isEmpty');

  (function() {
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
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.isEqual');

  (function() {
    test('fixes the JScript [[DontEnum]] bug (test in IE < 9)', function() {
      equal(_.isEqual(shadowed, {}), false);
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

  QUnit.module('lodash.keys');

  (function() {
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
  }());

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
      var o = { 'cat': 'nip' },
          func = function() { return this.cat; };

      equal(_.partial(_.bind(func, o))(), o.cat);
      equal(_.bind(_.partial(func), o)(), o.cat);
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

  QUnit.module('lodash.reduceRight');

  (function() {
    test('should pass the correct `callback` arguments when iterating an object', function() {
      var args,
          object = { 'a': 'A', 'b': 'B' },
          lastKey = _.keys(object).pop();

      var expected = lastKey == 'a'
        ? ['A', 'B', 'b', object]
        : ['B', 'A', 'a', object];

      _.reduceRight(object, function() {
        args || (args = slice.call(arguments));
      });

      deepEqual(args, expected);
    });

    test('should treat array-like object with invalid `length` as a regular object', function() {
      var args,
          object = { 'a': 'A', 'length': -1 },
          lastKey = _.keys(object).pop();

      var expected = lastKey == 'a'
        ? ['A', '-1', 'length', object]
        : [-1, 'A', 'a', object];

      _.reduceRight(object, function() {
        args || (args = slice.call(arguments));
      });

      deepEqual(args, expected);
    });

    _.each([
      { 'kind': 'literal', 'value': 'abc' },
      { 'kind': 'object', 'value': Object('abc') }
    ],
    function(data) {
      test('should work with a string ' + data.kind + ' for `collection` (test in IE < 9)', function() {
        var args,
            collection = data.value;

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

  QUnit.module('lodash.size');

  (function() {
    var args = arguments;

    test('should detect the size of a string value', function() {
      equal(_.size('abc'), 3);
    });

    test('should allow a falsey `object` argument', function() {
      var func = _.size;
      try {
        var actual = [func(), func(undefined), func(null), func(false), func(0)];
      } catch(e) { }

      deepEqual(actual, [0, 0, 0, 0, 0]);
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

    test('should be debuggable if compiled with errors', function() {
      var source = _.template('<% if x %>').source;
      ok(source.indexOf('__p') > -1);
    });

    test('should raise an error if a template, compiled with errors, is executed', function() {
      raises(_.template('<% if x %>'));
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
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.toArray');

  (function() {
    var args = arguments;

    test('should call custom `toArray` method of an array', function() {
      var array = [1, 2, 3];
      array.toArray = function() { return [3, 2, 1]; };
      deepEqual(_.toArray(array), [3, 2, 1]);
    });

    test('should treat array-like objects like arrays', function() {
      var object = { '0': 'a', '1': 'b', '2': 'c', 'length': 3 };
      deepEqual(_.toArray(object), ['a', 'b', 'c']);
      deepEqual(_.toArray(args), [1, 2, 3]);
    });

    test('should treat array-like object with invalid `length` as a regular object', function() {
      var object = { 'length': -1 };
      deepEqual(_.toArray(object), [-1]);
    });

    test('should work with a string for `collection` (test in Opera < 10.52)', function() {
      deepEqual(_.toArray('abc'), ['a', 'b', 'c']);
      deepEqual(_.toArray(Object('abc')), ['a', 'b', 'c']);
    });
  }(1, 2, 3));

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

  QUnit.module('lodash.zipObject');

  (function() {
    test('supports not passing a `values` argument', function() {
      deepEqual(_.zipObject(['a', 'b', 'c']), { 'a': undefined, 'b': undefined, 'c': undefined });
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

  QUnit.module('lodash "Arrays" methods');

  (function() {
    test('should allow a falsey `array` argument', function() {
      _.each([
        'compact',
        'difference',
        'first',
        'flatten',
        'groupBy',
        'indexOf',
        'initial',
        'intersection',
        'last',
        'lastIndexOf',
        'max',
        'min',
        'range',
        'rest',
        'shuffle',
        'sortBy',
        'sortedIndex',
        'union',
        'uniq',
        'without',
        'zip',
        'zipObject'
      ], function(methodName) {
        var func = _[methodName],
            pass = true;

        try {
          func();
          func(undefined);
          func(null);
          func(false);
          func(0);
        } catch(e) {
          pass = false;
        }
        ok(pass, methodName + ' allows a falsey `array` argument');
      });
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash "Collections" methods');

  (function() {
    test('should allow a falsey `collection` argument', function() {
      _.each([
        'contains',
        'every',
        'filter',
        'find',
        'forEach',
        'invoke',
        'map',
        'pluck',
        'reduce',
        'reduceRight',
        'reject',
        'some',
        'toArray'
      ], function(methodName) {
        var func = _[methodName],
            identity = _.identity,
            pass = true;

        try {
          if (/^(?:contains|toArray)$/.test(methodName)) {
            func();
            func(undefined);
            func(null);
            func(false);
            func(0);
          }
          else {
            func(undefined, identity);
            func(null, identity);
            func(false, identity);
            func(0, identity);
          }
        } catch(e) {
          pass = false;
        }
        ok(pass, methodName + ' allows a falsey `collection` argument');
      });
    });
  }());

  /*--------------------------------------------------------------------------*/

  // explicitly call `QUnit.start()` for Narwhal, Rhino, and RingoJS
  if (!window.document) {
    QUnit.start();
  }
}(typeof global == 'object' && global || this));
