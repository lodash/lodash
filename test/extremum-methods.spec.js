import lodashStable from 'lodash';
import { _ } from './utils';

describe('extremum methods', () => {
    lodashStable.each(['max', 'maxBy', 'min', 'minBy'], (methodName) => {
        const func = _[methodName];
        const isMax = /^max/.test(methodName);

        it(`\`_.${methodName}\` should work with Date objects`, () => {
            const curr = new Date();
            const past = new Date(0);

            expect(func([curr, past])).toBe(isMax ? curr : past);
        });

        it(`\`_.${methodName}\` should work with extremely large arrays`, () => {
            const array = lodashStable.range(0, 5e5);
            expect(func(array)).toBe(isMax ? 499999 : 0);
        });

        it(`\`_.${methodName}\` should work when chaining on an array with only one value`, () => {
            const actual = _([40])[methodName]();
            expect(actual).toBe(40);
        });
    });

    lodashStable.each(['maxBy', 'minBy'], (methodName) => {
        const array = [1, 2, 3];
        const func = _[methodName];
        const isMax = methodName === 'maxBy';

        it(`\`_.${methodName}\` should work with an \`iteratee\``, () => {
            const actual = func(array, (n) => -n);

            expect(actual).toBe(isMax ? 1 : 3);
        });

        it('should work with `_.property` shorthands', () => {
            const objects = [{ a: 2 }, { a: 3 }, { a: 1 }];
            let actual = func(objects, 'a');

            expect(actual).toEqual(objects[isMax ? 1 : 2]);

            const arrays = [[2], [3], [1]];
            actual = func(arrays, 0);

            expect(actual).toEqual(arrays[isMax ? 1 : 2]);
        });

        it(`\`_.${methodName}\` should work when \`iteratee\` returns +/-Infinity`, () => {
            const value = isMax ? -Infinity : Infinity;
            const object = { a: value };

            const actual = func([object, { a: value }], (object) => object.a);

            expect(actual).toBe(object);
        });
    });
});
