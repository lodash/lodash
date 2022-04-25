import assert from 'assert';
import hasPath from '../hasPath.js';

describe('hasPath', function() {
  describe('hasPath(Object)', function() {
    it('should return true if string key is in object', function() {
      assert.strictEqual(hasPath({ 'a': 1 }, "a"), true);
      assert.strictEqual(hasPath({ 'a': { 'b': 2 } }, "a.b"), true);
    });

    it('should return true if array of keys is in object', function() {
      assert.strictEqual(hasPath({ 'a': 1 }, [ "a" ]), true);
      assert.strictEqual(hasPath({ 'a': { 'b': 2 } }, [ "a", "b" ]), true);
    });

    it('should return false if key is not in object', function() {
      assert.strictEqual(hasPath({ 'a': { 'b': 2 } }, "not-in"), false);
      assert.strictEqual(hasPath({ 'a': { 'b': 2 } }, [ "not-in" ]), false);
      assert.strictEqual(hasPath({ 'a': { 'b': 2 } }, "a.not-in"), false);
    });

    it('should not error with empty object', function() {
      assert.strictEqual(hasPath({}, "a"), false);
    });

    it('should not alter the object', function() {
      const originalObject = { 'a': { 'b': 2 } };
      const objectUnderTest = { 'a': { 'b': 2 } };
  
      hasPath(objectUnderTest, "a");
      hasPath(objectUnderTest, [ "a.b" ]);
  
      assert.deepStrictEqual(objectUnderTest, originalObject);
    });

    it('should not call legnth getter on object', function() {
      const testObject = {
        a: {
          b: "2"
        },
        get length() {
          throw new Error("Object length was called")
        }
      };

      // Should not throw
      hasPath(testObject, "a");
      hasPath(testObject, [ "a.b" ]);
    });
  });

  describe('hasPath(Array)', function() {
    it('should return true if string key is in array', function() {
      assert.strictEqual(hasPath([ 1, 2, 3 ], '2'), true);
      assert.strictEqual(hasPath([ [ 1 ], 2, 3 ], '0.0'), true);
    });

    it('should return true if array of keys is in array', function() {
      assert.strictEqual(hasPath([1, 2, 3], [ 2 ]), true);
      assert.strictEqual(hasPath([ [ 1 ], 2, 3 ], [ 0, 0 ]), true);
    });

    it('should not error with empty array', function() {
      assert.strictEqual(hasPath([], "0"), false);
    });
  });

  describe('hasPath(Function)', function() {
    it('should return true if string key is in function arguments', function() {
      function testFn(a,b,c){ return arguments }
      assert.strictEqual(hasPath(testFn(1, 2, 3), "2"), true);
      assert.strictEqual(hasPath(testFn(1, { a: '2' }, 3), "1.a"), true);
    });

    it('should return true if array of keys is in function arguments', function() {
      function testFn(a,b,c){ return arguments }
      assert.strictEqual(hasPath(testFn(1, 2, 3), [ "2" ]), true);
      assert.strictEqual(hasPath(testFn(1, { a: '2' }, 3), [ "1", "a" ]), true);
    });
  });

  describe('hasPath(Class)', function() {
    it('should not error when passed a class', function() {
      class TestClass {
        constructor() {
          this.a = {
            b: "2"
          }
        }
      }

      const TestOBject = new TestClass()

      assert.strictEqual(hasPath(TestOBject, "not-in"), false);
      assert.strictEqual(hasPath(TestOBject, "a"), true);
      assert.strictEqual(hasPath(TestOBject, "a.b"), true);
    });

    it('should not call legnth getter on class', function() {
      class TestClass {
        constructor() {
          this.a = {
            b: "2"
          }
        }

        get length() {
          throw new Error("Class length was called")
        }
      }

      const TestOBject = new TestClass()

      // Should not throw
      hasPath(TestOBject, "a");
      hasPath(TestOBject, [ "a.b" ]);
    });
  });
});
