import assert from 'assert';
import lodashStable from 'lodash';
import { empties, stubOne, noop, falsey } from './utils.js';
import pullAt from '../pullAt.js';

describe('pullAt', function() {
  it('should modify the array and return removed elements', function() {
    var array = [1, 2, 3],
        actual = pullAt(array, [0, 1]);

    assert.deepStrictEqual(array, [3]);
    assert.deepStrictEqual(actual, [1, 2]);
  });

  it('should work with unsorted indexes', function() {
    var array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
        actual = pullAt(array, [1, 3, 11, 7, 5, 9]);

    assert.deepStrictEqual(array, [1, 3, 5, 7, 9, 11]);
    assert.deepStrictEqual(actual, [2, 4, 12, 8, 6, 10]);
  });

  it('should work with repeated indexes', function() {
    var array = [1, 2, 3, 4],
        actual = pullAt(array, [0, 2, 0, 1, 0, 2]);

    assert.deepStrictEqual(array, [4]);
    assert.deepStrictEqual(actual, [1, 3, 1, 2, 1, 3]);
  });

  it('should use `undefined` for nonexistent indexes', function() {
    var array = ['a', 'b', 'c'],
        actual = pullAt(array, [2, 4, 0]);

    assert.deepStrictEqual(array, ['b']);
    assert.deepStrictEqual(actual, ['c', undefined, 'a']);
  });

  it('should flatten `indexes`', function() {
    var array = ['a', 'b', 'c'];
    assert.deepStrictEqual(pullAt(array, 2, 0), ['c', 'a']);
    assert.deepStrictEqual(array, ['b']);

    array = ['a', 'b', 'c', 'd'];
    assert.deepStrictEqual(pullAt(array, [3, 0], 2), ['d', 'a', 'c']);
    assert.deepStrictEqual(array, ['b']);
  });

  it('should return an empty array when no indexes are given', function() {
    var array = ['a', 'b', 'c'],
        actual = pullAt(array);

    assert.deepStrictEqual(array, ['a', 'b', 'c']);
    assert.deepStrictEqual(actual, []);

    actual = pullAt(array, [], []);

    assert.deepStrictEqual(array, ['a', 'b', 'c']);
    assert.deepStrictEqual(actual, []);
  });

  it('should work with non-index paths', function() {
    var values = lodashStable.reject(empties, function(value) {
      return (value === 0) || lodashStable.isArray(value);
    }).concat(-1, 1.1);

    var array = lodashStable.transform(values, function(result, value) {
      result[value] = 1;
    }, []);

    var expected = lodashStable.map(values, stubOne),
        actual = pullAt(array, values);

    assert.deepStrictEqual(actual, expected);

    expected = lodashStable.map(values, noop);
    actual = lodashStable.at(array, values);

    assert.deepStrictEqual(actual, expected);
  });

  it('should preserve the sign of `0`', function() {
    var props = [-0, Object(-0), 0, Object(0)];

    var actual = lodashStable.map(props, function(key) {
      var array = [-1];
      array['-0'] = -2;
      return pullAt(array, key);
    });

    assert.deepStrictEqual(actual, [[-2], [-2], [-1], [-1]]);
  });

  it('should support deep paths', function() {
    var array = [];
    array.a = { 'b': 2 };

    var actual = pullAt(array, 'a.b');

    assert.deepStrictEqual(actual, [2]);
    assert.deepStrictEqual(array.a, {});

    try {
      actual = pullAt(array, 'a.b.c');
    } catch (e) {}

    assert.deepStrictEqual(actual, [undefined]);
  });

  it('should work with a falsey `array` when keys are given', function() {
    var values = falsey.slice(),
        expected = lodashStable.map(values, lodashStable.constant(Array(4)));

    var actual = lodashStable.map(values, function(array) {
      try {
        return pullAt(array, 0, 1, 'pop', 'push');
      } catch (e) {}
    });

    assert.deepStrictEqual(actual, expected);
  });
});
