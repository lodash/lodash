import assert from 'assert';
import lodashStable from 'lodash';
import { args, stubTrue, falsey, asyncFunc, genFunc, slice, symbol, realm } from './utils.js';
import isArrayLike from '../isArrayLike.js';

describe('isArrayLike', function() {
  it('should return `true` for array-like values', function() {
    var values = [args, [1, 2, 3], { '0': 'a', 'length': 1 }, 'a'],
        expected = lodashStable.map(values, stubTrue),
        actual = lodashStable.map(values, isArrayLike);

    assert.deepStrictEqual(actual, expected);
  });

  it('should return `false` for non-arrays', function() {
    var expected = lodashStable.map(falsey, function(value) {
      return value === '';
    });

    var actual = lodashStable.map(falsey, function(value, index) {
      return index ? isArrayLike(value) : isArrayLike();
    });

    assert.deepStrictEqual(actual, expected);

    assert.strictEqual(isArrayLike(true), false);
    assert.strictEqual(isArrayLike(new Date), false);
    assert.strictEqual(isArrayLike(new Error), false);
    assert.strictEqual(isArrayLike(_), false);
    assert.strictEqual(isArrayLike(asyncFunc), false);
    assert.strictEqual(isArrayLike(genFunc), false);
    assert.strictEqual(isArrayLike(slice), false);
    assert.strictEqual(isArrayLike({ 'a': 1 }), false);
    assert.strictEqual(isArrayLike(1), false);
    assert.strictEqual(isArrayLike(/x/), false);
    assert.strictEqual(isArrayLike(symbol), false);
  });

  it('should work with an array from another realm', function() {
    if (realm.object) {
      var values = [realm.arguments, realm.array, realm.string],
          expected = lodashStable.map(values, stubTrue),
          actual = lodashStable.map(values, isArrayLike);

      assert.deepStrictEqual(actual, expected);
    }
  });
});
