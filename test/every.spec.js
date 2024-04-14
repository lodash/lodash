import lodashStable from 'lodash';
import { identity, empties, stubTrue, stubFalse } from './utils';
import every from '../src/every';

describe('every', () => {
    it('should return `true` if `predicate` returns truthy for all elements', () => {
        expect(lodashStable.every([true, 1, 'a'], identity)).toBe(true);
    });

    it('should return `true` for empty collections', () => {
        const expected = lodashStable.map(empties, stubTrue);

        const actual = lodashStable.map(empties, (value) => {
            try {
                return every(value, identity);
            } catch (e) {}
        });

        expect(actual).toEqual(expected);
    });

    it('should return `false` as soon as `predicate` returns falsey', () => {
        let count = 0;

        assert.strictEqual(
            every([true, null, true], (value) => {
                count++;
                return value;
            }),
            false,
        );

        expect(count).toBe(2);
    });

    it('should work with collections of `undefined` values (test in IE < 9)', () => {
        expect(every([undefined, undefined, undefined], identity)).toBe(false);
    });

    it('should use `_.identity` when `predicate` is nullish', () => {
        const values = [, null, undefined];
        let expected = lodashStable.map(values, stubFalse);

        let actual = lodashStable.map(values, (value, index) => {
            const array = [0];
            return index ? every(array, value) : every(array);
        });

        expect(actual).toEqual(expected);

        expected = lodashStable.map(values, stubTrue);
        actual = lodashStable.map(values, (value, index) => {
            const array = [1];
            return index ? every(array, value) : every(array);
        });

        expect(actual).toEqual(expected);
    });

    it('should work with `_.property` shorthands', () => {
        const objects = [
            { a: 0, b: 1 },
            { a: 1, b: 2 },
        ];
        expect(every(objects, 'a')).toBe(false);
        expect(every(objects, 'b')).toBe(true);
    });

    it('should work with `_.matches` shorthands', () => {
        const objects = [
            { a: 0, b: 0 },
            { a: 0, b: 1 },
        ];
        expect(every(objects, { a: 0 })).toBe(true);
        expect(every(objects, { b: 1 })).toBe(false);
    });

    it('should work as an iteratee for methods like `_.map`', () => {
        const actual = lodashStable.map([[1]], every);
        expect(actual).toEqual([true]);
    });
});
