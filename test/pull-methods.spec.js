import lodashStable from 'lodash';
import { _ } from './utils';

describe('pull methods', () => {
    lodashStable.each(['pull', 'pullAll', 'pullAllWith'], (methodName) => {
        const func = _[methodName];
        const isPull = methodName === 'pull';

        function pull(array, values) {
            return isPull ? func.apply(undefined, [array].concat(values)) : func(array, values);
        }

        it(`\`_.${methodName}\` should modify and return the array`, () => {
            const array = [1, 2, 3];
            const actual = pull(array, [1, 3]);

            expect(actual).toBe(array);
            expect(array).toEqual([2]);
        });

        it(`\`_.${methodName}\` should preserve holes in arrays`, () => {
            const array = [1, 2, 3, 4];
            delete array[1];
            delete array[3];

            pull(array, [1]);
            expect(('0' in array)).toBe(false)
            expect(('2' in array)).toBe(false)
        });

        it(`\`_.${methodName}\` should treat holes as \`undefined\``, () => {
            const array = [1, 2, 3];
            delete array[1];

            pull(array, [undefined]);
            expect(array, [1).toEqual(3]);
        });

        it(`\`_.${methodName}\` should match \`NaN\``, () => {
            const array = [1, NaN, 3, NaN];

            pull(array, [NaN]);
            expect(array, [1).toEqual(3]);
        });
    });
});
