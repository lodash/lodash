const assert = require('assert');

describe('isStrictObject', function() {
  it('should return `true` for objects', function() {
  assert.deepStrictEqual(isStrictObject({}), true);
  assert.deepStrictEqual(isStrictObject(Object.create({})), true);
  assert.deepStrictEqual(isStrictObject({ wow: 'wow-again' }), true)
  });

  it('should return `false` for arrays', function() {
    assert.deepStrictEqual(isStrictObject(['beaver', 'alpaca', 'zebra', 'duck']), false);
    assert.deepStrictEqual(isStrictObject([]), false);
    assert.deepStrictEqual(isStrictObject(new Array(0)), false);
    assert.deepStrictEqual(isStrictObject(Array.from(0)), false);
  });

  it('should return `false` for other data types', function() {
    assert.deepStrictEqual(isStrictObject('string'), false);
    assert.deepStrictEqual(isStrictObject(Number(0)), false);
    assert.deepStrictEqual(isStrictObject(new Map()), false);
    assert.deepStrictEqual(isStrictObject(new WeakMap()), false);
    assert.deepStrictEqual(isStrictObject(new Set()), false);
    assert.deepStrictEqual(isStrictObject(true), false);
    assert.deepStrictEqual(isStrictObject(/x/), false);
  });
});
