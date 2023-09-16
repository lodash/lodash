import assert from 'node:assert';
import toLower from '../src/toLower';

describe('toLower', () => {
    it('should convert whole string to lower case', () => {
        assert.deepStrictEqual(toLower('--Foo-Bar--'), '--foo-bar--');
        assert.deepStrictEqual(toLower('fooBar'), 'foobar');
        assert.deepStrictEqual(toLower('__FOO_BAR__'), '__foo_bar__');
    });
});
