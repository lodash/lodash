import lodashStable from 'lodash';
import { _, LARGE_ARRAY_SIZE, square, isEven } from './utils';

describe('find and findLast', () => {
    lodashStable.each(['find', 'findLast'], (methodName) => {
        const isFind = methodName === 'find';

        it(`\`_.${methodName}\` should support shortcut fusion`, () => {
            let findCount = 0;
            let mapCount = 0;
            const array = lodashStable.range(1, LARGE_ARRAY_SIZE + 1);

            const iteratee = function (value) {
                mapCount++;
                return square(value);
            };
            const predicate = function (value) {
                findCount++;
                return isEven(value);
            };
            const actual = _(array).map(iteratee)[methodName](predicate);

            expect(findCount).toBe(isFind ? 2 : 1);
            expect(mapCount).toBe(isFind ? 2 : 1);
            expect(actual).toBe(isFind ? 4 : square(LARGE_ARRAY_SIZE));
        });
    });
});
