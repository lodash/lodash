import upperFirst from '../src/upperFirst';

describe('upperFirst', () => {
    it('should uppercase only the first character', () => {
        expect(upperFirst('fred')).toBe('Fred');
        expect(upperFirst('Fred')).toBe('Fred');
        expect(upperFirst('FRED')).toBe('FRED');
    });
});
