import lodashStable from 'lodash';

import {
    _,
    identity,
    whitespace,
    MAX_SAFE_INTEGER,
    MAX_INTEGER,
    MAX_ARRAY_LENGTH,
    symbol,
    falsey,
} from './utils';

describe('number coercion methods', () => {
    lodashStable.each(['toFinite', 'toInteger', 'toNumber', 'toSafeInteger'], (methodName) => {
        const func = _[methodName];

        it(`\`_.${methodName}\` should preserve the sign of \`0\``, () => {
            const values = [0, '0', -0, '-0'];
            const expected = [
                [0, Infinity],
                [0, Infinity],
                [-0, -Infinity],
                [-0, -Infinity],
            ];

            lodashStable.times(2, (index) => {
                const others = lodashStable.map(values, index ? Object : identity);

                const actual = lodashStable.map(others, (value) => {
                    const result = func(value);
                    return [result, 1 / result];
                });

                expect(actual).toEqual(expected);
            });
        });
    });

    lodashStable.each(
        ['toFinite', 'toInteger', 'toLength', 'toNumber', 'toSafeInteger'],
        (methodName) => {
            const func = _[methodName];
            const isToFinite = methodName === 'toFinite';
            const isToLength = methodName === 'toLength';
            const isToNumber = methodName === 'toNumber';
            const isToSafeInteger = methodName === 'toSafeInteger';

            function negative(string) {
                return `-${string}`;
            }

            function pad(string) {
                return whitespace + string + whitespace;
            }

            function positive(string) {
                return `+${string}`;
            }

            it(`\`_.${methodName}\` should pass thru primitive number values`, () => {
                const values = [0, 1, NaN];

                const expected = lodashStable.map(values, (value) =>
                    !isToNumber && value !== value ? 0 : value,
                );

                const actual = lodashStable.map(values, func);

                expect(actual).toEqual(expected);
            });

            it(`\`_.${methodName}\` should convert number primitives and objects to numbers`, () => {
                const values = [2, 1.2, MAX_SAFE_INTEGER, MAX_INTEGER, Infinity, NaN];

                const expected = lodashStable.map(values, (value) => {
                    if (!isToNumber) {
                        if (!isToFinite && value === 1.2) {
                            value = 1;
                        } else if (value === Infinity) {
                            value = MAX_INTEGER;
                        } else if (value !== value) {
                            value = 0;
                        }
                        if (isToLength || isToSafeInteger) {
                            value = Math.min(
                                value,
                                isToLength ? MAX_ARRAY_LENGTH : MAX_SAFE_INTEGER,
                            );
                        }
                    }
                    const neg = isToLength ? 0 : -value;
                    return [value, value, neg, neg];
                });

                const actual = lodashStable.map(values, (value) => [
                    func(value),
                    func(Object(value)),
                    func(-value),
                    func(Object(-value)),
                ]);

                expect(actual).toEqual(expected);
            });

            it(`\`_.${methodName}\` should convert string primitives and objects to numbers`, () => {
                const transforms = [identity, pad, positive, negative];

                const values = [
                    '10',
                    '1.234567890',
                    `${MAX_SAFE_INTEGER}`,
                    '1e+308',
                    '1e308',
                    '1E+308',
                    '1E308',
                    '5e-324',
                    '5E-324',
                    'Infinity',
                    'NaN',
                ];

                const expected = lodashStable.map(values, (value) => {
                    let n = +value;
                    if (!isToNumber) {
                        if (!isToFinite && n === 1.23456789) {
                            n = 1;
                        } else if (n === Infinity) {
                            n = MAX_INTEGER;
                        } else if ((!isToFinite && n === Number.MIN_VALUE) || n !== n) {
                            n = 0;
                        }
                        if (isToLength || isToSafeInteger) {
                            n = Math.min(n, isToLength ? MAX_ARRAY_LENGTH : MAX_SAFE_INTEGER);
                        }
                    }
                    const neg = isToLength ? 0 : -n;
                    return [n, n, n, n, n, n, neg, neg];
                });

                const actual = lodashStable.map(values, (value) =>
                    lodashStable.flatMap(transforms, (mod) => [
                        func(mod(value)),
                        func(Object(mod(value))),
                    ]),
                );

                expect(actual).toEqual(expected);
            });

            it(`\`_.${methodName}\` should convert binary/octal strings to numbers`, () => {
                const numbers = [42, 5349, 1715004];
                const transforms = [identity, pad];
                const values = ['0b101010', '0o12345', '0x1a2b3c'];

                const expected = lodashStable.map(numbers, (n) =>
                    lodashStable.times(8, lodashStable.constant(n)),
                );

                const actual = lodashStable.map(values, (value) => {
                    const upper = value.toUpperCase();
                    return lodashStable.flatMap(transforms, (mod) => [
                        func(mod(value)),
                        func(Object(mod(value))),
                        func(mod(upper)),
                        func(Object(mod(upper))),
                    ]);
                });

                expect(actual).toEqual(expected);
            });

            it(`\`_.${methodName}\` should convert invalid binary/octal strings to \`${
                isToNumber ? 'NaN' : '0'
            }\``, () => {
                const transforms = [identity, pad, positive, negative];
                const values = ['0b', '0o', '0x', '0b1010102', '0o123458', '0x1a2b3x'];

                const expected = lodashStable.map(values, (n) =>
                    lodashStable.times(8, lodashStable.constant(isToNumber ? NaN : 0)),
                );

                const actual = lodashStable.map(values, (value) =>
                    lodashStable.flatMap(transforms, (mod) => [
                        func(mod(value)),
                        func(Object(mod(value))),
                    ]),
                );

                expect(actual).toEqual(expected);
            });

            it(`\`_.${methodName}\` should convert symbols to \`${
                isToNumber ? 'NaN' : '0'
            }\``, () => {
                if (Symbol) {
                    const object1 = Object(symbol);
                    const object2 = Object(symbol);
                    const values = [symbol, object1, object2];
                    const expected = lodashStable.map(
                        values,
                        lodashStable.constant(isToNumber ? NaN : 0),
                    );

                    object2.valueOf = undefined;
                    const actual = lodashStable.map(values, func);

                    expect(actual).toEqual(expected);
                }
            });

            it(`\`_.${methodName}\` should convert empty values to \`0\` or \`NaN\``, () => {
                const values = falsey.concat(whitespace);

                const expected = lodashStable.map(values, (value) =>
                    isToNumber && value !== whitespace ? Number(value) : 0,
                );

                const actual = lodashStable.map(values, (value, index) =>
                    index ? func(value) : func(),
                );

                expect(actual).toEqual(expected);
            });

            it(`\`_.${methodName}\` should coerce objects to numbers`, () => {
                const values = [
                    {},
                    [],
                    [1],
                    [1, 2],
                    { valueOf: '1.1' },
                    { valueOf: '1.1', toString: lodashStable.constant('2.2') },
                    { valueOf: lodashStable.constant('1.1'), toString: '2.2' },
                    {
                        valueOf: lodashStable.constant('1.1'),
                        toString: lodashStable.constant('2.2'),
                    },
                    { valueOf: lodashStable.constant('-0x1a2b3c') },
                    { toString: lodashStable.constant('-0x1a2b3c') },
                    { valueOf: lodashStable.constant('0o12345') },
                    { toString: lodashStable.constant('0o12345') },
                    { valueOf: lodashStable.constant('0b101010') },
                    { toString: lodashStable.constant('0b101010') },
                ];

                let expected = [NaN, 0, 1, NaN, NaN, 2.2, 1.1, 1.1, NaN, NaN, 5349, 5349, 42, 42];

                if (isToFinite) {
                    expected = [0, 0, 1, 0, 0, 2.2, 1.1, 1.1, 0, 0, 5349, 5349, 42, 42];
                } else if (!isToNumber) {
                    expected = [0, 0, 1, 0, 0, 2, 1, 1, 0, 0, 5349, 5349, 42, 42];
                }
                const actual = lodashStable.map(values, func);

                expect(actual).toEqual(expected);
            });
        },
    );
});
