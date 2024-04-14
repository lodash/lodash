import lodashStable, { runInContext } from "lodash";
import { _, noop, push, isModularize } from './utils';

describe('debounce and throttle', () => {
    lodashStable.each(['debounce', 'throttle'], (methodName) => {
        const func = _[methodName];
        const isDebounce = methodName === 'debounce';

        it(`\`_.${methodName}\` should not error for non-object \`options\` values`, () => {
            func(noop, 32, 1);
            expect(true);
        });

        it(`\`_.${methodName}\` should use a default \`wait\` of \`0\``, (done) => {
            let callCount = 0;
            const funced = func(() => {
                callCount++;
            });

            funced();

            setTimeout(() => {
                funced();
                expect(callCount).toBe(isDebounce ? 1 : 2);
                done();
            }, 32);
        });

        it(`\`_.${methodName}\` should invoke \`func\` with the correct \`this\` binding`, (done) => {
            const actual = [];
            const object = {
                funced: func(function () {
                    actual.push(this);
                }, 32),
            };
            const expected = lodashStable.times(isDebounce ? 1 : 2, lodashStable.constant(object));

            object.funced();
            if (!isDebounce) {
                object.funced();
            }
            setTimeout(() => {
                expect(actual).toEqual(expected);
                done();
            }, 64);
        });

        it(`\`_.${methodName}\` supports recursive calls`, (done) => {
            const actual = [];
            const args = lodashStable.map(['a', 'b', 'c'], (chr) => [{}, chr]);
            const expected = args.slice();
            const queue = args.slice();

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
            expect(actual).toEqual(expected.slice(0, isDebounce ? 0 : 1));

            setTimeout(() => {
                expect(actual).toEqual(expected.slice(0, actual.length));
                done();
            }, 256);
        });

        it(`\`_.${methodName}\` should work if the system time is set backwards`, (done) => {
            if (!isModularize) {
                let callCount = 0;
                let dateCount = 0;

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
                    expect(callCount).toBe(isDebounce ? 1 : 2);
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
                expect(callCount).toBe(0);
                done();
            }, 64);
        });

        it(`\`_.${methodName}\` should reset \`lastCalled\` after cancelling`, (done) => {
            let callCount = 0;

            const funced = func(() => ++callCount, 32, { leading: true });

            expect(funced()).toBe(1);
            funced.cancel();

            expect(funced()).toBe(2);
            funced();

            setTimeout(() => {
                expect(callCount).toBe(3);
                done();
            }, 64);
        });

        it(`\`_.${methodName}\` should support flushing delayed calls`, (done) => {
            let callCount = 0;

            const funced = func(() => ++callCount, 32, { leading: false });

            funced();
            expect(funced.flush()).toBe(1);

            setTimeout(() => {
                expect(callCount).toBe(1);
                done();
            }, 64);
        });

        it(`\`_.${methodName}\` should noop \`cancel\` and \`flush\` when nothing is queued`, (done) => {
            let callCount = 0;
            const funced = func(() => {
                callCount++;
            }, 32);

            funced.cancel();
            expect(funced.flush()).toBe(undefined);

            setTimeout(() => {
                expect(callCount).toBe(0);
                done();
            }, 64);
        });
    });
});
