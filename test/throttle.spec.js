import lodashStable, { runInContext } from 'lodash';
import * as assert from 'assert';
import { identity, isModularize, argv, isPhantom } from './utils';
import throttle from '../src/throttle';

describe('throttle', () => {
    it('should throttle a function', (done) => {
        let callCount = 0;
        const throttled = throttle(() => {
            callCount++;
        }, 32);

        throttled();
        throttled();
        throttled();

        const lastCount = callCount;
        expect(callCount);

        setTimeout(() => {
            expect(callCount > lastCount);
            done();
        }, 64);
    });

    it('subsequent calls should return the result of the first call', (done) => {
        const throttled = throttle(identity, 32);
        const results = [throttled('a'), throttled('b')];

        expect(results).toEqual(['a', 'a']);

        setTimeout(() => {
            const results = [throttled('c'), throttled('d')];
            assert.notStrictEqual(results[0], 'a');
            assert.notStrictEqual(results[0], undefined);

            assert.notStrictEqual(results[1], 'd');
            assert.notStrictEqual(results[1], undefined);
            done();
        }, 64);
    });

    it('should clear timeout when `func` is called', (done) => {
        if (!isModularize) {
            let callCount = 0;
            let dateCount = 0;

            const lodash = runInContext({
                Date: {
                    now: function () {
                        return ++dateCount === 5 ? Infinity : +new Date();
                    },
                },
            });

            const throttled = lodash.throttle(() => {
                callCount++;
            }, 32);

            throttled();
            throttled();

            setTimeout(() => {
                expect(callCount).toBe(2);
                done();
            }, 64);
        } else {
            done();
        }
    });

    it('should not trigger a trailing call when invoked once', (done) => {
        let callCount = 0;
        const throttled = throttle(() => {
            callCount++;
        }, 32);

        throttled();
        expect(callCount).toBe(1);

        setTimeout(() => {
            expect(callCount).toBe(1);
            done();
        }, 64);
    });

    lodashStable.times(2, (index) => {
        it(`should trigger a call when invoked repeatedly${
            index ? ' and `leading` is `false`' : ''
        }`, (done) => {
            let callCount = 0;
            const limit = argv || isPhantom ? 1000 : 320;
            const options = index ? { leading: false } : {};
            const throttled = throttle(
                () => {
                    callCount++;
                },
                32,
                options,
            );

            const start = +new Date();
            while (new Date() - start < limit) {
                throttled();
            }
            const actual = callCount > 1;
            setTimeout(() => {
                expect(actual);
                done();
            }, 1);
        });
    });

    it('should trigger a second throttled call as soon as possible', (done) => {
        let callCount = 0;

        const throttled = throttle(
            () => {
                callCount++;
            },
            128,
            { leading: false },
        );

        throttled();

        setTimeout(() => {
            expect(callCount).toBe(1);
            throttled();
        }, 192);

        setTimeout(() => {
            expect(callCount).toBe(1);
        }, 254);

        setTimeout(() => {
            expect(callCount).toBe(2);
            done();
        }, 384);
    });

    it('should apply default options', (done) => {
        let callCount = 0;
        const throttled = throttle(
            () => {
                callCount++;
            },
            32,
            {},
        );

        throttled();
        throttled();
        expect(callCount).toBe(1);

        setTimeout(() => {
            expect(callCount).toBe(2);
            done();
        }, 128);
    });

    it('should support a `leading` option', () => {
        const withLeading = throttle(identity, 32, { leading: true });
        expect(withLeading('a')).toBe('a');

        const withoutLeading = throttle(identity, 32, { leading: false });
        expect(withoutLeading('a')).toBe(undefined);
    });

    it('should support a `trailing` option', (done) => {
        let withCount = 0;
        let withoutCount = 0;

        const withTrailing = throttle(
            (value) => {
                withCount++;
                return value;
            },
            64,
            { trailing: true },
        );

        const withoutTrailing = throttle(
            (value) => {
                withoutCount++;
                return value;
            },
            64,
            { trailing: false },
        );

        expect(withTrailing('a')).toBe('a');
        expect(withTrailing('b')).toBe('a');

        expect(withoutTrailing('a')).toBe('a');
        expect(withoutTrailing('b')).toBe('a');

        setTimeout(() => {
            expect(withCount).toBe(2);
            expect(withoutCount).toBe(1);
            done();
        }, 256);
    });

    it('should not update `lastCalled`, at the end of the timeout, when `trailing` is `false`', (done) => {
        let callCount = 0;

        const throttled = throttle(
            () => {
                callCount++;
            },
            64,
            { trailing: false },
        );

        throttled();
        throttled();

        setTimeout(() => {
            throttled();
            throttled();
        }, 96);

        setTimeout(() => {
            expect(callCount > 1);
            done();
        }, 192);
    });

    it('should work with a system time of `0`', (done) => {
        if (!isModularize) {
            let callCount = 0;
            let dateCount = 0;

            const lodash = runInContext({
                Date: {
                    now: function () {
                        return ++dateCount < 4 ? 0 : +new Date();
                    },
                },
            });

            const throttled = lodash.throttle((value) => {
                callCount++;
                return value;
            }, 32);

            const results = [throttled('a'), throttled('b'), throttled('c')];
            expect(results).toEqual(['a', 'a', 'a']);
            expect(callCount).toBe(1);

            setTimeout(() => {
                expect(callCount).toBe(2);
                done();
            }, 64);
        } else {
            done();
        }
    });
});
