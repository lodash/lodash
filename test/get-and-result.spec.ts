import assert from 'node:assert';
import lodashStable from 'lodash';
import { _, symbol, noop, numberProto, empties } from './utils';

describe('get and result', () => {
    lodashStable.each(['get', 'result'], (methodName) => {
        const func = _[methodName];

        it(`\`_.${methodName}\` should get string keyed property values`, () => {
            const object = { a: 1 };

            lodashStable.each(['a', ['a']], (path) => {
                assert.strictEqual(func(object, path), 1);
            });
        });

        it(`\`_.${methodName}\` should preserve the sign of \`0\``, () => {
            const object = { '-0': 'a', '0': 'b' },
                props = [-0, Object(-0), 0, Object(0)];

            const actual = lodashStable.map(props, (key) => func(object, key));

            assert.deepStrictEqual(actual, ['a', 'a', 'b', 'b']);
        });

        it(`\`_.${methodName}\` should get symbol keyed property values`, () => {
            if (Symbol) {
                const object = {};
                object[symbol] = 1;

                assert.strictEqual(func(object, symbol), 1);
            }
        });

        it(`\`_.${methodName}\` should get deep property values`, () => {
            const object = { a: { b: 2 } };

            lodashStable.each(['a.b', ['a', 'b']], (path) => {
                assert.strictEqual(func(object, path), 2);
            });
        });

        it(`\`_.${methodName}\` should get a key over a path`, () => {
            const object = { 'a.b': 1, a: { b: 2 } };

            lodashStable.each(['a.b', ['a.b']], (path) => {
                assert.strictEqual(func(object, path), 1);
            });
        });

        it(`\`_.${methodName}\` should not coerce array paths to strings`, () => {
            const object = { 'a,b,c': 3, a: { b: { c: 4 } } };
            assert.strictEqual(func(object, ['a', 'b', 'c']), 4);
        });

        it(`\`_.${methodName}\` should not ignore empty brackets`, () => {
            const object = { a: { '': 1 } };
            assert.strictEqual(func(object, 'a[]'), 1);
        });

        it(`\`_.${methodName}\` should handle empty paths`, () => {
            lodashStable.each(
                [
                    ['', ''],
                    [[], ['']],
                ],
                (pair) => {
                    assert.strictEqual(func({}, pair[0]), undefined);
                    assert.strictEqual(func({ '': 3 }, pair[1]), 3);
                },
            );
        });

        it(`\`_.${methodName}\` should handle complex paths`, () => {
            const object = {
                a: { '-1.23': { '["b"]': { c: { "['d']": { '\ne\n': { f: { g: 8 } } } } } } },
            };

            const paths = [
                'a[-1.23]["[\\"b\\"]"].c[\'[\\\'d\\\']\'][\ne\n][f].g',
                ['a', '-1.23', '["b"]', 'c', "['d']", '\ne\n', 'f', 'g'],
            ];

            lodashStable.each(paths, (path) => {
                assert.strictEqual(func(object, path), 8);
            });
        });

        it(`\`_.${methodName}\` should return \`undefined\` when \`object\` is nullish`, () => {
            lodashStable.each(['constructor', ['constructor']], (path) => {
                assert.strictEqual(func(null, path), undefined);
                assert.strictEqual(func(undefined, path), undefined);
            });
        });

        it(`\`_.${methodName}\` should return \`undefined\` for deep paths when \`object\` is nullish`, () => {
            const values = [null, undefined],
                expected = lodashStable.map(values, noop),
                paths = ['constructor.prototype.valueOf', ['constructor', 'prototype', 'valueOf']];

            lodashStable.each(paths, (path) => {
                const actual = lodashStable.map(values, (value) => func(value, path));

                assert.deepStrictEqual(actual, expected);
            });
        });

        it(`\`_.${methodName}\` should return \`undefined\` if parts of \`path\` are missing`, () => {
            const object = { a: [, null] };

            lodashStable.each(['a[1].b.c', ['a', '1', 'b', 'c']], (path) => {
                assert.strictEqual(func(object, path), undefined);
            });
        });

        it(`\`_.${methodName}\` should be able to return \`null\` values`, () => {
            const object = { a: { b: null } };

            lodashStable.each(['a.b', ['a', 'b']], (path) => {
                assert.strictEqual(func(object, path), null);
            });
        });

        it(`\`_.${methodName}\` should follow \`path\` over non-plain objects`, () => {
            const paths = ['a.b', ['a', 'b']];

            lodashStable.each(paths, (path) => {
                numberProto.a = { b: 2 };
                assert.strictEqual(func(0, path), 2);
                delete numberProto.a;
            });
        });

        it(`\`_.${methodName}\` should return the default value for \`undefined\` values`, () => {
            const object = { a: {} },
                values = empties.concat(true, new Date(), 1, /x/, 'a'),
                expected = lodashStable.map(values, (value) => [value, value]);

            lodashStable.each(['a.b', ['a', 'b']], (path) => {
                const actual = lodashStable.map(values, (value) => [
                    func(object, path, value),
                    func(null, path, value),
                ]);

                assert.deepStrictEqual(actual, expected);
            });
        });

        it(`\`_.${methodName}\` should return the default value when \`path\` is empty`, () => {
            assert.strictEqual(func({}, [], 'a'), 'a');
        });
    });
});
