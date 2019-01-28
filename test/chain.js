import assert from 'assert';
import lodashStable from 'lodash';
import { square } from './utils.js';
import chain from '../chain.js';

describe('chain', function() {
  it('should return a wrapped value', function() {
    var actual = chain({ 'a': 0 });
    assert.ok(actual instanceof _);
  });

  it('should return existing wrapped values', function() {
    var wrapped = _({ 'a': 0 });
    assert.strictEqual(chain(wrapped), wrapped);
    assert.strictEqual(wrapped.chain(), wrapped);
  });

  it('should enable chaining for methods that return unwrapped values', function() {
    var array = ['c', 'b', 'a'];

    assert.ok(chain(array).head() instanceof _);
    assert.ok(_(array).chain().head() instanceof _);

    assert.ok(chain(array).isArray() instanceof _);
    assert.ok(_(array).chain().isArray() instanceof _);

    assert.ok(chain(array).sortBy().head() instanceof _);
    assert.ok(_(array).chain().sortBy().head() instanceof _);
  });

  it('should chain multiple methods', function() {
    lodashStable.times(2, function(index) {
      var array = ['one two three four', 'five six seven eight', 'nine ten eleven twelve'],
          expected = { ' ': 9, 'e': 14, 'f': 2, 'g': 1, 'h': 2, 'i': 4, 'l': 2, 'n': 6, 'o': 3, 'r': 2, 's': 2, 't': 5, 'u': 1, 'v': 4, 'w': 2, 'x': 1 },
          wrapped = index ? _(array).chain() : chain(array);

      var actual = wrapped
        .chain()
        .map(function(value) { return value.split(''); })
        .flatten()
        .reduce(function(object, chr) {
          object[chr] || (object[chr] = 0);
          object[chr]++;
          return object;
        }, {})
        .value();

      assert.deepStrictEqual(actual, expected);

      array = [1, 2, 3, 4, 5, 6];
      wrapped = index ? _(array).chain() : chain(array);
      actual = wrapped
        .chain()
        .filter(function(n) { return n % 2 != 0; })
        .reject(function(n) { return n % 3 == 0; })
        .sortBy(function(n) { return -n; })
        .value();

      assert.deepStrictEqual(actual, [5, 1]);

      array = [3, 4];
      wrapped = index ? _(array).chain() : chain(array);
      actual = wrapped
        .reverse()
        .concat([2, 1])
        .unshift(5)
        .tap(function(value) { value.pop(); })
        .map(square)
        .value();

      assert.deepStrictEqual(actual, [25, 16, 9, 4]);
    });
  });
});
