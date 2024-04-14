import { slice } from './utils';
import xorBy from '../src/xorBy';

describe('xorBy', () => {
    it('should accept an `iteratee`', () => {
        let actual = xorBy([2.1, 1.2], [2.3, 3.4], Math.floor);
        expect(actual).toEqual([1.2, 3.4]);

        actual = xorBy([{ x: 1 }], [{ x: 2 }, { x: 1 }], 'x');
        expect(actual).toEqual([{ x: 2 }]);
    });

    it('should provide correct `iteratee` arguments', () => {
        let args;

        xorBy([2.1, 1.2], [2.3, 3.4], function () {
            args || (args = slice.call(arguments));
        });

        expect(args).toEqual([2.3]);
    });
});
