import assert from 'assert';
import lodashStable from 'lodash';

import {
  _,
  identity,
  whitespace,
  MAX_SAFE_INTEGER,
  MAX_INTEGER,
  MAX_ARRAY_LENGTH,
  symbol,
  falsey,
} from './utils.js';

describe('number coercion methods', function() {
  lodashStable.each(['toFinite', 'toInteger', 'toNumber', 'toSafeInteger'], function(methodName) {
    var func = _[methodName];

    it('`_.' + methodName + '` should preserve the sign of `0`', function() {
      var values = [0, '0', -0, '-0'],
          expected = [[0, Infinity], [0, Infinity], [-0, -Infinity], [-0, -Infinity]];

      lodashStable.times(2, function(index) {
        var others = lodashStable.map(values, index ? Object : identity);

        var actual = lodashStable.map(others, function(value) {
          var result = func(value);
          return [result, 1 / result];
        });

        assert.deepStrictEqual(actual, expected);
      });
    });
  });

  lodashStable.each(['toFinite', 'toInteger', 'toLength', 'toNumber', 'toSafeInteger'], function(methodName) {
    var func = _[methodName],
        isToFinite = methodName == 'toFinite',
        isToLength = methodName == 'toLength',
        isToNumber = methodName == 'toNumber',
        isToSafeInteger = methodName == 'toSafeInteger';

    function negative(string) {
      return '-' + string;
    }

    function pad(string) {
      return whitespace + string + whitespace;
    }

    function positive(string) {
      return '+' + string;
    }

    it('`_.' + methodName + '` should pass thru primitive number values', function() {
      var values = [0, 1, NaN];

      var expected = lodashStable.map(values, function(value) {
        return (!isToNumber && value !== value) ? 0 : value;
      });

      var actual = lodashStable.map(values, func);

      assert.deepStrictEqual(actual, expected);
    });

    it('`_.' + methodName + '` should convert number primitives and objects to numbers', function() {
      var values = [2, 1.2, MAX_SAFE_INTEGER, MAX_INTEGER, Infinity, NaN];

      var expected = lodashStable.map(values, function(value) {
        if (!isToNumber) {
          if (!isToFinite && value == 1.2) {
            value = 1;
          }
          else if (value == Infinity) {
            value = MAX_INTEGER;
          }
          else if (value !== value) {
            value = 0;
          }
          if (isToLength || isToSafeInteger) {
            value = Math.min(value, isToLength ? MAX_ARRAY_LENGTH : MAX_SAFE_INTEGER);
          }
        }
        var neg = isToLength ? 0 : -value;
        return [value, value, neg, neg];
      });

      var actual = lodashStable.map(values, function(value) {
        return [func(value), func(Object(value)), func(-value), func(Object(-value))];
      });

      assert.deepStrictEqual(actual, expected);
    });

    it('`_.' + methodName + '` should convert string primitives and objects to numbers', function() {
      var transforms = [identity, pad, positive, negative];

      var values = [
        '10', '1.234567890', (MAX_SAFE_INTEGER + ''),
        '1e+308', '1e308', '1E+308', '1E308',
        '5e-324', '5E-324',
        'Infinity', 'NaN'
      ];

      var expected = lodashStable.map(values, function(value) {
        var n = +value;
        if (!isToNumber) {
          if (!isToFinite && n == 1.234567890) {
            n = 1;
          }
          else if (n == Infinity) {
            n = MAX_INTEGER;
          }
          else if ((!isToFinite && n == Number.MIN_VALUE) || n !== n) {
            n = 0;
          }
          if (isToLength || isToSafeInteger) {
            n = Math.min(n, isToLength ? MAX_ARRAY_LENGTH : MAX_SAFE_INTEGER);
          }
        }
        var neg = isToLength ? 0 : -n;
        return [n, n, n, n, n, n, neg, neg];
      });

      var actual = lodashStable.map(values, function(value) {
        return lodashStable.flatMap(transforms, function(mod) {
          return [func(mod(value)), func(Object(mod(value)))];
        });
      });

      assert.deepStrictEqual(actual, expected);
    });

    it('`_.' + methodName + '` should convert binary/octal strings to numbers', function() {
      var numbers = [42, 5349, 1715004],
          transforms = [identity, pad],
          values = ['0b101010', '0o12345', '0x1a2b3c'];

      var expected = lodashStable.map(numbers, function(n) {
        return lodashStable.times(8, lodashStable.constant(n));
      });

      var actual = lodashStable.map(values, function(value) {
        var upper = value.toUpperCase();
        return lodashStable.flatMap(transforms, function(mod) {
          return [func(mod(value)), func(Object(mod(value))), func(mod(upper)), func(Object(mod(upper)))];
        });
      });

      assert.deepStrictEqual(actual, expected);
    });

    it('`_.' + methodName + '` should convert invalid binary/octal strings to `' + (isToNumber ? 'NaN' : '0') + '`', function() {
      var transforms = [identity, pad, positive, negative],
          values = ['0b', '0o', '0x', '0b1010102', '0o123458', '0x1a2b3x'];

      var expected = lodashStable.map(values, function(n) {
        return lodashStable.times(8, lodashStable.constant(isToNumber ? NaN : 0));
      });

      var actual = lodashStable.map(values, function(value) {
        return lodashStable.flatMap(transforms, function(mod) {
          return [func(mod(value)), func(Object(mod(value)))];
        });
      });

      assert.deepStrictEqual(actual, expected);
    });

    it('`_.' + methodName + '` should convert symbols to `' + (isToNumber ? 'NaN' : '0') + '`', function() {
      if (Symbol) {
        var object1 = Object(symbol),
            object2 = Object(symbol),
            values = [symbol, object1, object2],
            expected = lodashStable.map(values, lodashStable.constant(isToNumber ? NaN : 0));

        object2.valueOf = undefined;
        var actual = lodashStable.map(values, func);

        assert.deepStrictEqual(actual, expected);
      }
    });

    it('`_.' + methodName + '` should convert empty values to `0` or `NaN`', function() {
      var values = falsey.concat(whitespace);

      var expected = lodashStable.map(values, function(value) {
        return (isToNumber && value !== whitespace) ? Number(value) : 0;
      });

      var actual = lodashStable.map(values, function(value, index) {
        return index ? func(value) : func();
      });

      assert.deepStrictEqual(actual, expected);
    });

    it('`_.' + methodName + '` should coerce objects to numbers', function() {
      var values = [
        {},
        [],
        [1],
        [1, 2],
        { 'valueOf': '1.1' },
        { 'valueOf': '1.1', 'toString': lodashStable.constant('2.2') },
        { 'valueOf': lodashStable.constant('1.1'), 'toString': '2.2' },
        { 'valueOf': lodashStable.constant('1.1'), 'toString': lodashStable.constant('2.2') },
        { 'valueOf': lodashStable.constant('-0x1a2b3c') },
        { 'toString': lodashStable.constant('-0x1a2b3c') },
        { 'valueOf': lodashStable.constant('0o12345') },
        { 'toString': lodashStable.constant('0o12345') },
        { 'valueOf': lodashStable.constant('0b101010') },
        { 'toString': lodashStable.constant('0b101010') }
      ];

      var expected = [
        NaN,  0,   1,   NaN,
        NaN,  2.2, 1.1, 1.1,
        NaN,  NaN,
        5349, 5349,
        42,   42
      ];

      if (isToFinite) {
        expected = [
          0,    0,    1,   0,
          0,    2.2,  1.1, 1.1,
          0,    0,
          5349, 5349,
          42,   42
        ];
      }
      else if (!isToNumber) {
        expected = [
          0,    0,    1, 0,
          0,    2,    1, 1,
          0,    0,
          5349, 5349,
          42,   42
        ];
      }
      var actual = lodashStable.map(values, func);

      assert.deepStrictEqual(actual, expected);
    });
  });
});
