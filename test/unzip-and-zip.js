import assert from 'assert';
import lodashStable from 'lodash';
import { _, falsey, stubArray } from './utils.js';

describe('unzip and zip', function() {
  lodashStable.each(['unzip', 'zip'], function(methodName, index) {
    var func = _[methodName];
    func = lodashStable.bind(index ? func.apply : func.call, func, null);

    var object = {
      'an empty array': [
        [],
        []
      ],
      '0-tuples': [
        [[], []],
        []
      ],
      '2-tuples': [
        [['barney', 'fred'], [36, 40]],
        [['barney', 36], ['fred', 40]]
      ],
      '3-tuples': [
        [['barney', 'fred'], [36, 40], [false, true]],
        [['barney', 36, false], ['fred', 40, true]]
      ]
    };

    lodashStable.forOwn(object, function(pair, key) {
      it('`_.' + methodName + '` should work with ' + key, function() {
        var actual = func(pair[0]);
        assert.deepStrictEqual(actual, pair[1]);
        assert.deepStrictEqual(func(actual), actual.length ? pair[0] : []);
      });
    });

    it('`_.' + methodName + '` should work with tuples of different lengths', function() {
      var pair = [
        [['barney', 36], ['fred', 40, false]],
        [['barney', 'fred'], [36, 40], [undefined, false]]
      ];

      var actual = func(pair[0]);
      assert.ok('0' in actual[2]);
      assert.deepStrictEqual(actual, pair[1]);

      actual = func(actual);
      assert.ok('2' in actual[0]);
      assert.deepStrictEqual(actual, [['barney', 36, undefined], ['fred', 40, false]]);
    });

    it('`_.' + methodName + '` should treat falsey values as empty arrays', function() {
      var expected = lodashStable.map(falsey, stubArray);

      var actual = lodashStable.map(falsey, function(value) {
        return func([value, value, value]);
      });

      assert.deepStrictEqual(actual, expected);
    });

    it('`_.' + methodName + '` should ignore values that are not arrays or `arguments` objects', function() {
      var array = [[1, 2], [3, 4], null, undefined, { '0': 1 }];
      assert.deepStrictEqual(func(array), [[1, 3], [2, 4]]);
    });

    it('`_.' + methodName + '` should support consuming its return value', function() {
      var expected = [['barney', 'fred'], [36, 40]];
      assert.deepStrictEqual(func(func(func(func(expected)))), expected);
    });
  });
});
