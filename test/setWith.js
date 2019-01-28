import assert from 'assert';
import lodashStable from 'lodash';
import { noop } from './utils.js';
import setWith from '../setWith.js';

describe('setWith', function() {
  it('should work with a `customizer` callback', function() {
    var actual = setWith({ '0': {} }, '[0][1][2]', 3, function(value) {
      return lodashStable.isObject(value) ? undefined : {};
    });

    assert.deepStrictEqual(actual, { '0': { '1': { '2': 3 } } });
  });

  it('should work with a `customizer` that returns `undefined`', function() {
    var actual = setWith({}, 'a[0].b.c', 4, noop);
    assert.deepStrictEqual(actual, { 'a': [{ 'b': { 'c': 4 } }] });
  });
});
