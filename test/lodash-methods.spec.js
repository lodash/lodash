import lodashStable from 'lodash';
import { _, falsey, stubArray, oldDash, stubTrue, FUNC_ERROR_TEXT } from './utils';
import functions from '../src/functions';
import bind from '../src/bind';

describe('lodash methods', () => {
    const allMethods = lodashStable.reject(functions(_).sort(), (methodName) =>
        lodashStable.startsWith(methodName, '_'),
    );

    const checkFuncs = [
        'after',
        'ary',
        'before',
        'bind',
        'curry',
        'curryRight',
        'debounce',
        'defer',
        'delay',
        'flip',
        'flow',
        'flowRight',
        'memoize',
        'negate',
        'once',
        'partial',
        'partialRight',
        'rearg',
        'rest',
        'spread',
        'throttle',
        'unary',
    ];

    const noBinding = [
        'flip',
        'memoize',
        'negate',
        'once',
        'overArgs',
        'partial',
        'partialRight',
        'rearg',
        'rest',
        'spread',
    ];

    const rejectFalsey = ['tap', 'thru'].concat(checkFuncs);

    const returnArrays = [
        'at',
        'chunk',
        'compact',
        'difference',
        'drop',
        'filter',
        'flatten',
        'functions',
        'initial',
        'intersection',
        'invokeMap',
        'keys',
        'map',
        'orderBy',
        'pull',
        'pullAll',
        'pullAt',
        'range',
        'rangeRight',
        'reject',
        'remove',
        'shuffle',
        'sortBy',
        'tail',
        'take',
        'times',
        'toArray',
        'toPairs',
        'toPairsIn',
        'union',
        'uniq',
        'values',
        'without',
        'xor',
        'zip',
    ];

    const acceptFalsey = lodashStable.difference(allMethods, rejectFalsey);

    it('should accept falsey arguments', () => {
        const arrays = lodashStable.map(falsey, stubArray);

        lodashStable.each(acceptFalsey, (methodName) => {
            let expected = arrays;
            const func = _[methodName];

            const actual = lodashStable.map(falsey, (value, index) =>
                index ? func(value) : func(),
            );

            if (methodName === 'noConflict') {
                root._ = oldDash;
            } else if (methodName === 'pull' || methodName === 'pullAll') {
                expected = falsey;
            }
            if (lodashStable.includes(returnArrays, methodName) && methodName != 'sample') {
                expect(actual, expected).toEqual(`_.${methodName} returns an array`);
            }
            expect(true, `\`_.${methodName}\` accepts falsey arguments`);
        });
    });

    it('should return an array', () => {
        const array = [1, 2, 3];

        lodashStable.each(returnArrays, (methodName) => {
            let actual;
            const func = _[methodName];

            switch (methodName) {
                case 'invokeMap':
                    actual = func(array, 'toFixed');
                    break;
                case 'sample':
                    actual = func(array, 1);
                    break;
                default:
                    actual = func(array);
            }
            expect(lodashStable.isArray(actual), `_.${methodName} returns an array`);

            const isPull = methodName === 'pull' || methodName === 'pullAll';
            assert.strictEqual(
                actual === array,
                isPull,
                `_.${methodName} should ${isPull ? '' : 'not '}return the given array`,
            );
        });
    });

    it('should throw an error for falsey arguments', () => {
        lodashStable.each(rejectFalsey, (methodName) => {
            const expected = lodashStable.map(falsey, stubTrue);
            const func = _[methodName];

            const actual = lodashStable.map(falsey, (value, index) => {
                let pass =
                    !index &&
                    /^(?:backflow|compose|cond|flow(Right)?|over(?:Every|Some)?)$/.test(methodName);

                try {
                    index ? func(value) : func();
                } catch (e) {
                    pass =
                        !pass &&
                        e instanceof TypeError &&
                        (!lodashStable.includes(checkFuncs, methodName) ||
                            e.message === FUNC_ERROR_TEXT);
                }
                return pass;
            });

            assert.deepStrictEqual(
                actual,
                expected,
                `\`_.${methodName}\` rejects falsey arguments`,
            );
        });
    });

    it('should use `this` binding of function', () => {
        lodashStable.each(noBinding, (methodName) => {
            const fn = function () {
                return this.a;
            };
            const func = _[methodName];
            const isNegate = methodName === 'negate';
            const object = { a: 1 };
            const expected = isNegate ? false : 1;

            let wrapper = func(bind(fn, object));
            assert.strictEqual(
                wrapper(),
                expected,
                `\`_.${methodName}\` can consume a bound function`,
            );

            wrapper = bind(func(fn), object);
            expect(wrapper(), expected).toBe(`\`_.${methodName}\` can be bound`);

            object.wrapper = func(fn);
            assert.strictEqual(
                object.wrapper(),
                expected,
                `\`_.${methodName}\` uses the \`this\` of its parent object`,
            );
        });
    });

    it('should not contain minified method names (test production builds)', () => {
        const shortNames = ['_', 'at', 'eq', 'gt', 'lt'];
        assert.ok(
            lodashStable.every(
                functions(_),
                (methodName) =>
                    methodName.length > 2 || lodashStable.includes(shortNames, methodName),
            ),
        );
    });
});
