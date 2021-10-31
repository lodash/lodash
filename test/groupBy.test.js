import assert from 'assert';
import lodashStable from 'lodash';
import { isEven, LARGE_ARRAY_SIZE } from './utils.js';
import groupBy from '../groupBy.js';

describe('groupBy', function() {
  var array = [6.1, 4.2, 6.3];

  it('should transform keys by `iteratee`', function() {
    var actual = groupBy(array, Math.floor);
    assert.deepStrictEqual(actual, { '4': [4.2], '6': [6.1, 6.3] });
  });

  // TODO: Either remove, or establish that this is desirable behavior update groupBy to let this pass
  it.skip('should use `_.identity` when `iteratee` is nullish', function() {
    var array = [6, 4, 6],
        values = [, null, undefined],
        expected = lodashStable.map(values, lodashStable.constant({ '4': [4], '6':  [6, 6] }));

    var actual = lodashStable.map(values, function(value, index) {
      return index ? groupBy(array, value) : groupBy(array);
    });

    assert.deepStrictEqual(actual, expected);
  });

  // TODO: Either remove, or establish that this is desirable behavior and update groupBy to let this pass
  it.skip('should work with `_.property` shorthands', function() {
    var actual = groupBy(['one', 'two', 'three'], 'length');
    assert.deepStrictEqual(actual, { '3': ['one', 'two'], '5': ['three'] });
  });

  it('should only add values to own, not inherited, properties', function() {
    var actual = groupBy(array, function(n) {
      return Math.floor(n) > 4 ? 'hasOwnProperty' : 'constructor';
    });

    assert.deepStrictEqual(actual.constructor, [4.2]);
    assert.deepStrictEqual(actual.hasOwnProperty, [6.1, 6.3]);
  });

  // TODO: Either remove, or establish that this is desirable behavior and update groupBy to let this pass
  it.skip('should work with a number for `iteratee`', function() {
    var array = [
      [1, 'a'],
      [2, 'a'],
      [2, 'b']
    ];

    assert.deepStrictEqual(groupBy(array, 0), { '1': [[1, 'a']], '2': [[2, 'a'], [2, 'b']] });
    assert.deepStrictEqual(groupBy(array, 1), { 'a': [[1, 'a'], [2, 'a']], 'b': [[2, 'b']] });
  });

  it('should work with an object for `collection`', function() {
    var actual = groupBy({ 'a': 6.1, 'b': 4.2, 'c': 6.3 }, Math.floor);
    assert.deepStrictEqual(actual, { '4': [4.2], '6': [6.1, 6.3] });
  });

  // TODO: Either remove, or establish that this is desirable behavior and update groupBy to let this pass
  it.skip('should work in a lazy sequence', function() {
    var array = lodashStable.range(LARGE_ARRAY_SIZE).concat(
      lodashStable.range(Math.floor(LARGE_ARRAY_SIZE / 2), LARGE_ARRAY_SIZE),
      lodashStable.range(Math.floor(LARGE_ARRAY_SIZE / 1.5), LARGE_ARRAY_SIZE)
    );

    var iteratee = function(value) { value.push(value[0]); return value; },
        predicate = function(value) { return isEven(value[0]); },
        actual = _(array).groupBy().map(iteratee).filter(predicate).take().value();

    assert.deepEqual(actual, _.take(_.filter(lodashStable.map(groupBy(array), iteratee), predicate)));
  });

  it('should work with a collection of objects', function() {
    var array = [
      { 'group': 'a', 'value': 6.1 },
      { 'group': 'a', 'value': 4.2 },
      { 'group': 'b', 'value': 6.3 },
    ];

    var iteratee = function(value) { return value.group; },
        actual = groupBy(array, iteratee);

    assert.deepStrictEqual(actual.a, [{ 'group': 'a', 'value': 6.1 }, { 'group': 'a', 'value': 4.2 }]);
    assert.deepStrictEqual(actual.b, [{ 'group': 'b', 'value': 6.3 }]);
  });

  it('should work with a collection of objects, grouping by a number value', function() {
    var array = [
      { 'a': 0, 'b': 0 },
      { 'a': 1, 'b': 0 },
      { 'a': 1, 'b': 1 }
    ];
    
    var iteratee = function(value) { return value.a; },
        actual = groupBy(array, iteratee);

    assert.deepStrictEqual(actual, { 0: [{ 'a': 0, 'b': 0 }], 1: [{ 'a': 1, 'b': 0 }, { 'a': 1, 'b': 1 }] });
  });
});
