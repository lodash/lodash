import assert from 'assert';
import lodashStable from 'lodash';
import mapValues from '../mapValues.js';

describe('mapValues', function() {
  var array = [1, 2],
      object = { 'a': 1, 'b': 2 };

  it('should map values in `object` to a new object', function() {
    var actual = mapValues(object, String);
    assert.deepStrictEqual(actual, { 'a': '1', 'b': '2' });
  });

  it('should treat arrays like objects', function() {
    var actual = mapValues(array, String);
    assert.deepStrictEqual(actual, { '0': '1', '1': '2' });
  });

  it('should work with `_.property` shorthands', function() {
    var actual = mapValues({ 'a': { 'b': 2 } }, 'b');
    assert.deepStrictEqual(actual, { 'a': 2 });
  });

  it('should use `_.identity` when `iteratee` is nullish', function() {
    var object = { 'a': 1, 'b': 2 },
        values = [, null, undefined],
        expected = lodashStable.map(values, lodashStable.constant([true, false]));

    var actual = lodashStable.map(values, function(value, index) {
      var result = index ? mapValues(object, value) : mapValues(object);
      return [lodashStable.isEqual(result, object), result === object];
    });

    assert.deepStrictEqual(actual, expected);
  });
});
