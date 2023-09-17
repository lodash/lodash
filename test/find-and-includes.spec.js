import lodashStable from 'lodash';
import { _, identity, args, falsey } from './utils';

describe('find and includes', () => {
    lodashStable.each(['includes', 'find'], (methodName) => {
        const func = _[methodName];
        const isIncludes = methodName === 'includes';
        const resolve = methodName === 'find' ? lodashStable.curry(lodashStable.eq) : identity;

        lodashStable.each(
            {
                'an `arguments` object': args,
                'an array': [1, 2, 3],
            },
            (collection, key) => {
                const values = lodashStable.toArray(collection);

                it(`\`_.${methodName}\` should work with ${key} and a positive \`fromIndex\``, () => {
                    const expected = [isIncludes || values[2], isIncludes ? false : undefined];

                    const actual = [
                        func(collection, resolve(values[2]), 2),
                        func(collection, resolve(values[1]), 2),
                    ];

                    expect(actual).toEqual(expected);
                });

                it(`\`_.${methodName}\` should work with ${key} and a \`fromIndex\` >= \`length\``, () => {
                    const indexes = [4, 6, 2 ** 32, Infinity];

                    const expected = lodashStable.map(indexes, () => {
                        const result = isIncludes ? false : undefined;
                        return [result, result, result];
                    });

                    const actual = lodashStable.map(indexes, (fromIndex) => [
                        func(collection, resolve(1), fromIndex),
                        func(collection, resolve(undefined), fromIndex),
                        func(collection, resolve(''), fromIndex),
                    ]);

                    expect(actual).toEqual(expected);
                });

                it(`\`_.${methodName}\` should work with ${key} and treat falsey \`fromIndex\` values as \`0\``, () => {
                    const expected = lodashStable.map(
                        falsey,
                        lodashStable.constant(isIncludes || values[0]),
                    );

                    const actual = lodashStable.map(falsey, (fromIndex) =>
                        func(collection, resolve(values[0]), fromIndex),
                    );

                    expect(actual).toEqual(expected);
                });

                it(`\`_.${methodName}\` should work with ${key} and coerce \`fromIndex\` to an integer`, () => {
                    const expected = [
                        isIncludes || values[0],
                        isIncludes || values[0],
                        isIncludes ? false : undefined,
                    ];

                    const actual = [
                        func(collection, resolve(values[0]), 0.1),
                        func(collection, resolve(values[0]), NaN),
                        func(collection, resolve(values[0]), '1'),
                    ];

                    expect(actual).toEqual(expected);
                });

                it(`\`_.${methodName}\` should work with ${key} and a negative \`fromIndex\``, () => {
                    const expected = [isIncludes || values[2], isIncludes ? false : undefined];

                    const actual = [
                        func(collection, resolve(values[2]), -1),
                        func(collection, resolve(values[1]), -1),
                    ];

                    expect(actual).toEqual(expected);
                });

                it(`\`_.${methodName}\` should work with ${key} and a negative \`fromIndex\` <= \`-length\``, () => {
                    const indexes = [-4, -6, -Infinity];
                    const expected = lodashStable.map(
                        indexes,
                        lodashStable.constant(isIncludes || values[0]),
                    );

                    const actual = lodashStable.map(indexes, (fromIndex) =>
                        func(collection, resolve(values[0]), fromIndex),
                    );

                    expect(actual).toEqual(expected);
                });
            },
        );
    });
});
