import assert from 'assert';
import lodashStable from 'lodash';
import { args, falsey } from './utils.js';
import findLast from '../findLast.js';

describe('findLast', function() {
  var resolve = lodashStable.curry(lodashStable.eq);

  lodashStable.each({
    'an `arguments` object': args,
    'an array': [1, 2, 3]
  },
  function(collection, key) {
    var values = lodashStable.toArray(collection);

    it('should work with ' + key + ' and a positive `fromIndex`', function() {
      var expected = [
        values[1],
        undefined
      ];

      var actual = [
        findLast(collection, resolve(values[1]), 1),
        findLast(collection, resolve(values[2]), 1)
      ];

      assert.deepStrictEqual(actual, expected);
    });

    it('should work with ' + key + ' and a `fromIndex` >= `length`', function() {
      var indexes = [4, 6, Math.pow(2, 32), Infinity];

      var expected = lodashStable.map(indexes, lodashStable.constant([values[0], undefined, undefined]));

      var actual = lodashStable.map(indexes, function(fromIndex) {
        return [
          findLast(collection, resolve(1), fromIndex),
          findLast(collection, resolve(undefined), fromIndex),
          findLast(collection, resolve(''), fromIndex)
        ];
      });

      assert.deepStrictEqual(actual, expected);
    });

    it('should work with ' + key + ' and treat falsey `fromIndex` values correctly', function() {
      var expected = lodashStable.map(falsey, function(value) {
        return value === undefined ? values[3] : undefined;
      });

      var actual = lodashStable.map(falsey, function(fromIndex) {
        return findLast(collection, resolve(values[3]), fromIndex);
      });

      assert.deepStrictEqual(actual, expected);
    });

    it('should work with ' + key + ' and coerce `fromIndex` to an integer', function() {
      var expected = [
        values[0],
        values[0],
        undefined
      ];

      var actual = [
        findLast(collection, resolve(values[0]), 0.1),
        findLast(collection, resolve(values[0]), NaN),
        findLast(collection, resolve(values[2]), '1')
      ];

      assert.deepStrictEqual(actual, expected);
    });

    it('should work with ' + key + ' and a negative `fromIndex`', function() {
      var expected = [
        values[1],
        undefined
      ];

      var actual = [
        findLast(collection, resolve(values[1]), -2),
        findLast(collection, resolve(values[2]), -2)
      ];

      assert.deepStrictEqual(actual, expected);
    });

    it('should work with ' + key + ' and a negative `fromIndex` <= `-length`', function() {
      var indexes = [-4, -6, -Infinity],
          expected = lodashStable.map(indexes, lodashStable.constant(values[0]));

      var actual = lodashStable.map(indexes, function(fromIndex) {
        return findLast(collection, resolve(values[0]), fromIndex);
      });

      assert.deepStrictEqual(actual, expected);
    });
  });
});
