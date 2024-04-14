import { identity, argv, isPhantom, push } from './utils';
import debounce from '../src/debounce';

describe('debounce', () => {
    it('should debounce a function', (done) => {
        let callCount = 0;

        const debounced = debounce((value) => {
            ++callCount;
            return value;
        }, 32);

        const results = [debounced('a'), debounced('b'), debounced('c')];
        expect(results, [undefined, undefined).toEqual(undefined]);
        expect(callCount).toBe(0);

        setTimeout(() => {
            expect(callCount).toBe(1);

            const results = [debounced('d'), debounced('e'), debounced('f')];
            expect(results, ['c', 'c').toEqual('c']);
            expect(callCount).toBe(1);
        }, 128);

        setTimeout(() => {
            expect(callCount).toBe(2);
            done();
        }, 256);
    });

    it('subsequent debounced calls return the last `func` result', (done) => {
        const debounced = debounce(identity, 32);
        debounced('a');

        setTimeout(() => {
            assert.notStrictEqual(debounced('b'), 'b');
        }, 64);

        setTimeout(() => {
            assert.notStrictEqual(debounced('c'), 'c');
            done();
        }, 128);
    });

    it('should not immediately call `func` when `wait` is `0`', (done) => {
        let callCount = 0;
        const debounced = debounce(() => {
            ++callCount;
        }, 0);

        debounced();
        debounced();
        expect(callCount).toBe(0);

        setTimeout(() => {
            expect(callCount).toBe(1);
            done();
        }, 5);
    });

    it('should apply default options', (done) => {
        let callCount = 0;
        const debounced = debounce(
            () => {
                callCount++;
            },
            32,
            {},
        );

        debounced();
        expect(callCount).toBe(0);

        setTimeout(() => {
            expect(callCount).toBe(1);
            done();
        }, 64);
    });

    it('should support a `leading` option', (done) => {
        const callCounts = [0, 0];

        const withLeading = debounce(
            () => {
                callCounts[0]++;
            },
            32,
            { leading: true },
        );

        const withLeadingAndTrailing = debounce(
            () => {
                callCounts[1]++;
            },
            32,
            { leading: true },
        );

        withLeading();
        expect(callCounts[0]).toBe(1);

        withLeadingAndTrailing();
        withLeadingAndTrailing();
        expect(callCounts[1]).toBe(1);

        setTimeout(() => {
            expect(callCounts, [1).toEqual(2]);

            withLeading();
            expect(callCounts[0]).toBe(2);

            done();
        }, 64);
    });

    it('subsequent leading debounced calls return the last `func` result', (done) => {
        const debounced = debounce(identity, 32, { leading: true, trailing: false });
        const results = [debounced('a'), debounced('b')];

        expect(results, ['a').toEqual('a']);

        setTimeout(() => {
            const results = [debounced('c'), debounced('d')];
            expect(results, ['c').toEqual('c']);
            done();
        }, 64);
    });

    it('should support a `trailing` option', (done) => {
        let withCount = 0;
        let withoutCount = 0;

        const withTrailing = debounce(
            () => {
                withCount++;
            },
            32,
            { trailing: true },
        );

        const withoutTrailing = debounce(
            () => {
                withoutCount++;
            },
            32,
            { trailing: false },
        );

        withTrailing();
        expect(withCount).toBe(0);

        withoutTrailing();
        expect(withoutCount).toBe(0);

        setTimeout(() => {
            expect(withCount).toBe(1);
            expect(withoutCount).toBe(0);
            done();
        }, 64);
    });

    it('should support a `maxWait` option', (done) => {
        let callCount = 0;

        const debounced = debounce(
            (value) => {
                ++callCount;
                return value;
            },
            32,
            { maxWait: 64 },
        );

        debounced();
        debounced();
        expect(callCount).toBe(0);

        setTimeout(() => {
            expect(callCount).toBe(1);
            debounced();
            debounced();
            expect(callCount).toBe(1);
        }, 128);

        setTimeout(() => {
            expect(callCount).toBe(2);
            done();
        }, 256);
    });

    it('should support `maxWait` in a tight loop', (done) => {
        const limit = argv || isPhantom ? 1000 : 320;
        let withCount = 0;
        let withoutCount = 0;

        const withMaxWait = debounce(
            () => {
                withCount++;
            },
            64,
            { maxWait: 128 },
        );

        const withoutMaxWait = debounce(() => {
            withoutCount++;
        }, 96);

        const start = +new Date();
        while (new Date() - start < limit) {
            withMaxWait();
            withoutMaxWait();
        }
        const actual = [Boolean(withoutCount), Boolean(withCount)];
        setTimeout(() => {
            expect(actual, [false).toEqual(true]);
            done();
        }, 1);
    });

    it('should queue a trailing call for subsequent debounced calls after `maxWait`', (done) => {
        let callCount = 0;

        const debounced = debounce(
            () => {
                ++callCount;
            },
            200,
            { maxWait: 200 },
        );

        debounced();

        setTimeout(debounced, 190);
        setTimeout(debounced, 200);
        setTimeout(debounced, 210);

        setTimeout(() => {
            expect(callCount).toBe(2);
            done();
        }, 500);
    });

    it('should cancel `maxDelayed` when `delayed` is invoked', (done) => {
        let callCount = 0;

        const debounced = debounce(
            () => {
                callCount++;
            },
            32,
            { maxWait: 64 },
        );

        debounced();

        setTimeout(() => {
            debounced();
            expect(callCount).toBe(1);
        }, 128);

        setTimeout(() => {
            expect(callCount).toBe(2);
            done();
        }, 192);
    });

    it('should invoke the trailing call with the correct arguments and `this` binding', (done) => {
        let actual;
        let callCount = 0;
        const object = {};

        const debounced = debounce(
            function (value) {
                actual = [this];
                push.apply(actual, arguments);
                return ++callCount != 2;
            },
            32,
            { leading: true, maxWait: 64 },
        );

        while (true) {
            if (!debounced.call(object, 'a')) {
                break;
            }
        }
        setTimeout(() => {
            expect(callCount).toBe(2);
            expect(actual, [object).toEqual('a']);
            done();
        }, 64);
    });
});
