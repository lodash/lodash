import assert from 'assert';
import lodashStable from 'lodash';
import { LARGE_ARRAY_SIZE, _, falsey } from './utils.js';
import compact from '../compact.js';
import slice from '../slice.js';

describe('compact', function() {
  var largeArray = lodashStable.range(LARGE_ARRAY_SIZE).concat(null);

  it('should filter falsey values', function() {
    var array = ['0', '1', '2'];
    assert.deepStrictEqual(compact(falsey.concat(array)), array);
  });

  it('should work when in-between lazy operators', function() {
    var actual = _(falsey).thru(slice).compact().thru(slice).value();
    assert.deepEqual(actual, []);

    actual = _(falsey).thru(slice).push(true, 1).compact().push('a').value();
    assert.deepEqual(actual, [true, 1, 'a']);
  });

  it('should work in a lazy sequence', function() {
    var actual = _(largeArray).slice(1).compact().reverse().take().value();
    assert.deepEqual(actual, _.take(compact(slice(largeArray, 1)).reverse()));
  });

  it('should work in a lazy sequence with a custom `_.iteratee`', function() {
    var iteratee = _.iteratee,
        pass = false;

    _.iteratee = identity;

    try {
      var actual = _(largeArray).slice(1).compact().value();
      pass = lodashStable.isEqual(actual, compact(slice(largeArray, 1)));
    } catch (e) {console.log(e);}

    assert.ok(pass);
    _.iteratee = iteratee;
  });
});
