import assert from 'assert';
import lodashStable from 'lodash';

import {
  empties,
  stubTrue,
  slice,
  symbol,
  args,
  push,
  arrayProto,
  realm,
  MAX_SAFE_INTEGER,
} from './utils.js';

import isEmpty from '../isEmpty.js';

describe('isEmpty', function() {
  it('should return `true` for empty values', function() {
    var expected = lodashStable.map(empties, stubTrue),
        actual = lodashStable.map(empties, isEmpty);

    assert.deepStrictEqual(actual, expected);

    assert.strictEqual(isEmpty(true), true);
    assert.strictEqual(isEmpty(slice), true);
    assert.strictEqual(isEmpty(1), true);
    assert.strictEqual(isEmpty(NaN), true);
    assert.strictEqual(isEmpty(/x/), true);
    assert.strictEqual(isEmpty(symbol), true);
    assert.strictEqual(isEmpty(), true);

    if (Buffer) {
      assert.strictEqual(isEmpty(new Buffer(0)), true);
      assert.strictEqual(isEmpty(new Buffer(1)), false);
    }
  });

  it('should return `false` for non-empty values', function() {
    assert.strictEqual(isEmpty([0]), false);
    assert.strictEqual(isEmpty({ 'a': 0 }), false);
    assert.strictEqual(isEmpty('a'), false);
  });

  it('should work with an object that has a `length` property', function() {
    assert.strictEqual(isEmpty({ 'length': 0 }), false);
  });

  it('should work with `arguments` objects', function() {
    assert.strictEqual(isEmpty(args), false);
  });

  it('should work with prototype objects', function() {
    function Foo() {}
    Foo.prototype = { 'constructor': Foo };

    assert.strictEqual(isEmpty(Foo.prototype), true);

    Foo.prototype.a = 1;
    assert.strictEqual(isEmpty(Foo.prototype), false);
  });

  it('should work with jQuery/MooTools DOM query collections', function() {
    function Foo(elements) {
      push.apply(this, elements);
    }
    Foo.prototype = { 'length': 0, 'splice': arrayProto.splice };

    assert.strictEqual(isEmpty(new Foo([])), true);
  });

  it('should work with maps', function() {
    if (Map) {
      lodashStable.each([new Map, realm.map], function(map) {
        assert.strictEqual(isEmpty(map), true);
        map.set('a', 1);
        assert.strictEqual(isEmpty(map), false);
        map.clear();
      });
    }
  });

  it('should work with sets', function() {
    if (Set) {
      lodashStable.each([new Set, realm.set], function(set) {
        assert.strictEqual(isEmpty(set), true);
        set.add(1);
        assert.strictEqual(isEmpty(set), false);
        set.clear();
      });
    }
  });

  it('should not treat objects with negative lengths as array-like', function() {
    function Foo() {}
    Foo.prototype.length = -1;

    assert.strictEqual(isEmpty(new Foo), true);
  });

  it('should not treat objects with lengths larger than `MAX_SAFE_INTEGER` as array-like', function() {
    function Foo() {}
    Foo.prototype.length = MAX_SAFE_INTEGER + 1;

    assert.strictEqual(isEmpty(new Foo), true);
  });

  it('should not treat objects with non-number lengths as array-like', function() {
    assert.strictEqual(isEmpty({ 'length': '0' }), false);
  });

  it('should return an unwrapped value when implicitly chaining', function() {
    assert.strictEqual(_({}).isEmpty(), true);
  });

  it('should return a wrapped value when explicitly chaining', function() {
    assert.ok(_({}).chain().isEmpty() instanceof _);
  });
});
