import assert from 'assert';
import lodashStable from 'lodash';
import { falsey, args, slice, symbol, realm } from './utils.js';
import isNullish from '../isNullish.js';

describe('isNullish', function() {
  it('should return `true` for `null` values', function() {
    assert.strictEqual(isNullish(null), true);
  });

  it('should return `true` for `undefined` values', function() {
    assert.strictEqual(isNullish(undefined), true);
  });

  it('should return `false` for non-nullish values', function() {
    var expected = lodashStable.map(falsey, function(value) {
      return value === null || value === undefined;
    });

    var actual = lodashStable.map(falsey, function(value, index) {
      return index ? isNullish(value) : isNullish();
    });

    assert.deepStrictEqual(actual, expected);

    assert.strictEqual(isNullish(args), false);
    assert.strictEqual(isNullish([1, 2, 3]), false);
    assert.strictEqual(isNullish(true), false);
    assert.strictEqual(isNullish(new Date), false);
    assert.strictEqual(isNullish(new Error), false);
    assert.strictEqual(isNullish(_), false);
    assert.strictEqual(isNullish(slice), false);
    assert.strictEqual(isNullish({ 'a': 1 }), false);
    assert.strictEqual(isNullish(1), false);
    assert.strictEqual(isNullish(/x/), false);
    assert.strictEqual(isNullish('a'), false);
    assert.strictEqual(isNullish(symbol), false);
  });

  it('should work with nulls from another realm', function() {
    if (realm.object) {
      assert.strictEqual(isNullish(realm.null), true);
    }
  });

  it('should work with `undefined` from another realm', function() {
    if (realm.object) {
      assert.strictEqual(isNullish(realm.undefined), true);
    }
  });
});
