import assert from 'assert';
import lodashStable from 'lodash';
import { slice, noop, stubA, falsey, stubFalse, isNpm, mapCaches } from './utils.js';
import isMatchWith from '../isMatchWith.js';
import isString from '../isString.js';
import last from '../last.js';
import partial from '../partial.js';

describe('isMatchWith', function() {
  it('should provide correct `customizer` arguments', function() {
    var argsList = [],
        object1 = { 'a': [1, 2], 'b': null },
        object2 = { 'a': [1, 2], 'b': null };

    object1.b = object2;
    object2.b = object1;

    var expected = [
      [object1.a, object2.a, 'a', object1, object2],
      [object1.a[0], object2.a[0], 0, object1.a, object2.a],
      [object1.a[1], object2.a[1], 1, object1.a, object2.a],
      [object1.b, object2.b, 'b', object1, object2],
      [object1.b.a, object2.b.a, 'a', object1.b, object2.b],
      [object1.b.a[0], object2.b.a[0], 0, object1.b.a, object2.b.a],
      [object1.b.a[1], object2.b.a[1], 1, object1.b.a, object2.b.a],
      [object1.b.b, object2.b.b, 'b', object1.b, object2.b]
    ];

    isMatchWith(object1, object2, function() {
      argsList.push(slice.call(arguments, 0, -1));
    });

    assert.deepStrictEqual(argsList, expected);
  });

  it('should handle comparisons when `customizer` returns `undefined`', function() {
    assert.strictEqual(isMatchWith({ 'a': 1 }, { 'a': 1 }, noop), true);
  });

  it('should not handle comparisons when `customizer` returns `true`', function() {
    var customizer = function(value) {
      return isString(value) || undefined;
    };

    assert.strictEqual(isMatchWith(['a'], ['b'], customizer), true);
    assert.strictEqual(isMatchWith({ '0': 'a' }, { '0': 'b' }, customizer), true);
  });

  it('should not handle comparisons when `customizer` returns `false`', function() {
    var customizer = function(value) {
      return isString(value) ? false : undefined;
    };

    assert.strictEqual(isMatchWith(['a'], ['a'], customizer), false);
    assert.strictEqual(isMatchWith({ '0': 'a' }, { '0': 'a' }, customizer), false);
  });

  it('should return a boolean value even when `customizer` does not', function() {
    var object = { 'a': 1 },
        actual = isMatchWith(object, { 'a': 1 }, stubA);

    assert.strictEqual(actual, true);

    var expected = lodashStable.map(falsey, stubFalse);

    actual = [];
    lodashStable.each(falsey, function(value) {
      actual.push(isMatchWith(object, { 'a': 2 }, lodashStable.constant(value)));
    });

    assert.deepStrictEqual(actual, expected);
  });

  it('should provide `stack` to `customizer`', function() {
    var actual;

    isMatchWith({ 'a': 1 }, { 'a': 1 }, function() {
      actual = last(arguments);
    });

    assert.ok(isNpm
      ? actual.constructor.name == 'Stack'
      : actual instanceof mapCaches.Stack
    );
  });

  it('should ensure `customizer` is a function', function() {
    var object = { 'a': 1 },
        matches = partial(isMatchWith, object),
        actual = lodashStable.map([object, { 'a': 2 }], matches);

    assert.deepStrictEqual(actual, [true, false]);
  });

  it('should call `customizer` for values maps and sets', function() {
    var value = { 'a': { 'b': 2 } };

    if (Map) {
      var map1 = new Map;
      map1.set('a', value);

      var map2 = new Map;
      map2.set('a', value);
    }
    if (Set) {
      var set1 = new Set;
      set1.add(value);

      var set2 = new Set;
      set2.add(value);
    }
    lodashStable.each([[map1, map2], [set1, set2]], function(pair, index) {
      if (pair[0]) {
        var argsList = [],
            array = lodashStable.toArray(pair[0]),
            object1 = { 'a': pair[0] },
            object2 = { 'a': pair[1] };

        var expected = [
          [pair[0], pair[1], 'a', object1, object2],
          [array[0], array[0], 0, array, array],
          [array[0][0], array[0][0], 0, array[0], array[0]],
          [array[0][1], array[0][1], 1, array[0], array[0]]
        ];

        if (index) {
          expected.length = 2;
        }
        isMatchWith({ 'a': pair[0] }, { 'a': pair[1] }, function() {
          argsList.push(slice.call(arguments, 0, -1));
        });

        assert.deepStrictEqual(argsList, expected, index ? 'Set' : 'Map');
      }
    });
  });
});
