import assert from 'assert';
import lodashStable from 'lodash';
import { symbol, numberProto, stringProto, defineProperty } from './utils.js';
import unset from '../unset.js';

describe('unset', function() {
  it('should unset property values', function() {
    lodashStable.each(['a', ['a']], function(path) {
      var object = { 'a': 1, 'c': 2 };
      assert.strictEqual(unset(object, path), true);
      assert.deepStrictEqual(object, { 'c': 2 });
    });
  });

  it('should preserve the sign of `0`', function() {
    var props = [-0, Object(-0), 0, Object(0)],
        expected = lodashStable.map(props, lodashStable.constant([true, false]));

    var actual = lodashStable.map(props, function(key) {
      var object = { '-0': 'a', '0': 'b' };
      return [unset(object, key), lodashStable.toString(key) in object];
    });

    assert.deepStrictEqual(actual, expected);
  });

  it('should unset symbol keyed property values', function() {
    if (Symbol) {
      var object = {};
      object[symbol] = 1;

      assert.strictEqual(unset(object, symbol), true);
      assert.ok(!(symbol in object));
    }
  });

  it('should unset deep property values', function() {
    lodashStable.each(['a.b', ['a', 'b']], function(path) {
      var object = { 'a': { 'b': null } };
      assert.strictEqual(unset(object, path), true);
      assert.deepStrictEqual(object, { 'a': {} });
    });
  });

  it('should handle complex paths', function() {
    var paths = [
      'a[-1.23]["[\\"b\\"]"].c[\'[\\\'d\\\']\'][\ne\n][f].g',
      ['a', '-1.23', '["b"]', 'c', "['d']", '\ne\n', 'f', 'g']
    ];

    lodashStable.each(paths, function(path) {
      var object = { 'a': { '-1.23': { '["b"]': { 'c': { "['d']": { '\ne\n': { 'f': { 'g': 8 } } } } } } } };
      assert.strictEqual(unset(object, path), true);
      assert.ok(!('g' in object.a[-1.23]['["b"]'].c["['d']"]['\ne\n'].f));
    });
  });

  it('should return `true` for nonexistent paths', function() {
    var object = { 'a': { 'b': { 'c': null } } };

    lodashStable.each(['z', 'a.z', 'a.b.z', 'a.b.c.z'], function(path) {
      assert.strictEqual(unset(object, path), true);
    });

    assert.deepStrictEqual(object, { 'a': { 'b': { 'c': null } } });
  });

  it('should not error when `object` is nullish', function() {
    var values = [null, undefined],
        expected = [[true, true], [true, true]];

    var actual = lodashStable.map(values, function(value) {
      try {
        return [unset(value, 'a.b'), unset(value, ['a', 'b'])];
      } catch (e) {
        return e.message;
      }
    });

    assert.deepStrictEqual(actual, expected);
  });

  it('should follow `path` over non-plain objects', function() {
    var object = { 'a': '' },
        paths = ['constructor.prototype.a', ['constructor', 'prototype', 'a']];

    lodashStable.each(paths, function(path) {
      numberProto.a = 1;

      var actual = unset(0, path);
      assert.strictEqual(actual, true);
      assert.ok(!('a' in numberProto));

      delete numberProto.a;
    });

    lodashStable.each(['a.replace.b', ['a', 'replace', 'b']], function(path) {
      stringProto.replace.b = 1;

      var actual = unset(object, path);
      assert.strictEqual(actual, true);
      assert.ok(!('a' in stringProto.replace));

      delete stringProto.replace.b;
    });
  });

  it('should return `false` for non-configurable properties', function() {
    var object = {};

    defineProperty(object, 'a', {
      'configurable': false,
      'enumerable': true,
      'writable': true,
      'value': 1,
    });
    assert.strictEqual(unset(object, 'a'), false);
  });
});
