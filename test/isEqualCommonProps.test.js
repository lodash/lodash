import assert from 'assert';
import isEqualCommonProps from '../isEqualCommonProps';

describe('isEqualCommonProps', function() {
  it('should return `true` for objects with equal common properties', function() {
    const objectA = { c: 3, a: 1, b: 2 };
    const objectB = { a: 1, d: 5, b: 2 };

    assert.strictEqual(isEqualCommonProps(objectA, objectB), true);
  });

  it('should return `false` for objects with common properties with different values', function() {
    const objectA = { c: 3, a: 1, b: 2 };
    const objectB = { a: 8, d: 5, b: 2 };

    assert.strictEqual(isEqualCommonProps(objectA, objectB), false);
  });

  it('should return `false` for objects with no common properties', function() {
    const objectA = { c: 3, a: 1, b: 2 };
    const objectB = { d: 3, e: 1, f: 2 };

    assert.strictEqual(isEqualCommonProps(objectA, objectB), false);
  });

  it('should return `false` when one of the objects is `null`', function() {
    const objectA = { c: 3, a: 1, b: 2 };

    assert.strictEqual(isEqualCommonProps(objectA, null), false);
  });

  it('should return `false` when one of the objects is `undefined`', function() {
    const objectA = { c: 3, a: 1, b: 2 };

    assert.strictEqual(isEqualCommonProps(objectA, undefined), false);
  });

  it("should return `false` when one of the objects is `{}` but the other isn't", function() {
    const objectA = { c: 3, a: 1, b: 2 };

    assert.strictEqual(isEqualCommonProps(objectA, {}), false);
  });

  it('should return `true` when both objects are `{}`', function() {
    assert.strictEqual(isEqualCommonProps({}, {}), true);
  });
});
