import assert from 'assert';
import lodashStable from 'lodash';
import { falsey, args, slice, symbol, realm } from './utils.js';
import isNil from '../isNil.js';

describe('isNil', function() {
  it('should return `true` for nullish values', function() {
    assert.strictEqual(isNil(null), true);
    assert.strictEqual(isNil(), true);
    assert.strictEqual(isNil(undefined), true);
  });

  it('should return `false` for non-nullish values', function() {
    var expected = lodashStable.map(falsey, function(value) {
      return value == null;
    });

    var actual = lodashStable.map(falsey, function(value, index) {
      return index ? isNil(value) : isNil();
    });

    assert.deepStrictEqual(actual, expected);

    assert.strictEqual(isNil(args), false);
    assert.strictEqual(isNil([1, 2, 3]), false);
    assert.strictEqual(isNil(true), false);
    assert.strictEqual(isNil(new Date), false);
    assert.strictEqual(isNil(new Error), false);
    assert.strictEqual(isNil(_), false);
    assert.strictEqual(isNil(slice), false);
    assert.strictEqual(isNil({ 'a': 1 }), false);
    assert.strictEqual(isNil(1), false);
    assert.strictEqual(isNil(/x/), false);
    assert.strictEqual(isNil('a'), false);

    if (Symbol) {
      assert.strictEqual(isNil(symbol), false);
    }
  });

  it('should work with nils from another realm', function() {
    if (realm.object) {
      assert.strictEqual(isNil(realm.null), true);
      assert.strictEqual(isNil(realm.undefined), true);
    }
  });
});
