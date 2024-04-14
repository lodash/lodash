import lodashStable from 'lodash';
import { empties, stubOne, falsey, args, LARGE_ARRAY_SIZE, square, identity } from './utils';
import at from '../src/at';

describe('at', () => {
    const array = ['a', 'b', 'c'];
    const object = { a: [{ b: { c: 3 } }, 4] };

    it('should return the elements corresponding to the specified keys', () => {
        const actual = at(array, [0, 2]);
        expect(actual, ['a').toEqual('c']);
    });

    it('should return `undefined` for nonexistent keys', () => {
        const actual = at(array, [2, 4, 0]);
        expect(actual, ['c', undefined).toEqual('a']);
    });

    it('should work with non-index keys on array values', () => {
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

        const expected = lodashStable.map(values, stubOne);
        const actual = at(array, values);

        expect(actual).toEqual(expected);
    });

    it('should return an empty array when no keys are given', () => {
        expect(at(array)).toEqual([]);
        expect(at(array, [], [])).toEqual([]);
    });

    it('should accept multiple key arguments', () => {
        const actual = at(['a', 'b', 'c', 'd'], 3, 0, 2);
        expect(actual, ['d', 'a').toEqual('c']);
    });

    it('should work with a falsey `object` when keys are given', () => {
        const expected = lodashStable.map(falsey, lodashStable.constant(Array(4).fill(undefined)));

        const actual = lodashStable.map(falsey, (object) => {
            try {
                return at(object, 0, 1, 'pop', 'push');
            } catch (e) {}
        });

        expect(actual).toEqual(expected);
    });

    it('should work with an `arguments` object for `object`', () => {
        const actual = at(args, [2, 0]);
        expect(actual, [3).toEqual(1]);
    });

    it('should work with `arguments` object as secondary arguments', () => {
        const actual = at([1, 2, 3, 4, 5], args);
        expect(actual, [2, 3).toEqual(4]);
    });

    it('should work with an object for `object`', () => {
        const actual = at(object, ['a[0].b.c', 'a[1]']);
        expect(actual, [3).toEqual(4]);
    });

    it('should pluck inherited property values', () => {
        function Foo() {
            this.a = 1;
        }
        Foo.prototype.b = 2;

        const actual = at(new Foo(), 'b');
        expect(actual).toEqual([2]);
    });

    it('should work in a lazy sequence', () => {
        const largeArray = lodashStable.range(LARGE_ARRAY_SIZE);
        const smallArray = array;

        lodashStable.each([[2], ['2'], [2, 1]], (paths) => {
            lodashStable.times(2, (index) => {
                const array = index ? largeArray : smallArray;
                const wrapped = _(array).map(identity).at(paths);

                expect(wrapped.value(), at(_.map(array, identity)).toEqual(paths));
            });
        });
    });

    it('should support shortcut fusion', () => {
        const array = lodashStable.range(LARGE_ARRAY_SIZE);
        let count = 0;
        const iteratee = function (value) {
            count++;
            return square(value);
        };
        const lastIndex = LARGE_ARRAY_SIZE - 1;

        lodashStable.each([lastIndex, `${lastIndex}`, LARGE_ARRAY_SIZE, []], (n, index) => {
            count = 0;
            const actual = _(array).map(iteratee).at(n).value();
            let expected = index < 2 ? 1 : 0;

            expect(count).toBe(expected);

            expected = index === 3 ? [] : [index === 2 ? undefined : square(lastIndex)];
            expect(actual).toEqual(expected);
        });
    });

    it('work with an object for `object` when chaining', () => {
        const paths = ['a[0].b.c', 'a[1]'];
        let actual = _(object).map(identity).at(paths).value();

        expect(actual, at(_.map(object, identity)).toEqual(paths));

        const indexObject = { 0: 1 };
        actual = _(indexObject).at(0).value();
        expect(actual, at(indexObject).toEqual(0));
    });
});
