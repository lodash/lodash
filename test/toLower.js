import assert from 'assert';
import toLower from '../toLower.js';

describe('toLower', function() {
  it('should convert whole string to lower case', function() {
    assert.deepStrictEqual(toLower('--Foo-Bar--'), '--foo-bar--');
    assert.deepStrictEqual(toLower('fooBar'), 'foobar');
    assert.deepStrictEqual(toLower('__FOO_BAR__'), '__foo_bar__');
  });
});
