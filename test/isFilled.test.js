import assert from 'assert';
import { realm } from './utils.js';
import isFilled from '../isFilled.js';

describe('isFilled', function() {
  it('should return `false` for `null` and `undefined` values', function() {
    assert.strictEqual(isFilled(null), false);
    assert.strictEqual(isFilled(undefined), false);
  });

  it('should return `false` for empty string values', function() {
    assert.strictEqual(isFilled(''), false);
  });

  it('should return `true` for numbers values', function() {
    assert.strictEqual(isFilled(0), true);
    assert.strictEqual(isFilled(10), true);
  });

  it('should return `true` for boolean values', function() {
    assert.strictEqual(isFilled(true), true);
    assert.strictEqual(isFilled(false), true);
  });

  it('should return `false` for empty array values', function() {
    assert.strictEqual(isFilled([[], [[]], [[[null]]], [[[null, undefined]]]]), false);
  });

  it('should return `true` for filled array values', function() {
    assert.strictEqual(isFilled([0, false]), true);
    assert.strictEqual(isFilled(realm.array), true);
  });

  it('should return `false` for empty object values', function() {
    assert.strictEqual(isFilled({}), false);
    assert.strictEqual(isFilled({0: null, 1: undefined, 2: {0: {  }, 1: null, 2: undefined}}), false);
  });

  it('should return `true` for filld object values', function() {
    assert.strictEqual(isFilled(realm.object), true);
    assert.strictEqual(isFilled({0: 0}), true);
  });
});
