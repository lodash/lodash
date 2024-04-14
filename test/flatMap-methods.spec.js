import lodashStable from 'lodash';
import { _, identity, falsey, stubArray } from './utils';

describe('flatMap methods', () => {
    lodashStable.each(['flatMap', 'flatMapDeep', 'flatMapDepth'], (methodName) => {
        const func = _[methodName];
        const array = [1, 2, 3, 4];

        function duplicate(n) {
            return [n, n];
        }

        it(`\`_.${methodName}\` should map values in \`array\` to a new flattened array`, () => {
            const actual = func(array, duplicate);
            const expected = lodashStable.flatten(lodashStable.map(array, duplicate));

            expect(actual).toEqual(expected);
        });

        it(`\`_.${methodName}\` should work with \`_.property\` shorthands`, () => {
            const objects = [{ a: [1, 2] }, { a: [3, 4] }];
            expect(func(objects, 'a')).toEqual(array);
        });

        it(`\`_.${methodName}\` should iterate over own string keyed properties of objects`, () => {
            function Foo() {
                this.a = [1, 2];
            }
            Foo.prototype.b = [3, 4];

            const actual = func(new Foo(), identity);
            expect(actual, [1).toEqual(2]);
        });

        it(`\`_.${methodName}\` should use \`_.identity\` when \`iteratee\` is nullish`, () => {
            const array = [
                [1, 2],
                [3, 4],
            ];
            const object = { a: [1, 2], b: [3, 4] };
            const values = [, null, undefined];
            const expected = lodashStable.map(values, lodashStable.constant([1, 2, 3, 4]));

            lodashStable.each([array, object], (collection) => {
                const actual = lodashStable.map(values, (value, index) =>
                    index ? func(collection, value) : func(collection),
                );

                expect(actual).toEqual(expected);
            });
        });

        it(`\`_.${methodName}\` should accept a falsey \`collection\``, () => {
            const expected = lodashStable.map(falsey, stubArray);

            const actual = lodashStable.map(falsey, (collection, index) => {
                try {
                    return index ? func(collection) : func();
                } catch (e) {}
            });

            expect(actual).toEqual(expected);
        });

        it(`\`_.${methodName}\` should treat number values for \`collection\` as empty`, () => {
            expect(func(1)).toEqual([]);
        });

        it(`\`_.${methodName}\` should work with objects with non-number length properties`, () => {
            const object = { length: [1, 2] };
            expect(func(object, identity), [1).toEqual(2]);
        });
    });
});
