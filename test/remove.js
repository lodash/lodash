import assert from 'assert';
import { isEven, slice } from './utils.js';
import remove from '../remove.js';

describe('remove', function() {
  it('should modify the array and return removed elements', function() {
    var array = [1, 2, 3, 4],
        actual = remove(array, isEven);

    assert.deepStrictEqual(array, [1, 3]);
    assert.deepStrictEqual(actual, [2, 4]);
  });

  it('should provide correct `predicate` arguments', function() {
    var argsList = [],
        array = [1, 2, 3],
        clone = array.slice();

    remove(array, function(n, index) {
      var args = slice.call(arguments);
      args[2] = args[2].slice();
      argsList.push(args);
      return isEven(index);
    });

    assert.deepStrictEqual(argsList, [[1, 0, clone], [2, 1, clone], [3, 2, clone]]);
  });

  it('should work with `_.matches` shorthands', function() {
    var objects = [{ 'a': 0, 'b': 1 }, { 'a': 1, 'b': 2 }];
    remove(objects, { 'a': 1 });
    assert.deepStrictEqual(objects, [{ 'a': 0, 'b': 1 }]);
  });

  it('should work with `_.matchesProperty` shorthands', function() {
    var objects = [{ 'a': 0, 'b': 1 }, { 'a': 1, 'b': 2 }];
    remove(objects, ['a', 1]);
    assert.deepStrictEqual(objects, [{ 'a': 0, 'b': 1 }]);
  });

  it('should work with `_.property` shorthands', function() {
    var objects = [{ 'a': 0 }, { 'a': 1 }];
    remove(objects, 'a');
    assert.deepStrictEqual(objects, [{ 'a': 0 }]);
  });

  it('should preserve holes in arrays', function() {
    var array = [1, 2, 3, 4];
    delete array[1];
    delete array[3];

    remove(array, function(n) {
      return n === 1;
    });

    assert.ok(!('0' in array));
    assert.ok(!('2' in array));
  });

  it('should treat holes as `undefined`', function() {
    var array = [1, 2, 3];
    delete array[1];

    remove(array, function(n) {
      return n == null;
    });

    assert.deepStrictEqual(array, [1, 3]);
  });

  it('should not mutate the array until all elements to remove are determined', function() {
    var array = [1, 2, 3];

    remove(array, function(n, index) {
      return isEven(index);
    });

    assert.deepStrictEqual(array, [2]);
  });
});
