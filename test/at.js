import assert from 'assert';
import lodashStable from 'lodash';
import { empties, stubOne, falsey, args, LARGE_ARRAY_SIZE, square, identity } from './utils.js';
import at from '../at.js';

describe('at', function() {
  var array = ['a', 'b', 'c'],
      object = { 'a': [{ 'b': { 'c': 3 } }, 4] };

  it('should return the elements corresponding to the specified keys', function() {
    var actual = at(array, [0, 2]);
    assert.deepStrictEqual(actual, ['a', 'c']);
  });

  it('should return `undefined` for nonexistent keys', function() {
    var actual = at(array, [2, 4, 0]);
    assert.deepStrictEqual(actual, ['c', undefined, 'a']);
  });

  it('should work with non-index keys on array values', function() {
    var values = lodashStable.reject(empties, function(value) {
      return (value === 0) || lodashStable.isArray(value);
    }).concat(-1, 1.1);

    var array = lodashStable.transform(values, function(result, value) {
      result[value] = 1;
    }, []);

    var expected = lodashStable.map(values, stubOne),
        actual = at(array, values);

    assert.deepStrictEqual(actual, expected);
  });

  it('should return an empty array when no keys are given', function() {
    assert.deepStrictEqual(at(array), []);
    assert.deepStrictEqual(at(array, [], []), []);
  });

  it('should accept multiple key arguments', function() {
    var actual = at(['a', 'b', 'c', 'd'], 3, 0, 2);
    assert.deepStrictEqual(actual, ['d', 'a', 'c']);
  });

  it('should work with a falsey `object` when keys are given', function() {
    var expected = lodashStable.map(falsey, lodashStable.constant(Array(4)));

    var actual = lodashStable.map(falsey, function(object) {
      try {
        return at(object, 0, 1, 'pop', 'push');
      } catch (e) {}
    });

    assert.deepStrictEqual(actual, expected);
  });

  it('should work with an `arguments` object for `object`', function() {
    var actual = at(args, [2, 0]);
    assert.deepStrictEqual(actual, [3, 1]);
  });

  it('should work with `arguments` object as secondary arguments', function() {
    var actual = at([1, 2, 3, 4, 5], args);
    assert.deepStrictEqual(actual, [2, 3, 4]);
  });

  it('should work with an object for `object`', function() {
    var actual = at(object, ['a[0].b.c', 'a[1]']);
    assert.deepStrictEqual(actual, [3, 4]);
  });

  it('should pluck inherited property values', function() {
    function Foo() {
      this.a = 1;
    }
    Foo.prototype.b = 2;

    var actual = at(new Foo, 'b');
    assert.deepStrictEqual(actual, [2]);
  });

  it('should work in a lazy sequence', function() {
    var largeArray = lodashStable.range(LARGE_ARRAY_SIZE),
        smallArray = array;

    lodashStable.each([[2], ['2'], [2, 1]], function(paths) {
      lodashStable.times(2, function(index) {
        var array = index ? largeArray : smallArray,
            wrapped = _(array).map(identity).at(paths);

        assert.deepEqual(wrapped.value(), at(_.map(array, identity), paths));
      });
    });
  });

  it('should support shortcut fusion', function() {
    var array = lodashStable.range(LARGE_ARRAY_SIZE),
        count = 0,
        iteratee = function(value) { count++; return square(value); },
        lastIndex = LARGE_ARRAY_SIZE - 1;

    lodashStable.each([lastIndex, lastIndex + '', LARGE_ARRAY_SIZE, []], function(n, index) {
      count = 0;
      var actual = _(array).map(iteratee).at(n).value(),
          expected = index < 2 ? 1 : 0;

      assert.strictEqual(count, expected);

      expected = index == 3 ? [] : [index == 2 ? undefined : square(lastIndex)];
      assert.deepEqual(actual, expected);
    });
  });

  it('work with an object for `object` when chaining', function() {
    var paths = ['a[0].b.c', 'a[1]'],
        actual = _(object).map(identity).at(paths).value();

    assert.deepEqual(actual, at(_.map(object, identity), paths));

    var indexObject = { '0': 1 };
    actual = _(indexObject).at(0).value();
    assert.deepEqual(actual, at(indexObject, 0));
  });
});
