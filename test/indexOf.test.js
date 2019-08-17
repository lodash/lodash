import assert from 'assert';
import lodashStable from 'lodash';
import { stubZero, falsey } from './utils.js';
import indexOf from '../indexOf.js';

describe('indexOf', function() {  
  var array = [1, 2, 3, 1, 2, 3];            

  it('`_.indexOf` should return the index of the first matched value', function() {
    assert.strictEqual(indexOf(array, 3), 2);
  });

  it('`_.indexOf` should work with a positive `fromIndex`', function() {
    assert.strictEqual(indexOf(array, 1, 2), 3);
  });

  it('`_.indexOf` should work with a `fromIndex` >= `length`', function() {
    var values = [6, 8, Math.pow(2, 32), Infinity],
        expected = lodashStable.map(values, lodashStable.constant([-1, -1, -1]));

    var actual = lodashStable.map(values, function(fromIndex) {
      return [
        indexOf(array, undefined, fromIndex),
        indexOf(array, 1, fromIndex),
        indexOf(array, '', fromIndex)
      ];
    });

    assert.deepStrictEqual(actual, expected);
  });

  it('`_.indexOf` should work with a negative `fromIndex`', function() {
    assert.strictEqual(indexOf(array, 2, -3), 4);
  });

  it('`_.indexOf` should work with a negative `fromIndex` <= `-length`', function() {
    var values = [-6, -8, -Infinity],
        expected = lodashStable.map(values, stubZero);

    var actual = lodashStable.map(values, function(fromIndex) {
      return indexOf(array, 1, fromIndex);
    });

    assert.deepStrictEqual(actual, expected);
  });

  it('`_.indexOf` should treat falsey `fromIndex` values as `0`', function() {
    var expected = lodashStable.map(falsey, stubZero);

    var actual = lodashStable.map(falsey, function(fromIndex) {
      return indexOf(array, 1, fromIndex);
    });

    assert.deepStrictEqual(actual, expected);
  });

  it('`_.indexOf` should coerce `fromIndex` to an integer', function() {
    assert.strictEqual(indexOf(array, 2, 1.2), 1);
  });  
});
