import toUpper from '../src/toUpper';

describe('toUpper', () => {
    it('should convert whole string to upper case', () => {
        expect(toUpper('--Foo-Bar')).toEqual('--FOO-BAR');
        expect(toUpper('fooBar')).toEqual('FOOBAR');
        expect(toUpper('__FOO_BAR__')).toEqual('__FOO_BAR__');
    });
});
