import assert from 'assert';
import lodashStable from 'lodash';
import concat from '../concat.js';

describe('concat', function() {
  it('should shallow clone `array`', function() {
    let array = [1, 2, 3],
        actual = concat(array);

    assert.deepStrictEqual(actual, array);
    assert.notStrictEqual(actual, array);
  });

  it('should concat arrays and values', function() {
    let array = [1],
        actual = concat(array, 2, [3], [[4]]);

    assert.deepStrictEqual(actual, [1, 2, 3, [4]]);
    assert.deepStrictEqual(array, [1]);
  });

  it('should cast non-array `array` values to arrays', function() {
    let values = [, null, undefined, false, true, 1, NaN, 'a'];

    let expected = lodashStable.map(values, function(value, index) {
      return index ? [value] : [];
    });

    let actual = lodashStable.map(values, function(value, index) {
      return index ? concat(value) : concat();
    });

    assert.deepStrictEqual(actual, expected);

    expected = lodashStable.map(values, function(value) {
      return [value, 2, [3]];
    });

    actual = lodashStable.map(values, function(value) {
      return concat(value, [2], [[3]]);
    });

    assert.deepStrictEqual(actual, expected);
  });

  it('should treat sparse arrays as dense', function() {
    let expected = [],
        actual = concat(Array(1), Array(1));

    expected.push(undefined, undefined);

    assert.ok('0'in actual);
    assert.ok('1' in actual);
    assert.deepStrictEqual(actual, expected);
  });

  it('should return a new wrapped array', function() {
    let array = [1],
        wrapped = _(array).concat([2, 3]),
        actual = wrapped.value();

    assert.deepEqual(array, [1]);
    assert.deepEqual(actual, [1, 2, 3]);
  });
});
