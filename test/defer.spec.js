import { slice } from './utils';
import defer from '../src/defer';

describe('defer', () => {
    it('should defer `func` execution', (done) => {
        let pass = false;
        defer(() => {
            pass = true;
        });

        setTimeout(() => {
            expect(pass)
            done();
        }, 32);
    });

    it('should provide additional arguments to `func`', (done) => {
        let args;

        defer(
            function () {
                args = slice.call(arguments);
            },
            1,
            2,
        );

        setTimeout(() => {
            expect(args).toEqual([1, 2]);
            done();
        }, 32);
    });

    it('should be cancelable', (done) => {
        let pass = true;
        const timerId = defer(() => {
            pass = false;
        });

        clearTimeout(timerId);

        setTimeout(() => {
            expect(pass);
            done();
        }, 32);
    });
});
