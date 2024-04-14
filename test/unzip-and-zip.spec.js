import lodashStable from 'lodash';
import { _, falsey, stubArray } from './utils';

describe('unzip and zip', () => {
    lodashStable.each(['unzip', 'zip'], (methodName, index) => {
        let func = _[methodName];
        func = lodashStable.bind(index ? func.apply : func.call, func, null);

        const object = {
            'an empty array': [[], []],
            '0-tuples': [[[], []], []],
            '2-tuples': [
                [
                    ['barney', 'fred'],
                    [36, 40],
                ],
                [
                    ['barney', 36],
                    ['fred', 40],
                ],
            ],
            '3-tuples': [
                [
                    ['barney', 'fred'],
                    [36, 40],
                    [false, true],
                ],
                [
                    ['barney', 36, false],
                    ['fred', 40, true],
                ],
            ],
        };

        lodashStable.forOwn(object, (pair, key) => {
            it(`\`_.${methodName}\` should work with ${key}`, () => {
                const actual = func(pair[0]);
                expect(actual).toEqual(pair[1]);
                expect(func(actual)).toEqual(actual.length ? pair[0] : []);
            });
        });

        it(`\`_.${methodName}\` should work with tuples of different lengths`, () => {
            const pair = [
                [
                    ['barney', 36],
                    ['fred', 40, false],
                ],
                [
                    ['barney', 'fred'],
                    [36, 40],
                    [undefined, false],
                ],
            ];

            let actual = func(pair[0]);
            expect('0' in actual[2]).toBeTruthy();
            expect(actual).toEqual(pair[1]);

            actual = func(actual);
            expect('2' in actual[0]).toBeTruthy();
            expect(actual).toEqual([
                ['barney', 36, undefined],
                ['fred', 40, false],
            ]);
        });

        it(`\`_.${methodName}\` should treat falsey values as empty arrays`, () => {
            const expected = lodashStable.map(falsey, stubArray);

            const actual = lodashStable.map(falsey, (value) => func([value, value, value]));

            expect(actual).toEqual(expected);
        });

        it(`\`_.${methodName}\` should ignore values that are not arrays or \`arguments\` objects`, () => {
            const array = [[1, 2], [3, 4], null, undefined, { 0: 1 }];
            expect(func(array)).toEqual([
                [1, 3],
                [2, 4],
            ]);
        });

        it(`\`_.${methodName}\` should support consuming its return value`, () => {
            const expected = [
                ['barney', 'fred'],
                [36, 40],
            ];
            expect(func(func(func(func(expected))))).toEqual(expected);
        });
    });
});
