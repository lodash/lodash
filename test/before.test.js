import assert from 'assert';
import lodashStable from 'lodash';
import { _ } from './utils.js';

describe('before', () => {
  const callMethod = (n, times) => {
    let count = 0;

    lodashStable.times(
      times,
      _.before(n, () => {
        count++;
      })
    );
    return count;
  };

  describe('if func arg ins\'t an object of type "function"', () => {
    it('should throw TypeError', () => {
      assert.throws(() => _.before(10, { test: 'not a function' }));
    });
  });

  // it('should create a function that invokes `func` after `n` calls', () => {
  //   assert.strictEqual(
  //     before(5, 4),
  //     4,
  //     'before(n) should invoke `func` before being called `n` times'
  //   )
  //   assert.strictEqual(
  //     before(5, 6),
  //     4,
  //     'before(n) should not invoke `func` after being called `n - 1` times'
  //   )
  //   assert.strictEqual(
  //     before(0, 0),
  //     0,
  //     'before(0) should not invoke `func` immediately'
  //   )
  //   assert.strictEqual(
  //     before(0, 1),
  //     0,
  //     'before(0) should not invoke `func` when called'
  //   )
  // })

  // it('should coerce `n` values of `NaN` to `0`', () => {
  //   assert.strictEqual(before(NaN, 1), 0)
  // })

  // it('should use `this` binding of function', () => {
  //   const before = _.before(2, function() {
  //       return ++this.count
  //     }),
  //     object = { before, count: 0 }

  //   object.before()
  //   assert.strictEqual(object.before(), 1)
  //   assert.strictEqual(object.count, 1)
  // })
});
