import assert from 'assert';
import lodashStable from 'lodash';
import { identity, stubZero, falsey } from './utils.js';
import findLastIndex from '../findLastIndex.js';
import lastIndexOf from '../lastIndexOf.js';

const methods = {
  findLastIndex,
  lastIndexOf
};

describe('findLastIndex and lastIndexOf', function() {
  lodashStable.each(['findLastIndex', 'lastIndexOf'], function(methodName) {
    var array = [1, 2, 3, 1, 2, 3],
        func = methods[methodName],
        resolve = methodName == 'findLastIndex' ? lodashStable.curry(lodashStable.eq) : identity;

    it('`_.' + methodName + '` should return the index of the last matched value', function() {
      assert.strictEqual(func(array, resolve(3)), 5);
    });

    it('`_.' + methodName + '` should work with a positive `fromIndex`', function() {
      assert.strictEqual(func(array, resolve(1), 2), 0);
    });

    it('`_.' + methodName + '` should work with a `fromIndex` >= `length`', function() {
      var values = [6, 8, Math.pow(2, 32), Infinity],
          expected = lodashStable.map(values, lodashStable.constant([-1, 3, -1]));

      var actual = lodashStable.map(values, function(fromIndex) {
        return [
          func(array, resolve(undefined), fromIndex),
          func(array, resolve(1), fromIndex),
          func(array, resolve(''), fromIndex)
        ];
      });

      assert.deepStrictEqual(actual, expected);
    });

    it('`_.' + methodName + '` should work with a negative `fromIndex`', function() {
      assert.strictEqual(func(array, resolve(2), -3), 1);
    });

    it('`_.' + methodName + '` should work with a negative `fromIndex` <= `-length`', function() {
      var values = [-6, -8, -Infinity],
          expected = lodashStable.map(values, stubZero);

      var actual = lodashStable.map(values, function(fromIndex) {
        return func(array, resolve(1), fromIndex);
      });

      assert.deepStrictEqual(actual, expected);
    });

    it('`_.' + methodName + '` should treat falsey `fromIndex` values correctly', function() {
      var expected = lodashStable.map(falsey, function(value) {
        return value === undefined ? 5 : -1;
      });

      var actual = lodashStable.map(falsey, function(fromIndex) {
        return func(array, resolve(3), fromIndex);
      });

      assert.deepStrictEqual(actual, expected);
    });

    it('`_.' + methodName + '` should coerce `fromIndex` to an integer', function() {
      assert.strictEqual(func(array, resolve(2), 4.2), 4);
    });
  });
});
