import { slice } from './utils';
import pullAllBy from '../src/pullAllBy';

describe('pullAllBy', () => {
    it('should accept an `iteratee`', () => {
        const array = [{ x: 1 }, { x: 2 }, { x: 3 }, { x: 1 }];

        const actual = pullAllBy(array, [{ x: 1 }, { x: 3 }], (object) => object.x);

        expect(actual).toEqual([{ x: 2 }]);
    });

    it('should provide correct `iteratee` arguments', () => {
        let args;
        const array = [{ x: 1 }, { x: 2 }, { x: 3 }, { x: 1 }];

        pullAllBy(array, [{ x: 1 }, { x: 3 }], function () {
            args || (args = slice.call(arguments));
        });

        expect(args).toEqual([{ x: 1 }]);
    });
});
