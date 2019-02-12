import assert from 'assert';
import lodashStable from 'lodash';
import { args, _ } from './utils.js';
import flatten from '../flatten.js';
import flattenDeep from '../flattenDeep.js';
import flattenDepth from '../flattenDepth.js';

describe('flatten methods', function() {
  var array = [1, [2, [3, [4]], 5]],
      methodNames = ['flatten', 'flattenDeep', 'flattenDepth'];

  it('should flatten `arguments` objects', function() {
    var array = [args, [args]];

    assert.deepStrictEqual(flatten(array), [1, 2, 3, args]);
    assert.deepStrictEqual(flattenDeep(array), [1, 2, 3, 1, 2, 3]);
    assert.deepStrictEqual(flattenDepth(array, 2), [1, 2, 3, 1, 2, 3]);
  });

  it('should treat sparse arrays as dense', function() {
    var array = [[1, 2, 3], Array(3)],
        expected = [1, 2, 3];

    expected.push(undefined, undefined, undefined);

    lodashStable.each(methodNames, function(methodName) {
      var actual = _[methodName](array);
      assert.deepStrictEqual(actual, expected);
      assert.ok('4' in actual);
    });
  });

  it('should flatten objects with a truthy `Symbol.isConcatSpreadable` value', function() {
    if (Symbol && Symbol.isConcatSpreadable) {
      var object = { '0': 'a', 'length': 1 },
          array = [object],
          expected = lodashStable.map(methodNames, lodashStable.constant(['a']));

      object[Symbol.isConcatSpreadable] = true;

      var actual = lodashStable.map(methodNames, function(methodName) {
        return _[methodName](array);
      });

      assert.deepStrictEqual(actual, expected);
    }
  });

  it('should work with extremely large arrays', function() {
    lodashStable.times(3, function(index) {
      var expected = Array(5e5);
      try {
        var func = flatten;
        if (index == 1) {
          func = flattenDeep;
        } else if (index == 2) {
          func = flattenDepth;
        }
        assert.deepStrictEqual(func([expected]), expected);
      } catch (e) {
        assert.ok(false, e.message);
      }
    });
  });

  it('should work with empty arrays', function() {
    var array = [[], [[]], [[], [[[]]]]];

    assert.deepStrictEqual(flatten(array), [[], [], [[[]]]]);
    assert.deepStrictEqual(flattenDeep(array), []);
    assert.deepStrictEqual(flattenDepth(array, 2), [[[]]]);
  });

  it('should support flattening of nested arrays', function() {
    assert.deepStrictEqual(flatten(array), [1, 2, [3, [4]], 5]);
    assert.deepStrictEqual(flattenDeep(array), [1, 2, 3, 4, 5]);
    assert.deepStrictEqual(flattenDepth(array, 2), [1, 2, 3, [4], 5]);
  });

  it('should return an empty array for non array-like objects', function() {
    var expected = [],
        nonArray = { '0': 'a' };

    assert.deepStrictEqual(flatten(nonArray), expected);
    assert.deepStrictEqual(flattenDeep(nonArray), expected);
    assert.deepStrictEqual(flattenDepth(nonArray, 2), expected);
  });

  it('should return a wrapped value when chaining', function() {
    var wrapped = _(array),
        actual = wrapped.flatten();

    assert.ok(actual instanceof _);
    assert.deepEqual(actual.value(), [1, 2, [3, [4]], 5]);

    actual = wrapped.flattenDeep();

    assert.ok(actual instanceof _);
    assert.deepEqual(actual.value(), [1, 2, 3, 4, 5]);

    actual = wrapped.flattenDepth(2);

    assert.ok(actual instanceof _);
    assert.deepEqual(actual.value(), [1, 2, 3, [4], 5]);
  });
});
