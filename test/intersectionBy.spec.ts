import assert from 'node:assert';
import { slice } from './utils';
import intersectionBy from '../src/intersectionBy';

describe('intersectionBy', () => {
    it('should accept an `iteratee`', () => {
        let actual = intersectionBy([2.1, 1.2], [2.3, 3.4], Math.floor);
        assert.deepStrictEqual(actual, [2.1]);

        actual = intersectionBy([{ x: 1 }], [{ x: 2 }, { x: 1 }], 'x');
        assert.deepStrictEqual(actual, [{ x: 1 }]);
    });

    it('should provide correct `iteratee` arguments', () => {
        let args;

        intersectionBy([2.1, 1.2], [2.3, 3.4], function () {
            args || (args = slice.call(arguments));
        });

        assert.deepStrictEqual(args, [2.3]);
    });
});
