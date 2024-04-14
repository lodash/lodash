import { slice } from './utils';
import unionBy from '../src/unionBy';

describe('unionBy', () => {
    // FIXME: Work out path as function.
    //
    // it('should accept an `iteratee`', () => {
    //     let actual = unionBy([2.1], [1.2, 2.3], Math.floor);
    //     expect(actual).toEqual([2.1, 1.2]);
    //
    //     actual = unionBy([{ x: 1 }], [{ x: 2 }, { x: 1 }], 'x');
    //     expect(actual).toEqual([{ x: 1 }, { x: 2 }]);
    // });

    it('should provide correct `iteratee` arguments', () => {
        let args;

        unionBy([2.1], [1.2, 2.3], function () {
            args || (args = slice.call(arguments));
        });

        expect(args).toEqual([2.1]);
    });

    // FIXME: Work out path as function.
    //
    // it('should output values from the first possible array', () => {
    //     const actual = unionBy([{ x: 1, y: 1 }], [{ x: 1, y: 2 }], 'x');
    //     expect(actual).toEqual([{ x: 1, y: 1 }]);
    // });
});
