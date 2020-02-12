import assert from 'assert';
import lodashStable from 'lodash';
import invertBy from '../invertBy.js';

describe('invertBy', function() {
  var object = { 'a': 1, 'b': 2, 'c': 1 };

  it('should transform keys by `iteratee`', function() {
    var expected = { 'group1': ['a', 'c'], 'group2': ['b'] };

    var actual = invertBy(object, function(value) {
      return 'group' + value;
    });

    assert.deepStrictEqual(actual, expected);
  });

  it('should use `_.identity` when `iteratee` is nullish', function() {
    var values = [, null, undefined],
        expected = lodashStable.map(values, lodashStable.constant({ '1': ['a', 'c'], '2': ['b'] }));

    var actual = lodashStable.map(values, function(value, index) {
      return index ? invertBy(object, value) : invertBy(object);
    });

    assert.deepStrictEqual(actual, expected);
  });

  it('should only add multiple values to own, not inherited, properties', function() {
    var object = { 'a': 'hasOwnProperty', 'b': 'constructor' },
        expected = { 'hasOwnProperty': ['a'], 'constructor': ['b'] };

    assert.ok(lodashStable.isEqual(invertBy(object), expected));
  });

  it('should return a wrapped value when chaining', function() {
    var wrapped = _(object).invertBy();

    assert.ok(wrapped instanceof _);
    assert.deepEqual(wrapped.value(), { '1': ['a', 'c'], '2': ['b'] });
  });
});
