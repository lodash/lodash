import assert from 'assert';
import lodashStable from 'lodash';
import { stubThree, stubFour, noop } from './utils.js';
import updateWith from '../updateWith.js';

describe('updateWith', function() {
  it('should work with a `customizer` callback', function() {
    var actual = updateWith({ '0': {} }, '[0][1][2]', stubThree, function(value) {
      return lodashStable.isObject(value) ? undefined : {};
    });

    assert.deepStrictEqual(actual, { '0': { '1': { '2': 3 } } });
  });

  it('should work with a `customizer` that returns `undefined`', function() {
    var actual = updateWith({}, 'a[0].b.c', stubFour, noop);
    assert.deepStrictEqual(actual, { 'a': [{ 'b': { 'c': 4 } }] });
  });
});
