import assert from 'assert';
import lodashStable from 'lodash';
import { weakSet, falsey, stubFalse, args, slice, set, symbol, realm } from './utils.js';
import isWeakSet from '../isWeakSet.js';

describe('isWeakSet', function() {
  it('should return `true` for weak sets', function() {
    if (WeakSet) {
      assert.strictEqual(isWeakSet(weakSet), true);
    }
  });

  it('should return `false` for non weak sets', function() {
    var expected = lodashStable.map(falsey, stubFalse);

    var actual = lodashStable.map(falsey, function(value, index) {
      return index ? isWeakSet(value) : isWeakSet();
    });

    assert.deepStrictEqual(actual, expected);

    assert.strictEqual(isWeakSet(args), false);
    assert.strictEqual(isWeakSet([1, 2, 3]), false);
    assert.strictEqual(isWeakSet(true), false);
    assert.strictEqual(isWeakSet(new Date), false);
    assert.strictEqual(isWeakSet(new Error), false);
    assert.strictEqual(isWeakSet(_), false);
    assert.strictEqual(isWeakSet(slice), false);
    assert.strictEqual(isWeakSet({ 'a': 1 }), false);
    assert.strictEqual(isWeakSet(1), false);
    assert.strictEqual(isWeakSet(/x/), false);
    assert.strictEqual(isWeakSet('a'), false);
    assert.strictEqual(isWeakSet(set), false);
    assert.strictEqual(isWeakSet(symbol), false);
  });

  it('should work with weak sets from another realm', function() {
    if (realm.weakSet) {
      assert.strictEqual(isWeakSet(realm.weakSet), true);
    }
  });
});
