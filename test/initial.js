import assert from 'assert';
import lodashStable from 'lodash';
import { falsey, stubArray, LARGE_ARRAY_SIZE } from './utils.js';
import initial from '../initial.js';

describe('initial', function() {
  var array = [1, 2, 3];

  it('should accept a falsey `array`', function() {
    var expected = lodashStable.map(falsey, stubArray);

    var actual = lodashStable.map(falsey, function(array, index) {
      try {
        return index ? initial(array) : initial();
      } catch (e) {}
    });

    assert.deepStrictEqual(actual, expected);
  });

  it('should exclude last element', function() {
    assert.deepStrictEqual(initial(array), [1, 2]);
  });

  it('should return an empty when querying empty arrays', function() {
    assert.deepStrictEqual(initial([]), []);
  });

  it('should work as an iteratee for methods like `_.map`', function() {
    var array = [[1, 2, 3], [4, 5, 6], [7, 8, 9]],
        actual = lodashStable.map(array, initial);

    assert.deepStrictEqual(actual, [[1, 2], [4, 5], [7, 8]]);
  });

  it('should work in a lazy sequence', function() {
    var array = lodashStable.range(LARGE_ARRAY_SIZE),
        values = [];

    var actual = _(array).initial().filter(function(value) {
      values.push(value);
      return false;
    })
    .value();

    assert.deepEqual(actual, []);
    assert.deepEqual(values, initial(array));

    values = [];

    actual = _(array).filter(function(value) {
      values.push(value);
      return isEven(value);
    })
    .initial()
    .value();

    assert.deepEqual(actual, initial(lodashStable.filter(array, isEven)));
    assert.deepEqual(values, array);
  });
});
