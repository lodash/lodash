import assert from 'assert';
import lodashStable from 'lodash';
import { _ } from './utils.js';
import pad from '../pad.js';

describe('pad methods', function() {
  lodashStable.each(['pad', 'padStart', 'padEnd'], function(methodName) {
    var func = _[methodName],
        isPad = methodName == 'pad',
        isStart = methodName == 'padStart',
        string = 'abc';

    it('`_.' + methodName + '` should not pad if string is >= `length`', function() {
      assert.strictEqual(func(string, 2), string);
      assert.strictEqual(func(string, 3), string);
    });

    it('`_.' + methodName + '` should treat negative `length` as `0`', function() {
      lodashStable.each([0, -2], function(length) {
        assert.strictEqual(func(string, length), string);
      });
    });

    it('`_.' + methodName + '` should coerce `length` to a number', function() {
      lodashStable.each(['', '4'], function(length) {
        var actual = length ? (isStart ? ' abc' : 'abc ') : string;
        assert.strictEqual(func(string, length), actual);
      });
    });

    it('`_.' + methodName + '` should treat nullish values as empty strings', function() {
      lodashStable.each([undefined, '_-'], function(chars) {
        var expected = chars ? (isPad ? '__' : chars) : '  ';
        assert.strictEqual(func(null, 2, chars), expected);
        assert.strictEqual(func(undefined, 2, chars), expected);
        assert.strictEqual(func('', 2, chars), expected);
      });
    });

    it('`_.' + methodName + '` should return `string` when `chars` coerces to an empty string', function() {
      var values = ['', Object('')],
          expected = lodashStable.map(values, lodashStable.constant(string));

      var actual = lodashStable.map(values, function(value) {
        return pad(string, 6, value);
      });

      assert.deepStrictEqual(actual, expected);
    });
  });
});
