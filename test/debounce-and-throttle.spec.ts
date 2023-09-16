import assert from 'node:assert';
import lodashStable from 'lodash';
import { _, noop, push, isModularize } from './utils';
import runInContext from '../src/runInContext';

describe('debounce and throttle', () => {
    lodashStable.each(['debounce', 'throttle'], (methodName) => {
        const func = _[methodName],
            isDebounce = methodName === 'debounce';

        it(`\`_.${methodName}\` should not error for non-object \`options\` values`, () => {
            func(noop, 32, 1);
            assert.ok(true);
        });

        it(`\`_.${methodName}\` should use a default \`wait\` of \`0\``, (done) => {
            let callCount = 0,
                funced = func(() => {
                    callCount++;
                });

            funced();

            setTimeout(() => {
                funced();
                assert.strictEqual(callCount, isDebounce ? 1 : 2);
                done();
            }, 32);
        });

        it(`\`_.${methodName}\` should invoke \`func\` with the correct \`this\` binding`, (done) => {
            const actual = [],
                object = {
                    funced: func(function () {
                        actual.push(this);
                    }, 32),
                },
                expected = lodashStable.times(isDebounce ? 1 : 2, lodashStable.constant(object));

            object.funced();
            if (!isDebounce) {
                object.funced();
            }
            setTimeout(() => {
                assert.deepStrictEqual(actual, expected);
                done();
            }, 64);
        });

        it(`\`_.${methodName}\` supports recursive calls`, (done) => {
            const actual = [],
                args = lodashStable.map(['a', 'b', 'c'], (chr) => [{}, chr]),
                expected = args.slice(),
                queue = args.slice();

            var funced = func(function () {
                const current = [this];
                push.apply(current, arguments);
                actual.push(current);

                const next = queue.shift();
                if (next) {
                    funced.call(next[0], next[1]);
                }
            }, 32);

            const next = queue.shift();
            funced.call(next[0], next[1]);
            assert.deepStrictEqual(actual, expected.slice(0, isDebounce ? 0 : 1));

            setTimeout(() => {
                assert.deepStrictEqual(actual, expected.slice(0, actual.length));
                done();
            }, 256);
        });

        it(`\`_.${methodName}\` should work if the system time is set backwards`, (done) => {
            if (!isModularize) {
                let callCount = 0,
                    dateCount = 0;

                const lodash = runInContext({
                    Date: {
                        now: function () {
                            return ++dateCount === 4
                                ? +new Date(2012, 3, 23, 23, 27, 18)
                                : +new Date();
                        },
                    },
                });

                const funced = lodash[methodName](() => {
                    callCount++;
                }, 32);

                funced();

                setTimeout(() => {
                    funced();
                    assert.strictEqual(callCount, isDebounce ? 1 : 2);
                    done();
                }, 64);
            } else {
                done();
            }
        });

        it(`\`_.${methodName}\` should support cancelling delayed calls`, (done) => {
            let callCount = 0;

            const funced = func(
                () => {
                    callCount++;
                },
                32,
                { leading: false },
            );

            funced();
            funced.cancel();

            setTimeout(() => {
                assert.strictEqual(callCount, 0);
                done();
            }, 64);
        });

        it(`\`_.${methodName}\` should reset \`lastCalled\` after cancelling`, (done) => {
            let callCount = 0;

            const funced = func(() => ++callCount, 32, { leading: true });

            assert.strictEqual(funced(), 1);
            funced.cancel();

            assert.strictEqual(funced(), 2);
            funced();

            setTimeout(() => {
                assert.strictEqual(callCount, 3);
                done();
            }, 64);
        });

        it(`\`_.${methodName}\` should support flushing delayed calls`, (done) => {
            let callCount = 0;

            const funced = func(() => ++callCount, 32, { leading: false });

            funced();
            assert.strictEqual(funced.flush(), 1);

            setTimeout(() => {
                assert.strictEqual(callCount, 1);
                done();
            }, 64);
        });

        it(`\`_.${methodName}\` should noop \`cancel\` and \`flush\` when nothing is queued`, (done) => {
            let callCount = 0,
                funced = func(() => {
                    callCount++;
                }, 32);

            funced.cancel();
            assert.strictEqual(funced.flush(), undefined);

            setTimeout(() => {
                assert.strictEqual(callCount, 0);
                done();
            }, 64);
        });
    });
});
