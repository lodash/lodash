import lodashStable from 'lodash';
import { _, args, document, body } from './utils';

describe('slice and toArray', () => {
    lodashStable.each(['slice', 'toArray'], (methodName) => {
        const array = [1, 2, 3];
        const func = _[methodName];

        it(`\`_.${methodName}\` should return a dense array`, () => {
            const sparse = Array(3);
            sparse[1] = 2;

            const actual = func(sparse);

            expect('0' in actual);
            expect('2' in actual);
            expect(actual).toEqual(sparse);
        });

        it(`\`_.${methodName}\` should treat array-like objects like arrays`, () => {
            const object = { 0: 'a', length: 1 };
            expect(func(object)).toEqual(['a']);
            expect(func(args)).toEqual(array);
        });

        it(`\`_.${methodName}\` should return a shallow clone of arrays`, () => {
            const actual = func(array);
            expect(actual).toEqual(array);
            expect(actual).not.toBe(array);
        });

        it(`\`_.${methodName}\` should work with a node list for \`collection\``, () => {
            if (document) {
                try {
                    var actual = func(document.getElementsByTagName('body'));
                } catch (e) {}

                expect(actual).toEqual([body]);
            }
        });
    });
});
