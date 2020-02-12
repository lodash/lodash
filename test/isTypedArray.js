import assert from 'assert';
import lodashStable from 'lodash';
import { typedArrays, falsey, stubFalse, args, slice, symbol, realm } from './utils.js';
import isTypedArray from '../isTypedArray.js';

describe('isTypedArray', function() {
  it('should return `true` for typed arrays', function() {
    var expected = lodashStable.map(typedArrays, function(type) {
      return type in root;
    });

    var actual = lodashStable.map(typedArrays, function(type) {
      var Ctor = root[type];
      return Ctor ? isTypedArray(new Ctor(new ArrayBuffer(8))) : false;
    });

    assert.deepStrictEqual(actual, expected);
  });

  it('should return `false` for non typed arrays', function() {
    var expected = lodashStable.map(falsey, stubFalse);

    var actual = lodashStable.map(falsey, function(value, index) {
      return index ? isTypedArray(value) : isTypedArray();
    });

    assert.deepStrictEqual(actual, expected);

    assert.strictEqual(isTypedArray(args), false);
    assert.strictEqual(isTypedArray([1, 2, 3]), false);
    assert.strictEqual(isTypedArray(true), false);
    assert.strictEqual(isTypedArray(new Date), false);
    assert.strictEqual(isTypedArray(new Error), false);
    assert.strictEqual(isTypedArray(_), false);
    assert.strictEqual(isTypedArray(slice), false);
    assert.strictEqual(isTypedArray({ 'a': 1 }), false);
    assert.strictEqual(isTypedArray(1), false);
    assert.strictEqual(isTypedArray(/x/), false);
    assert.strictEqual(isTypedArray('a'), false);
    assert.strictEqual(isTypedArray(symbol), false);
  });

  it('should work with typed arrays from another realm', function() {
    if (realm.object) {
      var props = lodashStable.invokeMap(typedArrays, 'toLowerCase');

      var expected = lodashStable.map(props, function(key) {
        return realm[key] !== undefined;
      });

      var actual = lodashStable.map(props, function(key) {
        var value = realm[key];
        return value ? isTypedArray(value) : false;
      });

      assert.deepStrictEqual(actual, expected);
    }
  });
});
