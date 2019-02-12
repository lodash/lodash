import assert from 'assert';
import lodashStable from 'lodash';
import { LARGE_ARRAY_SIZE, isEven, _, create, stubFalse, objectProto, funcProto } from './utils.js';
import difference from '../difference.js';
import intersection from '../intersection.js';
import uniq from '../uniq.js';
import without from '../without.js';
import groupBy from '../groupBy.js';
import merge from '../merge.js';

describe('`__proto__` property bugs', function() {
  it('should work with the "__proto__" key in internal data objects', function() {
    var stringLiteral = '__proto__',
        stringObject = Object(stringLiteral),
        expected = [stringLiteral, stringObject];

    var largeArray = lodashStable.times(LARGE_ARRAY_SIZE, function(count) {
      return isEven(count) ? stringLiteral : stringObject;
    });

    assert.deepStrictEqual(difference(largeArray, largeArray), []);
    assert.deepStrictEqual(intersection(largeArray, largeArray), expected);
    assert.deepStrictEqual(uniq(largeArray), expected);
    assert.deepStrictEqual(without.apply(_, [largeArray].concat(largeArray)), []);
  });

  it('should treat "__proto__" as a regular key in assignments', function() {
    var methods = [
      'assign',
      'assignIn',
      'defaults',
      'defaultsDeep',
      'merge'
    ];

    var source = create(null);
    source.__proto__ = [];

    var expected = lodashStable.map(methods, stubFalse);

    var actual = lodashStable.map(methods, function(methodName) {
      var result = _[methodName]({}, source);
      return result instanceof Array;
    });

    assert.deepStrictEqual(actual, expected);

    actual = groupBy([{ 'a': '__proto__' }], 'a');
    assert.ok(!(actual instanceof Array));
  });

  it('should not merge "__proto__" properties', function() {
    if (JSON) {
      merge({}, JSON.parse('{"__proto__":{"a":1}}'));

      var actual = 'a' in objectProto;
      delete objectProto.a;

      assert.ok(!actual);
    }
  });

  it('should not indirectly merge builtin prototype properties', function() {
    merge({}, { 'toString': { 'constructor': { 'prototype': { 'a': 1 } } } });

    var actual = 'a' in funcProto;
    delete funcProto.a;

    assert.ok(!actual);

    merge({}, { 'constructor': { 'prototype': { 'a': 1 } } });

    actual = 'a' in objectProto;
    delete objectProto.a;

    assert.ok(!actual);
  });

  it('should not indirectly merge `Object` properties', function() {
    merge({}, { 'constructor': { 'a': 1 } });

    var actual = 'a' in Object;
    delete Object.a;

    assert.ok(!actual);
  });
});
