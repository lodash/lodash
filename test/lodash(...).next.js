import assert from 'assert';
import lodashStable from 'lodash';
import { _, isNpm, LARGE_ARRAY_SIZE, isEven } from './utils.js';
import toArray from '../toArray.js';
import filter from '../filter.js';

describe('lodash(...).next', function() {
  lodashStable.each([false, true], function(implicit) {
    function chain(value) {
      return implicit ? _(value) : _.chain(value);
    }

    var chainType = 'in an ' + (implicit ? 'implicit' : 'explict') + ' chain';

    it('should follow the iterator protocol ' + chainType, function() {
      var wrapped = chain([1, 2]);

      assert.deepEqual(wrapped.next(), { 'done': false, 'value': 1 });
      assert.deepEqual(wrapped.next(), { 'done': false, 'value': 2 });
      assert.deepEqual(wrapped.next(), { 'done': true,  'value': undefined });
    });

    it('should act as an iterable ' + chainType, function() {
      if (!isNpm && Symbol && Symbol.iterator) {
        var array = [1, 2],
            wrapped = chain(array);

        assert.strictEqual(wrapped[Symbol.iterator](), wrapped);
        assert.deepStrictEqual(lodashStable.toArray(wrapped), array);
      }
    });

    it('should use `_.toArray` to generate the iterable result ' + chainType, function() {
      if (!isNpm && Array.from) {
        var hearts = '\ud83d\udc95',
            values = [[1], { 'a': 1 }, hearts];

        lodashStable.each(values, function(value) {
          var wrapped = chain(value);
          assert.deepStrictEqual(Array.from(wrapped), toArray(value));
        });
      }
    });

    it('should reset the iterator correctly ' + chainType, function() {
      if (!isNpm && Symbol && Symbol.iterator) {
        var array = [1, 2],
            wrapped = chain(array);

        assert.deepStrictEqual(lodashStable.toArray(wrapped), array);
        assert.deepStrictEqual(lodashStable.toArray(wrapped), [], 'produces an empty array for exhausted iterator');

        var other = wrapped.filter();
        assert.deepStrictEqual(lodashStable.toArray(other), array, 'reset for new chain segments');
        assert.deepStrictEqual(lodashStable.toArray(wrapped), [], 'iterator is still exhausted');
      }
    });

    it('should work in a lazy sequence ' + chainType, function() {
      if (!isNpm && Symbol && Symbol.iterator) {
        var array = lodashStable.range(LARGE_ARRAY_SIZE),
            predicate = function(value) { values.push(value); return isEven(value); },
            values = [],
            wrapped = chain(array);

        assert.deepStrictEqual(lodashStable.toArray(wrapped), array);

        wrapped = wrapped.filter(predicate);
        assert.deepStrictEqual(lodashStable.toArray(wrapped), filter(array, isEven), 'reset for new lazy chain segments');
        assert.deepStrictEqual(values, array, 'memoizes iterator values');
      }
    });
  });
});
