import assert from 'assert';
import lodashStable from 'lodash';
import { _, identity, args, falsey } from './utils.js';

describe('find and includes', function() {
  lodashStable.each(['includes', 'find'], function(methodName) {
    var func = _[methodName],
        isIncludes = methodName == 'includes',
        resolve = methodName == 'find' ? lodashStable.curry(lodashStable.eq) : identity;

    lodashStable.each({
      'an `arguments` object': args,
      'an array': [1, 2, 3]
    },
    function(collection, key) {
      var values = lodashStable.toArray(collection);

      it('`_.' + methodName + '` should work with ' + key + ' and a positive `fromIndex`', function() {
        var expected = [
          isIncludes || values[2],
          isIncludes ? false : undefined
        ];

        var actual = [
          func(collection, resolve(values[2]), 2),
          func(collection, resolve(values[1]), 2)
        ];

        assert.deepStrictEqual(actual, expected);
      });

      it('`_.' + methodName + '` should work with ' + key + ' and a `fromIndex` >= `length`', function() {
        var indexes = [4, 6, Math.pow(2, 32), Infinity];

        var expected = lodashStable.map(indexes, function() {
          var result = isIncludes ? false : undefined;
          return [result, result, result];
        });

        var actual = lodashStable.map(indexes, function(fromIndex) {
          return [
            func(collection, resolve(1), fromIndex),
            func(collection, resolve(undefined), fromIndex),
            func(collection, resolve(''), fromIndex)
          ];
        });

        assert.deepStrictEqual(actual, expected);
      });

      it('`_.' + methodName + '` should work with ' + key + ' and treat falsey `fromIndex` values as `0`', function() {
        var expected = lodashStable.map(falsey, lodashStable.constant(isIncludes || values[0]));

        var actual = lodashStable.map(falsey, function(fromIndex) {
          return func(collection, resolve(values[0]), fromIndex);
        });

        assert.deepStrictEqual(actual, expected);
      });

      it('`_.' + methodName + '` should work with ' + key + ' and coerce `fromIndex` to an integer', function() {
        var expected = [
          isIncludes || values[0],
          isIncludes || values[0],
          isIncludes ? false : undefined
        ];

        var actual = [
          func(collection, resolve(values[0]), 0.1),
          func(collection, resolve(values[0]), NaN),
          func(collection, resolve(values[0]), '1')
        ];

        assert.deepStrictEqual(actual, expected);
      });

      it('`_.' + methodName + '` should work with ' + key + ' and a negative `fromIndex`', function() {
        var expected = [
          isIncludes || values[2],
          isIncludes ? false : undefined
        ];

        var actual = [
          func(collection, resolve(values[2]), -1),
          func(collection, resolve(values[1]), -1)
        ];

        assert.deepStrictEqual(actual, expected);
      });

      it('`_.' + methodName + '` should work with ' + key + ' and a negative `fromIndex` <= `-length`', function() {
        var indexes = [-4, -6, -Infinity],
            expected = lodashStable.map(indexes, lodashStable.constant(isIncludes || values[0]));

        var actual = lodashStable.map(indexes, function(fromIndex) {
          return func(collection, resolve(values[0]), fromIndex);
        });

        assert.deepStrictEqual(actual, expected);
      });
    });
  });
});
