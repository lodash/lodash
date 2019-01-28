import assert from 'assert';
import lodashStable from 'lodash';
import xorWith from '../xorWith.js';

describe('xorWith', function() {
  it('should work with a `comparator`', function() {
    var objects = [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }],
        others = [{ 'x': 1, 'y': 1 }, { 'x': 1, 'y': 2 }],
        actual = xorWith(objects, others, lodashStable.isEqual);

    assert.deepStrictEqual(actual, [objects[1], others[0]]);
  });
});
