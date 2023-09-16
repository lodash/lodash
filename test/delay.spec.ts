import assert from 'node:assert';
import { slice } from './utils';
import delay from '../src/delay';

describe('delay', () => {
    it('should delay `func` execution', (done) => {
        let pass = false;
        delay(() => {
            pass = true;
        }, 32);

        setTimeout(() => {
            assert.ok(!pass);
        }, 1);

        setTimeout(() => {
            assert.ok(pass);
            done();
        }, 64);
    });

    it('should provide additional arguments to `func`', (done) => {
        let args;

        delay(
            function () {
                args = slice.call(arguments);
            },
            32,
            1,
            2,
        );

        setTimeout(() => {
            assert.deepStrictEqual(args, [1, 2]);
            done();
        }, 64);
    });

    it('should use a default `wait` of `0`', (done) => {
        let pass = false;
        delay(() => {
            pass = true;
        });

        assert.ok(!pass);

        setTimeout(() => {
            assert.ok(pass);
            done();
        }, 0);
    });

    it('should be cancelable', (done) => {
        let pass = true,
            timerId = delay(() => {
                pass = false;
            }, 32);

        clearTimeout(timerId);

        setTimeout(() => {
            assert.ok(pass);
            done();
        }, 64);
    });

    it('should work with mocked `setTimeout`', () => {
        let pass = false,
            setTimeout = root.setTimeout;

        setProperty(root, 'setTimeout', (func) => {
            func();
        });
        delay(() => {
            pass = true;
        }, 32);
        setProperty(root, 'setTimeout', setTimeout);

        assert.ok(pass);
    });
});
