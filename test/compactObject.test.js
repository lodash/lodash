import assert from 'assert';
import compactObject from '../compactObject.js';
import { falseyObject } from './utils.js';

describe('compact', function () {

  it('should filter falsey values', function () {
    var object = {
      'a': 'aa',
      'b': 1,
      'c': true
    };
    assert.deepStrictEqual(compactObject(Object.assign({}, object, falseyObject)), object);
  });
});
