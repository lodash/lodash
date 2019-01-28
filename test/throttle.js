import assert from 'assert';
import lodashStable from 'lodash';
import { identity, isModularize, argv, isPhantom } from './utils.js';
import throttle from '../throttle.js';
import runInContext from '../runInContext.js';

describe('throttle', function() {
  it('should throttle a function', function(done) {
    var callCount = 0,
        throttled = throttle(function() { callCount++; }, 32);

    throttled();
    throttled();
    throttled();

    var lastCount = callCount;
    assert.ok(callCount);

    setTimeout(function() {
      assert.ok(callCount > lastCount);
      done();
    }, 64);
  });

  it('subsequent calls should return the result of the first call', function(done) {
    var throttled = throttle(identity, 32),
        results = [throttled('a'), throttled('b')];

    assert.deepStrictEqual(results, ['a', 'a']);

    setTimeout(function() {
      var results = [throttled('c'), throttled('d')];
      assert.notStrictEqual(results[0], 'a');
      assert.notStrictEqual(results[0], undefined);

      assert.notStrictEqual(results[1], 'd');
      assert.notStrictEqual(results[1], undefined);
      done();
    }, 64);
  });

  it('should clear timeout when `func` is called', function(done) {
    if (!isModularize) {
      var callCount = 0,
          dateCount = 0;

      var lodash = runInContext({
        'Date': {
          'now': function() {
            return ++dateCount == 5 ? Infinity : +new Date;
          }
        }
      });

      var throttled = lodash.throttle(function() { callCount++; }, 32);

      throttled();
      throttled();

      setTimeout(function() {
        assert.strictEqual(callCount, 2);
        done();
      }, 64);
    }
    else {
      done();
    }
  });

  it('should not trigger a trailing call when invoked once', function(done) {
    var callCount = 0,
        throttled = throttle(function() { callCount++; }, 32);

    throttled();
    assert.strictEqual(callCount, 1);

    setTimeout(function() {
      assert.strictEqual(callCount, 1);
      done();
    }, 64);
  });

  lodashStable.times(2, function(index) {
    it('should trigger a call when invoked repeatedly' + (index ? ' and `leading` is `false`' : ''), function(done) {
      var callCount = 0,
          limit = (argv || isPhantom) ? 1000 : 320,
          options = index ? { 'leading': false } : {},
          throttled = throttle(function() { callCount++; }, 32, options);

      var start = +new Date;
      while ((new Date - start) < limit) {
        throttled();
      }
      var actual = callCount > 1;
      setTimeout(function() {
        assert.ok(actual);
        done();
      }, 1);
    });
  });

  it('should trigger a second throttled call as soon as possible', function(done) {
    var callCount = 0;

    var throttled = throttle(function() {
      callCount++;
    }, 128, { 'leading': false });

    throttled();

    setTimeout(function() {
      assert.strictEqual(callCount, 1);
      throttled();
    }, 192);

    setTimeout(function() {
      assert.strictEqual(callCount, 1);
    }, 254);

    setTimeout(function() {
      assert.strictEqual(callCount, 2);
      done();
    }, 384);
  });

  it('should apply default options', function(done) {
    var callCount = 0,
        throttled = throttle(function() { callCount++; }, 32, {});

    throttled();
    throttled();
    assert.strictEqual(callCount, 1);

    setTimeout(function() {
      assert.strictEqual(callCount, 2);
      done();
    }, 128);
  });

  it('should support a `leading` option', function() {
    var withLeading = throttle(identity, 32, { 'leading': true });
    assert.strictEqual(withLeading('a'), 'a');

    var withoutLeading = throttle(identity, 32, { 'leading': false });
    assert.strictEqual(withoutLeading('a'), undefined);
  });

  it('should support a `trailing` option', function(done) {
    var withCount = 0,
        withoutCount = 0;

    var withTrailing = throttle(function(value) {
      withCount++;
      return value;
    }, 64, { 'trailing': true });

    var withoutTrailing = throttle(function(value) {
      withoutCount++;
      return value;
    }, 64, { 'trailing': false });

    assert.strictEqual(withTrailing('a'), 'a');
    assert.strictEqual(withTrailing('b'), 'a');

    assert.strictEqual(withoutTrailing('a'), 'a');
    assert.strictEqual(withoutTrailing('b'), 'a');

    setTimeout(function() {
      assert.strictEqual(withCount, 2);
      assert.strictEqual(withoutCount, 1);
      done();
    }, 256);
  });

  it('should not update `lastCalled`, at the end of the timeout, when `trailing` is `false`', function(done) {
    var callCount = 0;

    var throttled = throttle(function() {
      callCount++;
    }, 64, { 'trailing': false });

    throttled();
    throttled();

    setTimeout(function() {
      throttled();
      throttled();
    }, 96);

    setTimeout(function() {
      assert.ok(callCount > 1);
      done();
    }, 192);
  });

  it('should work with a system time of `0`', function(done) {
    if (!isModularize) {
      var callCount = 0,
          dateCount = 0;

      var lodash = runInContext({
        'Date': {
          'now': function() {
            return ++dateCount < 4 ? 0 : +new Date;
          }
        }
      });

      var throttled = lodash.throttle(function(value) {
        callCount++;
        return value;
      }, 32);

      var results = [throttled('a'), throttled('b'), throttled('c')];
      assert.deepStrictEqual(results, ['a', 'a', 'a']);
      assert.strictEqual(callCount, 1);

      setTimeout(function() {
        assert.strictEqual(callCount, 2);
        done();
      }, 64);
    }
    else {
      done();
    }
  });
});
