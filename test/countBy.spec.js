import lodashStable from 'lodash';
import countBy from '../src/countBy';

describe('countBy', () => {
    const array = [6.1, 4.2, 6.3];

    it('should transform keys by `iteratee`', () => {
        const actual = countBy(array, Math.floor);
        expect(actual).toEqual({ 4: 1, 6: 2 });
    });

    it('should use `_.identity` when `iteratee` is nullish', () => {
        const array = [4, 6, 6];
        const values = [, null, undefined];
        const expected = lodashStable.map(values, lodashStable.constant({ 4: 1, 6: 2 }));

        const actual = lodashStable.map(values, (value, index) =>
            index ? countBy(array, value) : countBy(array),
        );

        expect(actual).toEqual(expected);
    });

    it('should work with `_.property` shorthands', () => {
        const actual = countBy(['one', 'two', 'three'], 'length');
        expect(actual).toEqual({ 3: 2, 5: 1 });
    });

    it('should only add values to own, not inherited, properties', () => {
        const actual = countBy(array, (n) =>
            Math.floor(n) > 4 ? 'hasOwnProperty' : 'constructor',
        );

        expect(actual.constructor).toEqual(1);
        expect(actual.hasOwnProperty).toEqual(2);
    });

    it('should work with a number for `iteratee`', () => {
        const array = [
            [1, 'a'],
            [2, 'a'],
            [2, 'b'],
        ];

        expect(countBy(array, 0)).toEqual({ 1: 1, 2: 2 });
        expect(countBy(array, 1)).toEqual({ a: 2, b: 1 });
    });

    it('should work with an object for `collection`', () => {
        const actual = countBy({ a: 6.1, b: 4.2, c: 6.3 }, Math.floor);
        expect(actual).toEqual({ 4: 1, 6: 2 });
    });
});
