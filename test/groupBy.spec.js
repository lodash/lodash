import lodashStable from 'lodash';
import groupBy from '../src/groupBy';

describe('groupBy', () => {
    const array = [6.1, 4.2, 6.3];

    it('should transform keys by `iteratee`', () => {
        const actual = groupBy(array, Math.floor);
        expect(actual).toEqual({ 4: [4.2], 6: [6.1, 6.3] });
    });

    it('should use `_.identity` when `iteratee` is nullish', () => {
        const array = [6, 4, 6];
        const values = [, null, undefined];
        const expected = lodashStable.map(values, lodashStable.constant({ 4: [4], 6: [6, 6] }));

        const actual = lodashStable.map(values, (value, index) =>
            index ? groupBy(array, value) : groupBy(array),
        );

        expect(actual).toEqual(expected);
    });

    it('should work with `_.property` shorthands', () => {
        const actual = groupBy(['one', 'two', 'three'], 'length');
        expect(actual).toEqual({ 3: ['one', 'two'], 5: ['three'] });
    });

    it('should only add values to own, not inherited, properties', () => {
        const actual = groupBy(array, (n) =>
            Math.floor(n) > 4 ? 'hasOwnProperty' : 'constructor',
        );

        expect(actual.constructor).toEqual([4.2]);
        expect(actual.hasOwnProperty).toEqual([6.1, 6.3]);
    });

    it('should work with a number for `iteratee`', () => {
        const array = [
            [1, 'a'],
            [2, 'a'],
            [2, 'b'],
        ];

        assert.deepStrictEqual(groupBy(array, 0), {
            1: [[1, 'a']],
            2: [
                [2, 'a'],
                [2, 'b'],
            ],
        });
        assert.deepStrictEqual(groupBy(array, 1), {
            a: [
                [1, 'a'],
                [2, 'a'],
            ],
            b: [[2, 'b']],
        });
    });

    it('should work with an object for `collection`', () => {
        const actual = groupBy({ a: 6.1, b: 4.2, c: 6.3 }, Math.floor);
        expect(actual).toEqual({ 4: [4.2], 6: [6.1, 6.3] });
    });
});
