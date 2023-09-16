import assert from 'node:assert';
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
                assert.deepStrictEqual(actual, pair[1]);
                assert.deepStrictEqual(func(actual), actual.length ? pair[0] : []);
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
            assert.ok('0' in actual[2]);
            assert.deepStrictEqual(actual, pair[1]);

            actual = func(actual);
            assert.ok('2' in actual[0]);
            assert.deepStrictEqual(actual, [
                ['barney', 36, undefined],
                ['fred', 40, false],
            ]);
        });

        it(`\`_.${methodName}\` should treat falsey values as empty arrays`, () => {
            const expected = lodashStable.map(falsey, stubArray);

            const actual = lodashStable.map(falsey, (value) => func([value, value, value]));

            assert.deepStrictEqual(actual, expected);
        });

        it(`\`_.${methodName}\` should ignore values that are not arrays or \`arguments\` objects`, () => {
            const array = [[1, 2], [3, 4], null, undefined, { '0': 1 }];
            assert.deepStrictEqual(func(array), [
                [1, 3],
                [2, 4],
            ]);
        });

        it(`\`_.${methodName}\` should support consuming its return value`, () => {
            const expected = [
                ['barney', 'fred'],
                [36, 40],
            ];
            assert.deepStrictEqual(func(func(func(func(expected)))), expected);
        });
    });
});
