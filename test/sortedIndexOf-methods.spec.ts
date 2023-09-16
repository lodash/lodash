import assert from 'node:assert';
import lodashStable from 'lodash';
import { _ } from './utils';

describe('sortedIndexOf methods', () => {
    lodashStable.each(['sortedIndexOf', 'sortedLastIndexOf'], (methodName) => {
        const func = _[methodName],
            isSortedIndexOf = methodName == 'sortedIndexOf';

        it(`\`_.${methodName}\` should perform a binary search`, () => {
            const sorted = [4, 4, 5, 5, 6, 6];
            assert.deepStrictEqual(func(sorted, 5), isSortedIndexOf ? 2 : 3);
        });
    });
});
