import assert from 'assert';
import lodashStable from 'lodash';
import { _, stubA, stubB, stubC, slice, stubFalse, stubTrue } from './utils.js';

describe('cond', function() {
  it('should create a conditional function', function() {
    var cond = _.cond([
      [lodashStable.matches({ 'a': 1 }),     stubA],
      [lodashStable.matchesProperty('b', 1), stubB],
      [lodashStable.property('c'),           stubC]
    ]);

    assert.strictEqual(cond({ 'a':  1, 'b': 2, 'c': 3 }), 'a');
    assert.strictEqual(cond({ 'a':  0, 'b': 1, 'c': 2 }), 'b');
    assert.strictEqual(cond({ 'a': -1, 'b': 0, 'c': 1 }), 'c');
  });

  it('should provide arguments to functions', function() {
    var args1,
        args2,
        expected = ['a', 'b', 'c'];

    var cond = _.cond([[
      function() { args1 || (args1 = slice.call(arguments)); return true; },
      function() { args2 || (args2 = slice.call(arguments)); }
    ]]);

    cond('a', 'b', 'c');

    assert.deepStrictEqual(args1, expected);
    assert.deepStrictEqual(args2, expected);
  });

  it('should work with predicate shorthands', function() {
    var cond = _.cond([
      [{ 'a': 1 }, stubA],
      [['b', 1],   stubB],
      ['c',        stubC]
    ]);

    assert.strictEqual(cond({ 'a':  1, 'b': 2, 'c': 3 }), 'a');
    assert.strictEqual(cond({ 'a':  0, 'b': 1, 'c': 2 }), 'b');
    assert.strictEqual(cond({ 'a': -1, 'b': 0, 'c': 1 }), 'c');
  });

  it('should return `undefined` when no condition is met', function() {
    var cond = _.cond([[stubFalse, stubA]]);
    assert.strictEqual(cond({ 'a': 1 }), undefined);
  });

  it('should throw a TypeError if `pairs` is not composed of functions', function() {
    lodashStable.each([false, true], function(value) {
      assert.throws(function() { _.cond([[stubTrue, value]])(); }, TypeError);
    });
  });

  it('should use `this` binding of function for `pairs`', function() {
    var cond = _.cond([
      [function(a) { return this[a]; }, function(a, b) { return this[b]; }]
    ]);

    var object = { 'cond': cond, 'a': 1, 'b': 2 };
    assert.strictEqual(object.cond('a', 'b'), 2);
  });
});
