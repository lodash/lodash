import assert from 'assert';
import { identity, argv, isPhantom, push } from './utils.js';
import debounce from '../debounce.js';

describe('debounce', function() {
  it('should debounce a function', function(done) {
    var callCount = 0;

    var debounced = debounce(function(value) {
      ++callCount;
      return value;
    }, 32);

    var results = [debounced('a'), debounced('b'), debounced('c')];
    assert.deepStrictEqual(results, [undefined, undefined, undefined]);
    assert.strictEqual(callCount, 0);

    setTimeout(function() {
      assert.strictEqual(callCount, 1);

      var results = [debounced('d'), debounced('e'), debounced('f')];
      assert.deepStrictEqual(results, ['c', 'c', 'c']);
      assert.strictEqual(callCount, 1);
    }, 128);

    setTimeout(function() {
      assert.strictEqual(callCount, 2);
      done();
    }, 256);
  });

  it('subsequent debounced calls return the last `func` result', function(done) {
    var debounced = debounce(identity, 32);
    debounced('a');

    setTimeout(function() {
      assert.notStrictEqual(debounced('b'), 'b');
    }, 64);

    setTimeout(function() {
      assert.notStrictEqual(debounced('c'), 'c');
      done();
    }, 128);
  });

  it('should not immediately call `func` when `wait` is `0`', function(done) {
    var callCount = 0,
        debounced = debounce(function() { ++callCount; }, 0);

    debounced();
    debounced();
    assert.strictEqual(callCount, 0);

    setTimeout(function() {
      assert.strictEqual(callCount, 1);
      done();
    }, 5);
  });

  it('should apply default options', function(done) {
    var callCount = 0,
        debounced = debounce(function() { callCount++; }, 32, {});

    debounced();
    assert.strictEqual(callCount, 0);

    setTimeout(function() {
      assert.strictEqual(callCount, 1);
      done();
    }, 64);
  });

  it('should support a `leading` option', function(done) {
    var callCounts = [0, 0];

    var withLeading = debounce(function() {
      callCounts[0]++;
    }, 32, { 'leading': true });

    var withLeadingAndTrailing = debounce(function() {
      callCounts[1]++;
    }, 32, { 'leading': true });

    withLeading();
    assert.strictEqual(callCounts[0], 1);

    withLeadingAndTrailing();
    withLeadingAndTrailing();
    assert.strictEqual(callCounts[1], 1);

    setTimeout(function() {
      assert.deepStrictEqual(callCounts, [1, 2]);

      withLeading();
      assert.strictEqual(callCounts[0], 2);

      done();
    }, 64);
  });

  it('subsequent leading debounced calls return the last `func` result', function(done) {
    var debounced = debounce(identity, 32, { 'leading': true, 'trailing': false }),
        results = [debounced('a'), debounced('b')];

    assert.deepStrictEqual(results, ['a', 'a']);

    setTimeout(function() {
      var results = [debounced('c'), debounced('d')];
      assert.deepStrictEqual(results, ['c', 'c']);
      done();
    }, 64);
  });

  it('should support a `trailing` option', function(done) {
    var withCount = 0,
        withoutCount = 0;

    var withTrailing = debounce(function() {
      withCount++;
    }, 32, { 'trailing': true });

    var withoutTrailing = debounce(function() {
      withoutCount++;
    }, 32, { 'trailing': false });

    withTrailing();
    assert.strictEqual(withCount, 0);

    withoutTrailing();
    assert.strictEqual(withoutCount, 0);

    setTimeout(function() {
      assert.strictEqual(withCount, 1);
      assert.strictEqual(withoutCount, 0);
      done();
    }, 64);
  });

  it('should support a `maxWait` option', function(done) {
    var callCount = 0;

    var debounced = debounce(function(value) {
      ++callCount;
      return value;
    }, 32, { 'maxWait': 64 });

    debounced();
    debounced();
    assert.strictEqual(callCount, 0);

    setTimeout(function() {
      assert.strictEqual(callCount, 1);
      debounced();
      debounced();
      assert.strictEqual(callCount, 1);
    }, 128);

    setTimeout(function() {
      assert.strictEqual(callCount, 2);
      done();
    }, 256);
  });

  it('should support `maxWait` in a tight loop', function(done) {
    var limit = (argv || isPhantom) ? 1000 : 320,
        withCount = 0,
        withoutCount = 0;

    var withMaxWait = debounce(function() {
      withCount++;
    }, 64, { 'maxWait': 128 });

    var withoutMaxWait = debounce(function() {
      withoutCount++;
    }, 96);

    var start = +new Date;
    while ((new Date - start) < limit) {
      withMaxWait();
      withoutMaxWait();
    }
    var actual = [Boolean(withoutCount), Boolean(withCount)];
    setTimeout(function() {
      assert.deepStrictEqual(actual, [false, true]);
      done();
    }, 1);
  });

  it('should queue a trailing call for subsequent debounced calls after `maxWait`', function(done) {
    var callCount = 0;

    var debounced = debounce(function() {
      ++callCount;
    }, 200, { 'maxWait': 200 });

    debounced();

    setTimeout(debounced, 190);
    setTimeout(debounced, 200);
    setTimeout(debounced, 210);

    setTimeout(function() {
      assert.strictEqual(callCount, 2);
      done();
    }, 500);
  });

  it('should cancel `maxDelayed` when `delayed` is invoked', function(done) {
    var callCount = 0;

    var debounced = debounce(function() {
      callCount++;
    }, 32, { 'maxWait': 64 });

    debounced();

    setTimeout(function() {
      debounced();
      assert.strictEqual(callCount, 1);
    }, 128);

    setTimeout(function() {
      assert.strictEqual(callCount, 2);
      done();
    }, 192);
  });

  it('should invoke the trailing call with the correct arguments and `this` binding', function(done) {
    var actual,
        callCount = 0,
        object = {};

    var debounced = debounce(function(value) {
      actual = [this];
      push.apply(actual, arguments);
      return ++callCount != 2;
    }, 32, { 'leading': true, 'maxWait': 64 });

    while (true) {
      if (!debounced.call(object, 'a')) {
        break;
      }
    }
    setTimeout(function() {
      assert.strictEqual(callCount, 2);
      assert.deepStrictEqual(actual, [object, 'a']);
      done();
    }, 64);
  });
});
