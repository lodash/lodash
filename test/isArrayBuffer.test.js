import assert from 'assert';
import lodashStable from 'lodash';
import { arrayBuffer, falsey, stubFalse, args, slice, symbol, realm } from './utils.js';
import isArrayBuffer from '../isArrayBuffer.js';

describe('isArrayBuffer', function() {
  it('should return `true` for array buffers', function() {
    if (ArrayBuffer) {
      assert.strictEqual(isArrayBuffer(arrayBuffer), true);
    }
  });

  it('should return `false` for non array buffers', function() {
    var expected = lodashStable.map(falsey, stubFalse);

    var actual = lodashStable.map(falsey, function(value, index) {
      return index ? isArrayBuffer(value) : isArrayBuffer();
    });

    assert.deepStrictEqual(actual, expected);

    assert.strictEqual(isArrayBuffer(args), false);
    assert.strictEqual(isArrayBuffer([1]), false);
    assert.strictEqual(isArrayBuffer(true), false);
    assert.strictEqual(isArrayBuffer(new Date), false);
    assert.strictEqual(isArrayBuffer(new Error), false);
    assert.strictEqual(isArrayBuffer(_), false);
    assert.strictEqual(isArrayBuffer(slice), false);
    assert.strictEqual(isArrayBuffer({ 'a': 1 }), false);
    assert.strictEqual(isArrayBuffer(1), false);
    assert.strictEqual(isArrayBuffer(/x/), false);
    assert.strictEqual(isArrayBuffer('a'), false);
    assert.strictEqual(isArrayBuffer(symbol), false);
  });

  it('should work with array buffers from another realm', function() {
    if (realm.arrayBuffer) {
      assert.strictEqual(isArrayBuffer(realm.arrayBuffer), true);
    }
  });
});
