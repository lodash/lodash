import assert from 'assert';
import lodashStable from 'lodash';
import { falsey, args, slice, symbol, realm } from './utils.js';
import isNaN from '../isNaN.js';

describe('isNaN', function() {
  it('should return `true` for NaNs', function() {
    assert.strictEqual(isNaN(NaN), true);
    assert.strictEqual(isNaN(Object(NaN)), true);
  });

  it('should return `false` for non-NaNs', function() {
    var expected = lodashStable.map(falsey, function(value) {
      return value !== value;
    });

    var actual = lodashStable.map(falsey, function(value, index) {
      return index ? isNaN(value) : isNaN();
    });

    assert.deepStrictEqual(actual, expected);

    assert.strictEqual(isNaN(args), false);
    assert.strictEqual(isNaN([1, 2, 3]), false);
    assert.strictEqual(isNaN(true), false);
    assert.strictEqual(isNaN(new Date), false);
    assert.strictEqual(isNaN(new Error), false);
    assert.strictEqual(isNaN(_), false);
    assert.strictEqual(isNaN(slice), false);
    assert.strictEqual(isNaN({ 'a': 1 }), false);
    assert.strictEqual(isNaN(1), false);
    assert.strictEqual(isNaN(Object(1)), false);
    assert.strictEqual(isNaN(/x/), false);
    assert.strictEqual(isNaN('a'), false);
    assert.strictEqual(isNaN(symbol), false);
  });

  it('should work with `NaN` from another realm', function() {
    if (realm.object) {
      assert.strictEqual(isNaN(realm.nan), true);
    }
  });
});
