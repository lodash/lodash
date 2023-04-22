import assert from 'assert';
import { realm } from './utils.js';
import isBlank from '../isBlank.js';

describe('isBlank', function() {
  it('should return `true` for `null` and `undefined` values', function() {
    assert.strictEqual(isBlank(null), true);
    assert.strictEqual(isBlank(undefined), true);
  });

  it('should return `true` for empty string values', function() {
    assert.strictEqual(isBlank(''), true);
  });

  it('should return `true` for numbers values', function() {
    assert.strictEqual(isBlank(0), false);
    assert.strictEqual(isBlank(10), false);
  });

  it('should return `false` for boolean values', function() {
    assert.strictEqual(isBlank(true), false);
    assert.strictEqual(isBlank(false), false);
  });

  it('should return `true` for empty array values', function() {
    assert.strictEqual(isBlank([[], [[]], [[[null]]], [[[null, undefined]]]]), true);
  });

  it('should return `false` for filled array values', function() {
    assert.strictEqual(isBlank([0, false]), false);
    assert.strictEqual(isBlank(realm.array), false);
  });

  it('should return `true` for empty object values', function() {
    assert.strictEqual(isBlank({}), true);
    assert.strictEqual(isBlank({0: null, 1: undefined, 2: {0: {  }, 1: null, 2: undefined}}), true);
  });

  it('should return `false` for filld object values', function() {
    assert.strictEqual(isBlank(realm.object), false);
    assert.strictEqual(isBlank({0: 0}), false);

  });
});
