import assert from 'assert';
import lodashStable from 'lodash';
import { falsey, args, slice, symbol, realm } from './utils.js';
import isUndefined from '../isUndefined.js';

describe('isUndefined', function() {
  it('should return `true` for `undefined` values', function() {
    assert.strictEqual(isUndefined(), true);
    assert.strictEqual(isUndefined(undefined), true);
  });

  it('should return `false` for non `undefined` values', function() {
    var expected = lodashStable.map(falsey, function(value) {
      return value === undefined;
    });

    var actual = lodashStable.map(falsey, function(value, index) {
      return index ? isUndefined(value) : isUndefined();
    });

    assert.deepStrictEqual(actual, expected);

    assert.strictEqual(isUndefined(args), false);
    assert.strictEqual(isUndefined([1, 2, 3]), false);
    assert.strictEqual(isUndefined(true), false);
    assert.strictEqual(isUndefined(new Date), false);
    assert.strictEqual(isUndefined(new Error), false);
    assert.strictEqual(isUndefined(_), false);
    assert.strictEqual(isUndefined(slice), false);
    assert.strictEqual(isUndefined({ 'a': 1 }), false);
    assert.strictEqual(isUndefined(1), false);
    assert.strictEqual(isUndefined(/x/), false);
    assert.strictEqual(isUndefined('a'), false);

    if (Symbol) {
      assert.strictEqual(isUndefined(symbol), false);
    }
  });

  it('should work with `undefined` from another realm', function() {
    if (realm.object) {
      assert.strictEqual(isUndefined(realm.undefined), true);
    }
  });
});
