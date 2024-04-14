import lodashStable from 'lodash';
import concat from '../src/concat';

describe('concat', () => {
    it('should shallow clone `array`', () => {
        const array = [1, 2, 3];
        const actual = concat(array);

        expect(actual).toEqual(array);
        assert.notStrictEqual(actual, array);
    });

    it('should concat arrays and values', () => {
        const array = [1];
        const actual = concat(array, 2, [3], [[4]]);

        expect(actual).toEqual([1, 2, 3, [4]]);
        expect(array).toEqual([1]);
    });

    it('should cast non-array `array` values to arrays', () => {
        const values = [, null, undefined, false, true, 1, NaN, 'a'];

        let expected = lodashStable.map(values, (value, index) => (index ? [value] : []));

        let actual = lodashStable.map(values, (value, index) => (index ? concat(value) : concat()));

        expect(actual).toEqual(expected);

        expected = lodashStable.map(values, (value) => [value, 2, [3]]);

        actual = lodashStable.map(values, (value) => concat(value, [2], [[3]]));

        expect(actual).toEqual(expected);
    });

    it('should treat sparse arrays as dense', () => {
        const expected = [];
        const actual = concat(Array(1), Array(1));

        expected.push(undefined, undefined);

        expect('0' in actual).toBeTruthy();
        expect('1' in actual).toBeTruthy();
        expect(actual).toEqual(expected);
    });

    it('should return a new wrapped array', () => {
        const array = [1];
        const wrapped = _(array).concat([2, 3]);
        const actual = wrapped.value();

        expect(array).toEqual([1]);
        expect(actual).toEqual([1, 2, 3]);
    });
});
