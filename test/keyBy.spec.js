import lodashStable from 'lodash';
import { LARGE_ARRAY_SIZE } from './utils';
import keyBy from '../src/keyBy';

describe('keyBy', () => {
    const array = [
        { dir: 'left', code: 97 },
        { dir: 'right', code: 100 },
    ];

    it('should transform keys by `iteratee`', () => {
        const expected = { a: { dir: 'left', code: 97 }, d: { dir: 'right', code: 100 } };

        const actual = keyBy(array, (object) => String.fromCharCode(object.code));

        expect(actual).toEqual(expected);
    });

    it('should use `_.identity` when `iteratee` is nullish', () => {
        const array = [4, 6, 6];
        const values = [, null, undefined];
        const expected = lodashStable.map(values, lodashStable.constant({ 4: 4, 6: 6 }));

        const actual = lodashStable.map(values, (value, index) =>
            index ? keyBy(array, value) : keyBy(array),
        );

        expect(actual).toEqual(expected);
    });

    it('should work with `_.property` shorthands', () => {
        const expected = { left: { dir: 'left', code: 97 }, right: { dir: 'right', code: 100 } };
        const actual = keyBy(array, 'dir');

        expect(actual).toEqual(expected);
    });

    it('should only add values to own, not inherited, properties', () => {
        const actual = keyBy([6.1, 4.2, 6.3], (n) =>
            Math.floor(n) > 4 ? 'hasOwnProperty' : 'constructor',
        );

        expect(actual.constructor).toEqual(4.2);
        expect(actual.hasOwnProperty).toEqual(6.3);
    });

    it('should work with a number for `iteratee`', () => {
        const array = [
            [1, 'a'],
            [2, 'a'],
            [2, 'b'],
        ];

        expect(keyBy(array, 0)).toEqual({ 1: [1, 'a'], 2: [2, 'b'] });
        expect(keyBy(array, 1)).toEqual({ a: [2, 'a'], b: [2, 'b'] });
    });

    it('should work with an object for `collection`', () => {
        const actual = keyBy({ a: 6.1, b: 4.2, c: 6.3 }, Math.floor);
        expect(actual).toEqual({ 4: 4.2, 6: 6.3 });
    });
});
