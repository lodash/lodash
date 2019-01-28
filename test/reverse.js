import assert from 'assert';
import lodashStable from 'lodash';
import { LARGE_ARRAY_SIZE, identity } from './utils.js';
import reverse from '../reverse.js';
import compact from '../compact.js';
import head from '../head.js';

describe('reverse', function() {
  var largeArray = lodashStable.range(LARGE_ARRAY_SIZE).concat(null),
      smallArray = [0, 1, 2, null];

  it('should reverse `array`', function() {
    var array = [1, 2, 3],
        actual = reverse(array);

    assert.strictEqual(actual, array);
    assert.deepStrictEqual(array, [3, 2, 1]);
  });

  it('should return the wrapped reversed `array`', function() {
    lodashStable.times(2, function(index) {
      var array = (index ? largeArray : smallArray).slice(),
          clone = array.slice(),
          wrapped = _(array).reverse(),
          actual = wrapped.value();

      assert.ok(wrapped instanceof _);
      assert.strictEqual(actual, array);
      assert.deepStrictEqual(actual, clone.slice().reverse());
    });
  });

  it('should work in a lazy sequence', function() {
    lodashStable.times(2, function(index) {
      var array = (index ? largeArray : smallArray).slice(),
          expected = array.slice(),
          actual = _(array).slice(1).reverse().value();

      assert.deepStrictEqual(actual, expected.slice(1).reverse());
      assert.deepStrictEqual(array, expected);
    });
  });

  it('should be lazy when in a lazy sequence', function() {
    var spy = {
      'toString': function() {
        throw new Error('spy was revealed');
      }
    };

    var array = largeArray.concat(spy),
        expected = array.slice();

    try {
      var wrapped = _(array).slice(1).map(String).reverse(),
          actual = wrapped.last();
    } catch (e) {}

    assert.ok(wrapped instanceof _);
    assert.strictEqual(actual, '1');
    assert.deepEqual(array, expected);
  });

  it('should work in a hybrid sequence', function() {
    lodashStable.times(2, function(index) {
      var clone = (index ? largeArray : smallArray).slice();

      lodashStable.each(['map', 'filter'], function(methodName) {
        var array = clone.slice(),
            expected = clone.slice(1, -1).reverse(),
            actual = _(array)[methodName](identity).thru(compact).reverse().value();

        assert.deepStrictEqual(actual, expected);

        array = clone.slice();
        actual = _(array).thru(compact)[methodName](identity).pull(1).push(3).reverse().value();

        assert.deepStrictEqual(actual, [3].concat(expected.slice(0, -1)));
      });
    });
  });

  it('should track the `__chain__` value of a wrapper', function() {
    lodashStable.times(2, function(index) {
      var array = (index ? largeArray : smallArray).slice(),
          expected = array.slice().reverse(),
          wrapped = _(array).chain().reverse().head();

      assert.ok(wrapped instanceof _);
      assert.strictEqual(wrapped.value(), head(expected));
      assert.deepStrictEqual(array, expected);
    });
  });
});
