import assert from 'assert';
import lodashStable from 'lodash';
import { arrayProto, LARGE_ARRAY_SIZE } from './utils.js';
import toArray from '../toArray.js';

describe('toArray', function() {
  it('should convert objects to arrays', function() {
    assert.deepStrictEqual(toArray({ 'a': 1, 'b': 2 }), [1, 2]);
  });

  it('should convert iterables to arrays', function() {
    if (Symbol && Symbol.iterator) {
      var object = { '0': 'a', 'length': 1 };
      object[Symbol.iterator] = arrayProto[Symbol.iterator];

      assert.deepStrictEqual(toArray(object), ['a']);
    }
  });

  it('should convert maps to arrays', function() {
    if (Map) {
      var map = new Map;
      map.set('a', 1);
      map.set('b', 2);
      assert.deepStrictEqual(toArray(map), [['a', 1], ['b', 2]]);
    }
  });

  it('should convert strings to arrays', function() {
    assert.deepStrictEqual(toArray(''), []);
    assert.deepStrictEqual(toArray('ab'), ['a', 'b']);
    assert.deepStrictEqual(toArray(Object('ab')), ['a', 'b']);
  });

  it('should work in a lazy sequence', function() {
    var array = lodashStable.range(LARGE_ARRAY_SIZE + 1);

    var object = lodashStable.zipObject(lodashStable.times(LARGE_ARRAY_SIZE, function(index) {
      return ['key' + index, index];
    }));

    var actual = _(array).slice(1).map(String).toArray().value();
    assert.deepEqual(actual, lodashStable.map(array.slice(1), String));

    actual = _(object).toArray().slice(1).map(String).value();
    assert.deepEqual(actual, _.map(toArray(object).slice(1), String));
  });
});
