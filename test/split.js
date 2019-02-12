import assert from 'assert';
import lodashStable from 'lodash';
import split from '../split.js';

describe('split', function() {
  it('should split a string by `separator`', function() {
    var string = 'abcde';
    assert.deepStrictEqual(split(string, 'c'), ['ab', 'de']);
    assert.deepStrictEqual(split(string, /[bd]/), ['a', 'c', 'e']);
    assert.deepStrictEqual(split(string, '', 2), ['a', 'b']);
  });

  it('should return an array containing an empty string for empty values', function() {
    var values = [, null, undefined, ''],
        expected = lodashStable.map(values, lodashStable.constant(['']));

    var actual = lodashStable.map(values, function(value, index) {
      return index ? split(value) : split();
    });

    assert.deepStrictEqual(actual, expected);
  });

  it('should work as an iteratee for methods like `_.map`', function() {
    var strings = ['abc', 'def', 'ghi'],
        actual = lodashStable.map(strings, split);

    assert.deepStrictEqual(actual, [['abc'], ['def'], ['ghi']]);
  });

  it('should allow mixed string and array prototype methods', function() {
    var wrapped = _('abc');
    assert.strictEqual(wrapped.split('b').join(','), 'a,c');
  });
});
