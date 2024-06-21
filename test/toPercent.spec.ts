import toPercent from '../src/toPercent';

describe('toPercent', () => {
    it('convert 0.2 to 20%', () => {
        expect(toPercent(0.2)).toBe('20%');
    });

    it('convert 0.3333333 to 33%', () => {
        expect(toPercent(0.3333333)).toBe('33%');
    });

    it('convert 0.2 to 20.00%', () => {
        expect(toPercent(0.2, 2)).toBe('20%');
    });
});