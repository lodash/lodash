import pullAll from '../src/pullAll';

describe('pullAll', () => {
    it('should work with the same value for `array` and `values`', () => {
        const array = [{ a: 1 }, { b: 2 }];
        const actual = pullAll(array, array);

        expect(actual).toEqual([]);
    });
});
