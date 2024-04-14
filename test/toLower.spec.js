import toLower from '../src/toLower';

describe('toLower', () => {
    it('should convert whole string to lower case', () => {
        expect(toLower('--Foo-Bar--')).toEqual('--foo-bar--');
        expect(toLower('fooBar')).toEqual('foobar');
        expect(toLower('__FOO_BAR__')).toEqual('__foo_bar__');
    });
});
