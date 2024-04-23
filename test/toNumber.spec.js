import toNumber from '../src/toNumber';
describe('toNumber', () => {
    it('should return the given number', () => {
        expect(toNumber(34)).toBe(34);
    });

    it('should convert the given number', () => {
        expect(toNumber('23')).toBe(23);
    });

    it('should return the NaN', () => {
        expect(toNumber('this-shall-pass')).toBe(NaN);
    });

    it('should return the default value as NaN', () => {
        expect(toNumber('this-shall-pass', {})).toBe(NaN);
    });

    it('should return the default value', () => {
        expect(toNumber({}, { defaultValue: 47 })).toBe(47);
    });
});
