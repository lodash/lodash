import assert from 'assert';
import lodashStable from 'lodash';
import { falsey, stubObject, LARGE_ARRAY_SIZE } from './utils.js';
import fromPairs from '../fromPairs.js';
import toPairs from '../toPairs.js';

describe('fromPairs', function() {
  it('should accept a two dimensional array', function() {
    var array = [['a', 1], ['b', 2]],
        object = { 'a': 1, 'b': 2 },
        actual = fromPairs(array);

    assert.deepStrictEqual(actual, object);
  });

  it('should accept a falsey `array`', function() {
    var expected = lodashStable.map(falsey, stubObject);

    var actual = lodashStable.map(falsey, function(array, index) {
      try {
        return index ? fromPairs(array) : fromPairs();
      } catch (e) {}
    });

    assert.deepStrictEqual(actual, expected);
  });

  it('should not support deep paths', function() {
    var actual = fromPairs([['a.b', 1]]);
    assert.deepStrictEqual(actual, { 'a.b': 1 });
  });

  it('should support consuming the return value of `_.toPairs`', function() {
    var object = { 'a.b': 1 };
    assert.deepStrictEqual(fromPairs(toPairs(object)), object);
  });

  it('should work in a lazy sequence', function() {
    var array = lodashStable.times(LARGE_ARRAY_SIZE, function(index) {
      return ['key' + index, index];
    });

    var actual = _(array).fromPairs().map(square).filter(isEven).take().value();

    assert.deepEqual(actual, _.take(_.filter(_.map(fromPairs(array), square), isEven)));
  });
});
