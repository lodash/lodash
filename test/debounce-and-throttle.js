import assert from 'assert';
import lodashStable from 'lodash';
import { _, noop, push, isModularize } from './utils.js';
import runInContext from '../runInContext.js';

describe('debounce and throttle', function() {
  lodashStable.each(['debounce', 'throttle'], function(methodName) {
    var func = _[methodName],
        isDebounce = methodName == 'debounce';

    it('`_.' + methodName + '` should not error for non-object `options` values', function() {
      func(noop, 32, 1);
      assert.ok(true);
    });

    it('`_.' + methodName + '` should use a default `wait` of `0`', function(done) {
      var callCount = 0,
          funced = func(function() { callCount++; });

      funced();

      setTimeout(function() {
        funced();
        assert.strictEqual(callCount, isDebounce ? 1 : 2);
        done();
      }, 32);
    });

    it('`_.' + methodName + '` should invoke `func` with the correct `this` binding', function(done) {
      var actual = [],
          object = { 'funced': func(function() { actual.push(this); }, 32) },
          expected = lodashStable.times(isDebounce ? 1 : 2, lodashStable.constant(object));

      object.funced();
      if (!isDebounce) {
        object.funced();
      }
      setTimeout(function() {
        assert.deepStrictEqual(actual, expected);
        done();
      }, 64);
    });

    it('`_.' + methodName + '` supports recursive calls', function(done) {
      var actual = [],
          args = lodashStable.map(['a', 'b', 'c'], function(chr) { return [{}, chr]; }),
          expected = args.slice(),
          queue = args.slice();

      var funced = func(function() {
        var current = [this];
        push.apply(current, arguments);
        actual.push(current);

        var next = queue.shift();
        if (next) {
          funced.call(next[0], next[1]);
        }
      }, 32);

      var next = queue.shift();
      funced.call(next[0], next[1]);
      assert.deepStrictEqual(actual, expected.slice(0, isDebounce ? 0 : 1));

      setTimeout(function() {
        assert.deepStrictEqual(actual, expected.slice(0, actual.length));
        done();
      }, 256);
    });

    it('`_.' + methodName + '` should work if the system time is set backwards', function(done) {
      if (!isModularize) {
        var callCount = 0,
            dateCount = 0;

        var lodash = runInContext({
          'Date': {
            'now': function() {
              return ++dateCount == 4
                ? +new Date(2012, 3, 23, 23, 27, 18)
                : +new Date;
            }
          }
        });

        var funced = lodash[methodName](function() {
          callCount++;
        }, 32);

        funced();

        setTimeout(function() {
          funced();
          assert.strictEqual(callCount, isDebounce ? 1 : 2);
          done();
        }, 64);
      }
      else {
        done();
      }
    });

    it('`_.' + methodName + '` should support cancelling delayed calls', function(done) {
      var callCount = 0;

      var funced = func(function() {
        callCount++;
      }, 32, { 'leading': false });

      funced();
      funced.cancel();

      setTimeout(function() {
        assert.strictEqual(callCount, 0);
        done();
      }, 64);
    });

    it('`_.' + methodName + '` should reset `lastCalled` after cancelling', function(done) {
      var callCount = 0;

      var funced = func(function() {
        return ++callCount;
      }, 32, { 'leading': true });

      assert.strictEqual(funced(), 1);
      funced.cancel();

      assert.strictEqual(funced(), 2);
      funced();

      setTimeout(function() {
        assert.strictEqual(callCount, 3);
        done();
      }, 64);
    });

    it('`_.' + methodName + '` should support flushing delayed calls', function(done) {
      var callCount = 0;

      var funced = func(function() {
        return ++callCount;
      }, 32, { 'leading': false });

      funced();
      assert.strictEqual(funced.flush(), 1);

      setTimeout(function() {
        assert.strictEqual(callCount, 1);
        done();
      }, 64);
    });

    it('`_.' + methodName + '` should noop `cancel` and `flush` when nothing is queued', function(done) {
      var callCount = 0,
          funced = func(function() { callCount++; }, 32);

      funced.cancel();
      assert.strictEqual(funced.flush(), undefined);

      setTimeout(function() {
        assert.strictEqual(callCount, 0);
        done();
      }, 64);
    });
  });
});
