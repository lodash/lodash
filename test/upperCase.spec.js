import upperCase from '../src/upperCase';

describe('upperCase', () => {
    it('should uppercase as space-separated words', () => {
        expect(upperCase('--foo-bar--')).toBe('FOO BAR');
        expect(upperCase('fooBar')).toBe('FOO BAR');
        expect(upperCase('__foo_bar__')).toBe('FOO BAR');
    });
});
