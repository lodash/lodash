import assert from 'assert';
import conforms from '../conforms.js';

describe('conforms', function() {
  it('should not change behavior if `source` is modified', function() {
    var object = { 'a': 2 },
        source = { 'a': function(value) { return value > 1; } },
        par = conforms(source);

    assert.strictEqual(par(object), true);

    source.a = function(value) { return value < 2; };
    assert.strictEqual(par(object), true);
  });
});
