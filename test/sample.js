import assert from 'assert';
import lodashStable from 'lodash';
import { empties, noop } from './utils.js';
import sample from '../sample.js';

describe('sample', function() {
  var array = [1, 2, 3];

  it('should return a random element', function() {
    var actual = sample(array);
    assert.ok(lodashStable.includes(array, actual));
  });

  it('should return `undefined` when sampling empty collections', function() {
    var expected = lodashStable.map(empties, noop);

    var actual = lodashStable.transform(empties, function(result, value) {
      try {
        result.push(sample(value));
      } catch (e) {}
    });

    assert.deepStrictEqual(actual, expected);
  });

  it('should sample an object', function() {
    var object = { 'a': 1, 'b': 2, 'c': 3 },
        actual = sample(object);

    assert.ok(lodashStable.includes(array, actual));
  });
});
