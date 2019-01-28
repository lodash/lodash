import assert from 'assert';
import lodashStable from 'lodash';
import { arrayProto, LARGE_ARRAY_SIZE } from './utils.js';
import head from '../head.js';
import first from '../first.js';

describe('head', function() {
  var array = [1, 2, 3, 4];

  it('should return the first element', function() {
    assert.strictEqual(head(array), 1);
  });

  it('should return `undefined` when querying empty arrays', function() {
    arrayProto[0] = 1;
    assert.strictEqual(head([]), undefined);
    arrayProto.length = 0;
  });

  it('should work as an iteratee for methods like `_.map`', function() {
    var array = [[1, 2, 3], [4, 5, 6], [7, 8, 9]],
        actual = lodashStable.map(array, head);

    assert.deepStrictEqual(actual, [1, 4, 7]);
  });

  it('should be aliased', function() {
    assert.strictEqual(first, head);
  });

  it('should return an unwrapped value when implicitly chaining', function() {
    var wrapped = _(array);
    assert.strictEqual(wrapped.head(), 1);
    assert.strictEqual(wrapped.first(), 1);
  });

  it('should return a wrapped value when explicitly chaining', function() {
    var wrapped = _(array).chain();
    assert.ok(wrapped.head() instanceof _);
    assert.ok(wrapped.first() instanceof _);
  });

  it('should not execute immediately when explicitly chaining', function() {
    var wrapped = _(array).chain();
    assert.strictEqual(wrapped.head().__wrapped__, array);
    assert.strictEqual(wrapped.first().__wrapped__, array);
  });

  it('should work in a lazy sequence', function() {
    var largeArray = lodashStable.range(LARGE_ARRAY_SIZE),
        smallArray = array;

    lodashStable.each(['head', 'first'], function(methodName) {
      lodashStable.times(2, function(index) {
        var array = index ? largeArray : smallArray,
            actual = _(array).filter(isEven)[methodName]();

        assert.strictEqual(actual, _[methodName](_.filter(array, isEven)));
      });
    });
  });
});
