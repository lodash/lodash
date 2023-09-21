import lodashStable from 'lodash';
import { empties, stubOne, noop, falsey } from './utils';
import pullAt from '../src/pullAt';

describe('pullAt', () => {
    it('should modify the array and return removed elements', () => {
        const array = [1, 2, 3];
        const actual = pullAt(array, [0, 1]);

        expect(array).toEqual([3]);
        expect(actual).toEqual([1, 2]);
    });

    it('should work with unsorted indexes', () => {
        const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
        const actual = pullAt(array, [1, 3, 11, 7, 5, 9]);

        expect(array).toEqual([1, 3, 5, 7, 9, 11]);
        expect(actual).toEqual([2, 4, 12, 8, 6, 10]);
    });

    it('should work with repeated indexes', () => {
        const array = [1, 2, 3, 4];
        const actual = pullAt(array, [0, 2, 0, 1, 0, 2]);

        expect(array).toEqual([4]);
        expect(actual).toEqual([1, 3, 1, 2, 1, 3]);
    });

    it('should use `undefined` for nonexistent indexes', () => {
        const array = ['a', 'b', 'c'];
        const actual = pullAt(array, [2, 4, 0]);

        expect(array).toEqual(['b']);
        expect(actual).toEqual(['c', undefined, 'a']);
    });

    it('should flatten `indexes`', () => {
        let array = ['a', 'b', 'c'];
        expect(pullAt(array, 2, 0)).toEqual(['c', 'a']);
        expect(array).toEqual(['b']);

        array = ['a', 'b', 'c', 'd'];
        expect(pullAt(array, [3, 0], 2)).toEqual(['d', 'a', 'c']);
        expect(array).toEqual(['b']);
    });

    it('should return an empty array when no indexes are given', () => {
        const array = ['a', 'b', 'c'];
        let actual = pullAt(array);

        expect(array).toEqual(['a', 'b', 'c']);
        expect(actual).toEqual([]);

        actual = pullAt(array, [], []);

        expect(array).toEqual(['a', 'b', 'c']);
        expect(actual).toEqual([]);
    });

    it('should work with non-index paths', () => {
        const values = lodashStable
            .reject(empties, (value) => value === 0 || lodashStable.isArray(value))
            .concat(-1, 1.1);

        const array = lodashStable.transform(
            values,
            (result, value) => {
                result[value] = 1;
            },
            [],
        );

        let expected = lodashStable.map(values, stubOne);
        let actual = pullAt(array, values);

        expect(actual).toEqual(expected);

        expected = lodashStable.map(values, noop);
        actual = lodashStable.at(array, values);

        expect(actual).toEqual(expected);
    });

    it('should preserve the sign of `0`', () => {
        const props = [-0, Object(-0), 0, Object(0)];

        const actual = lodashStable.map(props, (key) => {
            const array = [-1];
            array['-0'] = -2;
            return pullAt(array, key);
        });

        expect(actual).toEqual([[-2], [-2], [-1], [-1]]);
    });

    it('should support deep paths', () => {
        const array = [];
        array.a = { b: 2 };

        let actual = pullAt(array, 'a.b');

        expect(actual).toEqual([2]);
        expect(array.a).toEqual({});

        try {
            actual = pullAt(array, 'a.b.c');
        } catch (e) {}

        expect(actual).toEqual([undefined]);
    });

    it('should work with a falsey `array` when keys are given', () => {
        const values = falsey.slice();
        const expected = lodashStable.map(values, lodashStable.constant(Array(4)));

        const actual = lodashStable.map(values, (array) => {
            try {
                return pullAt(array, 0, 1, 'pop', 'push');
            } catch (e) {}
        });

        expect(actual).toEqual(expected);
    });
});
