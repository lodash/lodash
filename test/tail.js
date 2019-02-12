import assert from 'assert';
import lodashStable from 'lodash';
import { falsey, stubArray, LARGE_ARRAY_SIZE } from './utils.js';
import tail from '../tail.js';

describe('tail', function() {
  var array = [1, 2, 3];

  it('should accept a falsey `array`', function() {
    var expected = lodashStable.map(falsey, stubArray);

    var actual = lodashStable.map(falsey, function(array, index) {
      try {
        return index ? tail(array) : tail();
      } catch (e) {}
    });

    assert.deepStrictEqual(actual, expected);
  });

  it('should exclude the first element', function() {
    assert.deepStrictEqual(tail(array), [2, 3]);
  });

  it('should return an empty when querying empty arrays', function() {
    assert.deepStrictEqual(tail([]), []);
  });

  it('should work as an iteratee for methods like `_.map`', function() {
    var array = [[1, 2, 3], [4, 5, 6], [7, 8, 9]],
        actual = lodashStable.map(array, tail);

    assert.deepStrictEqual(actual, [[2, 3], [5, 6], [8, 9]]);
  });

  it('should work in a lazy sequence', function() {
    var array = lodashStable.range(LARGE_ARRAY_SIZE),
        values = [];

    var actual = _(array).tail().filter(function(value) {
      values.push(value);
      return false;
    })
    .value();

    assert.deepEqual(actual, []);
    assert.deepEqual(values, array.slice(1));

    values = [];

    actual = _(array).filter(function(value) {
      values.push(value);
      return isEven(value);
    })
    .tail()
    .value();

    assert.deepEqual(actual, tail(_.filter(array, isEven)));
    assert.deepEqual(values, array);
  });

  it('should not execute subsequent iteratees on an empty array in a lazy sequence', function() {
    var array = lodashStable.range(LARGE_ARRAY_SIZE),
        iteratee = function() { pass = false; },
        pass = true,
        actual = _(array).slice(0, 1).tail().map(iteratee).value();

    assert.ok(pass);
    assert.deepEqual(actual, []);

    pass = true;
    actual = _(array).filter().slice(0, 1).tail().map(iteratee).value();

    assert.ok(pass);
    assert.deepEqual(actual, []);
  });
});
