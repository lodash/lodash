import startCase from '../src/startCase';

describe('startCase', () => {
    it('should uppercase only the first character of each word', () => {
        expect(startCase('--foo-bar--')).toBe('Foo Bar');
        expect(startCase('fooBar')).toBe('Foo Bar');
        expect(startCase('__FOO_BAR__')).toBe('FOO BAR');
    });
});
