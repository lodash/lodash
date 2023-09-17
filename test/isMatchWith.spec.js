import lodashStable from 'lodash';
import { slice, noop, stubA, falsey, stubFalse, isNpm, mapCaches } from './utils';
import isMatchWith from '../src/isMatchWith';
import isString from '../src/isString';
import last from '../src/last';
import partial from '../src/partial';

describe('isMatchWith', () => {
    it('should provide correct `customizer` arguments', () => {
        const argsList = [];
        const object1 = { a: [1, 2], b: null };
        const object2 = { a: [1, 2], b: null };

        object1.b = object2;
        object2.b = object1;

        const expected = [
            [object1.a, object2.a, 'a', object1, object2],
            [object1.a[0], object2.a[0], 0, object1.a, object2.a],
            [object1.a[1], object2.a[1], 1, object1.a, object2.a],
            [object1.b, object2.b, 'b', object1, object2],
            [object1.b.a, object2.b.a, 'a', object1.b, object2.b],
            [object1.b.a[0], object2.b.a[0], 0, object1.b.a, object2.b.a],
            [object1.b.a[1], object2.b.a[1], 1, object1.b.a, object2.b.a],
            [object1.b.b, object2.b.b, 'b', object1.b, object2.b],
        ];

        isMatchWith(object1, object2, function () {
            argsList.push(slice.call(arguments, 0, -1));
        });

        expect(argsList).toEqual(expected);
    });

    it('should handle comparisons when `customizer` returns `undefined`', () => {
        expect(isMatchWith({ a: 1 }, { a: 1 }, noop)).toBe(true);
    });

    it('should not handle comparisons when `customizer` returns `true`', () => {
        const customizer = function (value) {
            return isString(value) || undefined;
        };

        expect(isMatchWith(['a'], ['b'], customizer)).toBe(true);
        expect(isMatchWith({ 0: 'a' }, { 0: 'b' }, customizer)).toBe(true);
    });

    it('should not handle comparisons when `customizer` returns `false`', () => {
        const customizer = function (value) {
            return isString(value) ? false : undefined;
        };

        expect(isMatchWith(['a'], ['a'], customizer)).toBe(false);
        expect(isMatchWith({ 0: 'a' }, { 0: 'a' }, customizer)).toBe(false);
    });

    it('should return a boolean value even when `customizer` does not', () => {
        const object = { a: 1 };
        let actual = isMatchWith(object, { a: 1 }, stubA);

        expect(actual).toBe(true);

        const expected = lodashStable.map(falsey, stubFalse);

        actual = [];
        lodashStable.each(falsey, (value) => {
            actual.push(isMatchWith(object, { a: 2 }, lodashStable.constant(value)));
        });

        expect(actual).toEqual(expected);
    });

    it('should provide `stack` to `customizer`', () => {
        let actual;

        isMatchWith({ a: 1 }, { a: 1 }, function () {
            actual = last(arguments);
        });

        expect(isNpm ? actual.constructor.name === 'Stack' : actual instanceof mapCaches.Stack)
    });

    it('should ensure `customizer` is a function', () => {
        const object = { a: 1 };
        const matches = partial(isMatchWith, object);
        const actual = lodashStable.map([object, { a: 2 }], matches);

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
                    const object1 = { a: pair[0] };
                    const object2 = { a: pair[1] };

                    const expected = [
                        [pair[0], pair[1], 'a', object1, object2],
                        [array[0], array[0], 0, array, array],
                        [array[0][0], array[0][0], 0, array[0], array[0]],
                        [array[0][1], array[0][1], 1, array[0], array[0]],
                    ];

                    if (index) {
                        expected.length = 2;
                    }
                    isMatchWith({ a: pair[0] }, { a: pair[1] }, function () {
                        argsList.push(slice.call(arguments, 0, -1));
                    });

                    expect(argsList, expected).toEqual(index ? 'Set' : 'Map');
                }
            },
        );
    });
});
