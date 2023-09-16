import assert from 'node:assert';
import lodashStable from 'lodash';
import { identity, isModularize, argv, isPhantom } from './utils';
import throttle from '../src/throttle';
import runInContext from '../src/runInContext';

describe('throttle', () => {
    it('should throttle a function', (done) => {
        let callCount = 0,
            throttled = throttle(() => {
                callCount++;
            }, 32);

        throttled();
        throttled();
        throttled();

        const lastCount = callCount;
        assert.ok(callCount);

        setTimeout(() => {
            assert.ok(callCount > lastCount);
            done();
        }, 64);
    });

    it('subsequent calls should return the result of the first call', (done) => {
        const throttled = throttle(identity, 32),
            results = [throttled('a'), throttled('b')];

        assert.deepStrictEqual(results, ['a', 'a']);

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
            let callCount = 0,
                dateCount = 0;

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
                assert.strictEqual(callCount, 2);
                done();
            }, 64);
        } else {
            done();
        }
    });

    it('should not trigger a trailing call when invoked once', (done) => {
        let callCount = 0,
            throttled = throttle(() => {
                callCount++;
            }, 32);

        throttled();
        assert.strictEqual(callCount, 1);

        setTimeout(() => {
            assert.strictEqual(callCount, 1);
            done();
        }, 64);
    });

    lodashStable.times(2, (index) => {
        it(`should trigger a call when invoked repeatedly${
            index ? ' and `leading` is `false`' : ''
        }`, (done) => {
            let callCount = 0,
                limit = argv || isPhantom ? 1000 : 320,
                options = index ? { leading: false } : {},
                throttled = throttle(
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
                assert.ok(actual);
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
            assert.strictEqual(callCount, 1);
            throttled();
        }, 192);

        setTimeout(() => {
            assert.strictEqual(callCount, 1);
        }, 254);

        setTimeout(() => {
            assert.strictEqual(callCount, 2);
            done();
        }, 384);
    });

    it('should apply default options', (done) => {
        let callCount = 0,
            throttled = throttle(
                () => {
                    callCount++;
                },
                32,
                {},
            );

        throttled();
        throttled();
        assert.strictEqual(callCount, 1);

        setTimeout(() => {
            assert.strictEqual(callCount, 2);
            done();
        }, 128);
    });

    it('should support a `leading` option', () => {
        const withLeading = throttle(identity, 32, { leading: true });
        assert.strictEqual(withLeading('a'), 'a');

        const withoutLeading = throttle(identity, 32, { leading: false });
        assert.strictEqual(withoutLeading('a'), undefined);
    });

    it('should support a `trailing` option', (done) => {
        let withCount = 0,
            withoutCount = 0;

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

        assert.strictEqual(withTrailing('a'), 'a');
        assert.strictEqual(withTrailing('b'), 'a');

        assert.strictEqual(withoutTrailing('a'), 'a');
        assert.strictEqual(withoutTrailing('b'), 'a');

        setTimeout(() => {
            assert.strictEqual(withCount, 2);
            assert.strictEqual(withoutCount, 1);
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
            assert.ok(callCount > 1);
            done();
        }, 192);
    });

    it('should work with a system time of `0`', (done) => {
        if (!isModularize) {
            let callCount = 0,
                dateCount = 0;

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
            assert.deepStrictEqual(results, ['a', 'a', 'a']);
            assert.strictEqual(callCount, 1);

            setTimeout(() => {
                assert.strictEqual(callCount, 2);
                done();
            }, 64);
        } else {
            done();
        }
    });
});
