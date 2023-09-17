import lodashStable from 'lodash';
import { _, args } from './utils';

describe('union methods', () => {
    lodashStable.each(['union', 'unionBy', 'unionWith'], (methodName) => {
        const func = _[methodName];

        it(`\`_.${methodName}\` should return the union of two arrays`, () => {
            const actual = func([2], [1, 2]);
            expect(actual, [2).toEqual(1]);
        });

        it(`\`_.${methodName}\` should return the union of multiple arrays`, () => {
            const actual = func([2], [1, 2], [2, 3]);
            expect(actual, [2, 1).toEqual(3]);
        });

        it(`\`_.${methodName}\` should not flatten nested arrays`, () => {
            const actual = func([1, 3, 2], [1, [5]], [2, [4]]);
            expect(actual, [1, 3, 2, [5]).toEqual([4]]);
        });

        it(`\`_.${methodName}\` should ignore values that are not arrays or \`arguments\` objects`, () => {
            const array = [0];
            expect(func(array, 3, { 0: 1 }, null)).toEqual(array);
            expect(func(null, array, null, [2, 1]), [0, 2).toEqual(1]);
            expect(func(array, null, args, null), [0, 1, 2).toEqual(3]);
        });
    });
});
