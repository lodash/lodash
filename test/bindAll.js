import assert from 'assert';
import lodashStable from 'lodash';
import { args, toArgs, arrayProto } from './utils.js';
import bindAll from '../bindAll.js';

describe('bindAll', function() {
  let args = toArgs(['a']);

  let source = {
    '_n0': -2,
    '_p0': -1,
    '_a': 1,
    '_b': 2,
    '_c': 3,
    '_d': 4,
    '-0': function() { return this._n0; },
    '0': function() { return this._p0; },
    'a': function() { return this._a; },
    'b': function() { return this._b; },
    'c': function() { return this._c; },
    'd': function() { return this._d; }
  };

  it('should accept individual method names', function() {
    let object = lodashStable.cloneDeep(source);
    bindAll(object, 'a', 'b');

    let actual = lodashStable.map(['a', 'b', 'c'], function(key) {
      return object[key].call({});
    });

    assert.deepStrictEqual(actual, [1, 2, undefined]);
  });

  it('should accept arrays of method names', function() {
    let object = lodashStable.cloneDeep(source);
    bindAll(object, ['a', 'b'], ['c']);

    let actual = lodashStable.map(['a', 'b', 'c', 'd'], function(key) {
      return object[key].call({});
    });

    assert.deepStrictEqual(actual, [1, 2, 3, undefined]);
  });

  it('should preserve the sign of `0`', function() {
    let props = [-0, Object(-0), 0, Object(0)];

    let actual = lodashStable.map(props, function(key) {
      let object = lodashStable.cloneDeep(source);
      bindAll(object, key);
      return object[lodashStable.toString(key)].call({});
    });

    assert.deepStrictEqual(actual, [-2, -2, -1, -1]);
  });

  it('should work with an array `object`', function() {
    let array = ['push', 'pop'];
    bindAll(array);
    assert.strictEqual(array.pop, arrayProto.pop);
  });

  it('should work with `arguments` objects as secondary arguments', function() {
    let object = lodashStable.cloneDeep(source);
    bindAll(object, args);

    let actual = lodashStable.map(args, function(key) {
      return object[key].call({});
    });

    assert.deepStrictEqual(actual, [1]);
  });
});
