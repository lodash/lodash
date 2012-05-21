(function(window, undefined) {

  /** Use a single load function */
  var load = typeof require == 'function' ? require : window.load;

  /** The unit testing framework */
  var QUnit =
    window.QUnit || (
      window.setTimeout || (window.addEventListener = window.setTimeout = / /),
      window.QUnit = load('../vendor/qunit/qunit/qunit.js') || window.QUnit,
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

  /** Shortcut used to convert array-like objects to arrays */
  var slice = [].slice;

  /** Used to resolve a value's internal [[Class]] */
  var toString = {}.toString;

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

  /*--------------------------------------------------------------------------*/

  /**
   * Skips a given number of tests with a passing result.
   *
   * @private
   * @param {Number} count The number of tests to skip.
   */
  function skipTest(count) {
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
        equal((_2 || {}).moduleName, 'lodash');
      } else {
        skipTest(1)
      }
    });

    test('supports loading lodash.js as the "underscore" module', function() {
      if (window.document && window.require) {
        equal((_3 || {}).moduleName, 'underscore');
      } else {
        skipTest(1)
      }
    });

    test('avoids overwritten native methods', function() {
      if (window.lodashBadKeys) {
        notDeepEqual(lodashBadKeys.keys({ 'a': 1 }), []);
      } else {
        skipTest(1);
      }
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash constructor');

  (function() {
    test('creates a new instance when called without the `new` operator', function() {
      ok(_() instanceof _);
    });

    test('should pass through LoDash instances', function() {
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

  QUnit.module('lodash.debounce');

  (function() {
    test('subsequent "immediate" debounced calls should return the result of the first call', function() {
      var debounced = _.debounce(function(value) { return value; }, 100, true),
          result = [debounced('x'), debounced('y')];

      deepEqual(result, ['x', 'x']);
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.escape');

  (function() {
    test('should not escape the ">" character', function() {
      equal(_.escape('>'), '>');
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

  QUnit.module('lodash.forEach');

  (function() {
    test('returns the collection', function() {
      var collection = [1, 2, 3, 4];
      equal(_.forEach(collection, Boolean), collection);
    });

    test('fixes the JScript [[DontEnum]] bug (test in IE < 9)', function() {
      var object = {};
      _.forEach(shadowed, function(value, key) {
        object[key] = value;
      });

      deepEqual(object, shadowed);
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.groupBy');

  (function() {
    test('supports the `thisArg` argument', function() {
      var actual = _.groupBy([1.3, 2.1, 2.4], function(num) {
        return this.floor(num);
      }, Math);

      deepEqual(actual, { '1': [1.3], '2': [2.1, 2.4] });
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.initial');

  (function() {
    test('returns an empty collection for `n` of `0`', function() {
      var array = [1, 2, 3, 4];
      deepEqual(_.initial(array, 0), []);
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.isEmpty');

  (function() {
    test('fixes the JScript [[DontEnum]] bug (test in IE < 9)', function() {
      equal(_.isEmpty(shadowed), false);
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
      deepEqual(_.keys(shadowed).sort(),
        'constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf'.split(' '));
    });
  }());

  /*--------------------------------------------------------------------------*/

  (function() {
    var i = -1,
        largeArray = [];

    while (++i <= 1e6) {
      largeArray[i] = i;
    }
    _.each(['max', 'min'], function(methodName) {
      QUnit.module('lodash.' + methodName);

      test('does not error when computing the ' + methodName + ' value of massive arrays', function() {
        try {
          var actual = _[methodName](largeArray);
        } catch(e) { }

        equal(actual, methodName == 'max' ? 1e6 : 0);
      });
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

  QUnit.module('lodash.reduceRight');

  (function() {
    test('should pass the correct `callback` arguments when iterating an object', function() {
      var args,
          object = { 'a': 'A', 'b': 'B', 'c': 'C' },
          keys = _.keys(object);

      _.reduceRight(object, function() {
        args || (args = slice.call(arguments));
      });

      deepEqual(args, ['C', 'B', 'b', object]);
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.size');

  (function() {
    test('should detect the size of a string value', function() {
      equal(_.size('abc'), 3);
    });

    test('fixes the JScript [[DontEnum]] bug (test in IE < 9)', function() {
      equal(_.size(shadowed), 7);
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.sortBy');

  (function() {
    test('supports the `thisArg` argument', function() {
      var actual = _.sortBy([1, 2, 3, 4], function(num) {
        return this.sin(num);
      }, Math);

      deepEqual(actual, [4, 3, 1, 2]);
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.template');

  (function() {
    test('supports recursive calls', function() {
      var compiled = _.template('<%= a %><% a = _.template(c, object) %><%= a %>'),
          data = { 'a': 'A', 'b': 'B', 'c': '<%= b %>' };

      equal(compiled(data), 'AB');
    });

    test('should not augment the `options` object', function() {
      var options = {};
      _.template('', null, options);
      deepEqual(options, {});
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
      equal(counter, 3);
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

    test('should treat array-like-objects like arrays', function() {
      var object = { '0': 'a', '1': 'b', '2': 'c', 'length': 3 };
      deepEqual(_.toArray(object), ['a', 'b', 'c']);
      deepEqual(_.toArray(args), [1, 2, 3]);
    });
  }(1, 2, 3));

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

  // explicitly call `QUnit.start()` for Narwhal, Rhino, and RingoJS
  QUnit.start();

}(typeof global == 'object' && global || this));
