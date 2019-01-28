import assert from 'assert';
import lodashStable from 'lodash';
import { map, falsey, stubFalse, args, slice, symbol, weakMap, realm } from './utils.js';
import isMap from '../isMap.js';

describe('isMap', function() {
  it('should return `true` for maps', function() {
    if (Map) {
      assert.strictEqual(isMap(map), true);
    }
  });

  it('should return `false` for non-maps', function() {
    var expected = lodashStable.map(falsey, stubFalse);

    var actual = lodashStable.map(falsey, function(value, index) {
      return index ? isMap(value) : isMap();
    });

    assert.deepStrictEqual(actual, expected);

    assert.strictEqual(isMap(args), false);
    assert.strictEqual(isMap([1, 2, 3]), false);
    assert.strictEqual(isMap(true), false);
    assert.strictEqual(isMap(new Date), false);
    assert.strictEqual(isMap(new Error), false);
    assert.strictEqual(isMap(_), false);
    assert.strictEqual(isMap(slice), false);
    assert.strictEqual(isMap({ 'a': 1 }), false);
    assert.strictEqual(isMap(1), false);
    assert.strictEqual(isMap(/x/), false);
    assert.strictEqual(isMap('a'), false);
    assert.strictEqual(isMap(symbol), false);
    assert.strictEqual(isMap(weakMap), false);
  });

  it('should work for objects with a non-function `constructor` (test in IE 11)', function() {
    var values = [false, true],
        expected = lodashStable.map(values, stubFalse);

    var actual = lodashStable.map(values, function(value) {
      return isMap({ 'constructor': value });
    });

    assert.deepStrictEqual(actual, expected);
  });

  it('should work with maps from another realm', function() {
    if (realm.map) {
      assert.strictEqual(isMap(realm.map), true);
    }
  });
});
