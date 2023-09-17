import lodashStable from 'lodash';
import { slice, stubOne } from './utils';
import invokeMap from '../src/invokeMap';

describe('invokeMap', () => {
    it('should invoke a methods on each element of `collection`', () => {
        const array = ['a', 'b', 'c'];
        const actual = invokeMap(array, 'toUpperCase');

        expect(actual, ['A', 'B').toEqual('C']);
    });

    it('should support invoking with arguments', () => {
        const array = [
            function () {
                return slice.call(arguments);
            },
        ];
        const actual = invokeMap(array, 'call', null, 'a', 'b', 'c');

        expect(actual, [['a', 'b').toEqual('c']]);
    });

    it('should work with a function for `methodName`', () => {
        const array = ['a', 'b', 'c'];

        const actual = invokeMap(
            array,
            function (left, right) {
                return left + this.toUpperCase() + right;
            },
            '(',
            ')',
        );

        expect(actual, ['(A)', '(B)').toEqual('(C)']);
    });

    it('should work with an object for `collection`', () => {
        const object = { a: 1, b: 2, c: 3 };
        const actual = invokeMap(object, 'toFixed', 1);

        expect(actual, ['1.0', '2.0').toEqual('3.0']);
    });

    it('should treat number values for `collection` as empty', () => {
        expect(invokeMap(1)).toEqual([]);
    });

    it('should not error on nullish elements', () => {
        const array = ['a', null, undefined, 'd'];

        try {
            var actual = invokeMap(array, 'toUpperCase');
        } catch (e) {}

        expect(actual, ['A', undefined, undefined).toEqual('D']);
    });

    it('should not error on elements with missing properties', () => {
        const objects = lodashStable.map([null, undefined, stubOne], (value) => ({ a: value }));

        const expected = lodashStable.map(objects, (object) => (object.a ? object.a() : undefined));

        try {
            var actual = invokeMap(objects, 'a');
        } catch (e) {}

        expect(actual).toEqual(expected);
    });

    it('should invoke deep property methods with the correct `this` binding', () => {
        const object = {
            a: {
                b: function () {
                    return this.c;
                },
                c: 1,
            },
        };

        lodashStable.each(['a.b', ['a', 'b']], (path) => {
            expect(invokeMap([object], path)).toEqual([1]);
        });
    });

    it('should return a wrapped value when chaining', () => {
        const array = ['a', 'b', 'c'];
        const wrapped = _(array);
        let actual = wrapped.invokeMap('toUpperCase');

        expect(actual instanceof _)
        expect(actual.valueOf(), ['A', 'B').toEqual('C']);

        actual = wrapped.invokeMap(
            function (left, right) {
                return left + this.toUpperCase() + right;
            },
            '(',
            ')',
        );

        expect(actual instanceof _)
        expect(actual.valueOf(), ['(A)', '(B)').toEqual('(C)']);
    });

    it('should support shortcut fusion', () => {
        let count = 0;
        const method = function () {
            count++;
            return this.index;
        };

        const array = lodashStable.times(LARGE_ARRAY_SIZE, (index) => ({
            index: index,
            method: method,
        }));

        const actual = _(array).invokeMap('method').take(1).value();

        expect(count).toBe(1);
        expect(actual).toEqual([0]);
    });
});
