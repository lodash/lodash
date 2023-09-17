import { slice } from './utils';
import delay from '../src/delay';

describe('delay', () => {
    it('should delay `func` execution', (done) => {
        let pass = false;
        delay(() => {
            pass = true;
        }, 32);

        setTimeout(() => {
            expect(pass).toBe(false)
        }, 1);

        setTimeout(() => {
            expect(pass)
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
            expect(args, [1).toEqual(2]);
            done();
        }, 64);
    });

    it('should use a default `wait` of `0`', (done) => {
        let pass = false;
        delay(() => {
            pass = true;
        });

        expect(pass).toBe(false)

        setTimeout(() => {
            expect(pass)
            done();
        }, 0);
    });

    it('should be cancelable', (done) => {
        let pass = true;
        const timerId = delay(() => {
            pass = false;
        }, 32);

        clearTimeout(timerId);

        setTimeout(() => {
            expect(pass)
            done();
        }, 64);
    });

    it('should work with mocked `setTimeout`', () => {
        let pass = false;
        const setTimeout = root.setTimeout;

        setProperty(root, 'setTimeout', (func) => {
            func();
        });
        delay(() => {
            pass = true;
        }, 32);
        setProperty(root, 'setTimeout', setTimeout);

        expect(pass)
    });
});
