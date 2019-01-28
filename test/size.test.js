import assert from 'assert';
import lodashStable from 'lodash';
import { falsey, stubZero, args, push, arrayProto, realm, MAX_SAFE_INTEGER } from './utils.js';
import size from '../size.js';

describe('size', function() {
  var array = [1, 2, 3];

  it('should return the number of own enumerable string keyed properties of an object', function() {
    assert.strictEqual(size({ 'one': 1, 'two': 2, 'three': 3 }), 3);
  });

  it('should return the length of an array', function() {
    assert.strictEqual(size(array), 3);
  });

  it('should accept a falsey `object`', function() {
    var expected = lodashStable.map(falsey, stubZero);

    var actual = lodashStable.map(falsey, function(object, index) {
      try {
        return index ? size(object) : size();
      } catch (e) {}
    });

    assert.deepStrictEqual(actual, expected);
  });

  it('should work with `arguments` objects', function() {
    assert.strictEqual(size(args), 3);
  });

  it('should work with jQuery/MooTools DOM query collections', function() {
    function Foo(elements) {
      push.apply(this, elements);
    }
    Foo.prototype = { 'length': 0, 'splice': arrayProto.splice };

    assert.strictEqual(size(new Foo(array)), 3);
  });

  it('should work with maps', function() {
    if (Map) {
      lodashStable.each([new Map, realm.map], function(map) {
        map.set('a', 1);
        map.set('b', 2);
        assert.strictEqual(size(map), 2);
        map.clear();
      });
    }
  });

  it('should work with sets', function() {
    if (Set) {
      lodashStable.each([new Set, realm.set], function(set) {
        set.add(1);
        set.add(2);
        assert.strictEqual(size(set), 2);
        set.clear();
      });
    }
  });

  it('should not treat objects with negative lengths as array-like', function() {
    assert.strictEqual(size({ 'length': -1 }), 1);
  });

  it('should not treat objects with lengths larger than `MAX_SAFE_INTEGER` as array-like', function() {
    assert.strictEqual(size({ 'length': MAX_SAFE_INTEGER + 1 }), 1);
  });

  it('should not treat objects with non-number lengths as array-like', function() {
    assert.strictEqual(size({ 'length': '0' }), 1);
  });
});
