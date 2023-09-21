import lodashStable from 'lodash';
import { _ } from './utils';

describe('toPairs methods', () => {
    lodashStable.each(['toPairs', 'toPairsIn'], (methodName) => {
        const func = _[methodName];
        const isToPairs = methodName === 'toPairs';

        it(`\`_.${methodName}\` should create an array of string keyed-value pairs`, () => {
            const object = { a: 1, b: 2 };
            const actual = lodashStable.sortBy(func(object), 0);

            expect(actual).toEqual([
                ['a', 1],
                ['b', 2],
            ]);
        });

        it(`\`_.${methodName}\` should ${
            isToPairs ? 'not ' : ''
        }include inherited string keyed property values`, () => {
            function Foo() {
                this.a = 1;
            }
            Foo.prototype.b = 2;

            const expected = isToPairs
                ? [['a', 1]]
                : [
                      ['a', 1],
                      ['b', 2],
                  ];
            const actual = lodashStable.sortBy(func(new Foo()), 0);

            expect(actual).toEqual(expected);
        });

        it(`\`_.${methodName}\` should convert objects with a \`length\` property`, () => {
            const object = { 0: 'a', 1: 'b', length: 2 };
            const actual = lodashStable.sortBy(func(object), 0);

            expect(actual).toEqual([
                ['0', 'a'],
                ['1', 'b'],
                ['length', 2],
            ]);
        });

        it(`\`_.${methodName}\` should convert maps`, () => {
            if (Map) {
                const map = new Map();
                map.set('a', 1);
                map.set('b', 2);
                expect(func(map)).toEqual([
                    ['a', 1],
                    ['b', 2],
                ]);
            }
        });

        it(`\`_.${methodName}\` should convert sets`, () => {
            if (Set) {
                const set = new Set();
                set.add(1);
                set.add(2);
                expect(func(set)).toEqual([
                    [1, 1],
                    [2, 2],
                ]);
            }
        });

        it(`\`_.${methodName}\` should convert strings`, () => {
            lodashStable.each(['xo', Object('xo')], (string) => {
                const actual = lodashStable.sortBy(func(string), 0);
                expect(actual).toEqual([
                    ['0', 'x'],
                    ['1', 'o'],
                ]);
            });
        });
    });
});
