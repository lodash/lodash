import assert from 'assert';
import lodashStable from 'lodash';
import { LARGE_ARRAY_SIZE } from './utils.js';
import keyBy from '../keyBy.js';

describe('keyBy', function() {
  var array = [
    { 'dir': 'left', 'code': 97 },
    { 'dir': 'right', 'code': 100 }
  ];

  it('should transform keys by `iteratee`', function() {
    var expected = { 'a': { 'dir': 'left', 'code': 97 }, 'd': { 'dir': 'right', 'code': 100 } };

    var actual = keyBy(array, function(object) {
      return String.fromCharCode(object.code);
    });

    assert.deepStrictEqual(actual, expected);
  });

  it('should use `_.identity` when `iteratee` is nullish', function() {
    var array = [4, 6, 6],
        values = [, null, undefined],
        expected = lodashStable.map(values, lodashStable.constant({ '4': 4, '6': 6 }));

    var actual = lodashStable.map(values, function(value, index) {
      return index ? keyBy(array, value) : keyBy(array);
    });

    assert.deepStrictEqual(actual, expected);
  });

  it('should work with `_.property` shorthands', function() {
    var expected = { 'left': { 'dir': 'left', 'code': 97 }, 'right': { 'dir': 'right', 'code': 100 } },
        actual = keyBy(array, 'dir');

    assert.deepStrictEqual(actual, expected);
  });

  it('should only add values to own, not inherited, properties', function() {
    var actual = keyBy([6.1, 4.2, 6.3], function(n) {
      return Math.floor(n) > 4 ? 'hasOwnProperty' : 'constructor';
    });

    assert.deepStrictEqual(actual.constructor, 4.2);
    assert.deepStrictEqual(actual.hasOwnProperty, 6.3);
  });

  it('should work with a number for `iteratee`', function() {
    var array = [
      [1, 'a'],
      [2, 'a'],
      [2, 'b']
    ];

    assert.deepStrictEqual(keyBy(array, 0), { '1': [1, 'a'], '2': [2, 'b'] });
    assert.deepStrictEqual(keyBy(array, 1), { 'a': [2, 'a'], 'b': [2, 'b'] });
  });

  it('should work with an object for `collection`', function() {
    var actual = keyBy({ 'a': 6.1, 'b': 4.2, 'c': 6.3 }, Math.floor);
    assert.deepStrictEqual(actual, { '4': 4.2, '6': 6.3 });
  });

  it('should work in a lazy sequence', function() {
    var array = lodashStable.range(LARGE_ARRAY_SIZE).concat(
      lodashStable.range(Math.floor(LARGE_ARRAY_SIZE / 2), LARGE_ARRAY_SIZE),
      lodashStable.range(Math.floor(LARGE_ARRAY_SIZE / 1.5), LARGE_ARRAY_SIZE)
    );

    var actual = _(array).keyBy().map(square).filter(isEven).take().value();

    assert.deepEqual(actual, _.take(_.filter(_.map(keyBy(array), square), isEven)));
  });
});
