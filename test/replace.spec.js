import replace from '../src/replace';

describe('replace', () => {
    it('should replace the matched pattern', () => {
        const string = 'abcde';
        expect(replace(string, 'de', '123')).toBe('abc123');
        expect(replace(string, /[bd]/g, '-')).toBe('a-c-e');
    });
});
