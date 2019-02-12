import assert from 'assert';
import lodashStable from 'lodash';
import { LARGE_ARRAY_SIZE } from './utils.js';
import countBy from '../countBy.js';

describe('countBy', function() {
  var array = [6.1, 4.2, 6.3];

  it('should transform keys by `iteratee`', function() {
    var actual = countBy(array, Math.floor);
    assert.deepStrictEqual(actual, { '4': 1, '6': 2 });
  });

  it('should use `_.identity` when `iteratee` is nullish', function() {
    var array = [4, 6, 6],
        values = [, null, undefined],
        expected = lodashStable.map(values, lodashStable.constant({ '4': 1, '6':  2 }));

    var actual = lodashStable.map(values, function(value, index) {
      return index ? countBy(array, value) : countBy(array);
    });

    assert.deepStrictEqual(actual, expected);
  });

  it('should work with `_.property` shorthands', function() {
    var actual = countBy(['one', 'two', 'three'], 'length');
    assert.deepStrictEqual(actual, { '3': 2, '5': 1 });
  });

  it('should only add values to own, not inherited, properties', function() {
    var actual = countBy(array, function(n) {
      return Math.floor(n) > 4 ? 'hasOwnProperty' : 'constructor';
    });

    assert.deepStrictEqual(actual.constructor, 1);
    assert.deepStrictEqual(actual.hasOwnProperty, 2);
  });

  it('should work with a number for `iteratee`', function() {
    var array = [
      [1, 'a'],
      [2, 'a'],
      [2, 'b']
    ];

    assert.deepStrictEqual(countBy(array, 0), { '1': 1, '2': 2 });
    assert.deepStrictEqual(countBy(array, 1), { 'a': 2, 'b': 1 });
  });

  it('should work with an object for `collection`', function() {
    var actual = countBy({ 'a': 6.1, 'b': 4.2, 'c': 6.3 }, Math.floor);
    assert.deepStrictEqual(actual, { '4': 1, '6': 2 });
  });

  it('should work in a lazy sequence', function() {
    var array = lodashStable.range(LARGE_ARRAY_SIZE).concat(
      lodashStable.range(Math.floor(LARGE_ARRAY_SIZE / 2), LARGE_ARRAY_SIZE),
      lodashStable.range(Math.floor(LARGE_ARRAY_SIZE / 1.5), LARGE_ARRAY_SIZE)
    );

    var actual = _(array).countBy().map(square).filter(isEven).take().value();

    assert.deepEqual(actual, _.take(_.filter(_.map(countBy(array), square), isEven)));
  });
});
