import assert from 'assert';
import lodashStable from 'lodash';
import { slice, _, isNpm, push, stubFalse } from './utils.js';
import partial from '../partial.js';
import partialRight from '../partialRight.js';
import map from '../map.js';

describe('iteratee', function() {
  it('should provide arguments to `func`', function() {
    var fn = function() { return slice.call(arguments); },
        iteratee = _.iteratee(fn),
        actual = iteratee('a', 'b', 'c', 'd', 'e', 'f');

    assert.deepStrictEqual(actual, ['a', 'b', 'c', 'd', 'e', 'f']);
  });

  it('should return `_.identity` when `func` is nullish', function() {
    var object = {},
        values = [, null, undefined],
        expected = lodashStable.map(values, lodashStable.constant([!isNpm && _.identity, object]));

    var actual = lodashStable.map(values, function(value, index) {
      var identity = index ? _.iteratee(value) : _.iteratee();
      return [!isNpm && identity, identity(object)];
    });

    assert.deepStrictEqual(actual, expected);
  });

  it('should return an iteratee created by `_.matches` when `func` is an object', function() {
    var matches = _.iteratee({ 'a': 1, 'b': 2 });
    assert.strictEqual(matches({ 'a': 1, 'b': 2, 'c': 3 }), true);
    assert.strictEqual(matches({ 'b': 2 }), false);
  });

  it('should not change `_.matches` behavior if `source` is modified', function() {
    var sources = [
      { 'a': { 'b': 2, 'c': 3 } },
      { 'a': 1, 'b': 2 },
      { 'a': 1 }
    ];

    lodashStable.each(sources, function(source, index) {
      var object = lodashStable.cloneDeep(source),
          matches = _.iteratee(source);

      assert.strictEqual(matches(object), true);

      if (index) {
        source.a = 2;
        source.b = 1;
        source.c = 3;
      } else {
        source.a.b = 1;
        source.a.c = 2;
        source.a.d = 3;
      }
      assert.strictEqual(matches(object), true);
      assert.strictEqual(matches(source), false);
    });
  });

  it('should return an iteratee created by `_.matchesProperty` when `func` is an array', function() {
    var array = ['a', undefined],
        matches = _.iteratee([0, 'a']);

    assert.strictEqual(matches(array), true);

    matches = _.iteratee(['0', 'a']);
    assert.strictEqual(matches(array), true);

    matches = _.iteratee([1, undefined]);
    assert.strictEqual(matches(array), true);
  });

  it('should support deep paths for `_.matchesProperty` shorthands', function() {
    var object = { 'a': { 'b': { 'c': 1, 'd': 2 } } },
        matches = _.iteratee(['a.b', { 'c': 1 }]);

    assert.strictEqual(matches(object), true);
  });

  it('should not change `_.matchesProperty` behavior if `source` is modified', function() {
    var sources = [
      { 'a': { 'b': 2, 'c': 3 } },
      { 'a': 1, 'b': 2 },
      { 'a': 1 }
    ];

    lodashStable.each(sources, function(source, index) {
      var object = { 'a': lodashStable.cloneDeep(source) },
          matches = _.iteratee(['a', source]);

      assert.strictEqual(matches(object), true);

      if (index) {
        source.a = 2;
        source.b = 1;
        source.c = 3;
      } else {
        source.a.b = 1;
        source.a.c = 2;
        source.a.d = 3;
      }
      assert.strictEqual(matches(object), true);
      assert.strictEqual(matches({ 'a': source }), false);
    });
  });

  it('should return an iteratee created by `_.property` when `func` is a number or string', function() {
    var array = ['a'],
        prop = _.iteratee(0);

    assert.strictEqual(prop(array), 'a');

    prop = _.iteratee('0');
    assert.strictEqual(prop(array), 'a');
  });

  it('should support deep paths for `_.property` shorthands', function() {
    var object = { 'a': { 'b': 2 } },
        prop = _.iteratee('a.b');

    assert.strictEqual(prop(object), 2);
  });

  it('should work with functions created by `_.partial` and `_.partialRight`', function() {
    var fn = function() {
      var result = [this.a];
      push.apply(result, arguments);
      return result;
    };

    var expected = [1, 2, 3],
        object = { 'a': 1 , 'iteratee': _.iteratee(partial(fn, 2)) };

    assert.deepStrictEqual(object.iteratee(3), expected);

    object.iteratee = _.iteratee(partialRight(fn, 3));
    assert.deepStrictEqual(object.iteratee(2), expected);
  });

  it('should use internal `iteratee` if external is unavailable', function() {
    var iteratee = _.iteratee;
    delete _.iteratee;

    assert.deepStrictEqual(map([{ 'a': 1 }], 'a'), [1]);

    _.iteratee = iteratee;
  });

  it('should work as an iteratee for methods like `_.map`', function() {
    var fn = function() { return this instanceof Number; },
        array = [fn, fn, fn],
        iteratees = lodashStable.map(array, _.iteratee),
        expected = lodashStable.map(array, stubFalse);

    var actual = lodashStable.map(iteratees, function(iteratee) {
      return iteratee();
    });

    assert.deepStrictEqual(actual, expected);
  });
});
