import assert from 'assert';
import lodashStable from 'lodash';
import { weakMap, falsey, stubFalse, args, slice, map, symbol, realm } from './utils.js';
import isWeakMap from '../isWeakMap.js';

describe('isWeakMap', function() {
  it('should return `true` for weak maps', function() {
    if (WeakMap) {
      assert.strictEqual(isWeakMap(weakMap), true);
    }
  });

  it('should return `false` for non weak maps', function() {
    var expected = lodashStable.map(falsey, stubFalse);

    var actual = lodashStable.map(falsey, function(value, index) {
      return index ? isWeakMap(value) : isWeakMap();
    });

    assert.deepStrictEqual(actual, expected);

    assert.strictEqual(isWeakMap(args), false);
    assert.strictEqual(isWeakMap([1, 2, 3]), false);
    assert.strictEqual(isWeakMap(true), false);
    assert.strictEqual(isWeakMap(new Date), false);
    assert.strictEqual(isWeakMap(new Error), false);
    assert.strictEqual(isWeakMap(_), false);
    assert.strictEqual(isWeakMap(slice), false);
    assert.strictEqual(isWeakMap({ 'a': 1 }), false);
    assert.strictEqual(isWeakMap(map), false);
    assert.strictEqual(isWeakMap(1), false);
    assert.strictEqual(isWeakMap(/x/), false);
    assert.strictEqual(isWeakMap('a'), false);
    assert.strictEqual(isWeakMap(symbol), false);
  });

  it('should work for objects with a non-function `constructor` (test in IE 11)', function() {
    var values = [false, true],
        expected = lodashStable.map(values, stubFalse);

    var actual = lodashStable.map(values, function(value) {
      return isWeakMap({ 'constructor': value });
    });

    assert.deepStrictEqual(actual, expected);
  });

  it('should work with weak maps from another realm', function() {
    if (realm.weakMap) {
      assert.strictEqual(isWeakMap(realm.weakMap), true);
    }
  });
});
