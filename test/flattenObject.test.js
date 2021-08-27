import assert from 'assert'
import flattenObject from "../flattenObject"

describe('flattenObject', function() {
  it('should throw TypeError exception when input is not an object', function() {
    assert.throws(() => flattenObject(null), TypeError);
    assert.throws(() => flattenObject(5), TypeError);
    assert.throws(() => flattenObject([1, 2, 3]), TypeError);
  });

  it('should return same simple one layer object', function() {
    assert.deepStrictEqual(flattenObject({'a': 1}, '.'), {'a': 1});
    assert.deepStrictEqual(flattenObject({'a': 1, 'b': 2}, '.'), {'a': 1, 'b': 2});
  });

  it('should flatten two layer object', function() {
    assert.deepStrictEqual(flattenObject({'a': {'b': 1, 'c': 2}}, '.'), {'a.b': 1, 'a.c': 2});
    assert.deepStrictEqual(flattenObject({'a': 1, 'b': {'c': 1, 'd': 2}}, '.'), {'a': 1, 'b.c': 1, 'b.d': 2});
  });
});
