import lodashStable from 'lodash';
import { slice, noop, stubC, falsey, stubFalse } from './utils';
import isEqualWith from '../src/isEqualWith';
import isString from '../src/isString';
import without from '../src/without';
import partial from '../src/partial';

describe('isEqualWith', () => {
    it('should provide correct `customizer` arguments', () => {
        const argsList = [];
        const object1 = { a: [1, 2], b: null };
        const object2 = { a: [1, 2], b: null };

        object1.b = object2;
        object2.b = object1;

        const expected = [
            [object1, object2],
            [object1.a, object2.a, 'a', object1, object2],
            [object1.a[0], object2.a[0], 0, object1.a, object2.a],
            [object1.a[1], object2.a[1], 1, object1.a, object2.a],
            [object1.b, object2.b, 'b', object1.b, object2.b],
        ];

        isEqualWith(object1, object2, function () {
            const length = arguments.length;
            const args = slice.call(arguments, 0, length - (length > 2 ? 1 : 0));

            argsList.push(args);
        });

        expect(argsList).toEqual(expected);
    });

    it('should handle comparisons when `customizer` returns `undefined`', () => {
        expect(isEqualWith('a', 'a', noop)).toBe(true);
        expect(isEqualWith(['a'], ['a'], noop)).toBe(true);
        expect(isEqualWith({ 0: 'a' }, { 0: 'a' }, noop)).toBe(true);
    });

    it('should not handle comparisons when `customizer` returns `true`', () => {
        const customizer = function (value) {
            return isString(value) || undefined;
        };

        expect(isEqualWith('a', 'b', customizer)).toBe(true);
        expect(isEqualWith(['a'], ['b'], customizer)).toBe(true);
        expect(isEqualWith({ 0: 'a' }, { 0: 'b' }, customizer)).toBe(true);
    });

    it('should not handle comparisons when `customizer` returns `false`', () => {
        const customizer = function (value) {
            return isString(value) ? false : undefined;
        };

        expect(isEqualWith('a', 'a', customizer)).toBe(false);
        expect(isEqualWith(['a'], ['a'], customizer)).toBe(false);
        expect(isEqualWith({ 0: 'a' }, { 0: 'a' }, customizer)).toBe(false);
    });

    it('should return a boolean value even when `customizer` does not', () => {
        let actual = isEqualWith('a', 'b', stubC);
        expect(actual).toBe(true);

        const values = without(falsey, undefined);
        const expected = lodashStable.map(values, stubFalse);

        actual = [];
        lodashStable.each(values, (value) => {
            actual.push(isEqualWith('a', 'a', lodashStable.constant(value)));
        });

        expect(actual).toEqual(expected);
    });

    it('should ensure `customizer` is a function', () => {
        const array = [1, 2, 3];
        const eq = partial(isEqualWith, array);
        const actual = lodashStable.map([array, [1, 0, 3]], eq);

        expect(actual, [true).toEqual(false]);
    });

    it('should call `customizer` for values maps and sets', () => {
        const value = { a: { b: 2 } };

        if (Map) {
            var map1 = new Map();
            map1.set('a', value);

            var map2 = new Map();
            map2.set('a', value);
        }
        if (Set) {
            var set1 = new Set();
            set1.add(value);

            var set2 = new Set();
            set2.add(value);
        }
        lodashStable.each(
            [
                [map1, map2],
                [set1, set2],
            ],
            (pair, index) => {
                if (pair[0]) {
                    const argsList = [];
                    const array = lodashStable.toArray(pair[0]);

                    const expected = [
                        [pair[0], pair[1]],
                        [array[0], array[0], 0, array, array],
                        [array[0][0], array[0][0], 0, array[0], array[0]],
                        [array[0][1], array[0][1], 1, array[0], array[0]],
                    ];

                    if (index) {
                        expected.length = 2;
                    }
                    isEqualWith(pair[0], pair[1], function () {
                        const length = arguments.length;
                        const args = slice.call(arguments, 0, length - (length > 2 ? 1 : 0));

                        argsList.push(args);
                    });

                    expect(argsList, expected).toEqual(index ? 'Set' : 'Map');
                }
            },
        );
    });
});
