import assert from 'assert';
import lodashStable from 'lodash';
import sortBy from '../sortBy.js';

describe('sortBy', function() {
  var objects = [
    { 'a': 'x', 'b': 3 },
    { 'a': 'y', 'b': 4 },
    { 'a': 'x', 'b': 1 },
    { 'a': 'y', 'b': 2 }
  ];

  it('should sort in ascending order by `iteratee`', function() {
    var actual = lodashStable.map(sortBy(objects, function(object) {
      return object.b;
    }), 'b');

    assert.deepStrictEqual(actual, [1, 2, 3, 4]);
  });

  it('should use `_.identity` when `iteratee` is nullish', function() {
    var array = [3, 2, 1],
        values = [, null, undefined],
        expected = lodashStable.map(values, lodashStable.constant([1, 2, 3]));

    var actual = lodashStable.map(values, function(value, index) {
      return index ? sortBy(array, value) : sortBy(array);
    });

    assert.deepStrictEqual(actual, expected);
  });

  it('should work with `_.property` shorthands', function() {
    var actual = lodashStable.map(sortBy(objects.concat(undefined), 'b'), 'b');
    assert.deepStrictEqual(actual, [1, 2, 3, 4, undefined]);
  });

  it('should work with an object for `collection`', function() {
    var actual = sortBy({ 'a': 1, 'b': 2, 'c': 3 }, Math.sin);
    assert.deepStrictEqual(actual, [3, 1, 2]);
  });

  it('should move `NaN`, nullish, and symbol values to the end', function() {
    var symbol1 = Symbol ? Symbol('a') : null,
        symbol2 = Symbol ? Symbol('b') : null,
        array = [NaN, undefined, null, 4, symbol1, null, 1, symbol2, undefined, 3, NaN, 2],
        expected = [1, 2, 3, 4, symbol1, symbol2, null, null, undefined, undefined, NaN, NaN];

    assert.deepStrictEqual(sortBy(array), expected);

    array = [NaN, undefined, symbol1, null, 'd', null, 'a', symbol2, undefined, 'c', NaN, 'b'];
    expected = ['a', 'b', 'c', 'd', symbol1, symbol2, null, null, undefined, undefined, NaN, NaN];

    assert.deepStrictEqual(sortBy(array), expected);
  });

  it('should treat number values for `collection` as empty', function() {
    assert.deepStrictEqual(sortBy(1), []);
  });

  it('should coerce arrays returned from `iteratee`', function() {
    var actual = sortBy(objects, function(object) {
      var result = [object.a, object.b];
      result.toString = function() { return String(this[0]); };
      return result;
    });

    assert.deepStrictEqual(actual, [objects[0], objects[2], objects[1], objects[3]]);
  });

  it('should work as an iteratee for methods like `_.map`', function() {
    var actual = lodashStable.map([[2, 1, 3], [3, 2, 1]], sortBy);
    assert.deepStrictEqual(actual, [[1, 2, 3], [1, 2, 3]]);
  });
});
