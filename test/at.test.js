import assert from 'assert';
import lodashStable from 'lodash';
import { empties, stubOne, falsey, args, LARGE_ARRAY_SIZE, square, identity } from './utils.js';
import at from '../at.js';

describe('at', function() {
  let array = ['a', 'b', 'c'],
      object = { 'a': [{ 'b': { 'c': 3 } }, 4] };

  it('should return the elements corresponding to the specified keys', function() {
    let actual = at(array, [0, 2]);
    assert.deepStrictEqual(actual, ['a', 'c']);
  });

  it('should return `undefined` for nonexistent keys', function() {
    let actual = at(array, [2, 4, 0]);
    assert.deepStrictEqual(actual, ['c', undefined, 'a']);
  });

  it('should work with non-index keys on array values', function() {
    let values = lodashStable.reject(empties, function(value) {
      return (value === 0) || lodashStable.isArray(value);
    }).concat(-1, 1.1);

    let array = lodashStable.transform(values, function(result, value) {
      result[value] = 1;
    }, []);

    let expected = lodashStable.map(values, stubOne),
        actual = at(array, values);

    assert.deepStrictEqual(actual, expected);
  });

  it('should return an empty array when no keys are given', function() {
    assert.deepStrictEqual(at(array), []);
    assert.deepStrictEqual(at(array, [], []), []);
  });

  it('should accept multiple key arguments', function() {
    let actual = at(['a', 'b', 'c', 'd'], 3, 0, 2);
    assert.deepStrictEqual(actual, ['d', 'a', 'c']);
  });

  it('should work with a falsey `object` when keys are given', function() {
    let expected = lodashStable.map(falsey, lodashStable.constant(Array(4).fill(undefined)));

    let actual = lodashStable.map(falsey, function(object) {
      try {
        return at(object, 0, 1, 'pop', 'push');
      } catch (e) {}
    });

    assert.deepStrictEqual(actual, expected);
  });

  it('should work with an `arguments` object for `object`', function() {
    let actual = at(args, [2, 0]);
    assert.deepStrictEqual(actual, [3, 1]);
  });

  it('should work with `arguments` object as secondary arguments', function() {
    let actual = at([1, 2, 3, 4, 5], args);
    assert.deepStrictEqual(actual, [2, 3, 4]);
  });

  it('should work with an object for `object`', function() {
    let actual = at(object, ['a[0].b.c', 'a[1]']);
    assert.deepStrictEqual(actual, [3, 4]);
  });

  it('should pluck inherited property values', function() {
    function Foo() {
      this.a = 1;
    }
    Foo.prototype.b = 2;

    let actual = at(new Foo, 'b');
    assert.deepStrictEqual(actual, [2]);
  });

  it('should work in a lazy sequence', function() {
    let largeArray = lodashStable.range(LARGE_ARRAY_SIZE),
        smallArray = array;

    lodashStable.each([[2], ['2'], [2, 1]], function(paths) {
      lodashStable.times(2, function(index) {
        let array = index ? largeArray : smallArray,
            wrapped = _(array).map(identity).at(paths);

        assert.deepEqual(wrapped.value(), at(_.map(array, identity), paths));
      });
    });
  });

  it('should support shortcut fusion', function() {
    let array = lodashStable.range(LARGE_ARRAY_SIZE),
        count = 0,
        iteratee = function(value) { count++; return square(value); },
        lastIndex = LARGE_ARRAY_SIZE - 1;

    lodashStable.each([lastIndex, `${lastIndex  }`, LARGE_ARRAY_SIZE, []], function(n, index) {
      count = 0;
      let actual = _(array).map(iteratee).at(n).value(),
          expected = index < 2 ? 1 : 0;

      assert.strictEqual(count, expected);

      expected = index == 3 ? [] : [index == 2 ? undefined : square(lastIndex)];
      assert.deepEqual(actual, expected);
    });
  });

  it('work with an object for `object` when chaining', function() {
    let paths = ['a[0].b.c', 'a[1]'],
        actual = _(object).map(identity).at(paths).value();

    assert.deepEqual(actual, at(_.map(object, identity), paths));

    let indexObject = { '0': 1 };
    actual = _(indexObject).at(0).value();
    assert.deepEqual(actual, at(indexObject, 0));
  });
});
