import lowerFirst from '../src/lowerFirst';

describe('lowerFirst', () => {
    it('should lowercase only the first character', () => {
        expect(lowerFirst('fred')).toBe('fred');
        expect(lowerFirst('Fred')).toBe('fred');
        expect(lowerFirst('FRED')).toBe('fRED');
    });
});
